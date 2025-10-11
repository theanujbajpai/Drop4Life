import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const chatRoomId = searchParams.get("chatRoomId")

    if (!chatRoomId) {
      return NextResponse.json({ error: "Chat room ID is required" }, { status: 400 })
    }

    const { data: messages, error } = await supabase
      .from("messages")
      .select(`
        id,
        content,
        message_type,
        is_read,
        created_at,
        sender:users(id, full_name)
      `)
      .eq("chat_room_id", chatRoomId)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching messages:", error)
      return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
    }

    const processedMessages = messages?.map((msg) => ({
      id: msg.id,
      senderId: msg.sender?.id || "unknown",
      senderName: msg.sender?.full_name || "Unknown",
      content: msg.content,
      timestamp: new Date(msg.created_at),
      type: msg.message_type,
      isRead: msg.is_read,
    }))

    return NextResponse.json({ messages: processedMessages })
  } catch (error) {
    console.error("Error in messages GET API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { chatRoomId, senderId, content, messageType = "text" } = await request.json()

    if (!chatRoomId || !senderId || !content) {
      return NextResponse.json({ error: "Chat room ID, sender ID, and content are required" }, { status: 400 })
    }

    const { data: message, error } = await supabase
      .from("messages")
      .insert({
        chat_room_id: chatRoomId,
        sender_id: senderId,
        content,
        message_type: messageType,
      })
      .select(`
        id,
        content,
        message_type,
        created_at,
        sender:users(id, full_name)
      `)
      .single()

    if (error) {
      console.error("Error sending message:", error)
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    const processedMessage = {
      id: message.id,
      senderId: message.sender?.id || "unknown",
      senderName: message.sender?.full_name || "Unknown",
      content: message.content,
      timestamp: new Date(message.created_at),
      type: message.message_type,
    }

    return NextResponse.json({ message: processedMessage })
  } catch (error) {
    console.error("Error in messages POST API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
