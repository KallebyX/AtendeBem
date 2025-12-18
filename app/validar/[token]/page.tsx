"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { CheckCircle2, XCircle, AlertCircle, ShieldCheck, Calendar, User, Pill } from "lucide-react"
import { useParams } from "next/navigation"
import { validatePrescription } from "@/app/actions/digital-prescriptions"

export default function ValidarReceitaPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [prescription, setPrescription] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    async function validate() {
      const result = await validatePrescription(params.token as string)

      if (result.error) {
        setError(result.error)
      } else {
        setPrescription(result.prescription)
      }
      setLoading(false)
    }

    validate()
  }, [params.token])

  const isValid = prescription && !prescription.isExpired

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              Validacao de Receita Digital
            </h1>
            <p className="text-muted-foreground">Verificacao de autenticidade via QR Code</p>
          </div>

          {loading ? (
            <Card className="rounded-3xl">
              <CardContent className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Validando receita...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="rounded-3xl border-red-500 bg-red-50 dark:bg-red-950">
              <CardContent className="p-8 text-center space-y-4">
                <XCircle className="h-16 w-16 text-red-600 dark:text-red-400 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">Receita Invalida</h3>
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              </CardContent>
            </Card>
          ) : isValid ? (
            <Card className="rounded-3xl border-green-500 bg-green-50 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  Receita Valida e Autentica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-green-900/20 rounded-2xl">
                    <User className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm text-green-700 dark:text-green-300">Paciente</p>
                      <p className="font-semibold text-green-900 dark:text-green-100">{prescription.patientName}</p>
                      {prescription.patientCpf && (
                        <p className="text-xs text-green-600 dark:text-green-400">CPF: {prescription.patientCpf}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-green-900/20 rounded-2xl">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm text-green-700 dark:text-green-300">Medico Prescritor</p>
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        {prescription.doctorName} - CRM {prescription.doctorCrm}/{prescription.doctorCrmUf}
                      </p>
                      {prescription.doctorSpecialty && (
                        <p className="text-xs text-green-600 dark:text-green-400">{prescription.doctorSpecialty}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-green-900/20 rounded-2xl">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm text-green-700 dark:text-green-300">Validade</p>
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        Valida ate {new Date(prescription.validUntil).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  {prescription.isDigitallySigned && (
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-green-900/20 rounded-2xl">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm text-green-700 dark:text-green-300">Assinatura Digital</p>
                        <p className="font-semibold text-green-900 dark:text-green-100">
                          ICP-Brasil - Assinada em{" "}
                          {new Date(prescription.signatureTimestamp).toLocaleDateString("pt-BR")}
                        </p>
                        {prescription.signatureCertificateIssuer && (
                          <p className="text-xs text-green-600 dark:text-green-400">
                            {prescription.signatureCertificateIssuer}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Medicamentos */}
                  {prescription.medications && prescription.medications.length > 0 && (
                    <div className="p-3 bg-white dark:bg-green-900/20 rounded-2xl">
                      <div className="flex items-center gap-2 mb-3">
                        <Pill className="h-5 w-5 text-green-600" />
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                          Medicamentos Prescritos ({prescription.medications.length})
                        </p>
                      </div>
                      <div className="space-y-2">
                        {prescription.medications.map((med: any, index: number) => (
                          <div key={index} className="p-2 bg-green-100 dark:bg-green-800/30 rounded-xl">
                            <p className="font-semibold text-green-900 dark:text-green-100">{med.name}</p>
                            <p className="text-xs text-green-700 dark:text-green-300">
                              {med.dosage} - {med.frequency} - {med.duration}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-700 dark:text-green-300 text-center">
                    Esta receita foi validada e possui validade juridica conforme legislacao brasileira
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-3xl border-amber-500 bg-amber-50 dark:bg-amber-950">
              <CardContent className="p-8 text-center space-y-4">
                <AlertCircle className="h-16 w-16 text-amber-600 dark:text-amber-400 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-2">Receita Expirada</h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    Esta receita expirou em{" "}
                    {prescription?.validUntil
                      ? new Date(prescription.validUntil).toLocaleDateString("pt-BR")
                      : "data desconhecida"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
