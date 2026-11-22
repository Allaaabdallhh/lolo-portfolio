import Image from "next/image"
import { BuildStack } from "./BuildStack"
import { hasPreviewImage } from "@/lib/lolo-preview-image"
import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { storyCopy } from "@/i18n/lolo-story"
import { workCopy } from "@/i18n/lolo-work"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { ContactDetails } from "@/components/sections/contact/ContactDetails"
import { lolo, type LoloLocale } from "@/i18n/lolo"
import { focusCopy, graduationCopy } from "@/i18n/lolo-focus-graduation"

export function LoloFooter({ locale }: { locale: LoloLocale }) {
  const copy = lolo[locale]
  const preview = process.env.NODE_ENV === "development"
  const portrait = hasPreviewImage("phase-03-portrait")
  const english = locale === "en"
  return (
    <footer id="footer" className="lolo-footer">
      <div className="lolo-wrap lolo-footer-inner">
        <SectionIndex
          number={loloSectionOrder.footer}
          label={storyCopy[locale].index.footer}
          headingId="footer-heading"
        />
        <div className="lolo-footer-endframe" data-portrait={portrait}>
          <div className="lolo-footer-brand">
            <a
              className="lolo-signature-mark"
              href="#top"
              aria-label={`LOLO · ${copy.home}`}
            >
              <BrandLogo variant="accent" label="" />
            </a>
            <h2 id="footer-heading">{copy.footer.title}</h2>
            <p>{copy.footer.closing}</p>
          </div>
          {portrait && (
            <Image
              className="lolo-footer-portrait"
              src="/images/footer/alaa-white-portrait.webp"
              width={481}
              height={832}
              unoptimized
              alt={
                english ? "Alaa in a white suit" : "Alaa in einem weißen Anzug"
              }
            />
          )}
        </div>
        {preview && (
          <div className="lolo-footer-contact">
            <h3>{copy.footer.contact}</h3>
            <ContactDetails locale={locale} />
          </div>
        )}
        <BuildStack
          label={english ? "Built with" : "Erstellt mit"}
          pause={english ? "Pause technology strip" : "Technik-Leiste anhalten"}
          resume={
            english ? "Resume technology strip" : "Technik-Leiste fortsetzen"
          }
        />
        <div className="lolo-footer-bottom">
          <p>© {new Date().getFullYear()} Alaa Abdallah</p>
          <nav aria-label={copy.footer.navigation}>
            <a href="#top">{copy.home}</a>
            <a href="#about">{copy.about.nav}</a>
            <a href="#education">{storyCopy[locale].education.nav}</a>
            <a href="#skills">{workCopy[locale].skills.nav}</a>
            <a href="#projects">{workCopy[locale].projects.nav}</a>
            <a href="#certificates">{copy.certificates.nav}</a>
            <a href="#focus">{focusCopy[locale].nav}</a>
            <a href="#graduation">{graduationCopy[locale].nav}</a>
            <a href="#contact">{storyCopy[locale].index.contact}</a>
          </nav>
          <p>{copy.location}</p>
        </div>
      </div>
    </footer>
  )
}
