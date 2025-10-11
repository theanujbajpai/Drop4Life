import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["300", "400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Drop4Life - Professional Medical Blood Donation Network",
  description:
    "Advanced AI-powered blood donation platform connecting verified donors with hospitals. Real-time emergency matching, secure medical chat, and blockchain-verified donation records. HIPAA compliant and ISO 27001 certified.",
  keywords:
    "blood donation, emergency blood, medical platform, hospital network, donor matching, medical emergency, healthcare technology, blood bank",
  authors: [{ name: "Drop4Life Medical Team" }],
  openGraph: {
    title: "Drop4Life - Professional Medical Blood Donation Network",
    description: "Save lives with our advanced medical blood donation platform",
    type: "website",
  },
    generator: 'v0.app',
    icons: {
    icon: "/favicon.png", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
