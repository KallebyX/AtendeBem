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
        '*.atendebem.io',
        'atendebem.com.br',
        'www.atendebem.com.br',
        '*.atendebem.com.br',
        '*.vercel.app',
      ],
    },
  },
}

export default nextConfig
