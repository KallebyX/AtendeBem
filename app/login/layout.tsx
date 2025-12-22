import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://atendebem.com.br'

export const metadata: Metadata = {
  title: "Login - Acesse sua Conta",
  description: "Faça login no AtendeBem e acesse seu sistema médico completo. Gerencie atendimentos, receitas digitais com ICP-Brasil, códigos TUSS e muito mais.",
  keywords: [
    "login sistema médico",
    "acesso AtendeBem",
    "entrar sistema saúde",
    "login prontuário eletrônico",
    "acesso médico online",
  ],
  alternates: {
    canonical: `${baseUrl}/login`,
  },
  openGraph: {
    title: "Login - AtendeBem Sistema Médico",
    description: "Faça login no AtendeBem e acesse seu sistema médico completo com TUSS, CID e receitas digitais.",
    url: `${baseUrl}/login`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AtendeBem Login",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Login - AtendeBem Sistema Médico",
    description: "Faça login no AtendeBem e acesse seu sistema médico completo.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
