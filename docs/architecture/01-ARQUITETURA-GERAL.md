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
│  4. IMUTABILIDADE - Registros clínicos nunca são deletados, só versionados, │
│     com atendimento a pedidos de eliminação via anonimização/restrição,     │
│     respeitando obrigações legais de retenção em saúde                      │
│  5. AUDITORIA TOTAL - Toda ação gera log com timestamp e identificação      │
│  6. MULTI-TENANT - Isolamento completo de dados entre organizações          │
│  7. OFFLINE-FIRST - Funcionalidades críticas operam sem internet via        │
│     Service Workers, sincronização local e resolução de conflitos           │
│  8. API-FIRST - Todo módulo expõe APIs RESTful documentadas com             │
│     versionamento explícito, política de depreciação e compatibilidade      │
│     retroativa para integrações críticas                                    │
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
│  │   (NeonDB)       │   (Cache/Queue)  │   (Cript. & LGPD)│   Audit Trail            │     │
│  │   Row-Level Sec  │   Session Store  │   Backup S3 Glacier│                        │     │
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
│ • VIDaaS (Assinatura Digital) │      │ • Twilio (SMS)      │      │ • Google Gemini     │
│ • ANS (TISS)        │      │ • WhatsApp Business │      │ • OpenAI GPT-4      │
│ • Google Calendar   │      │ • SendGrid (Email)  │      │ • Claude (Anthropic)│
│ • Receita Federal   │      │ • FCM (Push)        │      │ • Med-PaLM 2 (fut.) │
│ • CFM               │      │ • WebSocket (Real)  │      │ • Vertex AI         │
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
│ │ • Cálculo Gestacional │  │ • CRM Pacientes                 │   │ • TISS/ANS          │    │
│ │ • Curva Crescimento │   │ • Profissionais                 │   │ • Orçamentos        │    │
│ │ • Prescrição Óculos │   │ • Telemedicina                  │   │ • Recibos           │    │
│ │ • Pacotes Sessões   │   │ • Pesquisa Satisfação           │   │ • Repasses          │    │
│ │ • Tratamentos       │   │ • Notificações                  │   │ • Glosas            │    │
│ │ • Prescrição Hospitalar│   │ • Documentos/Cloud              │   │ • Relatórios        │    │
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
  offline:
    - Service Workers (Workbox)
    - IndexedDB (local storage)
    - Background Sync API
    - Conflict resolution (last-write-wins com timestamps)

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
  sms:
    primary: Twilio (internacional)
    regional:
      br: Zenvia (preferencial para números brasileiros)
    failover:
      strategy: "fallback automático entre Twilio e Zenvia em caso de indisponibilidade do provedor primário"
      notes: "políticas de roteamento/failover detalhadas no runbook de notificações críticas"
  whatsapp: WhatsApp Business API
  email: SendGrid
  calendar: Google Calendar API
  ai:
    - Google Gemini (primary)
    - OpenAI GPT-4 (fallback)
    - Claude Sonnet (analysis)
    - Med-PaLM 2 (futuro - requer licenciamento específico Google Health)
  signature: VIDaaS (ICP-Brasil)
  payments: PagSeguro (primário - Brasil) / Stripe (pagamentos internacionais)

# REAL-TIME
realtime:
  websocket: Socket.io
  webrtc: Daily.co (primary) / LiveKit (fallback)
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
    USING (tenant_id = current_setting('app.current_tenant')::UUID)
    WITH CHECK (tenant_id = current_setting('app.current_tenant')::UUID);

#### 5.1.1 Estabelecimento seguro do contexto do tenant

O parâmetro de sessão `app.current_tenant` é o **único** insumo usado pelo banco para isolar os dados entre organizações. Por isso, seu valor é sempre definido **no backend**, a partir do usuário autenticado, e **nunca** é consumido diretamente de headers, query params ou body enviados pelo cliente.

Fluxo geral:

1. O usuário autentica na API (por exemplo, via JWT ou sessão) e o backend resolve:
   - o `user_id` autenticado; e
   - a lista de `tenant_id` aos quais o usuário tem acesso.
2. A cada requisição, o backend determina o `tenant_id` ativo (por exemplo, a partir do token ou de uma seleção de clínica previamente salva), **valida** se o usuário realmente tem permissão para esse tenant e, só então, define o contexto de tenant na conexão com o banco.
3. O contexto é definido usando comando de sessão transacional, por exemplo:

   ```sql
   -- Executado pelo backend no início da transação / requisição
   SET LOCAL app.current_tenant = $1; -- $1 = UUID já validado pelo backend
   ```

