#!/usr/bin/env node

async function main() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://www.gilberto-souza.com'
  ).replace(/\/$/, '')

  const token = process.env.EMAIL_CRON_TOKEN
  const requestedDays = Number(process.argv[2] || 30)
  const language = String(process.argv[3] || '').toLowerCase()

  if (!token) {
    console.error('ERRO: EMAIL_CRON_TOKEN não está definido.')
    console.error(
      'Use: EMAIL_CRON_TOKEN="..." ' +
      'node scripts/email-intelligence-report.js 30'
    )
    process.exit(1)
  }

  const days = Number.isFinite(requestedDays)
    ? Math.min(365, Math.max(1, requestedDays))
    : 30

  const params = new URLSearchParams({
    token,
    days: String(days)
  })

  if (['pt', 'en', 'es'].includes(language)) {
    params.set('language', language)
  }

  const url =
    `${baseUrl}/api/email-intelligence/report?${params.toString()}`

  const response = await fetch(url)
  const text = await response.text()

  if (!response.ok) {
    console.error(`ERRO HTTP ${response.status}`)
    console.error(text)
    process.exit(1)
  }

  let report

  try {
    report = JSON.parse(text)
  } catch {
    console.error('ERRO: o servidor não retornou JSON válido.')
    console.error(text)
    process.exit(1)
  }

  console.log(JSON.stringify(report, null, 2))
}

main().catch(error => {
  console.error('ERRO AO GERAR RELATÓRIO:', error)
  process.exit(1)
})
