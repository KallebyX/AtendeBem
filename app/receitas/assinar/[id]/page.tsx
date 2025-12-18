"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Download, FileKey, Pill } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  signDigitalPrescription,
  getDigitalPrescriptions,
  generatePrescriptionPDF,
} from "@/app/actions/digital-prescriptions"

export default function AssinarReceitaPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [signed, setSigned] = useState(false)
  const [error, setError] = useState("")
  const [prescription, setPrescription] = useState<any>(null)

  useEffect(() => {
    async function fetchPrescription() {
      try {
        const result = await getDigitalPrescriptions()
        if (result.error) {
          setError(result.error)
        } else if (result.prescriptions) {
          const found = result.prescriptions.find((p: any) => p.id === params.id)
          if (found) {
            setPrescription(found)
            setSigned(found.is_digitally_signed)
          } else {
            setError("Receita não encontrada")
          }
        }
      } catch (err) {
        setError("Erro ao carregar receita")
      } finally {
        setLoading(false)
      }
    }

    fetchPrescription()
  }, [params.id])

  const handleSign = async () => {
    setError("")
    setSigning(true)

    try {
      // Simular processo de assinatura digital com certificado ICP-Brasil
      // Em produção, isso integraria com a API de certificado digital
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockSignatureData = {
        digitalPrescriptionId: params.id as string,
        certificateSerial: "0123456789ABCDEF",
        certificateIssuer: "CN=AC Certisign RFB G5, OU=Secretaria da Receita Federal do Brasil",
        signatureHash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
        digitalSignatureData: btoa(JSON.stringify({ timestamp: new Date().toISOString(), certificate: "mock" })),
      }

      const result = await signDigitalPrescription(mockSignatureData)

      if (result.error) {
        setError(result.error)
      } else {
        setSigned(true)
      }
    } catch (err) {
      setError("Erro ao assinar receita")
    } finally {
      setSigning(false)
    }
  }

  const handleDownloadPDF = async () => {
    setLoading(true)
    try {
      const result = await generatePrescriptionPDF(params.id as string)
      if (result.error) {
        setError(result.error)
      } else if (result.html) {
        // Open HTML in new window for printing
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(result.html)
          printWindow.document.close()
          printWindow.print()
        }
      }
    } catch (err) {
      setError("Erro ao gerar PDF")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando receita...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/receitas">
              <Button variant="ghost" size="icon" className="rounded-2xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Logo />
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <FileKey className="h-8 w-8 text-primary" />
              Assinatura Digital ICP-Brasil
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Assine digitalmente a receita médica com validade jurídica nacional
            </p>
          </div>

          {error && (
            <Card className="rounded-3xl border-red-500 bg-red-50 dark:bg-red-950">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Status da Assinatura */}
          {signed ? (
            <Card className="rounded-3xl border-green-500 bg-green-50 dark:bg-green-950">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                      Receita Assinada com Sucesso!
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      A receita foi assinada digitalmente e está pronta para uso
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button onClick={handleDownloadPDF} disabled={loading} className="rounded-2xl">
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? "Gerando..." : "Baixar PDF Assinado"}
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/receitas")} className="rounded-2xl">
                    Ver Todas as Receitas
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Resumo da Receita */}
              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>Resumo da Receita</CardTitle>
                  <CardDescription>Confira os dados antes de assinar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Paciente</span>
                      <span className="font-medium">{prescription?.patient_name || "Carregando..."}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Medicamentos</span>
                      <Badge variant="secondary" className="rounded-full">
                        {prescription?.medications?.length || 0} itens
                      </Badge>
                    </div>
                    {prescription?.medications && prescription.medications.length > 0 && (
                      <div className="pt-2 space-y-2">
                        {prescription.medications.map((med: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-xl">
                            <Pill className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              {med.medication_name} - {med.dosage}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Data de Emissão</span>
                      <span className="font-medium">
                        {prescription?.created_at
                          ? new Date(prescription.created_at).toLocaleDateString("pt-BR")
                          : new Date().toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Validade</span>
                      <span className="font-medium">
                        {prescription?.valid_until
                          ? new Date(prescription.valid_until).toLocaleDateString("pt-BR")
                          : `${prescription?.validity_days || 30} dias`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações sobre Assinatura Digital */}
              <Card className="rounded-3xl border-primary bg-primary/5">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Sobre a Assinatura Digital ICP-Brasil</h3>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Validade jurídica equivalente a assinatura manuscrita (MP 2.200-2/2001)</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Documento não pode ser alterado após assinatura</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Aceito em farmácias e operadoras de saúde em todo Brasil</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>QR Code para validação instantânea do documento</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Rastreabilidade completa e segurança certificada</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requisitos de Certificado */}
              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileKey className="h-5 w-5 text-primary" />
                    Certificado Digital Necessário
                  </CardTitle>
                  <CardDescription>
                    Você precisa de um certificado digital ICP-Brasil e-CPF ou e-CNPJ (A1 ou A3)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Certificados aceitos:</strong> e-CPF A1, e-CPF A3, e-CNPJ A1, e-CNPJ A3
                    </p>
                    <p>
                      <strong>Autoridades Certificadoras:</strong> Certisign, Serasa, Soluti, Valid, SafeWeb e outras
                      credenciadas pela ICP-Brasil
                    </p>
                    <p className="text-xs pt-2 text-amber-600 dark:text-amber-400">
                      Certifique-se de que seu certificado está válido e instalado corretamente no dispositivo
                    </p>
                  </div>

                  <Button onClick={handleSign} disabled={signing} className="rounded-2xl w-full h-12 text-base">
                    {signing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Assinando...
                      </>
                    ) : (
                      <>
                        <FileKey className="h-5 w-5 mr-2" />
                        Assinar com Certificado Digital
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Nota Legal */}
              <Card className="rounded-3xl bg-muted/50">
                <CardContent className="p-4 text-xs text-muted-foreground space-y-2">
                  <p>
                    <strong>Importante:</strong> Ao assinar digitalmente, você declara ser o profissional de saúde
                    responsável pela emissão desta receita e assume total responsabilidade legal pelo conteúdo
                    prescrito.
                  </p>
                  <p>
                    A assinatura digital com certificado ICP-Brasil garante autenticidade, integridade e não-repúdio do
                    documento, conforme legislação brasileira vigente.
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
