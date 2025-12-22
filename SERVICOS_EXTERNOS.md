# 🔑 GUIA DE CONFIGURAÇÃO - SERVIÇOS EXTERNOS ATENDEBEM

Este documento lista todos os serviços externos que precisam ser configurados com links diretos para obter as credenciais.

---

## ⚠️ REQUER ATENÇÃO

### 1. **Neon PostgreSQL** ✅
- **Status:** Credenciais já no `.env.local`
- **Não precisa fazer nada**

### 2. **Google Gemini AI** ⚠️
- **Link:** https://aistudio.google.com/apikey
- **Status:** Precisa gerar nova chave (a anterior foi exposta e bloqueada)
- **Passos:**
  1. Acesse https://aistudio.google.com/apikey
  2. Clique em "Create API Key"
  3. Copie a chave gerada
  4. Adicione ao `.env.local`:
     \`\`\`
     GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_aqui
     \`\`\`
  5. Reinicie o servidor com `npm run dev`
- **IMPORTANTE:** Nunca commitar chaves API no repositório!

---

## 🔴 PENDENTES - PRECISA CONFIGURAR

### 3. **Upstash Redis** (CRÍTICO - Rate Limiting & Cache)
- **Link:** https://console.upstash.com/
- **Passos:**
  1. Criar conta gratuita
  2. Create Database → Choose Region: US East (mesma região do Neon)
  3. Copiar `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`
- **Variáveis:**
  \`\`\`
  UPSTASH_REDIS_REST_URL=https://YOUR-REDIS.upstash.io
  UPSTASH_REDIS_REST_TOKEN=AXXXXxxx...
  \`\`\`
- **Plano Recomendado:** Free (10k comandos/dia) ou Pay-as-you-go

---

### 4. **AWS S3** (CRÍTICO - Storage de Arquivos)
- **Link:** https://console.aws.amazon.com/s3/
- **Passos:**
  1. Criar conta AWS (cartão necessário, mas Free Tier disponível)
  2. IAM → Create User → Attach policy: `AmazonS3FullAccess`
  3. Security Credentials → Create Access Key
  4. S3 → Create Bucket: `atendebem-production` (ou nome de sua escolha)
- **Variáveis:**
  \`\`\`
  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
  AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  S3_BUCKET=atendebem-production
  S3_CDN_URL= (deixar vazio por ora, depois configurar CloudFront)
  \`\`\`
- **Plano Recomendado:** Free Tier (5GB storage, 20k GET, 2k PUT por mês)

---

### 5. **Encryption Key** (CRÍTICO - PII Data)
- **Não é um serviço externo, apenas gerar chave**
- **Comando:** 
  \`\`\`bash
  openssl rand -hex 32
  \`\`\`
- **Variável:**
  \`\`\`
  ENCRYPTION_KEY=<resultado do comando acima - 64 caracteres hex>
  \`\`\`

---

### 6. **SendGrid** (Email Transacional)
- **Link:** https://app.sendgrid.com/
- **Passos:**
  1. Criar conta gratuita
  2. Settings → API Keys → Create API Key (Full Access)
  3. Sender Authentication → Verify Single Sender (verificar email)
- **Variáveis:**
  \`\`\`
  SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SENDGRID_FROM_EMAIL=contato@seudominio.com.br
  SENDGRID_FROM_NAME=AtendeBem
  \`\`\`
- **Plano Recomendado:** Free (100 emails/dia) ou Essentials ($19.95/mês - 50k emails)

---

### 7. **Twilio** (SMS)
- **Link:** https://www.twilio.com/console
- **Passos:**
  1. Criar conta (trial tem $15 de crédito)
  2. Get a Twilio Phone Number
  3. Account → API Credentials
- **Variáveis:**
  \`\`\`
  TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  TWILIO_PHONE_NUMBER=+5511999999999
  \`\`\`
- **Plano Recomendado:** Pay-as-you-go (~R$0,07/SMS no Brasil)
- **Alternativa Brasil:** Zenvia (https://www.zenvia.com/)

---

### 8. **WhatsApp Business API** (Meta)
- **Link:** https://business.facebook.com/wa/manage/home
- **Passos:**
  1. Criar Meta Business Account
  2. WhatsApp → Add Phone Number
  3. Get Started → Get Permanent Token
  4. Criar templates de mensagem e aguardar aprovação (24-48h)
- **Variáveis:**
  \`\`\`
  WHATSAPP_BUSINESS_PHONE_ID=123456789012345
  WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  WHATSAPP_VERIFY_TOKEN=<escolha-uma-senha-qualquer>
  \`\`\`
- **Plano Recomendado:** Free (1000 conversas/mês), depois ~R$0,30/conversa
- **Alternativa:** Twilio WhatsApp ou Evolution API (self-hosted)

---

### 9. **VIDaaS** (Assinatura Digital ICP-Brasil)
- **Link:** https://www.validcertificadora.com.br/vidaas/
- **Passos:**
  1. Contatar comercial Valid (vendas@validcertificadora.com.br)
  2. Contratar plano corporativo
  3. Receber credenciais de integração
- **Variáveis:**
  \`\`\`
  VIDAAS_CLIENT_ID=<fornecido pela Valid>
  VIDAAS_CLIENT_SECRET=<fornecido pela Valid>
  VIDAAS_REDIRECT_URI=https://seudominio.com.br/api/signature/callback
  VIDAAS_ENVIRONMENT=sandbox (ou production)
  \`\`\`
- **Plano Recomendado:** A partir de R$1.500/mês (100 assinaturas)
- **Alternativa Gratuita (DEV):** Deixar em sandbox por ora

---

### 10. **Daily.co** (Telemedicina/WebRTC)
- **Link:** https://dashboard.daily.co/
- **Passos:**
  1. Criar conta
  2. Developers → API Keys → Create
  3. Rooms → Create Domain (ex: atendebem.daily.co)
- **Variáveis:**
  \`\`\`
  DAILY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  DAILY_DOMAIN=atendebem.daily.co
  \`\`\`
- **Plano Recomendado:** Free (até 10 participantes, 10k minutos/mês) ou Scale ($99/mês)

---

### 11. **Google Calendar API**
- **Link:** https://console.cloud.google.com/apis/credentials
- **Passos:**
  1. Criar projeto no Google Cloud Console
  2. Enable Google Calendar API
  3. Create Credentials → OAuth 2.0 Client ID (Web Application)
  4. Authorized redirect URIs: `http://localhost:3000/api/calendar/callback`
