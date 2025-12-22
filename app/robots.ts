import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://atendebem.com.br'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/login', '/cadastro'],
        disallow: [
          '/dashboard',
          '/api/',
          '/admin/',
          '/crm/',
          '/financeiro/',
          '/configuracoes/',
          '/atendimento/',
          '/pacientes/',
          '/faturamento/',
          '/relatorios/',
          '/assinatura/',
          '/contrato/',
          '/agendamentos/',
          '/agenda/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
