"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CityCard from "@/components/CityCard"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}

export default function ResultsPage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [prefs, setPrefs] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("prefs")
    if (saved) setPrefs(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (prefs.length === 0) {
      setLoading(false)
      return
    }

    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city: "Amritsar",
            country: "India",
            months: "Feb,May,Aug,Nov",
            category_tokens: prefs
          })
        })

        const data = await res.json()

        const mapped = await Promise.all(
          data.similar_cities.map(async (c) => {
            let imgUrl = ""
            try {
              const photoRes = await fetch(`/api/city?city=${encodeURIComponent(c.City)}`)
              const photoData = await photoRes.json()
              imgUrl = photoData.photoUrl
            } catch (err) {
              console.error("Photo fetch failed for", c.City, err)
              imgUrl = `https://source.unsplash.com/800x500/?${c.City},travel`
            }

            return {
              name: c.City,
              img: imgUrl,
              desc: c.Category,
              bestTime: "N/A",
              categories: c.Category.split(",").map(s => s.trim()) || []
            }
          })
        )

        setResults(mapped)
        
      } catch (err) {
        console.error("Error fetching results:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [prefs])

  return (
    <div className="flex flex-col items-center space-y-10 px-4 md:px-8 lg:px-16 w-full">
      <motion.h1
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text text-center"
      >
        Your Travel Recommendations
      </motion.h1>

      {loading && <p>Loading recommendations...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-400 text-center">
          No recommendations found. Please adjust preferences.
        </p>
      )}

      {!loading && results.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 w-full"
        >
          {results.map((city, i) => (
            <CityCard key={i} city={city} />
          ))}
        </motion.div>
      )}

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
