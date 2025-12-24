# Prompts para Implementação de Melhorias - AtendeBem

> **Total de Prompts:** 45
> **Organizados por:** Criticidade e Categoria
> **Uso:** Copie cada prompt e execute sequencialmente

---

## 🔴 SEMANA 1 - CRÍTICO (Segurança e Validações)

---

### PROMPT 1: Implementar Validação Completa de CPF

```
Implemente validação completa de CPF no sistema AtendeBem:

1. Crie um arquivo `lib/validators/cpf.ts` com:
   - Função `validateCPF(cpf: string): boolean` que valida os dígitos verificadores
   - Função `formatCPF(cpf: string): string` que formata como XXX.XXX.XXX-XX
   - Função `cleanCPF(cpf: string): string` que remove pontos e traços
   - Rejeitar CPFs com todos dígitos iguais (111.111.111-11, etc)

2. Atualize `components/patient-creation-modal.tsx`:
   - Importe e use validateCPF antes de submeter
   - Mostre erro específico "CPF inválido" se falhar
   - Formate o CPF no input com máscara

3. Atualize `app/crm/novo-paciente/page.tsx`:
   - Mesma validação e formatação

4. Atualize `app/actions/crm.ts`:
   - Valide CPF no servidor antes de salvar no banco
   - Retorne erro 400 se CPF inválido

5. Adicione testes unitários em `lib/validators/__tests__/cpf.test.ts`:
   - Teste CPFs válidos conhecidos
   - Teste CPFs inválidos
   - Teste formatação
```

---

### PROMPT 2: Implementar Rate Limiting em Login

```
Implemente rate limiting para proteção contra brute force no login:

1. Instale a dependência: `npm install @upstash/ratelimit @upstash/redis`

2. Crie `lib/rate-limit.ts`:
   - Configure Upstash Redis client (ou fallback para memory se não configurado)
   - Crie rate limiter: 5 tentativas por IP a cada 15 minutos
   - Crie rate limiter por email: 10 tentativas por hora
   - Exporte funções `checkRateLimit(identifier: string)` e `resetRateLimit(identifier: string)`

3. Atualize `app/actions/auth.ts` na função de login:
   - Antes de verificar credenciais, cheque rate limit por IP
   - Cheque também rate limit por email
   - Se bloqueado, retorne erro com tempo restante para tentar novamente
   - Em login bem-sucedido, resete o rate limit do usuário

4. Crie página `app/blocked/page.tsx`:
   - Mostre mensagem amigável quando usuário bloqueado
   - Mostre countdown para quando pode tentar novamente

5. Adicione variáveis ao `.env.example`:
   - UPSTASH_REDIS_REST_URL
   - UPSTASH_REDIS_REST_TOKEN
```

---

### PROMPT 3: Remover Console.logs de Produção

```
Remova todos os console.logs que expõem dados sensíveis em produção:

1. Em `app/actions/auth.ts`:
   - Remova ou substitua por logger estruturado todos os console.log nas linhas 126, 136, 138, 140, 142, 146
   - Mantenha apenas logs de erro sem dados sensíveis

2. Crie `lib/logger.ts`:
   - Implemente logger que só loga em desenvolvimento
   - Use variável NODE_ENV para controlar
   - Função `logger.info()`, `logger.warn()`, `logger.error()`
   - Em produção, envie para serviço externo (opcional) ou silencie

3. Busque e substitua em todo o projeto:
   - Procure por `console.log` que contenha dados de usuário, email, id, senha
   - Substitua por logger ou remova

4. Arquivos para verificar especificamente:
   - lib/session.ts (linha 80 - warning de Argon2)
   - lib/twilio.ts, lib/whatsapp.ts, lib/stripe.ts, lib/sendgrid.ts (mocks)
   - app/api/* (todos os endpoints)

5. Configure ESLint para prevenir console.log em produção:
   - Adicione regra `no-console` com warning
```

---

### PROMPT 4: Corrigir Hash de Senhas - Remover Fallback SHA-256

```
Corrija a segurança de hash de senhas removendo o fallback inseguro:

1. Em `lib/session.ts`:
   - Remova completamente o fallback para SHA-256 (linhas 80-88)
   - Torne Argon2 obrigatório - se não disponível, lance erro
   - Adicione verificação no startup da aplicação

2. Atualize `package.json`:
   - Garanta que `argon2` está nas dependencies (não devDependencies)
   - Adicione script `postinstall` para verificar instalação do argon2

3. Crie `lib/security/password.ts`:
   - Exporte função `hashPassword(password: string): Promise<string>`
   - Exporte função `verifyPassword(password: string, hash: string): Promise<boolean>`
   - Use Argon2id com parâmetros seguros (memory: 65536, iterations: 3, parallelism: 4)

4. Atualize todas as referências para usar o novo módulo:
   - app/actions/auth.ts (registro e login)
   - Qualquer outro lugar que hash senhas

5. Adicione teste para verificar que hash está funcionando corretamente
```

---

### PROMPT 5: Adicionar Try/Catch em JSON.parse

```
Corrija todos os JSON.parse sem tratamento de erro:

1. Crie `lib/utils/safe-json.ts`:
   - Função `safeJsonParse<T>(json: string, fallback: T): T`
   - Retorna fallback se parse falhar
   - Loga erro para debugging

2. Em `app/actions/report-export.ts`:
   - Linha 1298: Substitua `JSON.parse(p.medications)` por `safeJsonParse(p.medications, [])`
   - Linha 1321: Mesma correção
   - Busque outros JSON.parse no arquivo e corrija

3. Busque em todo o projeto por `JSON.parse`:
   - Execute: grep -r "JSON.parse" --include="*.ts" --include="*.tsx"
   - Para cada ocorrência, verifique se tem try/catch
   - Se não tiver, use safeJsonParse ou adicione try/catch

4. Arquivos prioritários para verificar:
   - app/actions/*.ts
   - lib/*.ts
   - app/api/**/*.ts
```

---

### PROMPT 6: Implementar Validação de Email

