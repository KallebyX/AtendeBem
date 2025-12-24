# Análise Completa de Gaps do Sistema AtendeBem

> **Data da Análise:** 24 de Dezembro de 2025
> **Versão do Sistema:** 91% completo
> **Total de Gaps Identificados:** 157+

---

## Resumo Executivo

Após análise sistemática e profunda do código-fonte do AtendeBem, foram identificados **157+ gaps** distribuídos em **14 categorias principais**. Os problemas mais críticos envolvem **segurança**, **validação de dados**, **ausência total de testes** e **funcionalidades não implementadas**.

### Distribuição por Criticidade

| Criticidade | Quantidade | Ação Necessária |
|-------------|------------|-----------------|
| 🔴 CRÍTICO | 15 | Corrigir imediatamente |
| 🟠 ALTO | 35 | Corrigir em 1-2 sprints |
| 🟡 MÉDIO | 60 | Corrigir em 2-4 sprints |
| 🟢 BAIXO | 47+ | Nice-to-have |

---

## 1. TODOs, FIXMEs e Código Incompleto

### 1.1 TODOs Críticos (9 encontrados)

| # | Descrição | Arquivo | Linha | Impacto |
|---|-----------|---------|-------|---------|
| 1 | Conversão de valores em extenso incompleta | `lib/pdf-advanced.ts` | 451 | PDFs com valores incorretos |
| 2 | Envio SOAP TISS não implementado | `app/actions/tiss.ts` | 503 | Não envia guias TISS reais |
| 3 | Exportação EMR não implementada | `app/emr/page.tsx` | 123 | Botão exportar não funciona |
| 4 | Seleção de operadora ANS hardcoded | `app/tiss/page.tsx` | 317 | Operadora sempre "999999" |
| 5 | Adição de procedimento à guia incompleta | `app/tiss/page.tsx` | 928 | Fluxo quebrado |
| 6-9 | Placeholders "XXXXX" em XML TISS | `lib/tiss-xml.ts` | 112, 125, 207, 220 | XML inválido gerado |

### 1.2 Código com TODOs

```typescript
// lib/pdf-advanced.ts:451
texto = `${reaisExtenso} reais` // TODO: implementar conversão completa

// app/actions/tiss.ts:503
// TODO: Implementar envio real via SOAP client

// app/emr/page.tsx:123
// TODO: Implementar exportacao

// app/tiss/page.tsx:317
operadora_registro_ans: "999999" // TODO: Selecionar operadora
```

---

## 2. Funcionalidades Não Implementadas

### 2.1 Frontends Pendentes (6 módulos)

| Módulo | Status Backend | Status Frontend | Prioridade |
|--------|---------------|-----------------|------------|
| MOD-ORÇ (Orçamentos) | ✅ 100% | ❌ 0% | Alta |
| MOD-CON (Contratos) | ✅ 100% | ⚠️ Básico | Média |
| MOD-LAB (Laboratório) | ✅ 100% | ❌ 0% | Alta |
| MOD-IMG (Imagens DICOM) | ✅ 100% | ❌ 0% | Média |
| MOD-GES (Gestão Clínica) | ✅ 100% | ❌ 0% | Alta |
| MOD-PEP (Prontuário Eletrônico) | ✅ 100% | ⚠️ Parcial | Alta |

### 2.2 Integrações Mockadas

| Serviço | Arquivo | Status | Log Mock |
|---------|---------|--------|----------|
| SMS Twilio | `lib/twilio.ts:26` | Mock | `[MOCK SMS]` |
| WhatsApp Business | `lib/whatsapp.ts:27, 77` | Mock | `[MOCK WHATSAPP]` |
| Pagamentos Stripe | `lib/stripe.ts:31` | Mock | `[MOCK PAYMENT]` |
| Email SendGrid | `lib/sendgrid.ts:33, 68` | Mock | `[MOCK EMAIL]` |
| Upload S3 | `lib/s3.ts:17` | Não configurado | Warning apenas |

---

## 3. Validações Ausentes ou Incompletas

### 3.1 Validações Críticas Faltando

#### 🔴 CPF Sem Validação Real
- **Arquivo:** `components/patient-creation-modal.tsx:98-103`
- **Problema:** Aceita qualquer string como CPF
- **Código atual:**
```typescript
if (!formData.cpf) {
  setError("CPF é obrigatório")
  return
}
// FALTA: Validação de formato e dígitos verificadores
```

