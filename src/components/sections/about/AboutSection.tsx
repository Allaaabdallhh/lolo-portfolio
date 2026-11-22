import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { countCompletedCertificates } from "@/data/certificates"
import { lolo, type LoloLocale } from "@/i18n/lolo"
import { storyCopy } from "@/i18n/lolo-story"
import { hasPreviewImage } from "@/lib/lolo-preview-image"
import { readPrivateProfile } from "@/lib/lolo-private-profile"
import { AboutPortrait } from "./AboutPortrait"
import { LifeMilestoneStats } from "./LifeMilestoneStats"

export function AboutSection({ locale }: { locale: LoloLocale }) {
  const { year, location } = lolo[locale]
  const story = storyCopy[locale]
  const { about } = story
  const privateProfile = readPrivateProfile()
  const portrait = hasPreviewImage("alaa-contact")

  return (
    <section
      id="about"
      className="lolo-about lolo-editorial-about"
      aria-labelledby="about-heading"
    >
      <div className="lolo-wrap lolo-editorial-inner">
        <SectionIndex
          number={loloSectionOrder.about}
          label={story.index.about}
          headingId="about-heading"
        />
        <div className="lolo-editorial-layout" data-portrait={portrait}>
          <div className="lolo-editorial-copy">
            <header>
              <p className="lolo-editorial-kicker">{about.lead}</p>
              <h2 id="about-heading">{about.title}</h2>
            </header>
            <div className="lolo-biography">
              <p>{about.bio}</p>
              <p>{about.practice}</p>
              <ul
                className="lolo-about-facts"
                aria-label={lolo[locale].about.tools}
              >
                {[
                  about.graduate,
                  year,
                  location,
                  about.academy,
                  about.projectFocus,
                ].map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
              <a className="lolo-about-next" href="#education">
                {loloSectionOrder.education} / {story.education.nav}
              </a>
            </div>
          </div>
          {portrait && <AboutPortrait alt={about.portrait} />}
          {privateProfile && (
            <LifeMilestoneStats
              locale={locale}
              birthDate={privateProfile.birthDate}
              credentials={countCompletedCertificates()}
            />
          )}
        </div>
      </div>
    </section>
  )
}
