import { LoloSocials } from "@/components/layout/LoloSocials"
import { lolo, type LoloLocale } from "@/i18n/lolo"

const email = process.env.LOLO_PREVIEW_EMAIL
const phone = process.env.LOLO_PREVIEW_PHONE

export function ContactDetails({
  locale,
  primary = false,
}: {
  locale: LoloLocale
  primary?: boolean
}) {
  if (process.env.NODE_ENV !== "development") return null
  return (
    <>
      <div className="lolo-contact-lines">
        {email && (
          <a
            className={primary ? "lolo-cv" : undefined}
            href={`mailto:${email}`}
          >
            {email}
          </a>
        )}
        {phone && <a href={`tel:${phone}`}>{phone}</a>}
      </div>
      <LoloSocials label={lolo[locale].footer.socials} />
    </>
  )
}
