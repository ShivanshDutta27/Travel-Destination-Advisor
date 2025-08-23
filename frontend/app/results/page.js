"use client"
import { motion } from "framer-motion"
import CityCard from "@/components/CityCard"

const mockResults = [
  {
    name: "Yosemite National Park",
    img: "https://source.unsplash.com/600x400/?yosemite,nature",
    desc: "Granite cliffs, waterfalls, and giant sequoias. A paradise for hikers and climbers.",
    bestTime: "May – Jun, Sep",
  },
  {
    name: "Shimla",
    img: "https://source.unsplash.com/600x400/?shimla,hills",
    desc: "Colonial charm, snowy winters, and vibrant summer hill station vibes.",
    bestTime: "Mar – Jun, Oct – Nov",
  },
  {
    name: "Ooty",
    img: "https://source.unsplash.com/600x400/?ooty,tea",
    desc: "Tea plantations, botanical gardens, and the iconic toy train experience.",
    bestTime: "Oct – Jun",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text"
      >
        Your Travel Recommendations
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {mockResults.map((city, i) => (
          <div key={i}>
            <CityCard city={city} />
          </div>
        ))}
      </motion.div>

      <motion.a
        href="/preferences"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-400 text-black font-bold"
      >
        ← Adjust Preferences
      </motion.a>
    </div>
  )
}
