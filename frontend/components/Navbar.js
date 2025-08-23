"use client"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-black border-b border-cyan-400 sticky top-0 z-50">
      <Link href="/" className="text-2xl font-extrabold text-cyan-300">
        🌍 TravelAI
      </Link>
      <div className="flex gap-6">
        <Link href="/preferences" className="text-yellow-300 hover:text-white transition">Preferences</Link>
        <Link href="/results" className="text-yellow-300 hover:text-white transition">Results</Link>
      </div>
    </nav>
  )
}
