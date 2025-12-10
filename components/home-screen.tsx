"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Zap } from "lucide-react"

interface HomeScreenProps {
  onGenerate: (description: string, genre: string, mood: string, length: string) => void
}

export function HomeScreen({ onGenerate }: HomeScreenProps) {
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("Pop")
  const [length, setLength] = useState("Medium")
  const [lyrics, setLyrics] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim()) {
      onGenerate(description, genre, "", length)
    }
  }

  return (
    <div className="relative z-10 flex items-center justify-center h-screen p-6 overflow-hidden">
      <div className="w-full max-w-2xl">
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
                  className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 text-base py-5 font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="genre" className="text-black font-bold text-base mb-2 block uppercase tracking-wide">
                    Genre
                  </Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger
                      id="genre"
                      className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 font-mono h-11"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-3 border-black">
                      <SelectItem value="Pop">Pop</SelectItem>
                      <SelectItem value="EDM">EDM</SelectItem>
                      <SelectItem value="Lo-fi">Lo-fi</SelectItem>
                      <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                      <SelectItem value="Acoustic">Acoustic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="length" className="text-black font-bold text-base mb-2 block uppercase tracking-wide">
                    Length
                  </Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger
                      id="length"
                      className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 font-mono h-11"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-3 border-black">
                      <SelectItem value="Short">Short (~2 min)</SelectItem>
                      <SelectItem value="Medium">Medium (~3 min)</SelectItem>
                      <SelectItem value="Long">Long (~4 min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="lyrics" className="text-black font-bold text-base mb-2 block uppercase tracking-wide">
                  Lyrics <span className="text-gray-600 text-sm normal-case">(optional)</span>
                </Label>
                <Textarea
                  id="lyrics"
                  placeholder="Drop your bars here or let AI cook..."
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="bg-gray-100 border-3 border-black focus:border-black focus:ring-0 resize-none font-mono text-base"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white border-4 border-black text-xl py-6 font-black uppercase tracking-wider transform hover:rotate-1 transition-all shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] hover:shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!description.trim()}
          >
            <Zap className="mr-2 h-6 w-6" />
            Generate Song
          </Button>
        </form>
      </div>
    </div>
  )
}
