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
    <div className="relative z-10 min-h-screen p-6 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with bold boxes */}
        <div className="text-center space-y-4">
          <div className="inline-block bg-black text-white px-8 py-4 font-black text-3xl md:text-4xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] transform -rotate-1">
            {songData.title}
          </div>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="bg-yellow-400 text-black px-4 py-2 font-bold border-3 border-black uppercase tracking-wide transform rotate-1">
              {songData.genre}
            </span>
            <span className="bg-white text-black px-4 py-2 font-bold border-3 border-black uppercase tracking-wide">
              {songData.length}
            </span>
          </div>
        </div>

        {/* Lyrics Card */}
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-red-600 text-white inline-block px-4 py-2 mb-6 font-black text-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            LYRICS
          </div>

          <div className="space-y-6 text-black font-mono">
            {songData.lyrics.verse1 && (
              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-wider bg-gray-200 inline-block px-3 py-1 border-2 border-black">
                  Verse 1
                </p>
                <p className="leading-relaxed whitespace-pre-line pl-4 border-l-4 border-yellow-400">{songData.lyrics.verse1}</p>
              </div>
            )}

            {songData.lyrics.chorus && (
              <div className="space-y-2 bg-yellow-50 p-4 border-3 border-black">
                <p className="text-sm font-black uppercase tracking-wider bg-yellow-400 inline-block px-3 py-1 border-2 border-black">
                  Chorus
                </p>
                <p className="leading-relaxed whitespace-pre-line font-bold">{songData.lyrics.chorus}</p>
              </div>
            )}

            {songData.lyrics.verse2 && (
              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-wider bg-gray-200 inline-block px-3 py-1 border-2 border-black">
                  Verse 2
                </p>
                <p className="leading-relaxed whitespace-pre-line pl-4 border-l-4 border-yellow-400">{songData.lyrics.verse2}</p>
              </div>
            )}

            {songData.lyrics.bridge && (
              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-wider bg-gray-200 inline-block px-3 py-1 border-2 border-black">
                  Bridge
                </p>
                <p className="leading-relaxed whitespace-pre-line pl-4 border-l-4 border-red-600 italic">{songData.lyrics.bridge}</p>
              </div>
            )}
          </div>
        </div>

        {/* Audio Player Card */}
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-black text-white inline-block px-4 py-2 mb-4 font-black text-lg border-3 border-black transform rotate-1">
            AUDIO PREVIEW
          </div>
          <audio controls className="w-full" src={songData.audioUrl}>
            Your browser does not support the audio element.
          </audio>
          <p className="text-xs text-gray-600 mt-2 font-mono">* Placeholder audio preview</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onBackToHome}
            className="flex-1 bg-white hover:bg-gray-100 text-black border-4 border-black text-lg py-6 font-black uppercase tracking-wide transform hover:-rotate-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <Home className="mr-2 h-5 w-5" />
            New Song
          </Button>

          <Button
            onClick={onRegenerate}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-black text-lg py-6 font-black uppercase tracking-wide transform hover:rotate-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Regenerate
          </Button>

          <Button
            onClick={() => alert("Download feature coming soon!")}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white border-4 border-black text-lg py-6 font-black uppercase tracking-wide transform hover:-rotate-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <Download className="mr-2 h-5 w-5" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
