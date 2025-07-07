"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "../../lib/supabase"

// Define the DB row type for messages
interface MessageRow {
  id: string
  name: string
  message: string
  photo_url?: string | null
  approved: boolean
  created_at: string
}

export interface Message {
  id: string
  name: string
  message: string
  photo_url?: string
  created_at: string
  size: "small" | "medium" | "large"
}

interface MessageContextType {
  messages: Message[]
  addMessage: (message: Omit<Message, "id" | "created_at" | "size">) => Promise<void>
  totalMessages: number
  loading: boolean
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false })
      if (!error && data) {
        setMessages(
          (data as MessageRow[]).map((msg) => ({
            id: msg.id,
            name: msg.name,
            message: msg.message,
            photo_url: msg.photo_url ?? undefined,
            created_at: msg.created_at,
            size: msg.message.length > 200 ? "large" : msg.message.length > 100 ? "medium" : "small",
          }))
        )
      }
      setLoading(false)
    }
    fetchMessages()
  }, [])

  const addMessage = async (newMessage: Omit<Message, "id" | "created_at" | "size">) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ ...newMessage }])
      .select()
      .single()
    if (!error && data) {
      setMessages((prev) => [
        {
          ...data,
          size: data.message.length > 200 ? "large" : data.message.length > 100 ? "medium" : "small",
        },
        ...prev,
      ])
    }
  }

  return (
    <MessageContext.Provider value={{ messages, addMessage, totalMessages: messages.length, loading }}>
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (!context) throw new Error("useMessages must be used within MessageProvider")
  return context
}
