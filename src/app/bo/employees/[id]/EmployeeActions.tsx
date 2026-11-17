"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { changeEmployeeRole } from "../actions/changeRole"
import { toggleEmployeeStatus } from "../actions/toggleStatus"

function askReason(question: string): string | null {
  const r = window.prompt(`${question}\n\nReason (saved to the audit log, min 5 characters):`)
  if (r === null) return null
  if (r.trim().length < 5) {
    alert("A reason of at least 5 characters is required.")
    return null
  }
  return r.trim()
}

export default function EmployeeActions({
  id,
  role,
  isActive,
  roleOptions,
  canChangeRole,
  canToggleStatus,
}: {
  id: string
  role: string
  isActive: boolean
  roleOptions: { value: string; label: string }[]
  canChangeRole: boolean
  canToggleStatus: boolean
}) {
  const [pending, start] = useTransition()
  const router = useRouter()

  const onRoleChange = (nextRole: string) => {
    if (nextRole === role) return
    const reason = askReason(`Change role from ${role} to ${nextRole}? They will be signed out.`)
    if (!reason) return // controlled by `role`, so the dropdown snaps back
    start(async () => {
      const res = await changeEmployeeRole(id, nextRole, reason)
      if (!res.ok) alert(res.error)
      router.refresh()
    })
  }

  const onToggleStatus = () => {
    const reason = askReason(
      isActive ? "Deactivate this account? They are signed out immediately." : "Re-activate this account?",
    )
    if (!reason) return
    start(async () => {
      const res = await toggleEmployeeStatus(id, reason)
      if (!res.ok) alert(res.error)
      else router.refresh()
    })
  }

  if (!canChangeRole && !canToggleStatus) return null

  return (
    <div className="flex flex-wrap gap-3">
      {canChangeRole && (
        <Select value={role} onValueChange={onRoleChange} disabled={pending}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {canToggleStatus && (
        <Button variant={isActive ? "destructive" : "outline"} disabled={pending} onClick={onToggleStatus}>
          {isActive ? "Deactivate" : "Activate"}
        </Button>
      )}
    </div>
  )
}
