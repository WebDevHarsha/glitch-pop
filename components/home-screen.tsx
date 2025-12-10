"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Sparkles } from "lucide-react"

interface HomeScreenProps {
  onGenerate: (description: string, genre: string, mood: string, length: string) => void
}

export function HomeScreen({ onGenerate }: HomeScreenProps) {
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [length, setLength] = useState("Medium")
  const [lyrics, setLyrics] = useState("")
  const [isGeneratingLyrics, setIsGeneratingLyrics] = useState(false)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [audioUrl, setAudioUrl] = useState("")
  const [voiceName, setVoiceName] = useState("Puck")

  const handleGenerateRandomLyrics = async () => {
    if (!description.trim()) {
      alert("Please describe your vibe first!")
      return
    }

    setIsGeneratingLyrics(true)
    try {
      const response = await fetch("/api/generate-lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          genre: genre,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setLyrics(data.lyrics)
        if (data.voiceName) {
          setVoiceName(data.voiceName)
        }
      } else {
        alert("Failed to generate lyrics: " + (data.error || "Unknown error"))
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate lyrics. Please try again.")
    } finally {
      setIsGeneratingLyrics(false)
    }
  }

  const handleGenerateAudio = async () => {
    if (!lyrics.trim()) {
      alert("Please generate or write lyrics first!")
      return
    }

    setIsGeneratingAudio(true)
    try {
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lyrics: lyrics,
          genre: genre,
          voiceName: voiceName,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setAudioUrl(data.audioUrl)
      } else {
        alert("Failed to generate audio: " + (data.error || "Unknown error"))
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate audio. Please try again.")
    } finally {
      setIsGeneratingAudio(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) {
      return
    }

    setIsGeneratingAudio(true)
    try {
      const response = await fetch("/api/mix-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setAudioUrl(data.audioUrl)
      } else {
        alert("Failed to mix audio: " + (data.error || "Unknown error"))
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to mix audio. Please try again.")
    } finally {
      setIsGeneratingAudio(false)
    }
  }

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen p-6 overflow-y-auto">
      <div className="w-full max-w-2xl py-8">
        {/* Title with bold tilted boxes */}
        <div className="mb-8 flex items-center justify-center gap-3 flex-wrap">
          <div className="bg-red-600 text-white px-6 py-3 font-black text-4xl md:text-5xl transform -rotate-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            GLITCH
          </div>
          <div className="bg-yellow-400 text-black px-6 py-3 font-black text-4xl md:text-5xl transform rotate-1 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            POP
          </div>
        </div>

        {/* <p className="text-center text-lg mb-8 font-mono">
          Bringing <span className="bg-yellow-400 px-2 py-1 font-bold">hackathons</span> together so you never miss one.
          Discover events, dump code, and <span className="bg-red-600 text-white px-2 py-1 font-bold">win big</span>.
        </p> */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white border-4 border-black p-6 transform hover:-rotate-1 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-black font-bold text-base mb-2 block uppercase tracking-wide">
                  What's your vibe?
                </Label>
                <Input
                  id="description"
                  placeholder="A summer anthem about freedom and adventure..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 text-base py-5 font-mono text-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="genre" className="text-black font-bold text-base mb-2 block uppercase tracking-wide">
                    Genre
                  </Label>
                  <Input
                    id="genre"
                    placeholder="Pop, EDM, Hip-Hop..."
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 text-base h-11 font-mono text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="length" className="text-black font-bold text-base mb-2 block uppercase tracking-wide">
                    Length
                  </Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger
                      id="length"
                      className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 font-mono h-11 text-black"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-3 border-black">
                      <SelectItem value="Short">Short (~30 sec)</SelectItem>
                      <SelectItem value="Medium">Medium (~1 min)</SelectItem>
                      <SelectItem value="Long">Long (~2 min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="lyrics" className="text-black font-bold text-base uppercase tracking-wide">
                    Lyrics <span className="text-gray-600 text-sm normal-case">(optional)</span>
                  </Label>
                  <Button
                    type="button"
                    onClick={handleGenerateRandomLyrics}
                    disabled={!description.trim() || isGeneratingLyrics}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black border-3 border-black text-sm py-2 px-3 font-bold uppercase transform hover:rotate-1 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="mr-1 h-4 w-4" />
                    {isGeneratingLyrics ? "Generating..." : "Random"}
                  </Button>
                </div>
                <Textarea
                  id="lyrics"
                  placeholder="Drop your bars here or let AI cook..."
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 resize-none font-mono text-base text-black"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Audio Preview Section */}
          {audioUrl && (
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-black text-white inline-block px-4 py-2 mb-4 font-black text-lg border-3 border-black transform rotate-1">
                YOUR SONG
              </div>
              <audio controls className="w-full" src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={handleGenerateAudio}
              disabled={!lyrics.trim() || isGeneratingAudio}
              className="bg-red-600 hover:bg-red-700 text-white border-4 border-black text-xl py-6 font-black uppercase tracking-wider transform hover:-rotate-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              {isGeneratingAudio ? "Singing..." : "Generate Vocals"}
            </Button>

            <Button
              type="submit"
              className="bg-black hover:bg-gray-900 text-white border-4 border-black text-xl py-6 font-black uppercase tracking-wider transform hover:rotate-1 transition-all shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] hover:shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isGeneratingAudio}
            >
              <Zap className="mr-2 h-6 w-6" />
              {isGeneratingAudio ? "Mixing..." : "Mix Song"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
