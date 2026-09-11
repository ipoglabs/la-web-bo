import type { ReportIssue } from "@/models/adReport";

/** Mirrors la-web's REPORT_ISSUE_OPTIONS labels (src/components/report-ad/types.ts) — just the display strings bo needs to render an AdReport's `issues[]`. */
export const REPORT_ISSUE_LABELS: Record<ReportIssue, string> = {
  scam_fraud: "Scam / Fraud",
  illegal_content: "Illegal Content",
  counterfeit: "Counterfeit Item",
  misleading: "Misleading Info",
  prohibited_item: "Prohibited Item",
  offensive: "Offensive / Hateful",
  spam: "Spam",
  duplicate: "Duplicate Listing",
  wrong_category: "Wrong Category",
  already_sold: "Already Sold",
};
