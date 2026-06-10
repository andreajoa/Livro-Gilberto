"use client"

import { useEffect } from "react"

function getVisitorId() {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("visitor_id")
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem("visitor_id", id)
  }
  return id
}

function getUTM() {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
  }
}

export async function trackCRMEvent(eventType, options = {}) {
  try {
    if (typeof window === "undefined") return

    const visitorId = getVisitorId()
    const payload = {
      visitorId,
      eventType,
      language: options.language || "pt",
      page: window.location.pathname,
      source: options.source || document.referrer || "direct",
      metadata: options.metadata || {},
      ...getUTM(),
    }

    await fetch("/api/crm/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch (error) {
    console.warn("CRM tracking failed:", error)
  }
}

export default function CRMTracker({ language = "pt" }) {
  useEffect(() => {
    trackCRMEvent("page_view", { language })
  }, [language])

  return null
}
