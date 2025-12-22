#!/usr/bin/env tsx
/**
 * Script para rodar migrações SQL usando cliente pg padrão
 */

import { Client } from 'pg'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL não configurada')
    process.exit(1)
  }

  console.log('🔄 Conectando ao banco de dados...')
  const client = new Client({ connectionString: databaseUrl })

  try {
    await client.connect()
    console.log('✅ Conectado com sucesso!\n')

    // 1. Run base migration first
    const baseMigrationPath = join(process.cwd(), 'scripts', '00-complete-migration.sql')
    if (existsSync(baseMigrationPath)) {
      console.log('📄 Executando 00-complete-migration.sql...')
      const baseMigration = readFileSync(baseMigrationPath, 'utf-8')
      try {
        await client.query(baseMigration)
        console.log('✅ Base migration executada!\n')
      } catch (err: any) {
        if (err.message.includes('already exists') || err.message.includes('duplicate')) {
          console.log('⚠️  Tabelas base já existem, continuando...\n')
        } else {
          console.error('❌ Erro na base migration:', err.message)
        }
      }
    }

    // 2. Verify base tables exist
    console.log('🔍 Verificando tabelas base...')
    const baseTables = ['users', 'patients', 'appointments']
    for (const table of baseTables) {
      try {
        const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`)
        console.log(`✅ ${table}: ${result.rows[0].count} registros`)
      } catch (err: any) {
        console.log(`❌ ${table}: ${err.message}`)
      }
    }
    console.log('')

    // 3. Run additional tables migration
    const fixedMigrationPath = join(process.cwd(), 'scripts', '01-additional-tables-fixed.sql')
    const originalMigrationPath = join(process.cwd(), 'scripts', '01-additional-tables.sql')
    const migrationPath = existsSync(fixedMigrationPath) ? fixedMigrationPath : originalMigrationPath

    console.log(`📄 Executando ${migrationPath.split('/').pop()}...`)
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    try {
      await client.query(migrationSQL)
      console.log('✅ Migração de tabelas adicionais executada!\n')
    } catch (err: any) {
      if (err.message.includes('already exists') || err.message.includes('duplicate')) {
        console.log('⚠️  Algumas tabelas já existem, continuando...\n')
      } else {
        console.error('❌ Erro:', err.message)
        console.error('\nDetalhes:', err)
      }
    }

    // 4. Verify new tables
    console.log('🔍 Verificando tabelas adicionais...')
    const additionalTables = [
      'contracts',
      'contract_templates',
      'medical_images',
      'odontograms',
      'biometric_enrollments',
      'whatsapp_conversations',
      'inventory_items',
      'anamnesis',
      'budgets',
      'tiss_guides',
      'telemedicine_sessions',
      'crm_leads',
      'nfe_invoices',
    ]

    for (const table of additionalTables) {
      try {
        const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`)
        console.log(`✅ ${table}: ${result.rows[0].count} registros`)
      } catch (err: any) {
        console.log(`⚠️  ${table}: ${err.message.split('\n')[0]}`)
      }
    }

  } catch (err: any) {
    console.error('💥 Erro fatal:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }

  console.log('\n🎉 Migrações finalizadas!\n')
}

runMigrations().catch((err) => {
  console.error('💥 Erro:', err)
  process.exit(1)
})
