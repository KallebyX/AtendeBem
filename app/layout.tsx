import type React from "react"
import type { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"

import { Inter } from 'next/font/google'

// Initialize font with display swap for better performance
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

// Base URL for SEO
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://atendebem.com.br'

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "AtendeBem - Sistema Médico Completo | Menos Burocracia, Mais Medicina",
    template: "%s | AtendeBem - Sistema Médico"
  },
  description: "Sistema médico completo com TUSS, CID-10/11, receitas digitais com assinatura ICP-Brasil, prescrições digitais, banco de medicamentos RENAME e exportação profissional em PDF e Excel. Reduza 70% do tempo com documentação.",

  // SEO Keywords
  keywords: [
    // Primary keywords
    "sistema médico",
    "software médico",
    "prontuário eletrônico",
    "receita digital",
    "prescrição digital",
    "atendimento médico",
    // TUSS related
    "códigos TUSS",
    "tabela TUSS",
    "TUSS procedimentos",
    "busca TUSS",
    // CID related
    "CID-10",
    "CID-11",
    "classificação doenças",
    // Certification
    "assinatura digital médica",
    "ICP-Brasil",
    "certificado digital médico",
    "receita digital certificada",
    // Medical business
    "gestão clínica",
    "gestão consultório",
    "faturamento médico",
    "guias TISS",
    "convênios médicos",
    // Location
    "sistema médico Brasil",
    "software saúde Brasil",
    // Features
    "RENAME medicamentos",
    "exportação PDF médico",
    "documentação médica",
    "registro atendimentos",
    // Long tail
    "sistema para médicos",
    "software para consultório médico",
    "plataforma médica online",
    "SaaS médico",
    "sistema saúde digital",
  ],

  // Authors and creator
  authors: [
    { name: "Oryum Tech", url: "https://oryum.tech" }
  ],
  creator: "Oryum Tech",
  publisher: "Oryum Tech",

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical URL
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },

  // Open Graph for Facebook, LinkedIn, WhatsApp
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: 'AtendeBem',
    title: 'AtendeBem - Sistema Médico Completo | Menos Burocracia, Mais Medicina',
    description: 'Plataforma SaaS médica com TUSS, CID-10/11, receitas digitais certificadas ICP-Brasil, prescrições e exportação profissional. Reduza 70% do tempo com documentação.',
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'AtendeBem - Sistema Médico Completo',
        type: 'image/jpeg',
      },
      {
        url: `${baseUrl}/images/hero.jpeg`,
        width: 600,
        height: 400,
        alt: 'AtendeBem Interface do Sistema',
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'AtendeBem - Sistema Médico Completo',
    description: 'Plataforma SaaS médica com TUSS, CID-10/11, receitas digitais certificadas ICP-Brasil. Reduza 70% do tempo com documentação.',
    images: [`${baseUrl}/images/og-image.jpg`],
    creator: '@atendebem',
    site: '@atendebem',
  },

  // Icons
  icons: {
    icon: [
      { url: '/images/icone.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/icone.jpeg', sizes: '192x192', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/icone.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/images/icone.jpeg',
  },

  // Manifest for PWA
  manifest: '/manifest.json',

  // App specific
  applicationName: 'AtendeBem',
  category: 'Medical Software',
  classification: 'Healthcare, Medical, SaaS',

  // Verification (add your actual verification codes)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    // yandex: 'yandex-verification-code',
    // bing: 'bing-verification-code',
  },

  // Other
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // App links
  appLinks: {
    web: {
      url: baseUrl,
      should_fallback: true,
    },
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organization
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'AtendeBem',
      alternateName: 'AtendeBem Sistema Médico',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.jpeg`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://www.linkedin.com/company/atendebem',
        'https://www.instagram.com/atendebem',
        'https://twitter.com/atendebem',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Portuguese'],
      },
      founder: {
        '@type': 'Organization',
        name: 'Oryum Tech',
      },
    },
    // WebSite with SearchAction
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'AtendeBem',
      description: 'Sistema médico completo com TUSS, CID-10/11, receitas digitais certificadas ICP-Brasil',
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
      inLanguage: 'pt-BR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/dashboard?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    // SoftwareApplication
    {
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}/#software`,
      name: 'AtendeBem',
      applicationCategory: 'HealthApplication',
      applicationSubCategory: 'Medical Practice Management',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
        description: 'Teste gratuito disponível',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '150',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Códigos TUSS completos com busca inteligente',
        'CID-10 e CID-11 atualizados',
        'Receitas digitais com assinatura ICP-Brasil',
        'Banco de medicamentos RENAME',
        'Exportação em PDF e Excel',
        'Conformidade com padrões ANS/TISS',
        'Assistente de IA integrado',
      ],
      screenshot: `${baseUrl}/images/hero.jpeg`,
    },
    // WebPage
    {
      '@type': 'WebPage',
      '@id': `${baseUrl}/#webpage`,
      url: baseUrl,
      name: 'AtendeBem - Sistema Médico Completo | Menos Burocracia, Mais Medicina',
      description: 'Plataforma SaaS médica com TUSS, CID-10/11, receitas digitais certificadas ICP-Brasil, prescrições e exportação profissional.',
      isPartOf: {
        '@id': `${baseUrl}/#website`,
      },
      about: {
        '@id': `${baseUrl}/#software`,
      },
      inLanguage: 'pt-BR',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/hero.jpeg`,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
        ],
      },
    },
    // FAQ Schema
    {
      '@type': 'FAQPage',
      '@id': `${baseUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é o AtendeBem?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AtendeBem é uma plataforma SaaS médica completa que oferece registro de atendimentos com códigos TUSS, receitas digitais com assinatura ICP-Brasil, CID-10/11, banco de medicamentos RENAME e exportação profissional em PDF e Excel.',
          },
        },
        {
          '@type': 'Question',
          name: 'O AtendeBem possui receita digital com assinatura ICP-Brasil?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim, o AtendeBem oferece prescrição digital com assinatura ICP-Brasil (e-CPF/e-CNPJ), QR Code de validação pública e conformidade total com as normas do CFM e ANS.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quais códigos estão disponíveis no sistema?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O AtendeBem possui base completa de mais de 10.000 códigos TUSS para consultas, procedimentos e exames, além de CID-10 e CID-11 atualizados e banco de medicamentos RENAME 2024/2025.',
          },
        },
        {
          '@type': 'Question',
          name: 'O sistema está em conformidade com a LGPD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim, o AtendeBem é 100% conforme com a LGPD, com dados criptografados, rastreabilidade completa e todas as medidas de segurança necessárias para proteção de dados de saúde.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quanto tempo levo para começar a usar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O setup do AtendeBem leva apenas 2 minutos. A interface é intuitiva e não requer treinamento, permitindo que você comece a registrar atendimentos imediatamente.',
          },
        },
      ],
    },
    // Service Schema
    {
      '@type': 'Service',
      '@id': `${baseUrl}/#service`,
      name: 'AtendeBem - Sistema Médico',
      serviceType: 'Medical Practice Management Software',
      provider: {
        '@id': `${baseUrl}/#organization`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brazil',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planos AtendeBem',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AtendeBem Starter',
              description: 'Plano inicial para médicos individuais',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AtendeBem Pro',
              description: 'Plano profissional para clínicas',
            },
          },
        ],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        {/* Canonical */}
        <link rel="canonical" href={baseUrl} />

        {/* Alternate languages */}
        <link rel="alternate" hrefLang="pt-BR" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="BR" />
        <meta name="geo.country" content="BR" />
        <meta name="language" content="Portuguese" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AtendeBem" />
        <meta name="msapplication-TileColor" content="#0066cc" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-right" richColors closeButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
