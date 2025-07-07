"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "../contexts/language-context"
import { useMessages } from "../contexts/message-context"
import { Mountain, Sparkles, ChefHat, Music, Camera, Globe, Flower2, TreePine } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const heroIcons: Array<{ icon: React.ComponentType<{ className?: string }>; color: string }> = [
  { icon: Mountain, color: "text-sky-600" },
  { icon: Sparkles, color: "text-yellow-500" },
  { icon: ChefHat, color: "text-orange-500" },
  { icon: Music, color: "text-purple-500" },
  { icon: Camera, color: "text-indigo-500" },
  { icon: Globe, color: "text-cyan-500" },
  { icon: Flower2, color: "text-pink-400" },
  { icon: TreePine, color: "text-emerald-600" },
]

const joyNames = ["Jo Uncle", "Jo", "Joy", "Joy Mendez"]

export default function Hero() {
  const { t } = useLanguage()
  const { totalMessages } = useMessages()
  const [randomIcons, setRandomIcons] = useState<Array<{ icon: React.ComponentType<{ className?: string }>; color: string }>>([])
  const [nameIndex, setNameIndex] = useState(0)

  useEffect(() => {
    // Select 2 random icons for the hero
    const shuffled = [...heroIcons].sort(() => 0.5 - Math.random())
    setRandomIcons(shuffled.slice(0, 2))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((i) => (i + 1) % joyNames.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative px-4 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-sky-800 mb-4 animate-fade-in">
            {t("title")} <span className="text-blue-500 font-extrabold drop-shadow joy-name">Joy</span>
          </h1>

          {randomIcons.length > 0 && (
            <>
              <div className="absolute -top-4 -right-4 animate-bounce">
                {(() => {
                  const IconComponent = randomIcons[0].icon
                  return <IconComponent className={`w-8 h-8 ${randomIcons[0].color}`} />
                })()}
              </div>
              <div className="absolute -top-2 -left-6 animate-bounce" style={{ animationDelay: "0.5s" }}>
                {(() => {
                  const IconComponent = randomIcons[1].icon
                  return <IconComponent className={`w-6 h-6 ${randomIcons[1].color}`} />
                })()}
              </div>
            </>
          )}
        </div>

        <p className="text-xl md:text-2xl text-sky-600 mb-8 animate-fade-in-delay">
          {t("subtitlePrefix")} {" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={joyNames[nameIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{ display: "inline-block", minWidth: 24 }}
            >
              {joyNames[nameIndex]}
            </motion.span>
          </AnimatePresence>
        </p>

        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 inline-flex items-center gap-2 shadow-lg animate-fade-in-delay-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sky-800 font-semibold">
            {totalMessages} {t("messageCount")}
          </span>
        </div>

        {/* Joy Meter */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="text-sm text-sky-600 mb-2 font-medium">{t("joyMeter")} 📊</div>
          <div className="bg-white/50 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min((totalMessages / 20) * 100, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          <div className="text-xs text-sky-500 mt-1 text-center">
            {totalMessages < 5 && "Just getting started! 🌱"}
            {totalMessages >= 5 && totalMessages < 10 && "Joy is building! 🌟"}
            {totalMessages >= 10 && totalMessages < 15 && "Overflowing with joy! 🎉"}
            {totalMessages >= 15 && "Maximum joy achieved! 🚀"}
          </div>
        </div>
      </div>
    </section>
  )
}
