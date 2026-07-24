export const EMAIL_VISUAL_CONFIG = {
  tokens: {
    colors: {
      pageBg: '#F3F3F1',
      cardBg: '#FFFFFF',
      ink: '#2B2B2B',
      text: '#373737',
      muted: '#6E6E6E',
      soft: '#8A8A8A',
      border: '#E4E4E1',
      navy: '#17324D',
      blue: '#1D6FE8',
      blueHover: '#165BC1',
      gold: '#B89A5E',
      lightPanel: '#F8F8F7'
    },
    fonts: {
      headline: "Georgia, 'Times New Roman', serif",
      body: "Arial, Helvetica, sans-serif"
    },
    radius: {
      card: '0px',
      button: '4px',
      pill: '999px'
    },
    spacing: {
      outer: '24px',
      inner: '28px',
      heroGap: '20px',
      sectionGap: '22px'
    },
    layout: {
      maxWidth: 600
    }
  },

  assets: {
    author: {
      primary: '/email-assets/sequence/gilberto-perfil.jpeg'
    },

    books: {
      pt: '/books/pt/book-front.jpg',
      en: '/books/en/book-front.png',
      es: '/books/es/book-front.jpg'
    },

    banners: {
      lead: {
        1: '/email-assets/sequence/hero-01.jpeg',
        2: '/email-assets/sequence/hero-02.png',
        3: '/email-assets/sequence/hero-03.png',
        4: '/email-assets/sequence/hero-04.png',
        5: '/email-assets/sequence/hero-05.png',
        6: '/email-assets/sequence/hero-06.png',
        7: '/email-assets/sequence/hero-07.png',
        8: '/email-assets/sequence/hero-08.png',
        9: '/email-assets/sequence/hero-09.png',
        10: '/email-assets/sequence/hero-10.png',
        11: '/email-assets/sequence/hero-11.png',
        12: '/email-assets/sequence/hero-12.png',
        13: '/email-assets/sequence/hero-13.png',
        14: '/email-assets/sequence/hero-14.png',
        15: '/email-assets/sequence/hero-15.png'
      },

      manual: {
        1: '/email-assets/sequence/hero-12.png',
        2: '/email-assets/sequence/hero-07.png',
        3: '/email-assets/sequence/hero-03.png',
        4: '/email-assets/sequence/hero-14.png',
        5: '/email-assets/sequence/hero-05.png',
        6: '/email-assets/sequence/hero-09.png',
        7: '/email-assets/sequence/hero-02.png',
        8: '/email-assets/sequence/hero-13.png',
        9: '/email-assets/sequence/hero-08.png',
        10: '/email-assets/sequence/hero-15.png',
        11: '/email-assets/sequence/hero-04.png',
        12: '/email-assets/sequence/hero-10.png',
        13: '/email-assets/sequence/hero-06.png',
        14: '/email-assets/sequence/hero-11.png',
        15: '/email-assets/sequence/hero-01.jpeg'
      },

      checkout: {
        1: '/email-assets/email1-hero.jpeg',
        2: '/email-assets/sequence/hero-05.png',
        3: '/email-assets/sequence/hero-10.png',
        4: '/email-assets/sequence/hero-03.png',
        5: '/email-assets/sequence/hero-12.png',
        6: '/email-assets/sequence/hero-07.png',
        7: '/email-assets/sequence/hero-14.png',
        8: '/email-assets/email2-hero.png',
        9: '/email-assets/sequence/hero-09.png',
        10: '/email-assets/sequence/hero-13.png',
        11: '/email-assets/sequence/hero-04.png',
        12: '/email-assets/sequence/hero-06.png',
        13: '/email-assets/sequence/hero-11.png',
        14: '/email-assets/sequence/hero-15.png',
        15: '/email-assets/email3-hero.png'
      },

      customer: {
        1: '/email-assets/email3-hero.png',
        2: '/email-assets/email2-hero.png',
        3: '/email-assets/sequence/hero-04.png'
      }

    }
  },

  author: {
    name: 'Gilberto de Souza',
    role: {
      pt: 'Autor',
      en: 'Author',
      es: 'Autor'
    },
    siteLabel: {
      pt: 'Site oficial do autor',
      en: 'Official author website',
      es: 'Sitio oficial del autor'
    }
  },

  footer: {
    contactEmail: 'contato@gilberto-souza.com',
    website: 'https://www.gilberto-souza.com',
    instagram: 'https://www.instagram.com/',
    links: {
      privacy: {
        pt: 'https://www.gilberto-souza.com/politica-de-privacidade',
        en: 'https://www.gilberto-souza.com/en/privacy-policy',
        es: 'https://www.gilberto-souza.com/es/politica-de-privacidad'
      },
      terms: {
        pt: 'https://www.gilberto-souza.com/termos',
        en: 'https://www.gilberto-souza.com/en/terms',
        es: 'https://www.gilberto-souza.com/es/terminos'
      },
      contact: {
        pt: 'https://www.gilberto-souza.com/#contato',
        en: 'https://www.gilberto-souza.com/en#contact',
        es: 'https://www.gilberto-souza.com/es#contacto'
      }
    },
    copy: {
      pt: {
        why: 'Você recebeu este email porque se cadastrou no site oficial de Gilberto de Souza.',
        unsubscribe: 'Cancelar inscrição',
        preferences: 'Gerenciar preferências',
        privacy: 'Política de Privacidade',
        terms: 'Termos de Uso',
        contact: 'Contato',
        website: 'Site oficial',
        instagram: 'Instagram'
      },
      en: {
        why: 'You received this email because you registered on the official Gilberto de Souza website.',
        unsubscribe: 'Unsubscribe',
        preferences: 'Manage preferences',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        contact: 'Contact',
        website: 'Official website',
        instagram: 'Instagram'
      },
      es: {
        why: 'Recibiste este correo porque te registraste en el sitio oficial de Gilberto de Souza.',
        unsubscribe: 'Cancelar suscripción',
        preferences: 'Gestionar preferencias',
        privacy: 'Política de Privacidad',
        terms: 'Términos de Uso',
        contact: 'Contacto',
        website: 'Sitio oficial',
        instagram: 'Instagram'
      }
    }
  },

  stages: {
    lead: {
      kicker: {
        pt: 'Uma conversa sincera',
        en: 'A personal note',
        es: 'Una nota personal'
      },
      productTitle: {
        pt: 'eBook + Audiobook',
        en: 'eBook + Audiobook',
        es: 'eBook + Audiolibro'
      },
      productSubtitle: {
        pt: 'Um caminho para reconstrução emocional com clareza e direção.',
        en: 'A path to emotional rebuilding with clarity and direction.',
        es: 'Un camino de reconstrucción emocional con claridad y dirección.'
      },
      benefits: {
        pt: ['Acesso imediato', 'Leitura no seu ritmo', 'Escuta em áudio incluída'],
        en: ['Immediate access', 'Read at your own pace', 'Audiobook included'],
        es: ['Acceso inmediato', 'Lee a tu ritmo', 'Audiolibro incluido']
      },
      ctas: {
        pt: {
          default: 'Conhecer o livro',
          strong: 'Começar minha reconstrução'
        },
        en: {
          default: 'Discover the book',
          strong: 'Start rebuilding today'
        },
        es: {
          default: 'Conocer el libro',
          strong: 'Comenzar mi reconstrucción'
        }
      }
    },

    manual: {
      kicker: {
        pt: 'Reconstrução',
        en: 'Rebuilding',
        es: 'Reconstrucción'
      },
      productTitle: {
        pt: 'Seu próximo passo',
        en: 'Your next step',
        es: 'Tu siguiente paso'
      },
      productSubtitle: {
        pt: 'Transforme entendimento em mudança prática.',
        en: 'Turn understanding into daily change.',
        es: 'Convierte la comprensión en un cambio diario.'
      },
      benefits: {
        pt: ['Clareza emocional', 'Direção prática', 'Leitura e áudio'],
        en: ['Emotional clarity', 'Practical direction', 'Read or listen'],
        es: ['Claridad emocional', 'Dirección práctica', 'Lee o escucha']
      },
      ctas: {
        pt: {
          default: 'Começar agora',
          strong: 'Quero reconstruir'
        },
        en: {
          default: 'Start now',
          strong: 'I want to rebuild'
        },
        es: {
          default: 'Comenzar ahora',
          strong: 'Quiero reconstruirme'
        }
      }
    },

    checkout: {
      kicker: {
        pt: 'Seu acesso está quase liberado',
        en: 'Your access is almost ready',
        es: 'Tu acceso está casi listo'
      },
      productTitle: {
        pt: 'Complete sua compra',
        en: 'Complete your order',
        es: 'Completa tu compra'
      },
      productSubtitle: {
        pt: 'Finalize em segurança e receba acesso imediato.',
        en: 'Finish securely and get immediate access.',
        es: 'Finaliza con seguridad y recibe acceso inmediato.'
      },
      benefits: {
        pt: ['Checkout seguro', 'Acesso digital imediato', 'eBook + Audiobook'],
        en: ['Secure checkout', 'Immediate digital access', 'eBook + Audiobook'],
        es: ['Pago seguro', 'Acceso digital inmediato', 'eBook + Audiolibro']
      },
      ctas: {
        pt: {
          default: 'Completar minha compra',
          strong: 'Liberar meu acesso agora'
        },
        en: {
          default: 'Complete my order',
          strong: 'Get my access now'
        },
        es: {
          default: 'Completar mi compra',
          strong: 'Obtener mi acceso ahora'
        }
      }
    },

    customer: {
      kicker: {
        pt: 'Seu acesso foi liberado',
        en: 'Your access is ready',
        es: 'Tu acceso está listo'
      },
      productTitle: {
        pt: 'Bem-vindo ao seu material',
        en: 'Welcome to your material',
        es: 'Bienvenido a tu material'
      },
      productSubtitle: {
        pt: 'Acesse seu eBook + Audiobook e comece hoje.',
        en: 'Access your eBook + Audiobook and begin today.',
        es: 'Accede a tu eBook + Audiolibro y empieza hoy.'
      },
      benefits: {
        pt: ['Acesso imediato', 'Leitura e áudio', 'Acompanhe o autor'],
        en: ['Immediate access', 'Read and listen', 'Follow the author'],
        es: ['Acceso inmediato', 'Lee y escucha', 'Sigue al autor']
      },
      ctas: {
        pt: {
          access: 'Acessar meu eBook + Audiobook',
          follow: 'Seguir no Instagram'
        },
        en: {
          access: 'Access my eBook + Audiobook',
          follow: 'Follow on Instagram'
        },
        es: {
          access: 'Acceder a mi eBook + Audiolibro',
          follow: 'Seguir en Instagram'
        }
      }
    }
  }
}

export function pickEmailBanner(type = 'lead', emailNumber = 1) {
  const stage = EMAIL_VISUAL_CONFIG.assets.banners[type] || {}
  return stage[emailNumber] || null
}

export function getBookCover(language = 'pt') {
  const lang = ['pt', 'en', 'es'].includes(language) ? language : 'pt'
  return EMAIL_VISUAL_CONFIG.assets.books[lang]
}

export function getAuthorImage() {
  return EMAIL_VISUAL_CONFIG.assets.author.primary
}

export function getStageVisual(type = 'lead') {
  return EMAIL_VISUAL_CONFIG.stages[type] || EMAIL_VISUAL_CONFIG.stages.lead
}
