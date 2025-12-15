"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavigationHeader } from "@/components/navigation-header"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSavingProfile(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso",
    })
    setIsSavingProfile(false)
  }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSavingPassword(true)

    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get("current-password")
    const newPassword = formData.get("new-password")
    const confirmPassword = formData.get("confirm-password")

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      setIsSavingPassword(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Senha alterada",
      description: "Sua senha foi atualizada com sucesso",
    })
    setIsSavingPassword(false)
    e.currentTarget.reset()
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
                  <Input id="config-name" name="name" defaultValue="Dr. João Silva" className="rounded-2xl h-11" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="config-crm">CRM</Label>
                    <Input id="config-crm" name="crm" defaultValue="123456" className="rounded-2xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="config-uf">UF</Label>
                    <Select name="crm_uf" defaultValue="SP">
                      <SelectTrigger id="config-uf" className="rounded-2xl h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="config-specialty">Especialidade</Label>
                  <Select name="specialty" defaultValue="cardiologia">
                    <SelectTrigger id="config-specialty" className="rounded-2xl h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologia">Cardiologia</SelectItem>
                      <SelectItem value="pediatria">Pediatria</SelectItem>
                      <SelectItem value="ortopedia">Ortopedia</SelectItem>
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
                    defaultValue="dr.silva@exemplo.com"
                    className="rounded-2xl h-11"
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
