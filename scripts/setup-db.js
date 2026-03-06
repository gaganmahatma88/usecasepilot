/**
 * UseCasePilot — Database Setup Script
 *
 * Run AFTER creating tables with supabase-schema.sql:
 *   node scripts/setup-db.js
 *
 * This seeds the settings row with a bcrypt hash of the default
 * admin password "admin123". Change it after first login.
 */

const bcrypt = require('bcryptjs')
const { createClient } = require('@supabase/supabase-js')

// Load .env.local
require('dotenv').config({ path: '.env.local' })

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key || url.includes('placeholder')) {
    console.error(
      '❌  Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.'
    )
    process.exit(1)
  }

  const db = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const DEFAULT_PASSWORD = 'admin123'
  const hash = await bcrypt.hash(DEFAULT_PASSWORD, 12)

  console.log('🔧  Seeding UseCasePilot settings…')

  const { error } = await db.from('settings').upsert(
    {
      site_name: 'UseCasePilot',
      admin_password_hash: hash,
      logo_url: '',
    },
    { onConflict: 'id' }
  )

  if (error) {
    console.error('❌  Error:', error.message)
    console.log(
      '\n   Make sure you have run supabase-schema.sql in the Supabase SQL editor first.'
    )
    process.exit(1)
  }

  console.log('✅  Settings seeded.')
  console.log(`\n   Admin password : ${DEFAULT_PASSWORD}`)
  console.log('   Login URL      : /admin/login')
  console.log('\n   ⚠️   Change the password in Supabase after first login!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
