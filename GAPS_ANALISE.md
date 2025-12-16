# Análise de Gaps - AtendeBem

## Resumo Executivo

Após auditoria completa do código-fonte, foram identificados diversos gaps entre o estado atual da implementação e os requisitos do PRD 2.0. Este documento detalha cada gap, sua prioridade e a solução proposta.

---

## 1. Assinatura Digital ICP-Brasil (CRÍTICO)

### Estado Atual
A implementação atual usa uma **simulação mock** de assinatura digital. O código em `app/receitas/assinar/[id]/page.tsx` (linhas 54-64) apenas simula o processo com dados fictícios.

### Gap Identificado
Não há integração real com provedores de certificado digital em nuvem ICP-Brasil. O sistema precisa integrar com APIs como:
- **VIDaaS** (Valid)
- **BirdID** (Soluti)
- **RemoteID** (Certisign)
- **SafeID** (Safeweb)

### Solução Proposta
Implementar integração com API de assinatura digital em nuvem, permitindo:
- Autenticação OAuth2 com o provedor
- Assinatura de documentos PDF com certificado A3 em nuvem
- Verificação de validade do certificado
- Geração de carimbo de tempo (timestamp)

---

## 2. Exportações (ALTO)

### Estado Atual
O arquivo `app/actions/export.tsx` contém funções básicas de exportação, mas:
- Exportação PDF gera apenas HTML para impressão
- Não há exportação CSV real
- Não há exportação XML TUSS conforme padrão ANS

### Gap Identificado
Falta implementação completa de:
- PDF com layout profissional e QR Code de validação
- CSV com todos os campos do atendimento
- XML no padrão TISS/TUSS da ANS
- Agendamento de exportações automáticas

### Solução Proposta
- Usar biblioteca `jspdf` ou `@react-pdf/renderer` para PDFs
- Implementar geração CSV com `papaparse`
- Criar schema XML conforme especificação ANS
- Adicionar cron jobs para exportações agendadas

---

## 3. Fluxo de Atendimentos (ALTO)

### Estado Atual
A página `app/atendimento/novo/page.tsx` existe mas não implementa o fluxo completo de 7 passos definido no PRD.

### Gap Identificado
- Falta wizard visual de 7 passos
- Busca TUSS não está integrada com a nova base expandida
- Busca CID não usa autocomplete inteligente
- Não há validação de compatibilidade CID x Procedimento
- Falta auto-save de rascunhos
- Não há sugestões baseadas em histórico

### Solução Proposta
- Implementar componente de stepper/wizard
- Integrar busca com as bases TUSS (4.901) e CID (9.818)
- Adicionar debounce de 500ms na busca
- Implementar validação em tempo real
- Salvar drafts automaticamente

---

## 4. CRM de Pacientes (MÉDIO)

### Estado Atual
O módulo CRM existe em `app/crm/` com funcionalidades básicas de cadastro e listagem.

### Gap Identificado
- Falta busca avançada por múltiplos critérios
- Timeline de atendimentos incompleta
- Não há alertas de retorno
- Falta integração com agenda
- Histórico médico não está bem estruturado

### Solução Proposta
- Implementar filtros avançados na listagem
- Criar componente de timeline visual
- Adicionar sistema de lembretes
- Melhorar visualização do prontuário

---

## 5. Dashboard e Métricas (MÉDIO)

### Estado Atual
Dashboard básico em `app/dashboard/page.tsx` com estatísticas simples.

### Gap Identificado
- Falta gráficos de evolução
- Não há métricas de faturamento
- Falta comparativo mensal
- Não há alertas de pendências

### Solução Proposta
- Integrar Recharts para gráficos
- Implementar cards de métricas financeiras
- Adicionar notificações de pendências

---

## 6. API de Pacientes (MÉDIO)

### Estado Atual
Não existe rota API `/api/patients` que é chamada em `app/receitas/nova/page.tsx` (linha 135).

### Gap Identificado
A página de nova receita tenta buscar pacientes via API REST mas a rota não existe.

### Solução Proposta
Criar rota API em `app/api/patients/route.ts` que retorna lista de pacientes do usuário.

---

## 7. Validação de Receitas (BAIXO)

### Estado Atual
Existe página de validação em `app/validar/[token]/page.tsx` mas não está completa.

### Gap Identificado
- Falta verificação de assinatura digital
- QR Code não é gerado no PDF
- Não há verificação de validade do certificado

### Solução Proposta
- Implementar verificação criptográfica
- Gerar QR Code com URL de validação
- Mostrar detalhes do certificado usado

---

## 8. Assistente IA (BAIXO)

### Estado Atual
Página do assistente existe em `app/assistente/page.tsx` mas usa mock.

### Gap Identificado
- Não há integração real com Gemini API
- Falta contexto médico nas respostas
- Não há sugestões de procedimentos

### Solução Proposta
- Integrar Google Gemini API
- Criar prompts especializados para área médica
- Implementar sugestões contextuais

---

## Priorização de Implementação

| Prioridade | Gap | Esforço | Impacto |
|------------|-----|---------|---------|
| 1 | API de Pacientes | Baixo | Alto |
| 2 | Fluxo de Atendimentos | Alto | Alto |
| 3 | Exportações PDF/CSV | Médio | Alto |
| 4 | Assinatura Digital Real | Alto | Crítico |
| 5 | CRM Melhorias | Médio | Médio |
| 6 | Dashboard Métricas | Médio | Médio |
| 7 | Validação de Receitas | Baixo | Médio |
| 8 | Assistente IA | Alto | Baixo |

---

## Próximos Passos

1. **Fase 1 (Imediato):** Criar API de pacientes para corrigir erro crítico
2. **Fase 2 (Curto prazo):** Implementar fluxo completo de atendimentos
3. **Fase 3 (Curto prazo):** Melhorar exportações
4. **Fase 4 (Médio prazo):** Integrar assinatura digital real
5. **Fase 5 (Médio prazo):** Melhorias no CRM e Dashboard
