# Configuracao da API do Google Gemini

O AtendeBem utiliza o Google Gemini para funcionalidades de IA como assistente virtual e geracao de notas SOAP.

## Passo a passo para configurar:

### 1. Obter a chave de API

1. Acesse: https://aistudio.google.com/apikey
2. Faca login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### 2. Configurar no projeto

Crie o arquivo `.env.local` na raiz do projeto (se nao existir) e adicione:

\`\`\`bash
GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_aqui
\`\`\`

**Nota:** O sistema aceita qualquer uma destas variaveis:
- `GOOGLE_GENERATIVE_AI_API_KEY` (recomendado)
- `GOOGLE_AI_API_KEY`
- `GEMINI_API_KEY`

### 3. Reiniciar o servidor

\`\`\`bash
npm run dev
\`\`\`

## Funcionalidades que dependem da API

- Assistente IA (`/assistente`) - Chat inteligente para profissionais de saude
- Gerador SOAP automatico - Criacao de notas clinicas estruturadas
- Chat medico - Auxilio com codigos TUSS e CID-10

## Modo offline

Se a API nao estiver configurada, o sistema funciona em modo offline com respostas pre-definidas para:
- Templates SOAP
- Codigos TUSS e CID-10
- Instrucoes do sistema

## Solucao de problemas

### Erro 401/403 (Chave invalida)
- Verifique se a chave foi copiada corretamente
- Gere uma nova chave em https://aistudio.google.com/apikey
- A chave pode ter sido bloqueada por vazamento

### Erro 429 (Limite excedido)
- Aguarde alguns minutos e tente novamente
- Considere usar uma conta com cota maior

## Seguranca

**NUNCA compartilhe sua API key em repositorios publicos!**

- Use sempre `.env.local` (esta no `.gitignore`)
- Nao commite arquivos `.env` com chaves reais
- Rotacione chaves periodicamente
