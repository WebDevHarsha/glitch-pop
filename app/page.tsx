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
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {screen === "home" && <HomeScreen onGenerate={handleGenerate} />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "results" && songData && (
        <ResultsScreen songData={songData} onRegenerate={handleRegenerate} onBackToHome={handleBackToHome} />
      )}
    </main>
  )
}
