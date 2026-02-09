"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteUser } from "../../../actions/deleteUser"

export default function AdminUserActions({
  userId,
  userEmail,
}: {
  userId: string
  userEmail?: string
}) {
  const [pending, start] = useTransition()
  const router = useRouter()

  const onDelete = () => {
    const ok = confirm(
      `Delete this user permanently?\n\n${userEmail || userId}`
    )
    if (!ok) return

    start(async () => {
      const res = await deleteUser(userId)
      if (!res?.ok) {
        alert(res?.error || "Delete failed")
        return
      }

      router.push("/bo/users")
      router.refresh()
    })
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={onDelete}
    >
      {pending ? "Deleting..." : "Delete User"}
    </Button>
  )
}