#### 🔴 Email Sem Validação Regex
- **Arquivos:** `app/actions/auth.ts`, `app/crm/novo-paciente/page.tsx`
- **Problema:** Usa apenas `type="email"` do HTML

#### 🔴 Telefone Sem Validação
- **Arquivo:** `components/patient-creation-modal.tsx:250`
- **Problema:** Apenas placeholder, sem validação de formato

#### 🟠 CEP Sem Validação
- **Arquivo:** `app/crm/novo-paciente/page.tsx:241`
- **Problema:** Não valida formato nem existência

#### 🟠 Data de Nascimento Sem Range
- **Arquivo:** `app/crm/novo-paciente/page.tsx:130-138`
- **Problema:** Aceita datas futuras

#### 🟠 Senha Muito Fraca
- **Arquivo:** `app/actions/auth.ts:108-110`
- **Código:** `if (data.password.length < 6)`
- **Problema:** Mínimo de 6 caracteres é insuficiente
- **Recomendação:** Mínimo 12 caracteres + complexidade

### 3.2 JSON.parse Sem Try/Catch

| Arquivo | Linha | Código Problemático |
|---------|-------|---------------------|
| `app/actions/report-export.ts` | 1298 | `JSON.parse(p.medications)` |
| `app/actions/report-export.ts` | 1321 | `JSON.parse(p.medications)` |

---

## 4. Segurança e Proteção de Dados

### 4.1 Problemas Críticos de Segurança

#### 🔴 Fallback para SHA-256 em Senhas
- **Arquivo:** `lib/session.ts:80-88`
- **Problema:** Se Argon2 não estiver disponível, usa SHA-256 sem salt
- **Risco:** Vulnerável a rainbow tables
- **Código:**
```typescript
const encoder = new TextEncoder()
const data = encoder.encode(password)
const hashBuffer = await crypto.subtle.digest("SHA-256", data)
```

#### 🔴 Sem Rate Limiting em Login
- **Arquivo:** `app/actions/auth.ts:124-153`
- **Problema:** Sem limite de tentativas de login
- **Risco:** Brute force attacks

#### 🔴 Console.logs Expondo Dados em Produção
- **Arquivo:** `app/actions/auth.ts`
- **Linhas:** 126, 136, 138, 140, 142, 146
```typescript
console.log("[AUTH] Login attempt started")
console.log("[AUTH] Authenticating user:", email)
console.log("[AUTH] User authenticated successfully:", { id: user.id, email: user.email })
```

### 4.2 Outros Problemas de Segurança

| # | Problema | Arquivo | Risco |
|---|----------|---------|-------|
| 1 | Sem CSRF Protection explícita | Global | CSRF attacks |
| 2 | Sem sanitização de entrada | `app/crm/[id]/page.tsx:754` | XSS |
| 3 | IDs em URLs sem hash | `app/receitas/assinar/[id]` | Enumeração |
| 4 | Encryption opcional | `lib/encryption.ts:15-24` | Dados em texto plano |
| 5 | Conversas IA não encriptadas | `lib/db.ts` | Violação LGPD |
| 6 | Webhooks sem validação de assinatura | `app/api/webhooks/whatsapp/route.ts` | Webhook spoofing |
| 7 | Session expira em 30 dias | `lib/session.ts:13` | Muito longo |

---

## 5. Tratamento de Erros

### 5.1 Error Handling Inadequado

| Problema | Arquivo | Código Exemplo |
|----------|---------|----------------|
| JSON.parse sem try/catch | `app/actions/report-export.ts:1298` | `JSON.parse(p.medications)` |
| Erros genéricos demais | `components/patient-creation-modal.tsx:141-145` | `"Erro de conexao"` |
| Sem logging estruturado | Global | `console.error` aleatório |
| Status codes incorretos | `app/api/patients/route.ts:50-52` | Sempre retorna 500 |
| Undefined access | `app/actions/crm.ts:83` | `patient[0]` sem verificar |
| Sem timeout em fetch | `app/receitas/nova/page.tsx:148` | `await fetch(...)` sem timeout |

### 5.2 Código com Erro Genérico
```typescript
// components/patient-creation-modal.tsx:141-145
} catch (err: any) {
  console.error("Erro ao cadastrar paciente:", err)
  setError("Erro de conexao. Tente novamente.")  // Perde informação do erro real
}
```

