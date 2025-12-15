"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Calendar, FileText, Activity, DollarSign, Plus, X, Edit, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { getPatientDetails, createSchedule, addExam, updatePatient, deletePatient } from "@/app/actions/crm"
import { useParams, useRouter } from "next/navigation"

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showExamModal, setShowExamModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "09:00",
    type: "consulta",
    duration: "60",
    value: "",
    paymentMethod: "",
    notes: "",
  })

  const [examForm, setExamForm] = useState({
    examName: "",
    examType: "laboratorial",
    examDate: "",
    laboratory: "",
    notes: "",
  })

  const [editForm, setEditForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    allergies: "",
    chronic_conditions: "",
  })

  useEffect(() => {
    loadPatientData()
  }, [])

  async function loadPatientData() {
    setLoading(true)
    const result = await getPatientDetails(patientId)
    if (result.success) {
      setData(result)
      if (result.patient) {
        setEditForm({
          full_name: result.patient.full_name || "",
          phone: result.patient.phone || "",
          email: result.patient.email || "",
          address: result.patient.address || "",
          allergies: result.patient.allergies || "",
          chronic_conditions: result.patient.chronic_conditions || "",
        })
      }
    }
    setLoading(false)
  }

  const handleCreateSchedule = async () => {
    if (!scheduleForm.date || !scheduleForm.time) {
      setError("Data e horário são obrigatórios")
      return
    }

    setSaving(true)
    setError("")

    try {
      const appointmentDateTime = new Date(scheduleForm.date)
      const [hours, minutes] = scheduleForm.time.split(":")
      appointmentDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0, 0)

      const result = await createSchedule({
        patient_id: patientId,
        appointment_date: appointmentDateTime.toISOString(),
        duration_minutes: Number.parseInt(scheduleForm.duration) || 60,
        appointment_type: scheduleForm.type,
        notes: scheduleForm.notes || null,
        value: scheduleForm.value ? Number.parseFloat(scheduleForm.value) : null,
        payment_method: scheduleForm.paymentMethod || null,
      })

      if (result.success) {
        await loadPatientData()
        setShowScheduleModal(false)
        setScheduleForm({
          date: "",
          time: "09:00",
          type: "consulta",
          duration: "60",
          value: "",
          paymentMethod: "",
          notes: "",
        })
      } else {
        setError(result.error || "Erro ao criar agendamento")
      }
    } catch (err: any) {
      setError(err.message || "Erro ao criar agendamento")
    } finally {
      setSaving(false)
    }
  }

  const handleAddExam = async () => {
    if (!examForm.examName || !examForm.examDate) {
      setError("Nome do exame e data são obrigatórios")
      return
    }

    setSaving(true)
    setError("")

    try {
      const result = await addExam({
        patient_id: patientId,
        exam_name: examForm.examName,
        exam_type: examForm.examType,
        exam_date: examForm.examDate,
        laboratory: examForm.laboratory || null,
        notes: examForm.notes || null,
      })

      if (result.success) {
        await loadPatientData()
        setShowExamModal(false)
        setExamForm({
          examName: "",
          examType: "laboratorial",
          examDate: "",
          laboratory: "",
          notes: "",
        })
      } else {
        setError(result.error || "Erro ao adicionar exame")
      }
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar exame")
    } finally {
      setSaving(false)
    }
  }

  const handleUpdatePatient = async () => {
    setSaving(true)
    setError("")

    try {
      const result = await updatePatient(patientId, editForm)

      if (result.success) {
        await loadPatientData()
        setShowEditModal(false)
      } else {
        setError(result.error || "Erro ao atualizar paciente")
      }
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar paciente")
    } finally {
      setSaving(false)
    }
  }

  const handleDeletePatient = async () => {
    setSaving(true)
    setError("")

    try {
      const result = await deletePatient(patientId)

      if (result.success) {
        router.push("/crm")
      } else {
        setError(result.error || "Erro ao excluir paciente")
      }
    } catch (err: any) {
      setError(err.message || "Erro ao excluir paciente")
    } finally {
      setSaving(false)
    }
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
            <div className="flex items-start justify-between flex-wrap gap-4">
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

              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" className="rounded-xl bg-transparent" onClick={() => setShowEditModal(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
                <Button className="rounded-xl" onClick={() => setShowScheduleModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </div>
            </div>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
          <TabsList className="rounded-2xl flex-wrap h-auto gap-1">
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
                            {apt.status === "completed" ? "Concluído" : apt.status}
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
                            {rx.status === "active" ? "Ativa" : rx.status}
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
                  <Button className="rounded-xl" onClick={() => setShowExamModal(true)}>
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
                              exam.status === "concluido"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : exam.status === "agendado"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {exam.status === "concluido"
                              ? "Concluído"
                              : exam.status === "pendente"
                                ? "Pendente"
                                : exam.status}
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
                            {schedule.payment_status === "paid" ? "Pago" : "Pendente"}
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
                              {payment.status === "completed" ? "Concluído" : payment.status}
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

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Novo Agendamento</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowScheduleModal(false)} className="rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data *</Label>
                  <Input
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Horário *</Label>
                  <Input
                    type="time"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Consulta</Label>
                <select
                  value={scheduleForm.type}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                >
                  <option value="consulta">Consulta</option>
                  <option value="retorno">Retorno</option>
                  <option value="exame">Exame</option>
                  <option value="procedimento">Procedimento</option>
                  <option value="teleconsulta">Teleconsulta</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duração</Label>
                  <select
                    value={scheduleForm.duration}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="30">30 minutos</option>
                    <option value="45">45 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="90">1h30</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={scheduleForm.value}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, value: e.target.value })}
                    placeholder="0,00"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Forma de Pagamento</Label>
                <select
                  value={scheduleForm.paymentMethod}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, paymentMethod: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                >
                  <option value="">Selecione</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="pix">PIX</option>
                  <option value="cartao_credito">Cartão de Crédito</option>
                  <option value="cartao_debito">Cartão de Débito</option>
                  <option value="plano_saude">Plano de Saúde</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                  placeholder="Observações opcionais"
                  className="rounded-xl"
                />
              </div>

              <Button onClick={handleCreateSchedule} className="w-full rounded-2xl" disabled={saving}>
                {saving ? "Agendando..." : "Agendar Consulta"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showExamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Adicionar Exame</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowExamModal(false)} className="rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">{error}</div>}

              <div className="space-y-2">
                <Label>Nome do Exame *</Label>
                <Input
                  value={examForm.examName}
                  onChange={(e) => setExamForm({ ...examForm, examName: e.target.value })}
                  placeholder="Ex: Hemograma Completo"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <select
                    value={examForm.examType}
                    onChange={(e) => setExamForm({ ...examForm, examType: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="laboratorial">Laboratorial</option>
                    <option value="imagem">Imagem</option>
                    <option value="cardiologico">Cardiológico</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Data *</Label>
                  <Input
                    type="date"
                    value={examForm.examDate}
                    onChange={(e) => setExamForm({ ...examForm, examDate: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Laboratório</Label>
                <Input
                  value={examForm.laboratory}
                  onChange={(e) => setExamForm({ ...examForm, laboratory: e.target.value })}
                  placeholder="Nome do laboratório"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea
                  value={examForm.notes}
                  onChange={(e) => setExamForm({ ...examForm, notes: e.target.value })}
                  placeholder="Observações opcionais"
                  className="rounded-xl"
                />
              </div>

              <Button onClick={handleAddExam} className="w-full rounded-2xl" disabled={saving}>
                {saving ? "Adicionando..." : "Adicionar Exame"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Editar Paciente</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowEditModal(false)} className="rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">{error}</div>}

              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Endereço</Label>
                <Input
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Alergias</Label>
                <Textarea
                  value={editForm.allergies}
                  onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Condições Crônicas</Label>
                <Textarea
                  value={editForm.chronic_conditions}
                  onChange={(e) => setEditForm({ ...editForm, chronic_conditions: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <Button onClick={handleUpdatePatient} className="w-full rounded-2xl" disabled={saving}>
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-red-600">Excluir Paciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">{error}</div>}

              <p className="text-muted-foreground">
                Tem certeza que deseja excluir o paciente <strong>{patient.full_name}</strong>? Esta ação não pode ser
                desfeita.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 rounded-xl"
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeletePatient}
                  className="flex-1 rounded-xl"
                  disabled={saving}
                >
                  {saving ? "Excluindo..." : "Excluir"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
