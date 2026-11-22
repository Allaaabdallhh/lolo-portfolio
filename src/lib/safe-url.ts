import { z } from "zod"

export const httpsUrl = z.url({ protocol: /^https$/, normalize: true }).pipe(
  z.string().refine((value) => {
    const url = new URL(value)
    return !url.username && !url.password
  }, "URLs must not contain credentials."),
)