```
Implemente validação robusta de email em todo o sistema:

1. Crie `lib/validators/email.ts`:
   - Função `validateEmail(email: string): boolean` com regex robusto
   - Função `normalizeEmail(email: string): string` (lowercase, trim)
   - Considere usar biblioteca `validator` para validação mais completa

2. Atualize `app/actions/auth.ts`:
   - Valide email no registro (função register)
   - Valide email no login antes de buscar usuário
   - Normalize email antes de salvar/buscar

3. Atualize `components/patient-creation-modal.tsx`:
   - Adicione validação de email no submit
   - Mostre erro específico para email inválido

4. Atualize `app/crm/novo-paciente/page.tsx`:
   - Mesma validação de email

5. Adicione testes em `lib/validators/__tests__/email.test.ts`:
   - Emails válidos
   - Emails inválidos (sem @, domínios inválidos, etc)
```

---

### PROMPT 7: Implementar Validação de Telefone

```
Implemente validação de telefone brasileiro:

1. Crie `lib/validators/phone.ts`:
   - Função `validatePhone(phone: string): boolean`
   - Aceite formatos: (XX) XXXXX-XXXX, (XX) XXXX-XXXX
   - Valide DDD válido (11-99)
   - Função `formatPhone(phone: string): string` para formatar
   - Função `cleanPhone(phone: string): string` para limpar

2. Atualize `components/patient-creation-modal.tsx`:
   - Adicione máscara no input de telefone
   - Valide antes de submeter
   - Mostre erro específico

3. Atualize `app/crm/novo-paciente/page.tsx`:
   - Mesma validação e máscara

4. Considere usar biblioteca `react-input-mask` ou similar para máscaras

5. Adicione testes unitários
```

---

### PROMPT 8: Implementar Validação de CEP

```
Implemente validação de CEP com busca automática de endereço:

1. Crie `lib/validators/cep.ts`:
   - Função `validateCEP(cep: string): boolean` (formato XXXXX-XXX)
   - Função `formatCEP(cep: string): string`
   - Função `cleanCEP(cep: string): string`

2. Crie `lib/services/viacep.ts`:
   - Função `fetchAddress(cep: string): Promise<Address | null>`
   - Use API ViaCEP: https://viacep.com.br/ws/{cep}/json/
   - Retorne null se CEP não encontrado
   - Adicione cache para evitar chamadas repetidas

3. Atualize `app/crm/novo-paciente/page.tsx`:
   - Adicione máscara no input de CEP
   - Ao sair do campo (onBlur), busque endereço automaticamente
   - Preencha campos de rua, bairro, cidade, estado automaticamente
   - Mostre loading durante busca
   - Mostre erro se CEP não encontrado

4. Adicione testes
```

---

### PROMPT 9: Fortalecer Validação de Senha

```
Implemente validação de senha forte:

1. Crie `lib/validators/password.ts`:
   - Função `validatePasswordStrength(password: string): { valid: boolean, errors: string[] }`
   - Requisitos mínimos:
     * Mínimo 12 caracteres
     * Pelo menos 1 letra maiúscula
     * Pelo menos 1 letra minúscula
     * Pelo menos 1 número
     * Pelo menos 1 caractere especial
   - Função `getPasswordStrength(password: string): 'weak' | 'medium' | 'strong'`

2. Atualize `app/actions/auth.ts`:
   - Na função register, use validatePasswordStrength
   - Retorne erros específicos para cada requisito não atendido

3. Crie componente `components/password-strength-indicator.tsx`:
   - Barra visual de força da senha
   - Lista de requisitos com check/x
   - Cores: vermelho (fraca), amarelo (média), verde (forte)

4. Atualize formulários de registro/alteração de senha para usar o componente

5. Adicione testes unitários
```

---

### PROMPT 10: Criar Arquivo .env.example

```
Crie arquivo .env.example documentando todas as variáveis de ambiente:

1. Crie `/home/user/AtendeBem/.env.example` com todas as variáveis:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/atendebem

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars

# Encryption (REQUIRED for LGPD compliance)
ENCRYPTION_KEY=your-32-character-encryption-key

# Redis (for rate limiting and caching)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Email (SendGrid)
SENDGRID_API_KEY=SG.xxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
TWILIO_PHONE_NUMBER=+1234567890

# WhatsApp Business
WHATSAPP_API_TOKEN=xxxx
WHATSAPP_PHONE_NUMBER_ID=xxxx

# Payments (Stripe)
STRIPE_SECRET_KEY=sk_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# Storage (AWS S3)
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=atendebem-uploads

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

2. Atualize README.md com instruções de configuração

3. Crie script `scripts/check-env.ts` que valida variáveis obrigatórias no startup
```

---

## 🔴 SEMANA 2 - SEGURANÇA AVANÇADA

---

### PROMPT 11: Implementar Autenticação 2FA (TOTP)

```
Implemente autenticação de dois fatores com TOTP:

1. Instale dependências: `npm install otplib qrcode @types/qrcode`

2. Crie `lib/security/totp.ts`:
   - Função `generateTOTPSecret(): { secret: string, otpauthUrl: string }`
   - Função `verifyTOTP(token: string, secret: string): boolean`
   - Função `generateQRCode(otpauthUrl: string): Promise<string>` (retorna data URL)

3. Atualize schema do banco (lib/db.ts):
   - Adicione campos na tabela users: `totp_secret`, `totp_enabled`, `totp_verified_at`

4. Crie página `app/settings/security/page.tsx`:
   - Seção para habilitar/desabilitar 2FA
   - Mostrar QR Code para escanear
   - Input para verificar código e confirmar ativação
   - Gerar códigos de backup (10 códigos únicos)

5. Atualize `app/actions/auth.ts`:
   - No login, após verificar senha, checar se 2FA está habilitado
   - Se habilitado, redirecionar para página de verificação 2FA
   - Criar action `verifyTOTP` para validar código

6. Crie página `app/auth/verify-2fa/page.tsx`:
   - Input para código TOTP
   - Opção de usar código de backup
   - Após verificar, completar login

7. Adicione testes
```

---

### PROMPT 12: Implementar Auditoria de Login

```
Implemente sistema de auditoria de tentativas de login:

1. Crie tabela no banco `lib/db.ts`:
```sql
CREATE TABLE login_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(20) NOT NULL, -- 'success', 'failed_password', 'failed_2fa', 'blocked'
  failure_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_login_audit_email ON login_audit(email);
