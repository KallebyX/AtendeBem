/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.app.github.dev',
        '*.github.dev',
        '*.githubpreview.dev',
        'atendebem.io',
        'www.atendebem.io',
        'atendebem.com.br',
        'www.atendebem.com.br',
        ...(process.env.VERCEL_URL ? [process.env.VERCEL_URL] : []),
        ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
      ],
    },
  },
}

export default nextConfig
