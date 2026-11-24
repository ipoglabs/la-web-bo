import Link from "next/link"
import Escalation, { type EscalationTarget } from "@/models/escalation"

/** Shows staff that a case is already with the admins (server component). */
export default async function OpenEscalation({
  targetType,
  targetId,
  canReview,
}: {
  targetType: EscalationTarget
  targetId: string
  canReview: boolean
}) {
  const esc = await Escalation.findOne({ targetType, targetId, status: "open" })
    .select("note createdByEmail createdAt")
    .lean()
  if (!esc) return null
  return (
    <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <b>Escalated to admins</b> by {esc.createdByEmail} on {new Date(esc.createdAt).toLocaleString("en-GB")}:{" "}
      {esc.note}
      {canReview && (
        <>
          {" "}
          <Link href="/bo/escalations" className="underline">
            Resolve in Escalations
          </Link>
        </>
      )}
    </div>
  )
}
