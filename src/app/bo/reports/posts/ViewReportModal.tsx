"use client"

import { useState } from "react"
import { REPORT_ISSUE_LABELS } from "@/lib/reportIssueLabels"
import type { ReportIssue } from "@/models/adReport"

interface ReportRow {
  ticketId: string
  adTitle: string
  sellerName: string
  issues: ReportIssue[]
  details: string
  reporterEmail: string | null
  resolution: string | null
}

export default function ViewReportModal({ report }: { report: ReportRow }) {

  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="text-blue-600 hover:underline text-sm"
        onClick={() => setOpen(true)}
      >
        View Report
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[80vh] overflow-y-auto p-6">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold">
                Report {report.ticketId}
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>

            </div>

            <div className="space-y-3 text-sm">

              <p><b>Ad:</b> {report.adTitle}</p>
              <p><b>Seller:</b> {report.sellerName}</p>
              <p><b>Reporter:</b> {report.reporterEmail || "Anonymous / hidden"}</p>

              <div>
                <b>Issues:</b>
                <ul className="list-disc list-inside mt-1">
                  {report.issues.map((issue) => (
                    <li key={issue}>{REPORT_ISSUE_LABELS[issue] ?? issue}</li>
                  ))}
                </ul>
              </div>

              {report.details && (
                <div>
                  <b>Details:</b>
                  <p className="mt-1 text-gray-700 bg-gray-50 rounded-lg p-3">{report.details}</p>
                </div>
              )}

              {report.resolution && (
                <div>
                  <b>Admin resolution:</b>
                  <p className="mt-1 text-gray-700 bg-gray-50 rounded-lg p-3">{report.resolution}</p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </>
  )
}
