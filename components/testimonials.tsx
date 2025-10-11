import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sunil Kumar Behra",
    role: "Emergency Medicine Physician",
    content:
      "Drop4Life has revolutionized how we handle blood emergencies. The speed and reliability of finding compatible donors has saved countless lives in our ER.",
    rating: 5,
    avatar: "/doctor-sunil.png",
  },
  {
    name: "Abhay Kumar Sharma",
    role: "Blood Donor",
    content:
      "I've donated blood 15 times through Drop4Life. The platform makes it so easy to help people in my community. The chat feature helps coordinate everything perfectly.",
    rating: 5,
    avatar: "/abhay-smiling.png",
  },
  {
    name: "Vineeta",
    role: "Recipient Mother",
    content:
      "When my daughter needed an emergency transfusion, Drop4Life connected us with a donor in just 8 minutes. I can't thank this platform enough for saving her life.",
    rating: 5,
    avatar: "/hispanic-mother.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stories from Our Community</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from donors, recipients, and healthcare professionals who trust Drop4Life to save lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <Quote className="h-8 w-8 text-red-200" />
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
