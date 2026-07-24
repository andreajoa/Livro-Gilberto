"use client"

import {
  useEffect,
  useRef
} from "react"

import {
  isWebsiteTrackingAllowed,
  trackWebsiteEvent
} from "@/src/lib/website/websiteTracker"

const SCROLL_THRESHOLDS = [
  25,
  50,
  75,
  90,
  100
]

const ENGAGEMENT_THRESHOLDS = [
  15,
  30,
  60,
  120,
  300
]

function cleanText(value, max = 300) {
  if (
    value === null ||
    value === undefined
  ) {
    return ""
  }

  return String(value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max)
}

function languageFromPath() {
  const pathname =
    window.location.pathname

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

function getScrollDepth() {
  const documentElement =
    document.documentElement

  const body = document.body

  const scrollTop =
    window.scrollY ||
    documentElement.scrollTop ||
    body.scrollTop ||
    0

  const scrollHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    documentElement.clientHeight,
    documentElement.scrollHeight,
    documentElement.offsetHeight
  )

  const viewportHeight =
    window.innerHeight ||
    documentElement.clientHeight ||
    0

  const scrollable =
    scrollHeight - viewportHeight

  if (scrollable <= 0) {
    return 100
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (scrollTop / scrollable) * 100
      )
    )
  )
}

function closestInteractive(target) {
  if (
    !target ||
    typeof target.closest !== "function"
  ) {
    return null
  }

  return target.closest(
    [
      "a",
      "button",
      "[role='button']",
      "[data-analytics-id]"
    ].join(",")
  )
}

function elementText(element) {
  return cleanText(
    element.getAttribute(
      "data-analytics-text"
    ) ||
    element.getAttribute(
      "aria-label"
    ) ||
    element.textContent ||
    "",
    300
  )
}

function elementType(element) {
  const explicit =
    element.getAttribute(
      "data-analytics-type"
    )

  if (explicit) {
    return cleanText(explicit, 100)
  }

  const tag =
    element.tagName?.toLowerCase()

  if (tag === "a") return "link"
  if (tag === "button") return "button"

  return cleanText(
    element.getAttribute("role") ||
    tag ||
    "interactive",
    100
  )
}

function destinationUrl(element) {
  const explicit =
    element.getAttribute(
      "data-destination-url"
    )

  if (explicit) {
    return explicit
  }

  if (
    element.tagName?.toLowerCase() === "a"
  ) {
    return element.href || ""
  }

  return ""
}

function classifyDestination(
  destination,
  text
) {
  const value =
    `${destination} ${text}`
      .toLowerCase()

  if (
    value.includes("amazon.")
  ) {
    return {
      eventType: "amazon_clicked",
      channel: "amazon"
    }
  }

  if (
    value.includes(
      "barnesandnoble."
    ) ||
    value.includes(
      "barnes & noble"
    )
  ) {
    return {
      eventType: "barnes_clicked",
      channel: "barnes_noble"
    }
  }

  if (
    value.includes("/checkout") ||
    value.includes("#buy") ||
    value.includes("comprar") ||
    value.includes("buy now") ||
    value.includes("purchase") ||
    value.includes("adquirir")
  ) {
    return {
      eventType:
        "site_checkout_clicked",

      channel:
        "site_checkout"
    }
  }

  if (
    destination &&
    destination.startsWith(
      window.location.origin
    )
  ) {
    return {
      eventType: "cta_clicked",
      channel: "site_internal"
    }
  }

  if (
    destination &&
    /^https?:\/\//i.test(destination)
  ) {
    return {
      eventType: "cta_clicked",
      channel: "external"
    }
  }

  return {
    eventType: "cta_clicked",
    channel: "site_interaction"
  }
}

function dataValue(
  element,
  attribute,
  fallback = ""
) {
  return cleanText(
    element.getAttribute(attribute) ||
    fallback,
    180
  )
}

function clickPayload(element) {
  const text = elementText(element)

  const destination =
    destinationUrl(element)

  const classification =
    classifyDestination(
      destination,
      text
    )

  const explicitEvent =
    dataValue(
      element,
      "data-event-type"
    )

  return {
    eventType:
      explicitEvent ||
      classification.eventType,

    options: {
      language:
        dataValue(
          element,
          "data-language",
          languageFromPath()
        ),

      bookId:
        dataValue(
          element,
          "data-book-id",
          "gilberto_book_01"
        ),

      productId:
        dataValue(
          element,
          "data-product-id"
        ),

      elementId:
        dataValue(
          element,
          "data-analytics-id",
          element.id
        ),

      elementType:
        elementType(element),

      elementText:
        text,

      destinationUrl:
        destination,

      channel:
        dataValue(
          element,
          "data-channel",
          classification.channel
        ),

      creativeId:
        dataValue(
          element,
          "data-creative-id"
        ),

      slideId:
        dataValue(
          element,
          "data-slide-id"
        ),

      experimentId:
        dataValue(
          element,
          "data-experiment-id"
        ),

      variantId:
        dataValue(
          element,
          "data-variant-id"
        ),

      metadata: {
        auto_tracked: true,

        target:
          cleanText(
            element.getAttribute(
              "target"
            ),
            50
          ),

        rel:
          cleanText(
            element.getAttribute(
              "rel"
            ),
            120
          )
      }
    }
  }
}

