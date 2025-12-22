import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Clock,
  FileText,
  AlertCircle,
  Settings,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  Pill,
  Stethoscope,
  Database,
  Shield,
  Zap,
  Download,
  FileSignature,
  QrCode,
  Lock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Pular para o conteúdo principal
      </a>

      {/* Header with Navigation */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-50 transition-all duration-200" role="banner">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between" aria-label="Navegação principal">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild className="rounded-3xl text-sm sm:text-base px-3 sm:px-4">
              <Link href="/login" aria-label="Entrar na sua conta AtendeBem">Entrar</Link>
            </Button>
            <Button asChild className="rounded-3xl text-sm sm:text-base px-3 sm:px-4">
              <Link href="/cadastro" aria-label="Criar conta gratuita no AtendeBem">
                <span className="hidden sm:inline">Começar agora</span>
                <span className="sm:hidden">Começar</span>
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32" aria-labelledby="hero-heading">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl bg-secondary/10 border border-secondary/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-xs sm:text-sm font-medium text-primary">Plataforma SaaS Médica Completa</span>
              </div>
              <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Preencher planilhas não é medicina.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                Sistema completo para registro de atendimentos com códigos TUSS, receitas digitais com assinatura
                ICP-Brasil, prescrições digitais com CID-10/11, banco de medicamentos nacional e exportação profissional
                em PDF e Excel.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <Button
                  size="lg"
                  asChild
                  className="rounded-3xl text-sm sm:text-base h-11 sm:h-12 hover:scale-105 transition-transform"
                >
                  <Link href="/cadastro" aria-label="Começar agora - criar conta gratuita">Começar agora</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-3xl text-sm sm:text-base h-11 sm:h-12 bg-transparent hover:scale-105 transition-transform"
                >
                  <Link href="#recursos" aria-label="Ver todos os recursos do AtendeBem">Ver todos os recursos</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4 text-xs sm:text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>Dados Criptografados</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>Conforme LGPD</span>
                </div>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-2xl opacity-50" aria-hidden="true"></div>
              <Image
                src="/images/hero.jpeg"
                alt="Interface do sistema AtendeBem mostrando dashboard de atendimentos médicos com códigos TUSS, receitas digitais e gestão de pacientes"
                width={600}
                height={400}
                className="relative w-full h-auto rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="recursos" className="bg-muted py-12 sm:py-16 lg:py-20" aria-labelledby="recursos-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16">
              <h2 id="recursos-heading" className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 text-balance">
                Tudo que você precisa em um só lugar
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Sistema médico completo com tecnologia de ponta para simplificar sua rotina
              </p>
            </header>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 list-none" role="list">
              {[
                {
                  icon: ClipboardList,
                  title: "Códigos TUSS Completos",
                  description:
                    "Base completa de códigos TUSS para consultas, procedimentos cirúrgicos e exames com busca inteligente em linguagem natural",
                  highlight: "10.000+ códigos",
                },
                {
                  icon: Pill,
                  title: "Banco de Medicamentos",
                  description:
                    "Relação Nacional (RENAME) e lista estadual RS/2025 integradas com prescrição digital automática",
                  highlight: "Base oficial 2024/2025",
                },
                {
                  icon: FileText,
                  title: "CID-10 e CID-11",
                  description:
                    "Classificação internacional de doenças atualizada com busca rápida e relacionamento automático com procedimentos",
                  highlight: "Última versão oficial",
                },
                {
                  icon: FileSignature,
                  title: "Receitas Digitais",
                  description:
                    "Prescrição digital com assinatura ICP-Brasil, QR Code de validação e conformidade total com padrões ANS e CFM",
                  highlight: "Assinatura digital certificada",
                },
                {
                  icon: Stethoscope,
                  title: "Registro de Atendimentos",
                  description:
                    "Fluxo visual intuitivo que transforma atendimentos em documentos profissionais sem burocracia",
                  highlight: "Interface amigável",
                },
                {
                  icon: Download,
                  title: "Exportação Profissional",
                  description: "PDF no padrão TISS da ANS e Excel estruturado prontos para convênios e auditoria",
                  highlight: "Conforme ANS",
                },
                {
                  icon: Zap,
                  title: "Assistente IA",
                  description:
                    "Inteligência artificial que auxilia na montagem de atendimentos e esclarece dúvidas administrativas",
                  highlight: "Powered by Gemini",
                },
              ].map((feature, index) => (
                <li key={index}>
                  <Card
                    className="rounded-3xl border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <CardContent className="p-6 sm:p-8 space-y-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                        <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg sm:text-xl">{feature.title}</h3>
                        <p className="text-xs sm:text-sm text-primary font-medium">{feature.highlight}</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="problema-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16">
              <h2 id="problema-heading" className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 text-balance">
                O Problema que Resolvemos
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Profissionais da saúde perdem horas com tarefas que deveriam levar minutos
              </p>
            </header>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 list-none" role="list">
              {[
                {
                  icon: Clock,
                  title: "Tempo perdido",
                  description: "Médicos gastam até 2 horas por dia apenas com documentação administrativa",
                  metric: "2h/dia",
                },
                {
                  icon: FileText,
                  title: "Códigos complexos",
                  description: "TUSS, CID, CBOS - dezenas de tabelas técnicas que precisam estar corretas",
                  metric: "10+ tabelas",
                },
                {
                  icon: AlertCircle,
                  title: "Risco de glosas",
                  description: "Erros em códigos ou preenchimento geram rejeição de guias pelos convênios",
                  metric: "30% glosas",
                },
                {
                  icon: Settings,
                  title: "Sistemas ruins",
                  description: "Interfaces confusas que exigem treinamento e ainda causam frustração",
                  metric: "Alta rejeição",
                },
              ].map((item, index) => (
                <li key={index}>
                  <Card
                    className="rounded-3xl border-border hover:border-destructive/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <CardContent className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-destructive/10 flex items-center justify-center" aria-hidden="true">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                        <p className="text-xs sm:text-sm font-medium text-destructive">{item.metric}</p>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="como-funciona" className="bg-muted py-12 sm:py-16 lg:py-20" aria-labelledby="como-funciona-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16">
              <h2 id="como-funciona-heading" className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 text-balance">Como Funciona</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Transformamos complexidade em simplicidade com tecnologia inteligente
              </p>
            </header>
            <ol className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto list-none" role="list">
              {[
                {
                  number: "01",
                  title: "Monte o Atendimento",
                  description:
                    "Interface visual onde você monta o atendimento como construir com blocos. Sem códigos técnicos, apenas nomes claros e busca inteligente.",
                  details: ["Busca por nome comum", "Sugestões inteligentes", "Visual e intuitivo"],
                },
                {
                  number: "02",
                  title: "Sistema Trabalha por Você",
                  description:
                    "Enquanto você foca no atendimento, o sistema busca códigos TUSS corretos, relaciona com CID, valida medicamentos e organiza tudo.",
                  details: ["Códigos automáticos", "Validação em tempo real", "Zero burocracia"],
                },
                {
                  number: "03",
                  title: "Documento Profissional",
                  description:
                    "PDF no padrão TISS da ANS e planilha Excel estruturada prontos para envio. Todos os campos obrigatórios preenchidos corretamente.",
                  details: ["Padrão ANS/TISS", "Pronto para convênios", "Exportação instantânea"],
                },
              ].map((step, index) => (
                <li key={index} className="relative">
                  <Card className="rounded-3xl border-2 border-primary/20 h-full hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                      <div className="text-6xl sm:text-7xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors" aria-hidden="true">
                        {step.number}
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl font-semibold">{step.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                        <ul className="space-y-2 list-none">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" aria-hidden="true" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  {index < 2 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-6 w-6 h-6 text-primary/30 -translate-y-1/2" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="beneficios-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16">
              <h2 id="beneficios-heading" className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 text-balance">
                Benefícios Reais
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Resultados mensuráveis que transformam sua rotina
              </p>
            </header>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto list-none" role="list">
              {[
                {
                  metric: "70%",
                  title: "Economia de tempo",
                  description: "Reduza drasticamente o tempo gasto com documentação administrativa",
                },
                {
                  metric: "95%",
                  title: "Menos erros",
                  description: "Validação automática previne códigos incorretos e campos obrigatórios em branco",
                },
                {
                  metric: "100%",
                  title: "Conformidade",
                  description: "Documentos seguem rigorosamente os padrões TISS da ANS",
                },
                {
                  metric: "Zero",
                  title: "Curva de aprendizado",
                  description: "Interface intuitiva não requer treinamento ou manuais",
                },
              ].map((benefit, index) => (
                <li key={index} className="text-center space-y-3 sm:space-y-4 group">
                  <div className="text-4xl sm:text-5xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {benefit.metric}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg lg:text-xl">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Digital Prescriptions Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-secondary/5" aria-labelledby="receitas-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl bg-primary/10 border border-primary/20">
                  <span className="text-xs sm:text-sm font-medium text-primary">Receituário Digital Certificado</span>
                </div>
                <h2 id="receitas-heading" className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
                  Prescrições digitais com validade jurídica total
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
                  Sistema completo de receita digital com assinatura ICP-Brasil e-CPF/e-CNPJ, QR Code de validação
                  pública, e conformidade total com as normas do CFM e ANS.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 list-none" role="list">
                  {[
                    {
                      icon: Lock,
                      title: "Assinatura ICP-Brasil",
                      description: "Certificado digital e-CPF ou e-CNPJ com validade jurídica",
                    },
                    {
                      icon: QrCode,
                      title: "QR Code de Validação",
                      description: "Paciente e farmácia validam autenticidade em segundos",
                    },
                    {
                      icon: Shield,
                      title: "100% Seguro",
                      description: "Criptografia ponta-a-ponta e rastreabilidade completa",
                    },
                    {
                      icon: CheckCircle2,
                      title: "Conforme CFM/ANS",
                      description: "Atende todos os requisitos legais e regulatórios",
                    },
                  ].map((item, index) => (
                    <li key={index}>
                      <Card className="rounded-3xl border-border hover:shadow-lg transition-all duration-300 h-full">
                        <CardContent className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center" aria-hidden="true">
                            <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                          </div>
                          <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground pt-2">
                  <FileSignature className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>Integração com provedores certificados ICP-Brasil</span>
                </div>
              </div>
              <figure className="relative order-1 lg:order-2">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-2xl opacity-50" aria-hidden="true"></div>
                <Card className="relative rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl">
                  <CardContent className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-background to-secondary/5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Receita Médica Digital</h3>
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                        Assinado digitalmente
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                          <Stethoscope className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Dr. João Silva</p>
                          <p className="text-xs text-muted-foreground">CRM 123456-SP</p>
                        </div>
                      </div>
                      <div className="h-px bg-border" aria-hidden="true"></div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Pill className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                          <p className="text-sm font-medium">Amoxicilina 500mg</p>
                        </div>
                        <p className="text-xs text-muted-foreground pl-6">Tomar 1 comprimido a cada 8 horas por 7 dias</p>
                      </div>
                      <div className="h-px bg-border" aria-hidden="true"></div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-primary" aria-hidden="true" />
                          <span className="text-xs font-medium">Assinado com ICP-Brasil</span>
                        </div>
                        <div className="w-16 h-16 bg-foreground/5 rounded-xl flex items-center justify-center" aria-label="QR Code de validação">
                          <QrCode className="w-10 h-10 text-foreground/20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <figcaption className="sr-only">Exemplo de receita médica digital com assinatura ICP-Brasil e QR Code</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="rounded-3xl bg-primary text-primary-foreground border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-8 sm:p-12 lg:p-16 text-center space-y-6 sm:space-y-8">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto animate-pulse" strokeWidth={1.5} aria-hidden="true" />
                <div className="space-y-3 sm:space-y-4">
                  <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
                    Menos burocracia. Mais medicina.
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-3xl mx-auto text-balance leading-relaxed">
                    Sistema completo com TUSS, CID-10/11, receitas digitais certificadas, medicamentos nacionais e
                    exportação profissional. Comece agora e transforme sua rotina de atendimentos.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="rounded-3xl text-sm sm:text-base h-11 sm:h-12 hover:scale-105 transition-transform"
                  >
                    <Link href="/cadastro" aria-label="Criar conta gratuita agora">Criar conta gratuita</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-3xl text-sm sm:text-base h-11 sm:h-12 bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 hover:scale-105 transition-transform"
                  >
                    <Link href="/login" aria-label="Entrar na conta existente">Já tenho conta</Link>
                  </Button>
                </div>
                <p className="text-xs sm:text-sm opacity-75">Sem cartão de crédito necessário • Setup em 2 minutos</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <div className="text-center md:text-right text-muted-foreground">
              <p className="text-xs sm:text-sm">
                AtendeBem é uma solução da <span className="font-semibold text-foreground">Oryum Tech</span>
              </p>
              <p className="text-xs mt-1 sm:mt-2">© 2025 Todos os direitos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