4. Como `SET LOCAL` é limitado ao escopo da transação, o valor de `app.current_tenant` é automaticamente descartado ao final da transação, evitando vazamento de contexto entre requisições distintas em um pool de conexões.

Considerações sobre segurança e pooling:

- O cliente **não** controla `app.current_tenant`: mesmo que envie um `tenant_id` em headers ou corpo da requisição, esse valor só é utilizado após validações de autorização no backend; o comando `SET LOCAL` sempre usa o valor resultante dessa validação.
- Em ambientes com pool de conexões, o backend:
  - sempre executa `SET LOCAL app.current_tenant = ...` no início de cada transação/requisição; e
  - garante que a transação é finalizada (COMMIT/ROLLBACK), de forma que o contexto de tenant é limpo antes da conexão retornar ao pool.
- O banco de dados pode ser configurado para **não permitir** que usuários de aplicação arbitrariamente façam `SET` de outros parâmetros sensíveis, restringindo o que pode ser alterado na sessão.

Dessa forma, mesmo em cenários com alto volume e reuso intenso de conexões, o valor de `current_setting('app.current_tenant')` utilizado pelas políticas RLS:

- é derivado de um contexto autenticado e autorizado;
- não é diretamente controlado pelo cliente; e
- é corretamente isolado por transação, impedindo acesso cruzado entre tenants.

#### 5.1.1 Estabelecimento seguro do contexto do tenant

O parâmetro de sessão `app.current_tenant` é o **único** insumo usado pelo banco para isolar os dados entre organizações. Por isso, seu valor é sempre definido **no backend**, a partir do usuário autenticado, e **nunca** é consumido diretamente de headers, query params ou body enviados pelo cliente.

Fluxo geral:

1. O usuário autentica na API (por exemplo, via JWT ou sessão) e o backend resolve:
   - o `user_id` autenticado; e
   - a lista de `tenant_id` aos quais o usuário tem acesso.
2. A cada requisição, o backend determina o `tenant_id` ativo (por exemplo, a partir do token ou de uma seleção de clínica previamente salva), **valida** se o usuário realmente tem permissão para esse tenant e, só então, define o contexto de tenant na conexão com o banco.
3. O contexto é definido usando comando de sessão transacional, por exemplo:

   ```sql
   -- Executado pelo backend no início da transação / requisição
   SET LOCAL app.current_tenant = $1; -- $1 = UUID já validado pelo backend
   ```

4. Como `SET LOCAL` é limitado ao escopo da transação, o valor de `app.current_tenant` é automaticamente descartado ao final da transação, evitando vazamento de contexto entre requisições distintas em um pool de conexões.

Considerações sobre segurança e pooling:

- O cliente **não** controla `app.current_tenant`: mesmo que envie um `tenant_id` em headers ou corpo da requisição, esse valor só é utilizado após validações de autorização no backend; o comando `SET LOCAL` sempre usa o valor resultante dessa validação.
- Em ambientes com pool de conexões, o backend:
  - sempre executa `SET LOCAL app.current_tenant = ...` no início de cada transação/requisição; e
  - garante que a transação é finalizada (COMMIT/ROLLBACK), de forma que o contexto de tenant é limpo antes da conexão retornar ao pool.
- O banco de dados pode ser configurado para **não permitir** que usuários de aplicação arbitrariamente façam `SET` de outros parâmetros sensíveis, restringindo o que pode ser alterado na sessão.

Dessa forma, mesmo em cenários com alto volume e reuso intenso de conexões, o valor de `current_setting('app.current_tenant')` utilizado pelas políticas RLS:

- é derivado de um contexto autenticado e autorizado;
- não é diretamente controlado pelo cliente; e
- é corretamente isolado por transação, impedindo acesso cruzado entre tenants.

### 5.2 Controle de Concorrência de Registros Clínicos

Em um ambiente multi-tenant de saúde, múltiplos profissionais podem acessar e atualizar simultaneamente o mesmo paciente ou prontuário (ex.: recepção, médico, enfermagem). Para evitar perda de dados e inconsistências, o AtendeBem adota **controle de concorrência otimista** sobre os principais registros clínicos e administrativos.

