"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { NavigationHeader } from "@/components/navigation-header"
import { PatientSearchSelect } from "@/components/patient-search-select"
import {
  Fingerprint, Plus, Search, Shield, CheckCircle, XCircle,
  Scan, Eye, Hand, Mic, Camera, History, RefreshCw
} from "lucide-react"
import {
  getBiometricTemplates,
  deleteBiometricTemplate,
  enrollBiometric,
  verifyBiometric,
  getVerificationHistory
} from "@/app/actions/biometrics"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const BIOMETRIC_TYPES = [
  { code: "fingerprint", name: "Impressao Digital", icon: Fingerprint },
  { code: "facial", name: "Reconhecimento Facial", icon: Camera },
  { code: "iris", name: "Leitura de Iris", icon: Eye },
  { code: "voice", name: "Reconhecimento de Voz", icon: Mic },
  { code: "palm", name: "Palma da Mao", icon: Hand },
]

const FINGER_POSITIONS = [
  "Polegar Direito", "Indicador Direito", "Medio Direito", "Anelar Direito", "Minimo Direito",
  "Polegar Esquerdo", "Indicador Esquerdo", "Medio Esquerdo", "Anelar Esquerdo", "Minimo Esquerdo"
]

export default function BiometriaPage() {
  const [templates, setTemplates] = useState<any[]>([])
  const [verifications, setVerifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<string>("")
  const [fingerPosition, setFingerPosition] = useState<string>("")
  const [capturing, setCapturing] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [templatesResult, historyResult] = await Promise.all([
      getBiometricTemplates(),
      getVerificationHistory()
    ])
    if (templatesResult.success) {
      setTemplates(templatesResult.data || [])
    }
    if (historyResult.success) {
      setVerifications(historyResult.data || [])
    }
    setLoading(false)
  }

  async function handleEnroll() {
    if (!selectedPatient || !selectedType) {
      toast.error("Selecione paciente e tipo de biometria")
      return
    }

    setCapturing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    const result = await enrollBiometric({
      patient_id: selectedPatient.id,
      biometric_type: selectedType as any,
      finger_position: selectedType === "fingerprint" ? fingerPosition : undefined,
      capture_quality: 85
    })

    if (result.success) {
      toast.success("Biometria cadastrada com sucesso!")
      setShowEnrollModal(false)
      setSelectedPatient(null)
      setSelectedType("")
      setFingerPosition("")
      loadData()
    } else {
      toast.error(result.error || "Erro ao cadastrar biometria")
    }
    setCapturing(false)
  }

  async function handleVerify() {
    if (!selectedPatient || !selectedType) {
      toast.error("Selecione paciente e tipo de biometria")
      return
    }

    setVerifying(true)
    setVerificationResult(null)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const result = await verifyBiometric({
      patient_id: selectedPatient.id,
      biometric_type: selectedType,
      verification_type: "authentication"
    })

    if (result.success) {
      setVerificationResult({
        verified: result.verified,
        score: result.matchScore
      })
      if (result.verified) {
        toast.success(`Verificado! Score: ${result.matchScore}%`)
      } else {
        toast.error("Verificacao falhou")
      }
      loadData()
    } else {
      toast.error(result.error || "Erro na verificacao")
    }
    setVerifying(false)
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja remover este template biometrico?")) {
      const result = await deleteBiometricTemplate(id)
      if (result.success) {
        toast.success("Template removido")
        loadData()
      } else {
        toast.error(result.error || "Erro ao remover")
      }
    }
  }

  const filteredTemplates = templates.filter(
    (t) =>
      t.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.template_type?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  function getBiometricIcon(type: string) {
    const biometric = BIOMETRIC_TYPES.find(b => b.code === type)
    const Icon = biometric?.icon || Fingerprint
    return <Icon className="w-6 h-6" />
  }

  function getBiometricName(type: string) {
    const biometric = BIOMETRIC_TYPES.find(b => b.code === type)
    return biometric?.name || type
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Fingerprint className="w-8 h-8 text-indigo-600" />
              Biometria
            </h1>
            <p className="text-muted-foreground">Gestao de templates biometricos de pacientes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowVerifyModal(true)}>
              <Shield className="w-4 h-4 mr-2" />
              Verificar
            </Button>
            <Button onClick={() => setShowEnrollModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Biometria
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Templates</p>
                  <p className="text-3xl font-bold">{templates.length}</p>
                </div>
                <Fingerprint className="w-10 h-10 text-indigo-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ativos</p>
                  <p className="text-3xl font-bold text-green-600">
                    {templates.filter(t => t.is_active).length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verificacoes Hoje</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {verifications.filter(v =>
                      new Date(v.created_at).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <Shield className="w-10 h-10 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {verifications.length > 0
                      ? Math.round((verifications.filter(v => v.verification_result).length / verifications.length) * 100)
                      : 0}%
                  </p>
                </div>
                <Scan className="w-10 h-10 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Templates Biometricos</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar paciente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <Fingerprint className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Nenhum template biometrico encontrado</p>
                    <Button variant="outline" className="mt-4" onClick={() => setShowEnrollModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Cadastrar Primeiro Template
                    </Button>
                  </div>
                ) : (
                  filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          {getBiometricIcon(template.template_type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{template.patient_name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{getBiometricName(template.template_type)}</Badge>
                            {template.finger_position && (
                              <Badge variant="secondary">{template.finger_position}</Badge>
                            )}
                            {template.is_active ? (
                              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Ativo
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                Inativo
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {template.verified_count || 0} verificacoes • Qualidade: {template.capture_quality || 'N/A'}%
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedPatient({ id: template.patient_id, full_name: template.patient_name })
                          setSelectedType(template.template_type)
                          setShowVerifyModal(true)
                        }}>
                          <Shield className="w-4 h-4 mr-2" />
                          Verificar
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(template.id)}>
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Verifications */}
        {verifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Verificacoes Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {verifications.slice(0, 10).map((v, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                    <div className="flex items-center gap-3">
                      {v.verification_result ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{v.patient_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {getBiometricName(v.biometric_type)} • {v.verification_type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={v.verification_result ? "default" : "destructive"}>
                        {v.match_score}%
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(v.created_at).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enroll Modal */}
        <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-indigo-600" />
                Cadastrar Biometria
              </DialogTitle>
              <DialogDescription>
                Selecione o paciente e tipo de biometria para cadastrar
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <PatientSearchSelect
                onPatientSelect={setSelectedPatient}
                selectedPatient={selectedPatient}
                label="Paciente"
                required
              />

              <div>
                <Label>Tipo de Biometria</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {BIOMETRIC_TYPES.map((type) => {
                    const Icon = type.icon
                    return (
                      <Button
                        key={type.code}
                        variant={selectedType === type.code ? "default" : "outline"}
                        className="h-auto py-3 flex flex-col items-center gap-1"
                        onClick={() => setSelectedType(type.code)}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs">{type.name}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {selectedType === "fingerprint" && (
                <div>
                  <Label>Posicao do Dedo</Label>
                  <select
                    className="w-full border rounded-md p-2 mt-1"
                    value={fingerPosition}
                    onChange={(e) => setFingerPosition(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {FINGER_POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              )}

              {capturing && (
                <div className="text-center py-8 border rounded-lg bg-muted">
                  <Scan className="w-16 h-16 mx-auto mb-4 text-indigo-600 animate-pulse" />
                  <p className="text-lg font-medium">Capturando biometria...</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedType === "fingerprint" ? "Posicione o dedo no leitor" :
                     selectedType === "facial" ? "Olhe para a camera" :
                     selectedType === "iris" ? "Aproxime o olho do scanner" :
                     selectedType === "voice" ? "Fale a frase solicitada" :
                     "Posicione a mao no leitor"}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEnrollModal(false)} disabled={capturing}>
                  Cancelar
                </Button>
                <Button onClick={handleEnroll} disabled={capturing || !selectedPatient || !selectedType}>
                  {capturing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Capturando...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4 mr-2" />
                      Iniciar Captura
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Verify Modal */}
        <Dialog open={showVerifyModal} onOpenChange={(open) => {
          setShowVerifyModal(open)
          if (!open) setVerificationResult(null)
        }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Verificar Biometria
              </DialogTitle>
              <DialogDescription>
                Verifique a identidade do paciente
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <PatientSearchSelect
                onPatientSelect={setSelectedPatient}
                selectedPatient={selectedPatient}
                label="Paciente"
                required
              />

              <div>
                <Label>Tipo de Biometria</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {BIOMETRIC_TYPES.map((type) => {
                    const Icon = type.icon
                    return (
                      <Button
                        key={type.code}
                        variant={selectedType === type.code ? "default" : "outline"}
                        className="h-auto py-3 flex flex-col items-center gap-1"
                        onClick={() => setSelectedType(type.code)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{type.name}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {verifying && (
                <div className="text-center py-8 border rounded-lg bg-muted">
                  <Scan className="w-16 h-16 mx-auto mb-4 text-indigo-600 animate-pulse" />
                  <p className="text-lg font-medium">Verificando...</p>
                </div>
              )}

              {verificationResult && (
                <div className={`text-center py-8 border rounded-lg ${
                  verificationResult.verified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  {verificationResult.verified ? (
                    <>
                      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                      <p className="text-lg font-medium text-green-800">Identidade Verificada!</p>
                      <p className="text-2xl font-bold text-green-600">{verificationResult.score}%</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
                      <p className="text-lg font-medium text-red-800">Verificacao Falhou</p>
                      <p className="text-2xl font-bold text-red-600">{verificationResult.score}%</p>
                    </>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setShowVerifyModal(false)
                  setVerificationResult(null)
                }} disabled={verifying}>
                  Fechar
                </Button>
                <Button onClick={handleVerify} disabled={verifying || !selectedPatient || !selectedType}>
                  {verifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Verificar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
