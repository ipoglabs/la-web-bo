"use client"

import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { clearUserReport } from "../../actions/clearUserReport"
import { useRouter } from "next/navigation"

export default function ClearUserReportButton({ userId }: { userId: string }) {
  const [pending, start] = useTransition()
  const router = useRouter()

  const handleClear = () => {
    const ok = confirm("Are you sure you want to clear this report?")
    if (!ok) return

    start(async () => {
      const res = await clearUserReport(userId)
      if (!res?.ok) {
        alert(res?.error || "Failed to clear report")
        return
      }
      router.refresh()
    })
  }

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={handleClear}
    >
      {pending ? "Clearing..." : "Clear"}
    </Button>
  )
}