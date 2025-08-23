"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      
      {/* Neon blobs */}
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

      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 drop-shadow-lg z-10 text-center"
      >
        Travel Recommender
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-4 text-lg text-gray-300 max-w-xl text-center z-10"
      >
        Discover your next dream destination tailored to your preferences.
      </motion.p>

      {/* Button to Preferences */}
      <Link href="/preferences">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-400 text-black font-bold text-lg shadow-xl z-10"
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  )
}
