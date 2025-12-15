import { Card, CardContent } from "@/components/ui/card"
import { NavigationHeader } from "@/components/navigation-header"
import { Plus, FolderOpen, Bot, Settings, FileText, Users, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const actionCards = [
    {
      icon: Plus,
      title: "Novo atendimento",
      description: "Registrar um novo atendimento médico",
      href: "/atendimento/novo",
      color: "bg-secondary text-primary",
    },
    {
      icon: FileText,
      title: "Receita digital",
      description: "Emitir receita com assinatura ICP-Brasil",
      href: "/receitas/nova",
      color: "bg-primary text-primary-foreground",
    },
    {
      icon: Users,
      title: "CRM - Pacientes",
      description: "Gestão completa de pacientes e finanças",
      href: "/crm",
      color: "bg-accent text-accent-foreground",
    },
    {
      icon: Calendar,
      title: "Agendamentos",
      description: "Calendário e gestão de consultas",
      href: "/crm/calendario",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: FolderOpen,
      title: "Histórico",
      description: "Ver atendimentos anteriores",
      href: "/historico",
      color: "bg-accent text-accent-foreground",
    },
    {
      icon: TrendingUp,
      title: "Relatórios",
      description: "Análises financeiras e métricas",
      href: "/crm/relatorios",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Bot,
      title: "Assistente IA",
      description: "Tirar dúvidas e receber ajuda",
      href: "/assistente",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Settings,
      title: "Configurações",
      description: "Gerenciar perfil e preferências",
      href: "/configuracoes",
      color: "bg-muted text-foreground",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
              O que você quer fazer agora?
            </h1>
            <p className="text-lg text-muted-foreground text-balance">Escolha uma ação abaixo para continuar</p>
          </div>

          {/* Action Cards - Updated grid for more cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionCards.map((card, index) => (
              <Link key={index} href={card.href}>
                <Card className="rounded-3xl border-border hover:shadow-lg transition-all duration-300 hover:scale-105 h-full cursor-pointer group">
                  <CardContent className="p-6 flex flex-col items-start space-y-3 h-full">
                    <div
                      className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <card.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h2 className="text-lg font-semibold">{card.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
