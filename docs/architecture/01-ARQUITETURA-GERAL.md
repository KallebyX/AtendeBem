# AtendeBem - Arquitetura do Sistema

## Versão 2.0 - Sistema Completo de Gestão em Saúde

**Data:** 2025-12-17
**Status:** Documento de Arquitetura de Produção
**Classificação:** Documento Técnico Estratégico

---

## 1. VISÃO GERAL DO SISTEMA

### 1.1 Propósito

O **AtendeBem** é uma plataforma SaaS (Software as a Service) de gestão completa em saúde, projetada para atender inicialmente médicos e escalar para todas as áreas da saúde: clínicas, odontologia, fisioterapia, psicologia, hospitais e convênios.

### 1.2 Posicionamento de Mercado

| Aspecto | AtendeBem | Concorrentes (iClinic, Feegow, MV) |
|---------|-----------|-----------------------------------|
| **Arquitetura** | Cloud-native, Serverless | Legacy/híbrido |
| **Multi-tenant** | Row-Level Security nativo | Schemas separados |
| **IA Integrada** | Nativo no prontuário | Add-on ou inexistente |
| **Assinatura Digital** | ICP-Brasil nativo (VIDaaS) | Terceirizado |
| **TISS** | Geração automática | Manual/semi-automático |
| **Telemedicina** | WebRTC integrado | Integrações externas |
| **Escalabilidade** | Infinita (serverless) | Limitada |

### 1.3 Princípios Arquiteturais

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRINCÍPIOS FUNDAMENTAIS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. PRONTUÁRIO É O NÚCLEO - Todas as funcionalidades orbitam o prontuário   │
│  2. ZERO TRUST - Validação em cada camada, nunca confiar em inputs          │
│  3. LGPD BY DESIGN - Privacidade e proteção de dados desde a concepção      │
│  4. IMUTABILIDADE - Registros clínicos nunca são deletados, só versionados  │
│  5. AUDITORIA TOTAL - Toda ação gera log com timestamp e identificação      │
│  6. MULTI-TENANT - Isolamento completo de dados entre organizações          │
│  7. OFFLINE-FIRST - Funcionalidades críticas operam sem internet            │
│  8. API-FIRST - Todo módulo expõe APIs RESTful documentadas                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ARQUITETURA DE ALTO NÍVEL

### 2.1 Diagrama de Contexto (C4 - Nível 1)

```
                                    ┌──────────────────────┐
                                    │     PROFISSIONAIS    │
                                    │  (Médicos, Dentistas,│
                                    │   Fisioterapeutas)   │
                                    └──────────┬───────────┘
                                               │
                                               ▼
┌─────────────────┐              ┌──────────────────────────────┐              ┌─────────────────┐
│    PACIENTES    │◄────────────►│        ATENDEBEM             │◄────────────►│   CONVÊNIOS     │
│  (Portal/App)   │              │   Sistema de Gestão em Saúde │              │   (TISS/ANS)    │
└─────────────────┘              └──────────────┬───────────────┘              └─────────────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
                    ▼                          ▼                          ▼
          ┌─────────────────┐      ┌─────────────────────┐      ┌─────────────────┐
          │   LABORATÓRIOS  │      │   CERTIFICADORAS    │      │     FARMÁCIAS   │
          │   (Resultados)  │      │    (ICP-Brasil)     │      │   (e-Prescrição)│
          └─────────────────┘      └─────────────────────┘      └─────────────────┘
```

