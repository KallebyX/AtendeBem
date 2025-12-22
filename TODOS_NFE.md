# Plano de Implementação - Sistema de NFE/NFSe Completo

## Visão Geral

Implementação completa do sistema de Nota Fiscal Eletrônica (NFE) e Nota Fiscal de Serviços Eletrônica (NFSe) seguindo todas as normas contábeis e fiscais brasileiras.

## Status Atual (Atualizado: 22/12/2024)
- Tabelas de banco de dados: ✅ Completas (nfe_invoices, nfe_configuration, nfe_services, nfe_email_logs)
- Actions completas: ✅ Implementadas (CRUD, envio, cancelamento, download)
- Interface de usuário: ✅ Completa (Dashboard, emissão, detalhes, configuração)
- Geração de XML: ✅ Implementado (NFe e NFSe)
- Calculadora de impostos: ✅ Implementada (ISS, PIS, COFINS, Simples Nacional)
- DANFE/PDF: ✅ Implementado (NFe e NFSe)
- Email para contabilista: ✅ Configurado (templates, envio automático)
- Catálogo de serviços: ✅ Implementado (LC 116, CNAE)
- Integração SEFAZ: ⚠️ Simulada (pronto para produção com API Brasil)

---

## FASE 1: CONFIGURAÇÃO DA EMPRESA (Cadastro Fiscal Completo)

### 1.1 Página de Configuração de Empresa
- [ ] Criar página `/app/nfe/configuracao/page.tsx`
- [ ] Formulário completo de dados da empresa:
  - [ ] Razão Social
  - [ ] Nome Fantasia
  - [ ] CNPJ (com validação)
  - [ ] Inscrição Estadual (IE)
  - [ ] Inscrição Municipal (IM)
  - [ ] CNAE Principal e Secundários
  - [ ] Regime Tributário (Simples Nacional, Lucro Presumido, Lucro Real)
  - [ ] CRT (Código de Regime Tributário)
  - [ ] Optante Simples Nacional
  - [ ] Optante MEI (se aplicável)

### 1.2 Endereço Completo
- [ ] Logradouro, Número, Complemento
- [ ] Bairro, Cidade, UF
- [ ] CEP (com busca automática)
- [ ] Código IBGE do Município (obrigatório para NFe)
- [ ] Telefone, Email

### 1.3 Certificado Digital A1
- [ ] Upload do certificado .pfx
- [ ] Campo para senha do certificado (criptografada)
- [ ] Validação da data de expiração
- [ ] Indicador visual de certificado válido/expirado

### 1.4 Configurações de NFE
- [ ] Série padrão
- [ ] Próximo número
- [ ] Ambiente (Homologação/Produção)
- [ ] CSC e ID do CSC (para NFC-e)
- [ ] Habilitar envio automático para SEFAZ

### 1.5 Configurações de NFSe
- [ ] Série RPS
- [ ] Próximo número RPS
- [ ] Código do Município
- [ ] Código do Prestador
- [ ] Provedor NFSe (varia por cidade)

### 1.6 Configurações de Email do Contabilista
- [ ] Email do contador/contabilista
- [ ] Nome do contador
- [ ] Enviar cópia de todas as notas
- [ ] Formato preferido (XML + DANFE PDF)
- [ ] Frequência (imediato/diário/semanal)

---

## FASE 2: CADASTRO DE CLIENTES PARA NFE

### 2.1 Atualizar Cadastro de Pacientes
- [ ] Adicionar campos fiscais em `/app/pacientes/`:
  - [ ] CPF/CNPJ (validação completa)
  - [ ] Inscrição Estadual (para PJ)
  - [ ] Endereço completo com CEP
  - [ ] Código IBGE do Município
  - [ ] Indicador IE Destinatário

### 2.2 Validações Fiscais
- [ ] Validação de CPF com dígitos verificadores
- [ ] Validação de CNPJ com dígitos verificadores
- [ ] Consulta CNPJ na Receita Federal (opcional)
- [ ] Busca de endereço por CEP (ViaCEP API)

---

## FASE 3: CADASTRO DE SERVIÇOS/PRODUTOS

### 3.1 Catálogo de Serviços
- [ ] Criar página `/app/nfe/servicos/page.tsx`
- [ ] Tabela de serviços no banco de dados
- [ ] Campos obrigatórios:
  - [ ] Código do serviço
  - [ ] Descrição do serviço
  - [ ] Código LC 116 (Lista de Serviços)
  - [ ] CNAE relacionado
  - [ ] Alíquota ISS padrão
  - [ ] Tributação municipal
  - [ ] Valor padrão

### 3.2 Códigos Fiscais
- [ ] Implementar busca de código LC 116
- [ ] CFOP (Código Fiscal de Operações)
- [ ] NCM (para produtos, se aplicável)
- [ ] CEST (se aplicável)

