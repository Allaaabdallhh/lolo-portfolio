"use client"

import Image from "next/image"
import { Award, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { useState } from "react"
import type { lolo } from "@/i18n/lolo"

type Asset = { src: string; width: number; height: number }

export function CertificateCard({ index, title, issuer, kind, date, dateLabel, note, thumbnail, document, copy, closeLabel }: {
  index: number
  title: string
  issuer: string
  kind: string
  date: string
  dateLabel: string
  note: string
  thumbnail?: Asset
  document?: Asset
  copy: (typeof lolo)["en"]["certificates"] | (typeof lolo)["de"]["certificates"]
  closeLabel: string
}) {
  const [zoomed, setZoomed] = useState(false)
  return (
    <article className="lolo-certificate">
      <Dialog.Root onOpenChange={(open) => { if (!open) setZoomed(false) }}>
        <div className="lolo-certificate-image">
          {thumbnail ? <Image {...thumbnail} unoptimized alt="" loading="lazy" /> : <Award size={52} aria-hidden="true" />}
        </div>
        <div className="lolo-certificate-copy">
          <p className="lolo-certificate-type"><span aria-hidden="true">CERT / {String(index).padStart(2, "0")} · </span>{kind}</p>
          <h3>{title}</h3>
          <p>{issuer}</p>
          <p>{date}</p>
          <Dialog.Trigger className="lolo-certificate-open" aria-label={`${copy.open} · ${title}`}>
            {copy.open}
          </Dialog.Trigger>
        </div>
        <Dialog.Portal>
          <Dialog.Overlay className="lolo-viewer-overlay" />
          <Dialog.Content className="lolo-viewer lolo-certificate-viewer" data-document={Boolean(document)}>
            <div className="lolo-viewer-head">
              <div>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>{note}</Dialog.Description>
              </div>
              <Dialog.Close className="lolo-viewer-close" aria-label={closeLabel}><X size={21} aria-hidden="true" /></Dialog.Close>
            </div>
            <dl className="lolo-viewer-meta">
              <div><dt>{copy.issuer}</dt><dd>{issuer}</dd></div>
              <div><dt>{dateLabel}</dt><dd>{date}</dd></div>
              <div><dt>{copy.type}</dt><dd>{kind}</dd></div>
            </dl>
            {document ? (
              <>
                <div className="lolo-viewer-tools">
                  <button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>{zoomed ? copy.fit : copy.zoom}</button>
                  <a href={document.src} target="_blank" rel="noopener noreferrer">{copy.original}</a>
                </div>
                <div className="lolo-viewer-image" role="region" aria-label={copy.imageLabel} tabIndex={zoomed ? 0 : undefined} data-zoomed={zoomed}>
                  <Image {...document} unoptimized alt={`${copy.imageLabel} · ${title}`} />
                </div>
              </>
            ) : <p className="lolo-viewer-placeholder">{copy.missing}</p>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </article>
  )
}
