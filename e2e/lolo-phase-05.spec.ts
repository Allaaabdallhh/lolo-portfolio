import { existsSync } from "node:fs"
import { expect, test } from "@playwright/test"

test("the desktop indicator follows Contact and its private portrait loads", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/#about")
  const navigation = page.getByRole("navigation", { name: "Main navigation" })
  const indicator = navigation.locator(".lolo-nav-indicator")
  const about = navigation.getByRole("link", { name: "About" })
  await expect(about).toHaveAttribute("aria-current", "location")
  const start = await indicator.evaluate(
    (item) => getComputedStyle(item).transform,
  )
  const contact = navigation.getByRole("link", { name: "Contact", exact: true })
  await contact.click()
  await expect(contact).toHaveAttribute("aria-current", "location")
  await expect(indicator).not.toHaveCSS("transform", start)
  await expect(page.locator("#contact a[href^='mailto:']")).toBeVisible()
  if (existsSync("assets/hero/alaa-contact.webp")) {
    const portrait = page.locator(".lolo-contact-portrait img")
    await portrait.evaluate((img: HTMLImageElement) => img.decode())
    await expect(portrait).toHaveAttribute("alt", /candlelit steps/)
    const image = await page.evaluate(async () => {
      const response = await fetch("/images/contact/alaa-contact.webp?w=480")
      return {
        status: response.status,
        cache: response.headers.get("cache-control"),
      }
    })
    expect(image.status).toBe(200)
    expect(image.cache).toContain("no-store")
  }
})

test("school photography can be expanded and dismissed with focus restored", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de#education")
  const trigger = page.getByRole("button", {
    name: /Foto ansehen · Mädchen-Oberschule Suez/,
  })
  await trigger.click()
  const dialog = page.getByRole("dialog", { name: "Mädchen-Oberschule Suez" })
  await expect(dialog.getByRole("img")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test("Hero pointer travel is bounded and reversible", async ({ page }) => {
  test.skip(
    !existsSync("assets/hero/alaa-navy-hero.webp"),
    "The locally supplied portrait is absent",
  )
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/#top")
  const portrait = page.locator("[data-lolo-parallax]")
  const stage = await page.locator(".lolo-stage").boundingBox()
  if (!stage) throw new Error("Hero stage is missing")
  await page.locator(".lolo-clock time[datetime]").waitFor()
  const matrixFor = () =>
    portrait.evaluate((item) => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(item).transform)
      return { x: matrix.m41, y: matrix.m42, yaw: Math.abs(matrix.m13) }
    })
  const initial = await matrixFor()
  await page.mouse.move(
    stage.x + stage.width * 0.9,
    stage.y + stage.height * 0.73,
  )
  await expect
    .poll(async () => (await matrixFor()).x - initial.x)
    .toBeGreaterThan(2)
  const moved = await matrixFor()
  expect(moved.x - initial.x).toBeLessThanOrEqual(6.1)
  expect(Math.abs(moved.y - initial.y)).toBeLessThanOrEqual(6.1)
  expect(moved.yaw).toBeGreaterThan(0.01)
  expect(moved.yaw).toBeLessThan(0.063)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect.poll(async () => (await matrixFor()).yaw).toBe(0)
})

test("production excludes the Contact portrait, personal channels and pending quote", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3102/#contact")
  await expect(page.locator("#contact")).toBeVisible()
  await expect(
    page.locator(
      "#contact .lolo-contact-portrait, #contact a[href^='mailto:'], .lolo-quote-pending",
    ),
  ).toHaveCount(0)
  const contactPhoto = await page.request.get(
    "http://127.0.0.1:3102/images/contact/alaa-contact.webp?w=720",
  )
  expect(contactPhoto.status()).toBe(404)
})
