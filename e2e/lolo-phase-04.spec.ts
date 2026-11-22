import { existsSync } from "node:fs"
import { expect, test } from "@playwright/test"

test("private About portrait, Cairo counters, and all four school photographs have the right roles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.clock.setFixedTime(new Date("2026-11-21T12:00:00Z"))
  const errors: string[] = []
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text())
  })
  page.on("pageerror", (e) => errors.push(e.message))
  await page.goto("/")
  await expect(page.locator("[data-section-index]")).toHaveCount(10)
  expect(
    await page
      .locator("[data-section-index]")
      .evaluateAll((items) =>
        items.map((item) => item.getAttribute("data-section-index")),
      ),
  ).toEqual(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"])
  const nav = page.getByRole("navigation", { name: "Main navigation" })
  await expect(
    nav.getByRole("link", { name: /English/ }).locator("img"),
  ).toHaveAttribute("src", "/brand/flag-gb.svg")
  await expect(
    nav.getByRole("link", { name: /Deutsch/ }).locator("img"),
  ).toHaveAttribute("src", "/brand/flag-de.svg")
  await page.getByRole("link", { name: "Read my story" }).click()
  await expect(page).toHaveURL(/#about$/)
  if (existsSync("assets/hero/alaa-contact.webp")) {
    const portrait = page.getByRole("img", {
      name: "Alaa in a brown dress beside candlelit steps",
    })
    await portrait.evaluate((image: HTMLImageElement) => image.decode())
    await expect(portrait).toHaveAttribute("srcset", /alaa-editorial-portrait/)
  }
  if (existsSync("assets/source/phase-04-profile.json")) {
    const values = page.locator(".lolo-milestones [data-stat-value]")
    await expect(values).toHaveCount(4)
    const elapsed = values.nth(1)
    await expect(elapsed).toHaveAttribute("data-stat-value", /[0-9]+/)
    const before = Number(await elapsed.getAttribute("data-stat-value"))
    await page.clock.setFixedTime(new Date("2026-11-21T22:00:00Z"))
    await page.evaluate(() => window.dispatchEvent(new Event("focus")))
    await expect(elapsed).toHaveAttribute("data-stat-value", String(before + 1))
  }

  await nav.getByRole("link", { name: "Education", exact: true }).click()
  await expect(page).toHaveURL(/#education$/)
  await expect(
    nav.getByRole("link", { name: "Education", exact: true }),
  ).toHaveAttribute("aria-current", "location")
  const timeline = page.locator("#education")
  await expect(timeline.getByRole("listitem")).toHaveCount(4)
  const sources = [
    "primary-al-qanah",
    "preparatory-modern-girls",
    "secondary-suez-girls",
    "shorouk-academy-reference",
  ]
  for (const [index, key] of sources.entries()) {
    const img = timeline.getByRole("img").nth(index)
    await img.scrollIntoViewIfNeeded()
    expect(
      await img.evaluate((image: HTMLImageElement) =>
        image.decode().then(() => decodeURIComponent(image.currentSrc)),
      ),
    ).toContain(`/images/about/${key}.webp`)
  }
  await expect(
    timeline.getByText(
      "Academy reference graphic · Information Systems Center",
    ),
  ).toBeVisible()
  await expect(timeline.locator(".lolo-timeline-signal")).toHaveCSS(
    "transform",
    "none",
  )
  expect(errors).toEqual([])
})

test("German mobile deep links preserve language and education landmarks without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de#education")
  await expect(
    page.getByRole("heading", { name: "Vier Kapitel, ein Weg." }),
  ).toBeVisible()
  await expect(page.locator("#education")).toContainText(
    "Moderne Mädchen-Mittelschule Suez",
  )
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  )
  await page.getByRole("link", { name: /English/ }).click()
  await expect(page).toHaveURL(/\/#education$/)
  await expect(
    page.getByRole("heading", { name: "Four chapters, one journey." }),
  ).toBeVisible()
})

test("production retains education content, while About portrait and birthday counters stay private", async ({
  page,
}) => {
  const base = "http://127.0.0.1:3102"
  await page.emulateMedia({ reducedMotion: "reduce" })
  const response = await page.goto(base)
  expect(response?.status()).toBe(200)
  await expect(
    page.locator(".lolo-editorial-portrait, .lolo-milestones"),
  ).toHaveCount(0)
  await expect(page.locator("#education img")).toHaveCount(4)
  expect(
    (
      await page.request.get(
        base + "/images/about/alaa-editorial-portrait.webp?w=480",
      )
    ).status(),
  ).toBe(404)
})

test("education signal follows scroll and resets when reduced motion is enabled", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 850 })
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.goto("/#education")
  await page.locator(".lolo-clock time[datetime]").waitFor()
  const signal = page.locator(".lolo-timeline-signal")
  await page.locator(".lolo-timeline").evaluate((element) => {
    const top = window.scrollY + element.getBoundingClientRect().top
    window.scrollTo(
      0,
      top + element.clientHeight * 0.52 - window.innerHeight * 0.55,
    )
  })
  await expect
    .poll(() =>
      signal.evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m42,
      ),
    )
    .toBeGreaterThan(60)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(signal).toHaveCSS("transform", "none")
  await expect(page.locator("#education img")).toHaveCount(4)
})
