"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    title: "50 Years of",
    subtitlePrefix: "An archive celebrating",
    archiveDescription: "A permanent wall of birthday memories, stories, and photos gathered for Joy's 50th.",
    archiveBadge: "Birthday Archive",
    messageCount: "messages of love",
    joyMeter: "Joy-O-Meter",
    memoryFrom: "Memory from",
  },
  fr: {
    title: "50 ans de",
    subtitlePrefix: "Une archive pour célébrer",
    archiveDescription: "Un mur permanent de souvenirs, de mots et de photos réunis pour les 50 ans de Joy.",
    archiveBadge: "Archive d'anniversaire",
    messageCount: "messages d'amour",
    joyMeter: "Joie-O-Mètre",
    memoryFrom: "Souvenir de",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
