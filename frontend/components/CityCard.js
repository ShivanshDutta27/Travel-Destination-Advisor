"use client"
import { motion } from "framer-motion"

export default function CityCard({ city }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 140, damping: 12 }}
      className="w-full max-w-3xl mx-auto mb-8 bg-gray-900 rounded-2xl overflow-hidden border border-cyan-400/60 shadow-lg"
    >
      <motion.div
        className="relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
      >
        <img
          src={city.img}
          alt={city.name}
          className="w-full h-48 object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-yellow-300/0 via-cyan-400/0 to-yellow-300/0"
          whileHover={{ background: "linear-gradient(to top right, rgba(253,224,71,0.12), rgba(34,211,238,0.12))" }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>

      <div className="p-5">
        <h2 className="text-2xl font-semibold text-yellow-300">{city.name}</h2>
        <p className="text-gray-300 mt-2 text-sm leading-relaxed">{city.desc}</p>

        {city.categories && city.categories.length > 0 && (
          <div className="mt-4">
            <span className="text-cyan-300 font-semibold">Famous for:</span>
            <div className="grid grid-cols-2 gap-2 mt-1 text-gray-300 text-sm">
              {city.categories.map((cat, i) => (
                <span key={i} className="inline-block">
                  • {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          {city.bestTime && (
            <span className="text-cyan-300 text-sm font-semibold">
              Best Time: {city.bestTime}
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-400 text-black font-bold text-base shadow-md"
          >
            Save
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
