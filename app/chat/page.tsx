"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Phone, Video, MoreVertical, Heart, MapPin, Clock } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "system" | "emergency"
}

interface ChatRoom {
  id: string
  recipientName: string
  donorName: string
  bloodType: string
  urgency: "critical" | "urgent" | "moderate"
  status: "active" | "completed" | "scheduled"
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock chat rooms data
  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      recipientName: "Sarah Johnson",
      donorName: "Michael Chen",
      bloodType: "O-",
      urgency: "critical",
      status: "active",
      lastMessage: "Thank you so much! I'll be there in 15 minutes.",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
    },
    {
      id: "2",
      recipientName: "Dr. Emily Rodriguez",
      donorName: "James Wilson",
      bloodType: "A+",
      urgency: "urgent",
      status: "scheduled",
      lastMessage: "Surgery is scheduled for tomorrow at 9 AM",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 0,
    },
    {
      id: "3",
      recipientName: "Lisa Thompson",
      donorName: "David Kim",
      bloodType: "B+",
      urgency: "moderate",
      status: "completed",
      lastMessage: "Donation completed successfully. Thank you!",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
    },
  ])

  // Mock messages for selected chat
  useEffect(() => {
    if (selectedChat) {
      const mockMessages: Message[] = [
        {
          id: "1",
          senderId: "recipient",
          senderName: "Sarah Johnson",
          content: "Hi! I urgently need O- blood for my surgery tomorrow. Are you available?",
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          type: "text",
        },
        {
          id: "2",
          senderId: "system",
          senderName: "System",
          content: "Blood type compatibility confirmed: O- → O-",
          timestamp: new Date(Date.now() - 55 * 60 * 1000),
          type: "system",
        },
        {
          id: "3",
          senderId: "donor",
          senderName: "Michael Chen",
          content: "Yes, I'm available! I can donate today. Which hospital should I go to?",
          timestamp: new Date(Date.now() - 50 * 60 * 1000),
          type: "text",
        },
        {
          id: "4",
          senderId: "recipient",
          senderName: "Sarah Johnson",
          content: "St. Mary's Hospital, 123 Medical Drive. Room 405. Thank you so much!",
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          type: "text",
        },
        {
          id: "5",
          senderId: "donor",
          senderName: "Michael Chen",
          content: "Perfect! I'm on my way. Should be there in about 20 minutes.",
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          type: "text",
        },
        {
          id: "6",
          senderId: "recipient",
          senderName: "Sarah Johnson",
          content: "Thank you so much! I'll be there in 15 minutes.",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          type: "text",
        },
      ]
      setMessages(mockMessages)
    }
  }, [selectedChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      content: message,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500"
      case "urgent":
        return "bg-orange-500"
      case "moderate":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto p-4 h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-4 gap-4 h-full">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Active Chats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {chatRooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedChat(room.id)}
                      className={`p-4 cursor-pointer hover:bg-muted/50 border-b transition-colors ${
                        selectedChat === room.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {room.recipientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{room.recipientName}</p>
                            <p className="text-xs text-muted-foreground">↔ {room.donorName}</p>
                          </div>
                        </div>
                        {room.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getUrgencyColor(room.urgency)} text-white text-xs`}>{room.urgency}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {room.bloodType}
                        </Badge>
                        <Badge className={`${getStatusColor(room.status)} text-white text-xs`}>{room.status}</Badge>
                      </div>

                      <p className="text-xs text-muted-foreground truncate mb-1">{room.lastMessage}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(room.lastMessageTime)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            {selectedChat ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {chatRooms
                            .find((r) => r.id === selectedChat)
                            ?.recipientName.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{chatRooms.find((r) => r.id === selectedChat)?.recipientName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Blood Type: {chatRooms.find((r) => r.id === selectedChat)?.bloodType}</span>
                          <span>•</span>
                          <Badge
                            className={`${getUrgencyColor(chatRooms.find((r) => r.id === selectedChat)?.urgency || "")} text-white text-xs`}
                          >
                            {chatRooms.find((r) => r.id === selectedChat)?.urgency}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.type === "system" ? (
                        <div className="bg-muted rounded-lg p-3 max-w-md text-center">
                          <p className="text-sm text-muted-foreground">{msg.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`max-w-md ${msg.senderId === "current-user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                        >
                          {msg.senderId !== "current-user" && (
                            <p className="text-xs font-medium mb-1">{msg.senderName}</p>
                          )}
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${msg.senderId === "current-user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} className="bg-red-600 hover:bg-red-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3 inline mr-1" />
                    All messages are encrypted and HIPAA compliant
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Select a Chat</h3>
                    <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