---

## FASE 4: GERAÇÃO DE XML VÁLIDO

### 4.1 Estrutura XML NFe (Modelo 55)
- [ ] Criar lib `/lib/nfe-xml-generator.ts`
- [ ] Implementar estrutura completa:
  - [ ] infNFe (identificação)
  - [ ] ide (dados da NFe)
  - [ ] emit (emitente)
  - [ ] dest (destinatário)
  - [ ] det (detalhamento produtos/serviços)
  - [ ] total (totais da NFe)
  - [ ] transp (transporte)
  - [ ] cobr (cobrança)
  - [ ] pag (pagamento)
  - [ ] infAdic (informações adicionais)

### 4.2 Estrutura XML NFSe (ABRASF 2.04)
- [ ] Criar lib `/lib/nfse-xml-generator.ts`
- [ ] Implementar estrutura padrão ABRASF:
  - [ ] IdentificacaoRps
  - [ ] Prestador
  - [ ] Tomador
  - [ ] Servico
  - [ ] ValoresNfse
  - [ ] Valores (tributação)

### 4.3 Cálculos Tributários Automáticos
- [ ] Implementar `/lib/tax-calculator.ts`:
  - [ ] ISS (2% a 5% conforme município)
  - [ ] PIS (0,65% ou 1,65%)
  - [ ] COFINS (3% ou 7,6%)
  - [ ] CSLL (quando aplicável)
  - [ ] IRRF (quando aplicável)
  - [ ] INSS (quando aplicável)
  - [ ] Simples Nacional (alíquotas por faixa)

### 4.4 Assinatura Digital XML
- [ ] Implementar assinatura com certificado A1
- [ ] Canonicalização XML (C14N)
- [ ] SHA-256 para hash
- [ ] RSA para assinatura
- [ ] Embedding do certificado no XML

---

## FASE 5: INTEGRAÇÃO SEFAZ/PREFEITURAS

### 5.1 WebServices SEFAZ (NFe)
- [ ] Criar `/lib/sefaz-integration.ts`
- [ ] Implementar endpoints:
  - [ ] NfeAutorizacao (envio da nota)
  - [ ] NfeConsultaProtocolo (consulta situação)
  - [ ] NfeCancelamento (cancelamento)
  - [ ] NfeInutilizacao (inutilização)
  - [ ] NfeStatusServico (verificar SEFAZ)

### 5.2 WebServices NFSe (Por Município)
- [ ] Criar `/lib/nfse-providers/`:
  - [ ] São Paulo (NFSe SP)
  - [ ] Rio de Janeiro (Nota Carioca)
  - [ ] Belo Horizonte (BH-ISS)
  - [ ] Curitiba (ISS Curitiba)
  - [ ] Porto Alegre (NFSe POA)
  - [ ] Salvador (NFSe Salvador)
  - [ ] Brasília (NFe-DF)
  - [ ] Padrão ABRASF (genérico)

### 5.3 Tratamento de Erros SEFAZ
- [ ] Parser de erros da SEFAZ
- [ ] Exibição amigável de rejeições
- [ ] Sugestões de correção
- [ ] Log de todas as comunicações

---

## FASE 6: DANFE/PDF

### 6.1 DANFE NFe
- [ ] Criar `/lib/danfe-generator.ts`
- [ ] Layout padrão DANFE (retrato A4)
- [ ] Código de barras/QR Code
- [ ] Chave de acesso
- [ ] Todos os campos obrigatórios

### 6.2 DANFE NFSe
- [ ] Layout padrão municipal
- [ ] Número da nota
- [ ] Código de verificação
- [ ] QR Code de validação

### 6.3 Armazenamento
- [ ] Salvar PDF no servidor
- [ ] URL pública para download
- [ ] Período de retenção (5 anos conforme legislação)

---

## FASE 7: ENVIO POR EMAIL

### 7.1 Email para Cliente
- [ ] Template de email com DANFE anexo
- [ ] XML da nota anexo
- [ ] Informações da nota no corpo

### 7.2 Email para Contabilista
- [ ] Template específico para contador
- [ ] XML assinado em anexo
- [ ] DANFE em anexo
- [ ] Relatório mensal (opcional)

### 7.3 Configurações de Envio
- [ ] Definir remetente personalizado
- [ ] CC para outros emails
- [ ] Retry em caso de falha
- [ ] Log de envios

---

## FASE 8: INTERFACE DE USUÁRIO COMPLETA

### 8.1 Dashboard de NFE
- [ ] Atualizar `/app/nfe/page.tsx`:
  - [ ] Cards de resumo (emitidas, pendentes, canceladas)
  - [ ] Gráfico de emissão mensal
  - [ ] Filtros avançados
  - [ ] Busca por número/cliente

