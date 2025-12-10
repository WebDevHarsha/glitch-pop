import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import wav from "wav";
import path from "path";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function saveWaveFile(
  filename: string,
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
) {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    writer.on("finish", resolve);
    writer.on("error", reject);

    writer.write(pcmData);
    writer.end();
  });
}

export async function POST(request: Request) {
  try {
    const { lyrics, genre } = await request.json();

    if (!lyrics) {
      return NextResponse.json(
        { error: "Lyrics are required" },
        { status: 400 }
      );
    }

    // Generate singing audio using Gemini TTS
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [
        {
          parts: [
            {
              text: `Sing this song with emotion and melody (${genre || "pop"} style): ${lyrics}`,
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!data) {
      return NextResponse.json(
        { error: "No audio data received from Gemini" },
        { status: 500 }
      );
    }

    const audioBuffer = Buffer.from(data, "base64");

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `song-${timestamp}.wav`;
    const filePath = path.join(process.cwd(), "public", "generated", fileName);

    // Ensure directory exists
    const { mkdir } = await import("fs/promises");
    await mkdir(path.join(process.cwd(), "public", "generated"), {
      recursive: true,
    });

    // Save WAV file
    await saveWaveFile(filePath, audioBuffer);

    // Return the public URL
    return NextResponse.json({
      audioUrl: `/generated/${fileName}`,
      success: true,
    });
  } catch (error: any) {
    console.error("Error generating audio:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate audio" },
      { status: 500 }
    );
  }
}
