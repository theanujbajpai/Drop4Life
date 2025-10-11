import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"
import anujPic from "@/public/AnujBajpai.png"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
                <div className="mx-auto mb-4 w-40 h-40 relative">
                  <Image src={anujPic} alt="Anuj Bajpai" className="rounded-full object-cover" fill />
                </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about blood donation or need emergency assistance? We're here to help 24/7.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="Anuj" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Bajpai" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="bajpai@gmail.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <Input type="tel" placeholder="+91 947 **** 813" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="How can we help you?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">Send Message</Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Hotline</CardTitle>
                  <CardDescription>For urgent blood requests, call our 24/7 emergency line</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 text-lg font-semibold text-red-600">
                    <Phone className="h-5 w-5" />
                    <span>1-800-BLOOD-HELP</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Main Office</h3>
                        <p className="text-muted-foreground">
                          NIT Jamshedpur
                          <br />
                          Jamshedpur Jharkhand,
                          <br />
                          Bharat
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email Support</h3>
                        <p className="text-muted-foreground">
                          General: info@drop4life.com
                          <br />
                          Emergency: emergency@drop4life.com
                          <br />
                          Support: support@drop4life.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-5 w-5 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Office Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 8:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 4:00 PM
                          <br />
                          Sunday: Emergency only
                          <br />
                          <span className="text-red-600 font-medium">Emergency line: 24/7</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Request Emergency Blood
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Nearest Blood Bank
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Schedule Donation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
