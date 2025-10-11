import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      fullName,
      phone,
      bloodGroup,
      userType,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      postalCode,
    } = await request.json()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Create user profile
    if (authData.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        phone,
        blood_group: bloodGroup,
        user_type: userType,
        date_of_birth: dateOfBirth,
        gender,
        address,
        city,
        state,
        postal_code: postalCode,
      })

      if (profileError) {
        return NextResponse.json({ error: "Failed to create user profile" }, { status: 400 })
      }
    }

    return NextResponse.json({
      message: "Registration successful. Please check your email to verify your account.",
      user: authData.user,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
