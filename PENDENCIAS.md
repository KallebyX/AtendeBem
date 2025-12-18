# 📋 Pendências - AtendeBem

## ✅ Status Geral: **91% Completo**

### 🎯 O que está 100% pronto (Backend + Frontend)

1. **MOD-FAT** - Financeiro ✅
   - Dashboard completo em [app/financeiro/page.tsx](app/financeiro/page.tsx)
   
2. **MOD-RCB** - Recibos ✅
   - Gerador PDF com jsPDF em [lib/receipt-generator.ts](lib/receipt-generator.ts)
s
3. **MOD-ANM** - Anamnese ✅
   - Wizard 7 passos em [app/anamnese/page.tsx](app/anamnese/page.tsx)

4. **MOD-ODO** - Odontograma ✅
   - Frontend básico implementado

5. **MOD-EST** - Estoque ✅
   - Interface completa em [app/estoque/page.tsx](app/estoque/page.tsx)

6. **MOD-TEL** - Telemedicina ✅
   - Daily.co integrado em [app/telemedicina/page.tsx](app/telemedicina/page.tsx)

7. **MOD-WHA** - WhatsApp ✅
   - UI de conversas em [app/whatsapp/page.tsx](app/whatsapp/page.tsx)

8. **MOD-SMS** - SMS ✅
   - Campanhas em [app/sms/page.tsx](app/sms/page.tsx)

9. **MOD-PRF** - Relatórios ✅
   - Analytics em [app/relatorios/page.tsx](app/relatorios/page.tsx)

10. **MOD-AIA** - Assistente IA ✅
    - Chat + SOAP em [app/assistente/page.tsx](app/assistente/page.tsx)

11. **MOD-CAL** - Calendário ✅
    - Agenda visual em [app/agenda/page.tsx](app/agenda/page.tsx)

12. **MOD-ASS** - Assinatura Digital ✅
    - VIDaaS completo (1235 linhas) em [lib/vidaas.ts](lib/vidaas.ts)

---

## ⚠️ O que precisa de Frontend (Backend 100% pronto)

### 1. **MOD-ORÇ** - Orçamentos 🔨
**Backend completo**: [app/actions/budgets.ts](app/actions/budgets.ts)

**Criar**: `app/orcamentos/page.tsx`

**Funcionalidades necessárias**:
- Form wizard para novo orçamento
- Busca de procedimentos TUSS
- Tabela de itens com quantidade/valor
- Cálculo automático de totais
- Aprovação de orçamento
- Exportação PDF

**Server Actions disponíveis**:
```typescript
createBudget(data) // Cria orçamento com itens
getBudgets(filters) // Lista com filtros
approveBudget(budget_id) // Aprova orçamento
```

---

### 2. **MOD-CON** - Contratos 🔨
**Backend completo**: [app/actions/contracts.ts](app/actions/contracts.ts)

**Criar**: `app/contratos/page.tsx`

**Funcionalidades necessárias**:
- Seletor de templates (3 já seedados)
- Editor de conteúdo (substituição de variáveis)
- Preview do contrato
- Assinatura digital (canvas ou upload)
- Campos de testemunhas
- Listagem de contratos assinados

**Server Actions disponíveis**:
```typescript
createContract(data) // Cria contrato
getContracts(filters) // Lista contratos
getContractTemplates() // Busca templates
signContract(contract_id, signature_data) // Assina
```

**Templates seedados**:
1. Consentimento Informado
2. Plano Tratamento Odontológico
3. Termo Telemedicina

---

### 3. **MOD-LAB** - Laboratório 🔨
**Backend completo**: [app/actions/laboratory.ts](app/actions/laboratory.ts)

**Criar**: `app/laboratorio/page.tsx`

**Funcionalidades necessárias**:
- Novo pedido de exames
- Seleção de template (3 seedados: Hemograma, Checkup, Pré-Op)
- Upload de resultados (PDF)
- Marcação de valores anormais
- Alerta para resultados críticos
- Histórico de pedidos por paciente

**Server Actions disponíveis**:
```typescript
createLabOrder(data) // Cria pedido + exames
getLabOrders(filters) // Lista pedidos
updateExamResult(exam_id, result_data) // Atualiza resultado
getLabTemplates() // Busca templates
```

---

### 4. **MOD-IMG** - Imagens Médicas 🔨
**Backend completo**: [app/actions/medical-images.ts](app/actions/medical-images.ts)

