/**
 * Worker Script para Job Queue
 * Executa em processo separado para processar jobs assíncronos
 * 
 * Uso: node lib/worker.js
 * ou: npm run worker
 */

import { startEmailWorker, startSMSWorker, startWhatsAppWorker, setupQueueEvents } from "./queue"

console.log("🚀 Iniciando workers AtendeBem...")

// Iniciar workers
const emailWorker = startEmailWorker()
const smsWorker = startSMSWorker()
const whatsappWorker = startWhatsAppWorker()
const queueEvents = setupQueueEvents()

if (!emailWorker && !smsWorker && !whatsappWorker) {
  console.error("❌ Nenhum worker pôde ser iniciado. Verifique configuração do Redis.")
  process.exit(1)
}

console.log("✅ Workers iniciados com sucesso!")
if (emailWorker) console.log("  📧 Email Worker: ON")
if (smsWorker) console.log("  📱 SMS Worker: ON")
if (whatsappWorker) console.log("  💬 WhatsApp Worker: ON")

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n⏸️  Encerrando workers...")

  if (emailWorker) await emailWorker.close()
  if (smsWorker) await smsWorker.close()
  if (whatsappWorker) await whatsappWorker.close()
  if (queueEvents) await queueEvents.close()

  console.log("✅ Workers encerrados.")
  process.exit(0)
})

// Keep alive
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error)
})

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason)
})
