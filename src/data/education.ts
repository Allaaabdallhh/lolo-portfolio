type Chapter = {
  id: "primary" | "preparatory" | "secondary" | "academy"
  order: 1 | 2 | 3 | 4
  institutionArabic: string
  image: `/images/about/${string}.webp`
  width: number
  height: number
  graduationYear?: 2025
}

export const education = [
  {
    id: "primary",
    order: 1,
    institutionArabic: "مدرسة القناة الابتدائية المشتركة",
    image: "/images/about/primary-al-qanah.webp",
    width: 1440,
    height: 810,
  },
  {
    id: "preparatory",
    order: 2,
    institutionArabic: "مدرسة السويس الإعدادية الحديثة بنات",
    image: "/images/about/preparatory-modern-girls.webp",
    width: 1600,
    height: 961,
  },
  {
    id: "secondary",
    order: 3,
    institutionArabic: "مدرسة السويس الثانوية بنات",
    image: "/images/about/secondary-suez-girls.webp",
    width: 526,
    height: 701,
  },
  {
    id: "academy",
    order: 4,
    institutionArabic: "أكاديمية الشروق",
    image: "/images/about/shorouk-academy-reference.webp",
    width: 510,
    height: 392,
    graduationYear: 2025,
  },
] as const satisfies readonly Chapter[]

export type EducationChapterId = (typeof education)[number]["id"]
