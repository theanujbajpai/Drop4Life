import {
  Building2,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Heart,
  Activity,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HospitalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hospital <span className="text-red-500">Partnership</span> Program
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our network of trusted healthcare institutions. Streamline blood donation requests, manage inventory,
            and save more lives with our comprehensive hospital management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hospitals/register">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3">
                Register Your Hospital
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features for Hospitals */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Hospitals Choose Drop4Life</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides hospitals with advanced tools to manage blood requests, track inventory, and
              coordinate with donors efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <Activity className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Real-Time Inventory</CardTitle>
                <CardDescription>
                  Track blood bank levels in real-time with automated alerts for low stock
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <Users className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Donor Network Access</CardTitle>
                <CardDescription>
                  Connect with verified donors in your area with instant matching algorithms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <Shield className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>HIPAA Compliant</CardTitle>
                <CardDescription>
                  Secure, encrypted platform that meets all healthcare data protection standards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>24/7 Emergency Support</CardTitle>
                <CardDescription>
                  Round-the-clock support for critical blood requests and emergency situations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <Stethoscope className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Medical Integration</CardTitle>
                <CardDescription>
                  Seamlessly integrate with existing hospital management systems and EMRs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <CheckCircle className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Quality Assurance</CardTitle>
                <CardDescription>
                  Comprehensive donor screening and blood quality verification processes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Hospitals */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Leading Hospitals</h2>
            <p className="text-lg text-gray-600">Join over 500+ hospitals already using Drop4Life to save lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "City General Hospital", location: "New York, NY", patients: "50,000+" },
              { name: "Metro Medical Center", location: "Los Angeles, CA", patients: "75,000+" },
              { name: "Regional Health System", location: "Chicago, IL", patients: "100,000+" },
              { name: "University Hospital", location: "Boston, MA", patients: "60,000+" },
              { name: "Community Care Center", location: "Houston, TX", patients: "40,000+" },
              { name: "Memorial Healthcare", location: "Miami, FL", patients: "80,000+" },
            ].map((hospital, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                    <Building2 className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle className="text-lg">{hospital.name}</CardTitle>
                  <CardDescription>{hospital.location}</CardDescription>
                  <Badge variant="secondary" className="mt-2">
                    {hospital.patients} patients served
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Partner With Us?</h2>
            <p className="text-lg text-gray-600">Contact our hospital partnerships team to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <Phone className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">24/7 Emergency Line</p>
            </div>

            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <Mail className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">hospitals@drop4life.com</p>
              <p className="text-sm text-gray-500">Response within 2 hours</p>
            </div>

            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <MapPin className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Medical Plaza</p>
              <p className="text-sm text-gray-500">Healthcare District</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/hospitals/register">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-12 py-3">
                <Heart className="h-5 w-5 mr-2" />
                Start Saving Lives Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
