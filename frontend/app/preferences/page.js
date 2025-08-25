"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { addPref, removePref, addCustomPref } from "@/store/prefsSlice"

const defaultOptions = [
  "mountains", "beaches", "city life", "history",
  "nightlife", "adventure", "food", "culture",
  "nature", "shopping", "wildlife", "festivals"
]

export default function PreferencesPage() {
  useEffect(() => {
    localStorage.removeItem("prefs")
    localStorage.removeItem("preferences")
  }, [])

  const dispatch = useDispatch()
  const selected = useSelector((state) => state.prefs.selected)
  const [options, setOptions] = useState(defaultOptions)
  const [adding, setAdding] = useState(false)
  const [newPref, setNewPref] = useState("")
  const router = useRouter()

  const capitalize = (str) => str.replace(/\b\w/g, c => c.toUpperCase())

  const toggleSelect = (opt) => {
    const lowerOpt = opt.toLowerCase()
    if (selected.includes(lowerOpt)) {
      dispatch(removePref(lowerOpt))
    } else {
      dispatch(addPref(lowerOpt))
    }
  }

  const addPreference = () => {
    const lowerPref = newPref.trim().toLowerCase()
    if (lowerPref && !options.includes(lowerPref)) {
      setOptions([...options, lowerPref])
      dispatch(addCustomPref(lowerPref))
    }
    setNewPref("")
    setAdding(false)
  }

  const removeCustomPreference = (pref) => {
    setOptions(options.filter(o => o !== pref))
    if (selected.includes(pref)) dispatch(removePref(pref))
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 overflow-hidden">
      
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-96 h-96 rounded-full bg-cyan-400 blur-3xl top-20 left-20 opacity-40"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-96 h-96 rounded-full bg-yellow-300 blur-3xl bottom-20 right-20 opacity-40"
      />

      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 drop-shadow-lg z-10"
      >
        Choose Your Preferences
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 text-lg text-gray-300 z-10"
      >
        * Best results when you pick <span className="text-cyan-300 font-bold">3–7 preferences</span>
      </motion.p>

      <div className="mt-12 flex flex-wrap gap-4 justify-center max-w-3xl z-10">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleSelect(opt)}
            className={`px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all 
              ${selected.includes(opt) 
                ? "bg-gradient-to-r from-cyan-400 to-yellow-300 text-black" 
                : "bg-gray-800 hover:bg-gray-700 text-white"}`}
          >
            {capitalize(opt)}
          </motion.button>
        ))}
      </div>

      <div className="mt-8 z-10">
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-400 text-black font-bold shadow-md hover:scale-105 transition"
          >
            + Add More
          </button>
        ) : (
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={newPref}
              onChange={(e) => setNewPref(e.target.value)}
              placeholder="Enter preference"
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />
            <button
              onClick={addPreference}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-yellow-300 text-black font-bold"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Selected Preferences Box */}
      <div className="mt-12 w-full max-w-2xl bg-gray-900/50 rounded-xl p-6 border border-gray-700 z-10">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Your Picks:</h2>
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {selected.map((s, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-400 text-black font-semibold">
                {capitalize(s)}
                {options.includes(s) && !defaultOptions.includes(s) && (
                  <button
                    onClick={() => removeCustomPreference(s)}
                    className="ml-2 text-red-600 font-bold"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No preferences chosen yet.</p>
        )}
      </div>

      {selected.length > 0 && (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={() => {
          localStorage.setItem("prefs", JSON.stringify(selected))
          router.push("/results")
        }}
        className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-300 text-black font-bold text-xl shadow-lg hover:scale-105 transition"
      >
        See Results 
      </motion.button>
    )}
      
    </div>
  )
}
