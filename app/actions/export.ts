"use server"

import { generatePDFGuiaTISS, generateExcelGuiaTISS } from "@/lib/export-pdf"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/auth"

export async function exportAppointmentPDF(appointmentId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifySession(token)
    if (!user) {
      return { success: false, error: "Sessão inválida" }
    }

    const html = await generatePDFGuiaTISS(appointmentId)

    return {
      success: true,
      html,
      filename: `guia-tiss-${appointmentId}-${Date.now()}.pdf`,
    }
  } catch (error: any) {
    console.error("Erro ao gerar PDF:", error)
    return { success: false, error: error.message }
  }
}

export async function exportAppointmentExcel(appointmentId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifySession(token)
    if (!user) {
      return { success: false, error: "Sessão inválida" }
    }

    const data = await generateExcelGuiaTISS(appointmentId)

    return {
      success: true,
      data,
      filename: `guia-tiss-${appointmentId}-${Date.now()}.xlsx`,
    }
  } catch (error: any) {
    console.error("Erro ao gerar Excel:", error)
    return { success: false, error: error.message }
  }
}
