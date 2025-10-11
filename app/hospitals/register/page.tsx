"use client"

import type React from "react"

import { useState } from "react"
import { Building2, Upload, MapPin, Users, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function HospitalRegisterPage() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalType: "",
    licenseNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    contactPerson: "",
    contactTitle: "",
    contactPhone: "",
    contactEmail: "",
    bedCapacity: "",
    bloodBankCapacity: "",
    emergencyServices: false,
    traumaCenter: false,
    description: "",
  })

  const [documents, setDocuments] = useState({
    license: null,
    accreditation: null,
    insurance: null,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Hospital registration data:", formData)
    console.log("Documents:", documents)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Register Your <span className="text-red-500">Hospital</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of trusted healthcare institutions and start saving more lives with Drop4Life
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hospital Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-red-500" />
                Hospital Information
              </CardTitle>
              <CardDescription>Basic information about your healthcare facility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hospitalName">Hospital Name *</Label>
                  <Input
                    id="hospitalName"
                    value={formData.hospitalName}
                    onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                    placeholder="Enter hospital name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospitalType">Hospital Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("hospitalType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Hospital</SelectItem>
                      <SelectItem value="specialty">Specialty Hospital</SelectItem>
                      <SelectItem value="teaching">Teaching Hospital</SelectItem>
                      <SelectItem value="trauma">Trauma Center</SelectItem>
                      <SelectItem value="children">Children's Hospital</SelectItem>
                      <SelectItem value="rehabilitation">Rehabilitation Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Medical License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  placeholder="Enter medical license number"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bedCapacity">Bed Capacity</Label>
                  <Input
                    id="bedCapacity"
                    type="number"
                    value={formData.bedCapacity}
                    onChange={(e) => handleInputChange("bedCapacity", e.target.value)}
                    placeholder="Number of beds"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodBankCapacity">Blood Bank Capacity (Units)</Label>
                  <Input
                    id="bloodBankCapacity"
                    type="number"
                    value={formData.bloodBankCapacity}
                    onChange={(e) => handleInputChange("bloodBankCapacity", e.target.value)}
                    placeholder="Blood storage capacity"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergencyServices"
                    checked={formData.emergencyServices}
                    onCheckedChange={(checked) => handleInputChange("emergencyServices", checked as boolean)}
                  />
                  <Label htmlFor="emergencyServices">24/7 Emergency Services</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="traumaCenter"
                    checked={formData.traumaCenter}
                    onCheckedChange={(checked) => handleInputChange("traumaCenter", checked as boolean)}
                  />
                  <Label htmlFor="traumaCenter">Trauma Center</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                Location Information
              </CardTitle>
              <CardDescription>Hospital address and location details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter street address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Enter state"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="Enter ZIP code"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                Contact Information
              </CardTitle>
              <CardDescription>Primary contact details and responsible person</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Hospital Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Hospital Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="hospital@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.hospital.com"
                />
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Primary Contact Person</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Full Name *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      placeholder="Dr. John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactTitle">Title/Position *</Label>
                    <Input
                      id="contactTitle"
                      value={formData.contactTitle}
                      onChange={(e) => handleInputChange("contactTitle", e.target.value)}
                      placeholder="Chief Medical Officer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="doctor@hospital.com"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-500" />
                Required Documents
              </CardTitle>
              <CardDescription>Upload required verification documents (PDF format only)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Medical License *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-300 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload License</p>
                    <input type="file" className="hidden" accept=".pdf" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Accreditation Certificate *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-300 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload Certificate</p>
                    <input type="file" className="hidden" accept=".pdf" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Insurance Certificate</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-300 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload Insurance</p>
                    <input type="file" className="hidden" accept=".pdf" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Tell us more about your hospital and blood donation needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="description">Hospital Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your hospital, specialties, and how you plan to use Drop4Life..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2 mb-6">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-red-500 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-red-500 hover:underline">
                    Privacy Policy
                  </a>
                  . I confirm that all information provided is accurate and that I have the authority to register this
                  hospital.
                </Label>
              </div>

              <div className="flex items-center gap-2 mb-6 p-4 bg-blue-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-500" />
                <p className="text-sm text-blue-700">
                  Your application will be reviewed within 24-48 hours. We may contact you for additional verification.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" size="lg" className="bg-red-500 hover:bg-red-600 text-white flex-1">
                  Submit Registration
                </Button>
                <Button type="button" variant="outline" size="lg" className="flex-1 bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
