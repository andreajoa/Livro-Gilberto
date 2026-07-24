"use client"

import {
  useEffect,
  useRef,
  useState
} from "react"

import {
  trackWebsiteEvent
} from "@/src/lib/website/websiteTracker"

const AMAZON_URL =
  "https://www.amazon.com/dp/B0H9R8ZK7T"

const ROTATION_TIME = 6500

const slides = [
  {
    id: "superacao_banner_01",
    creativeId: "superacao_launch_new_book",
    image:
      "/images/superacao-promo/superacao-banner-1.webp",
    alt:
      "Conheça o novo livro Superação de Gilberto de Souza"
  },
  {
    id: "superacao_banner_02",
    creativeId: "superacao_real_story",
    image:
      "/images/superacao-promo/superacao-banner-2.webp",
    alt:
      "Superação, uma história real de dor, fé, luta e vitória"
  },
  {
    id: "superacao_banner_03",
    creativeId: "superacao_new_beginning",
    image:
      "/images/superacao-promo/superacao-banner-3.webp",
    alt:
      "Livro Superação para quem acredita em recomeços"
  }
]

function createTrackingData(slide) {
  return {
    eventCategory: "promotion",

    bookId: "superacao_book_01",

    productId: "superacao_amazon_us",

    elementId: "superacao_top_carousel",

    elementType: "promotional_banner",

    elementText: slide.alt,

    destinationUrl: AMAZON_URL,

    channel: "amazon",

    slideId: slide.id,

    creativeId: slide.creativeId,

    metadata: {
      placement: "home_top_pt",

      carousel: "superacao_launch_fade",

      transition: "fade",

      amazon_asin: "B0H9R8ZK7T",

      external_retailer: "amazon"
    }
  }
}

export default function SuperacaoPromoCarousel() {
  const [activeIndex, setActiveIndex] =
    useState(0)

  const [paused, setPaused] =
    useState(false)

  const viewedSlides =
    useRef(new Set())

  const activeSlide =
    slides[activeIndex]

  useEffect(() => {
    if (
      viewedSlides.current.has(
        activeSlide.id
      )
    ) {
      return
    }

    viewedSlides.current.add(
      activeSlide.id
    )

    trackWebsiteEvent(
      "banner_viewed",
      createTrackingData(
        activeSlide
      )
    )
  }, [
    activeSlide
  ])

  useEffect(() => {
    if (paused) {
      return undefined
    }

    const timer =
      window.setTimeout(
        () => {
          setActiveIndex(
            current =>
              (current + 1) %
              slides.length
          )
        },
        ROTATION_TIME
      )

    return () =>
      window.clearTimeout(timer)
  }, [
    activeIndex,
    paused
  ])

  async function handleAmazonClick() {
    const trackingData =
      createTrackingData(
        activeSlide
      )

    await Promise.allSettled([
      trackWebsiteEvent(
        "banner_clicked",
        trackingData
      ),

      trackWebsiteEvent(
        "amazon_clicked",
        {
          ...trackingData,

          metadata: {
            ...trackingData.metadata,

            click_target:
              "full_banner"
          }
        }
      )
    ])
  }

  return (
    <section
      aria-label="Novo livro Superação"
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
      onFocus={() =>
        setPaused(true)
      }
      onBlur={() =>
        setPaused(false)
      }
      style={{
        width: "100%",
        background: "#060C18",
        padding:
          "clamp(12px, 1.8vw, 24px) 5vw"
      }}
    >
      <div
        style={{
          position: "relative",

          width: "100%",

          maxWidth: 1180,

          height:
            "clamp(150px, 18vw, 255px)",

          margin: "0 auto",

          overflow: "hidden",

          borderRadius: 12,

          background: "#F4EBDD",

          border:
            "1px solid rgba(212,165,116,0.45)",

          boxShadow:
            "0 12px 32px rgba(0,0,0,0.28)"
        }}
      >
        {slides.map(
          (slide, index) => (
            <a
              key={slide.id}
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label={
                `${slide.alt}. Comprar na Amazon.`
              }
              onClick={
                index === activeIndex
                  ? handleAmazonClick
                  : undefined
              }
              tabIndex={
                index === activeIndex
                  ? 0
                  : -1
              }
              style={{
                position: "absolute",

                inset: 0,

                display: "block",

                opacity:
                  index === activeIndex
                    ? 1
                    : 0,

                visibility:
                  index === activeIndex
                    ? "visible"
                    : "hidden",

                pointerEvents:
                  index === activeIndex
                    ? "auto"
                    : "none",

                transition:
                  "opacity 1100ms ease-in-out",

                cursor: "pointer"
              }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={
                  index === 0
                    ? "eager"
                    : "lazy"
                }
                fetchPriority={
                  index === 0
                    ? "high"
                    : "auto"
                }
                draggable="false"
                style={{
                  width: "100%",

                  height: "100%",

                  display: "block",

                  objectFit: "cover",

                  objectPosition:
                    "center center",

                  borderRadius: 12,

                  userSelect: "none"
                }}
              />
            </a>
          )
        )}

        <div
          role="tablist"
          aria-label="Banners do livro Superação"
          style={{
            position: "absolute",

            left: "50%",

            bottom:
              "clamp(6px, 0.8vw, 11px)",

            transform:
              "translateX(-50%)",

            zIndex: 5,

            display: "flex",

            alignItems: "center",

            gap: 7,

            padding: "5px 8px",

            borderRadius: 999,

            background:
              "rgba(6,12,24,0.55)",

            border:
              "1px solid rgba(255,255,255,0.18)",

            backdropFilter:
              "blur(7px)"
          }}
        >
          {slides.map(
            (slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-label={
                  `Exibir banner ${index + 1}`
                }
                aria-selected={
                  index === activeIndex
                }
                onClick={() =>
                  setActiveIndex(index)
                }
                style={{
                  width:
                    index === activeIndex
                      ? 22
                      : 7,

                  height: 7,

                  padding: 0,

                  border: 0,

                  borderRadius: 999,

                  background:
                    index === activeIndex
                      ? "#D5A660"
                      : "rgba(255,255,255,0.65)",

                  cursor: "pointer",

                  transition:
                    "width 300ms ease, background 300ms ease"
                }}
              />
            )
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          section {
            padding:
              10px 12px !important;
          }

          section > div {
            height:
              clamp(
                118px,
                34vw,
                155px
              ) !important;

            border-radius:
              12px !important;
          }

          section img {
            border-radius:
              12px !important;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          section a {
            transition:
              none !important;
          }
        }
      `}</style>
    </section>
  )
}
