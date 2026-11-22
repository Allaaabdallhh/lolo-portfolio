import { PreviewPortrait } from "@/components/layout/PreviewPortrait"
import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import type { LoloLocale } from "@/i18n/lolo"
import { storyCopy } from "@/i18n/lolo-story"
import { hasPreviewImage } from "@/lib/lolo-preview-image"
import { ContactDetails } from "./ContactDetails"

export function ContactSection({ locale }: { locale: LoloLocale }) {
  const { index, contact } = storyCopy[locale]
  const portrait = hasPreviewImage("alaa-contact")
  return (
    <section
      id="contact"
      className="lolo-contact"
      aria-labelledby="contact-heading"
    >
      <div className="lolo-wrap lolo-contact-inner">
        <SectionIndex
          number={loloSectionOrder.contact}
          label={index.contact}
          headingId="contact-heading"
        />
        <div className="lolo-contact-layout" data-portrait={portrait}>
          <div className="lolo-contact-copy">
            <h2 id="contact-heading">{contact.title}</h2>
            <p>{contact.intro}</p>
            {process.env.NODE_ENV === "development" && (
              <ContactDetails locale={locale} primary />
            )}
          </div>
          {portrait && (
            <PreviewPortrait
              className="lolo-contact-portrait"
              src="/images/contact/alaa-contact.webp"
              width={793}
              height={1043}
              sizes="(max-width: 767px) min(92vw, 440px), 400px"
              alt={contact.portrait}
            />
          )}
        </div>
      </div>
    </section>
  )
}
