import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"
import { getDb } from "@/lib/db"
import {
  generatePrescriptionHTML,
  generateAppointmentHTML,
  generateCSV,
  generateTISSXML,
  type PrescriptionPDFData,
  type AppointmentPDFData
} from "@/lib/pdf-generator"

/**
 * GET /api/export
 * Exporta dados em diversos formatos
 */
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const session = await verifySession(token)
    if (!session) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // prescription, appointment, procedures, patients
    const format = searchParams.get("format") // html, csv, xml
    const id = searchParams.get("id")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const sql = await getDb()

    // Buscar dados do médico
    const [doctor] = await sql`
      SELECT name, crm, crm_uf, specialty, email
      FROM users WHERE id = ${session.id}
    `

    // Exportar receita individual
    if (type === "prescription" && id) {
      const [prescription] = await sql`
        SELECT dp.*, mp.clinical_indication, mp.cid10_code, mp.cid10_description, mp.notes
        FROM digital_prescriptions dp
        LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
        WHERE dp.id = ${id} AND dp.user_id = ${session.id}
      `

      if (!prescription) {
        return NextResponse.json({ error: "Receita não encontrada" }, { status: 404 })
      }

      const medications = await sql`
        SELECT * FROM prescription_items
        WHERE prescription_id = ${prescription.prescription_id}
      `

      const pdfData: PrescriptionPDFData = {
        doctorName: doctor.name,
        doctorCRM: doctor.crm,
        doctorCRMUF: doctor.crm_uf,
        doctorSpecialty: doctor.specialty,
        patientName: prescription.patient_name,
        patientCPF: prescription.patient_cpf,
        patientDateOfBirth: prescription.patient_date_of_birth,
        prescriptionId: prescription.id,
        prescriptionDate: new Date(prescription.created_at).toLocaleDateString('pt-BR'),
        validUntil: new Date(prescription.valid_until).toLocaleDateString('pt-BR'),
        validationToken: prescription.validation_token,
        cid10Code: prescription.cid10_code,
        cid10Description: prescription.cid10_description,
        clinicalIndication: prescription.clinical_indication,
        medications: medications.map((m: any) => ({
          name: m.medication_name,
          dosage: m.dosage,
          frequency: m.frequency,
          duration: m.duration,
          quantity: m.quantity,
          instructions: m.administration_instructions
        })),
        isDigitallySigned: prescription.is_digitally_signed,
        signatureTimestamp: prescription.signature_timestamp?.toISOString(),
        certificateIssuer: prescription.signature_certificate_issuer,
        signatureHash: prescription.signature_hash,
        notes: prescription.notes
      }

      const html = generatePrescriptionHTML(pdfData)

      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Disposition": `inline; filename="receita_${id}.html"`
        }
      })
    }

    // Exportar atendimento individual
    if (type === "appointment" && id) {
      const [appointment] = await sql`
        SELECT * FROM appointments
        WHERE id = ${id} AND user_id = ${session.id}
      `

      if (!appointment) {
        return NextResponse.json({ error: "Atendimento não encontrado" }, { status: 404 })
      }

      const procedures = await sql`
        SELECT * FROM procedures
        WHERE appointment_id = ${id}
      `

      const pdfData: AppointmentPDFData = {
        doctorName: doctor.name,
        doctorCRM: doctor.crm,
        doctorCRMUF: doctor.crm_uf,
        doctorSpecialty: doctor.specialty,
        patientName: appointment.patient_name,
        patientCPF: appointment.patient_cpf,
        patientAge: appointment.patient_age,
        patientGender: appointment.patient_gender,
        appointmentId: appointment.id,
        appointmentDate: new Date(appointment.appointment_date).toLocaleDateString('pt-BR'),
        appointmentType: appointment.appointment_type,
        procedures: procedures.map((p: any) => ({
          code: p.procedure_code,
          name: p.procedure_name,
          laterality: p.laterality,
          location: p.location
        })),
        mainComplaint: appointment.main_complaint,
        clinicalHistory: appointment.clinical_history,
        physicalExam: appointment.physical_exam,
        diagnosis: appointment.diagnosis,
        treatmentPlan: appointment.treatment_plan,
        observations: appointment.observations
      }

      const html = generateAppointmentHTML(pdfData)

      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Disposition": `inline; filename="atendimento_${id}.html"`
        }
      })
    }

    // Exportar lista de procedimentos em CSV
    if (type === "procedures" && format === "csv") {
      let procedures
      if (startDate && endDate) {
        procedures = await sql`
          SELECT p.*, a.patient_name, a.patient_cpf, a.appointment_type
          FROM procedures p
          JOIN appointments a ON p.appointment_id = a.id
          WHERE p.user_id = ${session.id}
          AND p.procedure_date >= ${startDate}::date
          AND p.procedure_date <= ${endDate}::date
          ORDER BY p.procedure_date DESC
        `
      } else {
        procedures = await sql`
          SELECT p.*, a.patient_name, a.patient_cpf, a.appointment_type
          FROM procedures p
          JOIN appointments a ON p.appointment_id = a.id
          WHERE p.user_id = ${session.id}
          ORDER BY p.procedure_date DESC
          LIMIT 1000
        `
      }

      const csv = generateCSV(procedures, [
        { key: "procedure_date", header: "Data" },
        { key: "procedure_code", header: "Código TUSS" },
        { key: "procedure_name", header: "Procedimento" },
        { key: "patient_name", header: "Paciente" },
        { key: "patient_cpf", header: "CPF" },
        { key: "appointment_type", header: "Tipo Atendimento" }
      ])

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="procedimentos_${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // Exportar lista de procedimentos em XML TISS
    if (type === "procedures" && format === "xml") {
      let procedures
      if (startDate && endDate) {
        procedures = await sql`
          SELECT * FROM procedures
          WHERE user_id = ${session.id}
          AND procedure_date >= ${startDate}::date
          AND procedure_date <= ${endDate}::date
          ORDER BY procedure_date DESC
        `
      } else {
        procedures = await sql`
          SELECT * FROM procedures
          WHERE user_id = ${session.id}
          ORDER BY procedure_date DESC
          LIMIT 100
        `
      }

      const xml = generateTISSXML(procedures, doctor)

      return new NextResponse(xml, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Content-Disposition": `attachment; filename="tiss_${new Date().toISOString().split('T')[0]}.xml"`
        }
      })
    }

    // Exportar lista de pacientes em CSV
    if (type === "patients" && format === "csv") {
      const patients = await sql`
        SELECT 
          full_name, cpf, date_of_birth, gender, phone, email,
          blood_type, allergies, chronic_conditions,
          insurance_provider, insurance_number,
          created_at
        FROM patients
        WHERE user_id = ${session.id} AND is_active = true
        ORDER BY full_name ASC
      `

      const csv = generateCSV(patients, [
        { key: "full_name", header: "Nome Completo" },
        { key: "cpf", header: "CPF" },
        { key: "date_of_birth", header: "Data de Nascimento" },
        { key: "gender", header: "Sexo" },
        { key: "phone", header: "Telefone" },
        { key: "email", header: "Email" },
        { key: "blood_type", header: "Tipo Sanguíneo" },
        { key: "allergies", header: "Alergias" },
        { key: "chronic_conditions", header: "Condições Crônicas" },
        { key: "insurance_provider", header: "Convênio" },
        { key: "insurance_number", header: "Número Carteirinha" },
        { key: "created_at", header: "Data Cadastro" }
      ])

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="pacientes_${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // Exportar lista de receitas em CSV
    if (type === "prescriptions" && format === "csv") {
      const prescriptions = await sql`
        SELECT 
          dp.id,
          dp.patient_name,
          dp.patient_cpf,
          dp.created_at,
          dp.valid_until,
          dp.prescription_type,
          dp.status,
          dp.is_digitally_signed,
          mp.cid10_code,
          mp.cid10_description
        FROM digital_prescriptions dp
        LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
        WHERE dp.user_id = ${session.id}
        ORDER BY dp.created_at DESC
      `

      const csv = generateCSV(prescriptions, [
        { key: "id", header: "ID" },
        { key: "patient_name", header: "Paciente" },
        { key: "patient_cpf", header: "CPF" },
        { key: "created_at", header: "Data Emissão" },
        { key: "valid_until", header: "Válida Até" },
        { key: "prescription_type", header: "Tipo" },
        { key: "status", header: "Status" },
        { key: "is_digitally_signed", header: "Assinada" },
        { key: "cid10_code", header: "CID-10" },
        { key: "cid10_description", header: "Diagnóstico" }
      ])

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="receitas_${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    return NextResponse.json({ 
      error: "Parâmetros inválidos",
      usage: {
        types: ["prescription", "appointment", "procedures", "patients", "prescriptions"],
        formats: ["html", "csv", "xml"],
        examples: [
          "/api/export?type=prescription&id=xxx",
          "/api/export?type=procedures&format=csv&startDate=2024-01-01&endDate=2024-12-31",
          "/api/export?type=patients&format=csv"
        ]
      }
    }, { status: 400 })
  } catch (error: any) {
    console.error("[API] Export error:", error)
    return NextResponse.json({ error: error.message || "Erro interno" }, { status: 500 })
  }
}
