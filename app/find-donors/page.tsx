"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, MapPin, MessageCircle, Phone, Star, Filter, Clock, Heart } from "lucide-react"


const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

// Mock donor data
const donors = [
  {
    id: 1,
    name: "Komal Srivastava",
    bloodGroup: "O+",
    distance: "2.3 km",
    rating: 4.9,
    donations: 25,
    lastActive: "2 hours ago",
    verified: true,
    available: true,
    avatar: "/komal-donate.png",
    location: "AHR Hostel NIT JSR",
  },
  {
    id: 2,
    name: "Lokesh Kumar",
    bloodGroup: "O+",
    distance: "4.7 km",
    rating: 4.8,
    donations: 18,
    lastActive: "5 hours ago",
    verified: true,
    available: true,
    avatar: "/lokesh-donor.png",
    location: "C-612 Hostel J NIT JSR",
  },
  {
    id: 3,
    name: "Madhu",
    bloodGroup: "O+",
    distance: "8.1 km",
    rating: 4.7,
    donations: 32,
    lastActive: "1 day ago",
    verified: true,
    available: false,
    avatar: "/madhu-donor.png",
    location: "NIT JSR Girls Hostel",
  },
  {
    id: 4,
    name: "Kranti Kumar",
    bloodGroup: "O+",
    distance: "12.5 km",
    rating: 4.6,
    donations: 12,
    lastActive: "3 hours ago",
    verified: true,
    available: true,
    avatar: "/kk-k.png",
    location: "B-619 Hostel J NIT JSR",
  },
]

export default function FindDonorsPage() {
  const [searchFilters, setSearchFilters] = useState({
    bloodGroup: "",
    location: "",
    maxDistance: "50",
    urgency: "medium",
  })

  const [filteredDonors, setFilteredDonors] = useState(donors)

  const handleSearch = () => {
    // Filter logic would go here
    console.log("Searching with filters:", searchFilters)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Blood Donors</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search for compatible blood donors in your area. Connect instantly and coordinate life-saving donations
              through our secure platform.
            </p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-red-500" />
                Search Filters
              </CardTitle>
              <CardDescription>Specify your requirements to find the most suitable donors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group Needed *</Label>
                  <Select
                    value={searchFilters.bloodGroup}
                    onValueChange={(value) => setSearchFilters({ ...searchFilters, bloodGroup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter city or ZIP code"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxDistance">Max Distance (km)</Label>
                  <Select
                    value={searchFilters.maxDistance}
                    onValueChange={(value) => setSearchFilters({ ...searchFilters, maxDistance: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                      <SelectItem value="100">100 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select
                    value={searchFilters.urgency}
                    onValueChange={(value) => setSearchFilters({ ...searchFilters, urgency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Planned</SelectItem>
                      <SelectItem value="medium">Medium - Soon</SelectItem>
                      <SelectItem value="high">High - Urgent</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search Donors
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Available Donors</h2>
              <p className="text-gray-600">{filteredDonors.length} donors found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDonors.map((donor) => (
                <Card key={donor.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={donor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {donor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold">{donor.name}</h3>
                            {donor.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{donor.rating}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{donor.donations} donations</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={donor.available ? "default" : "secondary"}
                        className={donor.available ? "bg-green-100 text-green-800" : ""}
                      >
                        {donor.available ? "Available" : "Busy"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium">Blood Group: {donor.bloodGroup}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{donor.distance}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{donor.location}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Last active: {donor.lastActive}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <Button variant="outline" className="flex-1 bg-transparent" disabled={!donor.available}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={!donor.available}>
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <Card className="mt-12 bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Blood Needed?</h3>
                <p className="text-red-700 mb-4">
                  For life-threatening emergencies, contact our 24/7 emergency hotline
                </p>
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Emergency: 1-800-BLOOD-NOW
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
