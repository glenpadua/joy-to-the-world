"use client"

import { X } from "lucide-react"
import type { ArchiveMessage } from "../data/archive"
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"

interface MessageModalProps {
  message: ArchiveMessage
  onClose: () => void
}

export default function MessageModal({ message, onClose }: MessageModalProps) {
  const { language, t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white border-2 border-sky-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-sky-100 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-sky-800">{t("memoryFrom")} {message.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {message.photo_path && (
            <div className="mb-6">
              <Image src={message.photo_path} alt="" width={400} height={300} className="w-full rounded-xl shadow-lg" />
            </div>
          )}

          <p className="text-sky-800 leading-relaxed text-lg font-medium whitespace-pre-wrap mb-6">{message.message}</p>

          <div className="flex items-center justify-between pt-4 border-t border-sky-100">
            <div className="text-sky-600 font-semibold text-lg">— {message.name}</div>
            <div className="text-xs text-gray-400">
              {new Date(message.created_at).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