CREATE INDEX idx_login_audit_created_at ON login_audit(created_at);
```

2. Crie `lib/audit/login-audit.ts`:
   - Função `logLoginAttempt(data: LoginAuditData): Promise<void>`
   - Função `getRecentFailedAttempts(email: string, minutes: number): Promise<number>`
   - Função `getLoginHistory(userId: string, limit: number): Promise<LoginAudit[]>`

3. Atualize `app/actions/auth.ts`:
   - Após cada tentativa de login (sucesso ou falha), registre na auditoria
   - Capture IP do header x-forwarded-for ou x-real-ip
   - Capture User-Agent

4. Crie página `app/settings/security/login-history/page.tsx`:
   - Mostre histórico de logins do usuário
   - Destaque logins de IPs/dispositivos novos
   - Opção de encerrar outras sessões

5. Implemente alertas:
   - Se login de novo IP, envie email de notificação
   - Se muitas falhas, envie alerta de segurança
```

---

### PROMPT 13: Implementar Session Rotation

```
Implemente rotação de sessão para prevenir session fixation:

1. Atualize `lib/session.ts`:
   - Após login bem-sucedido, sempre gere novo session ID
   - Invalide o session ID anterior
   - Função `rotateSession(oldSessionId: string): Promise<string>`

2. Implemente refresh token rotation:
   - Ao usar refresh token, gere novo refresh token
   - Invalide o refresh token usado
   - Mantenha família de tokens para detectar reuso

3. Crie `lib/session/token-family.ts`:
   - Rastreie família de refresh tokens
   - Se token antigo reutilizado, invalide toda a família (possível roubo)

4. Atualize expiração de tokens:
   - Access token: 15 minutos (não 30 dias!)
   - Refresh token: 7 dias
   - Após refresh, novo access token

5. Adicione endpoint `app/api/auth/refresh/route.ts`:
   - Receba refresh token
   - Valide e gere novos tokens
   - Retorne novo access + refresh token

6. Atualize frontend para refresh automático:
   - Interceptor que detecta 401
   - Tenta refresh automaticamente
   - Se refresh falhar, redireciona para login
```

---

### PROMPT 14: Implementar CSRF Protection

```
Implemente proteção CSRF explícita:

1. Instale: `npm install csrf`

2. Crie `lib/security/csrf.ts`:
   - Função `generateCSRFToken(): string`
   - Função `validateCSRFToken(token: string): boolean`
   - Use tokens com expiração de 1 hora

3. Crie middleware `middleware.ts` (ou atualize existente):
   - Para requisições POST/PUT/DELETE, verifique header X-CSRF-Token
   - Exclua rotas de API pública e webhooks
   - Retorne 403 se token inválido

4. Crie hook `hooks/useCSRF.ts`:
   - Busque token CSRF do servidor
   - Armazene em estado
   - Forneça função para incluir em requisições

5. Atualize todas as chamadas fetch/axios:
   - Inclua header X-CSRF-Token em mutations
   - Use o hook useCSRF

6. Crie endpoint `app/api/csrf/route.ts`:
   - GET retorna novo token CSRF
   - Token vinculado à sessão do usuário
```

---

### PROMPT 15: Tornar Encryption Key Obrigatória

```
Torne a ENCRYPTION_KEY obrigatória para dados sensíveis:

1. Atualize `lib/encryption.ts`:
   - Remova o fallback que permite não ter key
   - Lance erro fatal se ENCRYPTION_KEY não configurada
   - Valide que key tem exatamente 32 caracteres

2. Crie `lib/startup-checks.ts`:
   - Função `validateEnvironment()` que verifica variáveis obrigatórias
   - Verifique: DATABASE_URL, JWT_SECRET, ENCRYPTION_KEY
   - Lance erro com mensagem clara se faltando

3. Atualize `next.config.mjs`:
   - Importe e execute validateEnvironment no startup

4. Atualize campos sensíveis no banco para sempre encriptar:
   - CPF, CNS, endereço, telefone
   - Crie migration para encriptar dados existentes

5. Documente no README.md:
   - Como gerar ENCRYPTION_KEY segura
   - Comando: `openssl rand -hex 16`
   - Importância de backup seguro da key
```

---

### PROMPT 16: Implementar Validação de Webhook

```
Implemente validação de assinatura em webhooks:

1. Atualize `app/api/webhooks/whatsapp/route.ts`:
   - Valide assinatura X-Hub-Signature-256
   - Use HMAC SHA-256 com secret configurado
   - Rejeite requisições com assinatura inválida

2. Crie `lib/webhooks/validator.ts`:
   - Função `validateWebhookSignature(payload: string, signature: string, secret: string): boolean`
   - Suporte para diferentes provedores (WhatsApp, Stripe, etc)

3. Para Stripe (se aplicável):
   - Use `stripe.webhooks.constructEvent()`
   - Valide com STRIPE_WEBHOOK_SECRET

4. Adicione rate limiting em webhooks:
   - Máximo 100 requests por minuto por IP
   - Log de tentativas suspeitas

5. Implemente replay protection:
   - Armazene IDs de webhooks processados
   - Rejeite webhooks duplicados
   - Use timestamp para rejeitar webhooks muito antigos (> 5 min)
```

---

### PROMPT 17: Reduzir Tempo de Sessão

```
Reduza o tempo de expiração de sessão para valores seguros:

1. Atualize `lib/session.ts`:
   - ACCESS_TOKEN_EXPIRY: 900 (15 minutos, não 30 dias)
   - REFRESH_TOKEN_EXPIRY: 604800 (7 dias)

2. Implemente "Remember Me":
   - Se usuário marcar "Lembrar-me", use refresh token de 30 dias
   - Se não marcar, refresh token de 24 horas

3. Implemente idle timeout:
   - Se usuário inativo por 30 minutos, exija re-autenticação
   - Crie hook `useIdleTimeout` para detectar inatividade

4. Atualize frontend:
   - Componente que monitora expiração do token
   - Modal de aviso 5 minutos antes de expirar
   - Opção de estender sessão

5. Implemente logout automático:
   - Ao fechar navegador (sem "Lembrar-me")
   - Use sessionStorage para tokens se não lembrar
```

---

## 🔴 SEMANA 3 - TESTES

---

### PROMPT 18: Setup Vitest para Testes Unitários

