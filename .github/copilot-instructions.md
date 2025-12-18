# AtendeBem - Instruções para Agentes IA

## Visão Geral do Projeto

**AtendeBem** é uma plataforma SaaS de registro inteligente de atendimentos em saúde, focada em eliminar complexidade burocrática (TUSS, CID-10, prescrições) enquanto mantém experiência clínica simples e auditável.

- **Stack:** Next.js 16 + TypeScript + TailwindCSS + Radix UI
- **BD:** PostgreSQL (Neon) + Row-Level Security (RLS)
- **Auth:** JWT nativo (Web Crypto API, sem bcrypt)
- **IA:** Google Gemini 2.0 Flash (chat assistente)
- **Padrão:** Server Actions (Next.js) para mutações, API routes para dados públicos

---

## Arquitetura de Componentes Principais

### 1. **Camada de Autenticação**
- **`lib/session.ts`**: JWT nativo com HMAC-SHA256 (sem dependências externas)
- **Fluxo**: Login → gera token de 7 dias → armazenado em cookie `session` → validado em cada Server Action
- **Contexto de Usuário**: Definido via `setUserContext(userId)` para ativar RLS no Postgres

**Padrão no código:**
```typescript
const user = await verifyToken(token)
await setUserContext(user.id)
// Queries SQL herdam automaticamente isolamento por usuário
```

### 2. **Banco de Dados e RLS**
- **Inicialização:** `lib/db-init.ts` cria tabelas automaticamente se não existirem
- **RLS Policy:** Todos os inserts/updates/deletes validam `app.current_user_id` (défault: false)
- **Tabelas principais:**
  - `users`: Profissionais (CRM, especialidade, credenciais)
  - `appointments`: Atendimentos core (paciente, procedimentos, diagnóstico)
  - `procedures`: Detalhes de procedimentos dentro de um atendimento
  - `prescriptions`: Receitas digitais com assinatura
  - `patients`: Histórico de pacientes do usuário

### 3. **Server Actions vs API Routes**
- **Server Actions** (`app/actions/*.ts`): Mutações (criar, atualizar, deletar) — validação JWT + RLS automática
- **API Routes** (`app/api/*.ts`): Dados públicos (TUSS, CID-10, medicamentos), exportações, webhook de assinatura
- **Padrão**: Todas as Server Actions importam `verifyToken()` e `getDb()`

---

## Bases de Dados Administrativas

AtendeBem herda significativas bibliotecas de código clínico/administrativo. Estas são **leitura-apenas** e consultadas via API ou direto no frontend:

### TUSS (4.901 procedimentos)
- **Arquivo:** `lib/tuss-complete.ts`
- **Search:** `searchTUSS(query, limit)` — busca fuzzy em nome/código
- **Estrutura:** `{ code, name, specialty, category, requiresLaterality?, requiresLocation? }`
- **API:** `GET /api/tuss?search=termo&code=10101012`
- **Uso**: Form de novo atendimento (`app/atendimento/novo/page.tsx`)

### CID-10 (9.818 diagnósticos)
- **Arquivo:** `lib/cid-complete.ts` / `lib/cid10-complete.ts`
- **Search:** `searchCID10(query, limit)`
- **API:** `GET /api/cid?search=termo&category=A`
- **Uso**: Classificação de diagnósticos primários/secundários

### Medicamentos (931 registros)
- **Arquivo:** `lib/medications-data.ts`
- **API:** `GET /api/medications?search=termo`
- **Uso**: Prescrições digitais

---

## Fluxos Críticos

### Novo Atendimento (Happy Path)
1. **Frontend** (`app/atendimento/novo/page.tsx`): Coleta dados passo-a-passo
   - Tipo: consulta/retorno/procedimento/exame
   - Contexto + urgência (do TUSS)
   - Procedimentos (múltiplos com detalhes: lateralidade, localização)
2. **Server Action** (`createAppointment`): Valida JWT, escreve em DB com RLS
3. **Histórico** (`app/historico/page.tsx`): Lista atendimentos, permite repetição/edição

