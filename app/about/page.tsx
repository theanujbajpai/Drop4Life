import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, ShieldCheck, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Drop4Life is more than a platform — it’s a mission to save lives by connecting
              blood donors with patients and hospitals in need, faster and safer than ever before.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission & Vision */}
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Why Drop4Life exists and what drives us every day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our mission is to create a world where no life is lost due to the unavailability 
                  of blood. By leveraging AI-powered donor matching and blockchain-verified 
                  donation records, we ensure every drop counts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
                <CardDescription>
                  The future we are working towards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We envision a global medical blood donation network that is accessible, 
                  transparent, and reliable — saving lives instantly and building trust worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Heart className="h-8 w-8 mx-auto text-red-600 mb-3" />
                <h3 className="font-semibold mb-1">Compassion</h3>
                <p className="text-muted-foreground text-sm">
                  We put humanity first, ensuring care and empathy at every step.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto text-red-600 mb-3" />
                <h3 className="font-semibold mb-1">Community</h3>
                <p className="text-muted-foreground text-sm">
                  Bringing donors, hospitals, and patients together for a stronger network.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <ShieldCheck className="h-8 w-8 mx-auto text-red-600 mb-3" />
                <h3 className="font-semibold mb-1">Trust & Safety</h3>
                <p className="text-muted-foreground text-sm">
                  Secure, verified, and transparent donation records with blockchain.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Globe className="h-8 w-8 mx-auto text-red-600 mb-3" />
                <h3 className="font-semibold mb-1">Global Impact</h3>
                <p className="text-muted-foreground text-sm">
                  Building an international platform to save lives everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
