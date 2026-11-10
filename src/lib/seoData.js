// Dados estruturados (schema.org) das páginas do livro. Fatos conferidos com o miolo do livro e as páginas.
export const SITE = "https://www.gilberto-souza.com"
export const chaptersEn = [
  "The Impact",
  "The False Beliefs of a Hero",
  "The Cycle of Post-Abandonment Depression",
  "Rebuilding Your Identity",
  "Dealing with Anger and the Desire for Revenge",
  "In the Desert, New Purposes Are Born",
  "The Healing That Turns Pain into Strength",
  "Rise Up",
  "God Has Not Lost Control",
  "The Hope That Renews",
  "The Cell Is Open and the Podium Is Empty"
]
export const faqEn = [
  {
    "q": "What format is the book in?",
    "a": "You get an instant download: a PDF eBook you can read on any device, plus an MP3 audiobook you can listen to anywhere — in the car, at the gym, or late at night when your mind won't stop."
  },
  {
    "q": "How do I receive my purchase?",
    "a": "Immediately after payment, you'll receive an email with your download links. No waiting, no shipping — it's yours in under 60 seconds."
  },
  {
    "q": "Is this a Christian book?",
    "a": "Yes. Gilberto writes from his Christian faith. Each chapter opens with Scripture and the book includes prayers and reflection exercises. You do not need to be a churchgoer to read it, but faith is at the center of how he rebuilt."
  },
  {
    "q": "Is this book only for men who were cheated on?",
    "a": "No. This book is for any man who gave everything to a relationship and was left feeling like it wasn't enough — whether through betrayal, breakup, or being replaced."
  },
  {
    "q": "What if it doesn't help me?",
    "a": "You're covered by a 30-day money-back guarantee. No questions asked. If you don't feel this book moved the needle for you, email us and we'll refund you in full."
  },
  {
    "q": "Is the audiobook the full book or just a summary?",
    "a": "It's the complete book, word for word, read in a calm and direct voice designed for men going through exactly what you're going through."
  }
]
export const jsonLdEn = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.gilberto-souza.com/#gilberto",
      "name": "Gilberto de Souza",
      "url": "https://www.gilberto-souza.com/sobre",
      "image": "https://www.gilberto-souza.com/book-assets/gilberto-ingles.png",
      "jobTitle": "Author",
      "nationality": "Brazilian",
      "homeLocation": {
        "@type": "Country",
        "name": "United States"
      },
      "sameAs": [
        "https://www.instagram.com/gilberto.rebuild/",
        "https://www.amazon.com/author/gilbertosouza",
        "https://www.goodreads.com/author/show/28715395.Gilberto_Souza"
      ]
    },
    {
      "@type": "Book",
      "@id": "https://www.gilberto-souza.com/en#book",
      "name": "How to Overcome the Pain of Being Replaced by Someone Else",
      "alternateName": "You Are Not Alone",
      "author": {
        "@id": "https://www.gilberto-souza.com/#gilberto"
      },
      "inLanguage": "en",
      "url": "https://www.gilberto-souza.com/en",
      "image": "https://www.gilberto-souza.com/books/en/book-front.png",
      "description": "A faith-based book for men healing from betrayal, infidelity and being replaced. Eleven chapters with Scripture, prayer and reflection exercises to stop the spiral, rebuild identity and find hope again.",
      "genre": [
        "Christian living",
        "Self-help",
        "Relationships"
      ],
      "audience": {
        "@type": "PeopleAudience",
        "suggestedGender": "male"
      },
      "about": [
        "betrayal",
        "infidelity recovery",
        "divorce",
        "men’s mental health",
        "Christian faith"
      ],
      "workExample": [
        {
          "@type": "Book",
          "bookFormat": "https://schema.org/Paperback",
          "inLanguage": "en",
          "isbn": "9798196254345",
          "url": "https://www.amazon.com/dp/B0H2LXHCH4",
          "sameAs": [
            "https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504"
          ]
        },
        {
          "@type": "Book",
          "bookFormat": "https://schema.org/EBook",
          "inLanguage": "en",
          "url": "https://www.gilberto-souza.com/en",
          "offers": {
            "@type": "Offer",
            "price": "24.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.gilberto-souza.com/checkout-digital?lang=en",
            "description": "PDF eBook plus MP3 audiobook, instant access"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "inLanguage": "en",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What format is the book in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You get an instant download: a PDF eBook you can read on any device, plus an MP3 audiobook you can listen to anywhere — in the car, at the gym, or late at night when your mind won't stop."
          }
        },
        {
          "@type": "Question",
          "name": "How do I receive my purchase?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Immediately after payment, you'll receive an email with your download links. No waiting, no shipping — it's yours in under 60 seconds."
          }
        },
        {
          "@type": "Question",
          "name": "Is this a Christian book?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Gilberto writes from his Christian faith. Each chapter opens with Scripture and the book includes prayers and reflection exercises. You do not need to be a churchgoer to read it, but faith is at the center of how he rebuilt."
          }
        },
        {
          "@type": "Question",
          "name": "Is this book only for men who were cheated on?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This book is for any man who gave everything to a relationship and was left feeling like it wasn't enough — whether through betrayal, breakup, or being replaced."
          }
        },
        {
          "@type": "Question",
          "name": "What if it doesn't help me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You're covered by a 30-day money-back guarantee. No questions asked. If you don't feel this book moved the needle for you, email us and we'll refund you in full."
          }
        },
        {
          "@type": "Question",
          "name": "Is the audiobook the full book or just a summary?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It's the complete book, word for word, read in a calm and direct voice designed for men going through exactly what you're going through."
          }
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gilberto-souza.com/en",
      "url": "https://www.gilberto-souza.com/en",
      "inLanguage": "en",
      "name": "How to Overcome the Pain of Being Replaced by Someone Else — Gilberto de Souza",
      "about": {
        "@id": "https://www.gilberto-souza.com/en#book"
      }
    }
  ]
}
export const jsonLdPt = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.gilberto-souza.com/#gilberto",
      "name": "Gilberto de Souza",
      "url": "https://www.gilberto-souza.com/sobre",
      "image": "https://www.gilberto-souza.com/book-assets/gilberto-ingles.png",
      "jobTitle": "Author",
      "nationality": "Brazilian",
      "homeLocation": {
        "@type": "Country",
        "name": "United States"
      },
      "sameAs": [
        "https://www.instagram.com/gilberto.rebuild/",
        "https://www.amazon.com/author/gilbertosouza",
        "https://www.goodreads.com/author/show/28715395.Gilberto_Souza"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gilberto-souza.com/#site",
      "url": "https://www.gilberto-souza.com",
      "name": "Gilberto de Souza",
      "inLanguage": [
        "pt-BR",
        "en",
        "es"
      ]
    },
    {
      "@type": "Book",
      "@id": "https://www.gilberto-souza.com/#livro",
      "name": "Como Vencer a Dor de Ser Trocado Por Outro",
      "author": {
        "@id": "https://www.gilberto-souza.com/#gilberto"
      },
      "inLanguage": "pt-BR",
      "url": "https://www.gilberto-souza.com",
      "image": "https://www.gilberto-souza.com/books/pt/book-front.jpg",
      "isbn": "9786584622050",
      "description": "Livro de fé cristã para homens que foram traídos ou trocados por outro. Uma história real de traição e reconstrução, com passagens bíblicas, orações e exercícios de reflexão.",
      "genre": [
        "Vida cristã",
        "Autoajuda",
        "Relacionamentos"
      ],
      "about": [
        "traição",
        "superação",
        "divórcio",
        "fé cristã",
        "saúde emocional do homem"
      ],
      "workExample": [
        {
          "@type": "Book",
          "bookFormat": "https://schema.org/Paperback",
          "inLanguage": "pt-BR",
          "isbn": "9786584622050",
          "url": "https://www.gilberto-souza.com/#comprar",
          "offers": {
            "@type": "Offer",
            "price": "119.00",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "url": "https://www.gilberto-souza.com/#comprar",
            "description": "Livro físico enviado pelos Correios (frete à parte)"
          },
          "sameAs": [
            "https://www.amazon.com/dp/B0H2LM4TXH"
          ]
        },
        {
          "@type": "Book",
          "bookFormat": "https://schema.org/EBook",
          "inLanguage": "pt-BR",
          "url": "https://www.gilberto-souza.com",
          "offers": {
            "@type": "Offer",
            "price": "97.00",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "url": "https://www.gilberto-souza.com/checkout-digital?lang=pt",
            "description": "eBook PDF + audiobook, acesso imediato"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "inLanguage": "pt-BR",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona o envio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O livro é embalado com cuidado e postado pelos Correios. Você recebe o código de rastreamento por email assim que for postado."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o prazo de entrega?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PAC: 5 a 15 dias úteis dependendo da sua região. SEDEX: 1 a 7 dias úteis."
          }
        },
        {
          "@type": "Question",
          "name": "Posso devolver o livro?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Você tem 7 dias corridos após o recebimento para solicitar devolução, conforme o Código de Defesa do Consumidor."
          }
        },
        {
          "@type": "Question",
          "name": "Como acompanho meu pedido?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enviamos o código de rastreamento por email logo após a postagem. Acompanhe em rastreamento.correios.com.br."
          }
        },
        {
          "@type": "Question",
          "name": "O livro está disponível em versão digital?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Disponível como eBook + Audiobook em Português (R$ 97), English e Español ($24.99 USD). Acesso imediato após o pagamento."
          }
        }
      ]
    }
  ]
}

