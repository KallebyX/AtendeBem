#!/usr/bin/env tsx
/**
 * Script para rodar migração SQL diretamente no Neon
 * Uso: tsx scripts/run-migration.ts
 */

import { Pool } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join } from 'path'

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL não configurada no .env.local')
    process.exit(1)
  }

  console.log('🔄 Conectando ao Neon via Pool...')
  const pool = new Pool({ connectionString: databaseUrl })

  // Ler arquivo de migração
  const migrationPath = join(process.cwd(), 'scripts', '11-fix-rls-multi-tenant.sql')
  console.log(`📄 Lendo migração: ${migrationPath}`)
  
  const migrationSQL = readFileSync(migrationPath, 'utf-8')
  
  console.log(`📊 Executando migração completa...\n`)

  try {
    // Pool.query aceita SQL completo
    const result = await pool.query(migrationSQL)
    console.log('✅ Migração executada com sucesso!')
    console.log(`   Resultado: ${JSON.stringify(result.command || 'OK')}\n`)
  } catch (error: any) {
    console.error(`❌ ERRO: ${error.message}`)
    console.error('\nDetalhes:', error)
    
    // Alguns erros são aceitáveis
    if (
      error.message.includes('already exists') ||
      error.message.includes('duplicate')
    ) {
      console.log('\n⚠️  Erro esperado (recurso já existe), continuando...\n')
    } else {
      process.exit(1)
    }
  }

  // Verificar se tenants table foi criada
  console.log('🔍 Verificando tabelas criadas...')
  try {
    const tenants = await pool.query('SELECT COUNT(*) as count FROM tenants')
    console.log(`✅ Tabela 'tenants': ${tenants.rows[0].count} registros`)

    const users = await pool.query('SELECT COUNT(*) as count FROM users')
    console.log(`✅ Tabela 'users': ${users.rows[0].count} registros`)

    const appointments = await pool.query('SELECT COUNT(*) as count FROM appointments')
    console.log(`✅ Tabela 'appointments': ${appointments.rows[0].count} registros`)
    
    const digital_prescriptions = await pool.query('SELECT COUNT(*) as count FROM digital_prescriptions')
    console.log(`✅ Tabela 'digital_prescriptions': ${digital_prescriptions.rows[0].count} registros`)
  } catch (error: any) {
    console.error(`❌ Erro na verificação: ${error.message}`)
  }

  await pool.end()
  console.log('\n🎉 Migração finalizada com sucesso!\n')
}

// Executar
runMigration().catch(error => {
  console.error('💥 Erro fatal:', error)
  process.exit(1)
})
