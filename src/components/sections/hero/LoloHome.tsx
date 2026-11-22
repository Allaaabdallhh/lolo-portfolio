import type { Metadata, Viewport } from "next"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { SectionIndex } from "@/components/layout/SectionIndex"
import { StoryBridge } from "@/components/layout/StoryBridge"
import { SkillsSection } from "@/components/sections/skills/SkillsSection"
import { FeaturedProjects } from "@/components/sections/projects/FeaturedProjects"
import { FocusAreasSection } from "@/components/sections/focus/FocusAreasSection"
import { GraduationStorySection } from "@/components/sections/graduation/GraduationStorySection"
import { workCopy } from "@/i18n/lolo-work"
import { EducationJourney } from "@/components/sections/education/EducationJourney"
import { loloSectionOrder } from "@/config/lolo-sections"
import { storyCopy } from "@/i18n/lolo-story"
import { LoloSocials } from "@/components/layout/LoloSocials"
import { Navbar } from "@/components/layout/Navbar"
import { LetterReveal } from "@/components/motion/LetterReveal"
import { AboutSection } from "@/components/sections/about/AboutSection"
import { CertificatesSection } from "@/components/sections/certificates/CertificatesSection"
import { ContactSection } from "@/components/sections/contact/ContactSection"
import { LoloFooter } from "@/components/sections/footer/LoloFooter"
import { CinematicLoader } from "@/components/sections/loader/CinematicLoader"
import { CairoTime } from "./CairoTime"
import { lolo, type LoloLocale } from "@/i18n/lolo"
import { findGiftMaterial } from "@/lib/lolo-material"
import { hasGiftPortrait } from "@/lib/lolo-portrait"

export function loloMetadata(locale: LoloLocale): Metadata {
  return {
    title: "Alaa Abdallah | LOLO",
    description: lolo[locale].description,
    robots: { index: false, follow: false },
    alternates: { languages: { en: "/", de: "/de" } },
    icons: { icon: "/brand/lolo-icon.svg" },
  }
}

export const loloViewport: Viewport = { themeColor: "#08080a" }

export function LoloHome({ locale }: { locale: LoloLocale }) {
  const copy = lolo[locale]
  const portraitAvailable = hasGiftPortrait()
  const story = storyCopy[locale]

  return (
    <CinematicLoader skipLabel={copy.skipIntro}>
      <a href="#main-content" className="lolo-skip">
        {copy.skipContent}
      </a>
      <Navbar locale={locale} cvAvailable={Boolean(findGiftMaterial("cv"))} />
      <main id="main-content" tabIndex={-1} className="lolo-main">
        <section
          id="top"
          className="lolo-hero lolo-navy-hero"
          aria-labelledby="hero-heading"
          data-has-portrait={portraitAvailable}
        >
          <div className="lolo-stage">
            <div className="lolo-stage-inner lolo-wrap">
              <div className="lolo-hero-edges" aria-hidden="true" />
              <div className="lolo-stage-meta" data-lolo-meta>
                <p className="lolo-greeting">
                  <CairoTime locale={locale} kind="greeting" />
                </p>
              </div>
              <SectionIndex
                number={loloSectionOrder.top}
                label={story.index.top}
                headingId="hero-heading"
              />
              <div className="lolo-composition">
                <div className="lolo-aura" aria-hidden="true" />
                {portraitAvailable && (
                  <div
                    className="lolo-portrait-halo"
                    data-lolo-halo
                    aria-hidden="true"
                  />
                )}
                <LetterReveal id="hero-heading" lines={["ALAA", "ABDALLAH"]} />
                {portraitAvailable && (
                  <>
                    <div className="lolo-portrait" data-lolo-parallax>
                      <div className="lolo-portrait-inner" data-lolo-portrait>
                        <Image
                          src="/gift-portrait"
                          alt={copy.portrait}
                          width={288}
                          height={732}
                          unoptimized
                          loading="eager"
                          fetchPriority="high"
                        />
                      </div>
                    </div>
                    <div className="lolo-name-outline" aria-hidden="true">
                      ABDALLAH
                    </div>
                  </>
                )}
                <div className="lolo-profile-panel" data-lolo-meta>
                  <p className="lolo-year">{copy.year}</p>
                  <p className="lolo-role">{copy.role}</p>
                  <p className="lolo-summary">{copy.summary}</p>
                  <p className="lolo-hero-profile-location">
                    <MapPin size={14} aria-hidden="true" />
                    {copy.location}
                  </p>
                  <div className="lolo-support">
                    <LoloSocials label={copy.socials} />
                    <CairoTime locale={locale} kind="clock" />
                    <div className="lolo-hero-actions">
                      <a className="lolo-story-cta" href="#about">
                        {story.heroLink}
                      </a>
                      <a className="lolo-story-cta" href="#projects">
                        {workCopy[locale].projects.nav}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <StoryBridge />
        <AboutSection locale={locale} />
        <EducationJourney locale={locale} />
        <SkillsSection locale={locale} />
        <FeaturedProjects locale={locale} />
        <CertificatesSection locale={locale} />
        <FocusAreasSection locale={locale} />
        <GraduationStorySection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <LoloFooter locale={locale} />
    </CinematicLoader>
  )
}
