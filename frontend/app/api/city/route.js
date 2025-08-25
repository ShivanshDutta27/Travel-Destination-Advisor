// app/api/photo/route.js
import { NextResponse } from "next/server"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get("city") || "travel"

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    )
    if (!res.ok) throw new Error("Unsplash failed")

    const data = await res.json()
    const photoUrl = data.results?.[0]?.urls?.regular || `https://source.unsplash.com/600x400/?${city},travel`

    return NextResponse.json({ photoUrl })
  } catch (err) {
    console.error("Unsplash API error:", err)
    return NextResponse.json({ photoUrl: `https://source.unsplash.com/600x400/?${city},travel` })
  }
}