### 2.2 Diagrama de Containers (C4 - Nível 2)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                      ATENDEBEM PLATFORM                                      │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐   │
│  │                              FRONTEND LAYER (Next.js 16)                             │   │
│  ├─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬───────────────┤   │
│  │  Web App    │  Portal     │  Admin      │  Teleconsulta│  Mobile    │  Widget       │   │
│  │  (React 19) │  Paciente   │  Dashboard  │  (WebRTC)    │  PWA       │  Agendamento  │   │
│  └─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴───────────────┘   │
│                                          │                                                  │
│  ┌───────────────────────────────────────┴───────────────────────────────────────────┐     │
│  │                           API GATEWAY (Next.js API Routes)                         │     │
│  │                        Rate Limiting • Auth • Logging • CORS                       │     │
│  └───────────────────────────────────────────────────────────────────────────────────┘     │
│                                          │                                                  │
│  ┌───────────────────────────────────────┴───────────────────────────────────────────┐     │
│  │                              SERVICES LAYER                                        │     │
│  ├─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┤     │
│  │  Auth       │  Prontuário │  Faturamento│  Estoque    │  Telemedicina│  IA        │     │
│  │  Service    │  Service    │  Service    │  Service    │  Service     │  Service   │     │
│  ├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤     │
│  │  Agenda     │  CRM        │  TISS       │  Notificação│  Documentos  │  Relatórios│     │
│  │  Service    │  Service    │  Service    │  Service    │  Service     │  Service   │     │
│  └─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘     │
│                                          │                                                  │
│  ┌───────────────────────────────────────┴───────────────────────────────────────────┐     │
│  │                              DATA LAYER                                            │     │
│  ├──────────────────┬──────────────────┬──────────────────┬──────────────────────────┤     │
│  │   PostgreSQL     │   Redis          │   AWS S3         │   Elasticsearch          │     │
│  │   (NeonDB)       │   (Cache/Queue)  │   (Storage)      │   (Search/Logs)          │     │
│  │   Row-Level Sec  │   Session Store  │   HIPAA Compliant│   Audit Trail            │     │
│  └──────────────────┴──────────────────┴──────────────────┴──────────────────────────┘     │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
                                          │
          ┌───────────────────────────────┼───────────────────────────────┐
          │                               │                               │
          ▼                               ▼                               ▼
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│   EXTERNAL APIS     │      │   MESSAGING         │      │   AI/ML             │
├─────────────────────┤      ├─────────────────────┤      ├─────────────────────┤
│ • VIDaaS (Assinat.) │      │ • Twilio (SMS)      │      │ • Google Gemini     │
│ • ANS (TISS)        │      │ • WhatsApp Business │      │ • OpenAI GPT-4      │
│ • Google Calendar   │      │ • SendGrid (Email)  │      │ • Claude (Anthropic)│
│ • Receita Federal   │      │ • FCM (Push)        │      │ • Med-PaLM 2        │
│ • CFM (CRM)         │      │ • WebSocket (Real)  │      │ • Vertex AI         │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
```

---

## 3. MÓDULOS DO SISTEMA

### 3.1 Mapa de Módulos e Integrações

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    MÓDULOS ATENDEBEM                                         │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────────────────────┐   │
│   │                              NÚCLEO - PRONTUÁRIO ELETRÔNICO                          │   │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│   │   │  Anamnese   │  │  Evolução   │  │ Prescrições │  │  Atestados  │                │   │
│   │   │  Dinâmica   │  │  Clínica    │  │  Digitais   │  │  Médicos    │                │   │
│   │   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                │   │
│   │          └─────────────────┼─────────────────┼─────────────────┘                    │   │
│   │                            ▼                 ▼                                       │   │
│   │                    ┌─────────────────────────────────┐                              │   │
│   │                    │    PRONTUÁRIO CENTRAL (PEP)     │                              │   │
│   │                    │  Imutável • Versionado • Legal  │                              │   │
│   │                    └─────────────────────────────────┘                              │   │
│   └─────────────────────────────────────────────────────────────────────────────────────┘   │
│                                          │                                                  │
│   ┌──────────────────────────────────────┼──────────────────────────────────────────┐      │
│   │                                      │                                           │      │
│   ▼                                      ▼                                           ▼      │
│ ┌─────────────────────┐   ┌─────────────────────────────────┐   ┌─────────────────────┐    │
│ │ MÓDULOS CLÍNICOS    │   │   MÓDULOS ADMINISTRATIVOS       │   │ MÓDULOS FINANCEIROS │    │
│ ├─────────────────────┤   ├─────────────────────────────────┤   ├─────────────────────┤    │
│ │ • Odontograma       │   │ • Agenda/Calendário             │   │ • Faturamento       │    │
│ │ • Cálculo Gestacional │ │ • CRM Pacientes                 │   │ • TISS/ANS          │    │
│ │ • Curva Crescimento │   │ • Profissionais                 │   │ • Orçamentos        │    │
│ │ • Prescrição Óculos │   │ • Telemedicina                  │   │ • Recibos           │    │
│ │ • Pacotes Sessões   │   │ • Pesquisa Satisfação           │   │ • Repasses          │    │
│ │ • Tratamentos       │   │ • Notificações                  │   │ • Glosas            │    │
│ │ • Prescrição Hosp.  │   │ • Documentos/Cloud              │   │ • Relatórios        │    │
│ └─────────────────────┘   └─────────────────────────────────┘   └─────────────────────┘    │
│                                          │                                                  │
│   ┌──────────────────────────────────────┼──────────────────────────────────────────┐      │
│   │                                      │                                           │      │
│   ▼                                      ▼                                           ▼      │
│ ┌─────────────────────┐   ┌─────────────────────────────────┐   ┌─────────────────────┐    │
│ │ INTEGRAÇÕES         │   │   INTELIGÊNCIA ARTIFICIAL       │   │ SEGURANÇA/COMPLIANCE│    │
│ ├─────────────────────┤   ├─────────────────────────────────┤   ├─────────────────────┤    │
│ │ • Google Calendar   │   │ • Assistente Clínico            │   │ • Assinatura Digital│    │
│ │ • WhatsApp Business │   │ • Resumo Automático             │   │ • LGPD              │    │
│ │ • SMS (Twilio/Zenvia│   │ • Sugestões Clínicas            │   │ • Auditoria         │    │
│ │ • Email (SendGrid)  │   │ • Análise de Imagens            │   │ • Multi-tenant      │    │
│ │ • Estoque/Farmácia  │   │ • Transcrição Consulta          │   │ • Backup/Recovery   │    │
│ └─────────────────────┘   └─────────────────────────────────┘   └─────────────────────┘    │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Lista Completa de Módulos

| # | Módulo | Código | Dependências | Prioridade |
|---|--------|--------|--------------|------------|
| 1 | Anamnese e Formulários Dinâmicos | `MOD-ANM` | Prontuário | P1 - Crítico |
| 2 | Controle de Estoque | `MOD-EST` | Faturamento, Prescrições | P2 - Alto |
| 3 | Emissão de Recibo | `MOD-RCB` | Faturamento | P2 - Alto |
| 4 | Orçamentos | `MOD-ORC` | Faturamento, Pacientes | P2 - Alto |
| 5 | Odontograma | `MOD-ODO` | Prontuário, TISS | P1 - Crítico |
| 6 | Cálculo Gestacional | `MOD-GES` | Prontuário | P3 - Médio |
| 7 | Curva de Crescimento | `MOD-CRV` | Prontuário, OMS | P3 - Médio |
| 8 | Prescrição de Óculos | `MOD-OFT` | Prontuário, Assinatura | P3 - Médio |
| 9 | Pacotes de Sessões | `MOD-SES` | Agenda, Faturamento | P2 - Alto |
| 10 | Pacotes de Tratamentos | `MOD-TRT` | Prontuário, Faturamento | P2 - Alto |
| 11 | TISS (Padrão ANS) | `MOD-TIS` | Faturamento, Convênios | P1 - Crítico |
| 12 | Google Calendar | `MOD-GCL` | Agenda | P2 - Alto |
| 13 | Pesquisa de Satisfação | `MOD-NPS` | Pacientes, Email/SMS | P3 - Médio |
| 14 | Armazenamento em Nuvem | `MOD-CLD` | Documentos | P1 - Crítico |
| 15 | Profissionais Adicionais | `MOD-PRF` | Multi-tenant | P1 - Crítico |
| 16 | Assistente de IA | `MOD-AIA` | Prontuário, LLM | P2 - Alto |
| 17 | Assinatura Digital | `MOD-ASS` | VIDaaS, ICP-Brasil | P1 - Crítico |
| 18 | Teleconsulta | `MOD-TEL` | WebRTC, Prontuário | P2 - Alto |
| 19 | Prescrição Hospitalar | `MOD-HOS` | Estoque, Prontuário | P2 - Alto |
| 20 | Faturamento | `MOD-FAT` | TISS, Recibos | P1 - Crítico |
| 21 | SMS Automático | `MOD-SMS` | Twilio/Zenvia | P2 - Alto |
| 22 | WhatsApp Automático | `MOD-WPP` | WhatsApp Business API | P2 - Alto |

---

## 4. STACK TECNOLÓGICA

### 4.1 Stack Completa de Produção

```yaml
# FRONTEND
frontend:
  framework: Next.js 16.x
  runtime: React 19.x
  language: TypeScript 5.x
  styling:
    - Tailwind CSS 4.x
    - Shadcn/ui (components)
  state:
    - Zustand (global state)
    - React Query (server state)
    - React Hook Form (forms)
  validation: Zod
  charts: Recharts
  icons: Lucide React