**Criar**: `app/imagens/page.tsx`

**Funcionalidades necessárias**:
- Viewer DICOM (usar **Cornerstone.js** ou **OHIF Viewer**)
- Lista de estudos com filtros (modalidade, data)
- Upload de arquivos DICOM
- Ferramentas de anotação (medição, ROI, setas)
- Editor de laudo radiológico
- Comparação lado-a-lado de estudos

**Server Actions disponíveis**:
```typescript
createMedicalImage(data) // Cria estudo DICOM
getMedicalImages(filters) // Lista estudos
addImageReport(image_id, report_data) // Adiciona laudo
createImageAnnotation(annotation_data) // Cria anotação
```

**Modalidades suportadas**: CR, CT, MR, US, XA, DX

---

### 5. **MOD-GES** - Gestão Clínica 🔨
**Backend completo**: [app/actions/clinic-management.ts](app/actions/clinic-management.ts)

**Criar**: `app/gestao/page.tsx`

**Funcionalidades necessárias**:
- Dashboard multi-clínica
- Cadastro de clínicas/salas
- Mapa de status de salas (disponível/ocupada/limpeza)
- Grade de horários por profissional
- Configuração de turnos e slots
- Visualização de horário de funcionamento

**Server Actions disponíveis**:
```typescript
createClinic(data) // Cadastra clínica
getClinics() // Lista clínicas
createRoom(data) // Cadastra sala
getRoomsByClinic(clinic_id) // Lista salas
updateRoomStatus(room_id, status) // Atualiza status
createStaffSchedule(data) // Define horário
getStaffSchedules(user_id) // Busca horários
```

---

### 6. **MOD-PEP** - Prontuário Eletrônico 🔨
**Backend completo**: [app/actions/emr.ts](app/actions/emr.ts)

**Criar**: `app/prontuario/page.tsx`

**Funcionalidades necessárias**:
- Timeline de atendimentos
- Lista de problemas ativos
- Alergias e medicamentos em uso
- Histórico de vacinas
- Notas clínicas SOAP
- Sinais vitais (gráficos)
- Resumo clínico

**Server Actions disponíveis**:
```typescript
getEMR(patient_id) // Busca prontuário completo
updateEMR(data) // Atualiza dados consolidados
createClinicalNote(data) // Cria nota SOAP
getClinicalNotes(patient_id) // Lista notas
signClinicalNote(note_id) // Assina nota
addProblem(data) // Adiciona problema
getActiveProblems(patient_id) // Lista problemas ativos
```

---

## 🔧 Configurações Externas Pendentes

### 1. Redis (Upstash) ⚠️
**Arquivo**: Não configurado  
**Necessário para**: Cache, rate limiting, sessões  

**Como configurar**:
1. Criar conta em https://console.upstash.com
2. Criar database Redis
3. Copiar credenciais para `.env.local`:
   ```bash
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxx
   ```

**Impacto**: Baixo - código funciona sem Redis (degrada gracefully)

---

### 2. AWS S3 ⚠️
**Arquivo**: [lib/s3.ts](lib/s3.ts) (código pronto)  
**Necessário para**: Upload de arquivos (imagens, PDFs, DICOMs)

**Como configurar**:
1. Criar bucket S3 no AWS Console
2. Criar IAM user com permissões S3
3. Gerar access keys
4. Adicionar a `.env.local`:
   ```bash
   AWS_ACCESS_KEY_ID=AKIAXXXXXXXX
   AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxx
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=atendebem-production
   ```

**Impacto**: Médio - necessário para uploads de imagens/PDFs

---

### 3. API Brasil (NFe/NFSe) ⚠️
**Arquivo**: [app/actions/nfe.ts](app/actions/nfe.ts) (integração pronta)  
**Necessário para**: Emissão de Notas Fiscais

**Como configurar**:
1. Criar conta em https://apibrasil.io
2. Contratar plano NFe/NFSe
3. Obter token de API
4. Adicionar a `.env.local`:
   ```bash
   API_BRASIL_TOKEN=xxxxxxxxxxxxxxxxx
   ```

**Impacto**: Baixo - opcional para quem não emite notas fiscais

---

### 4. VIDaaS (Assinatura Digital) ⚠️
**Arquivo**: [lib/vidaas.ts](lib/vidaas.ts) (1235 linhas completas)  
**Necessário para**: Assinatura digital ICP-Brasil

