"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavigationHeader } from "@/components/navigation-header"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { getCurrentUser, updateUserProfile, changePassword } from "@/app/actions/auth"

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    setLoading(true)
    const result = await getCurrentUser()
    if (result.success && result.user) {
      setUser(result.user)
    }
    setLoading(false)
  }

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSavingProfile(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      crm: formData.get("crm") as string,
      crm_uf: formData.get("crm_uf") as string,
      specialty: formData.get("specialty") as string,
      email: formData.get("email") as string,
    }

    const result = await updateUserProfile(data)

    if (result.success) {
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso",
      })
      loadUser()
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao atualizar perfil",
        variant: "destructive",
      })
    }
    setIsSavingProfile(false)
  }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSavingPassword(true)

    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get("current-password") as string
    const newPassword = formData.get("new-password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      setIsSavingPassword(false)
      return
    }

    if (newPassword.length < 8) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 8 caracteres",
        variant: "destructive",
      })
      setIsSavingPassword(false)
      return
    }

    const result = await changePassword(currentPassword, newPassword)

    if (result.success) {
      toast({
        title: "Senha alterada",
        description: "Sua senha foi atualizada com sucesso",
      })
      e.currentTarget.reset()
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao alterar senha",
        variant: "destructive",
      })
    }
    setIsSavingPassword(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <NavigationHeader showBack backHref="/dashboard" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Configurações</h1>
            <p className="text-lg text-muted-foreground">Gerencie seu perfil e preferências</p>
          </div>

          <form onSubmit={handleSaveProfile}>
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Informações do seu cadastro profissional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="config-name">Nome completo</Label>
                  <Input
                    id="config-name"
                    name="name"
                    defaultValue={user?.name || ""}
                    className="rounded-2xl h-11"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="config-crm">CRM</Label>
                    <Input
                      id="config-crm"
                      name="crm"
                      defaultValue={user?.crm || ""}
                      className="rounded-2xl h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="config-uf">UF</Label>
                    <Select name="crm_uf" defaultValue={user?.crm_uf || "SP"}>
                      <SelectTrigger id="config-uf" className="rounded-2xl h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">AC</SelectItem>
                        <SelectItem value="AL">AL</SelectItem>
                        <SelectItem value="AP">AP</SelectItem>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="BA">BA</SelectItem>
                        <SelectItem value="CE">CE</SelectItem>
                        <SelectItem value="DF">DF</SelectItem>
                        <SelectItem value="ES">ES</SelectItem>
                        <SelectItem value="GO">GO</SelectItem>
                        <SelectItem value="MA">MA</SelectItem>
                        <SelectItem value="MT">MT</SelectItem>
                        <SelectItem value="MS">MS</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="PA">PA</SelectItem>
                        <SelectItem value="PB">PB</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="PE">PE</SelectItem>
                        <SelectItem value="PI">PI</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="RN">RN</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                        <SelectItem value="RO">RO</SelectItem>
                        <SelectItem value="RR">RR</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="SE">SE</SelectItem>
                        <SelectItem value="TO">TO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="config-specialty">Especialidade</Label>
                  <Select name="specialty" defaultValue={user?.specialty || "clinica-geral"}>
                    <SelectTrigger id="config-specialty" className="rounded-2xl h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologia">Cardiologia</SelectItem>
                      <SelectItem value="dermatologia">Dermatologia</SelectItem>
                      <SelectItem value="endocrinologia">Endocrinologia</SelectItem>
                      <SelectItem value="gastroenterologia">Gastroenterologia</SelectItem>
                      <SelectItem value="ginecologia">Ginecologia</SelectItem>
                      <SelectItem value="neurologia">Neurologia</SelectItem>
                      <SelectItem value="oftalmologia">Oftalmologia</SelectItem>
                      <SelectItem value="ortopedia">Ortopedia</SelectItem>
                      <SelectItem value="otorrinolaringologia">Otorrinolaringologia</SelectItem>
                      <SelectItem value="pediatria">Pediatria</SelectItem>
                      <SelectItem value="psiquiatria">Psiquiatria</SelectItem>
                      <SelectItem value="urologia">Urologia</SelectItem>
                      <SelectItem value="clinica-geral">Clínica Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="config-email">Email</Label>
                  <Input
                    id="config-email"
                    name="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    className="rounded-2xl h-11"
                    required
                  />
                </div>
                <Button type="submit" className="rounded-3xl" disabled={isSavingProfile}>
                  {isSavingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>
          </form>

          <form onSubmit={handleChangePassword}>
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Alterar senha e configurações de acesso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha atual</Label>
                  <Input
                    id="current-password"
                    name="current-password"
                    type="password"
                    className="rounded-2xl h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova senha</Label>
                  <Input
                    id="new-password"
                    name="new-password"
                    type="password"
                    className="rounded-2xl h-11"
                    required
                    minLength={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    className="rounded-2xl h-11"
                    required
                    minLength={8}
                  />
                </div>
                <Button type="submit" className="rounded-3xl" disabled={isSavingPassword}>
                  {isSavingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Alterar senha
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
