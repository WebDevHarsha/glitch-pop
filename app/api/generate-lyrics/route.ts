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
    
    Also, suggest the best voice from this list that matches the genre and song style:
    Zephyr (Bright), Puck (Upbeat), Charon (Informative), Kore (Firm), Fenrir (Excitable), Leda (Youthful), 
    Orus (Firm), Aoede (Breezy), Callirrhoe (Easy-going), Autonoe (Bright), Enceladus (Breathy), Iapetus (Clear), 
    Umbriel (Easy-going), Algieba (Smooth), Despina (Smooth), Erinome (Clear), Algenib (Gravelly), Rasalgethi (Informative), 
    Laomedeia (Upbeat), Achernar (Soft), Alnilam (Firm), Schedar (Even), Gacrux (Mature), Pulcherrima (Forward), 
    Achird (Friendly), Zubenelgenubi (Casual), Vindematrix (Gentle), Sadachbia (Lively), Sadaltager (Knowledgeable), Sulafat (Warm)
    
    Return in this EXACT JSON format:
    {
      "lyrics": "[Verse]\\n(lyrics here)\\n\\n[Chorus]\\n(lyrics here)",
      "voiceName": "VoiceName"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = (response.text || "").trim();
    
    // Try to parse JSON from the response
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const jsonText = responseText.replace(/```json\n?|\n?```/g, '').trim();
      parsedResponse = JSON.parse(jsonText);
    } catch (e) {
      // If parsing fails, return just the text as lyrics with default voice
      return NextResponse.json({ 
        lyrics: responseText,
        voiceName: "Puck"
      });
    }

    return NextResponse.json({ 
      lyrics: parsedResponse.lyrics,
      voiceName: parsedResponse.voiceName || "Puck"
    });
  } catch (error: any) {
    console.error("Error generating lyrics:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate lyrics" },
      { status: 500 }
    );
  }
}