### Prescrições Digitais
1. **Criação:** `app/receitas/nova/page.tsx` → Server Action `createPrescription`
2. **Assinatura:** Integração VIDaaS (ICP-Brasil) → `lib/vidaas.ts`
3. **Callback:** POST `app/api/signature/callback` valida e atualiza status
4. **Exportação:** `GET /api/export?type=prescription&id=xxx` retorna HTML/PDF

---

## Convenções Específicas do Projeto

### Nomeação
- **Server Actions:** Verbo + Entidade: `createAppointment()`, `updatePatient()`
- **API Routes:** Recursos REST lowercase: `/api/patients`, `/api/tuss`
- **Componentes UI:** PascalCase, sufixo `tsx` (ex: `Button.tsx`)
- **Tipos:** Suffix com Entity: `SessionUser`, `TUSSProcedure`

### Padrão de Erro
Todas as Server Actions retornam:
```typescript
{ error?: string, data?: T, success?: boolean }
```

### Validação
- **Frontend:** Zod schemas nas páginas (ex: prescrição, cadastro)
- **Backend:** Validação JWT + RLS automática (não validar manualmente)

### Estilos
- **Design System:** shadcn/ui (importa de `components/ui/`)
- **Temas:** `next-themes` + CSS variables (Light/Dark)
- **Ícones:** `lucide-react`
- **Animações:** TailwindCSS animate (conforme necessário)

---

## Tarefas Comuns

### Adicionar Novo Procedimento/Campo a Atendimento
1. Atualizar `scripts/XX-migration.sql` → adicionar coluna a `appointments` ou nova tabela
2. Rodar `GET /api/setup-db?key=SETUP_KEY` para aplicar
3. Atualizar `app/actions/appointments.ts` → `createAppointment()` e `updateAppointment()`
4. Atualizar form em `app/atendimento/novo/page.tsx`
5. Testar com histórico/repetição

### Adicionar Nova API Pública
1. Criar `app/api/novo-recurso/route.ts` com `GET|POST`
2. Validar JWT se necessário (copiar padrão de `/api/export`)
3. Documentar no `README.md` e em `IMPLEMENTACAO_COMPLETA.md`

### Integrar Novo Código Administrativo (Ex: Novo Medicamento)
1. Adicionar dados a `lib/medications-complete.ts`
2. Implementar `searchMedications()` com fuzzy search
3. Exposer via `GET /api/medications` com paginação
4. Consumir no form apropriado (prescrições)

---

## Dependências Críticas & Sem Substitutos

- **@neondatabase/serverless:** Postgres sem conexão TCP — não trocar sem migração completa
- **jose:** JWT — está em package.json mas **session.ts usa Web Crypto nativo** (verificar antes de adicionar bcrypt)
- **@ai-sdk/google + ai**: Streaming de chat — requer manutenção de system prompts
- **Next.js Server Actions:** Padrão de mutações — não usar fetch manual de `/api` para writes

---

## Comandos Essenciais

```bash
npm run dev          # Inicia servidor dev (localhost:3000)
npm run build        # Build para produção
npm run lint         # ESLint (TypeScript)
npm start            # Inicia servidor produção
# Setup DB: GET http://localhost:3000/api/setup-db?key=SETUP_KEY
```

---

## Atalhos para Agentes IA

- **Nova funcionalidade completa**: Começar em `app/actions/` (lógica) → `app/api/` (se público) → componente UI
- **Bug de autenticação**: Verificar `lib/session.ts` → validação JWT → `setUserContext()` na query
- **Performance de busca**: Usar `searchTUSS()` / `searchCID10()` — já otimizado com índices em memória
- **Assinatura digital**: Requer callback webhook — não bloquear UI durante assinatura (usar status polling)
- **Exportação**: Padrão HTML → PDF (usar `lib/pdf-generator.ts`)

---

## Conhecimento Contextual

- **Histórico médico é reutilizável**: Atendimentos podem ser repetidos (clonados) com edição
- **Prescrições ≠ Atendimentos**: Prescrições são emitidas após ou durante atendimento, com assinatura separada
- **TUSS tem contextos**: Mesmo código pode ter diferentes comportamentos por especialidade/context
- **RLS garante zero data leak**: Nem query SQL mal escrita vaza dados de outro usuário
