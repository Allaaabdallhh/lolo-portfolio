import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { SectionHeading } from "@/components/layout/primitives"
import { AccessibleModal } from "@/components/ui/accessible-modal"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/foundation"
import { httpsUrl } from "@/lib/safe-url"
import { cn } from "@/lib/utils"

describe("foundation primitives", () => {
  it("exposes names, heading level, and disabled state", () => {
    render(
      <>
        <SectionHeading id="tokens" title="Tokens" />
        <IconButton label="Next sample" disabled>
          <span aria-hidden="true">→</span>
        </IconButton>
      </>,
    )
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
      "id",
      "tokens",
    )
    expect(screen.getByRole("button", { name: "Next sample" })).toBeDisabled()
  })

  it("opens and dismisses a dialog from the keyboard", async () => {
    const user = userEvent.setup()
    render(
      <AccessibleModal
        trigger={<Button>Open dialog</Button>}
        title="Fixture"
        description="Keyboard check."
      />,
    )
    await user.tab()
    await user.keyboard("{Enter}")
    expect(
      screen.getByRole("dialog", { name: "Fixture" }),
    ).toHaveAccessibleDescription("Keyboard check.")
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Open dialog" })).toHaveFocus()
  })

  it("combines conditional classes and resolves conflicting utilities", () => {
    expect(cn("p-2", { hidden: false, block: true }, "p-4")).toBe("block p-4")
  })

  it.each([
    "http://example.com",
    "javascript:alert(1)",
    "//example.com",
    "https://name:pass@example.com",
  ])("rejects %s for verification links", (url) => {
    expect(httpsUrl.safeParse(url).success).toBe(false)
  })

  it("accepts credential-free HTTPS verification links", () => {
    expect(httpsUrl.safeParse("https://example.com/check?id=11").success).toBe(
      true,
    )
  })
})
