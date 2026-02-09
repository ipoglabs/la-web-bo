import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md rounded-xl border bg-white shadow p-8 text-center space-y-6">
        <div className="flex justify-center">
          <ShieldCheck className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            LokalAds Back Office
          </h1>
          <p className="text-sm text-muted-foreground">
            Secure administration portal for managing users, ads and operations
          </p>
        </div>

        <Link href="/bo-login">
          <Button className="w-full">
            Login to Back Office
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground">
          Authorized personnel only
        </p>
      </div>
    </main>
  )
}
