import { existsSync } from "node:fs"
import { expect, test } from "@playwright/test"

test("cinematic intro reaches 100, releases the page, and stays dismissed across locale navigation", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  await page.addInitScript(() => {
    const values: number[] = []
    Object.assign(window, { loloIntroValues: values })
    const observer = new MutationObserver(() => {
      const counter = document.querySelector("[data-lolo-percent]")
      if (!counter || counter.closest("[hidden]")) return
      const value = Number(counter.textContent)
      if (values.at(-1) !== value) values.push(value)
    })
    observer.observe(document, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["hidden"],
    })
  })

  await page.goto("/")
  await expect(page.locator("[data-lolo-loader]")).toBeVisible()
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden")
  await expect(page.locator("[data-lolo-loader]")).toHaveCount(0, {
    timeout: 6500,
  })
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
  const values = await page.evaluate(
    () =>
      (window as Window & { loloIntroValues?: number[] }).loloIntroValues ?? [],
  )
  expect(values[0]).toBeLessThan(10)
  expect(values.at(-1)).toBe(100)
  expect(
    values.every((value, index) => !index || value >= values[index - 1]),
  ).toBe(true)

  if (existsSync("assets/hero/alaa-navy-hero.webp")) {
    const portrait = page.getByRole("img", {
      name: /Alaa in a navy blue dress/i,
    })
    expect(
      await portrait.evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBe(288)
    const portraitHeaders = await page.evaluate(async () => {
      const response = await fetch("/gift-portrait")
      return {
        status: response.status,
        cache: response.headers.get("cache-control"),
        type: response.headers.get("content-type"),
      }
    })
    expect(portraitHeaders).toEqual({
      status: 200,
      cache: "private, no-store",
      type: "image/webp",
    })
  } else {
    await expect(page.locator("[data-lolo-portrait]")).toHaveCount(0)
  }
  const socials = page
    .locator(".lolo-stage")
    .getByRole("list", { name: "Social profiles", exact: true })
  await expect(socials.getByRole("link")).toHaveCount(4)
  for (const [label, href] of [
    ["Instagram", "https://example.invalid/instagram"],
    ["Facebook", "https://example.invalid/facebook"],
    ["TikTok", "https://example.invalid/tiktok"],
    ["WhatsApp", "https://example.invalid/whatsapp"],
  ]) {
    const link = socials.getByRole("link", { name: label })
    await expect(link).toHaveAttribute("href", href)
    await expect(link).toHaveAttribute("target", "_blank")
    await expect(link).toHaveAttribute("rel", "noopener noreferrer")
  }
  if (existsSync("assets/source/phase-02-cv.pdf")) {
    await expect(page.getByRole("link", { name: "View CV" })).toHaveAttribute(
      "href",
      "/gift-material/cv",
    )
    const response = await page.evaluate(async () => {
      const response = await fetch("/gift-material/cv")
      return [response.status, response.headers.get("content-type")]
    })
    expect(response).toEqual([200, "application/pdf"])
  } else {
    await expect(
      page.getByRole("button", { name: "CV · Local preview" }),
    ).toBeDisabled()
  }

  await page.getByRole("link", { name: "Deutsch" }).click()
  await expect(page).toHaveURL(/\/de#top$/)
  await page.waitForLoadState("load")
  await expect(page.locator(".lolo-clock time")).toHaveText(/^\d{2}:\d{2}$/)
  await expect(page.locator("html")).toHaveAttribute("lang", "de")
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Computer- und Kommunikationstechnik/,
  )
  await expect(page.getByText(/^Ingenieurabsolventin für/)).toBeVisible()
  await expect(
    page.getByText("Ortszeit in Kairo", { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByText("Engineering Graduate", { exact: true }),
  ).toHaveCount(0)
  await expect(page.locator("[data-lolo-loader]")).toBeHidden()
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
  await page.getByRole("link", { name: "English" }).click()
  await expect(page).toHaveURL(/\/#top$/)
  await page.waitForLoadState("load")
  await expect(page.locator(".lolo-clock time")).toHaveText(/^\d{2}:\d{2}$/)
  await expect(page.locator("html")).toHaveAttribute("lang", "en")
  await expect(page.locator("[data-lolo-loader]")).toBeHidden()
  expect(errors).toEqual([])
})

test("skipping the intro restores keyboard access and scroll", async ({
  page,
}) => {
  await page.goto("/")
  await expect(page.locator("[data-lolo-loader]")).toBeVisible()
  await page.keyboard.press("Tab")
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(page.locator("[data-lolo-loader]")).toHaveCount(0)
  await expect(page.getByRole("main")).toBeFocused()
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
})

test("backgrounding the tab leaves the intro dismissed", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("[data-lolo-loader]")).toBeVisible()
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    })
    document.dispatchEvent(new Event("visibilitychange"))
  })
  await expect(page.locator("[data-lolo-loader]")).toHaveCount(0)
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
})

