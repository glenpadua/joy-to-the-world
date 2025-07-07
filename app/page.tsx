"use client"

import { useState, useEffect } from "react"
import { LanguageProvider } from "./contexts/language-context"
import { MessageProvider } from "./contexts/message-context"
import Hero from "./components/hero"
import MessageWall from "./components/message-wall"
import SubmissionModal from "./components/submission-modal"
import FloatingActionButton from "./components/floating-action-button"
import FloatingJoyIcons from "./components/floating-joy-icons"
import LanguageToggle from "./components/language-toggle"
import confetti from "canvas-confetti"

export default function BirthdayWall() {
  const [showModal, setShowModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        startVelocity: 35,
        gravity: 0.7,
        scalar: 1.1,
        ticks: 200,
        zIndex: 9999,
      })
    }
  }, [showConfetti])

  return (
    <LanguageProvider>
      <MessageProvider>
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
          {/* Mountain Background */}
          <div className="fixed inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-sky-200 to-transparent transform rotate-1"></div>
            <div className="absolute bottom-0 right-0 w-3/4 h-48 bg-gradient-to-t from-blue-200 to-transparent transform -rotate-2"></div>
          </div>

          <FloatingJoyIcons />
          <LanguageToggle />

          <main className="relative z-10">
            <Hero />
            <MessageWall />
          </main>

          <FloatingActionButton onClick={() => setShowModal(true)} />

          {showModal && (
            <SubmissionModal
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                setShowModal(false)
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 3000)
              }}
            />
          )}
        </div>
      </MessageProvider>
    </LanguageProvider>
  )
}
