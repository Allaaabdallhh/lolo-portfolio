import { SectionIndex } from "@/components/layout/SectionIndex"
import { loloSectionOrder } from "@/config/lolo-sections"
import { storyCopy } from "@/i18n/lolo-story"
import { certificates, countCompletedCertificates } from "@/data/certificates"
import { lolo, type LoloLocale } from "@/i18n/lolo"
import { findGiftMaterial } from "@/lib/lolo-material"
import { CertificateCard } from "./CertificateCard"

export function CertificatesSection({ locale }: { locale: LoloLocale }) {
  const { certificates: copy } = lolo[locale]
  const dates = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" })
  return (
    <section id="certificates" className="lolo-certificates" aria-labelledby="certificates-title">
      <div className="lolo-wrap lolo-certificates-inner">
        <SectionIndex number={loloSectionOrder.certificates} label={storyCopy[locale].index.certificates} headingId="certificates-title" />
        <div className="lolo-certificates-heading">
          <h2 id="certificates-title">{copy.title}</h2>
          <div>
            <p>{copy.intro}</p>
            <p className="lolo-certificate-count">{String(countCompletedCertificates()).padStart(2, "0")} / {storyCopy[locale].stats.credentials}</p>
          </div>
        </div>
        <div className="lolo-certificate-grid">
          {certificates.map((item, index) => {
            const course = item.kind === "course"
            const thumbKey = `${item.id}-thumb`
            return <CertificateCard
              key={item.id}
              index={index + 1}
              title={item.title}
              issuer={item.issuer}
              kind={copy[item.kind]}
              date={course ? dates.format(new Date(item.date)) : dates.formatRange(new Date(item.from), new Date(item.to))}
              dateLabel={course ? copy.issued : copy.duration}
              note={course ? copy.courseNote : copy.attendanceNote}
              thumbnail={findGiftMaterial(thumbKey) ? { src: `/gift-material/${thumbKey}`, ...item.preview } : undefined}
              document={findGiftMaterial(item.id) ? { src: `/gift-material/${item.id}`, ...item.full } : undefined}
              copy={copy}
              closeLabel={copy.close}
            />
          })}
        </div>
      </div>
    </section>
  )
}