export default function WebsiteBehaviorTracker() {
  const scrollSentRef =
    useRef(new Set())

  const engagementSentRef =
    useRef(new Set())

  const visibleSecondsRef =
    useRef(0)

  const lastReportedSecondsRef =
    useRef(0)

  const mountedAtRef =
    useRef(Date.now())

  const viewedElementsRef =
    useRef(new WeakSet())

  useEffect(() => {
    if (
      !isWebsiteTrackingAllowed(
        window.location.pathname
      )
    ) {
      return undefined
    }

    const language =
      languageFromPath()

    function handleScroll() {
      const depth =
        getScrollDepth()

      for (
        const threshold
        of SCROLL_THRESHOLDS
      ) {
        if (
          depth < threshold ||
          scrollSentRef.current
            .has(threshold)
        ) {
          continue
        }

        scrollSentRef.current
          .add(threshold)

        trackWebsiteEvent(
          "scroll_depth",
          {
            language,
            bookId:
              "gilberto_book_01",

            scrollDepth:
              threshold,

            metadata: {
              measured_depth:
                depth,

              threshold
            }
          }
        )
      }
    }

    function handleClick(event) {
      const element =
        closestInteractive(
          event.target
        )

      if (!element) {
        return
      }

      if (
        element.hasAttribute(
          "data-analytics-ignore"
        )
      ) {
        return
      }

      const payload =
        clickPayload(element)

      trackWebsiteEvent(
        payload.eventType,
        payload.options
      )
    }

    const interval =
      window.setInterval(
        () => {
          if (
            document.visibilityState
            !== "visible"
          ) {
            return
          }

          visibleSecondsRef.current += 1

          for (
            const threshold
            of ENGAGEMENT_THRESHOLDS
          ) {
            if (
              visibleSecondsRef.current
                < threshold ||
              engagementSentRef.current
                .has(threshold)
            ) {
              continue
            }

            engagementSentRef.current
              .add(threshold)

            lastReportedSecondsRef.current =
              threshold

            trackWebsiteEvent(
              "engagement",
              {
                language,
                bookId:
                  "gilberto_book_01",

                engagedSeconds:
                  threshold,

                metadata: {
                  threshold,
                  visibility_based:
                    true
                }
              }
            )
          }
        },
        1000
      )

    const observer =
      typeof IntersectionObserver
        !== "undefined"
        ? new IntersectionObserver(
            entries => {
              for (
                const entry
                of entries
              ) {
                if (
                  !entry.isIntersecting ||
                  entry.intersectionRatio
                    < 0.5
                ) {
                  continue
                }

                const element =
                  entry.target

                if (
                  viewedElementsRef.current
                    .has(element)
                ) {
                  continue
                }

                viewedElementsRef.current
                  .add(element)

                const eventType =
                  dataValue(
                    element,
                    "data-view-event",
                    "cta_viewed"
                  )

                trackWebsiteEvent(
                  eventType,
                  {
                    language:
                      dataValue(
                        element,
                        "data-language",
                        language
                      ),

                    bookId:
                      dataValue(
                        element,
                        "data-book-id",
                        "gilberto_book_01"
                      ),

                    productId:
                      dataValue(
                        element,
                        "data-product-id"
                      ),

                    elementId:
                      dataValue(
                        element,
                        "data-analytics-id",
                        element.id
                      ),

                    elementType:
                      elementType(
                        element
                      ),

                    elementText:
                      elementText(
                        element
                      ),

                    channel:
                      dataValue(
                        element,
                        "data-channel"
                      ),

                    creativeId:
                      dataValue(
                        element,
                        "data-creative-id"
                      ),

                    slideId:
                      dataValue(
                        element,
                        "data-slide-id"
                      ),

                    experimentId:
                      dataValue(
                        element,
                        "data-experiment-id"
                      ),

                    variantId:
                      dataValue(
                        element,
                        "data-variant-id"
                      ),

                    metadata: {
                      auto_view_tracking:
                        true,

                      intersection_ratio:
                        entry
                          .intersectionRatio
                    }
                  }
                )

                observer.unobserve(
                  element
                )
              }
            },
            {
              threshold: [
                0.5
              ]
            }
          )
        : null

    function observeTrackableElements() {
      if (!observer) {
        return
      }

      document
        .querySelectorAll(
          "[data-track-view]"
        )
        .forEach(element => {
          if (
            !viewedElementsRef.current
              .has(element)
          ) {
            observer.observe(
              element
            )
          }
        })
    }

    const mutationObserver =
      typeof MutationObserver
        !== "undefined"
        ? new MutationObserver(
            observeTrackableElements
          )
        : null

    function sendExitEvent() {
      const seconds =
        visibleSecondsRef.current

      const elapsedSeconds =
        Math.round(
          (
            Date.now() -
            mountedAtRef.current
          ) / 1000
        )

      trackWebsiteEvent(
        "session_ended",
        {
          language,
          bookId:
            "gilberto_book_01",

          engagedSeconds:
            seconds,

          useBeacon:
            true,

          metadata: {
            visible_seconds:
              seconds,

            elapsed_seconds:
              elapsedSeconds,

            last_engagement_threshold:
              lastReportedSecondsRef
                .current,

            maximum_scroll_depth:
              Math.max(
                0,
                ...scrollSentRef.current
              )
          }
        }
      )
    }

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true
      }
    )

    document.addEventListener(
      "click",
      handleClick,
      true
    )

    window.addEventListener(
      "pagehide",
      sendExitEvent
    )

    observeTrackableElements()

    mutationObserver?.observe(
      document.body,
      {
        childList: true,
        subtree: true
      }
    )

    handleScroll()

    return () => {
      window.clearInterval(
        interval
      )

      window.removeEventListener(
        "scroll",
        handleScroll
      )

      document.removeEventListener(
        "click",
        handleClick,
        true
      )

      window.removeEventListener(
        "pagehide",
        sendExitEvent
      )

      observer?.disconnect()
      mutationObserver?.disconnect()
    }
  }, [])

  return null
}
