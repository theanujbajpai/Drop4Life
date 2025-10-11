import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, MapPin, Clock, Shield, Award } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full medical-gradient shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Become a Life Saver</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of verified donors who are making a difference. Your donation can save up to 3 lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Regular Donor Program
                </CardTitle>
                <CardDescription>Schedule regular donations and help maintain blood supply</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Health screening included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Donor rewards program</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Flexible scheduling</span>
                  </li>
                </ul>
                <Button className="w-full medical-gradient" asChild>
                  <Link href="/register?type=donor&program=regular">Join Regular Program</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="medical-card border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Heart className="h-5 w-5" />
                  Emergency Donor Network
                </CardTitle>
                <CardDescription>Be available for urgent blood requests in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Location-based alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-500" />
                    <span className="text-sm">24/7 emergency response</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Save lives immediately</span>
                  </li>
                </ul>
                <Button className="w-full emergency-gradient" asChild>
                  <Link href="/register?type=donor&program=emergency">Join Emergency Network</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Donation Requirements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">18-65</div>
                <p className="text-sm text-muted-foreground">Age range</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">110+ lbs</div>
                <p className="text-sm text-muted-foreground">Minimum weight</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">56 days</div>
                <p className="text-sm text-muted-foreground">Between donations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
