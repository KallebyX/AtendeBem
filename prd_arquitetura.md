# Arquitetura Técnica e Design System - PRD AtendeBem 2.0

## Stack Recomendado

### Frontend
- Framework: React 18 + TypeScript
- State Management: Zustand
- UI Components: shadcn/ui (Radix + Tailwind)
- Styling: Tailwind CSS + CSS Modules
- Animations: Framer Motion
- Charts: Recharts ou Nivo
- Forms: React Hook Form + Zod
- HTTP Client: TanStack Query
- Build: Vite
- Testing: Vitest + React Testing Library
- Deployment: Vercel

### Backend
- Runtime: Node.js 20+ (LTS)
- Framework: Express.js ou Fastify
- Language: TypeScript
- ORM: Prisma
- Database: PostgreSQL 15+
- Cache: Redis
- Job Queue: Bull/BullMQ
- Auth: jsonwebtoken (JWT) + bcryptjs
- Validation: Zod
- Logging: Winston + Sentry
- Testing: Jest + Supertest
- Deployment: Docker + Railway / Render

### AI/LLM
- Provider: Google Gemini API (2.0 Flash)
- Wrapper: @google/generative-ai
- Prompt Framework: Versionados
- Context Management: Custom system
- Rate Limiting: Backend middleware
- Monitoring: Logs de uso + cost tracking

## Data Model (Simplificado)

### Users
users (id, email, password_hash, crm, cpf, specialty)

### Patients
patients (id, user_id, name, cpf, dob, gender, phone)

### Appointments (Core)
appointments (id, user_id, patient_id, chief_complaint, primary_cid, secondary_cids[], observations, appointment_type, convenio_id, total_value, appointment_datetime, status, created_at, updated_at)

### Appointment Procedures
appointment_procedures (id, appointment_id, tuss_id, quantity, unit_value, total_value)

### TUSS Reference
tuss_procedures (id, codigo, descricao, valor_default)

### Audit Log
audit_logs (id, user_id, entity, action, changes, created_at)

## Design System - Cores (Tokens)

### Semantic
- --color-primary: #0A2342 (Deep Sapphire) - Trust, intelligence
- --color-secondary: #2DD4BF (Tech Mint) - Health, agility
- --color-neutral-bg: #FFFFFF (White)
- --color-neutral-surface: #F8FAFC (Ice Gray)
- --color-neutral-text: #64748B (Slate Gray)
- --color-neutral-border: #E2E8F0

### Functional
- --color-success: #10B981 (Green)
- --color-warning: #F59E0B (Amber)
- --color-error: #EF4444 (Red)
- --color-info: #3B82F6 (Blue)

## Tipografia (Inter)

### Headings
- H1: 32px, 600 weight, 1.2 line-height
- H2: 24px, 600 weight, 1.3 line-height
- H3: 20px, 500 weight, 1.4 line-height

### Body
- Body: 14px, 400 weight, 1.5 line-height
- Small: 12px, 400 weight, 1.4 line-height
- Caption: 11px, 400 weight, 1.3 line-height

## Automações Planejadas

### Y2: Auto-Preenchimento Contextual
- Sistema detecta padrões históricos
- Ativa modo "sugestão automática"
- Pré-carrega: Procedimentos, CIDs, valores típicos
- Médico apenas valida / ajusta
- Redução adicional de 50% no tempo

### Y3: Análise Preditiva de Erros
- Identifica combinações problemáticas
- Alerta proativo: "Cuidado! Você teve 3 reclamações com essa combo"
- Oferece procedimento alternativo
- Redução de retrabalho em 40%

### Y3: Integração com Faturamento
- Exporta automaticamente procedimentos validados
- Reduz ciclo de faturamento
- ROI para clínicas: +30% na margem operacional
