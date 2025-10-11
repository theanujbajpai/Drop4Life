"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, Users, Bell, MessageCircle } from "lucide-react"

interface BloodRequest {
  id: string
  patient_name: string
  blood_group: string
  units_needed: number
  urgency_level: string
  hospital_name: string
  required_by_date: string
  description: string
}

interface Donor {
  id: string
  full_name: string
  blood_group: string
  city: string
  last_donation_date: string
  is_available: boolean
}

export default function DashboardContent() {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([])
  const [nearbyDonors, setNearbyDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch blood requests
      const requestsResponse = await fetch("/api/blood-requests")
      const requestsData = await requestsResponse.json()
      setBloodRequests(requestsData.requests || [])

      // Fetch nearby donors
      const donorsResponse = await fetch("/api/donors?city=Bangalore")
      const donorsData = await donorsResponse.json()
      setNearbyDonors(donorsData.donors || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with Drop4Life.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bloodRequests.length}</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Donors</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nearbyDonors.length}</div>
            <p className="text-xs text-muted-foreground">In your area</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lives Saved</CardTitle>
            <Heart className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12m</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blood Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-500" />
              Recent Blood Requests
            </CardTitle>
            <CardDescription>Latest requests from people in need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bloodRequests.slice(0, 5).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{request.patient_name}</span>
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        {request.blood_group}
                      </Badge>
                      <Badge className={`text-white ${getUrgencyColor(request.urgency_level)}`}>
                        {request.urgency_level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {request.hospital_name}
                      </span>
                      <span>{request.units_needed} units needed</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600">
                    Help
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Donors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Nearby Donors
            </CardTitle>
            <CardDescription>Available donors in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyDonors.slice(0, 5).map((donor) => (
                <div key={donor.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{donor.full_name}</span>
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        {donor.blood_group}
                      </Badge>
                      {donor.is_available && <Badge className="bg-green-500 text-white">Available</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {donor.city}
                      </span>
                      <span>Last donated: {donor.last_donation_date || "Never"}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                    <MessageCircle className="h-3 w-3" />
                    Contact
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
