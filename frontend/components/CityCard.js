"use client"
import { motion } from "framer-motion"

export default function CityCard({ city }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 140, damping: 12 }}
      className="bg-gray-900 rounded-2xl overflow-hidden border border-cyan-400/60 shadow-lg"
    >
      <motion.div
        className="relative overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
      >
        <img
          src={city.img}
          alt={city.name}
          className="w-full h-48 object-cover"
        />
        {/* subtle neon overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-yellow-300/0 via-cyan-400/0 to-yellow-300/0"
          whileHover={{ background: "linear-gradient(to top right, rgba(253,224,71,0.12), rgba(34,211,238,0.12))" }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-yellow-300">{city.name}</h2>
        <p className="text-gray-300 mt-2 text-sm leading-relaxed">
          {city.desc}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-cyan-300 text-sm font-semibold">
            Best Time: {city.bestTime}
          </span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-400 text-black text-xs font-bold"
          >
            Save
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