# BACKEND
backend:
  runtime: Node.js 22 LTS
  framework: Next.js API Routes (serverless)
  orm: Drizzle ORM
  validation: Zod
  queue: BullMQ (Redis)

# DATABASE
database:
  primary: PostgreSQL 16 (NeonDB Serverless)
  cache: Redis (Upstash)
  search: Elasticsearch 8.x
  vector: pgvector (embeddings IA)

# STORAGE
storage:
  files: AWS S3
  cdn: CloudFront
  backup: S3 Glacier

# INFRASTRUCTURE
infrastructure:
  hosting: Vercel (Edge Functions)
  dns: Cloudflare
  monitoring:
    - Vercel Analytics
    - Sentry (errors)
    - LogTail (logs)
  ci_cd: GitHub Actions

# SECURITY
security:
  auth: JWT + Refresh Tokens
  encryption: AES-256-GCM
  passwords: Argon2id
  certificates: ICP-Brasil (VIDaaS)
  waf: Cloudflare

# INTEGRATIONS
integrations:
  sms: Twilio / Zenvia
  whatsapp: WhatsApp Business API
  email: SendGrid
  calendar: Google Calendar API
  ai:
    - Google Gemini (primary)
    - OpenAI GPT-4 (fallback)
    - Claude Sonnet (analysis)
  signature: VIDaaS (ICP-Brasil)
  payments: Stripe / PagSeguro

