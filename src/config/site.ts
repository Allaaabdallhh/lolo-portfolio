import { profile } from "@/data/profile"

export const site = {
  name: profile.name,
  title: `${profile.name} | Engineering Portfolio`,
  description: `Engineering graduate, ${profile.institution}, Class of ${profile.graduationYear}.`,
  locale: "en",
  themeColor: "#FCF9F7",
} as const
