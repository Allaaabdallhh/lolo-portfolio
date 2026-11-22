export const loloSectionOrder = {
  top: "01",
  about: "02",
  education: "03",
  skills: "04",
  projects: "05",
  certificates: "06",
  focus: "07",
  graduation: "08",
  contact: "09",
  footer: "10",
} as const

export type LoloSectionId = keyof typeof loloSectionOrder
export type LoloSectionNumber = (typeof loloSectionOrder)[LoloSectionId]

export const loloNavigation = [
  "top",
  "about",
  "education",
  "skills",
  "projects",
  "certificates",
  "focus",
  "graduation",
  "contact",
] as const
