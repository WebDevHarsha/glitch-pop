"use client"

import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Home } from "lucide-react"
import type { SongData } from "@/lib/types"

interface ResultsScreenProps {
  songData: SongData
  onRegenerate: () => void
  onBackToHome: () => void
}

export function ResultsScreen({ songData, onRegenerate, onBackToHome }: ResultsScreenProps) {
  return (
    <div className="relative z-10 min-h-screen p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{songData.title}</h1>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
              {songData.genre}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
              {songData.mood}
            </span>
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
              {songData.length}
            </span>
          </div>
        </div>

        {/* Lyrics Card */}
        <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Lyrics</h2>

          <div className="space-y-6 text-foreground/90">
            {songData.lyrics.verse1 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Verse 1</p>
                <p className="leading-relaxed whitespace-pre-line">{songData.lyrics.verse1}</p>
              </div>
            )}

            {songData.lyrics.chorus && (
              <div className="space-y-2 pl-4 border-l-2 border-accent">
                <p className="text-sm font-semibold text-accent uppercase tracking-wide">Chorus</p>
                <p className="leading-relaxed whitespace-pre-line font-medium">{songData.lyrics.chorus}</p>
              </div>
            )}

            {songData.lyrics.verse2 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Verse 2</p>
                <p className="leading-relaxed whitespace-pre-line">{songData.lyrics.verse2}</p>
              </div>
            )}

            {songData.lyrics.chorus && (
              <div className="space-y-2 pl-4 border-l-2 border-accent">
                <p className="text-sm font-semibold text-accent uppercase tracking-wide">Chorus</p>
                <p className="leading-relaxed whitespace-pre-line font-medium">{songData.lyrics.chorus}</p>
              </div>
            )}

            {songData.lyrics.bridge && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wide">Bridge</p>
                <p className="leading-relaxed whitespace-pre-line italic">{songData.lyrics.bridge}</p>
              </div>
            )}

            {songData.lyrics.chorus && (
              <div className="space-y-2 pl-4 border-l-2 border-accent">
                <p className="text-sm font-semibold text-accent uppercase tracking-wide">Chorus</p>
                <p className="leading-relaxed whitespace-pre-line font-medium">{songData.lyrics.chorus}</p>
              </div>
            )}
          </div>
        </div>

        {/* Audio Player Card */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-2xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 text-foreground">Audio Preview</h2>
          <audio controls className="w-full" src={songData.audioUrl}>
            Your browser does not support the audio element.
          </audio>
          <p className="text-xs text-muted-foreground mt-2">This is a placeholder audio preview</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onBackToHome}
            variant="outline"
            className="flex-1 border-border hover:bg-muted bg-transparent"
          >
            <Home className="mr-2 h-4 w-4" />
            New Song
          </Button>

          <Button
            onClick={onRegenerate}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>

          <Button
            onClick={() => alert("Download feature coming soon!")}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
