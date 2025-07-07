"use client"

import { Plus } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

interface FloatingActionButtonProps {
  onClick: () => void
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  const { t } = useLanguage()

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 group"
      aria-label={t("addMessage")}
    >
      <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Spread some joy! ✨
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
    </button>
  )
}
