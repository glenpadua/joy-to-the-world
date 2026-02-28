import { LanguageProvider } from "./contexts/language-context"
import Hero from "./components/hero"
import MessageWall from "./components/message-wall"
import FloatingJoyIcons from "./components/floating-joy-icons"
import LanguageToggle from "./components/language-toggle"

export default function BirthdayWall() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
      </div>
    </LanguageProvider>
  )
}
