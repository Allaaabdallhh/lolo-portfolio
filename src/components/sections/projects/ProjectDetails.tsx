"use client"

import { X } from "lucide-react"
import { Dialog } from "radix-ui"
import type { ReactNode } from "react"

export function ProjectDetails({
  title,
  brief,
  open,
  close,
  children,
}: {
  title: string
  brief: string
  open: string
  close: string
  children: ReactNode
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="lolo-cv">{open}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="lolo-viewer-overlay" />
        <Dialog.Content className="lolo-viewer lolo-project-viewer">
          <div className="lolo-viewer-head">
            <div>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{brief}</Dialog.Description>
            </div>
            <Dialog.Close className="lolo-viewer-close" aria-label={close}>
              <X size={21} aria-hidden="true" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
