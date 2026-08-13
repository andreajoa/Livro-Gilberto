"use client"

const VISITOR_KEY = "gs_wi_visitor_id"
const SESSION_KEY = "gs_wi_session"
const FIRST_TOUCH_KEY = "gs_wi_first_touch"
const LAST_TOUCH_KEY = "gs_wi_last_touch"
const CONSENT_KEY = "gs_privacy_consent_v1"

const SESSION_TIMEOUT_MS = 30 * 60 * 1000
const ENDPOINT = "/api/website-intelligence/event"

function storageAvailable() {
  try {
    if (typeof window === "undefined") {
      return false
    }

    const key = "__gs_storage_test__"

    window.localStorage.setItem(key, "1")
    window.localStorage.removeItem(key)

    return true
  } catch {
    return false
  }
}

function createId(prefix) {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}_${crypto.randomUUID()}`
  }

  const random = Math.random()
    .toString(36)
    .slice(2, 12)

  return `${prefix}_${Date.now()}_${random}`
}

function safeParse(value, fallback = null) {
  try {
    return value
      ? JSON.parse(value)
      : fallback
  } catch {
    return fallback
  }
}

function getStored(key) {
  if (!storageAvailable()) {
    return null
  }

  return window.localStorage.getItem(key)
}

function setStored(key, value) {
  if (!storageAvailable()) {
    return
  }

  window.localStorage.setItem(
    key,
    typeof value === "string"
      ? value
      : JSON.stringify(value)
  )
}

function clean(value, max = 1500) {
  if (
    value === null ||
    value === undefined
  ) {
    return ""
  }

  return String(value).slice(0, max)
}

const SENSITIVE_QUERY_KEYS = new Set([
  "token",
  "access_token",
  "client_secret",
  "secret",
  "password",
  "pass",
  "authorization",
  "auth",
  "code",
  "email",
  "payment_intent",
  "payment_intent_client_secret"
  ,"order"
])

export function getPrivacyConsent() {
  if (typeof window === 'undefined') return { analytics: false }
  return safeParse(window.localStorage.getItem(CONSENT_KEY), { analytics: false }) || { analytics: false }
}

export function setPrivacyConsent(consent) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: consent?.analytics === true, updatedAt: new Date().toISOString() }))
}

export function analyticsConsentGranted() {
  return getPrivacyConsent().analytics === true
}

export function isWebsiteTrackingAllowed(
  pathname
) {
  if (
    typeof pathname !== "string"
  ) {
    return false
  }

  return analyticsConsentGranted() && !(
    pathname === "/superacao" ||
    pathname.startsWith("/superacao/") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/")
  )
}

function sanitizeUrl(
  value,
  {
    relative = false
  } = {}
) {
  if (!value) {
    return ""
  }

  try {
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://www.gilberto-souza.com"

    const url =
      new URL(
        String(value),
        base
      )

    for (
      const key
      of [...url.searchParams.keys()]
    ) {
      if (
        SENSITIVE_QUERY_KEYS.has(
          key.toLowerCase()
        )
      ) {
        url.searchParams.delete(key)
      }
    }

    url.hash = ""

    if (relative) {
      return clean(
        url.pathname +
        (
          url.searchParams.toString()
            ? `?${url.searchParams.toString()}`
            : ""
        ),
        1500
      )
    }

    return clean(
      url.toString(),
      1500
    )
  } catch {
    return ""
  }
}

function normalizeLanguage(language) {
  if (language === "en") return "en"
  if (language === "es") return "es"

  return "pt"
}

function languageFromPathname(pathname) {
  if (
    pathname === "/en" ||
    pathname.startsWith("/en/")
  ) {
    return "en"
  }

  if (
    pathname === "/es" ||
    pathname.startsWith("/es/")
  ) {
    return "es"
  }

  return "pt"
}

function getUrlData() {
  if (typeof window === "undefined") {
    return {
      pagePath: "",
      pageUrl: "",
      pageTitle: "",
      referrer: "",
      language: "pt"
    }
  }

  return {
    pagePath:
      sanitizeUrl(
        window.location.href,
        {
          relative: true
        }
      ),

    pageUrl:
      sanitizeUrl(
        window.location.href
      ),

    pageTitle:
      document.title || "",

    referrer:
      sanitizeUrl(
        document.referrer
      ),

    language:
      languageFromPathname(
        window.location.pathname
      )
  }
}

function getCampaignData() {
  if (typeof window === "undefined") {
    return {}
  }

  const params = new URLSearchParams(
    window.location.search
  )

  return {
    utmSource:
      params.get("utm_source") || "",

    utmMedium:
      params.get("utm_medium") || "",

    utmCampaign:
      params.get("utm_campaign") || "",

    utmContent:
      params.get("utm_content") || "",

    utmTerm:
      params.get("utm_term") || "",

    campaignId:
      params.get("campaign_id") || "",

    creativeId:
      params.get("creative_id") || "",

    bookId:
      params.get("book_id") || "",

    productId:
      params.get("product_id") || "",

    emailResendId:
      params.get("email_id") || "",

    emailSequenceCode:
      params.get("sequence") || "",

    emailNumber:
      params.get("email_number") || ""
  }
}

function inferSource({
  utmSource,
  referrer
}) {
  if (utmSource) {
    return utmSource
  }

  if (!referrer) {
    return "direct"
  }

  try {
    const hostname = new URL(
      referrer
    ).hostname.toLowerCase()

    if (
      hostname.includes("google.")
    ) {
      return "google"
    }

    if (
      hostname.includes("instagram.")
    ) {
      return "instagram"
    }

    if (
      hostname.includes("facebook.")
    ) {
      return "facebook"
    }

    if (
      hostname.includes("tiktok.")
    ) {
      return "tiktok"
    }

    if (
      hostname.includes("youtube.")
    ) {
      return "youtube"
    }

    return hostname
  } catch {
    return "referral"
  }
}

export function getWebsiteVisitorId() {
  if (!analyticsConsentGranted()) return ''
  const existing =
    getStored(VISITOR_KEY) ||
    getStored("visitor_id")

  if (existing) {
    setStored(VISITOR_KEY, existing)
    setStored("visitor_id", existing)

    return existing
  }

  const visitorId = createId("v")

  setStored(VISITOR_KEY, visitorId)

  // Compatibilidade com o CRM anterior.
  setStored("visitor_id", visitorId)

  return visitorId
}

function createSession(visitorId, now) {
  return {
    sessionId: createId("s"),
    visitorId,
    startedAt: now,
    lastActivityAt: now
  }
}

export function getWebsiteSession() {
  const visitorId = getWebsiteVisitorId()
  const now = Date.now()

  const stored = safeParse(
    getStored(SESSION_KEY),
    null
  )

  const expired =
    !stored ||
    !stored.sessionId ||
    !stored.lastActivityAt ||
    now - Number(stored.lastActivityAt) >
      SESSION_TIMEOUT_MS

  const session = expired
    ? createSession(visitorId, now)
    : {
        ...stored,
        visitorId,
        lastActivityAt: now
      }

  setStored(SESSION_KEY, session)

  return {
    ...session,
    isNew: expired
  }
}

function touchFingerprint(
  touch
) {
  return [
    touch.source || "",
    touch.referrer || "",
    touch.landingPage || "",
    touch.utmSource || "",
    touch.utmMedium || "",
    touch.utmCampaign || "",
    touch.utmContent || "",
    touch.utmTerm || "",
    touch.campaignId || "",
    touch.creativeId || "",
    touch.bookId || "",
    touch.productId || "",
    touch.emailResendId || "",
    touch.emailSequenceCode || "",
    touch.emailNumber || ""
  ].join("|")
}

function buildCurrentTouch() {
  const url = getUrlData()
  const campaign = getCampaignData()

  return {
    capturedAt:
      new Date().toISOString(),

    source:
      inferSource({
        utmSource:
          campaign.utmSource,

        referrer:
          url.referrer
      }),

    referrer:
      url.referrer,

    landingPage:
      url.pagePath,

    ...campaign
  }
}

export function getWebsiteAttribution() {
  const candidate =
    buildCurrentTouch()

  const firstTouch =
    safeParse(
      getStored(FIRST_TOUCH_KEY),
      null
    )

  const storedLastTouch =
    safeParse(
      getStored(LAST_TOUCH_KEY),
      null
    )

  const hasExplicitTouch =
    candidate.utmSource ||
    candidate.utmMedium ||
    candidate.utmCampaign ||
    candidate.utmContent ||
    candidate.utmTerm ||
    candidate.campaignId ||
    candidate.creativeId ||
    candidate.emailResendId ||
    candidate.emailSequenceCode ||
    candidate.referrer

  const sameAsStored =
    storedLastTouch &&
    touchFingerprint(
      candidate
    ) ===
    touchFingerprint(
      storedLastTouch
    )

  let lastTouch

  if (
    sameAsStored
  ) {
    lastTouch =
      storedLastTouch
  } else if (
    hasExplicitTouch ||
    !storedLastTouch
  ) {
    lastTouch = {
      ...candidate,
      attributionId:
        createId("a")
    }

    setStored(
      LAST_TOUCH_KEY,
      lastTouch
    )
  } else {
    lastTouch =
      storedLastTouch
  }

  let first = firstTouch

  if (!first) {
    first = {
      ...(lastTouch || candidate),

      attributionId:
        lastTouch?.attributionId ||
        createId("a")
    }

    setStored(
      FIRST_TOUCH_KEY,
      first
    )
  }

  return {
    firstTouch:
      first,

    lastTouch:
      lastTouch || first
  }
}

function screenData() {
  if (typeof window === "undefined") {
    return {}
  }

  return {
    viewportWidth:
      window.innerWidth || 0,

    viewportHeight:
      window.innerHeight || 0,

    screenWidth:
      window.screen?.width || 0,

    screenHeight:
      window.screen?.height || 0
  }
}

function buildPayload(
  eventType,
  options = {}
) {
  const session = getWebsiteSession()
  const attribution =
    getWebsiteAttribution()

  const url = getUrlData()

  const selectedTouch =
    options.attribution === "first"
      ? attribution.firstTouch
      : attribution.lastTouch

  return {
    eventId:
      options.eventId ||
      createId("e"),

    visitorId:
      session.visitorId,

    sessionId:
      session.sessionId,

    attributionId:
      selectedTouch.attributionId,

    eventType,

    eventCategory:
      options.eventCategory || "",

    language: normalizeLanguage(
      options.language ||
      url.language
    ),

    pagePath:
      options.pagePath
        ? sanitizeUrl(
            options.pagePath,
            {
              relative: true
            }
          )
        : url.pagePath,

    pageUrl:
      options.pageUrl
        ? sanitizeUrl(
            options.pageUrl
          )
        : url.pageUrl,

    pageTitle:
      options.pageTitle ||
      url.pageTitle,

    referrer:
      sanitizeUrl(
        options.referrer ??
        selectedTouch.referrer ??
        url.referrer
      ),

    source:
      options.source ||
      selectedTouch.source ||
      "direct",

    utmSource:
      options.utmSource ??
      selectedTouch.utmSource,

    utmMedium:
      options.utmMedium ??
      selectedTouch.utmMedium,

    utmCampaign:
      options.utmCampaign ??
      selectedTouch.utmCampaign,

    utmContent:
      options.utmContent ??
      selectedTouch.utmContent,

    utmTerm:
      options.utmTerm ??
      selectedTouch.utmTerm,

    bookId:
      options.bookId ||
      selectedTouch.bookId ||
      "gilberto_book_01",

    productId:
      options.productId ||
      selectedTouch.productId ||
      "",

    elementId:
      options.elementId || "",

    elementType:
      options.elementType || "",

    elementText:
      options.elementText || "",

    destinationUrl:
      sanitizeUrl(
        options.destinationUrl || ""
      ),

    channel:
      options.channel || "",

    creativeId:
      options.creativeId ||
      selectedTouch.creativeId ||
      "",

    slideId:
      options.slideId || "",

    experimentId:
      options.experimentId || "",

    variantId:
      options.variantId || "",

    scrollDepth:
      options.scrollDepth || 0,

    engagedSeconds:
      options.engagedSeconds || 0,

    metadata: {
      first_touch:
        attribution.firstTouch,

      last_touch:
        attribution.lastTouch,

      session_started_at:
        session.startedAt,

      ...(options.metadata || {})
    },

    occurredAt:
      options.occurredAt ||
      new Date().toISOString(),

    ...screenData()
  }
}

async function sendPayload(
  payload,
  {
    useBeacon = false
  } = {}
) {
  const body = JSON.stringify(payload)

  if (
    useBeacon &&
    typeof navigator !== "undefined" &&
    typeof navigator.sendBeacon === "function"
  ) {
    const blob = new Blob(
      [body],
      {
        type: "application/json"
      }
    )

    const accepted =
      navigator.sendBeacon(
        ENDPOINT,
        blob
      )

    if (accepted) {
      return {
        success: true,
        beacon: true,
        event_id: payload.eventId
      }
    }
  }

  const response = await fetch(
    ENDPOINT,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body,
      keepalive: true,
      credentials: "same-origin"
    }
  )

  const result = await response
    .json()
    .catch(() => ({
      success: false
    }))

  if (!response.ok) {
    throw new Error(
      result.error ||
      `Tracking failed: ${response.status}`
    )
  }

  return result
}

export async function trackWebsiteEvent(
  eventType,
  options = {}
) {
  try {
    if (
      typeof window === "undefined" ||
      !isWebsiteTrackingAllowed(
        window.location.pathname
      )
    ) {
      return {
        success: true,
        skipped: true,
        reason:
          "route_excluded"
      }
    }

    const payload = buildPayload(
      eventType,
      options
    )

    return await sendPayload(
      payload,
      {
        useBeacon:
          options.useBeacon === true
      }
    )
  } catch (error) {
    console.warn(
      "Website intelligence tracking failed:",
      error
    )

    return {
      success: false,
      error: error.message
    }
  }
}

export async function startWebsiteSession(
  options = {}
) {
  if (
    typeof window === "undefined" ||
    !isWebsiteTrackingAllowed(
      window.location.pathname
    )
  ) {
    return {
      success: true,
      skipped: true,
      reason:
        "route_excluded"
    }
  }

  const session = getWebsiteSession()

  if (!session.isNew) {
    return {
      success: true,
      skipped: true,
      session_id: session.sessionId
    }
  }

  return trackWebsiteEvent(
    "session_started",
    options
  )
}

export function getWebsiteContext() {
  if (
    typeof window === 'undefined' ||
    !isWebsiteTrackingAllowed(window.location.pathname)
  ) {
    return { visitorId: '', sessionId: '', attributionId: '', firstTouch: null, lastTouch: null }
  }
  const session = getWebsiteSession()
  const attribution =
    getWebsiteAttribution()

  return {
    visitorId:
      session.visitorId,

    sessionId:
      session.sessionId,

    attributionId:
      attribution.lastTouch
        .attributionId,

    firstTouch:
      attribution.firstTouch,

    lastTouch:
      attribution.lastTouch
  }
}
