"use client"

import { useState } from "react"

export default function ViewReportsModal({ reports }: { reports: any[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="text-blue-600 hover:underline text-sm"
        onClick={() => setOpen(true)}
      >
        View Reports
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">User Report History</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {reports?.length === 0 && (
              <p className="text-sm text-gray-500">No reports found</p>
            )}

            <div className="space-y-4">
              {reports?.map((r: any, i: number) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 bg-gray-50 text-sm"
                >
                  <div className="font-medium text-red-600">
                    {r.reason || "No reason"}
                  </div>

                  <div className="text-gray-500 text-xs mt-1">
                    Reported by: {r.by?.email || "Admin"}
                  </div>

                  <div className="text-gray-400 text-xs">
                    {r.at
                      ? new Date(r.at).toLocaleString("en-GB")
                      : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}