```
Configure Vitest para testes unitários:

1. Instale dependências:
   ```bash
   npm install -D vitest @vitest/coverage-v8 @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
   ```

2. Crie `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'
   import path from 'path'

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       globals: true,
       setupFiles: ['./tests/setup.ts'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'html'],
         exclude: ['node_modules/', 'tests/']
       }
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './')
       }
     }
   })
   ```

3. Crie `tests/setup.ts`:
   ```typescript
   import '@testing-library/jest-dom'
   import { vi } from 'vitest'

   // Mock Next.js router
   vi.mock('next/navigation', () => ({
     useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
     usePathname: () => '/',
   }))
   ```

4. Atualize `package.json` scripts:
   ```json
   "test": "vitest",
   "test:ui": "vitest --ui",
   "test:coverage": "vitest run --coverage"
   ```

5. Crie primeiro teste em `lib/validators/__tests__/cpf.test.ts`
```

---

### PROMPT 19: Testes de Autenticação

```
Crie testes completos para o sistema de autenticação:

1. Crie `app/actions/__tests__/auth.test.ts`:
   - Teste register com dados válidos
   - Teste register com email duplicado
   - Teste register com senha fraca
   - Teste login com credenciais válidas
   - Teste login com senha incorreta
   - Teste login com email inexistente
   - Teste logout
   - Teste refresh token

2. Crie `lib/__tests__/session.test.ts`:
   - Teste geração de tokens
   - Teste validação de tokens
   - Teste tokens expirados
   - Teste hash de senha
   - Teste verificação de senha

3. Crie mocks necessários:
   - Mock do banco de dados
   - Mock do Redis
   - Mock de crypto

4. Configure fixtures:
   - Usuário de teste padrão
   - Tokens de teste

5. Garanta cobertura mínima de 80% para auth
```

---

### PROMPT 20: Testes de Validação

```
Crie testes para todas as funções de validação:

1. Crie `lib/validators/__tests__/cpf.test.ts`:
   - CPFs válidos conhecidos (pelo menos 10)
   - CPFs inválidos (dígitos errados)
   - CPFs com todos dígitos iguais
   - Formatação correta
   - Limpeza de caracteres

2. Crie `lib/validators/__tests__/email.test.ts`:
   - Emails válidos diversos
   - Emails inválidos (sem @, domínio inválido, etc)
   - Normalização (lowercase, trim)

3. Crie `lib/validators/__tests__/phone.test.ts`:
   - Telefones fixos válidos
   - Celulares válidos (9 dígitos)
   - DDDs válidos
   - Formatos inválidos

4. Crie `lib/validators/__tests__/cep.test.ts`:
   - CEPs válidos
   - CEPs inválidos
   - Formatação

5. Crie `lib/validators/__tests__/password.test.ts`:
   - Senhas fortes
   - Senhas fracas (cada requisito faltando)
   - Cálculo de força
```

---

### PROMPT 21: Setup Playwright para Testes E2E

