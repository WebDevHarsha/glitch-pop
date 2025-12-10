"use client"

export function LoadingScreen() {
  return (
    <div className="relative z-10 flex items-center justify-center h-screen p-4">
      <div className="text-center space-y-8">
        {/* Rotating boxes loader */}
        <div className="relative w-40 h-40 mx-auto">
          {/* Red box */}
          <div className="absolute inset-0 bg-red-600 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-spin" 
               style={{ animationDuration: '2s' }}
          />
          
          {/* Yellow box */}
          <div className="absolute inset-6 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-spin" 
               style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          />
          
          {/* Black center */}
          <div className="absolute inset-12 bg-black flex items-center justify-center">
            <div className="w-4 h-4 bg-white animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-red-600 text-white px-4 py-2 font-black text-2xl transform -rotate-1 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              MIXING
            </div>
            <div className="bg-yellow-400 text-black px-4 py-2 font-black text-2xl transform rotate-1 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              BEATS
            </div>
          </div>
          <p className="text-gray-700 font-mono text-sm">Cooking up something fresh...</p>
        </div>

        {/* Progress bars */}
        <div className="space-y-2 max-w-xs mx-auto">
          <div className="h-3 bg-white border-3 border-black overflow-hidden">
            <div className="h-full bg-red-600 animate-pulse" style={{ width: '60%' }} />
          </div>
          <div className="h-3 bg-white border-3 border-black overflow-hidden">
            <div className="h-full bg-yellow-400 animate-pulse" style={{ width: '40%', animationDelay: '0.3s' }} />
          </div>
          <div className="h-3 bg-white border-3 border-black overflow-hidden">
            <div className="h-full bg-black animate-pulse" style={{ width: '80%', animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
