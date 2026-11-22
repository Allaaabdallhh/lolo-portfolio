const channels = [
  {
    label: "WhatsApp",
    icon: "whatsapp",
    url: process.env.LOLO_PREVIEW_WHATSAPP,
  },
  {
    label: "Instagram",
    icon: "instagram",
    url: process.env.LOLO_PREVIEW_INSTAGRAM,
  },
  { label: "TikTok", icon: "tiktok", url: process.env.LOLO_PREVIEW_TIKTOK },
  {
    label: "Facebook",
    icon: "facebook",
    url: process.env.LOLO_PREVIEW_FACEBOOK,
  },
]

export const socialLinks = channels.flatMap(({ label, icon, url }) =>
  url?.startsWith("https://") ? [{ label, icon, url }] : [],
)
