"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { useMessages } from "../contexts/message-context"
import Image from "next/image"
import { supabase } from "../../lib/supabase"

interface SubmissionModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function SubmissionModal({ onClose, onSuccess }: SubmissionModalProps) {
  const { t } = useLanguage()
  const { addMessage } = useMessages()
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)
    let photoUrl: string | undefined = undefined
    if (photoFile) {
      const fileExt = photoFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const { error } = await supabase.storage
        .from('joy-photos')
        .upload(fileName, photoFile, { cacheControl: '3600', upsert: false })
      if (error) {
        setIsSubmitting(false)
        alert('Photo upload failed!')
        return
      }
      const { data } = supabase.storage.from('joy-photos').getPublicUrl(fileName)
      photoUrl = data.publicUrl
    }
    await addMessage({
      name: name.trim(),
      message: message.trim(),
      photo_url: photoUrl,
    })
    setIsSubmitting(false)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-sky-800">{t("addMessage")}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("yourName")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              placeholder={t("namePlaceholder")}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("yourMessage")}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
              placeholder={t("messagePlaceholder")}
              required
            />
            <div className="text-right text-sm text-gray-500 mt-1">{message.length}/500</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("addPhoto")} (Optional)</label>

            {photo ? (
              <div className="relative">
                <Image src={photo || "https://placehold.co/400x300.png?text=No+Image"} width={400} height={300} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-sky-400 hover:bg-sky-50 transition-all group"
              >
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-sky-500 mb-2" />
                <span className="text-gray-500 group-hover:text-sky-600">{t("addPhotoPlaceholder")}</span>
              </button>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </div>
  )
}