# REAL-TIME
realtime:
  websocket: Socket.io
  webrtc: Daily.co / LiveKit
  push: Firebase Cloud Messaging
```

### 4.2 Diagrama de Dependências

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPENDENCY GRAPH                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │   React 19   │─────►│  Next.js 16  │─────►│ Vercel Edge  │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
│         │                     │                     │            │
│         ▼                     ▼                     ▼            │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │   Zustand    │      │ Drizzle ORM  │      │   NeonDB     │   │
│  │ React Query  │      │    + Zod     │      │  PostgreSQL  │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
│         │                     │                     │            │
│         ▼                     ▼                     ▼            │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │  Shadcn/ui   │      │   BullMQ     │      │    Redis     │   │
│  │  Tailwind    │      │   (Queue)    │      │   Upstash    │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. ARQUITETURA MULTI-TENANT

### 5.1 Estratégia de Isolamento

O AtendeBem utiliza **Row-Level Security (RLS)** no PostgreSQL para isolamento de dados entre tenants (organizações/clínicas).

```sql
-- Estrutura de Tenant
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan_type VARCHAR(50) DEFAULT 'free',
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Política RLS em todas as tabelas
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON patients
    USING (tenant_id = current_setting('app.current_tenant')::UUID);
```

### 5.2 Hierarquia de Acesso

```
┌─────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA MULTI-TENANT                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SUPER_ADMIN (Plataforma)                                        │
│  └── Acesso total a todos os tenants                             │
│      │                                                           │
│      ▼                                                           │
│  TENANT (Clínica/Hospital)                                       │
│  ├── ADMIN (Administrador da Clínica)                            │
│  │   └── Configurações, relatórios, usuários                     │
│  │       │                                                       │
│  │       ▼                                                       │
│  ├── PROFESSIONAL (Médico, Dentista, etc.)                       │
│  │   └── Prontuários, atendimentos, prescrições                  │
│  │       │                                                       │
│  │       ▼                                                       │
│  ├── STAFF (Secretária, Recepção)                                │
│  │   └── Agendamento, CRM, faturamento                           │
│  │       │                                                       │
│  │       ▼                                                       │
│  └── VIEWER (Auditor, Contador)                                  │
│      └── Apenas leitura de relatórios                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Modelo de Planos

