import { existsSync } from "node:fs"
import { expect, test } from "@playwright/test"

test("desktop certificate navigation opens both document details and preserves keyboard focus", async ({
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
  const nav = page.getByRole("navigation", { name: "Main navigation" })
  await nav.getByRole("link", { name: "Certificates", exact: true }).click()
  await expect(page).toHaveURL(/#certificates$/)
  await expect(
    nav.getByRole("link", { name: "Certificates", exact: true }),
  ).toHaveAttribute("aria-current", "location")

  for (const [title, key, kind] of [
    ["HCIA-AI V3.5 Course", "course", "Course certificate"],
    ["HCIA-AI Learning Course", "attendance", "Certificate of attendance"],
  ]) {
    const trigger = page.getByRole("button", {
      name: `View certificate · ${title}`,
    })
    await trigger.focus()
    await page.keyboard.press("Enter")
    const dialog = page.getByRole("dialog", { name: title })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText(kind, { exact: true })).toBeVisible()
    await expect(dialog.getByText("2024", { exact: false })).toBeVisible()
    if (existsSync(`assets/hero/phase-02-${key}.webp`)) {
      const image = dialog.getByRole("img", { name: /certificate image/i })
      expect(
        await image.evaluate((element: HTMLImageElement) =>
          element.decode().then(() => element.naturalWidth),
        ),
      ).toBeGreaterThan(500)
      const zoom = dialog.getByRole("button", { name: "Zoom in" })
      await zoom.click()
      await expect(
        dialog.getByRole("button", { name: "Fit image" }),
      ).toHaveAttribute("aria-pressed", "true")
      const region = dialog.getByRole("region", { name: "Certificate image" })
      await expect(region).toHaveAttribute("tabindex", "0")
      await expect(
        dialog.getByRole("link", { name: "Open full image" }),
      ).toHaveAttribute("href", `/gift-material/${key}`)
    }
    await page.keyboard.press("Escape")
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
  }
  expect(errors).toEqual([])
})

test("mobile certificates, loader position, and uncluttered social logos", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  const counter = page.locator(".lolo-loader-percent")
  await expect(counter).toBeVisible()
  const bounds = await counter.boundingBox()
  expect(bounds).not.toBeNull()
  expect(bounds!.x + bounds!.width).toBeGreaterThan(390 * 0.8)
  expect(bounds!.y).toBeGreaterThan(844 * 0.7)
  await expect(page.getByRole("progressbar")).toHaveCount(0)
  await page.keyboard.press("Escape")
  await expect(page.locator("[data-lolo-loader]")).toHaveCount(0)

  const social = page
    .locator(".lolo-stage")
    .getByRole("list", { name: "Social profiles", exact: true })
  const links = social.getByRole("link")
  await expect(links).toHaveCount(4)
  for (const link of await links.all()) {
    expect((await link.boundingBox())?.width).toBeGreaterThanOrEqual(44)
    await expect(link.locator("img")).toHaveCount(1)
    await expect(link.locator("svg")).toHaveCount(0)
  }
  await page.getByRole("button", { name: "Open menu" }).click()
  const nav = page.getByRole("dialog", { name: "Main navigation" })
  await nav.getByRole("link", { name: "Certificates" }).click()
  await expect(nav).toHaveCount(0)
  await expect(page).toHaveURL(/#certificates$/)
  const trigger = page.getByRole("button", {
    name: /View certificate · HCIA-AI V3.5 Course/i,
  })
  await trigger.click()
  const dialog = page.getByRole("dialog", { name: "HCIA-AI V3.5 Course" })
  await expect(dialog).toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390)
  await dialog.getByRole("button", { name: "Close certificate" }).click()
  await expect(trigger).toBeFocused()
})
