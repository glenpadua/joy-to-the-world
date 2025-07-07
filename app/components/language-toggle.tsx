"use client"

import { useLanguage } from "../contexts/language-context"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
        <button
          onClick={() => setLanguage(language === "en" ? "fr" : "en")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === "en" ? "bg-sky-500 text-white" : "text-sky-600 hover:bg-sky-100"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === "fr" ? "bg-sky-500 text-white" : "text-sky-600 hover:bg-sky-100"
          }`}
        >
          FR
        </button>
      </div>
    </div>
  )
}