| Plano | Profissionais | Pacientes | Storage | Módulos |
|-------|---------------|-----------|---------|---------|
| **Free** | 1 | 100 | 1GB | Básico |
| **Starter** | 3 | 500 | 10GB | Core |
| **Professional** | 10 | 2.000 | 50GB | Todos |
| **Enterprise** | Ilimitado | Ilimitado | Ilimitado | Todos + Custom |

---

## 6. FLUXO DE DADOS

### 6.1 Fluxo Principal - Atendimento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FLUXO DE ATENDIMENTO MÉDICO                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌───────────┐  │
│  │ Agendamento │────►│  Check-in   │────►│  Anamnese   │────►│  Exame    │  │
│  │  (Agenda)   │     │  (CRM)      │     │ (Formulário)│     │  Físico   │  │
│  └─────────────┘     └─────────────┘     └─────────────┘     └─────┬─────┘  │
│                                                                      │       │
│  ┌─────────────────────────────────────────────────────────────────┘       │
│  │                                                                          │
│  ▼                                                                          │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌───────────┐  │
│  │ Diagnóstico │────►│ Prescrição  │────►│  Atestado   │────►│ Assinatura│  │
│  │   (CID)     │     │(Medicamentos│     │   Médico    │     │  Digital  │  │
│  └─────────────┘     └─────────────┘     └─────────────┘     └─────┬─────┘  │
│                                                                      │       │
│  ┌─────────────────────────────────────────────────────────────────┘       │
│  │                                                                          │
│  ▼                                                                          │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌───────────┐  │
│  │Faturamento  │────►│    TISS     │────►│  Recibo     │────►│ Satisfação│  │
│  │ (Cobrança)  │     │  (Convênio) │     │  (Particular│     │   (NPS)   │  │
│  └─────────────┘     └─────────────┘     └─────────────┘     └───────────┘  │
│                                                                              │
│                                    │                                         │
│                                    ▼                                         │
│                          ┌─────────────────┐                                 │
│                          │   PRONTUÁRIO    │                                 │
│                          │   ELETRÔNICO    │                                 │
│                          │  (Registro Final│                                 │
│                          │   + Auditoria)  │                                 │
│                          └─────────────────┘                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Fluxo de Integração entre Módulos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INTEGRAÇÃO ENTRE MÓDULOS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  EVENTO: Nova Prescrição Criada                                              │
│  ────────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  1. Prontuário                                                               │
│     └──► Gera documento de prescrição                                        │
│           │                                                                  │
│           ├──► 2. Estoque: Reserva medicamentos/materiais                    │
│           │                                                                  │
│           ├──► 3. Assinatura Digital: Inicia fluxo VIDaaS                    │
│           │                                                                  │
│           ├──► 4. Faturamento: Cria item de cobrança                         │
│           │                                                                  │
│           ├──► 5. TISS: Gera guia de autorização (se convênio)               │
│           │                                                                  │
│           ├──► 6. WhatsApp/SMS: Envia receita ao paciente                    │
│           │                                                                  │
│           ├──► 7. Cloud Storage: Armazena PDF assinado                       │
│           │                                                                  │
│           └──► 8. Auditoria: Registra log imutável                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. ARQUITETURA DE SEGURANÇA

### 7.1 Camadas de Segurança

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ARQUITETURA DE SEGURANÇA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CAMADA 1 - PERÍMETRO (Edge)                                                 │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • Cloudflare WAF (Web Application Firewall)                       │     │
│  │  • DDoS Protection                                                  │     │
│  │  • Rate Limiting (100 req/min por IP)                               │     │
│  │  • HTTPS Only (TLS 1.3)                                             │     │
│  │  • HSTS Preload                                                     │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 2 - APLICAÇÃO                ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • JWT com RS256 (Access + Refresh Tokens)                          │     │
│  │  • CSRF Protection                                                  │     │
│  │  • XSS Prevention (Content Security Policy)                         │     │
│  │  • SQL Injection Prevention (Prepared Statements)                   │     │
│  │  • Input Validation (Zod)                                           │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 3 - DADOS                    ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • Row-Level Security (RLS) - PostgreSQL                            │     │
│  │  • Encryption at Rest (AES-256)                                     │     │
│  │  • Encryption in Transit (TLS 1.3)                                  │     │
│  │  • Password Hashing (Argon2id)                                      │     │
│  │  • PII Encryption (dados sensíveis)                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 4 - AUDITORIA                ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • Audit Logs imutáveis                                             │     │
│  │  • SIEM Integration (Security Information & Event Management)       │     │
│  │  • Alertas de anomalia                                              │     │
│  │  • Backup automático criptografado                                  │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Conformidade LGPD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          COMPLIANCE LGPD                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRINCÍPIOS IMPLEMENTADOS:                                                   │
│  ─────────────────────────                                                   │
│                                                                              │
│  1. FINALIDADE                                                               │
│     • Coleta apenas dados necessários para prestação do serviço              │
│     • Consentimento explícito registrado com timestamp                       │
│                                                                              │
│  2. ADEQUAÇÃO                                                                │
│     • Dados compatíveis com finalidades informadas                           │
│     • Retenção pelo tempo necessário (regulação médica)                      │
│                                                                              │
│  3. NECESSIDADE                                                              │
│     • Minimização de dados coletados                                         │
│     • Campos obrigatórios apenas quando essenciais                           │
│                                                                              │
│  4. LIVRE ACESSO                                                             │
│     • Portal do paciente para consulta de dados                              │
│     • Exportação em formato portável (JSON/CSV)                              │
│                                                                              │
│  5. QUALIDADE DOS DADOS                                                      │
│     • Validação em tempo real                                                │
│     • Correção pelo próprio titular                                          │
│                                                                              │
│  6. TRANSPARÊNCIA                                                            │
│     • Política de privacidade clara                                          │
│     • Notificação de uso de dados                                            │
│                                                                              │
│  7. SEGURANÇA                                                                │
│     • Criptografia ponta a ponta                                             │
│     • Controle de acesso granular                                            │
│                                                                              │
│  8. PREVENÇÃO                                                                │
│     • Medidas técnicas contra vazamentos                                     │
│     • Plano de resposta a incidentes                                         │
│                                                                              │
│  9. NÃO DISCRIMINAÇÃO                                                        │
│     • Tratamento igual de dados                                              │
│     • Sem profiling discriminatório                                          │
│                                                                              │
│  10. RESPONSABILIZAÇÃO                                                       │
│      • DPO (Data Protection Officer) designado                               │
│      • Registros de tratamento de dados                                      │
│      • Relatório de impacto (RIPD)                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. ESCALABILIDADE

### 8.1 Estratégia de Escala

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ESTRATÉGIA DE ESCALABILIDADE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  HORIZONTAL SCALING                                                          │
│  ──────────────────                                                          │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         VERCEL EDGE NETWORK                          │    │
│  │                     (Auto-scaling serverless)                        │    │
│  │                                                                      │    │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │    │
│  │   │ Region 1 │  │ Region 2 │  │ Region 3 │  │ Region N │           │    │
│  │   │ São Paulo│  │ N.Virginia│ │ Frankfurt│  │   ...    │           │    │
│  │   └──────────┘  └──────────┘  └──────────┘  └──────────┘           │    │
│  │         │             │             │             │                 │    │
│  │         └─────────────┼─────────────┼─────────────┘                 │    │
│  │                       ▼                                              │    │
│  │              ┌─────────────────┐                                     │    │
│  │              │  Load Balancer  │                                     │    │
│  │              └─────────────────┘                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│  DATABASE SCALING                    ▼                                       │
│  ────────────────                                                            │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         NEONDB SERVERLESS                            │    │
│  │                                                                      │    │
│  │   ┌──────────────────┐                ┌──────────────────┐          │    │
│  │   │   Primary (RW)   │───Replication──►│  Read Replicas   │          │    │
│  │   │   São Paulo      │                │  (Multi-region)  │          │    │
│  │   └──────────────────┘                └──────────────────┘          │    │
│  │             │                                                        │    │
│  │             ▼                                                        │    │
│  │   ┌──────────────────────────────────────────────────────┐          │    │
│  │   │              Auto-scaling Storage                     │          │    │
│  │   │              (Pay per use)                            │          │    │
│  │   └──────────────────────────────────────────────────────┘          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  CACHING LAYER                                                               │
│  ─────────────                                                               │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          REDIS (UPSTASH)                             │    │
│  │                                                                      │    │
│  │   • Session Cache (TTL: 24h)                                        │    │
│  │   • Query Cache (TTL: 5min)                                         │    │
│  │   • Rate Limiting Counters                                          │    │
│  │   • Real-time Pub/Sub                                               │    │
│  │   • Job Queue (BullMQ)                                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Métricas de Capacidade

| Métrica | Capacidade | Observação |
|---------|------------|------------|
| **Usuários Simultâneos** | 100.000+ | Serverless auto-scaling |
| **Requisições/segundo** | 50.000+ | Edge functions |
| **Latência P95** | < 200ms | CDN global |
| **Uptime SLA** | 99.95% | Multi-region |
| **Storage** | Ilimitado | S3 + NeonDB |
| **Backup RTO** | < 1 hora | Point-in-time recovery |
| **Backup RPO** | < 5 minutos | Continuous backup |

---

## 9. OBSERVABILIDADE

### 9.1 Stack de Monitoramento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OBSERVABILITY STACK                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              METRICS                                   │  │
│  │  • Vercel Analytics (Core Web Vitals, Page Views)                     │  │
│  │  • Custom Metrics (Atendimentos/dia, Receitas assinadas)              │  │
│  │  • Business KPIs (Churn, MRR, NPS)                                    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              LOGGING                                   │  │
│  │  • Structured Logs (JSON format)                                      │  │
│  │  • LogTail/Better Stack (aggregation)                                 │  │
│  │  • Audit Logs (compliance)                                            │  │
│  │  • Error Tracking (Sentry)                                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              TRACING                                   │  │
│  │  • Distributed Tracing (OpenTelemetry)                                │  │
│  │  • Request ID propagation                                             │  │
│  │  • Performance profiling                                              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              ALERTING                                  │  │
│  │  • PagerDuty (on-call)                                                │  │
│  │  • Slack notifications                                                │  │
│  │  • Email alerts                                                       │  │
│  │  • SMS for critical                                                   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. PRÓXIMOS PASSOS

Este documento estabelece a arquitetura geral do sistema. Os documentos complementares detalham:

1. **02-BANCO-DE-DADOS.md** - Modelagem completa do banco de dados
2. **03-APIs-ENDPOINTS.md** - Especificação de todas as APIs
3. **04-MODULOS-DETALHADOS.md** - Detalhamento de cada módulo
4. **05-INTEGRAÇÕES.md** - Documentação de integrações externas
5. **06-SEGURANCA-LGPD.md** - Políticas de segurança e compliance
6. **07-REGRAS-NEGOCIO.md** - Regras de negócio por módulo
7. **08-PLANO-IMPLEMENTACAO.md** - Roadmap de implementação

---

**Documento mantido por:** Equipe de Arquitetura AtendeBem
**Última atualização:** 2025-12-17
**Versão:** 2.0.0
