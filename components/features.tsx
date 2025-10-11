import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, MessageCircle, Shield, Zap, Users, Hospital } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Location-Based Matching",
    description: "Find compatible donors within 50km radius using advanced geolocation technology.",
  },
  {
    icon: MessageCircle,
    title: "Secure Chat System",
    description: "Connect with donors and recipients through our encrypted messaging platform.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "All users are verified with valid blood group certificates for safety and trust.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get real-time alerts when compatible donors are nearby or when help is needed.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Join a growing community of donors, recipients, and healthcare professionals.",
  },
  {
    icon: Hospital,
    title: "Hospital Integration",
    description: "Partner hospitals can manage blood requests and coordinate donations efficiently.",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Features for Life-Saving Connections
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with compassionate care to make blood donation more accessible
            and efficient than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <feature.icon className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
