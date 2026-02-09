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

export default function EmployeeActions({
  id,
  role,
  isActive,
}: {
  id: string
  role: string
  isActive: boolean
}) {
  const [pending, start] = useTransition()
  const router = useRouter()

  const onRoleChange = (nextRole: string) => {
    start(async () => {
      const res = await changeEmployeeRole(id, nextRole)
      if (!res.ok) alert(res.error)
      else router.refresh()
    })
  }

  const onToggleStatus = () => {
    start(async () => {
      const res = await toggleEmployeeStatus(id)
      if (!res.ok) alert(res.error)
      else router.refresh()
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        defaultValue={role}
        onValueChange={onRoleChange}
        disabled={pending}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="moderator">Moderator</SelectItem>
          <SelectItem value="support">Support</SelectItem>
          <SelectItem value="analyst">Analyst</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={isActive ? "destructive" : "outline"}
        disabled={pending}
        onClick={onToggleStatus}
      >
        {isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
  )
}
