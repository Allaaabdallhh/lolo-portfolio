import { expect, test } from "@playwright/test"

test("skills bridge to a documented project and the desktop reader restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/#skills")
  const toolbox = page.locator("#skills")
  await expect(
    toolbox.getByRole("heading", { name: "Engineering Toolbox" }),
  ).toBeVisible()
  const groups = toolbox.locator("summary")
  for (const summary of await groups.all()) {
    await summary.focus()
    await page.keyboard.press("Enter")
    await expect(summary.locator("..")).toHaveAttribute("open", "")
  }
  await expect(toolbox.getByText(/C# was reported/)).toBeVisible()
  await toolbox.getByRole("link", { name: "See the tools in action" }).click()
  await expect(page).toHaveURL(/#projects$/)
  const trigger = page.getByRole("button", { name: "Read case study" })
  await trigger.focus()
  await page.keyboard.press("Enter")
  const dialog = page.getByRole("dialog", {
    name: "Automatic Warehouse Logistics",
  })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText(/servo motors and drivers/i)).toBeVisible()
  await expect(dialog.getByText(/concept illustration/i)).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test("German mobile navigation reaches the project and all ten chapters fit", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de#top")
  await page.getByRole("button", { name: "Menü öffnen" }).click()
  const menu = page.getByRole("dialog")
  await menu.getByRole("link", { name: "Projekte", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: "Ausgewählte Projekte" }),
  ).toBeVisible()
  await page.getByRole("button", { name: "Projektbeschreibung lesen" }).click()
  const detail = page.getByRole("dialog", {
    name: "Automatic Warehouse Logistics",
  })
  await expect(detail.getByText(/Kein Originalfoto/)).toBeVisible()
  await detail.getByRole("button").click()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    360,
  )
  await expect(page.locator("[data-section-index]")).toHaveCount(10)
})
