import type { ReactNode } from "react"
import LoloDocument from "@/components/layout/LoloDocument"

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <LoloDocument locale="en">{children}</LoloDocument>
}
