"use client"

import {
  useEffect,
  useRef,
  useState
} from "react"

import {
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import {
  trackWebsiteEvent
} from "@/src/lib/website/websiteTracker"

const AMAZON_URL =
  "https://www.amazon.com/dp/B0H9R8ZK7T"

const ROTATION_TIME = 6500

const slides = [
  {
    id: "superacao_banner_01",
    creativeId:
      "superacao_launch_available",

    image:
      "/images/superacao-promo/superacao-banner-1.webp",

    alt:
      "Superação, novo lançamento de Gilberto de Souza, já disponível na Amazon"
  },
  {
    id: "superacao_banner_02",
    creativeId:
      "superacao_journey_story",

    image:
      "/images/superacao-promo/superacao-banner-2.webp",

    alt:
      "Livro Superação, uma jornada de dor, fé, luta e vitória"
  },
  {
    id: "superacao_banner_03",
    creativeId:
      "superacao_amazon_available",

    image:
      "/images/superacao-promo/superacao-banner-3.webp",

    alt:
      "Livro Superação de Gilberto de Souza disponível para compra na Amazon"
  }
]

function trackingData(slide) {
  return {
    eventCategory:
      "promotion",

    bookId:
      "superacao_book_01",

    productId:
      "superacao_amazon_us",

    elementId:
      "superacao_top_carousel",

    elementType:
      "promotional_banner",

    elementText:
      slide.alt,

    destinationUrl:
      AMAZON_URL,

    channel:
      "amazon",

    slideId:
      slide.id,

    creativeId:
      slide.creativeId,

    metadata: {
      placement:
        "home_top_pt",

      carousel:
        "superacao_launch",

      amazon_asin:
        "B0H9R8ZK7T",

      external_retailer:
        "amazon"
    }
  }
}

export default function SuperacaoPromoCarousel() {
  const [activeIndex, setActiveIndex] =
    useState(0)

  const [paused, setPaused] =
    useState(false)

  const viewedRef =
    useRef(new Set())

  const activeSlide =
    slides[activeIndex]

  useEffect(() => {
    const viewKey =
      `${activeSlide.id}_${activeIndex}`

    if (
      viewedRef.current.has(viewKey)
    ) {
      return
    }

    viewedRef.current.add(viewKey)

    trackWebsiteEvent(
      "banner_viewed",
      trackingData(activeSlide)
    )
  }, [
    activeIndex,
    activeSlide
  ])

  useEffect(() => {
    if (paused) {
      return undefined
    }

    const timer = window.setTimeout(
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

  function selectSlide(index) {
    setActiveIndex(index)
  }

  function previousSlide() {
    setActiveIndex(
      current =>
        (
          current -
          1 +
          slides.length
        ) %
        slides.length
    )
  }

  function nextSlide() {
    setActiveIndex(
      current =>
        (current + 1) %
        slides.length
    )
  }

  async function handleAmazonClick() {
    const data =
      trackingData(activeSlide)

    await Promise.allSettled([
      trackWebsiteEvent(
        "banner_clicked",
        data
      ),

      trackWebsiteEvent(
        "amazon_clicked",
        {
          ...data,

          metadata: {
            ...data.metadata,

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
        position:
          "relative",

        width:
          "100%",

        overflow:
          "hidden",

        background:
          "#050403",

        borderBottom:
          "1px solid rgba(212,165,116,0.35)",

        boxShadow:
          "0 12px 35px rgba(0,0,0,0.32)"
      }}
    >
      <div
        style={{
          position:
            "relative",

          width:
            "100%",

          aspectRatio:
            "3 / 1",

          minHeight:
            145,

          maxHeight:
            430,

          background:
            "#050403"
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
                `${slide.alt}. Abrir na Amazon.`
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
                position:
                  "absolute",

                inset:
                  0,

                display:
                  "block",

                opacity:
                  index === activeIndex
                    ? 1
                    : 0,

                visibility:
                  index === activeIndex
                    ? "visible"
                    : "hidden",

                transform:
                  index === activeIndex
                    ? "scale(1)"
                    : "scale(1.015)",

                transition:
                  "opacity 900ms ease, transform 6.5s ease",

                pointerEvents:
                  index === activeIndex
                    ? "auto"
                    : "none",

                background:
                  "#050403"
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
                  width:
                    "100%",

                  height:
                    "100%",

                  display:
                    "block",

                  objectFit:
                    "cover",

                  objectPosition:
                    "center center",

                  userSelect:
                    "none"
                }}
              />

              <span
                aria-hidden="true"
                style={{
                  position:
                    "absolute",

                  inset:
                    0,

                  background:
                    "linear-gradient(to bottom, transparent 72%, rgba(0,0,0,0.2))",

                  pointerEvents:
                    "none"
                }}
              />
            </a>
          )
        )}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Banner anterior"
          style={{
            position:
              "absolute",

            left:
              "clamp(8px, 1.5vw, 24px)",

            top:
              "50%",

            transform:
              "translateY(-50%)",

            zIndex:
              4,

            width:
              42,

            height:
              42,

            borderRadius:
              "50%",

            border:
              "1px solid rgba(255,190,77,0.48)",

            background:
              "rgba(0,0,0,0.52)",

            color:
              "#f5c267",

            display:
              "grid",

            placeItems:
              "center",

            cursor:
              "pointer",

            backdropFilter:
              "blur(8px)",

            boxShadow:
              "0 8px 25px rgba(0,0,0,0.3)"
          }}
        >
          <ChevronLeft size={21} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Próximo banner"
          style={{
            position:
              "absolute",

            right:
              "clamp(8px, 1.5vw, 24px)",

            top:
              "50%",

            transform:
              "translateY(-50%)",

            zIndex:
              4,

            width:
              42,

            height:
              42,

            borderRadius:
              "50%",

            border:
              "1px solid rgba(255,190,77,0.48)",

            background:
              "rgba(0,0,0,0.52)",

            color:
              "#f5c267",

            display:
              "grid",

            placeItems:
              "center",

            cursor:
              "pointer",

            backdropFilter:
              "blur(8px)",

            boxShadow:
              "0 8px 25px rgba(0,0,0,0.3)"
          }}
        >
          <ChevronRight size={21} />
        </button>

        <div
          role="tablist"
          aria-label="Banners do livro Superação"
          style={{
            position:
              "absolute",

            left:
              "50%",

            bottom:
              "clamp(7px, 1.3vw, 17px)",

            transform:
              "translateX(-50%)",

            zIndex:
              5,

            display:
              "flex",

            gap:
              8,

            padding:
              "7px 10px",

            borderRadius:
              999,

            background:
              "rgba(0,0,0,0.48)",

            border:
              "1px solid rgba(255,190,77,0.25)",

            backdropFilter:
              "blur(8px)"
          }}
        >
          {slides.map(
            (slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-label={
                  `Mostrar banner ${index + 1}`
                }
                aria-selected={
                  index === activeIndex
                }
                onClick={() =>
                  selectSlide(index)
                }
                style={{
                  width:
                    index === activeIndex
                      ? 26
                      : 8,

                  height:
                    8,

                  padding:
                    0,

                  border:
                    0,

                  borderRadius:
                    999,

                  background:
                    index === activeIndex
                      ? "#e9aa3e"
                      : "rgba(255,255,255,0.55)",

                  cursor:
                    "pointer",

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
          section > div {
            min-height: 125px !important;
          }

          section button[aria-label="Banner anterior"],
          section button[aria-label="Próximo banner"] {
            width: 32px !important;
            height: 32px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          section a {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