- Tabelas críticas (ex.: `patients`, `appointments`, `clinical_notes`, `prescriptions`) possuem uma coluna de **versão** (ex.: `lock_version` ou equivalente), atualizada a cada modificação bem-sucedida.
- As operações de atualização (`UPDATE`) incluem a versão atual do registro na cláusula `WHERE`. Se nenhuma linha for atualizada (versão divergente), o backend interpreta isso como **conflito de concorrência**.
- Em caso de conflito, a API retorna um erro de conflito (ex.: `409 Conflict`), e o cliente pode:
  - Recarregar o registro atualizado;
  - Exibir ao usuário as diferenças entre a versão editada e a versão persistida;
  - Permitir que o usuário decida entre manter suas alterações, mesclar manualmente ou descartar.

Para fluxos de negócio mais sensíveis a inconsistências (ex.: fechamento de contas, conciliação financeira ou atualização em massa de agenda), podem ser utilizados:

- **Transações de banco de dados** envolvendo múltiplas tabelas, garantindo atomicidade;
- **Bloqueios de linha (pessimistas)** de curta duração (ex.: `SELECT ... FOR UPDATE`) para seções críticas, sempre limitados a janelas transacionais pequenas para não degradar a experiência de outros usuários.

Em todos os casos, o objetivo é:

- Preservar a **integridade clínica e legal** do prontuário;
- Evitar que atualizações silenciosas sobreponham dados inseridos por outro profissional;
- Garantir rastreabilidade por meio de histórico de alterações e trilhas de auditoria.

### 5.3 Hierarquia de Acesso

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

### 5.4 Modelo de Planos

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

### 6.3 Arquitetura Offline-First

O AtendeBem implementa capacidades offline para funcionalidades críticas, permitindo que profissionais de saúde continuem trabalhando mesmo sem conectividade à internet. Esta é uma característica essencial para clínicas em áreas com conexão instável ou durante atendimentos externos.

#### 6.3.1 Camadas de Offline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ARQUITETURA OFFLINE-FIRST                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CAMADA 1 - SERVICE WORKER (Workbox)                                         │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • Cache de assets estáticos (HTML, CSS, JS, imagens)              │     │
│  │  • Cache de API responses (estratégia network-first)               │     │
│  │  • Background Sync para requisições falhadas                       │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 2 - ARMAZENAMENTO LOCAL      ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • IndexedDB: dados de pacientes, prontuários, agendamentos        │     │
│  │  • LocalStorage: preferências de usuário, sessão                   │     │
│  │  • Cache API: responses HTTP                                       │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 3 - SINCRONIZAÇÃO            ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • Detecção automática de conectividade                            │     │
│  │  • Fila de sincronização (operações pendentes)                     │     │
│  │  • Resolução de conflitos: last-write-wins com timestamps          │     │
│  │  • Indicadores visuais de status (online/offline/syncing)          │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 6.3.2 Funcionalidades Disponíveis Offline

- **Consulta de Prontuários:** visualização de prontuários previamente carregados
- **Anamnese:** preenchimento de formulários de anamnese
- **Prescrições:** criação de prescrições (sincronizadas quando online)
- **Agendamento:** visualização da agenda local
- **Notas Clínicas:** registro de observações e evolução clínica

#### 6.3.3 Estratégia de Sincronização

1. **Conexão Restaurada:** Service Worker detecta volta da conectividade
2. **Fila de Operações:** processa operações pendentes em ordem cronológica
3. **Detecção de Conflitos:** compara timestamps locais vs servidor
4. **Resolução:**
   - Sem conflito: aplica mudanças locais no servidor
   - Com conflito: last-write-wins (prioriza timestamp mais recente)
   - Conflitos críticos: notifica usuário para resolução manual
5. **Validação:** verifica integridade após sincronização

#### 6.3.4 Limitações e Considerações

- Assinatura digital (VIDaaS) requer conectividade
- Envio de TISS para convênios requer conectividade
- Telemedicina requer conectividade
- Dados sincronizados são validados contra políticas RLS do servidor
- Limite de armazenamento IndexedDB: ~50MB por origem (varia por navegador)

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
│  │  • Rate Limiting adaptativo (por usuário/tenant + limites por IP)  │     │
│  │  • HTTPS Only (TLS 1.3)                                             │     │
│  │  • HSTS Preload                                                     │     │
│  │  • Validação de input no API Gateway (Zod schemas)                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 2 - APLICAÇÃO                ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • JWT com RS256 (Access + Refresh Tokens)                          │     │
│  │    - Access Token: 15 min TTL                                       │     │
│  │    - Refresh Token: 7 dias, rotação automática, httpOnly cookie    │     │
│  │    - Revogação via blacklist em Redis                               │     │
│  │  • CSRF Protection                                                  │     │
│  │  • XSS Prevention (Content Security Policy)                         │     │
│  │  • SQL Injection Prevention (Prepared Statements)                   │     │
│  │  • Input Validation (Zod em todas as camadas)                       │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 3 - DADOS                    ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • Row-Level Security (RLS) - PostgreSQL                            │     │
│  │  • Encryption at Rest (AES-256)                                     │     │
│  │  • Encryption in Transit (TLS 1.3)                                  │     │
│  │  • Password Hashing (Argon2id)                                      │     │
│  │  • PII Encryption (dados sensíveis)                                 │     │
│  │  • Backup automático criptografado (AWS S3 + S3 Glacier, SSE-KMS    │     │
│  │    com AES-256 e rotação automática de chaves KMS)                  │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│  CAMADA 4 - AUDITORIA                ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  • Audit Logs imutáveis                                             │     │
│  │  • SIEM Integration (Security Information & Event Management)       │     │
│  │  • Alertas de anomalia                                              │     │
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
│     • Sem perfilamento discriminatório                                       │
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