- **Variáveis:**
  \`\`\`
  GOOGLE_CALENDAR_CLIENT_ID=xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
  GOOGLE_CALENDAR_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
  GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/api/calendar/callback
  \`\`\`
- **Plano Recomendado:** Free (Google Workspace ou conta pessoal)

---

### 12. **Stripe** (Pagamentos)
- **Link:** https://dashboard.stripe.com/
- **Passos:**
  1. Criar conta
  2. Developers → API Keys
  3. Configurar webhooks: `https://seudominio.com.br/api/webhooks/stripe`
- **Variáveis:**
  \`\`\`
  STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  \`\`\`
- **Plano Recomendado:** Pay-as-you-go (2,9% + R$0,39 por transação)
- **Alternativa Brasil:** Mercado Pago, PagSeguro, Asaas

---

### 13. **NFe/NFSe** (Nota Fiscal Eletrônica)
- **Link:** https://www.focusnfe.com.br/ (recomendado)
- **Alternativas:** eNotas.com.br, PlugNotas
- **Passos:**
  1. Criar conta
  2. Configurar certificado digital A1
  3. API → Gerar token
- **Variáveis:**
  \`\`\`
  NFE_PROVIDER=focus
  NFE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  NFE_CNPJ=00000000000000
  \`\`\`
- **Plano Recomendado:** A partir de R$49/mês (50 notas)

---

## 📊 RESUMO DE PRIORIDADES

### 🔴 **CRÍTICO (implementar agora)**
1. ✅ Neon PostgreSQL - JÁ CONFIGURADO
2. ⚠️ Google Gemini - **GERAR NOVA CHAVE** (a anterior foi bloqueada)
3. ⚠️ Upstash Redis - **CONFIGURAR AGORA**
4. ⚠️ AWS S3 - **CONFIGURAR AGORA**
5. ⚠️ Encryption Key - **GERAR AGORA** (1 comando)

### 🟡 **IMPORTANTE (próximas semanas)**
6. SendGrid (emails)
7. Twilio (SMS)
8. WhatsApp Business API
9. Stripe (pagamentos)

### 🟢 **OPCIONAL (quando for usar)**
10. VIDaaS (assinatura digital)
11. Daily.co (telemedicina)
12. Google Calendar (sincronização)
13. NFe (notas fiscais)

---

## 💰 CUSTO MENSAL ESTIMADO (início)

| Serviço | Plano Inicial | Custo/Mês |
|---------|---------------|-----------|
| Neon PostgreSQL | Free | R$ 0 |
| Upstash Redis | Free | R$ 0 |
| AWS S3 | Free Tier | R$ 0 (12 meses) |
| SendGrid | Free | R$ 0 (100 emails/dia) |
| Twilio SMS | Pay-as-you-go | ~R$ 50-200 |
| WhatsApp | Free | R$ 0 (1000 conversas/mês) |
| Stripe | Pay-as-you-go | 2,9% das vendas |
| **TOTAL INICIAL** | | **~R$ 50-200/mês** |

Após crescimento (100+ pacientes ativos):
- Upstash Redis: ~R$ 50/mês
- AWS S3: ~R$ 100/mês
- SendGrid: ~R$ 100/mês
- **Total:** ~R$ 500-800/mês

---

## 🚀 PRÓXIMOS PASSOS

1. **Agora:** Configurar Upstash Redis (5 min)
2. **Agora:** Configurar AWS S3 (15 min)
3. **Agora:** Gerar Encryption Key (1 min)
4. **Esta semana:** SendGrid, Twilio, WhatsApp
5. **Quando for lançar:** Stripe, VIDaaS, NFe

**Pronto para começar? Vou rodar as migrações SQL enquanto você configura os 3 serviços críticos!**
