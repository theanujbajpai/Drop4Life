import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-red-400">Drop4Life</span>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Connecting blood donors and recipients to save lives. Our platform makes it easy to find compatible donors
              within your area and coordinate life-saving donations.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=100035454578573"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/imanujbajpai?t=W0PeN1NMqe11QDl-4JN5ow&s=09" className="text-gray-400 hover:text-red-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/theanujbajpai/"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anuj-bajpai-a2765b283/"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/find-donors" className="text-gray-300 hover:text-red-400 transition-colors">
                  Find Donors
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-red-400 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="text-gray-300 hover:text-red-400 transition-colors">
                  For Hospitals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-red-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">+91 947 **** 813</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">help@drop4life.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">24/7 Emergency Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Drop4Life. All rights reserved. Saving lives, one drop at a time.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
