"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/navigation-header"
import { Plus, FileText, Eye, RotateCw, CheckCircle2, Clock, XCircle } from "lucide-react"
import Link from "next/link"
import { getDigitalPrescriptions } from "@/app/actions/digital-prescriptions"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function ReceitasPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPrescriptions()
  }, [])

  const loadPrescriptions = async () => {
    setLoading(true)
    const result = await getDigitalPrescriptions()
    if (result.prescriptions) {
      setPrescriptions(result.prescriptions)
    }
    setLoading(false)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_signature: { label: "Aguardando assinatura", variant: "secondary" as const, icon: Clock },
      signed: { label: "Assinada digitalmente", variant: "default" as const, icon: CheckCircle2 },
      validated: { label: "Validada", variant: "default" as const, icon: CheckCircle2 },
      revoked: { label: "Revogada", variant: "destructive" as const, icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending_signature
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="rounded-full gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                Receitas Digitais
              </h1>
              <p className="text-muted-foreground">Histórico de receitas assinadas digitalmente</p>
            </div>
            <Link href="/receitas/nova">
              <Button className="rounded-2xl gap-2">
                <Plus className="h-5 w-5" />
                Nova receita
              </Button>
            </Link>
          </div>

          {/* Lista de receitas */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando receitas...</p>
            </div>
          ) : prescriptions.length === 0 ? (
            <Card className="rounded-3xl">
              <CardContent className="p-12 text-center space-y-4">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold">Nenhuma receita encontrada</h3>
                  <p className="text-muted-foreground mt-2">Comece emitindo sua primeira receita digital</p>
                </div>
                <Link href="/receitas/nova">
                  <Button className="rounded-2xl gap-2 mt-4">
                    <Plus className="h-5 w-5" />
                    Nova receita
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="rounded-3xl hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold">{prescription.patient_name}</h3>
                          {getStatusBadge(prescription.status)}
                        </div>

                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>CPF: {prescription.patient_cpf}</p>
                          <p>Data de emissão: {new Date(prescription.prescription_date).toLocaleDateString("pt-BR")}</p>
                          <p>Validade: {new Date(prescription.valid_until).toLocaleDateString("pt-BR")}</p>
                        </div>

                        <div className="pt-2">
                          <p className="text-sm font-medium mb-2">Medicamentos:</p>
                          <div className="flex flex-wrap gap-2">
                            {prescription.medications?.map((med: any, idx: number) => (
                              <Badge key={idx} variant="outline" className="rounded-full">
                                {med.medication_name}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {prescription.is_digitally_signed && (
                          <div className="pt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>
                              Assinada digitalmente há{" "}
                              {formatDistanceToNow(new Date(prescription.signature_timestamp), {
                                locale: ptBR,
                              })}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {prescription.status === "signed" && (
                          <>
                            <Button variant="outline" className="rounded-2xl gap-2 bg-transparent" size="sm">
                              <Eye className="h-4 w-4" />
                              Visualizar
                            </Button>
                            <Button variant="outline" className="rounded-2xl gap-2 bg-transparent" size="sm">
                              <RotateCw className="h-4 w-4" />
                              Renovar
                            </Button>
                          </>
                        )}
                        {prescription.status === "pending_signature" && (
                          <Link href={`/receitas/assinar/${prescription.id}`}>
                            <Button className="rounded-2xl gap-2" size="sm">
                              Assinar agora
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
