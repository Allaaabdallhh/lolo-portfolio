import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { education } from "@/data/education"
import { lolo, type LoloLocale } from "@/i18n/lolo"
import { storyCopy } from "@/i18n/lolo-story"
import { EducationPhoto } from "./EducationPhoto"
import { TimelineMotion } from "./TimelineMotion"

export function EducationJourney({ locale }: { locale: LoloLocale }) {
  const story = storyCopy[locale]
  const copy = story.education
  return (
    <section
      id="education"
      className="lolo-education"
      aria-labelledby="education-heading"
    >
      <div className="lolo-wrap lolo-education-inner">
        <SectionIndex
          number={loloSectionOrder.education}
          label={story.index.education}
          headingId="education-heading"
        />
        <header className="lolo-education-header">
          <h2 id="education-heading">{copy.title}</h2>
          <p>{copy.intro}</p>
          <a className="lolo-about-next" href="#about">
            {loloSectionOrder.about} / {story.index.about}
          </a>
        </header>
        <TimelineMotion>
          <ol className="lolo-chapters" role="list">
            {education.map((item) => {
              const chapter = copy.chapters[item.id]
              const academy = item.id === "academy"
              return (
                <li key={item.id} className="lolo-chapter" data-final={academy}>
                  {academy && process.env.NODE_ENV === "development" && (
                    <aside className="lolo-quote-pending">
                      {copy.quotePending}
                    </aside>
                  )}
                  <span className="lolo-checkpoint" aria-hidden="true">
                    {String(item.order).padStart(2, "0")}
                  </span>
                  <EducationPhoto
                    id={item.id}
                    src={item.image}
                    alt={chapter.alt}
                    width={item.width}
                    height={item.height}
                    title={chapter.institution}
                    open={copy.openPhoto}
                    close={lolo[locale].close}
                    note={academy ? copy.graphicNote : undefined}
                  />
                  <div className="lolo-chapter-copy">
                    <p className="lolo-chapter-stage">
                      {String(item.order).padStart(2, "0")} · {chapter.stage}
                    </p>
                    <h3>{chapter.chapter}</h3>
                    <p className="lolo-institution">{chapter.institution}</p>
                    <p className="lolo-institution-ar" dir="rtl" lang="ar">
                      {item.institutionArabic}
                    </p>
                    {"description" in chapter && (
                      <p className="lolo-chapter-description">
                        {chapter.description}
                      </p>
                    )}
                    {academy && (
                      <span className="lolo-chapter-year">
                        {lolo[locale].year}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </TimelineMotion>
      </div>
    </section>
  )
}
