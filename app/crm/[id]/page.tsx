"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, FileText, Activity, DollarSign, Plus, Download } from "lucide-react"
import { useEffect, useState } from "react"
import { getPatientDetails } from "@/app/actions/crm"
import { useParams } from "next/navigation"

export default function PatientDetailPage() {
  const params = useParams()
  const patientId = params.id as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPatientData()
  }, [])

  async function loadPatientData() {
    setLoading(true)
    const result = await getPatientDetails(patientId)
    if (result.success) {
      setData(result)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Carregando dados do paciente...</p>
        </div>
      </div>
    )
  }

  if (!data || !data.patient) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Paciente não encontrado</p>
        </div>
      </div>
    )
  }

  const { patient, appointments, prescriptions, exams, schedules, medicalHistory, payments } = data

  const totalSpent = payments?.reduce((sum: number, p: any) => sum + Number.parseFloat(p.amount || 0), 0) || 0

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header do Paciente */}
        <Card className="rounded-3xl border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold">{patient.full_name}</h1>
                  <div className="space-y-0.5 text-sm text-muted-foreground">
                    <p>CPF: {patient.cpf}</p>
                    <p>
                      Nascimento:{" "}
                      {patient.date_of_birth
                        ? new Date(patient.date_of_birth).toLocaleDateString("pt-BR")
                        : "Não informado"}
                    </p>
                    <p>Sexo: {patient.gender || "Não informado"}</p>
                    <p>Telefone: {patient.phone || "Não informado"}</p>
                    {patient.blood_type && <p>Tipo Sanguíneo: {patient.blood_type}</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button className="rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </div>
            </div>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-accent/50">
                <p className="text-sm text-muted-foreground">Consultas</p>
                <p className="text-2xl font-bold">{appointments?.length || 0}</p>
              </div>
              <div className="p-4 rounded-2xl bg-accent/50">
                <p className="text-sm text-muted-foreground">Receitas</p>
                <p className="text-2xl font-bold">{prescriptions?.length || 0}</p>
              </div>
              <div className="p-4 rounded-2xl bg-accent/50">
                <p className="text-sm text-muted-foreground">Exames</p>
                <p className="text-2xl font-bold">{exams?.length || 0}</p>
              </div>
              <div className="p-4 rounded-2xl bg-accent/50">
                <p className="text-sm text-muted-foreground">Total Gasto</p>
                <p className="text-2xl font-bold">R$ {totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="rounded-2xl">
            <TabsTrigger value="history" className="rounded-xl">
              <Activity className="w-4 h-4 mr-2" />
              Histórico Médico
            </TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              Consultas
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="rounded-xl">
              <FileText className="w-4 h-4 mr-2" />
              Receitas
            </TabsTrigger>
            <TabsTrigger value="exams" className="rounded-xl">
              <Activity className="w-4 h-4 mr-2" />
              Exames
            </TabsTrigger>
            <TabsTrigger value="financial" className="rounded-xl">
              <DollarSign className="w-4 h-4 mr-2" />
              Financeiro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <CardTitle>Histórico Médico</CardTitle>
              </CardHeader>
              <CardContent>
                {medicalHistory?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhum diagnóstico registrado</p>
                ) : (
                  <div className="space-y-3">
                    {medicalHistory?.map((item: any) => (
                      <div key={item.id} className="p-4 rounded-2xl border border-border">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.diagnosis}</h3>
                            <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                              {item.cid10_code && <p>CID-10: {item.cid10_code}</p>}
                              {item.cid11_code && <p>CID-11: {item.cid11_code}</p>}
                              <p>Data: {new Date(item.diagnosis_date).toLocaleDateString("pt-BR")}</p>
                              <p>Status: {item.status}</p>
                            </div>
                            {item.notes && <p className="text-sm mt-2 text-muted-foreground">{item.notes}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alergias e Condições Crônicas */}
            {(patient.allergies || patient.chronic_conditions) && (
              <div className="grid md:grid-cols-2 gap-4">
                {patient.allergies && (
                  <Card className="rounded-3xl border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Alergias</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{patient.allergies}</p>
                    </CardContent>
                  </Card>
                )}
                {patient.chronic_conditions && (
                  <Card className="rounded-3xl border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Condições Crônicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{patient.chronic_conditions}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="appointments">
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <CardTitle>Histórico de Consultas</CardTitle>
              </CardHeader>
              <CardContent>
                {appointments?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhuma consulta registrada</p>
                ) : (
                  <div className="space-y-3">
                    {appointments?.map((apt: any) => (
                      <div key={apt.id} className="p-4 rounded-2xl border border-border">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{apt.appointment_type}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(apt.appointment_date).toLocaleDateString("pt-BR")}
                            </p>
                            {apt.main_complaint && <p className="text-sm mt-2">Queixa: {apt.main_complaint}</p>}
                            {apt.diagnosis && <p className="text-sm mt-1">Diagnóstico: {apt.diagnosis}</p>}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              apt.status === "completed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <CardTitle>Receitas Médicas</CardTitle>
              </CardHeader>
              <CardContent>
                {prescriptions?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhuma receita emitida</p>
                ) : (
                  <div className="space-y-3">
                    {prescriptions?.map((rx: any) => (
                      <div key={rx.id} className="p-4 rounded-2xl border border-border">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(rx.prescription_date).toLocaleDateString("pt-BR")}
                            </p>
                            {rx.cid10_code && <p className="text-sm mt-1">CID-10: {rx.cid10_code}</p>}
                            {rx.clinical_indication && (
                              <p className="text-sm mt-1">Indicação: {rx.clinical_indication}</p>
                            )}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              rx.status === "active"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            }`}
                          >
                            {rx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams">
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Exames</CardTitle>
                  <Button className="rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Exame
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {exams?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhum exame registrado</p>
                ) : (
                  <div className="space-y-3">
                    {exams?.map((exam: any) => (
                      <div key={exam.id} className="p-4 rounded-2xl border border-border">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{exam.exam_name}</h3>
                            <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                              <p>Tipo: {exam.exam_type}</p>
                              <p>Data: {new Date(exam.exam_date).toLocaleDateString("pt-BR")}</p>
                              {exam.laboratory && <p>Laboratório: {exam.laboratory}</p>}
                              {exam.result_summary && <p>Resultado: {exam.result_summary}</p>}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              exam.status === "completed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : exam.status === "scheduled"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {exam.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-3xl border-border">
                <CardHeader>
                  <CardTitle>Agendamentos Futuros</CardTitle>
                </CardHeader>
                <CardContent>
                  {schedules?.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhum agendamento futuro</p>
                  ) : (
                    <div className="space-y-3">
                      {schedules?.map((schedule: any) => (
                        <div key={schedule.id} className="p-4 rounded-2xl border border-border">
                          <p className="font-semibold">{schedule.appointment_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(schedule.appointment_date).toLocaleString("pt-BR")}
                          </p>
                          {schedule.value && <p className="text-sm mt-1">Valor: R$ {schedule.value}</p>}
                          <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                              schedule.payment_status === "paid"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {schedule.payment_status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-border">
                <CardHeader>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  {payments?.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhum pagamento registrado</p>
                  ) : (
                    <div className="space-y-3">
                      {payments?.map((payment: any) => (
                        <div key={payment.id} className="p-4 rounded-2xl border border-border">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold">R$ {Number.parseFloat(payment.amount).toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(payment.payment_date).toLocaleDateString("pt-BR")}
                              </p>
                              <p className="text-sm text-muted-foreground">{payment.payment_method}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${
                                payment.status === "completed"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
