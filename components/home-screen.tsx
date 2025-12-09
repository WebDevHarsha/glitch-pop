"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

interface HomeScreenProps {
  onGenerate: (description: string, genre: string, mood: string, length: string) => void
}

export function HomeScreen({ onGenerate }: HomeScreenProps) {
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("Pop")
  const [mood, setMood] = useState("Happy")
  const [length, setLength] = useState("Medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim()) {
      onGenerate(description, genre, mood, length)
    }
  }

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-primary neon-glow">Glitch Pop</h1>
          <p className="text-muted-foreground text-lg">AI-Powered Song Generator</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="scan-line absolute w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>

            <div className="space-y-2 relative z-10">
              <Label htmlFor="description" className="text-foreground">
                Describe your song
              </Label>
              <Input
                id="description"
                placeholder="A summer anthem about freedom and adventure..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-muted border-border focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="space-y-2 relative z-10">
              <Label htmlFor="genre" className="text-foreground">
                Genre
              </Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger id="genre" className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="EDM">EDM</SelectItem>
                  <SelectItem value="Lo-fi">Lo-fi</SelectItem>
                  <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                  <SelectItem value="Acoustic">Acoustic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 relative z-10">
              <Label htmlFor="mood" className="text-foreground">
                Mood
              </Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="mood" className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Happy">Happy</SelectItem>
                  <SelectItem value="Dark">Dark</SelectItem>
                  <SelectItem value="Chill">Chill</SelectItem>
                  <SelectItem value="Energetic">Energetic</SelectItem>
                  <SelectItem value="Sad">Sad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 relative z-10">
              <Label htmlFor="length" className="text-foreground">
                Length
              </Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="length" className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Short">Short (~2 min)</SelectItem>
                  <SelectItem value="Medium">Medium (~3 min)</SelectItem>
                  <SelectItem value="Long">Long (~4 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-lg py-6 font-semibold pulse-glow"
              disabled={!description.trim()}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Song
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
