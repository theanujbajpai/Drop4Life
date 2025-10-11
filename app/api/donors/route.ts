import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const bloodGroup = searchParams.get("bloodGroup")
    const city = searchParams.get("city")
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = searchParams.get("radius") || "50" // Default 50km radius

    let query = supabase
      .from("users")
      .select("*")
      .eq("user_type", "donor")
      .eq("is_verified", true)
      .eq("is_available", true)

    if (bloodGroup) {
      query = query.eq("blood_group", bloodGroup)
    }
    if (city) {
      query = query.ilike("city", `%${city}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Filter by distance if coordinates provided
    let filteredData = data
    if (lat && lng) {
      const userLat = Number.parseFloat(lat)
      const userLng = Number.parseFloat(lng)
      const maxRadius = Number.parseFloat(radius)

      filteredData = data.filter((donor) => {
        if (!donor.latitude || !donor.longitude) return false

        const distance = calculateDistance(userLat, userLng, donor.latitude, donor.longitude)
        return distance <= maxRadius
      })
    }

    return NextResponse.json({ donors: filteredData })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
