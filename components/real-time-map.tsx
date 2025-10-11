"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Users, Clock, Filter } from "lucide-react"

const nearbyDonors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    bloodType: "O-",
    distance: "1.2 km",
    availability: "Available",
    lastDonation: "3 months ago",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Michael Chen",
    bloodType: "O-",
    distance: "2.8 km",
    availability: "Available",
    lastDonation: "2 months ago",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    bloodType: "O-",
    distance: "4.1 km",
    availability: "Busy",
    lastDonation: "1 month ago",
    rating: 5.0,
  },
  {
    id: 4,
    name: "James Wilson",
    bloodType: "O-",
    distance: "5.7 km",
    availability: "Available",
    lastDonation: "4 months ago",
    rating: 4.7,
  },
]

export function RealTimeMap() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">AI-Powered Donor Matching</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced algorithm finds the best compatible donors within your area using real-time location data and
            medical compatibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <Card className="h-96 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Interactive Donor Map</h3>
                  <p className="text-muted-foreground">Real-time locations of available donors</p>
                </div>
                <Button className="medical-gradient">
                  <Navigation className="h-4 w-4 mr-2" />
                  Enable Location Services
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Donor List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Nearby O- Donors</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
2
            <div className="space-y-3">
              {nearbyDonors.map((donor) => (
                <Card key={donor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{donor.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{donor.distance}</span>
                            <span>•</span>
                            <span>★ {donor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={donor.availability === "Available" ? "status-available" : "status-busy"}>
                          {donor.availability}
                        </Badge>
                        <div className="text-xs text-muted-foreground">Last: {donor.lastDonation}</div>
                      </div>
                    </div>

                    {donor.availability === "Available" && (
                      <div className="flex gap-2 mt-3 pt-3 border-t">
                        <Button size="sm" className="flex-1 medical-gradient">
                          Contact Donor
                        </Button>
                        <Button size="sm" variant="outline">
                          <Clock className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
