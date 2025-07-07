"use client"

import { useState } from "react"
import { useMessages } from "../contexts/message-context"
import MessageCard from "./message-card"
import MessageModal from "./message-modal"
import type { Message } from "../contexts/message-context"

export default function MessageWall() {
  const { messages } = useMessages()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  return (
    <section className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {messages.map((message, index) => (
            <MessageCard
              key={message.id}
              message={message}
              onClick={() => setSelectedMessage(message)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>

      {selectedMessage && <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />}
    </section>
  )
}
