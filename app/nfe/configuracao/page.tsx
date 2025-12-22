"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Building2,
  MapPin,
  FileKey,
  Settings,
  Mail,
  Save,
  AlertTriangle,
  CheckCircle,
  Upload,
  Shield,
  Clock,
  RefreshCw,
  ArrowLeft,
  Building,
  CreditCard,
  FileText,
  Phone,
  Globe,
  Hash,
} from "lucide-react"
import Link from "next/link"
import { getNFeFullConfiguration, updateNFeFullConfiguration, testCertificate } from "@/app/actions/nfe"
import {
  validateCNPJ,
  validateCPF,
  formatCNPJ,
  formatCEP,
  formatPhone,
  fetchAddressByCEP,
  UF_LIST,
  TAX_REGIMES,
  CRT_CODES,
  CNAE_HEALTH_CODES,
} from "@/lib/fiscal-utils"

interface NFeConfiguration {
  // Ambiente
  environment: "sandbox" | "production"

  // Certificado Digital
  certificate_path: string
  certificate_password: string
  certificate_expires_at: string | null
  certificate_subject: string | null

  // Dados da Empresa
  company_name: string
  company_fantasy_name: string
  company_cnpj: string
  company_ie: string
  company_im: string
  company_cnae: string
  company_cnae_secondary: string[]
  company_regime_tributario: string
  company_crt: string
  optante_simples: boolean
  optante_mei: boolean

  // Endereço
  address_street: string
  address_number: string
  address_complement: string
  address_neighborhood: string
  address_city: string
  address_state: string
  address_zipcode: string
  address_city_code: string

  // Contato
  phone: string
  email: string
  website: string

  // Configurações NFe
  nfe_series: string
  nfe_last_number: number
  nfe_csc: string
  nfe_csc_id: string

  // Configurações NFSe
  nfse_rps_series: string
  nfse_last_rps_number: number
  nfse_city_code: string
  nfse_provider_code: string

  // Contabilista
  accountant_name: string
  accountant_cpf: string
  accountant_crc: string
  accountant_email: string
  accountant_phone: string
  send_copy_to_accountant: boolean
  accountant_send_frequency: "immediate" | "daily" | "weekly"

  // Opções
  send_email_to_customer: boolean
  auto_send_to_sefaz: boolean
  include_pdf_in_email: boolean
  include_xml_in_email: boolean
}

const defaultConfig: NFeConfiguration = {
  environment: "sandbox",
  certificate_path: "",
  certificate_password: "",
  certificate_expires_at: null,
  certificate_subject: null,
  company_name: "",
  company_fantasy_name: "",
  company_cnpj: "",
  company_ie: "",
  company_im: "",
  company_cnae: "",
  company_cnae_secondary: [],
  company_regime_tributario: "1",
  company_crt: "1",
  optante_simples: true,
  optante_mei: false,
  address_street: "",
  address_number: "",
  address_complement: "",
  address_neighborhood: "",
  address_city: "",
  address_state: "",
  address_zipcode: "",
  address_city_code: "",
  phone: "",
  email: "",
  website: "",
  nfe_series: "1",
  nfe_last_number: 0,
  nfe_csc: "",
  nfe_csc_id: "",
  nfse_rps_series: "1",
  nfse_last_rps_number: 0,
  nfse_city_code: "",
  nfse_provider_code: "",
  accountant_name: "",
  accountant_cpf: "",
  accountant_crc: "",
  accountant_email: "",
  accountant_phone: "",
  send_copy_to_accountant: true,
  accountant_send_frequency: "immediate",
  send_email_to_customer: true,
  auto_send_to_sefaz: false,
  include_pdf_in_email: true,
  include_xml_in_email: true,
}

