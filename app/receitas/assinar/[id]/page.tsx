"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  FileKey,
  Pill,
  QrCode,
  Loader2,
  ExternalLink,
  RefreshCw,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  signDigitalPrescription,
  getDigitalPrescriptions,
  generatePrescriptionPDF,
  initiateSignatureFlow,
} from "@/app/actions/digital-prescriptions"

type SignatureStep = "loading" | "ready" | "authorizing" | "signing" | "completed" | "error"

export default function AssinarReceitaPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState<SignatureStep>("loading")
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState("")
  const [prescription, setPrescription] = useState<any>(null)
  const [authorizationUrl, setAuthorizationUrl] = useState("")
  const [vidaasConfigured, setVidaasConfigured] = useState(true)
  const [signatureResult, setSignatureResult] = useState<any>(null)

  // Verificar se recebemos código de autorização do VIDaaS
  const authorizationCode = searchParams.get("code")
  const authState = searchParams.get("state")
  const authError = searchParams.get("error")

  // Carregar receita
  useEffect(() => {
    async function fetchPrescription() {
      try {
        const result = await getDigitalPrescriptions()
        if (result.error) {
          setError(result.error)
          setStep("error")
        } else if (result.prescriptions) {
          const found = result.prescriptions.find((p: any) => p.id === params.id)
          if (found) {
            setPrescription(found)
            if (found.is_digitally_signed) {
              setStep("completed")
            } else {
              setStep("ready")
            }
          } else {
            setError("Receita não encontrada")
            setStep("error")
          }
        }
      } catch (err) {
        setError("Erro ao carregar receita")
        setStep("error")
      } finally {
        setLoading(false)
      }
    }

    fetchPrescription()
  }, [params.id])

  // Processar callback de autorização do VIDaaS
  useEffect(() => {
    async function processAuthorizationCallback() {
      if (authError) {
        setError(`Autorização negada: ${authError}`)
        setStep("error")
        return
      }

      if (authorizationCode && prescription && !prescription.is_digitally_signed) {
        setStep("signing")
        setSigning(true)

        try {
          // Gerar PDF para assinatura
          const pdfResult = await generatePrescriptionPDF(params.id as string)
          if (pdfResult.error) {
            throw new Error(pdfResult.error)
          }

          // Chamar API para completar assinatura com código
          const response = await fetch("/api/signature", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "sign",
              authorizationCode,
              prescriptionId: params.id,
              pdfBase64: btoa(pdfResult.html || "")
            })
          })

          const result = await response.json()

          if (!response.ok || !result.success) {
            throw new Error(result.error || "Erro ao assinar documento")
          }

          // Atualizar estado local com dados da assinatura
          await signDigitalPrescription({
            digitalPrescriptionId: params.id as string,
            certificateSerial: result.certificate?.alias || "",
            certificateIssuer: result.certificate?.provider || "VIDaaS - Valid Certificadora",
            signatureHash: result.signedPdf?.substring(0, 64) || "",
            digitalSignatureData: result.signedPdf?.substring(0, 1000) || "",
            signedPdfBase64: result.signedPdf
          })

          setSignatureResult(result)
          setStep("completed")

          // Limpar parâmetros da URL
          router.replace(`/receitas/assinar/${params.id}`)

        } catch (err: any) {
          setError(err.message || "Erro ao processar assinatura")
          setStep("error")
        } finally {
          setSigning(false)
        }
      }
    }

    if (prescription) {
      processAuthorizationCallback()
    }
  }, [authorizationCode, prescription, params.id, router, authError])

  // Iniciar fluxo de assinatura com VIDaaS
  const handleInitiateSignature = async () => {
    setError("")
    setStep("authorizing")

    try {
      // Verificar configuração VIDaaS
      const checkResponse = await fetch(`/api/signature?action=check-certificate`)
      const checkData = await checkResponse.json()

      if (checkData.mockMode) {
        setVidaasConfigured(false)
        // Usar fluxo mock para desenvolvimento
        await handleMockSignature()
        return
      }

      // Iniciar fluxo real VIDaaS
      const result = await initiateSignatureFlow(params.id as string)

      if (result.error) {
        if (result.mockMode) {
          setVidaasConfigured(false)
          await handleMockSignature()
          return
        }
        throw new Error(result.error)
      }

      if (result.authorizationUrl) {
        setAuthorizationUrl(result.authorizationUrl)
        // Redirecionar para VIDaaS
        window.location.href = result.authorizationUrl
      }
    } catch (err: any) {
      setError(err.message || "Erro ao iniciar assinatura")
      setStep("error")
    }
  }

  // Assinatura mock para desenvolvimento (quando VIDaaS não está configurado)
  const handleMockSignature = async () => {
    setSigning(true)
    setStep("signing")

    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000))

      const response = await fetch("/api/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sign-mock",
          prescriptionId: params.id
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Erro ao assinar documento")
      }

      // Atualizar estado local
      await signDigitalPrescription({
        digitalPrescriptionId: params.id as string,
        certificateSerial: result.signature?.certificateSerial || "",
        certificateIssuer: result.signature?.certificateIssuer || "AtendeBem Development CA",
        signatureHash: result.signature?.signatureHash || "",
        signatureTimestamp: result.signature?.timestamp
      })

      setSignatureResult(result)
      setStep("completed")

    } catch (err: any) {
      setError(err.message || "Erro ao processar assinatura")
      setStep("error")
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

  const handleRetry = () => {
    setError("")
    setStep("ready")
  }

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
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

          {/* Aviso de modo desenvolvimento */}
          {!vidaasConfigured && (
            <Card className="rounded-3xl border-amber-500 bg-amber-50 dark:bg-amber-950">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-700 dark:text-amber-300 font-medium">Modo de Desenvolvimento</p>
                  <p className="text-amber-600 dark:text-amber-400 text-sm">
                    O VIDaaS não está configurado. A assinatura será simulada para testes.
                    Configure as variáveis VIDAAS_CLIENT_ID e VIDAAS_CLIENT_SECRET para produção.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="rounded-3xl border-red-500 bg-red-50 dark:bg-red-950">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
                <Button onClick={handleRetry} variant="outline" size="sm" className="rounded-xl">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar Novamente
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Completed State */}
          {step === "completed" && (
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

                {signatureResult && (
                  <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4 text-sm space-y-1">
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Certificado:</strong> {signatureResult.certificate?.alias || signatureResult.signature?.certificateSerial || "N/A"}
                    </p>
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Emissor:</strong> {signatureResult.certificate?.provider || signatureResult.signature?.certificateIssuer || "N/A"}
                    </p>
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Data/Hora:</strong> {new Date().toLocaleString("pt-BR")}
                    </p>
                  </div>
                )}

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
          )}

          {/* Ready/Authorizing/Signing States */}
          {(step === "ready" || step === "authorizing" || step === "signing") && (
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
                      <span className="text-sm text-muted-foreground">CPF</span>
                      <span className="font-medium">{prescription?.patient_cpf || "N/A"}</span>
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
                        {prescription?.prescription_date
                          ? new Date(prescription.prescription_date).toLocaleDateString("pt-BR")
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
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tipo</span>
                      <Badge
                        variant={prescription?.is_controlled_substance ? "destructive" : "secondary"}
                        className="rounded-full"
                      >
                        {prescription?.prescription_type === "controlled_b1" ? "Azul B1" :
                         prescription?.prescription_type === "controlled_b2" ? "Azul B2" :
                         prescription?.prescription_type === "special" ? "Especial" : "Simples"}
                      </Badge>
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
                      {vidaasConfigured
                        ? "Você será redirecionado para o VIDaaS para autenticar com seu certificado digital"
                        : "Modo de desenvolvimento: a assinatura será simulada"}
                    </p>
                  </div>

                  <Button
                    onClick={handleInitiateSignature}
                    disabled={signing || step === "authorizing"}
                    className="rounded-2xl w-full h-12 text-base"
                  >
                    {step === "authorizing" ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Iniciando autorização...
                      </>
                    ) : step === "signing" ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Assinando documento...
                      </>
                    ) : (
                      <>
                        <FileKey className="h-5 w-5 mr-2" />
                        Assinar com Certificado Digital
                      </>
                    )}
                  </Button>

                  {authorizationUrl && (
                    <div className="pt-4 space-y-3">
                      <p className="text-sm text-muted-foreground text-center">
                        Ou escaneie o QR Code abaixo com o app VIDaaS:
                      </p>
                      <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-xl">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(authorizationUrl)}`}
                            alt="QR Code VIDaaS"
                            className="w-48 h-48"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <a
                          href={authorizationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Abrir em nova aba <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}
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
                    documento, conforme legislação brasileira vigente (MP 2.200-2/2001 e Lei 14.063/2020).
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
