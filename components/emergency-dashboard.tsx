"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, MapPin, Clock, Phone, Users, Activity } from "lucide-react"

const emergencyRequests = [
  {
    id: "ER-2024-001",
    bloodType: "O-",
    urgency: "Critical",
    hospital: "City General Hospital",
    location: "Downtown Medical District",
    distance: "2.3 km",
    timePosted: "5 minutes ago",
    unitsNeeded: 4,
    unitsSecured: 1,
    estimatedTime: "15 minutes",
  },
  {
    id: "ER-2024-002",
    bloodType: "AB+",
    urgency: "Urgent",
    hospital: "St. Mary's Medical Center",
    location: "Westside",
    distance: "8.7 km",
    timePosted: "12 minutes ago",
    unitsNeeded: 2,
    unitsSecured: 0,
    estimatedTime: "25 minutes",
  },
  {
    id: "ER-2024-003",
    bloodType: "B+",
    urgency: "High",
    hospital: "Regional Trauma Center",
    location: "North District",
    distance: "15.2 km",
    timePosted: "28 minutes ago",
    unitsNeeded: 6,
    unitsSecured: 3,
    estimatedTime: "35 minutes",
  },
]

export function EmergencyDashboard() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full emergency-gradient">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Live Emergency Dashboard</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time emergency blood requests from partner hospitals. Every second counts in saving lives.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {emergencyRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-destructive hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      request.urgency === "Critical"
                        ? "status-critical"
                        : request.urgency === "Urgent"
                          ? "status-urgent"
                          : "bg-orange-100 text-orange-800"
                    }
                  >
                    {request.urgency}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{request.timePosted}</span>
                </div>
                <CardTitle className="text-xl">
                  Blood Type: <span className="text-destructive">{request.bloodType}</span>
                </CardTitle>
                <CardDescription className="font-medium text-foreground">{request.hospital}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {request.location} • {request.distance} away
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Units Secured</span>
                    <span className="font-medium">
                      {request.unitsSecured}/{request.unitsNeeded}
                    </span>
                  </div>
                  <Progress value={(request.unitsSecured / request.unitsNeeded) * 100} className="h-2" />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>ETA: {request.estimatedTime}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 medical-gradient hover:opacity-90">
                    <Users className="h-4 w-4 mr-2" />
                    Respond
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Activity className="h-5 w-5 mr-2" />
            View All Emergency Requests
          </Button>
        </div>
      </div>
    </section>
  )
}
