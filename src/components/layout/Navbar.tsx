"use client"

import Image from "next/image"
import { FileText, Menu, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { loloNavigation } from "@/config/lolo-sections"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { localePaths, lolo, type LoloLocale } from "@/i18n/lolo"
import { storyCopy } from "@/i18n/lolo-story"
import { workCopy } from "@/i18n/lolo-work"
import { focusCopy, graduationCopy } from "@/i18n/lolo-focus-graduation"

function subscribeToScroll(update: () => void) {
  window.addEventListener("scroll", update, { passive: true })
  window.addEventListener("resize", update)
  return () => {
    window.removeEventListener("scroll", update)
    window.removeEventListener("resize", update)
  }
}

function activeSection() {
  const threshold = Math.max(120, window.innerHeight * 0.42)
  for (let index = loloNavigation.length - 1; index > 0; index--) {
    const id = loloNavigation[index]
    const section = document.getElementById(id)
    if (section && section.getBoundingClientRect().top <= threshold) return id
  }
  return "top"
}

const languages = [
  {
    key: "en",
    name: "English",
    short: "EN",
    flag: "gb",
    width: 20,
    height: 10,
  },
  {
    key: "de",
    name: "Deutsch",
    short: "DE",
    flag: "de",
    width: 20,
    height: 12,
  },
] as const

export function Navbar({
  locale,
  cvAvailable,
}: {
  locale: LoloLocale
  cvAvailable: boolean
}) {
  const copy = lolo[locale]
  const desktopLinks = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 12,
    () => false,
  )
  const active = useSyncExternalStore(
    subscribeToScroll,
    activeSection,
    () => "top" as const,
  )

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 61rem)")
    const onChange = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener("change", onChange)
    return () => desktop.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const links = desktopLinks.current
    const current = links?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    )
    if (!links || !current) return
    const placeIndicator = () => {
      links.style.setProperty("--active-offset", `${current.offsetLeft}px`)
      links.style.setProperty("--active-width", `${current.offsetWidth}px`)
      links.dataset.positioned = String(current.offsetWidth > 0)
    }
    placeIndicator()
    const observer = new ResizeObserver(placeIndicator)
    observer.observe(links)
    links.querySelectorAll("a").forEach((link) => observer.observe(link))
    return () => observer.disconnect()
  }, [active, locale])

  const labels = {
    top: copy.home,
    about: copy.about.nav,
    education: storyCopy[locale].education.nav,
    skills: workCopy[locale].skills.nav,
    projects: workCopy[locale].projects.nav,
    certificates: copy.certificates.nav,
    focus: focusCopy[locale].nav,
    graduation: graduationCopy[locale].nav,
    contact: storyCopy[locale].index.contact,
  }
  const links = loloNavigation.map((id) => ({ id, label: labels[id] }))
  const cv = cvAvailable ? (
    <a
      className="lolo-cv"
      href="/gift-material/cv"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FileText size={16} aria-hidden="true" />
      {copy.cv}
    </a>
  ) : (
    <button className="lolo-cv" type="button" disabled>
      {copy.cvUnavailable}
    </button>
  )

  return (
    <header className="lolo-header" data-scrolled={scrolled}>
      <nav className="lolo-nav lolo-wrap" aria-label={copy.navigation}>
        <a
          className="lolo-brand-link"
          href="#top"
          aria-label={`LOLO · ${copy.home}`}
        >
          <BrandLogo label="" />
        </a>
        <div className="lolo-nav-links" ref={desktopLinks}>
          <span className="lolo-nav-indicator" aria-hidden="true" />
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="lolo-nav-actions">
          <div
            className="lolo-languages"
            role="group"
            aria-label={copy.languages}
          >
            {languages.map(({ key, name, short, flag, width, height }) => (
              <a
                key={key}
                href={`${localePaths[key]}#${active}`}
                hrefLang={key}
                lang={key}
                aria-label={`${short} · ${name}`}
                aria-current={key === locale ? "true" : undefined}
                onClick={
                  key === locale ? (event) => event.preventDefault() : undefined
                }
              >
                <Image
                  src={`/brand/flag-${flag}.svg`}
                  alt=""
                  width={width}
                  height={height}
                  unoptimized
                />
                <span>{short}</span>
              </a>
            ))}
          </div>
          <div className="lolo-desktop-cv">{cv}</div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="lolo-menu-trigger"
                type="button"
                aria-label={copy.menu}
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="lolo-menu-overlay" />
              <Dialog.Content
                className="lolo-menu-panel"
                aria-describedby={undefined}
              >
                <Dialog.Title>{copy.navigation}</Dialog.Title>
                <Dialog.Close
                  className="lolo-menu-close"
                  type="button"
                  aria-label={copy.close}
                >
                  <X size={22} aria-hidden="true" />
                </Dialog.Close>
                {links.map(({ id, label }) => (
                  <Dialog.Close key={id} asChild>
                    <a
                      className="lolo-menu-home"
                      href={`#${id}`}
                      aria-current={active === id ? "location" : undefined}
                    >
                      {label}
                    </a>
                  </Dialog.Close>
                ))}
                {cv}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  )
}
