# ⚠️ IMPORTANTE: Gere uma nova API Key do Gemini

A API Key anterior foi detectada como vazada pelo Google e foi bloqueada.

## Como obter nova API Key:

1. Acesse: https://aistudio.google.com/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

5. Adicione ao arquivo `.env.local`:
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=sua_nova_chave_aqui
   ```

6. Reinicie o servidor: `npm run dev`

## Funcionalidades que dependem da API:
- 🤖 Assistente IA (`/assistente`)
- 📋 Gerador SOAP automático
- 💬 Chat médico inteligente

---

**NUNCA compartilhe sua API key em repositórios públicos!**
