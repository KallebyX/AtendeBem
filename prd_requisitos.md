# Requisitos Funcionais - PRD AtendeBem 2.0

## Escopo MVP (Fase 1: Meses 1-4)

### INCLUSO
- Autenticação segura (CRM + CPF)
- Dashboard intuitivo
- Criador de atendimentos (fluxo visual 7 passos)
- Gerador automático de registros TUSS
- Histórico e busca
- Exportação (PDF, CSV, XML)
- Assistente IA (Gemini) básico

### FORA DO ESCOPO MVP
- Integração com EMR/ERP
- Faturamento direto
- Assinatura digital de documentos
- Agendamento de pacientes
- Telemedicina
- Diagnóstico clínico automatizado

## Fluxo de Atendimentos (7 Passos)

### Passo 1 - Informações do Paciente
- Nome, CPF, Data de Nascimento
- Gênero, Telefone
- Histórico (auto-carregamento se existe)

### Passo 2 - Motivo da Consulta
- Queixa principal (texto livre)
- IA sumariza em 1-2 linhas
- Categorização automática (CID)

### Passo 3 - Procedimentos Realizados
- Busca em TUSS (2.500+ procedimentos)
- Search inteligente por descrição
- Sugestões baseadas em histórico
- Favoritos personalizados
- Adicionar múltiplos procedimentos
- Quantidade e valor cada um
- Validação em tempo real

### Passo 4 - Diagnóstico (CID)
- CID primário (obrigatório)
- CIDs secundários (opcional)
- Descrição clínica (texto livre)
- Validação de compatibilidade

### Passo 5 - Observações Clínicas
- Achados do exame
- Alergias/Contraindicações
- Plano de ação
- Prescrições (se necessário)

### Passo 6 - Dados Administrativos
- Tipo de atendimento: Particular, Convênio, Gratuidade/SUS
- Se convênio: Selecionar convênio, Nº autorização, Valor
- Valor total atendimento
- Data/hora atendimento

### Passo 7 - Revisar & Salvar
- Resumo visual de tudo
- Botões "Editar" para cada seção
- Validação final
- "Salvar" ou "Salvar & Exportar"

## RF03: Gerar Registro Automaticamente
- Objeto JSON estruturado (compatível ANS/TUSS)
- Campos: Data, CRM+CPF médico, CPF paciente, Códigos TUSS, CID, Valor, Assinatura eletrônica (hash)
- Validação de consistência
- Armazenamento em banco de dados

## RF04: Consultar Histórico
- Listar últimos 20 atendimentos
- Buscar por paciente (nome ou CPF)
- Filtrar por data
- Filtrar por procedimento/CID
- Visualizar detalhe do atendimento
- Editar atendimento
- Duplicar (reutilizar template)
- Compartilhar com secretária (link único válido 30 dias)

## RF05: Exportar Registros

### UC-05.1: Exportar atendimento único (PDF)
- Logo AtendeBem + Header com data
- Dados médico (nome, CRM)
- Dados paciente (anonimizado parcial: nome + CPF ****)
- Procedimentos com valores
- Diagnóstico (CID)
- Observações clínicas
- Assinatura eletrônica (QR code verificável)
- Timestamp de geração

### UC-05.2: Exportar período (CSV)
- Picker: Data início + Data fim
- Colunas: Data, CRM, CPF Paciente, Nome Paciente, Código TUSS, Descrição, Qty, Valor Unit, Total, CID Primário, CID Secundários, Status, Hash

### UC-05.3: Exportar período (XML TUSS)
- Sistema gera XML conforme padrão ANS
- Root: <atendimentos>
- Cada atendimento: <atendimento>
- Estrutura compatível com sistemas de faturamento
- Validação de schema (XSD)

### UC-05.4: Agendar exportação automática
- Opções: Diariamente, Semanalmente, Mensalmente
- Formato: PDF / CSV / XML
- Entrega: E-mail + Download link (válido 30 dias)

## RF06: Assistente IA (Gemini)
- Responde dúvidas sobre TUSS em português
- Sugere procedimentos baseado em caso
- Valida conformidade regulatória
- Detecta inconsistências
- Oferece sugestões de melhoria

## Requisitos Não-Funcionais
- Tempo de resposta busca TUSS: < 300ms
- Validação em tempo real (debounce 500ms)
- Auto-save draft a cada mudança
- Limite: Um atendimento em progresso por vez
- Timeout: 30 min de inatividade = auto-salva e loga out
- Tempo geração PDF: < 2 seg
- Tempo geração CSV/XML: < 5 seg (até 1000 registros)
- Arquivos: Criptografados em link (AES-256)
- Retenção link: 30 dias (auto-delete após)
