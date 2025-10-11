import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const createServerClient = () => {
  const cookieStore = cookies()

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      getSession: async () => {
        const authCookie = cookieStore.get("sb-access-token")
        if (!authCookie) return { data: { session: null }, error: null }

        // In a real implementation, you'd validate the token here
        return { data: { session: null }, error: null }
      },
    },
  })
}

export const isSupabaseConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