### 8.2 Modal de Emissão de Nota
- [ ] Criar componente completo:
  - [ ] Seleção de cliente (busca)
  - [ ] Adição de serviços/produtos
  - [ ] Cálculo automático de impostos
  - [ ] Preview antes de enviar
  - [ ] Botão de envio para SEFAZ

### 8.3 Visualização de Nota
- [ ] Modal de detalhes da nota
- [ ] Status em tempo real
- [ ] Botões de ação (cancelar, reenviar, download)
- [ ] Histórico de eventos

### 8.4 Relatórios Fiscais
- [ ] Livro de Registro de Serviços
- [ ] Relatório de ISS
- [ ] Relatório de Faturamento
- [ ] Exportação para SPED (se aplicável)

---

## FASE 9: TESTES E VALIDAÇÃO

### 9.1 Ambiente de Homologação
- [ ] Configurar ambiente de testes SEFAZ
- [ ] Testar emissão em homologação
- [ ] Validar XML com ferramentas oficiais

### 9.2 Validações
- [ ] Validar estrutura XML com XSD oficial
- [ ] Testar todos os cenários de erro
- [ ] Validar cálculos tributários
- [ ] Testar cancelamento

---

## FASE 10: DOCUMENTAÇÃO

### 10.1 Guia do Usuário
- [ ] Passo a passo de configuração
- [ ] Como emitir nota
- [ ] Como cancelar nota
- [ ] Troubleshooting comum

### 10.2 Documentação Técnica
- [ ] Estrutura do XML
- [ ] APIs disponíveis
- [ ] Códigos de erro

---

## ORDEM DE IMPLEMENTAÇÃO

1. **FASE 1** - Configuração da Empresa (Crítico - sem isso nada funciona)
2. **FASE 2** - Cadastro de Clientes (Necessário para emissão)
3. **FASE 3** - Cadastro de Serviços (Catálogo de itens)
4. **FASE 4** - Geração de XML (Core do sistema)
5. **FASE 5** - Integração SEFAZ (Homologação primeiro)
6. **FASE 6** - DANFE/PDF (Visualização)
7. **FASE 7** - Envio por Email (Automação)
8. **FASE 8** - Interface Completa (UX)
9. **FASE 9** - Testes (Validação)
10. **FASE 10** - Documentação (Suporte)

---

## DEPENDÊNCIAS TÉCNICAS

### Bibliotecas Necessárias
```bash
npm install xml2js xml-crypto xml-encryption node-forge fast-xml-parser pdfkit
```

### Variáveis de Ambiente
```env
# SEFAZ
SEFAZ_ENVIRONMENT=homologation|production
SEFAZ_UF=SP|RJ|MG|...

# Certificado
NFE_CERTIFICATE_PATH=/path/to/cert.pfx
NFE_CERTIFICATE_PASSWORD=encrypted_password

# Email Contabilista
ACCOUNTANT_EMAIL=contador@escritorio.com.br
ACCOUNTANT_NAME=Nome do Contador

# API Brasil (alternativa)
API_BRASIL_TOKEN=token
API_BRASIL_ENDPOINT=https://api.apibrasil.io/nfe
```

---

## REFERÊNCIAS TÉCNICAS

- **Manual NFe 4.0**: http://www.nfe.fazenda.gov.br/portal/principal.aspx
- **ABRASF NFSe**: http://www.abrasf.org.br/
- **Lista LC 116**: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm
- **Códigos IBGE**: https://www.ibge.gov.br/explica/codigos-dos-municipios.php
- **Tabela CFOP**: https://portaltributario.com.br/tributario/cfop.htm

---

## ESTIMATIVA DE ARQUIVOS

| Arquivo | Descrição |
|---------|-----------|
| `/app/nfe/configuracao/page.tsx` | Página de configuração da empresa |
| `/app/nfe/servicos/page.tsx` | Catálogo de serviços |
| `/app/nfe/page.tsx` | Dashboard principal (atualizado) |
| `/app/nfe/emitir/page.tsx` | Página de emissão de nota |
| `/app/actions/nfe.ts` | Actions do servidor (atualizado) |
| `/lib/nfe-xml-generator.ts` | Gerador de XML NFe |
| `/lib/nfse-xml-generator.ts` | Gerador de XML NFSe |
| `/lib/tax-calculator.ts` | Calculadora de impostos |
| `/lib/sefaz-integration.ts` | Integração SEFAZ |
| `/lib/danfe-generator.ts` | Gerador de DANFE PDF |
| `/lib/nfse-providers/*.ts` | Provedores NFSe por cidade |
| `/scripts/nfe-services-table.sql` | Tabela de serviços |
| `/components/nfe/*.tsx` | Componentes de UI |

---

**Última Atualização**: 22/12/2024
**Responsável**: Sistema AtendeBem
**Versão**: 1.0
