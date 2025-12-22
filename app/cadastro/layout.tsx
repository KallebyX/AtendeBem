import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://atendebem.com.br'

export const metadata: Metadata = {
  title: "Criar Conta Grátis - Comece Agora",
  description: "Crie sua conta gratuita no AtendeBem. Sistema médico completo com receitas digitais ICP-Brasil, códigos TUSS, CID-10/11 e banco de medicamentos RENAME. Setup em 2 minutos.",
  keywords: [
    "criar conta sistema médico",
    "cadastro AtendeBem",
    "registro médico online",
    "sistema médico gratuito",
    "cadastro prontuário eletrônico",
    "começar sistema saúde",
    "criar conta médico",
    "registro consultório online",
  ],
  alternates: {
    canonical: `${baseUrl}/cadastro`,
  },
  openGraph: {
    title: "Criar Conta Grátis - AtendeBem Sistema Médico",
    description: "Crie sua conta gratuita e comece a usar o sistema médico completo com TUSS, CID, receitas digitais e muito mais. Setup em 2 minutos.",
    url: `${baseUrl}/cadastro`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AtendeBem - Criar Conta Grátis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Criar Conta Grátis - AtendeBem",
    description: "Sistema médico completo com receitas digitais, TUSS, CID e muito mais. Comece grátis agora!",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// JSON-LD for registration page
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Criar Conta - AtendeBem',
  description: 'Página de registro para criar conta no AtendeBem',
  url: `${baseUrl}/cadastro`,
  mainEntity: {
    '@type': 'Product',
    name: 'AtendeBem Sistema Médico',
    description: 'Sistema médico completo para registro de atendimentos',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      description: 'Teste gratuito disponível',
    },
  },
}

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
