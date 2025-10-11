"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, Phone, MessageCircle } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-red-600">Drop4Life</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/find-donors" className="text-sm font-medium hover:text-red-600 transition-colors">
            Find Donors
          </Link>
          <Link href="/chat" className="text-sm font-medium hover:text-red-600 transition-colors">
            Chat
          </Link>
          <Link href="/hospitals" className="text-sm font-medium hover:text-red-600 transition-colors">
            Hospitals
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-red-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-red-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/register">Register</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            asChild
          >
            <Link href="/emergency">
              <Phone className="h-4 w-4 mr-2" />
              Emergency
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            <Link href="/find-donors" className="block text-sm font-medium hover:text-red-600">
              Find Donors
            </Link>
            <Link href="/chat" className="block text-sm font-medium hover:text-red-600">
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Chat
            </Link>
            <Link href="/hospitals" className="block text-sm font-medium hover:text-red-600">
              Hospitals
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-red-600">
              About
            </Link>
            <Link href="/contact" className="block text-sm font-medium hover:text-red-600">
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/register">Register</Link>
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              asChild
            >
              <Link href="/emergency">
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
