import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, MapPin, Shield } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
    description: "Successful donor-recipient matches",
  },
  {
    icon: Clock,
    value: "<15min",
    label: "Average Response",
    description: "Time to find compatible donors",
  },
  {
    icon: MapPin,
    value: "50km",
    label: "Search Radius",
    description: "Maximum distance for donor matching",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Verified Users",
    description: "All profiles are medically verified",
  },
]

export function Stats() {
  return (
    <section className="py-16 bg-red-600">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm text-white">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-white/80">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
