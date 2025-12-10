"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/home-screen"
import { LoadingScreen } from "@/components/loading-screen"
import { ResultsScreen } from "@/components/results-screen"
import { generateMockSong } from "@/lib/mock-data"
import type { SongData } from "@/lib/types"

export default function Page() {
  const [screen, setScreen] = useState<"home" | "loading" | "results">("home")
  const [songData, setSongData] = useState<SongData | null>(null)

  const handleGenerate = (description: string, genre: string, mood: string, length: string) => {
    setScreen("loading")

    // Simulate generation with delay
    setTimeout(() => {
      const generated = generateMockSong(description, genre, mood, length)
      setSongData(generated)
      setScreen("results")
    }, 3000)
  }

  const handleRegenerate = () => {
    if (songData) {
      setScreen("loading")
      setTimeout(() => {
        const regenerated = generateMockSong(songData.description, songData.genre, songData.mood, songData.length)
        setSongData(regenerated)
        setScreen("results")
      }, 3000)
    }
  }

  const handleBackToHome = () => {
    setScreen("home")
    setSongData(null)
  }

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Retro grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: `
               linear-gradient(to right, black 1px, transparent 1px),
               linear-gradient(to bottom, black 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px'
           }}
      />

      {screen === "home" && <HomeScreen onGenerate={handleGenerate} />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "results" && songData && (
        <ResultsScreen songData={songData} onRegenerate={handleRegenerate} onBackToHome={handleBackToHome} />
      )}
    </main>
  )
}
