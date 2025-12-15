import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "full" | "icon"
  className?: string
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <Link href="/" className={className}>
        <Image src="/images/icone.jpeg" alt="AtendeBem" width={48} height={48} className="w-12 h-12" />
      </Link>
    )
  }

  return (
    <Link href="/" className={className}>
      <Image
        src="/images/logo.svg"
        alt="AtendeBem - Menos burocracia. Mais medicina."
        width={300}
        height={80}
        className="h-auto w-auto max-h-16"
        priority
      />
    </Link>
  )
}
