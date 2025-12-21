import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AtendeBem - Menos burocracia. Mais medicina.",
  description: "Plataforma web que transforma atendimentos médicos em registros rápidos, corretos e sem burocracia.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/icone.jpeg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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
