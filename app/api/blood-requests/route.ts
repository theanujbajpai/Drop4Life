import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const bloodGroup = searchParams.get("bloodGroup")
    const urgency = searchParams.get("urgency")
    const city = searchParams.get("city")

    let query = supabase
      .from("blood_requests")
      .select(`
        *,
        requester:users!blood_requests_requester_id_fkey(full_name, phone, email)
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (bloodGroup) {
      query = query.eq("blood_group", bloodGroup)
    }
    if (urgency) {
      query = query.eq("urgency_level", urgency)
    }
    if (city) {
      query = query.ilike("hospital_address", `%${city}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ requests: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const requestData = await request.json()

    const { data, error } = await supabase.from("blood_requests").insert(requestData).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ request: data[0] })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
