import {
  LoloHome,
  loloMetadata,
  loloViewport,
} from "@/components/sections/hero/LoloHome"

export const metadata = loloMetadata("de")
export const viewport = loloViewport

export default function GermanHome() {
  return <LoloHome locale="de" />
}