### 8.3 Plano de Recuperação de Desastres (DR)

Esta seção descreve como os objetivos de disponibilidade, RTO (< 1 hora) e RPO (< 5 minutos) são atendidos na prática, considerando cenários de falha parcial e desastres regionais.

#### 8.3.1 Escopo e Objetivos

- **Escopo:** indisponibilidade de região de cloud, corrupção de dados, falha crítica de infraestrutura, incidentes de segurança que exijam restauração de ambiente.
- **RTO Global (Recuperação de Serviço):** < 1 hora para restabelecer o serviço em uma região saudável.
- **RPO Global (Perda Máxima de Dados):** < 5 minutos entre o último ponto consistente e o momento do incidente.

#### 8.3.2 Estratégia de Redundância Geográfica

- **Aplicação:** implantação em múltiplas regiões de cloud, com distribuição de tráfego via DNS/edge (anycast) e balanceadores regionais.
- **Banco de Dados Transacional (NeonDB):**
  - Replicação assíncrona entre regiões, com **read replicas** em regiões secundárias.
  - **Point-in-time recovery (PITR)** habilitado com retenção contínua de logs para suportar o RPO definido.
- **Armazenamento de Arquivos (S3 ou equivalente):**
  - Buckets configurados com **replicação cross-region** para região secundária.
  - Versionamento habilitado para proteção contra deleção/acesso indevido.

#### 8.3.3 Backups e Retenção

- **Backups automáticos** de banco de dados:
  - Full diário com retenção de, no mínimo, 30 dias.
  - Log de transações contínuo para suporte a PITR.
- **Backups de configuração/infrequentemente alterados** (infra-as-code, parâmetros de ambiente, secrets criptografados):
  - Armazenados em repositórios redundantes e cofres de segredo na região primária e secundária.
- **Testes periódicos de restauração:**
  - Simulações trimestrais de recovery em ambiente isolado para validar integridade dos backups e tempo de recuperação.

#### 8.3.4 Procedimentos de Failover

- **Falha parcial (serviços não críticos):**
  - Failover automático via orquestrador/serverless (reimplante em zona/região saudável).
  - Escalonamento para SRE/DevOps para validação pós-failover.
- **Falha total da região primária:**
  1. **Detecção:** alerta de indisponibilidade regional por observabilidade (ver Seção 9).
  2. **Decisão:** comitê de incidente (SRE + Segurança + Negócio) confirma ativação de DR.
  3. **Ativação da Região Secundária:**
     - Promover réplica de banco de dados a **primária** na região secundária.
     - Apontar DNS/edge para a região secundária.
     - Validar saúde dos serviços críticos (login, agendamento, prontuário, faturamento).
  4. **Comunicação:** notificar clientes e stakeholders sobre o incidente, status e janela estimada.
- **Retorno à Região Primária (Failback):**
  - Planejado em janela de baixa demanda, com replicação e validação de dados da região secundária para a primária antes da troca.

#### 8.3.5 Segurança e Conformidade em DR

- Todos os backups são **criptografados em repouso** e em trânsito.
- Acesso a dados de backup é restrito por **princípio do menor privilégio**, auditado e registrado.
- Procedimentos de DR mantêm conformidade com **LGPD** e requisitos de saúde (sigilo médico, prontuário).

#### 8.3.6 Testes e Manutenção do Plano

- **Revisão anual** do plano de DR ou a cada mudança arquitetural relevante.
- **Execução de exercícios de mesa (tabletop)** e simulações técnicas para treinar a equipe.
- Registro pós-incidente (post-mortem) com lições aprendidas e ajustes no plano.

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
