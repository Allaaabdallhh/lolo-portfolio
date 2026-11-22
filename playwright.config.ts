import { defineConfig } from "@playwright/test"

const runningDevURL = process.env.PLAYWRIGHT_DEV_URL
const devURL = runningDevURL || "https://localhost:3101"
const prodURL = "http://127.0.0.1:3102"

export default defineConfig({
  testDir: "./e2e",
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: "list",
  use: {
    baseURL: devURL,
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_CHANNEL,
    trace: "retain-on-failure",
  },
  webServer: [
    ...(runningDevURL
      ? []
      : [
          {
            command: "pnpm dev --port 3101",
            port: 3101,
            timeout: 120_000,

            env: {
              NEXT_TELEMETRY_DISABLED: "1",
              LOLO_PREVIEW_EMAIL: "preview@example.invalid",
              LOLO_PREVIEW_PHONE: "+12025550101",
              LOLO_PREVIEW_WHATSAPP: "https://example.invalid/whatsapp",
              LOLO_PREVIEW_INSTAGRAM: "https://example.invalid/instagram",
              LOLO_PREVIEW_TIKTOK: "https://example.invalid/tiktok",
              LOLO_PREVIEW_FACEBOOK: "https://example.invalid/facebook",
            },
          },
        ]),
    { command: "pnpm start --port 3102", url: prodURL, timeout: 60_000 },
  ],
})