// /o-livro: o livro em português + trilha de navegação
export const jsonLdOLivro = {
  "@context": "https://schema.org",
  "@graph": [
    jsonLdPt["@graph"].find((n) => n["@type"] === "Book"),
    jsonLdPt["@graph"].find((n) => n["@type"] === "Person"),
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": SITE },
      { "@type": "ListItem", "position": 2, "name": "O Livro", "item": SITE + "/o-livro" },
    ] },
  ],
}

// /sobre: página de perfil do autor
export const jsonLdSobre = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": SITE + "/sobre#page",
      "url": SITE + "/sobre",
      "inLanguage": "pt-BR",
      "name": "Sobre Gilberto de Souza",
      "mainEntity": { "@id": SITE + "/#gilberto" },
    },
    {
      ...jsonLdPt["@graph"].find((n) => n["@type"] === "Person"),
      "description": "Gilberto de Souza nasceu no Brasil e vive há 23 anos nos Estados Unidos, onde fundou uma empresa de construção de casas. Escreveu Como Vencer a Dor de Ser Trocado Por Outro depois de passar pela traição.",
      "knowsLanguage": ["pt-BR", "en", "es"],
      "subjectOf": [{ "@id": SITE + "/#livro" }, { "@id": SITE + "/en#book" }],
    },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": SITE },
      { "@type": "ListItem", "position": 2, "name": "Sobre", "item": SITE + "/sobre" },
    ] },
  ],
}
