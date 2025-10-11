"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Clock, Users, Heart } from "lucide-react"
import { Header } from "@/components/header"

export default function EmergencyPage() {
  const [urgencyLevel, setUrgencyLevel] = useState("")
  const [bloodType, setBloodType] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Emergency Alert Banner */}
      <div className="bg-destructive text-destructive-foreground py-4">
        <div className="container flex items-center justify-center gap-3">
          <AlertTriangle className="h-6 w-6 animate-pulse" />
          <span className="text-lg font-semibold">EMERGENCY BLOOD REQUEST SYSTEM</span>
          <Badge variant="secondary" className="bg-white text-destructive">
            24/7 Active
          </Badge>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Emergency Blood Request</h1>
            <p className="text-lg text-muted-foreground">
              Submit urgent blood requests that will be immediately broadcasted to all compatible donors in your area
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Emergency Form */}
            <div className="lg:col-span-2">
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-destructive">
                    <AlertTriangle className="h-6 w-6 inline mr-2" />
                    Emergency Request Form
                  </CardTitle>
                  <CardDescription>
                    All fields are required. This request will be sent immediately to nearby donors.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type Required *</Label>
                      <Select value={bloodType} onValueChange={setBloodType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O- (Universal)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level *</Label>
                      <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical (Life-threatening)</SelectItem>
                          <SelectItem value="urgent">Urgent (Surgery scheduled)</SelectItem>
                          <SelectItem value="high">High (Within 24 hours)</SelectItem>
                          <SelectItem value="moderate">Moderate (Within 48 hours)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital/Medical Facility *</Label>
                      <Input id="hospital" placeholder="Enter hospital name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="units">Units Needed *</Label>
                      <Input id="units" type="number" placeholder="Number of units" min="1" max="10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Exact Location *</Label>
                    <Input id="location" placeholder="Hospital address or coordinates" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Emergency Contact *</Label>
                    <Input id="contact" placeholder="Phone number for immediate contact" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Medical Details</Label>
                    <Textarea
                      id="details"
                      placeholder="Additional medical information, patient condition, special requirements..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 emergency-gradient hover:opacity-90 text-lg py-6">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Submit Emergency Request
                    </Button>
                    <Button variant="outline" className="px-8 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 911
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Info Sidebar */}
            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">
                    <Clock className="h-5 w-5 inline mr-2" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">4.2 min</div>
                  <p className="text-sm text-muted-foreground">Average emergency response time</p>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-accent">
                    <Users className="h-5 w-5 inline mr-2" />
                    Active Donors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent mb-2">1,247</div>
                  <p className="text-sm text-muted-foreground">Available in your area</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Heart className="h-5 w-5 inline mr-2" />
                    Emergency Hotline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive mb-2">1-800-BLOOD-911</div>
                  <p className="text-sm text-muted-foreground mb-4">24/7 Emergency Blood Services</p>
                  <Button
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blood Type Compatibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <strong>Universal Donors:</strong> O-
                  </div>
                  <div className="text-sm">
                    <strong>Universal Recipients:</strong> AB+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Our system automatically finds compatible donors based on medical compatibility rules.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
