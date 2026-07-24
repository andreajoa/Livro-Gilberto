"use client"

import {
  useEffect,
  useRef
} from "react"

import {
  getWebsiteContext,
  isWebsiteTrackingAllowed,
  startWebsiteSession,
  trackWebsiteEvent
} from "@/src/lib/website/websiteTracker"

function text(value, max = 500) {
  if (
    value === null ||
    value === undefined
  ) {
    return ""
  }

  return String(value)
    .trim()
    .slice(0, max)
}

async function sendLegacyCRMEvent(
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

    const context =
      getWebsiteContext()

    const lastTouch =
      context.lastTouch || {}

    const visitorId =
      context.visitorId || ""

    if (!visitorId) {
      return {
        success: false,
        skipped: true
      }
    }

    const payload = {
      visitorId,

      eventType:
        text(
          eventType,
          80
        ) || "unknown",

      language:
        options.language ||
        options.lang ||
        "pt",

      page:
        options.page ||
        options.pagePath ||
        window.location.pathname,

      source:
        options.source ||
        lastTouch.source ||
        document.referrer ||
        "direct",

      email:
        options.email || "",

      metadata:
        options.metadata || {},

      utm_source:
        options.utm_source ||
        options.utmSource ||
        lastTouch.utmSource ||
        "",

      utm_medium:
        options.utm_medium ||
        options.utmMedium ||
        lastTouch.utmMedium ||
        "",

      utm_campaign:
        options.utm_campaign ||
        options.utmCampaign ||
        lastTouch.utmCampaign ||
        ""
    }

    const response =
      await fetch(
        "/api/crm/event",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(
              payload
            ),

          keepalive: true
        }
      )

    if (!response.ok) {
      throw new Error(
        `Legacy CRM returned ${response.status}`
      )
    }

    return {
      success: true
    }
  } catch (error) {
    console.warn(
      "Legacy CRM tracking failed:",
      error
    )

    return {
      success: false,
      error:
        error?.message || "unknown"
    }
  }
}

export async function trackCRMEvent(
  eventType,
  options = {}
) {
  /*
   * Compatibilidade:
   * mantém o CRM antigo e alimenta simultaneamente
   * a nova Website Intelligence.
   */
  const results =
    await Promise.allSettled([
      sendLegacyCRMEvent(
        eventType,
        options
      ),

      trackWebsiteEvent(
        eventType,
        {
          language:
            options.language ||
            options.lang,

          source:
            options.source,

          pagePath:
            options.page ||
            options.pagePath,

          bookId:
            options.bookId ||
            options.book_id,

          productId:
            options.productId ||
            options.product_id,

          elementId:
            options.elementId ||
            options.element_id,

          elementType:
            options.elementType ||
            options.element_type,

          elementText:
            options.elementText ||
            options.element_text,

          destinationUrl:
            options.destinationUrl ||
            options.destination_url,

          channel:
            options.channel,

          creativeId:
            options.creativeId ||
            options.creative_id,

          slideId:
            options.slideId ||
            options.slide_id,

          experimentId:
            options.experimentId ||
            options.experiment_id,

          variantId:
            options.variantId ||
            options.variant_id,

          metadata:
            options.metadata || {}
        }
      )
    ])

  return {
    legacy:
      results[0].status ===
      "fulfilled"
        ? results[0].value
        : {
            success: false,
            error:
              results[0].reason?.message ||
              "unknown"
          },

    websiteIntelligence:
      results[1].status ===
      "fulfilled"
        ? results[1].value
        : {
            success: false,
            error:
              results[1].reason?.message ||
              "unknown"
          }
  }
}

export default function CRMTracker({
  language = "pt"
}) {
  const trackedRef =
    useRef(false)

  useEffect(() => {
    if (
      trackedRef.current
    ) {
      return
    }

    trackedRef.current = true

    async function initializeTracking() {
      await startWebsiteSession({
        language,

        bookId:
          "gilberto_book_01",

        metadata: {
          tracker_version:
            "website-intelligence-v1"
        }
      })

      /*
       * O page_view é enviado separadamente para evitar
       * duplicar o evento no sistema novo.
       */
      await Promise.allSettled([
        sendLegacyCRMEvent(
          "page_view",
          {
            language,

            metadata: {
              tracker_version:
                "legacy-crm-compatible"
            }
          }
        ),

        trackWebsiteEvent(
          "page_view",
          {
            language,

            bookId:
              "gilberto_book_01",

            metadata: {
              tracker_version:
                "website-intelligence-v1"
            }
          }
        )
      ])
    }

    initializeTracking()
  }, [language])

  return null
}