---

## 6. Acessibilidade (WCAG 2.1)

### 6.1 Problemas de Acessibilidade

| # | Problema | Impacto | Solução |
|---|----------|---------|---------|
| 1 | Sem aria-labels em botões | Leitores de tela não conseguem ler | Adicionar `aria-label` |
| 2 | Inputs sem htmlFor associado | Forms inacessíveis | Associar labels |
| 3 | Botões sem type explícito | Comportamento inesperado | Adicionar `type="button"` |
| 4 | Sem aria-required | Campo obrigatório não semântico | Adicionar atributo |
| 5 | Contraste não verificado | Pode falhar WCAG AA | Validar cores |
| 6 | Sem skip links | Navegação difícil | Adicionar "Skip to content" |
| 7 | Modais sem aria-live | Erros não anunciados | Adicionar `aria-live="polite"` |
| 8 | Foco não gerenciado em modais | Navegação por teclado quebrada | Usar Radix Dialog |

---

## 7. Responsividade e UI/UX

### 7.1 Problemas de Responsividade

| Problema | Arquivo | Solução |
|----------|---------|---------|
| Grid layouts não responsivos | `app/crm/novo-paciente/page.tsx:107` | Adicionar breakpoints |
| Tabelas com overflow | Global | `-webkit-overflow-scrolling: touch` |
| Botões pequenos em mobile | Componentes com `size="icon"` | Aumentar hit area |
| Text size estático | Global | Usar `clamp()` |
| Dark mode não testado | Global | Verificar todos componentes |

---

## 8. Autenticação e Autorização

### 8.1 Problemas de Auth

| # | Problema | Arquivo | Risco |
|---|----------|---------|-------|
| 1 | Sem multi-tenancy | `app/actions/crm.ts:20-21` | Acesso cross-tenant |
| 2 | Session fixation possível | `lib/session.ts` | Session hijacking |
| 3 | Sem logout em todas abas | Global | Sessões órfãs |
| 4 | Sem refresh token rotation | `lib/session.ts:159` | Token roubado válido forever |
| 5 | Sem rate limiting em APIs | `app/api/*` | Enumeration attacks |
| 6 | Sem 2FA | Global | Credential stuffing |
| 7 | Sem auditoria de login | Global | Impossível detectar ataques |
| 8 | Sessão de 30 dias | `lib/session.ts:13` | Muito longa |
| 9 | Sem verificação `nbf` em JWT | `lib/session.ts:209` | Tokens prematuros |
| 10 | Sem roles/permissions | Database | Todos têm acesso igual |

---

## 9. Integração com Backend

### 9.1 Problemas de API

| Problema | Arquivo | Impacto |
|----------|---------|---------|
| CID API sem validação de entrada | `app/api/cid/route.ts` | SSRF possível |
| TUSS API sem cache | `app/api/tuss/route.ts` | Performance ruim |
| Sem versionamento de API | Global | Breaking changes |
| Sem documentação OpenAPI | Global | Difícil usar API |
| Paginação inconsistente | `app/actions/crm.ts:51-53` | LIMIT hardcoded |
| Sem timeout em fetches | `app/receitas/nova/page.tsx:148` | Requisições penduradas |

---

## 10. Testes

### 🔴 CRÍTICO: Zero Cobertura de Testes

| Tipo de Teste | Status | Arquivos Encontrados | Estimativa |
|---------------|--------|---------------------|------------|
| Testes Unitários | ❌ | 0 | 50+ necessários |
| Testes de Integração | ❌ | 0 | 30+ necessários |
| Testes E2E | ❌ | 0 | 20+ necessários |
| Test Runner | ❌ | Não configurado | - |

### Áreas Críticas Sem Testes
- Autenticação e autorização
- Validação de CPF/CNPJ
- Criptografia e hashing
- Geração de PDFs e XMLs
- Actions de CRUD
- Integração TISS

---

## 11. Documentação

### Documentação Faltando

| Documento | Status | Prioridade |
|-----------|--------|------------|
| OpenAPI/Swagger | ❌ Não existe | Alta |
| README com setup | ⚠️ Incompleto | Alta |
| Schema SQL documentado | ❌ Não existe | Média |
| Diagrama ER | ❌ Não existe | Média |
| Fluxos de negócio | ❌ Não existe | Média |
| CONTRIBUTING.md | ❌ Não existe | Baixa |
| SECURITY.md | ❌ Não existe | Alta |
| Guia de deploy | ❌ Não existe | Alta |