**Como configurar**:
1. Registrar aplicação em https://valid.com.br
2. Obter Client ID e Client Secret
3. Adicionar a `.env.local`:
   ```bash
   VIDAAS_CLIENT_ID=xxxxxxxx
   VIDAAS_CLIENT_SECRET=xxxxxxxxxxxxxxxx
   VIDAAS_PRODUCTION=false  # true para produção
   ```

**Impacto**: Médio - necessário para assinatura de documentos legais

---

### 5. Daily.co (Telemedicina) ⚠️
**Arquivo**: [lib/daily.ts](lib/daily.ts) (código pronto)  
**Já usado em**: [app/telemedicina/page.tsx](app/telemedicina/page.tsx)

**Como configurar**:
1. Criar conta em https://daily.co
2. Obter API key
3. Adicionar a `.env.local`:
   ```bash
   DAILY_API_KEY=xxxxxxxxxxxxxxxx
   ```

**Impacto**: Médio - necessário para criar salas de vídeo

---

## 📊 Checklist de Prioridades

### 🔥 Alta Prioridade (Próxima Semana)
- [ ] Frontend MOD-ORÇ (Orçamentos) - **2-3 horas**
- [ ] Frontend MOD-CON (Contratos) - **3-4 horas**
- [ ] Frontend MOD-LAB (Laboratório) - **3-4 horas**
- [ ] Configurar Redis (Upstash) - **15 minutos**
- [ ] Configurar AWS S3 - **30 minutos**

### 🟡 Média Prioridade (Próximas 2 Semanas)
- [ ] Frontend MOD-IMG (Imagens DICOM) - **8-10 horas** (complexo, requer Cornerstone.js)
- [ ] Frontend MOD-GES (Gestão Clínica) - **4-5 horas**
- [ ] Frontend MOD-PEP (Prontuário) - **6-8 horas** (complexo, muitos dados)
- [ ] Configurar Daily.co - **15 minutos**
- [ ] Configurar VIDaaS - **30 minutos**

### 🟢 Baixa Prioridade (Opcional)
- [ ] Configurar API Brasil (NFe) - **30 minutos**
- [ ] Testes E2E com Playwright - **1-2 dias**
- [ ] Documentação de usuário - **2-3 dias**
- [ ] Deploy em produção (Vercel) - **1 dia**

---

## 📝 Notas Técnicas

### Bibliotecas Recomendadas para Frontends Pendentes

**MOD-IMG (DICOM Viewer)**:
```bash
npm install cornerstone-core cornerstone-tools dicom-parser
# OU usar OHIF Viewer (mais completo)
npm install @ohif/viewer
```

**MOD-GES (Schedule/Calendar)**:
```bash
npm install @fullcalendar/react @fullcalendar/daygrid
# OU
npm install react-big-calendar
```

**MOD-ORÇ/CON (PDF Preview)**:
```bash
npm install react-pdf
# Ou usar jsPDF já instalado
```

---

## 🚀 Estimativa de Tempo Total

| Tarefa | Tempo Estimado |
|--------|----------------|
| 6 Frontends pendentes | 25-35 horas |
| Configurações externas | 2-3 horas |
| Testes básicos | 4-6 horas |
| **TOTAL** | **31-44 horas** (~1 semana de trabalho) |

---

## ✅ O que NÃO precisa fazer

- ❌ Criar mais tabelas SQL (45+ já criadas)
- ❌ Implementar Server Actions (25+ já completos)
- ❌ Integrar bibliotecas médicas (TUSS, CID-10, Medicamentos já carregados)
- ❌ Configurar autenticação (JWT + Argon2id pronto)
- ❌ Implementar RLS (já em todas as tabelas)
- ❌ Criar templates (15 já seedados)

---

## 🎯 Roadmap Sugerido

### Semana 1
- Segunda: Frontend Orçamentos + Contratos
- Terça: Frontend Laboratório
- Quarta: Configurar serviços externos (Redis, S3, Daily.co)
- Quinta: Frontend Gestão Clínica
- Sexta: Testes e correções

### Semana 2
- Segunda-Terça: Frontend Prontuário Eletrônico
- Quarta-Sexta: Frontend DICOM Viewer (complexo)

### Semana 3
- Testes E2E
- Documentação
- Preparação para deploy

---

**Última atualização**: 18 de dezembro de 2025  
**Status geral**: 91% completo (22/22 módulos backend, 12/18 frontends)
