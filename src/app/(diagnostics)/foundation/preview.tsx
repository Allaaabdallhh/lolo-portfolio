import Link from "next/link"
import {
  ArrowDownRight,
  ArrowLeft,
  CircuitBoard,
  Cpu,
  Layers3,
} from "lucide-react"
import {
  CircuitFrameCard,
  EditorialPortraitCard,
  FeatureCaseStudyCard,
  GalleryPlaqueCard,
  TimelineRailCard,
} from "@/components/cards/families"
import { GlassSurface, ImageFrame } from "@/components/cards/primitives"
import {
  Container,
  EditorialHeading,
  ResponsiveGrid,
  SectionDivider,
  SectionHeading,
  SectionShell,
} from "@/components/layout/primitives"
import { Card, CardContent } from "@/components/ui/card"
import { Chip, StatusBadge } from "@/components/ui/foundation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import type { PortfolioImage } from "@/types/portfolio"
import { CarouselSample, ControlSamples, MotionSample } from "./controls"

const circuit: PortfolioImage = {
  src: "/images/placeholders/circuit-fixture.webp",
  alt: "Printed-circuit illustration with a signal waveform inside a central chip",
  width: 900,
  height: 600,
}

const circuitDetail: PortfolioImage = {
  src: "/images/placeholders/circuit-detail.webp",
  alt: "Close-up of the printed-circuit illustration and central signal waveform",
  width: 590,
  height: 392,
}

const swatches = [
  { label: "Canvas", color: "#FCF9F7", className: "bg-background" },
  { label: "Blush", color: "#F3E4E7", className: "bg-secondary" },
  { label: "Muted rose", color: "#D8A7B1", className: "bg-rose-circuit" },
  { label: "Champagne", color: "#C5A47E", className: "bg-champagne" },
  { label: "Ink", color: "#29252C", className: "bg-foreground" },
] as const

const navigation = [
  ["#tokens", "Color & type"],
  ["#cards", "Cards"],
  ["#motion", "Motion"],
] as const

export function FoundationPreview() {
  return (
    <>
      <header className="border-b border-border">
        <Container className="flex min-h-(--nav-height) flex-col items-start justify-center gap-x-5 py-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2 text-sm font-bold text-primary"
          >
            <ArrowLeft aria-hidden="true" size={16} /> Portfolio shell
          </Link>
          <NavigationMenu viewport={false} aria-label="Foundation samples">
            <NavigationMenuList className="flex-wrap justify-start">
              {navigation.map(([href, label]) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink
                    asChild
                    className="min-h-11 justify-center px-2.5 text-muted-foreground"
                  >
                    <a href={href}>{label}</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </Container>
      </header>
      <main id="main-content">
        <Container>
          <SectionShell
            aria-labelledby="preview-heading"
            className="grid items-center gap-8 md:grid-cols-[1.04fr_0.96fr] lg:gap-14"
          >
            <div className="space-y-5">
              <StatusBadge className="gap-1.5">
                <CircuitBoard aria-hidden="true" /> Development preview
              </StatusBadge>
              <EditorialHeading id="preview-heading" as="h1" size="display">
                Rose <em className="font-medium text-primary">Circuit</em>
              </EditorialHeading>
              <p className="type-body-lg max-w-110 text-pretty text-muted-foreground">
                The design system for Alaa Abdallah’s engineering portfolio.
                Explore the palette, card families, and interaction samples.
              </p>
              <ControlSamples />
            </div>
            <div className="rounded-xl border border-border bg-surface p-3 shadow-sm">
              <ImageFrame
                image={circuit}
                loading="eager"
                sizes="(max-width: 767px) 90vw, (max-width: 1350px) 43vw, 550px"
              />
              <div className="type-caption mt-3 flex items-center justify-between px-1 font-semibold text-muted-foreground">
                <span>Circuit illustration</span>
                <ArrowDownRight
                  aria-hidden="true"
                  size={16}
                  className="text-primary"
                />
              </div>
            </div>
          </SectionShell>

          <SectionDivider />

          <SectionShell id="tokens" aria-labelledby="tokens-heading">
            <SectionHeading id="tokens-heading" title="Color & typography" />
            <div className="grid gap-(--grid-gap) lg:grid-cols-[1.35fr_1fr]">
              <Card className="justify-center border border-card-border py-(--card-padding)">
                <CardContent className="px-(--card-padding)">
                  <ul
                    aria-label="Palette samples"
                    className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-5"
                  >
                    {swatches.map(({ label, color, className }) => (
                      <li key={color}>
                        <span
                          aria-hidden="true"
                          className={`block h-14 rounded-md border border-border ${className}`}
                        />
                        <span className="type-caption mt-2 block font-bold">
                          {label}
                        </span>
                        <span className="type-caption text-muted-foreground">
                          {color}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <GlassSurface className="space-y-2">
                <EditorialHeading as="h3" size="h3">
                  Cormorant Garamond
                </EditorialHeading>
                <p className="type-body-sm text-muted-foreground">
                  Manrope for interface and body copy
                </p>
                <p
                  lang="ar"
                  dir="rtl"
                  className="text-start text-base font-semibold text-primary"
                >
                  آلاء عبد الله
                </p>
              </GlassSurface>
            </div>
          </SectionShell>

          <SectionDivider />

          <SectionShell id="cards" aria-labelledby="cards-heading">
            <SectionHeading
              id="cards-heading"
              title="Card families"
              description="Sample content for checking hierarchy, spacing, and image treatments."
            />
            <ResponsiveGrid aria-label="Card family specimens">
              <CircuitFrameCard title="Circuit frame" icon={<Cpu size={21} />}>
                Corner details and a subtle focus or hover glow for technical
                skills.
              </CircuitFrameCard>
              <EditorialPortraitCard
                image={circuitDetail}
                caption="Editorial portrait frame with a sample image"
              />
              <GalleryPlaqueCard
                image={circuitDetail}
                title="Gallery plaque"
                issuer="Sample issuer field"
              />
              <FeatureCaseStudyCard
                image={circuitDetail}
                title="Feature case study"
                summary="Image, metadata, and description slots for a project."
                metadata={
                  <Chip>
                    <Layers3 aria-hidden="true" /> Metadata
                  </Chip>
                }
                action={{
                  href: "/foundation#cards",
                  label: "View card anatomy",
                }}
              />
              <div className="lg:col-span-2">
                <TimelineRailCard
                  horizontal
                  milestones={[
                    {
                      id: "first",
                      title: "Timeline rail",
                      dateLabel: "First milestone",
                      description: "Date and description fields.",
                    },
                    {
                      id: "second",
                      title: "Connected entry",
                      dateLabel: "Second milestone",
                      description: "Reading order follows the list.",
                    },
                  ]}
                />
              </div>
            </ResponsiveGrid>
          </SectionShell>

          <SectionDivider />

          <SectionShell id="motion" aria-labelledby="motion-heading">
            <SectionHeading
              id="motion-heading"
              title="Motion & interaction"
              description="Check how the components respond to pointer, keyboard, and reduced-motion preferences."
            />
            <ResponsiveGrid className="lg:grid-cols-2">
              <MotionSample />
              <CarouselSample />
            </ResponsiveGrid>
          </SectionShell>
        </Container>
      </main>
    </>
  )
}
