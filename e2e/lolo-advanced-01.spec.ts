import { existsSync } from "node:fs"
import { expect, test } from "@playwright/test"

const portraits = [
  {
    file: "alaa-navy-hero.webp",
    label: "Alaa in a navy blue dress and headscarf",
    section: "#top",
    size: [288, 732],
  },
  {
    file: "alaa-contact.webp",
    label: "Alaa in a brown dress beside candlelit steps",
    section: "#about",
  },
  {
    file: "phase-03-portrait.webp",
    label: "Alaa in a white suit",
    section: "#footer",
    size: [481, 832],
  },
] as const

test("approved portraits are mapped to the correct sections in the local preview", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/#top")
  for (const portrait of portraits) {
    if (!existsSync(`assets/hero/${portrait.file}`)) continue
    const image = page
      .locator(portrait.section)
      .getByRole("img", { name: portrait.label, exact: true })
    await image.scrollIntoViewIfNeeded()
    const size = await image.evaluate(async (element: HTMLImageElement) => {
      await element.decode()
      return [element.naturalWidth, element.naturalHeight]
    })
    if ("size" in portrait) expect(size).toEqual(portrait.size)
    else expect(size[1] / size[0]).toBeCloseTo(1043 / 793, 2)
  }
  const footer = page.getByRole("contentinfo")
  await expect(
    footer.getByRole("list", { name: "Built with" }).getByRole("listitem"),
  ).toHaveCount(6)
  const signature = footer.getByRole("link", { name: "LOLO · Home" })
  await signature.click()
  await expect(page).toHaveURL(/#top$/)
})

test("German skill cards are individually expandable and production keeps the signature text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de#skills")
  await expect(page.locator("#skills details[data-skill]")).toHaveCount(13)
  const communications = page.locator('details[data-skill="communications"]')
  await communications.locator("summary").click()
  await expect(communications.getByText(/Teil von Alaas Studium/)).toBeVisible()
  await expect(
    page.getByRole("list", { name: "Erstellt mit" }).getByText("Motion"),
  ).toBeVisible()

  const base = "http://127.0.0.1:3102"
  await page.goto(base + "/#footer")
  await expect(page.locator(".lolo-footer-portrait")).toHaveCount(0)
  await expect(
    page.getByRole("list", { name: "Built with" }).getByText("React"),
  ).toBeVisible()
  expect(
    (
      await page.request.get(base + "/images/footer/alaa-white-portrait.webp")
    ).status(),
  ).toBe(404)
})