export default function NFeConfigPage() {
  const [config, setConfig] = useState<NFeConfiguration>(defaultConfig)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [testingCertificate, setTestingCertificate] = useState(false)

  useEffect(() => {
    loadConfig()
  }, [])

  async function loadConfig() {
    setLoading(true)
    try {
      const result = await getNFeFullConfiguration()
      if (result.success && result.data) {
        setConfig({ ...defaultConfig, ...result.data })
      }
    } catch (error) {
      console.error("Erro ao carregar configuração:", error)
      toast.error("Erro ao carregar configurações")
    }
    setLoading(false)
  }

  function updateConfig(field: keyof NFeConfiguration, value: any) {
    setConfig((prev) => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando alterado
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  async function handleCEPBlur() {
    const cep = config.address_zipcode.replace(/[^\d]/g, "")
    if (cep.length === 8) {
      const address = await fetchAddressByCEP(cep)
      if (address) {
        setConfig((prev) => ({
          ...prev,
          address_street: address.logradouro,
          address_neighborhood: address.bairro,
          address_city: address.localidade,
          address_state: address.uf,
          address_city_code: address.ibge,
          address_zipcode: formatCEP(cep),
        }))
        toast.success("Endereço encontrado!")
      } else {
        toast.error("CEP não encontrado")
      }
    }
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {}

    // Validar CNPJ
    if (!config.company_cnpj) {
      newErrors.company_cnpj = "CNPJ é obrigatório"
    } else if (!validateCNPJ(config.company_cnpj)) {
      newErrors.company_cnpj = "CNPJ inválido"
    }

    // Validar Razão Social
    if (!config.company_name) {
      newErrors.company_name = "Razão Social é obrigatória"
    }

    // Validar Endereço
    if (!config.address_street) newErrors.address_street = "Logradouro é obrigatório"
    if (!config.address_number) newErrors.address_number = "Número é obrigatório"
    if (!config.address_neighborhood) newErrors.address_neighborhood = "Bairro é obrigatório"
    if (!config.address_city) newErrors.address_city = "Cidade é obrigatória"
    if (!config.address_state) newErrors.address_state = "Estado é obrigatório"
    if (!config.address_zipcode) newErrors.address_zipcode = "CEP é obrigatório"
    if (!config.address_city_code) newErrors.address_city_code = "Código IBGE é obrigatório"

    // Validar CPF do contador (se preenchido)
    if (config.accountant_cpf && !validateCPF(config.accountant_cpf)) {
      newErrors.accountant_cpf = "CPF inválido"
    }

    // Validar email do contador (se envio habilitado)
    if (config.send_copy_to_accountant && !config.accountant_email) {
      newErrors.accountant_email = "Email do contador é obrigatório para envio automático"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSave() {
    if (!validateForm()) {
      toast.error("Corrija os erros antes de salvar")
      return
    }

    setSaving(true)
    try {
      const result = await updateNFeFullConfiguration(config)
      if (result.success) {
        toast.success("Configurações salvas com sucesso!")
      } else {
        toast.error(result.error || "Erro ao salvar configurações")
      }
    } catch (error) {
      console.error("Erro ao salvar:", error)
      toast.error("Erro ao salvar configurações")
    }
    setSaving(false)
  }

  async function handleTestCertificate() {
    if (!config.certificate_password) {
      toast.error("Informe a senha do certificado")
      return
    }

    setTestingCertificate(true)
    try {
      const result = await testCertificate(config.certificate_password)
      if (result.success) {
        toast.success(`Certificado válido! Expira em ${result.daysToExpire} dias`)
        if (result.expiresAt) {
          updateConfig("certificate_expires_at", result.expiresAt)
        }
        if (result.subject) {
          updateConfig("certificate_subject", result.subject)
        }
      } else {
        toast.error(result.error || "Erro ao validar certificado")
      }
    } catch (error) {
      toast.error("Erro ao testar certificado")
    }
    setTestingCertificate(false)
  }

  function getCertificateStatus() {
    if (!config.certificate_expires_at) return null

    const expiresAt = new Date(config.certificate_expires_at)
    const now = new Date()
    const diffDays = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { status: "expired", text: "Expirado", color: "destructive" }
    } else if (diffDays <= 30) {
      return { status: "warning", text: `Expira em ${diffDays} dias`, color: "warning" }
    } else {
      return { status: "valid", text: `Válido por ${diffDays} dias`, color: "success" }
    }
  }

  const certStatus = getCertificateStatus()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/nfe">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Configuração NFE/NFSe
          </h1>
          <p className="text-muted-foreground">Configure os dados fiscais para emissão de notas</p>
        </div>
      </div>

      {config.environment === "sandbox" && (
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Ambiente de Homologação</AlertTitle>
          <AlertDescription>
            Você está em ambiente de testes. As notas emitidas não têm validade fiscal.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="empresa" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="empresa" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="endereco" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Endereço</span>
          </TabsTrigger>
          <TabsTrigger value="certificado" className="flex items-center gap-2">
            <FileKey className="h-4 w-4" />
            <span className="hidden sm:inline">Certificado</span>
          </TabsTrigger>
          <TabsTrigger value="nfe" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">NFE/NFSe</span>
          </TabsTrigger>
          <TabsTrigger value="contabilista" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Contabilista</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB EMPRESA */}
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Dados da Empresa
              </CardTitle>
              <CardDescription>Informações cadastrais da empresa emissora de NFE</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Ambiente */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <div>
                    <Label className="text-base font-medium">Ambiente</Label>
                    <p className="text-sm text-muted-foreground">Selecione o ambiente de emissão</p>
                  </div>
                </div>
                <Select
                  value={config.environment}
                  onValueChange={(v) => updateConfig("environment", v as "sandbox" | "production")}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandbox">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Homologação</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="production">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">Produção</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Identificação */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company_name">
                    Razão Social <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company_name"
                    value={config.company_name}
                    onChange={(e) => updateConfig("company_name", e.target.value)}
                    placeholder="Razão Social da Empresa LTDA"
                    className={errors.company_name ? "border-destructive" : ""}
                  />
                  {errors.company_name && <p className="text-sm text-destructive">{errors.company_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_fantasy_name">Nome Fantasia</Label>
                  <Input
                    id="company_fantasy_name"
                    value={config.company_fantasy_name}
                    onChange={(e) => updateConfig("company_fantasy_name", e.target.value)}
                    placeholder="Nome Fantasia"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="company_cnpj">
                    CNPJ <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company_cnpj"
                    value={config.company_cnpj}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "")
                      if (value.length <= 14) {
                        updateConfig("company_cnpj", formatCNPJ(value))
                      }
                    }}
                    placeholder="00.000.000/0000-00"
                    className={errors.company_cnpj ? "border-destructive" : ""}
                  />
                  {errors.company_cnpj && <p className="text-sm text-destructive">{errors.company_cnpj}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_ie">Inscrição Estadual (IE)</Label>
                  <Input
                    id="company_ie"
                    value={config.company_ie}
                    onChange={(e) => updateConfig("company_ie", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="ISENTO ou número"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_im">Inscrição Municipal (IM)</Label>
                  <Input
                    id="company_im"
                    value={config.company_im}
                    onChange={(e) => updateConfig("company_im", e.target.value)}
                    placeholder="Número da IM"
                  />
                </div>
              </div>

              <Separator />

              {/* Regime Tributário */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company_regime_tributario">Regime Tributário</Label>
                  <Select
                    value={config.company_regime_tributario}
                    onValueChange={(v) => updateConfig("company_regime_tributario", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o regime" />
                    </SelectTrigger>
                    <SelectContent>
                      {TAX_REGIMES.map((regime) => (
                        <SelectItem key={regime.code} value={regime.code}>
                          {regime.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_crt">CRT - Código Regime Tributário</Label>
                  <Select value={config.company_crt} onValueChange={(v) => updateConfig("company_crt", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o CRT" />
                    </SelectTrigger>
                    <SelectContent>
                      {CRT_CODES.map((crt) => (
                        <SelectItem key={crt.code} value={crt.code}>
                          {crt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="optante_simples"
                    checked={config.optante_simples}
                    onCheckedChange={(v) => updateConfig("optante_simples", v)}
                  />
                  <Label htmlFor="optante_simples">Optante Simples Nacional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="optante_mei"
                    checked={config.optante_mei}
                    onCheckedChange={(v) => updateConfig("optante_mei", v)}
                  />
                  <Label htmlFor="optante_mei">MEI</Label>
                </div>
              </div>

              <Separator />

              {/* CNAE */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company_cnae">CNAE Principal</Label>
                  <Select value={config.company_cnae} onValueChange={(v) => updateConfig("company_cnae", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o CNAE" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {CNAE_HEALTH_CODES.map((cnae) => (
                        <SelectItem key={cnae.code} value={cnae.code}>
                          {cnae.code} - {cnae.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Contato</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={config.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, "")
                        if (value.length <= 11) {
                          updateConfig("phone", formatPhone(value))
                        }
                      }}
                      placeholder="Telefone"
                    />
                    <Input
                      value={config.email}
                      onChange={(e) => updateConfig("email", e.target.value)}
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB ENDEREÇO */}
        <TabsContent value="endereco">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço da Empresa
              </CardTitle>
              <CardDescription>Endereço completo com código IBGE (obrigatório para NFE)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="address_zipcode">
                    CEP <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address_zipcode"
                    value={config.address_zipcode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "")
                      if (value.length <= 8) {
                        updateConfig("address_zipcode", formatCEP(value))
                      }
                    }}
                    onBlur={handleCEPBlur}
                    placeholder="00000-000"
                    className={errors.address_zipcode ? "border-destructive" : ""}
                  />
                  {errors.address_zipcode && <p className="text-sm text-destructive">{errors.address_zipcode}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address_street">
                    Logradouro <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address_street"
                    value={config.address_street}
                    onChange={(e) => updateConfig("address_street", e.target.value)}
                    placeholder="Rua, Avenida, etc."
                    className={errors.address_street ? "border-destructive" : ""}
                  />
                  {errors.address_street && <p className="text-sm text-destructive">{errors.address_street}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="address_number">
                    Número <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address_number"
                    value={config.address_number}
                    onChange={(e) => updateConfig("address_number", e.target.value)}
                    placeholder="123"
                    className={errors.address_number ? "border-destructive" : ""}
                  />
                  {errors.address_number && <p className="text-sm text-destructive">{errors.address_number}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_complement">Complemento</Label>
                  <Input
                    id="address_complement"
                    value={config.address_complement}
                    onChange={(e) => updateConfig("address_complement", e.target.value)}
                    placeholder="Sala, Andar, etc."
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address_neighborhood">
                    Bairro <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address_neighborhood"
                    value={config.address_neighborhood}
                    onChange={(e) => updateConfig("address_neighborhood", e.target.value)}
                    placeholder="Bairro"
                    className={errors.address_neighborhood ? "border-destructive" : ""}
                  />
                  {errors.address_neighborhood && (
                    <p className="text-sm text-destructive">{errors.address_neighborhood}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="address_city">
                    Cidade <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address_city"
                    value={config.address_city}
                    onChange={(e) => updateConfig("address_city", e.target.value)}
                    placeholder="Cidade"
                    className={errors.address_city ? "border-destructive" : ""}
                  />
                  {errors.address_city && <p className="text-sm text-destructive">{errors.address_city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_state">
                    Estado <span className="text-destructive">*</span>
                  </Label>
                  <Select value={config.address_state} onValueChange={(v) => updateConfig("address_state", v)}>
                    <SelectTrigger className={errors.address_state ? "border-destructive" : ""}>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {UF_LIST.map((uf) => (
                        <SelectItem key={uf} value={uf}>
                          {uf}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.address_state && <p className="text-sm text-destructive">{errors.address_state}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_city_code">
                    Código IBGE <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address_city_code"
                    value={config.address_city_code}
                    onChange={(e) => updateConfig("address_city_code", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="0000000"
                    className={errors.address_city_code ? "border-destructive" : ""}
                  />
                  {errors.address_city_code && <p className="text-sm text-destructive">{errors.address_city_code}</p>}
                  <p className="text-xs text-muted-foreground">Preenchido automaticamente pelo CEP</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB CERTIFICADO */}
        <TabsContent value="certificado">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileKey className="h-5 w-5" />
                Certificado Digital A1
              </CardTitle>
              <CardDescription>Certificado digital para assinatura das notas fiscais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {certStatus && (
                <Alert variant={certStatus.status === "expired" ? "destructive" : "default"}>
                  {certStatus.status === "valid" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : certStatus.status === "warning" ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertTitle>Status do Certificado</AlertTitle>
                  <AlertDescription>
                    {certStatus.text}
                    {config.certificate_subject && (
                      <span className="block text-xs mt-1">Titular: {config.certificate_subject}</span>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Upload do Certificado (.pfx / .p12)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept=".pfx,.p12"
                      className="hidden"
                      id="certificate_upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setCertificateFile(file)
                          updateConfig("certificate_path", file.name)
                          toast.info(`Certificado selecionado: ${file.name}`)
                        }
                      }}
                    />
                    <label htmlFor="certificate_upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {config.certificate_path || "Clique para selecionar o certificado"}
                      </p>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificate_password">Senha do Certificado</Label>
                    <Input
                      id="certificate_password"
                      type="password"
                      value={config.certificate_password}
                      onChange={(e) => updateConfig("certificate_password", e.target.value)}
                      placeholder="Senha do certificado"
                    />
                    <p className="text-xs text-muted-foreground">A senha é armazenada de forma criptografada</p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleTestCertificate}
                    disabled={testingCertificate || !config.certificate_password}
                    className="w-full"
                  >
                    {testingCertificate ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Shield className="h-4 w-4 mr-2" />
                    )}
                    Testar Certificado
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Importante</AlertTitle>
                <AlertDescription>
                  O certificado digital A1 é obrigatório para emissão de NFE. Certifique-se de que o certificado está
                  válido e é compatível com o CNPJ da empresa.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB NFE/NFSE */}
        <TabsContent value="nfe">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Configurações NFE/NFSe
              </CardTitle>
              <CardDescription>Séries, numeração e configurações de emissão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Configurações NFe */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  NF-e (Nota Fiscal Eletrônica)
                </h3>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="nfe_series">Série</Label>
                    <Input
                      id="nfe_series"
                      value={config.nfe_series}
                      onChange={(e) => updateConfig("nfe_series", e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nfe_last_number">Último Número</Label>
                    <Input
                      id="nfe_last_number"
                      type="number"
                      value={config.nfe_last_number}
                      onChange={(e) => updateConfig("nfe_last_number", parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nfe_csc">CSC (NFC-e)</Label>
                    <Input
                      id="nfe_csc"
                      value={config.nfe_csc}
                      onChange={(e) => updateConfig("nfe_csc", e.target.value)}
                      placeholder="Código de Segurança"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nfe_csc_id">ID do CSC</Label>
                    <Input
                      id="nfe_csc_id"
                      value={config.nfe_csc_id}
                      onChange={(e) => updateConfig("nfe_csc_id", e.target.value)}
                      placeholder="ID"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Configurações NFSe */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  NFS-e (Nota Fiscal de Serviços)
                </h3>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="nfse_rps_series">Série RPS</Label>
                    <Input
                      id="nfse_rps_series"
                      value={config.nfse_rps_series}
                      onChange={(e) => updateConfig("nfse_rps_series", e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nfse_last_rps_number">Último RPS</Label>
                    <Input
                      id="nfse_last_rps_number"
                      type="number"
                      value={config.nfse_last_rps_number}
                      onChange={(e) => updateConfig("nfse_last_rps_number", parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nfse_city_code">Código Município</Label>
                    <Input
                      id="nfse_city_code"
                      value={config.nfse_city_code}
                      onChange={(e) => updateConfig("nfse_city_code", e.target.value)}
                      placeholder="Código IBGE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nfse_provider_code">Código Prestador</Label>
                    <Input
                      id="nfse_provider_code"
                      value={config.nfse_provider_code}
                      onChange={(e) => updateConfig("nfse_provider_code", e.target.value)}
                      placeholder="Código na prefeitura"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Opções de Envio */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Opções de Emissão
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enviar automaticamente para SEFAZ</Label>
                      <p className="text-sm text-muted-foreground">Envia a nota assim que criada</p>
                    </div>
                    <Switch
                      checked={config.auto_send_to_sefaz}
                      onCheckedChange={(v) => updateConfig("auto_send_to_sefaz", v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enviar email para o cliente</Label>
                      <p className="text-sm text-muted-foreground">Envia cópia da nota para o email do paciente</p>
                    </div>
                    <Switch
                      checked={config.send_email_to_customer}
                      onCheckedChange={(v) => updateConfig("send_email_to_customer", v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Incluir PDF (DANFE) no email</Label>
                      <p className="text-sm text-muted-foreground">Anexa o PDF da nota no email</p>
                    </div>
                    <Switch
                      checked={config.include_pdf_in_email}
                      onCheckedChange={(v) => updateConfig("include_pdf_in_email", v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Incluir XML no email</Label>
                      <p className="text-sm text-muted-foreground">Anexa o XML da nota no email</p>
                    </div>
                    <Switch
                      checked={config.include_xml_in_email}
                      onCheckedChange={(v) => updateConfig("include_xml_in_email", v)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB CONTABILISTA */}
        <TabsContent value="contabilista">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Dados do Contabilista
              </CardTitle>
              <CardDescription>Configure o envio automático de notas para o contador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accountant_name">Nome do Contador</Label>
                  <Input
                    id="accountant_name"
                    value={config.accountant_name}
                    onChange={(e) => updateConfig("accountant_name", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountant_cpf">CPF do Contador</Label>
                  <Input
                    id="accountant_cpf"
                    value={config.accountant_cpf}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "")
                      if (value.length <= 11) {
                        updateConfig(
                          "accountant_cpf",
                          value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                        )
                      }
                    }}
                    placeholder="000.000.000-00"
                    className={errors.accountant_cpf ? "border-destructive" : ""}
                  />
                  {errors.accountant_cpf && <p className="text-sm text-destructive">{errors.accountant_cpf}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="accountant_crc">CRC</Label>
                  <Input
                    id="accountant_crc"
                    value={config.accountant_crc}
                    onChange={(e) => updateConfig("accountant_crc", e.target.value)}
                    placeholder="Número do CRC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountant_email">
                    Email {config.send_copy_to_accountant && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id="accountant_email"
                    type="email"
                    value={config.accountant_email}
                    onChange={(e) => updateConfig("accountant_email", e.target.value)}
                    placeholder="contador@escritorio.com.br"
                    className={errors.accountant_email ? "border-destructive" : ""}
                  />
                  {errors.accountant_email && <p className="text-sm text-destructive">{errors.accountant_email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountant_phone">Telefone</Label>
                  <Input
                    id="accountant_phone"
                    value={config.accountant_phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "")
                      if (value.length <= 11) {
                        updateConfig("accountant_phone", formatPhone(value))
                      }
                    }}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enviar cópia das notas para o contador</Label>
                    <p className="text-sm text-muted-foreground">Envia XML e PDF automaticamente</p>
                  </div>
                  <Switch
                    checked={config.send_copy_to_accountant}
                    onCheckedChange={(v) => updateConfig("send_copy_to_accountant", v)}
                  />
                </div>

                {config.send_copy_to_accountant && (
                  <div className="space-y-2">
                    <Label>Frequência de Envio</Label>
                    <Select
                      value={config.accountant_send_frequency}
                      onValueChange={(v) =>
                        updateConfig("accountant_send_frequency", v as "immediate" | "daily" | "weekly")
                      }
                    >
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Imediato (a cada nota)</SelectItem>
                        <SelectItem value="daily">Diário (resumo às 18h)</SelectItem>
                        <SelectItem value="weekly">Semanal (toda segunda)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão Salvar */}
      <div className="flex justify-end gap-4 mt-6">
        <Link href="/nfe">
          <Button variant="outline">Cancelar</Button>
        </Link>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
