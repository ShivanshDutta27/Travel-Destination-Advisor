"use client"
import { motion } from "framer-motion"
import { useState } from "react"

export default function BubbleSelector({ options, onChange }) {
  const [selected, setSelected] = useState([])

  const toggleSelect = (item) => {
    let newSel = selected.includes(item)
      ? selected.filter((x) => x !== item)
      : [...selected, item]
    setSelected(newSel)
    onChange(newSel)
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {options.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleSelect(item)}
          className={`px-6 py-3 rounded-full cursor-pointer border-2 text-lg font-semibold transition-all ${
            selected.includes(item)
              ? "bg-gradient-to-r from-yellow-300 to-cyan-400 text-black border-transparent shadow-lg"
              : "border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black"
          }`}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
}
