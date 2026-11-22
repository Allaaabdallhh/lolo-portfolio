export interface PortfolioImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Profile {
  name: string
  discipline: string
  institution: string
  graduationYear: number
  bio?: string
  portrait?: PortfolioImage
}

export interface Education {
  id: string
  title: string
  institution: string
  startYear?: number
  endYear?: number
  description?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  description?: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  technologies: readonly string[]
  image?: PortfolioImage
  url?: string
}

type CertificateBase = {
  id: string
  title: string
  issuer: string
}

export type Certificate =
  | (CertificateBase & {
      status: "completed"
      awardedOn: string
      image?: PortfolioImage
      verificationUrl?: string
    })
  | (CertificateBase & { status: "in-progress" | "planned" })

export interface SocialLink {
  label: string
  url: string
}
