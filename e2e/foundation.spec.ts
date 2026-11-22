import { expect, test } from "@playwright/test"

test("trusted HTTPS shell, 404, and security headers", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  const response = await page.goto("/")
  expect(response?.status()).toBe(200)
  expect(await response?.securityDetails()).toMatchObject({
    protocol: expect.stringMatching(/^TLS/),
  })
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff")
  expect(response?.headers()["x-frame-options"]).toBe("DENY")
  expect(response?.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  )
  expect(response?.headers()["strict-transport-security"]).toBeUndefined()
  await expect(
    page.getByRole("heading", { name: "Alaa Abdallah", level: 1 }),
  ).toBeVisible()
  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused()
  const missing = await page.goto("/missing-page")
  expect(missing?.status()).toBe(404)
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible()
})

test("preview hydrates, loads fonts and images, and handles keyboard and carousel input", async ({
  page,
}) => {
  const errors: string[] = []
  const networkFailures: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  page.on("response", (response) => {
    if (response.status() >= 400) networkFailures.push(response.url())
  })
  await page.goto("/foundation")
  await expect(
    page.getByRole("heading", { name: "Rose Circuit" }),
  ).toBeVisible()
  await expect(
    page.getByRole("img", { name: /printed-circuit/i }).first(),
  ).toHaveJSProperty("complete", true)
  expect(
    await page
      .getByRole("img", { name: /printed-circuit/i })
      .first()
      .evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0)
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready
    return [...document.fonts]
      .filter((font) => font.status === "loaded")
      .map((font) => font.family)
  })
  for (const family of ["display", "body", "arabic"]) {
    expect(fonts.join(" ")).toMatch(new RegExp(family, "i"))
  }
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(252, 249, 247)",
  )
  await page.getByRole("link", { name: "Jump to motion samples" }).focus()
  await expect(page.getByRole("tooltip")).toHaveText("Jump to motion samples")
  const trigger = page.getByRole("button", { name: "Open dialog" })
  await trigger.focus()
  await page.keyboard.press("Enter")
  const dialog = page.getByRole("dialog", { name: "Dialog specimen" })
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAccessibleDescription(/Escape to close/)
  await page.keyboard.press("Tab")
  await expect(dialog.locator(":focus")).toHaveCount(1)
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  await page.getByRole("button", { name: "Next frame" }).click()
  await expect(
    page
      .getByRole("article", { name: "Carousel specimen" })
      .getByText("Second frame")
      .last(),
  ).toHaveAttribute("aria-live", "polite")
  expect(errors).toEqual([])
  expect(networkFailures).toEqual([])
})

test("responsive grid, Motion hover, and GSAP cleanup", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/foundation")
  const cards = page.locator('[aria-label="Card family specimens"]')
  await expect(cards).toHaveCSS("display", "grid")
  expect(
    (
      await cards.evaluate((el) => getComputedStyle(el).gridTemplateColumns)
    ).split(" "),
  ).toHaveLength(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  )
  await page.setViewportSize({ width: 1440, height: 960 })
  expect(
    (
      await cards.evaluate((el) => getComputedStyle(el).gridTemplateColumns)
    ).split(" "),
  ).toHaveLength(3)
  await expect(page.getByText("standard motion", { exact: true })).toBeVisible()
  const gsapRan = await page
    .locator("#scroll-fixture > div")
    .evaluate((fixture) => {
      return new Promise<boolean>((resolve) => {
        const timer = window.setTimeout(() => {
          observer.disconnect()
          resolve(false)
        }, 2000)
        const observer = new MutationObserver(() => {
          if (!fixture.style.transform) return
          clearTimeout(timer)
          observer.disconnect()
          resolve(true)
        })
        observer.observe(fixture, {
          attributes: true,
          attributeFilter: ["style"],
        })
        fixture.scrollIntoView({ block: "center" })
      })
    })
  expect(gsapRan).toBe(true)
  const hover = page.getByRole("button", { name: "Hover to lift" })
  await hover.hover()
  await expect(hover.locator("..")).not.toHaveCSS("transform", "none")
  await page.getByRole("button", { name: "Check triggers" }).click()
  await expect(page.getByRole("status")).toHaveText("Active reveal triggers: 1")
  await page.getByRole("button", { name: "Unmount reveal" }).click()
  await page.getByRole("button", { name: "Check triggers" }).click()
  await expect(page.getByRole("status")).toHaveText("Active reveal triggers: 0")
  await page.getByRole("button", { name: "Mount reveal" }).click()
  await page.getByRole("button", { name: "Check triggers" }).click()
  await expect(page.getByRole("status")).toHaveText("Active reveal triggers: 1")
})

test("reduced motion disables reveal transforms and motion hover", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/foundation")
  await expect(page.getByText("reduced motion", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Check triggers" }).click()
  await expect(page.getByRole("status")).toHaveText("Active reveal triggers: 0")
  const hover = page.getByRole("button", { name: "Hover to lift" })
  await hover.hover()
  await expect(hover.locator("..")).toHaveCSS("transform", "none")
})

test("production build hides preview and applies stricter script headers", async ({
  page,
}) => {
  const base = "http://127.0.0.1:3102"
  const response = await page.goto(base)
  expect(response?.status()).toBe(200)
  expect(response?.headers()["content-security-policy"]).not.toContain(
    "unsafe-eval",
  )
  await expect(
    page.getByRole("link", { name: /foundation preview/i }),
  ).toHaveCount(0)
  const hidden = await page.goto(base + "/foundation")
  expect(hidden?.status()).toBe(404)
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible()
})

test("preview copy and card content remain readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  try {
    const page = await context.newPage()
    const response = await page.goto(`${baseURL}/foundation`)
    expect(response?.status()).toBe(200)
    await expect(
      page.getByRole("heading", { name: "Card families" }),
    ).toBeVisible()
    await expect(page.getByText("Scroll reveal specimen")).toBeVisible()
    await expect(
      page.getByText("Scroll reveal specimen").locator(".."),
    ).toHaveCSS("opacity", "1")
  } finally {
    await context.close()
  }
})
