"use client"

import { useEffect, useState } from "react"
import {
  ChefHat,
  Mountain,
  Bike,
  TreePine,
  Recycle,
  Flower2,
  Plane,
  Music,
  Camera,
  Utensils,
  Globe,
  Footprints,
  Snowflake,
  Leaf,
  MapPin,
  Compass,
} from "lucide-react"

const joyIcons = [
  { icon: ChefHat, color: "text-orange-400" },
  { icon: Mountain, color: "text-gray-500" },
  { icon: Bike, color: "text-green-500" },
  { icon: TreePine, color: "text-emerald-600" },
  { icon: Recycle, color: "text-green-600" },
  { icon: Flower2, color: "text-pink-400" },
  { icon: Plane, color: "text-blue-500" },
  { icon: Music, color: "text-purple-500" },
  { icon: Camera, color: "text-indigo-500" },
  { icon: Utensils, color: "text-red-500" },
  { icon: Globe, color: "text-cyan-500" },
  { icon: Footprints, color: "text-amber-600" },
  { icon: Snowflake, color: "text-blue-300" },
  { icon: Leaf, color: "text-green-400" },
  { icon: MapPin, color: "text-rose-500" },
  { icon: Compass, color: "text-slate-500" },
]

export default function FloatingJoyIcons() {
  const [icons, setIcons] = useState<
    Array<{
      id: number
      x: number
      delay: number
      icon: React.ElementType
      color: string
      size: string
      duration: number
    }>
  >([])

  useEffect(() => {
    const initialIcons = Array.from({ length: 12 }, (_, i) => {
      const randomIcon = joyIcons[Math.floor(Math.random() * joyIcons.length)]
      return {
        id: i,
        x: 5 + Math.random() * 90, // Keep icons away from edges
        delay: Math.random() * 20, // Spread out the delays more
        icon: randomIcon.icon,
        color: randomIcon.color,
        size: Math.random() > 0.7 ? "w-8 h-8" : "w-6 h-6",
        duration: 25 + Math.random() * 15, // Vary animation duration
      }
    })
    setIcons(initialIcons)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((iconData) => {
        const IconComponent = iconData.icon
        return (
          <div
            key={iconData.id}
            className="absolute opacity-0 animate-float-smooth"
            style={{
              left: `${iconData.x}%`,
              bottom: "-60px", // Start below viewport
              animationDelay: `${iconData.delay}s`,
              animationDuration: `${iconData.duration}s`,
              animationFillMode: "forwards",
            }}
          >
            <IconComponent className={`${iconData.size} ${iconData.color} opacity-60`} />
          </div>
        )
      })}
    </div>
  )
}
