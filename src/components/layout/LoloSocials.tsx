import Image from "next/image"
import { socialLinks } from "@/data/social"

export function LoloSocials({ label }: { label: string }) {
  if (process.env.NODE_ENV !== "development" || socialLinks.length === 0)
    return null

  return (
    <ul className="lolo-socials" aria-label={label}>
      {socialLinks.map(({ label: name, icon, url }) => (
        <li key={name}>
          <a
            aria-label={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`/brand/${icon}.svg`}
              unoptimized
              alt=""
              width={24}
              height={24}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
