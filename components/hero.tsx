import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Users, Clock, AlertTriangle, Shield } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted py-20 sm:py-32">
      <div className="absolute top-0 left-0 right-0 bg-destructive text-destructive-foreground py-2 z-10">
        <div className="container flex items-center justify-center gap-2 text-sm font-medium">
          <AlertTriangle className="h-4 w-4 animate-pulse" />
          <span>Emergency Blood Drive Active - O- Blood Urgently Needed</span>
          <Button size="sm" variant="secondary" className="ml-4 h-6 px-3 text-xs" asChild>
            <Link href="/register?type=donor">Donate Now</Link>
          </Button>
        </div>
      </div>

      <div className="container relative mt-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full medical-gradient shadow-2xl animate-pulse-medical">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <Badge className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          <div className="mb-6 flex justify-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              ISO 27001 Certified
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              HIPAA Compliant
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              24/7 Emergency Support
            </Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Professional Medical
            <span className="text-primary block"> Blood Donation Network</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            Advanced AI-powered matching system connecting verified donors with recipients in real-time. Integrated with
            500+ hospitals, featuring emergency alerts, secure medical chat, and blockchain-verified donation records.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
            <Button size="lg" asChild className="medical-gradient hover:opacity-90 px-8 py-4 text-lg">
              <Link href="/register">Join as Medical Professional</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Link href="/emergency">Emergency Request</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">25,847</div>
              <div className="text-sm text-muted-foreground">Verified Donors</div>
              <div className="text-xs text-accent font-medium mt-1">+1,247 this week</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">18,392</div>
              <div className="text-sm text-muted-foreground">Lives Saved</div>
              <div className="text-xs text-accent font-medium mt-1">+89 today</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">847</div>
              <div className="text-sm text-muted-foreground">Partner Hospitals</div>
              <div className="text-xs text-accent font-medium mt-1">Across 50 states</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">4.2</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
              <div className="text-xs text-accent font-medium mt-1">Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
