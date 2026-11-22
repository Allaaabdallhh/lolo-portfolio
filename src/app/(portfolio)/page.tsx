import {
  LoloHome,
  loloMetadata,
  loloViewport,
} from "@/components/sections/hero/LoloHome"

export const metadata = loloMetadata("en")
export const viewport = loloViewport

export default function EnglishHome() {
  return <LoloHome locale="en" />
}
