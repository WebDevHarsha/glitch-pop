export interface SongData {
  title: string
  description: string
  genre: string
  mood: string
  length: string
  lyrics: {
    verse1?: string
    verse2?: string
    chorus?: string
    bridge?: string
  }
  audioUrl: string
}
