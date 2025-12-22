#!/usr/bin/env node
/**
 * Script para rodar migração de tabelas adicionais no Neon
 * Uso: node scripts/run-additional-tables.ts
 * ou: tsx scripts/run-additional-tables.ts
 */

// @ts-nocheck
import { Pool } from "@neondatabase/serverless"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL não configurada")
    process.exit(1)
  }

  console.log("🔄 Conectando ao Neon via Pool...")
  const pool = new Pool({ connectionString: databaseUrl })

  const fixedMigrationPath = join(process.cwd(), "scripts", "01-additional-tables-fixed.sql")
  const originalMigrationPath = join(process.cwd(), "scripts", "01-additional-tables.sql")

  const migrationPath = existsSync(fixedMigrationPath) ? fixedMigrationPath : originalMigrationPath
  console.log(`📄 Lendo migração: ${migrationPath}`)

  const migrationSQL = readFileSync(migrationPath, "utf-8")

  console.log(`📊 Executando migração de tabelas adicionais...\n`)

  try {
    await pool.query(migrationSQL)
    console.log("✅ Migração executada com sucesso!")
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`❌ ERRO: ${errorMessage}`)
    console.error("\nDetalhes:", error)

    // Alguns erros são aceitáveis (já existe)
    if (errorMessage.includes("already exists") || errorMessage.includes("duplicate")) {
      console.log("\n⚠️  Erro esperado (recurso já existe), continuando...\n")
    } else {
      process.exit(1)
    }
  }

  console.log("\n🔍 Verificando novas tabelas criadas...")

  const tablesToCheck = [
    "contracts",
    "medical_images",
    "odontograms",
    "biometric_templates",
    "whatsapp_conversations",
    "inventory_items",
    "anamnesis",
    "budgets",
    "tiss_guides",
    "telemedicine_sessions",
    "crm_leads",
    "nfe_invoices",
  ]

  for (const table of tablesToCheck) {
    try {
      const result = await pool.query(`SELECT COUNT(*) as count FROM ${table}`)
      console.log(`✅ Tabela '${table}': ${result.rows[0].count} registros`)
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      console.log(`⚠️  Tabela '${table}': ${errMsg}`)
    }
  }

  await pool.end()
  console.log("\n🎉 Migração de tabelas adicionais finalizada!\n")
}

// Executar
runMigration().catch((error) => {
  console.error("💥 Erro fatal:", error)
  process.exit(1)
})
