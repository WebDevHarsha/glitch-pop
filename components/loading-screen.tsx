"use client"

export function LoadingScreen() {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-8">
        {/* Animated loader */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />

          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-secondary animate-spin" />

          {/* Inner ring */}
          <div className="absolute inset-4 rounded-full border-4 border-accent/20" />

          {/* Inner spinning ring */}
          <div
            className="absolute inset-4 rounded-full border-4 border-transparent border-b-accent animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          />

          {/* Center pulse */}
          <div className="absolute inset-8 rounded-full bg-accent opacity-50 blur-md animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary animate-pulse">Mixing your beat...</h2>
          <p className="text-muted-foreground">Crafting the perfect sound</p>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
