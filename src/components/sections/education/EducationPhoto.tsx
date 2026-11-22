"use client"

import Image from "next/image"
import { Expand, X } from "lucide-react"
import { Dialog } from "radix-ui"

export function EducationPhoto({
  src,
  width,
  height,
  alt,
  title,
  close,
  open,
  note,
  id,
}: {
  src: string
  width: number
  height: number
  alt: string
  title: string
  close: string
  open: string
  note?: string
  id: string
}) {
  return (
    <figure
      className={`lolo-chapter-frame lolo-chapter-frame--${id}`}
      data-education-photo
    >
      <Dialog.Root>
        <Dialog.Trigger
          className="lolo-education-photo"
          aria-label={`${open} · ${title}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 530px) calc(100vw - 80px), 440px"
          />
          <span className="lolo-photo-expand" aria-hidden="true">
            <Expand size={17} />
          </span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="lolo-viewer-overlay" />
          <Dialog.Content
            className="lolo-viewer lolo-education-viewer"
            aria-describedby={undefined}
          >
            <div className="lolo-viewer-head">
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Close className="lolo-viewer-close" aria-label={close}>
                <X size={21} aria-hidden="true" />
              </Dialog.Close>
            </div>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 880px) 92vw, 820px"
            />
            {note && <p>{note}</p>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {note && <figcaption>{note}</figcaption>}
    </figure>
  )
}
