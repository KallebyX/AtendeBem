<p align="center">
  <img src="public/images/logo.svg" alt="AtendeBem Logo" width="280"/>
</p>

<h1 align="center">AtendeBem</h1>

<p align="center">
  <strong>Menos burocracia. Mais medicina.</strong>
</p>

<p align="center">
  Plataforma SaaS para registro inteligente de atendimentos em saúde com códigos TUSS, receitas digitais certificadas ICP-Brasil e exportação profissional.
</p>

<p align="center">
  <a href="https://v0-atendebem.vercel.app">
    <img src="https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge" alt="Demo"/>
  </a>
  <img src="https://img.shields.io/badge/license-proprietary-red?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge" alt="Status"/>
</p>

---

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Uso](#uso)
- [API](#api)
- [Segurança](#segurança)
- [Roadmap](#roadmap)
- [Time](#time)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Sobre

O **AtendeBem** resolve um problema crítico na rotina médica: profissionais de saúde perdem até **2 horas por dia** com documentação administrativa, navegando entre dezenas de tabelas técnicas (TUSS, CID, CBOS) e enfrentando **30% de glosas** por erros em códigos ou preenchimento.

Nossa plataforma transforma esse cenário ao converter o raciocínio clínico em registros estruturados, eliminando a complexidade do preenchimento manual.

### O Problema

| Desafio | Impacto |
|---------|---------|
| Tempo perdido com documentação | 2h/dia por profissional |
| Tabelas técnicas para consultar | 10+ (TUSS, CID-10/11, CBOS) |
| Taxa de glosas por erros | ~30% das guias |
| Curva de aprendizado de sistemas | Alta frustração e retrabalho |

### A Solução

O AtendeBem funciona como um **Construtor de Atendimentos** visual onde o profissional monta o atendimento realizado, e o sistema se encarrega de aplicar regras administrativas, gerar registros estruturados e exportar no formato necessário.

---

## Funcionalidades

### Registro de Atendimentos

- Fluxo visual e intuitivo — Monte atendimentos como blocos, sem códigos técnicos
- Busca inteligente — Encontre procedimentos por nome comum, não por código
- Validação em tempo real — Feedback instantâneo sobre campos obrigatórios
- Histórico reutilizável — Repita atendimentos anteriores com um clique

### Base de Dados Completa

- **10.000+ códigos TUSS** — Consultas, procedimentos cirúrgicos e exames
- **CID-10 e CID-11** — Classificação internacional atualizada
- **Banco de Medicamentos** — RENAME e lista estadual RS/2025 integradas
- **CBOS** — Classificação Brasileira de Ocupações

### Receituário Digital

- Assinatura ICP-Brasil — Certificado digital e-CPF/e-CNPJ com validade jurídica
- QR Code de validação — Pacientes e farmácias validam autenticidade
- Conformidade CFM/ANS — Atende todos os requisitos legais
- Criptografia ponta-a-ponta — Segurança e rastreabilidade completa

### Exportação Profissional

- PDF padrão TISS/ANS — Pronto para envio a convênios
- Excel estruturado — Para análises e auditorias
- API REST — Integração com outros sistemas

### Assistente IA (Gemini)

- Auxílio na montagem de atendimentos
- Esclarecimento de dúvidas administrativas
- Sugestões de combinações usuais

---

## Tecnologias

### Frontend

| Tecnologia | Uso |
|------------|-----|
| Next.js 14 | Framework React com App Router |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização |
| shadcn/ui | Componentes acessíveis |
| Lucide Icons | Iconografia |

### Backend e Database

| Tecnologia | Uso |
|------------|-----|
| Supabase | Auth, Database, Storage, Edge Functions |
| PostgreSQL | Banco de dados relacional |
| Row Level Security | Isolamento multi-tenant |

### Integrações

| Serviço | Uso |
|---------|-----|
| Google Gemini | Assistente IA |
| Vercel | Deploy e hosting |
| ICP-Brasil | Assinatura digital |

---

## Arquitetura

### Visão Geral

O sistema segue uma arquitetura moderna baseada em serverless com Supabase como backend:

```
┌────────────────────────────────────────────────────────────┐
│                        CLIENTE                             │
│                    (Next.js + React)                       │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│                    SUPABASE PLATFORM                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │     Auth     │  │   Database   │  │  Edge Functions  │ │
│  │    (JWT)     │  │ (PostgreSQL) │  │     (Deno)       │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │          Row Level Security (RLS)                   │   │
│  │       Isolamento Multi-Tenant por tenant_id         │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│                  SERVIÇOS EXTERNOS                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │    Gemini    │  │  ICP-Brasil  │  │      Vercel      │ │
│  │     (IA)     │  │ (Cert. Dig.) │  │   (CDN/Deploy)   │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### Estrutura de Diretórios

```
atendebem/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Área logada
│   ├── api/               # API Routes
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Formulários
│   └── shared/           # Componentes compartilhados
├── lib/                   # Utilitários e configurações
│   ├── supabase/         # Cliente e tipos Supabase
│   ├── utils/            # Funções auxiliares
│   └── validations/      # Schemas Zod
├── hooks/                 # React Hooks customizados
├── styles/               # Estilos globais
├── public/               # Assets estáticos
├── scripts/              # Scripts de manutenção
└── docs/                 # Documentação
```

### Modelo de Dados

Principais entidades do sistema:

**tenants** — Clínicas e consultórios
- id, name, cnpj, created_at

**users** — Profissionais de saúde
- id, tenant_id, role, profile_data

**patients** — Pacientes
- id, tenant_id, name, cpf, birth_date

**appointments** — Atendimentos
- id, tenant_id, patient_id, professional_id
- procedures (códigos TUSS), diagnoses (códigos CID), status

**prescriptions** — Receitas digitais
- id, tenant_id, appointment_id
- medications, digital_signature, qr_code

> Todas as tabelas possuem `tenant_id` para isolamento multi-tenant via RLS.

---

## Instalação

### Pré-requisitos

- Node.js 18+
- pnpm 8+
- Conta no [Supabase](https://supabase.com)
- Chave API do [Google Gemini](https://ai.google.dev/)

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/KallebyX/AtendeBem.git
cd AtendeBem

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
```

### Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Google Gemini
GEMINI_API_KEY=sua-api-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Configuração do Banco

```bash
# Conecte ao Supabase CLI
npx supabase login
npx supabase link --project-ref seu-project-ref

# Execute as migrations
npx supabase db push
```

### Executando

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build && pnpm start
```

Acesse: http://localhost:3000

---

## Uso

### Fluxo Principal

1. **Cadastro/Login** — Crie sua conta ou acesse com credenciais existentes
2. **Configure sua clínica** — Dados do profissional, especialidade, convênios
3. **Registre atendimentos** — Use o construtor visual para montar procedimentos
4. **Exporte documentos** — PDF para convênios, Excel para controle interno

### Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl + N` | Novo atendimento |
| `Ctrl + S` | Salvar rascunho |
| `Ctrl + E` | Exportar PDF |
| `Ctrl + K` | Busca rápida |

---

## API

### Autenticação

Todas as requisições devem incluir:

```http
Authorization: Bearer <supabase-jwt-token>
```

### Endpoints Principais

**Atendimentos**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/appointments | Lista atendimentos |
| POST | /api/appointments | Cria atendimento |
| GET | /api/appointments/:id | Detalhes |
| PUT | /api/appointments/:id | Atualiza |
| DELETE | /api/appointments/:id | Remove |

**Pacientes**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/patients | Lista pacientes |
| POST | /api/patients | Cadastra |
| GET | /api/patients/:id | Detalhes |
| PUT | /api/patients/:id | Atualiza |

**Códigos TUSS**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/tuss?q=consulta | Busca códigos |
| GET | /api/tuss/:code | Detalhes do código |

**Exportação**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/export/pdf | Gera PDF |
| POST | /api/export/excel | Gera planilha |

### Exemplo de Requisição

```typescript
const response = await fetch('/api/appointments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    patient_id: 'uuid-do-paciente',
    scheduled_at: '2025-01-15T14:00:00Z',
    procedures: [
      { tuss_code: '10101012', description: 'Consulta em consultório' }
    ],
    diagnoses: [
      { cid_code: 'J06.9', description: 'IVAS não especificada' }
    ]
  })
});
```

---

## Segurança

### Conformidade

- **LGPD** — Estrutura preparada para adequação
- **CFM** — Normas para prontuário eletrônico
- **ANS** — Padrão TISS para saúde suplementar
- **ICP-Brasil** — Assinatura digital válida

### Práticas Implementadas

- Autenticação JWT com refresh tokens
- Row Level Security (RLS) para isolamento multi-tenant
- Criptografia de dados sensíveis
- Validação de entrada em todas as rotas
- Rate limiting nas APIs
- Logs de auditoria

### Aviso Importante

> O AtendeBem **não realiza diagnóstico médico** e **não substitui julgamento clínico**. É uma ferramenta administrativa para registro e documentação.

---

## Roadmap

### Q1 2025

- [x] MVP com registro de atendimentos
- [x] Integração TUSS completa
- [x] Receituário digital básico
- [ ] Assinatura ICP-Brasil

### Q2 2025

- [ ] App mobile (React Native)
- [ ] Integração com WhatsApp Business
- [ ] Dashboard de analytics

### Q3 2025

- [ ] Módulo financeiro (faturamento)
- [ ] Integração com laboratórios
- [ ] Telemedicina nativa

### Q4 2025

- [ ] Marketplace de integrações
- [ ] IA preditiva
- [ ] Expansão para outras especialidades

---

## Time

<table>
  <tr>
    <td align="center" width="200">
      <a href="https://github.com/KallebyX">
        <img src="https://github.com/KallebyX.png" width="100" alt="Kalleby Evangelho"/>
        <br />
        <strong>Kalleby Evangelho Mota</strong>
      </a>
      <br />
      <sub>CEO & Founder</sub>
      <br />
      <sub>Oryum Tech</sub>
    </td>
    <td align="center" width="200">
      <a href="https://github.com/luizfr-jr">
        <img src="https://github.com/luizfr-jr.png" width="100" alt="Prof. Luiz Fernando"/>
        <br />
        <strong>Prof. Luiz Fernando R. Jr.</strong>
      </a>
      <br />
      <sub>Orientador Acadêmico</sub>
      <br />
      <sub>Universidade Franciscana</sub>
    </td>
    <td align="center" width="200">
      <a href="https://www.doctoralia.com.br/carlos-abdala/ortopedista-traumatologista/cacapava-do-sul">
        <img src="https://ui-avatars.com/api/?name=CA&background=0d9488&color=fff&size=100&bold=true" width="100" alt="Dr. Carlos Abdala"/>
        <br />
        <strong>Dr. Carlos Abdala</strong>
      </a>
      <br />
      <sub>Consultor Médico</sub>
      <br />
      <sub>Ortopedista & Traumatologista</sub>
    </td>
  </tr>
</table>

### Contribuições

| Membro | Papel | Área |
|--------|-------|------|
| Kalleby Evangelho | CEO & Founder | Arquitetura, desenvolvimento full-stack, gestão |
| Prof. Luiz Fernando | Orientador | Metodologia, orientação técnica, validação |
| Dr. Carlos Abdala | Consultor | Validação clínica, requisitos médicos |

---

## Contribuição

### Como Contribuir

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: adiciona funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Padrão de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `style:` | Formatação |
| `refactor:` | Refatoração |
| `test:` | Testes |
| `chore:` | Manutenção |

---

## Licença

Este projeto está sob **licença proprietária**.

O uso, cópia ou distribuição sem autorização expressa **não é permitido**.

© 2025 [Oryum Tech](https://oryum.tech) — Todos os direitos reservados.

---

## Contato

| Canal | Link |
|-------|------|
| Website | [oryum.tech](https://oryum.tech) |
| Email | contato@oryum.tech |
| LinkedIn | [Kalleby Evangelho](https://linkedin.com/in/kallebyevangelho) |

---

<p align="center">
  <strong>AtendeBem</strong> — Atender bem não deveria ser burocrático.
</p>

<p align="center">
  Feito com ❤️ em Caçapava do Sul, RS, Brasil
</p>
