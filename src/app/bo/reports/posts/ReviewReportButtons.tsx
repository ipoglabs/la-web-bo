"use client"

import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { reviewAdReport } from "../../actions/reviewAdReport"
import { useRouter } from "next/navigation"

export default function ReviewReportButtons({
  reportId,
  status,
}: {
  reportId: string
  status: string
}) {

  const [pending, start] = useTransition()
  const router = useRouter()

  const review = (next: "reviewed" | "actioned" | "dismissed") => {

    const resolution = prompt("Admin note (optional):") ?? undefined

    start(async () => {

      const res = await reviewAdReport(reportId, next, resolution)

      if (!res?.ok) {
        alert(res?.error || "Failed")
        return
      }

      router.refresh()

    })

  }

  if (status === "actioned" || status === "dismissed") {
    return <span className="text-xs text-muted-foreground">Closed</span>
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      {status === "pending" && (
        <Button size="sm" variant="outline" disabled={pending} onClick={() => review("reviewed")}>
          Mark Reviewed
        </Button>
      )}
      <Button size="sm" variant="destructive" disabled={pending} onClick={() => review("actioned")}>
        Actioned
      </Button>
      <Button size="sm" variant="outline" disabled={pending} onClick={() => review("dismissed")}>
        Dismiss
      </Button>
    </div>
  )
}
