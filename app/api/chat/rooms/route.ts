import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get chat rooms for the user with latest message info
    const { data: chatRooms, error } = await supabase
      .from("chat_rooms")
      .select(`
        id,
        status,
        created_at,
        updated_at,
        recipient:users!chat_rooms_recipient_id_fkey(id, full_name, blood_type),
        donor:users!chat_rooms_donor_id_fkey(id, full_name, blood_type),
        blood_request:blood_requests(urgency_level),
        messages(content, created_at, sender_id, is_read)
      `)
      .or(`recipient_id.eq.${userId},donor_id.eq.${userId}`)
      .order("updated_at", { ascending: false })

    if (error) {
      console.error("Error fetching chat rooms:", error)
      return NextResponse.json({ error: "Failed to fetch chat rooms" }, { status: 500 })
    }

    // Process chat rooms to include unread count and latest message
    const processedRooms = chatRooms?.map((room) => {
      const messages = room.messages || []
      const latestMessage = messages.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )[0]

      const unreadCount = messages.filter((msg) => !msg.is_read && msg.sender_id !== userId).length

      return {
        id: room.id,
        recipientName: room.recipient?.full_name || "Unknown",
        donorName: room.donor?.full_name || "Unknown",
        bloodType: room.recipient?.blood_type || room.donor?.blood_type || "Unknown",
        urgency: room.blood_request?.urgency_level || "moderate",
        status: room.status,
        lastMessage: latestMessage?.content || "No messages yet",
        lastMessageTime: latestMessage?.created_at || room.created_at,
        unreadCount,
      }
    })

    return NextResponse.json({ chatRooms: processedRooms })
  } catch (error) {
    console.error("Error in chat rooms API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { recipientId, donorId, bloodRequestId } = await request.json()

    if (!recipientId || !donorId) {
      return NextResponse.json({ error: "Recipient ID and Donor ID are required" }, { status: 400 })
    }

    // Check if chat room already exists
    const { data: existingRoom } = await supabase
      .from("chat_rooms")
      .select("id")
      .eq("recipient_id", recipientId)
      .eq("donor_id", donorId)
      .single()

    if (existingRoom) {
      return NextResponse.json({ chatRoomId: existingRoom.id })
    }

    // Create new chat room
    const { data: newRoom, error } = await supabase
      .from("chat_rooms")
      .insert({
        recipient_id: recipientId,
        donor_id: donorId,
        blood_request_id: bloodRequestId,
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error creating chat room:", error)
      return NextResponse.json({ error: "Failed to create chat room" }, { status: 500 })
    }

    return NextResponse.json({ chatRoomId: newRoom.id })
  } catch (error) {
    console.error("Error in chat rooms POST API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
