import { expect, test } from "@playwright/test"

test("enhanced hero, About navigation and private footer contact work together", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  await page.goto("/")
  await expect(page.locator(".lolo-loader-percent")).toHaveCSS(
    "font-size",
    "136px",
  )
  const greeting = page.locator(".lolo-greeting")
  await expect(greeting).toContainText("I’m Alaa")
  await expect(greeting.locator("strong")).toHaveCSS(
    "color",
    "rgb(228, 184, 117)",
  )
  expect(
    await greeting.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThan(30)
  const stage = page.locator(".lolo-stage")
  await expect(stage.locator(".lolo-profile-panel")).toBeVisible()
  await expect(
    stage.getByRole("list", { name: "Social profiles" }).getByRole("link"),
  ).toHaveCount(4)

  const nav = page.getByRole("navigation", { name: "Main navigation" })
  await nav.getByRole("link", { name: "About", exact: true }).click()
  await expect(
    nav.getByRole("link", { name: "About", exact: true }),
  ).toHaveAttribute("aria-current", "location")
  await expect(
    page.getByRole("heading", { name: "Beyond the degree." }),
  ).toBeVisible()
  await expect(
    page.getByText(/For Automatic Warehouse Logistics/),
  ).toBeVisible()

  const footer = page.getByRole("contentinfo")
  await expect(
    footer.getByRole("link", { name: "preview@example.invalid" }),
  ).toHaveAttribute("href", "mailto:preview@example.invalid")
  await expect(
    footer.getByRole("link", { name: "+12025550101" }),
  ).toHaveAttribute("href", "tel:+12025550101")
  const footerSocials = footer.getByRole("list", {
    name: "Contact and social profiles",
  })
  await expect(footerSocials.getByRole("link")).toHaveCount(4)
  await expect(footerSocials.locator("svg")).toHaveCount(0)
  await footer.getByRole("link", { name: "Certificates", exact: true }).click()
  await expect(page).toHaveURL(/#certificates$/)
  expect(errors).toEqual([])
})

test("mobile German About link, bio and footer remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de")
  await page.locator(".lolo-clock time[datetime]").waitFor()
  await page.getByRole("button", { name: "Menü öffnen" }).click()
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Über mich" })
    .click()
  await expect(page.getByRole("dialog")).toHaveCount(0)
  await expect(page).toHaveURL(/#about$/)
  await expect(
    page.getByRole("heading", { name: "Mehr als ein Abschluss." }),
  ).toBeVisible()
  await expect(
    page.getByRole("contentinfo").getByRole("heading", { name: "Kontakt" }),
  ).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    360,
  )
})

test("production retains About and Footer while private contact remains local", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("http://127.0.0.1:3102/")
  await expect(
    page.getByRole("heading", { name: "Beyond the degree." }),
  ).toBeVisible()
  const footer = page.getByRole("contentinfo")
  await expect(
    footer.getByRole("navigation", { name: "Footer navigation" }),
  ).toBeVisible()
  await expect(
    footer.locator(
      'a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me"]',
    ),
  ).toHaveCount(0)
})