---

## 12. Performance

### 12.1 Problemas de Performance

| Problema | Arquivo | Solução |
|----------|---------|---------|
| Bundle grande (jspdf, xlsx, recharts) | Global | Code splitting |
| Sem cache em queries | `app/api/tuss/route.ts` | Redis cache |
| LIMIT hardcoded sem cursor | `app/actions/crm.ts:52` | Cursor-based pagination |
| ILIKE % lento | `app/api/patients/route.ts:33` | Full-text search |
| N+1 queries potenciais | Global | Eager loading |
| Sem debounce em buscas | Buscas TUSS, CID | Debounce 300ms |

---

## 13. Qualidade de Código

### 13.1 Type Safety

| Problema | Quantidade | Impacto |
|----------|------------|---------|
| Uso de `any` | 55 ocorrências | Perde type safety |
| Type assertions `as any` | 10 ocorrências | Bypassa verificações |
| Sem enums para status | Global | Typos não detectados |
| Constants hardcoded | Global | Manutenção difícil |
| Sem types para API responses | Global | Runtime errors |

### 13.2 Código Duplicado e Arquitetura

- Validação de CPF duplicada em múltiplos arquivos
- Componentes muito grandes (ex: `app/crm/[id]/page.tsx`)
- UI e lógica misturadas (sem custom hooks)

---

## 14. Estados de Loading/Error

### 14.1 Problemas de Feedback Visual

| Problema | Arquivo | Solução |
|----------|---------|---------|
| Sem spinner em API calls | `app/receitas/nova/page.tsx:148-158` | Adicionar loading state |
| Sem skeleton loaders | Global | Implementar skeletons |
| Sem optimistic updates | Global | Atualizar UI antes de API |
| Sem retry logic | Global | Adicionar botão retry |
| Erros genéricos em toasts | Global | Mensagens específicas |
| Sem confirmação em delete | Global | Alert dialog |
| Sem stepper em wizards | `app/anamnese/page.tsx` | Progress bar |

---

## Arquivos Mais Problemáticos

| Arquivo | Problemas | Criticidade |
|---------|-----------|-------------|
| `app/receitas/nova/page.tsx` | Múltiplos gaps | 🔴 |
| `lib/session.ts` | Segurança | 🔴 |
| `app/actions/auth.ts` | Logs + segurança | 🔴 |
| `lib/encryption.ts` | Key opcional | 🔴 |
| `app/crm/novo-paciente/page.tsx` | Validações | 🟠 |
| `app/tiss/page.tsx` | TODOs | 🟠 |
| `lib/tiss-xml.ts` | Placeholders | 🟠 |

---

## Plano de Ação Recomendado

### Semana 1 - CRÍTICO
- [ ] Implementar validação de CPF com algoritmo completo
- [ ] Adicionar rate limiting em login (Upstash)
- [ ] Remover todos console.logs de produção
- [ ] Adicionar try/catch em JSON.parse
- [ ] Criar arquivo `.env.example`

### Semana 2 - SEGURANÇA
- [ ] Implementar 2FA (TOTP)
- [ ] Adicionar auditoria de login
- [ ] Implementar session rotation
- [ ] Adicionar CSRF protection
- [ ] Tornar ENCRYPTION_KEY obrigatória

### Semana 3 - TESTES
- [ ] Setup Vitest
- [ ] Testes de auth
- [ ] Testes de validação
- [ ] Setup Playwright para E2E

### Semana 4 - PERFORMANCE
- [ ] Implementar cache Redis
- [ ] Code splitting para bibliotecas pesadas
- [ ] Debounce em buscas
- [ ] Cursor-based pagination

### Semanas 5-8 - FUNCIONALIDADES
- [ ] Frontend MOD-ORÇ
- [ ] Frontend MOD-LAB
- [ ] Frontend MOD-GES
- [ ] Melhorar MOD-PEP

---

## Métricas de Conclusão

| Categoria | Atual | Meta |
|-----------|-------|------|
| Cobertura de Testes | 0% | 80% |
| Validações Implementadas | 40% | 100% |
| Acessibilidade WCAG | ~50% | 100% |
| Documentação | 20% | 80% |
| Segurança | 60% | 95% |

---

*Documento gerado automaticamente por análise de código.*
*Última atualização: 24/12/2025*
