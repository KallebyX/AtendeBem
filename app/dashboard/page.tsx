import { Card, CardContent } from "@/components/ui/card"
import { NavigationHeader } from "@/components/navigation-header"
import {
  Plus,
  FolderOpen,
  Bot,
  Settings,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  ClipboardList,
  Package,
  Video,
  MessageCircle,
  MessageSquare,
  Receipt,
  FileBarChart,
  ImageIcon,
  Fingerprint,
  Smile,
  FileHeart,
  DollarSign,
  FileSpreadsheet,
  TestTube,
  Briefcase,
  Building,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const actionCards = [
    // Core Actions
    {
      icon: Plus,
      title: "Nova Consulta",
      description: "Atendimento completo integrado",
      href: "/consulta",
      color: "bg-secondary text-primary",
      category: "Atendimento",
    },
    {
      icon: FileText,
      title: "Receita digital",
      description: "Emitir receita com assinatura ICP-Brasil",
      href: "/receitas/nova",
      color: "bg-primary text-primary-foreground",
      category: "Atendimento",
    },
    {
      icon: ClipboardList,
      title: "Anamnese",
      description: "Prontuário eletrônico e anamnese completa",
      href: "/anamnese",
      color: "bg-teal-500/10 text-teal-600",
      category: "Atendimento",
    },

    // Patient Management
    {
      icon: Users,
      title: "CRM - Pacientes",
      description: "Gestão completa de pacientes e finanças",
      href: "/crm",
      color: "bg-accent text-accent-foreground",
      category: "Gestão",
    },
    {
      icon: Calendar,
      title: "Agendamentos",
      description: "Calendário e gestão de consultas",
      href: "/crm/calendario",
      color: "bg-blue-500/10 text-blue-600",
      category: "Gestão",
    },
    {
      icon: FolderOpen,
      title: "Histórico",
      description: "Ver atendimentos anteriores",
      href: "/historico",
      color: "bg-accent text-accent-foreground",
      category: "Gestão",
    },
    {
      icon: FileHeart,
      title: "Prontuário (EMR)",
      description: "Prontuário eletrônico do paciente",
      href: "/emr",
      color: "bg-rose-500/10 text-rose-600",
      category: "Gestão",
    },

    // Financial
    {
      icon: DollarSign,
      title: "Financeiro",
      description: "Receitas, despesas e fluxo de caixa",
      href: "/financeiro",
      color: "bg-emerald-500/10 text-emerald-600",
      category: "Financeiro",
    },
    {
      icon: TrendingUp,
      title: "Relatórios",
      description: "Análises financeiras e métricas",
      href: "/crm/relatorios",
      color: "bg-green-500/10 text-green-600",
      category: "Financeiro",
    },
    {
      icon: FileSpreadsheet,
      title: "Orçamentos",
      description: "Criar e gerenciar orçamentos",
      href: "/orcamentos",
      color: "bg-amber-500/10 text-amber-600",
      category: "Financeiro",
    },
    {
      icon: Briefcase,
      title: "Contratos",
      description: "Gestão de contratos e assinaturas",
      href: "/contratos",
      color: "bg-indigo-500/10 text-indigo-600",
      category: "Financeiro",
    },
    {
      icon: Receipt,
      title: "NFe / NFSe",
      description: "Emissão de notas fiscais eletrônicas",
      href: "/nfe",
      color: "bg-orange-500/10 text-orange-600",
      category: "Financeiro",
    },

    // Clinical
    {
      icon: TestTube,
      title: "Laboratório",
      description: "Pedidos e resultados de exames",
      href: "/laboratorio",
      color: "bg-cyan-500/10 text-cyan-600",
      category: "Clínico",
    },
    {
      icon: ImageIcon,
      title: "Imagens Médicas",
      description: "Raio-X, TC, RM e laudos de imagem",
      href: "/imagens",
      color: "bg-slate-500/10 text-slate-600",
      category: "Clínico",
    },
    {
      icon: Smile,
      title: "Odontograma",
      description: "Mapa dental e tratamentos odonto",
      href: "/odontograma",
      color: "bg-sky-500/10 text-sky-600",
      category: "Clínico",
    },
    {
      icon: Fingerprint,
      title: "Biometria",
      description: "Identificação biométrica de pacientes",
      href: "/biometria",
      color: "bg-violet-500/10 text-violet-600",
      category: "Clínico",
    },

    // Communication
    {
      icon: Video,
      title: "Telemedicina",
      description: "Consultas por vídeo chamada",
      href: "/telemedicina",
      color: "bg-red-500/10 text-red-600",
      category: "Comunicação",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Envio de mensagens e campanhas",
      href: "/whatsapp",
      color: "bg-green-500/10 text-green-600",
      category: "Comunicação",
    },
    {
      icon: MessageSquare,
      title: "SMS",
      description: "Lembretes e notificações via SMS",
      href: "/sms",
      color: "bg-blue-500/10 text-blue-600",
      category: "Comunicação",
    },

    // Operations
    {
      icon: Package,
      title: "Estoque",
      description: "Controle de medicamentos e materiais",
      href: "/estoque",
      color: "bg-purple-500/10 text-purple-600",
      category: "Operacional",
    },
    {
      icon: FileBarChart,
      title: "TISS / ANS",
      description: "Envio de guias para operadoras",
      href: "/tiss",
      color: "bg-fuchsia-500/10 text-fuchsia-600",
      category: "Operacional",
    },
    {
      icon: Building,
      title: "Gestão de Clínicas",
      description: "Múltiplas clínicas e salas",
      href: "/clinicas",
      color: "bg-stone-500/10 text-stone-600",
      category: "Operacional",
    },

    // System
    {
      icon: Bot,
      title: "Assistente IA",
      description: "Tirar dúvidas e receber ajuda",
      href: "/assistente",
      color: "bg-purple-500/10 text-purple-600",
      category: "Sistema",
    },
    {
      icon: Settings,
      title: "Configurações",
      description: "Gerenciar perfil e preferências",
      href: "/configuracoes",
      color: "bg-muted text-foreground",
      category: "Sistema",
    },
  ]

  const categories = [
    { name: "Atendimento", color: "text-blue-600" },
    { name: "Gestão", color: "text-green-600" },
    { name: "Financeiro", color: "text-emerald-600" },
    { name: "Clínico", color: "text-cyan-600" },
    { name: "Comunicação", color: "text-orange-600" },
    { name: "Operacional", color: "text-purple-600" },
    { name: "Sistema", color: "text-gray-600" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {/* Welcome Section */}
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              O que você quer fazer agora?
            </h1>
            <p className="text-base md:text-lg text-muted-foreground text-balance">
              Escolha uma ação abaixo para continuar
            </p>
          </div>

          {/* Categories and Cards */}
          {categories.map((category) => {
            const categoryCards = actionCards.filter((card) => card.category === category.name)
            if (categoryCards.length === 0) return null

            return (
              <div key={category.name} className="space-y-4">
                <h2 className={`text-xl md:text-2xl font-semibold ${category.color} flex items-center gap-2`}>
                  <span>{category.name}</span>
                  <span className="text-sm text-muted-foreground font-normal">({categoryCards.length})</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {categoryCards.map((card, index) => (
                    <Link key={index} href={card.href}>
                      <Card className="rounded-2xl md:rounded-3xl border-border hover:shadow-lg transition-all duration-300 hover:scale-105 h-full cursor-pointer group">
                        <CardContent className="p-4 md:p-6 flex flex-col items-start space-y-2 md:space-y-3 h-full">
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <card.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                          </div>
                          <div className="space-y-1 flex-1">
                            <h3 className="text-base md:text-lg font-semibold">{card.title}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
