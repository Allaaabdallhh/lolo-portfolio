import { expect, test } from "@playwright/test"

test("graduation recounts the four documented stages in both locales", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 840 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de#graduation")
  const section = page.locator("#graduation")
  await expect(
    section.getByRole("heading", { name: "Der Weg hat sich gelohnt" }),
  ).toBeVisible()
  await expect(section.getByRole("listitem")).toHaveCount(4)
  await expect(section.getByRole("img")).toHaveCount(3)
  await expect(
    section.getByRole("heading", { name: "El Shorouk Academy" }),
  ).toBeVisible()
  await section.getByRole("link", { name: "Zertifikate ansehen" }).click()
  await expect(page).toHaveURL(/#certificates$/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  )
})

test("desktop technology strip can pause and resume and rests in reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/#footer")
  const track = page.locator(".lolo-stack-track")
  const pause = page.getByRole("button", { name: "Pause technology strip" })
  await expect(track).toHaveCSS("animation-name", "lolo-stack-loop")
  await pause.click()
  await expect(track).toHaveCSS("animation-play-state", "paused")
  await page.getByRole("button", { name: "Resume technology strip" }).click()
  await page.mouse.move(2, 2)
  await expect(track).toHaveCSS("animation-play-state", "running")
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(track).toHaveCSS("animation-name", "none")
  await expect(pause).toBeHidden()
})
