import Image from "next/image"
import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { education } from "@/data/education"
import { graduationCopy } from "@/i18n/lolo-focus-graduation"
import { storyCopy } from "@/i18n/lolo-story"
import type { LoloLocale } from "@/i18n/lolo"

export function GraduationStorySection({ locale }: { locale: LoloLocale }) {
  const copy = graduationCopy[locale]
  const { chapters } = storyCopy[locale].education

  return (
    <section
      id="graduation"
      className="lolo-graduation-section"
      aria-labelledby="graduation-heading"
    >
      <div className="lolo-wrap lolo-graduation-inner">
        <SectionIndex
          number={loloSectionOrder.graduation}
          label={copy.index}
          headingId="graduation-heading"
        />
        <article className="lolo-graduation-feature">
          <div className="lolo-graduation-main">
            <div className="lolo-graduation-lead">
              <p className="lolo-graduation-label">{copy.milestone}</p>
              <h2 id="graduation-heading">{copy.title}</h2>
              <p className="lolo-graduation-summary">{copy.summary}</p>
            </div>
            <div className="lolo-graduation-year" aria-hidden="true">
              {copy.year}
            </div>
          </div>
          <ol
            className="lolo-graduation-path"
            role="list"
            aria-label={copy.path}
          >
            {education.map((entry) => {
              const chapter = chapters[entry.id]
              return (
                <li key={entry.id} data-final={entry.id === "academy"}>
                  <div className="lolo-graduation-path-visual">
                    {entry.id === "academy" ? (
                      <span
                        className="lolo-graduation-end-year"
                        aria-hidden="true"
                      >
                        {copy.year}
                      </span>
                    ) : (
                      <Image
                        src={entry.image}
                        alt={chapter.alt}
                        fill
                        sizes="(max-width: 510px) 45vw, (max-width: 760px) 39vw, 23vw"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <span className="lolo-graduation-node">
                    {String(entry.order).padStart(2, "0")} / {chapter.stage}
                  </span>
                  <h3>{chapter.institution}</h3>
                </li>
              )
            })}
          </ol>
          <div className="lolo-graduation-end">
            <p>{copy.closing}</p>
            <a className="lolo-story-cta" href="#certificates">
              {copy.cta}
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
