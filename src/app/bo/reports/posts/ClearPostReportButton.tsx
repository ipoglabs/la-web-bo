"use client"

import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { clearPostReport } from "../../actions/clearPostReport"
import { useRouter } from "next/navigation"

export default function ClearPostReportButton({ postId }: { postId: string }) {

  const [pending, start] = useTransition()
  const router = useRouter()

  const handleClear = () => {

    const ok = confirm("Clear this post report?")
    if (!ok) return

    start(async () => {

      const res = await clearPostReport(postId)

      if (!res?.ok) {
        alert(res?.error || "Failed")
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