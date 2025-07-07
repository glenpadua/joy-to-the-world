"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import type { Message } from "../contexts/message-context"
import Image from "next/image"

interface MessageCardProps {
  message: Message
  onClick: () => void
  delay: number
}

const TOP_CROP_IMAGES = [
  "https://oagmnxqqbkynjfvuzcnq.supabase.co/storage/v1/object/public/joy-photos//Jo-new.jpeg",
]

export default function MessageCard({ message, onClick, delay }: MessageCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`break-inside-avoid mb-4 animate-fade-in-up cursor-pointer group`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white border-2 border-sky-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 hover:rotate-1">
        {message.photo_url && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={message.photo_url || "https://placehold.co/400x300.png?text=No+Image"}
              alt=""
              width={400}
              height={300}
              className={`w-full h-full object-cover transition-all duration-500 ${
                TOP_CROP_IMAGES.includes(message.photo_url) ? "object-top" : "object-center"
              } ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
              onLoad={() => setImageLoaded(true)}
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          <p className="text-sky-800 leading-relaxed text-base font-medium mb-4">{message.message}</p>

          <div className="flex items-center justify-between">
            <div className="text-sky-600 font-semibold">— {message.name}</div>
            <div className="w-6 h-6 text-pink-500">❤️</div>
          </div>
        </div>
      </div>
    </div>
  )
}
