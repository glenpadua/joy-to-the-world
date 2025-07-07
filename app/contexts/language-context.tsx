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
    subtitlePrefix: "Celebrating",
    messageCount: "messages of love",
    addMessage: "Spread the Joy",
    yourName: "Name",
    yourMessage: "Message",
    addPhoto: "Add Photo",
    submit: "Send Joy",
    submitting: "Spreading joy...",
    thankYou: "Joy delivered! Thank you for sharing! 🎉",
    joyMeter: "Joy-O-Meter",
    readMore: "Read More",
    close: "Close",
    namePlaceholder: "Who's spreading the joy?",
    messagePlaceholder: "Share a joyful memory, a moment that sparked happiness, or simply spread some joy! What makes him so special? 🌟",
    addPhotoPlaceholder: "Add a picture worth a thousand joys!",
  },
  fr: {
    title: "50 ans de",
    subtitlePrefix: "Célébration de",
    messageCount: "messages d'amour",
    addMessage: "Répandre la joie",
    yourName: "Nom",
    yourMessage: "Message",
    addPhoto: "Ajouter une photo",
    submit: "Envoyer la joie",
    submitting: "Répandre la joie...",
    thankYou: "Joie livrée ! Merci d'avoir partagé ! 🎉",
    joyMeter: "Joie-O-Mètre",
    readMore: "Lire plus",
    close: "Fermer",
    namePlaceholder: "Qui répand la joie ?",
    messagePlaceholder: "Partagez un souvenir joyeux, un moment qui a déclenché le bonheur, ou répandez simplement la joie ! Qu'est-ce qui le rend si spécial ? 🌟",
    addPhotoPlaceholder: "Ajoutez une photo qui vaut mille joies !",
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
