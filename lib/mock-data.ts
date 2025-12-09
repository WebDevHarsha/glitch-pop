import type { SongData } from "./types"

const mockLyrics = {
  pop: {
    happy: {
      verse1: "Walking down the boulevard\nSunshine in my heart\nEvery step I take today\nFeels like a brand new start",
      chorus:
        "We're dancing in the light\nEverything feels right\nThis moment's ours tonight\nWe're shining oh so bright",
      verse2: "Colors painting up the sky\nMusic in the air\nLiving like there's no goodbye\nWithout a single care",
      bridge:
        "Oh-oh-oh, we're flying high\nOh-oh-oh, touching the sky\nNothing can bring us down\nWe're wearing victory's crown",
    },
    energetic: {
      verse1:
        "Turn it up, feel the bass\nHeartbeat racing, no time to waste\nEnergy flowing through my veins\nBreaking free from all these chains",
      chorus:
        "Jump, jump, higher than before\nWe want more, more, more\nFeel the power, feel the heat\nMove your body to this beat",
      verse2:
        "Lightning strikes inside my soul\nLosing all my self-control\nElectric vibes are in the air\nThrowing my hands up everywhere",
      bridge:
        "We won't stop, we won't slow\nLet the rhythm take control\nOne more time, here we go\nLet the music steal the show",
    },
  },
  edm: {
    energetic: {
      verse1:
        "Lights are flashing all around\nBass is shaking through the ground\nLost inside this digital dream\nNothing's ever as it seems",
      chorus:
        "Drop the beat, let it flow\nTo the rhythm, let it go\nWe're electric, feel the spark\nDancing through the neon dark",
      verse2:
        "Synthesizers fill the air\nWe're united everywhere\nOne more drop, one more rise\nReaching up to touch the skies",
      bridge:
        "Build it up, build it up now\nFeel the energy somehow\nWhen the bass drops we'll be free\nLost in this infinity",
    },
    dark: {
      verse1:
        "Shadows creeping on the wall\nEchoes in this empty hall\nBass so deep it shakes my core\nCan't escape, there's no back door",
      chorus:
        "In the darkness we collide\nThere's nowhere left to hide\nFeel the thunder, feel the storm\nIn chaos we transform",
      verse2:
        "Frequencies that pierce the night\nDistorted sounds, no end in sight\nLost inside this maze of sound\nWhere darkness can be found",
      bridge:
        "Let it break, let it fall\nLet it consume us all\nIn this void we'll find our way\nWhere the shadows come to play",
    },
  },
  lofi: {
    chill: {
      verse1:
        "Vinyl crackles soft and low\nCoffee's brewing nice and slow\nCity lights fade into view\nMidnight haze in shades of blue",
      chorus:
        "Take it easy, take your time\nEverything will be just fine\nBreathe it in, let it flow\nLet the peaceful rhythm show",
      verse2:
        "Rain drops tapping on the glass\nWatching all the cars go past\nNothing much to do tonight\nJust this moment feels so right",
      bridge:
        "Close your eyes and drift away\nThere's no rush, no need to stay\nIn this space we're floating free\nJust you, the music, and me",
    },
    sad: {
      verse1:
        "Pages turning one by one\nThinking of what can't be undone\nMemories in sepia tone\nSitting here all alone",
      chorus:
        "Sometimes it's okay to feel\nAll these wounds that need to heal\nLet the sadness wash away\nMaybe not today, someday",
      verse2:
        "Old photographs on the floor\nCan't go back to before\nTears are falling like the rain\nLearning how to smile through pain",
      bridge:
        "It's alright to not be fine\nTake it one day at a time\nIn this melancholy space\nYou'll find your saving grace",
    },
  },
  hiphop: {
    energetic: {
      verse1:
        "Yeah, started from the bottom now we're here\nMaking moves, shifting into higher gear\nHustling hard every single day\nNothing's gonna stand up in my way",
      chorus:
        "We're on fire, can't slow down\nTaking over, running this town\nHands up high, make some noise\nThis is our time, feel the poise",
      verse2:
        "Dream big, work harder than the rest\nPutting every rival to the test\nBuilding empires brick by brick\nSuccess is ours, watch us stick",
      bridge:
        "Uh, they said we couldn't make it\nSo we had to go and take it\nNow we're standing at the top\nAnd we're never gonna stop",
    },
    dark: {
      verse1:
        "Midnight city streets so cold\nStories never to be told\nShadows lurking in my mind\nSearching for what I can't find",
      chorus:
        "Walking through the dark alone\nTurned my heart into stone\nEvery scar has made me stronger\nCan't hold me back no longer",
      verse2:
        "Demons whispering my name\nPlaying this twisted game\nBut I won't let them win tonight\nStanding tall, ready to fight",
      bridge:
        "Yeah, I've been through the fire\nRising higher and higher\nFrom the ashes I was born\nA new legend in the morn",
    },
  },
  acoustic: {
    happy: {
      verse1:
        "Strumming chords beneath the tree\nSinging songs of you and me\nSimple moments, simple joys\nLaughter like when we were girls and boys",
      chorus:
        "This is life, pure and true\nAll I need is here with you\nGuitar strings and summer breeze\nPerfect days like these",
      verse2:
        "Sunset paints the sky in gold\nStories that we've never told\nFootprints in the sandy shore\nCouldn't ask for anything more",
      bridge:
        "Oh, these are the days we'll remember\nFrom summer to December\nEvery note, every word\nSweetest song you've ever heard",
    },
    sad: {
      verse1:
        "Empty chair across from me\nReminded of what used to be\nYour voice still echoes in these walls\nWaiting for your call",
      chorus: "How do I let you go?\nSome things I'll never know\nYour memory's all I have\nPhotographs and an epitaph",
      verse2:
        "Guitar weeps a lonely tune\nUnderneath this pale moon\nWishing you were here tonight\nEverything would be alright",
      bridge:
        "Time will heal they always say\nBut you're still here every day\nIn every song I'll ever play\nYou're here to stay",
    },
  },
}

const titles = [
  "Neon Dreams",
  "Electric Nights",
  "Midnight Reverie",
  "Summer Anthem",
  "Digital Heart",
  "Cosmic Dance",
  "Urban Symphony",
  "Endless Echo",
  "Crystal Skies",
  "Thunder Roll",
  "Velvet Memories",
  "Infinite Horizon",
  "Broken Halos",
  "Phoenix Rising",
  "Stardust Trail",
  "Ocean Waves",
]

export function generateMockSong(description: string, genre: string, mood: string, length: string): SongData {
  // Get appropriate lyrics based on genre and mood
  const genreKey = genre.toLowerCase().replace("-", "") as keyof typeof mockLyrics
  const moodKey = mood.toLowerCase() as keyof (typeof mockLyrics)[typeof genreKey]

  // Fallback to default if combination doesn't exist
  let lyrics = mockLyrics.pop.happy

  if (mockLyrics[genreKey] && mockLyrics[genreKey][moodKey]) {
    lyrics = mockLyrics[genreKey][moodKey]
  }

  // Random title
  const title = titles[Math.floor(Math.random() * titles.length)]

  // Placeholder audio URL
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

  return {
    title,
    description,
    genre,
    mood,
    length,
    lyrics,
    audioUrl,
  }
}
