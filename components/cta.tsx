import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
      <div className="container">
        <div className="text-center text-white">
          <div className="flex justify-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Save Lives?</h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join thousands of donors and recipients who trust Drop4Life to make life-saving connections. Every drop
            counts, every life matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="px-8 py-3">
              <Link href="/register">
                Register as Donor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-3 border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
            >
              <Link href="/find-donors">Find Blood Now</Link>
            </Button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm">Available 24/7 • Emergency Support • Verified Network</p>
          </div>
        </div>
      </div>
    </section>
  )
}
