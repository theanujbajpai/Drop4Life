"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Heart,
  MapPin,
  MessageCircle,
  Bell,
  User,
  Calendar,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react"

interface BloodRequest {
  id: string
  patient_name: string
  blood_group: string
  units_needed: number
  urgency_level: string
  hospital_name: string
  hospital_address: string
  required_by_date: string
  description: string
  created_at: string
  requester: {
    full_name: string
    phone: string
    email: string
  }
}

interface Donation {
  id: string
  recipient_id: string
  blood_group: string
  units_donated: number
  donation_date: string
  hospital_name: string
  status: string
  notes: string
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"matches" | "history" | "profile">("matches")
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([])
  const [donationHistory, setDonationHistory] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    livesSaved: 0,
    activeMatches: 0,
    responseRate: 98,
    lastDonation: "Jan 15",
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch blood requests
      const requestsResponse = await fetch("/api/blood-requests")
      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json()
        setBloodRequests(requestsData.requests || [])
        setStats((prev) => ({ ...prev, activeMatches: requestsData.requests?.length || 0 }))
      }

      // In a real app, you'd also fetch user's donation history
      // For now, we'll use mock data but structure it like real data
      setDonationHistory([
        {
          id: "1",
          recipient_id: "emergency-patient",
          blood_group: "O+",
          units_donated: 1,
          donation_date: "2024-01-15",
          hospital_name: "City General Hospital",
          status: "completed",
          notes: "Emergency surgery donation",
        },
        {
          id: "2",
          recipient_id: "john-smith",
          blood_group: "O+",
          units_donated: 1,
          donation_date: "2023-12-08",
          hospital_name: "St. Mary Medical Center",
          status: "completed",
          notes: "Regular donation",
        },
      ])

      setStats((prev) => ({ ...prev, livesSaved: 15 }))
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src="/profile-man.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Blood Donor</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Blood Group: O+
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>New York, NY</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>john@example.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{stats.livesSaved} donations made</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Lives Saved</span>
                    <span className="font-semibold">{stats.livesSaved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Matches</span>
                    <span className="font-semibold">{stats.activeMatches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="font-semibold">{stats.responseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Donation</span>
                    <span className="font-semibold">{stats.lastDonation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <Button
                variant={activeTab === "matches" ? "default" : "ghost"}
                onClick={() => setActiveTab("matches")}
                className="flex-1"
              >
                <Heart className="h-4 w-4 mr-2" />
                Active Matches
              </Button>
              <Button
                variant={activeTab === "history" ? "default" : "ghost"}
                onClick={() => setActiveTab("history")}
                className="flex-1"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Donation History
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                onClick={() => setActiveTab("profile")}
                className="flex-1"
              >
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
            </div>

            {/* Active Matches Tab */}
            {activeTab === "matches" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-red-500" />
                      Recent Match Requests
                    </CardTitle>
                    <CardDescription>People near you who need your blood type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                        <span className="ml-2">Loading blood requests...</span>
                      </div>
                    ) : bloodRequests.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No active blood requests at the moment.</p>
                        <p className="text-sm">Check back later for people who need your help.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bloodRequests.slice(0, 5).map((request) => (
                          <div
                            key={request.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback>
                                  {request.patient_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold">{request.patient_name}</h3>
                                  <Badge variant="outline" className="text-red-600 border-red-200">
                                    {request.blood_group}
                                  </Badge>
                                  <Badge variant={getUrgencyColor(request.urgency_level)}>
                                    {request.urgency_level} priority
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{request.hospital_name}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                  <span className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {request.units_needed} units needed
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {getTimeAgo(request.created_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Chat
                              </Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                Accept
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Donation History Tab */}
            {activeTab === "history" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-red-500" />
                      Your Donation History
                    </CardTitle>
                    <CardDescription>Track all your life-saving contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {donationHistory.map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {donation.recipient_id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </h3>
                              <p className="text-sm text-gray-600">{donation.hospital_name}</p>
                              <p className="text-xs text-gray-500">{formatDate(donation.donation_date)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">
                              {donation.blood_group}
                            </Badge>
                            <p className="text-sm text-green-600 font-medium capitalize">{donation.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-red-500" />
                      Profile Settings
                    </CardTitle>
                    <CardDescription>Manage your account information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <input className="w-full mt-1 p-2 border rounded-md" defaultValue="John" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <input className="w-full mt-1 p-2 border rounded-md" defaultValue="Doe" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input className="w-full mt-1 p-2 border rounded-md" defaultValue="john@example.com" />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <input className="w-full mt-1 p-2 border rounded-md" defaultValue="+1 (555) 123-4567" />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Address</label>
                        <textarea
                          className="w-full mt-1 p-2 border rounded-md"
                          rows={3}
                          defaultValue="123 Main St, New York, NY 10001"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifications" defaultChecked />
                        <label htmlFor="notifications" className="text-sm">
                          Receive notifications for nearby blood requests
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="emergency" defaultChecked />
                        <label htmlFor="emergency" className="text-sm">
                          Available for emergency donations
                        </label>
                      </div>

                      <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
