"use client"

import { useState, useTransition } from "react"
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
import { resetEmployeeTwoFactor } from "../actions/resetTwoFactor"
import { resetEmployeePassword, unlockEmployee } from "../actions/staffAccess"

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
  canResetTwoFactor = false,
  canManageAccess = false,
  isLocked = false,
  employeeLabel = "",
}: {
  id: string
  role: string
  isActive: boolean
  roleOptions: { value: string; label: string }[]
  canChangeRole: boolean
  canToggleStatus: boolean
  canResetTwoFactor?: boolean
  canManageAccess?: boolean
  isLocked?: boolean
  employeeLabel?: string
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

  const onResetTwoFactor = () => {
    const reason = askReason(
      "Reset two-factor sign-in? Only do this after confirming it's really them (call them on a known number). " +
        "They are signed out and set up two-factor again at their next sign-in.",
    )
    if (!reason) return
    start(async () => {
      const res = await resetEmployeeTwoFactor(id, reason)
      if (!res.ok) alert(res.error)
      else router.refresh()
    })
  }

  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const onUnlock = () => {
    const reason = askReason("Unlock this account? Check it was really them getting the password or code wrong.")
    if (!reason) return
    start(async () => {
      const res = await unlockEmployee(id, reason)
      if (!res.ok) alert(res.error)
      else router.refresh()
    })
  }

  const onResetPassword = () => {
    const reason = askReason(
      "Reset this person's password? Confirm it's really them asking (call them on a number you already have). " +
        "They are signed out, and must choose their own password at next sign-in. Two-factor stays on.",
    )
    if (!reason) return
    start(async () => {
      const res = await resetEmployeePassword(id, reason)
      if (!res.ok) alert(res.error)
      else {
        setCopied(false)
        setTempPassword(res.tempPassword)
        router.refresh()
      }
    })
  }

  if (tempPassword) {
    return (
      <div className="w-full max-w-sm space-y-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm">
        <p>
          <b>Temporary password for {employeeLabel}</b>. It is shown only once. Give it to them in person or by phone,
          not in the same chat as their Employee ID.
        </p>
        <code className="block select-all rounded bg-white p-2 font-mono text-base">{tempPassword}</code>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigator.clipboard.writeText(tempPassword).then(() => setCopied(true))}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" onClick={() => setTempPassword(null)}>
            Done, hide it
          </Button>
        </div>
      </div>
    )
  }

  if (!canChangeRole && !canToggleStatus && !canResetTwoFactor && !canManageAccess) return null

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

      {canManageAccess && isLocked && (
        <Button variant="outline" disabled={pending} onClick={onUnlock}>
          Unlock
        </Button>
      )}

      {canManageAccess && (
        <Button variant="outline" disabled={pending} onClick={onResetPassword}>
          Reset password
        </Button>
      )}

      {canResetTwoFactor && (
        <Button variant="outline" disabled={pending} onClick={onResetTwoFactor}>
          Reset two-factor
        </Button>
      )}
    </div>
  )
}