```
Configure Playwright para testes end-to-end:

1. Instale: `npm install -D @playwright/test`

2. Execute: `npx playwright install`

3. Crie `playwright.config.ts`:
   ```typescript
   import { defineConfig, devices } from '@playwright/test'

   export default defineConfig({
     testDir: './e2e',
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     workers: process.env.CI ? 1 : undefined,
     reporter: 'html',
     use: {
       baseURL: 'http://localhost:3000',
       trace: 'on-first-retry',
     },
     projects: [
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
       { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
       { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
     ],
     webServer: {
       command: 'npm run dev',
       url: 'http://localhost:3000',
       reuseExistingServer: !process.env.CI,
     },
   })
   ```

4. Crie `e2e/auth.spec.ts`:
   - Teste fluxo completo de login
   - Teste fluxo de registro
   - Teste logout

5. Atualize `package.json`:
   ```json
   "test:e2e": "playwright test",
   "test:e2e:ui": "playwright test --ui"
   ```
```

---

### PROMPT 22: Testes E2E - Fluxo de Paciente

```
Crie testes E2E para fluxos de paciente:

1. Crie `e2e/patient.spec.ts`:

   - Teste "Criar novo paciente":
     * Login como usuário
     * Navegar para /crm/novo-paciente
     * Preencher formulário completo
     * Submeter e verificar sucesso
     * Verificar paciente na lista

   - Teste "Buscar paciente":
     * Login
     * Usar barra de busca
     * Verificar resultados
     * Clicar em paciente
     * Verificar página de detalhes

   - Teste "Editar paciente":
     * Abrir paciente existente
     * Modificar dados
     * Salvar
     * Verificar alterações persistidas

   - Teste "Validação de formulário":
     * Tentar submeter com CPF inválido
     * Verificar mensagem de erro
     * Corrigir e submeter

2. Crie fixtures em `e2e/fixtures/`:
   - Usuário de teste
   - Paciente de teste

3. Configure cleanup após testes
```

---

### PROMPT 23: Testes E2E - Fluxo de Prescrição

```
Crie testes E2E para o fluxo de prescrição:

1. Crie `e2e/prescription.spec.ts`:

   - Teste "Criar nova receita":
     * Login como médico
     * Navegar para /receitas/nova
     * Selecionar paciente
     * Adicionar medicamentos
     * Adicionar posologia
     * Submeter receita
     * Verificar PDF gerado

   - Teste "Assinar receita digitalmente":
     * Abrir receita pendente
     * Inserir senha/certificado
     * Assinar
     * Verificar status atualizado

   - Teste "Buscar receitas":
     * Filtrar por paciente
     * Filtrar por data
     * Filtrar por status

   - Teste "Validação de medicamentos":
     * Buscar medicamento por nome
     * Verificar sugestões RENAME
     * Selecionar e adicionar

2. Teste integração com CID/TUSS:
   - Buscar CID
   - Verificar descrição
```

---

### PROMPT 24: Testes de API

```
Crie testes para endpoints de API:

1. Crie `app/api/__tests__/patients.test.ts`:
   - GET /api/patients - listar pacientes
   - GET /api/patients?search= - buscar
   - POST /api/patients - criar (se existir)
   - Teste autenticação obrigatória
   - Teste paginação

2. Crie `app/api/__tests__/cid.test.ts`:
   - GET /api/cid?search= - buscar CID
   - Teste resultados corretos
   - Teste termo não encontrado

3. Crie `app/api/__tests__/tuss.test.ts`:
   - GET /api/tuss?search= - buscar TUSS
   - Teste resultados
   - Teste cache (se implementado)

4. Crie helpers de teste em `tests/helpers/`:
   - `createAuthenticatedRequest()` - request com token
   - `createTestUser()` - criar usuário para teste
   - `cleanupTestData()` - limpar dados após teste

5. Configure banco de dados de teste separado
```

---

## 🟠 SEMANA 4 - PERFORMANCE

---

### PROMPT 25: Implementar Cache Redis

```
Implemente cache Redis para queries frequentes:

1. Crie `lib/cache/redis.ts`:
   - Cliente Redis (Upstash ou ioredis)
   - Funções: get, set, del, setWithExpiry
   - Fallback para memory cache se Redis não disponível

2. Crie `lib/cache/index.ts`:
   - Decorator/wrapper para cache
   - Função `cached<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T>`

3. Aplique cache em:
   - `/api/tuss` - TTL 24 horas (dados estáticos)
   - `/api/cid` - TTL 24 horas
   - Lista de pacientes - TTL 5 minutos
   - Dados de usuário logado - TTL 15 minutos

4. Implemente invalidação:
   - Ao criar/editar paciente, invalide cache de lista
   - Ao atualizar usuário, invalide cache de usuário

5. Adicione headers de cache:
   - Cache-Control para recursos estáticos
   - ETag para validação
```

---

### PROMPT 26: Implementar Code Splitting

```
Implemente code splitting para reduzir bundle size:

1. Identifique bibliotecas pesadas:
   - jspdf (~500KB)
   - xlsx (~400KB)
   - recharts (~300KB)

2. Implemente lazy loading:
   ```typescript
   // Antes
   import { jsPDF } from 'jspdf'

   // Depois
   const generatePDF = async () => {
     const { jsPDF } = await import('jspdf')
     // usar jsPDF
   }
   ```

3. Use next/dynamic para componentes pesados:
   ```typescript
   import dynamic from 'next/dynamic'

   const ChartComponent = dynamic(() => import('@/components/charts'), {
     loading: () => <Skeleton />,
     ssr: false
   })
   ```

4. Componentes para lazy load:
   - Gráficos (recharts)
   - Editor de PDF
   - Exportação Excel
   - Visualizador DICOM

5. Analise bundle com:
   ```bash
   npm run build
   npx @next/bundle-analyzer
   ```

6. Configure next.config.mjs para bundle analyzer
```

---

### PROMPT 27: Implementar Debounce em Buscas

```
Implemente debounce em todas as buscas do sistema:

1. Crie hook `hooks/useDebounce.ts`:
   ```typescript
   export function useDebounce<T>(value: T, delay: number): T {
     const [debouncedValue, setDebouncedValue] = useState(value)

     useEffect(() => {
       const timer = setTimeout(() => setDebouncedValue(value), delay)
       return () => clearTimeout(timer)
     }, [value, delay])

     return debouncedValue
   }
   ```

2. Crie hook `hooks/useDebouncedSearch.ts`:
   - Combine debounce com fetch
   - Inclua loading state
   - Cancele requests anteriores (AbortController)

3. Aplique em:
   - Busca de pacientes (app/receitas/nova/page.tsx)
   - Busca TUSS (app/atendimento/novo/page.tsx)
   - Busca CID
   - Busca de medicamentos
   - Busca global

4. Use delay de 300ms para buscas

5. Adicione indicador de "digitando..." durante debounce
```

---

### PROMPT 28: Implementar Cursor-Based Pagination

```
Implemente paginação baseada em cursor para listas grandes:

1. Crie `lib/pagination.ts`:
   - Função `encodeCursor(data: object): string` (base64)
   - Função `decodeCursor(cursor: string): object`
   - Interface `PaginatedResult<T>`

2. Atualize `app/actions/crm.ts`:
   ```typescript
   export async function getPatients(cursor?: string, limit = 20) {
     const decoded = cursor ? decodeCursor(cursor) : null

     const patients = await db.query(`
       SELECT * FROM patients
       WHERE user_id = $1
       ${decoded ? 'AND created_at < $2' : ''}
       ORDER BY created_at DESC
       LIMIT $3
     `, decoded ? [userId, decoded.createdAt, limit + 1] : [userId, limit + 1])

     const hasMore = patients.length > limit
     const items = patients.slice(0, limit)
     const nextCursor = hasMore ? encodeCursor({ createdAt: items[items.length - 1].created_at }) : null

     return { items, nextCursor, hasMore }
   }
   ```

3. Crie componente `components/infinite-scroll.tsx`:
   - Use Intersection Observer
   - Carregue próxima página ao scroll
   - Mostre loading no final

4. Aplique em:
   - Lista de pacientes
   - Lista de atendimentos
   - Histórico de prontuário
```

---

### PROMPT 29: Implementar Full-Text Search

```
Implemente busca full-text do PostgreSQL:

1. Crie migration para índices:
   ```sql
   -- Adicionar coluna tsvector
   ALTER TABLE patients ADD COLUMN search_vector tsvector;

   -- Criar índice GIN
   CREATE INDEX idx_patients_search ON patients USING GIN(search_vector);

   -- Trigger para atualizar automaticamente
   CREATE OR REPLACE FUNCTION patients_search_trigger() RETURNS trigger AS $$
   BEGIN
     NEW.search_vector :=
       setweight(to_tsvector('portuguese', coalesce(NEW.full_name, '')), 'A') ||
       setweight(to_tsvector('portuguese', coalesce(NEW.cpf, '')), 'B') ||
       setweight(to_tsvector('portuguese', coalesce(NEW.email, '')), 'C');
     RETURN NEW;
   END
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER patients_search_update
     BEFORE INSERT OR UPDATE ON patients
     FOR EACH ROW EXECUTE FUNCTION patients_search_trigger();
   ```

2. Atualize query de busca:
   ```typescript
   const patients = await db.query(`
     SELECT *, ts_rank(search_vector, query) as rank
     FROM patients, plainto_tsquery('portuguese', $1) query
     WHERE search_vector @@ query AND user_id = $2
     ORDER BY rank DESC
     LIMIT 50
   `, [searchTerm, userId])
   ```

3. Aplique em todas as buscas de texto
```

---

## 🟠 SEMANAS 5-8 - FUNCIONALIDADES

---

### PROMPT 30: Frontend MOD-ORÇ (Orçamentos)

```
Crie o frontend completo para o módulo de Orçamentos:

1. Crie estrutura de páginas:
   - `app/orcamentos/page.tsx` - Lista de orçamentos
   - `app/orcamentos/novo/page.tsx` - Criar orçamento
   - `app/orcamentos/[id]/page.tsx` - Detalhes/editar

2. Lista de orçamentos deve ter:
   - Filtros: status (pendente, aprovado, rejeitado, expirado), data, paciente
   - Colunas: número, paciente, valor total, status, validade, ações
   - Ações: visualizar, editar, duplicar, enviar por email/WhatsApp

3. Formulário de orçamento:
   - Seleção de paciente (com busca)
   - Adicionar itens (procedimentos TUSS, produtos, serviços)
   - Quantidade e valor unitário para cada item
   - Desconto (% ou valor fixo)
   - Validade do orçamento
   - Observações
   - Preview do PDF

4. Integre com actions existentes em `app/actions/orcamentos.ts`

5. Componentes necessários:
   - `components/orcamento/item-selector.tsx`
   - `components/orcamento/summary.tsx`
   - `components/orcamento/pdf-preview.tsx`

6. Implemente geração de PDF do orçamento
```

---

### PROMPT 31: Frontend MOD-LAB (Laboratório)

```
Crie o frontend completo para o módulo de Laboratório:

1. Crie estrutura de páginas:
   - `app/laboratorio/page.tsx` - Dashboard do lab
   - `app/laboratorio/pedidos/page.tsx` - Lista de pedidos
   - `app/laboratorio/pedidos/novo/page.tsx` - Novo pedido
   - `app/laboratorio/pedidos/[id]/page.tsx` - Detalhes do pedido
   - `app/laboratorio/resultados/page.tsx` - Resultados

2. Dashboard deve mostrar:
   - Pedidos pendentes de coleta
   - Exames em processamento
   - Resultados prontos para liberação
   - Métricas (TAT - turnaround time)

3. Pedido de exame:
   - Selecionar paciente
   - Selecionar exames (busca com código TUSS)
   - Indicação clínica
   - Urgência
   - Observações para coleta
   - Imprimir etiquetas

4. Fluxo de resultados:
   - Inserir valores dos exames
   - Valores de referência automáticos
   - Alertas para valores críticos
   - Liberação técnica e médica
   - Impressão/envio de laudo

5. Integre com actions de laboratório existentes
```

---

### PROMPT 32: Frontend MOD-GES (Gestão Clínica)

```
Crie o frontend completo para o módulo de Gestão Clínica:

1. Crie estrutura:
   - `app/gestao/page.tsx` - Dashboard principal
   - `app/gestao/financeiro/page.tsx` - Relatórios financeiros
   - `app/gestao/atendimentos/page.tsx` - Métricas de atendimento
   - `app/gestao/ocupacao/page.tsx` - Taxa de ocupação
   - `app/gestao/convenios/page.tsx` - Análise por convênio

2. Dashboard principal:
   - Cards com KPIs principais
   - Gráfico de faturamento mensal
   - Gráfico de atendimentos por tipo
   - Top 5 procedimentos
   - Alertas (contas a receber vencidas, etc)

3. Relatórios financeiros:
   - Faturamento por período
   - Faturamento por convênio
   - Faturamento por profissional
   - Contas a receber/pagar
   - Fluxo de caixa

4. Use Recharts para gráficos (já instalado)

5. Implemente exportação:
   - PDF dos relatórios
   - Excel com dados brutos

6. Filtros globais:
   - Período (data início/fim)
   - Profissional
   - Convênio
   - Unidade (se multi-unidade)
```

---

### PROMPT 33: Melhorar MOD-PEP (Prontuário Eletrônico)

```
Melhore o frontend do Prontuário Eletrônico:

1. Atualize `app/emr/page.tsx`:
   - Layout em timeline do prontuário
   - Seções colapsáveis por tipo de registro
   - Busca dentro do prontuário

2. Implemente visualização completa:
   - Anamnese com formatação
   - Exame físico estruturado
   - Hipóteses diagnósticas (CID)
   - Prescrições vinculadas
   - Exames solicitados
   - Atestados/declarações

3. Adicione funcionalidades:
   - Copiar texto de atendimento anterior
   - Templates de evolução
   - Anexar arquivos (PDF, imagens)
   - Desenho/anotação em imagens

4. Implemente a exportação (TODO existente):
   - Exportar prontuário completo em PDF
   - Exportar período específico
   - Incluir/excluir seções
   - Marca d'água "CÓPIA"

5. Melhore acessibilidade:
   - Navegação por teclado
   - Atalhos (Ctrl+N novo registro, etc)
   - Alto contraste

6. Implemente assinatura digital em registros
```

---

### PROMPT 34: Completar Integração TISS

```
Complete a integração TISS removendo todos os TODOs:

1. Em `app/tiss/page.tsx`:
   - Linha 317: Implemente seletor de operadora ANS
   - Crie componente de busca de operadoras
   - Carregue lista de operadoras do banco

   - Linha 928: Implemente adição de procedimento à guia
   - Modal para selecionar procedimento TUSS
   - Quantidade, valor, etc

2. Em `lib/tiss-xml.ts`:
   - Linhas 112, 125, 207, 220: Substitua "XXXXX" por valores reais
   - Busque registro ANS da operadora selecionada
   - Busque dados do prestador do banco

3. Em `app/actions/tiss.ts`:
   - Linha 503: Implemente envio SOAP real
   - Use biblioteca `soap` ou `axios` para SOAP
   - Configure certificado digital
   - Trate respostas da operadora

4. Crie `lib/tiss/soap-client.ts`:
   - Cliente SOAP genérico
   - Suporte a certificado A1/A3
   - Logging de requisições/respostas

5. Implemente recepção de retornos:
   - Processar XML de retorno
   - Atualizar status da guia
   - Notificar usuário
```

---

### PROMPT 35: Completar Conversão de Valores em Extenso

```
Complete a função de conversão de valores para extenso:

1. Atualize `lib/pdf-advanced.ts` linha 451:
   - Implemente conversão completa de números para extenso
   - Suporte valores até bilhões
   - Suporte centavos
   - Formato: "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"

2. Crie `lib/utils/number-to-words.ts`:
   ```typescript
   export function numberToWords(value: number): string {
     // Implementar conversão completa
     // Unidades: zero a dezenove
     // Dezenas: vinte, trinta, etc
     // Centenas: cem, cento, duzentos, etc
     // Milhares, milhões, bilhões
   }

   export function currencyToWords(value: number): string {
     const reais = Math.floor(value)
     const centavos = Math.round((value - reais) * 100)

     let result = numberToWords(reais)
     result += reais === 1 ? ' real' : ' reais'

     if (centavos > 0) {
       result += ' e ' + numberToWords(centavos)
       result += centavos === 1 ? ' centavo' : ' centavos'
     }

     return result
   }
   ```

3. Adicione testes completos:
   - 0 = "zero reais"
   - 1 = "um real"
   - 1.01 = "um real e um centavo"
   - 1234.56 = "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"

4. Use em todos os PDFs que precisam de valor por extenso
```

---

## 🟡 ACESSIBILIDADE

---

### PROMPT 36: Adicionar Aria Labels

```
Adicione aria-labels em todos os componentes interativos:

1. Atualize `components/ui/button.tsx`:
   - Adicione prop `aria-label` opcional
   - Para botões com apenas ícone, exija aria-label

2. Busque todos os botões de ícone no projeto:
   ```bash
   grep -r "size=\"icon\"" --include="*.tsx"
   ```
   - Adicione aria-label descritivo em cada um

3. Atualize inputs em formulários:
   - Verifique que todo input tem label associado via htmlFor
   - Adicione aria-describedby para mensagens de erro
   - Adicione aria-required="true" para campos obrigatórios

4. Atualize modais:
   - Adicione aria-labelledby apontando para título
   - Adicione aria-describedby para descrição
   - Adicione role="dialog"

5. Atualize menus dropdown:
   - aria-expanded para estado
   - aria-haspopup="menu"
   - role="menuitem" nos itens

6. Teste com screen reader (NVDA ou VoiceOver)
```

---

### PROMPT 37: Adicionar Skip Links e Navegação por Teclado

```
Melhore navegação por teclado:

1. Adicione skip link em `app/layout.tsx`:
   ```tsx
   <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded">
     Pular para conteúdo principal
   </a>

   <main id="main-content" tabIndex={-1}>
     {children}
   </main>
   ```

2. Implemente focus trap em modais:
   - Focus deve ficar dentro do modal quando aberto
   - Escape fecha o modal
   - Focus retorna ao elemento que abriu

3. Adicione atalhos de teclado:
   - Ctrl+K: Abrir busca global
   - Escape: Fechar modal/dropdown
   - Enter: Confirmar ação principal

4. Crie componente `components/keyboard-shortcuts.tsx`:
   - Modal com lista de atalhos (Ctrl+?)
   - Use react-hotkeys-hook

5. Garanta ordem de tabulação lógica em formulários

6. Adicione indicador visual de foco consistente
```

---

### PROMPT 38: Implementar Aria Live Regions

```
Implemente aria-live para feedback dinâmico:

1. Crie componente `components/ui/announcer.tsx`:
   ```tsx
   export function Announcer({ message, priority = 'polite' }: Props) {
     return (
       <div
         role="status"
         aria-live={priority}
         aria-atomic="true"
         className="sr-only"
       >
         {message}
       </div>
     )
   }
   ```

2. Crie hook `hooks/useAnnouncer.ts`:
   - Função para anunciar mensagens
   - Fila de anúncios
   - Debounce para evitar spam

3. Use em:
   - Feedback de formulários (erro/sucesso)
   - Loading states
   - Resultados de busca
   - Ações completadas
   - Notificações toast

4. Atualize toasts do Sonner:
   - Garantir que são anunciados
   - Adicionar role="alert" para erros

5. Teste com screen reader
```

---

## 🟡 DOCUMENTAÇÃO

---

### PROMPT 39: Criar Documentação de API (OpenAPI)

```
Crie documentação OpenAPI/Swagger para a API:

1. Instale: `npm install swagger-ui-react next-swagger-doc`

2. Crie `lib/swagger.ts`:
   - Configuração base do OpenAPI
   - Info, servers, security schemes

3. Documente endpoints em `app/api/**/*`:
   - Adicione JSDoc com @swagger
   ```typescript
   /**
    * @swagger
    * /api/patients:
    *   get:
    *     summary: Lista pacientes
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: query
    *         name: search
    *         schema:
    *           type: string
    *     responses:
    *       200:
    *         description: Lista de pacientes
    */
   ```

4. Crie página `app/api-docs/page.tsx`:
   - Renderize Swagger UI
   - Proteja com autenticação

5. Documente todos os endpoints:
   - /api/patients
   - /api/cid
   - /api/tuss
   - /api/user
   - /api/auth/*

6. Adicione exemplos de request/response
```

---

### PROMPT 40: Criar README Completo

```
Atualize o README.md com documentação completa:

1. Estrutura do README:
   ```markdown
   # AtendeBem

   Sistema de gestão para clínicas e consultórios médicos.

   ## Features
   - Agendamento de consultas
   - Prontuário eletrônico
   - Prescrição digital
   - Integração TISS
   - Faturamento

   ## Tech Stack
   - Next.js 14 (App Router)
   - TypeScript
   - PostgreSQL
   - Redis
   - Tailwind CSS

   ## Requisitos
   - Node.js 18+
   - PostgreSQL 14+
   - Redis (opcional)

   ## Instalação

   1. Clone o repositório
   2. Copie .env.example para .env
   3. Configure as variáveis de ambiente
   4. Execute as migrations
   5. Inicie o servidor

   ## Variáveis de Ambiente
   (documentar cada uma)

   ## Scripts Disponíveis
   - npm run dev
   - npm run build
   - npm run test
   - npm run lint

   ## Estrutura do Projeto
   (árvore de diretórios)

   ## Contribuindo
   (link para CONTRIBUTING.md)

   ## Licença
   ```

2. Adicione badges (build status, coverage, etc)

3. Adicione screenshots/GIFs do sistema
```

---

### PROMPT 41: Criar SECURITY.md

```
Crie documentação de segurança:

1. Crie `SECURITY.md`:
   ```markdown
   # Política de Segurança

   ## Versões Suportadas
   | Versão | Suportada |
   |--------|-----------|
   | 1.x    | ✅        |

   ## Reportando Vulnerabilidades

   Por favor, NÃO abra issues públicas para vulnerabilidades.

   Envie email para: security@atendebem.com

   Inclua:
   - Descrição da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Sugestão de correção (se tiver)

   Responderemos em até 48 horas.

   ## Práticas de Segurança

   ### Autenticação
   - Senhas hasheadas com Argon2id
   - JWT com expiração curta
   - Rate limiting em login
   - Suporte a 2FA

   ### Dados
   - Dados sensíveis encriptados (AES-256-GCM)
   - HTTPS obrigatório
   - Headers de segurança configurados

   ### LGPD
   - Consentimento de pacientes
   - Direito ao esquecimento
   - Exportação de dados
   - Logs de acesso

   ## Atualizações de Segurança

   Acompanhe o repositório para atualizações.
   ```

2. Configure email de segurança ou use GitHub Security Advisories
```

---

### PROMPT 42: Criar Guia de Deploy

```
Crie documentação de deploy:

1. Crie `docs/DEPLOY.md`:
   ```markdown
   # Guia de Deploy

   ## Opção 1: Vercel (Recomendado)

   1. Conecte repositório GitHub
   2. Configure variáveis de ambiente
   3. Deploy automático em push

   ### Variáveis Obrigatórias
   - DATABASE_URL
   - JWT_SECRET
   - ENCRYPTION_KEY

   ## Opção 2: Docker

   ### Dockerfile
   (incluir Dockerfile otimizado)

   ### docker-compose.yml
   (incluir compose com app + postgres + redis)

   ### Comandos
   ```bash
   docker-compose up -d
   docker-compose logs -f app
   ```

   ## Opção 3: VPS Manual

   1. Instalar Node.js 18+
   2. Instalar PostgreSQL
   3. Instalar PM2
   4. Clonar repositório
   5. npm install
   6. npm run build
   7. pm2 start npm --name atendebem -- start

   ## Health Checks

   GET /api/health
   - Retorna 200 se OK
   - Verifica conexão com banco
   - Verifica conexão com Redis

   ## Backup

   ### PostgreSQL
   ```bash
   pg_dump -h host -U user database > backup.sql
   ```

   ### Restore
   ```bash
   psql -h host -U user database < backup.sql
   ```

   ## Monitoramento

   Recomendamos:
   - Sentry para erros
   - Uptime Robot para disponibilidade
   - Grafana para métricas
   ```

2. Crie Dockerfile otimizado para produção

3. Crie docker-compose.yml completo
```

---

## 🟡 UI/UX

---

### PROMPT 43: Implementar Loading States Consistentes

```
Implemente estados de loading consistentes em toda aplicação:

1. Crie componente `components/ui/skeleton.tsx`:
   - Skeleton para cards
   - Skeleton para tabelas
   - Skeleton para formulários
   - Skeleton para listas

2. Crie componente `components/ui/loading-button.tsx`:
   - Botão com spinner interno
   - Desabilita durante loading
   - Mantém largura consistente

3. Atualize páginas com skeleton:
   - Lista de pacientes
   - Dashboard
   - Prontuário
   - Relatórios

4. Crie hook `hooks/useLoadingState.ts`:
   - Gerencia estado de loading
   - Mínimo 300ms para evitar flash
   - Timeout após 30s

5. Adicione loading global:
   - Barra de progresso no topo (NProgress)
   - Mostre durante navegação

6. Instale: `npm install nprogress @types/nprogress`
```

---

### PROMPT 44: Implementar Confirmação em Ações Destrutivas

```
Adicione confirmação antes de ações destrutivas:

1. Crie componente `components/ui/confirm-dialog.tsx`:
   ```tsx
   interface Props {
     title: string
     description: string
     confirmText?: string
     cancelText?: string
     variant?: 'danger' | 'warning'
     onConfirm: () => void
     onCancel: () => void
   }
   ```

2. Crie hook `hooks/useConfirm.ts`:
   ```typescript
   const { confirm, ConfirmDialog } = useConfirm()

   const handleDelete = async () => {
     const confirmed = await confirm({
       title: 'Excluir paciente?',
       description: 'Esta ação não pode ser desfeita.',
       variant: 'danger'
     })

     if (confirmed) {
       await deletePatient(id)
     }
   }
   ```

3. Aplique em:
   - Excluir paciente
   - Excluir atendimento
   - Cancelar agendamento
   - Excluir usuário
   - Logout
   - Ações irreversíveis

4. Use cores apropriadas:
   - Vermelho para exclusões
   - Amarelo para avisos
```

---

### PROMPT 45: Implementar Dark Mode Completo

```
Implemente suporte completo a dark mode:

1. Verifique configuração em `app/layout.tsx`:
   - ThemeProvider do next-themes configurado
   - Classe dark no html

2. Crie `components/theme-toggle.tsx`:
   - Botão para alternar tema
   - Ícones de sol/lua
   - Opção "Sistema"

3. Atualize todas as cores em `tailwind.config.ts`:
   - Use CSS variables para cores
   - Defina cores claras e escuras

4. Revise componentes:
   - Verifique contraste em dark mode
   - Ajuste sombras
   - Ajuste bordas

5. Componentes para verificar:
   - Cards
   - Tabelas
   - Modais
   - Inputs
   - Dropdowns
   - Toasts

6. Teste todos os gráficos (Recharts) em dark mode

7. Persista preferência do usuário:
   - localStorage
   - Sincronize com configuração do SO
```

---

## Resumo de Execução

| Semana | Categoria | Prompts | Prioridade |
|--------|-----------|---------|------------|
| 1 | Segurança & Validação | 1-10 | 🔴 Crítico |
| 2 | Segurança Avançada | 11-17 | 🔴 Crítico |
| 3 | Testes | 18-24 | 🔴 Crítico |
| 4 | Performance | 25-29 | 🟠 Alto |
| 5-6 | Funcionalidades | 30-35 | 🟠 Alto |
| 7 | Acessibilidade | 36-38 | 🟡 Médio |
| 7-8 | Documentação | 39-42 | 🟡 Médio |
| 8 | UI/UX | 43-45 | 🟡 Médio |

---

## Como Usar

1. Copie o prompt desejado
2. Cole no Claude Code
3. Aguarde implementação
4. Revise as alterações
5. Teste manualmente
6. Commit e push
7. Próximo prompt

---

*Documento gerado em 24/12/2025*
