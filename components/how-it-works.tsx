import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Search, MessageCircle, Heart } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Register & Verify",
    description: "Create your profile and upload valid blood group certification for verification.",
    step: "01",
  },
  {
    icon: Search,
    title: "Find Matches",
    description: "Our AI-powered system finds compatible donors or recipients within your area.",
    step: "02",
  },
  {
    icon: MessageCircle,
    title: "Connect Safely",
    description: "Chat securely with matched users to coordinate donation details and timing.",
    step: "03",
  },
  {
    icon: Heart,
    title: "Save Lives",
    description: "Complete the donation process and make a life-saving difference in your community.",
    step: "04",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How Drop4Life Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process makes it easy to connect with compatible donors and recipients in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="flex justify-center mb-6 mt-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
                    <step.icon className="h-8 w-8 text-red-600" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>

                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