test("mobile menu traps focus, closes with Escape, and respects reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de")
  await expect(page.locator("[data-lolo-loader]")).toBeHidden()
  const trigger = page.getByRole("button", { name: "Menü öffnen" })
  expect((await trigger.boundingBox())?.width).toBeGreaterThanOrEqual(44)
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await trigger.focus()
  await page.keyboard.press("Enter")
  await expect(page.locator(".lolo-menu-trigger")).toHaveAttribute(
    "aria-expanded",
    "true",
  )
  const menu = page.getByRole("dialog", { name: "Hauptnavigation" })
  await expect(menu).toBeVisible()
  await expect(
    menu.getByRole("button", { name: "Menü schließen" }),
  ).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(menu.getByRole("link", { name: "Startseite" })).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(menu.getByRole("link", { name: "Über mich" })).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(menu.getByRole("link", { name: "Ausbildung" })).toBeFocused()
  for (const name of ["Kenntnisse", "Projekte", "Zertifikate"]) {
    await page.keyboard.press("Tab")
    await expect(menu.getByRole("link", { name, exact: true })).toBeFocused()
  }
  await page.keyboard.press("Escape")
  await expect(menu).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await trigger.click()
  await menu.getByRole("link", { name: "Startseite" }).click()
  await expect(menu).toHaveCount(0)
  await expect(page).toHaveURL(/\/de#top$/)
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
})

test("LOLO wraps at a 200% reflow-equivalent desktop viewport and serves translated HTML without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    viewport: { width: 720, height: 450 },
    deviceScaleFactor: 2,
    javaScriptEnabled: false,
  })
  try {
    const page = await context.newPage()
    await page.goto(`${baseURL}/de`)
    await expect(page.locator("html")).toHaveAttribute("lang", "de")
    await expect(
      page.getByRole("heading", { name: "ALAA ABDALLAH", level: 1 }),
    ).toBeVisible()
    await expect(page.locator("[data-lolo-loader]")).toBeHidden()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(720)
    await expect(page.getByRole("link", { name: "English" })).toBeVisible()
  } finally {
    await context.close()
  }
})

test("built locales exclude the private portrait and social URLs", async ({
  page,
}) => {
  const host = "http://127.0.0.1:3102"
  await page.emulateMedia({ reducedMotion: "reduce" })
  const response = await page.goto(host + "/de")
  expect(response?.status()).toBe(200)
  await expect(
    page.getByRole("heading", { name: "ALAA ABDALLAH", level: 1 }),
  ).toBeVisible()
  await expect(page.locator("html")).toHaveAttribute("lang", "de")
  await expect(page.locator("[data-lolo-portrait]")).toHaveCount(0)
  await expect(
    page.getByRole("list", { name: "Profile in sozialen Medien" }),
  ).toHaveCount(0)
  expect((await page.request.get(host + "/gift-portrait")).status()).toBe(404)
  expect((await page.request.get(host + "/gift-material/cv")).status()).toBe(
    404,
  )
  expect(
    (await page.request.get(host + "/gift-material/course")).status(),
  ).toBe(404)
  await expect(
    page.getByRole("heading", { name: "Berufliche Zertifikate" }),
  ).toBeVisible()
})
