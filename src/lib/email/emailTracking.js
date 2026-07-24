export const EMAIL_TEMPLATE_VERSION =
  process.env.EMAIL_TEMPLATE_VERSION ||
  'gilberto-retailer-banners-v1'

function cleanTag(value, fallback = 'unknown') {
  const result = String(value ?? '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 256)

  return result || fallback
}

export function buildEmailTags({
  language = 'pt',
  sequenceCode = 'unknown',
  emailNumber = 1,
  queueId = 'test'
}) {
  return [
    { name: 'project', value: 'livro_gilberto' },
    { name: 'language', value: cleanTag(language, 'pt') },
    { name: 'sequence', value: cleanTag(sequenceCode) },
    { name: 'email_number', value: cleanTag(emailNumber, '1') },
    { name: 'queue_id', value: cleanTag(queueId, 'test') },
    {
      name: 'template_version',
      value: cleanTag(EMAIL_TEMPLATE_VERSION)
    }
  ]
}

export function normalizeWebhookTags(tags) {
  if (!tags) return {}

  if (Array.isArray(tags)) {
    return Object.fromEntries(
      tags
        .map(item => [
          String(item?.name || ''),
          String(item?.value || '')
        ])
        .filter(([name]) => name)
    )
  }

  if (typeof tags === 'object') {
    return Object.fromEntries(
      Object.entries(tags).map(([name, value]) => [
        String(name),
        String(value ?? '')
      ])
    )
  }

  return {}
}

export function classifyTrackedLink(link) {
  const value = String(link || '').toLowerCase()

  if (!value) return ''

  if (
    value.includes('amazon.com') ||
    value.includes('amazon.com.br')
  ) {
    return 'amazon'
  }

  if (value.includes('barnesandnoble.com')) {
    return 'barnes'
  }

  if (value.includes('/api/unsubscribe')) {
    return 'unsubscribe'
  }

  if (value.includes('gilberto-souza.com')) {
    if (
      value.includes('/checkout') ||
      value.includes('#buy') ||
      value.includes('payment')
    ) {
      return 'site_checkout'
    }

    return 'site'
  }

  return 'external_other'
}

export function firstRecipient(data) {
  if (Array.isArray(data?.to)) {
    return String(data.to[0] || '').trim().toLowerCase()
  }

  return String(data?.to || '').trim().toLowerCase()
}
