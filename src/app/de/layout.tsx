import type { ReactNode } from "react"
import LoloDocument from "@/components/layout/LoloDocument"

export default function GermanLayout({ children }: { children: ReactNode }) {
  return <LoloDocument locale="de">{children}</LoloDocument>
}
