import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { description, genre } = await request.json();

    const prompt = `Generate short song lyrics for a 30-second song based on this description: "${description}". Genre: ${genre || "any"}. 
    
    IMPORTANT: Keep it very brief - only 30 seconds worth of lyrics (about 8-12 lines total).
    
    Create a simple structure:
    - One short verse (3-4 lines)
    - One catchy chorus/hook (4-5 lines)
    
    Keep it creative, emotional, and punchy. Return only the lyrics in this format:
    [Verse]
    (3-4 lines here)
    
    [Chorus]
    (4-5 lines here)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ lyrics: response.text });
  } catch (error: any) {
    console.error("Error generating lyrics:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate lyrics" },
      { status: 500 }
    );
  }
}
