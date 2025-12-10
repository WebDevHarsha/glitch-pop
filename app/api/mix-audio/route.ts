import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
// @ts-ignore
import { decode } from "wav-decoder";
// @ts-ignore
import toWav from "audiobuffer-to-wav";

export async function POST(request: Request) {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const generatedDir = path.join(publicDir, "generated");
    
    const vocalPath = path.join(generatedDir, "song-audio.wav");
    const instrumentalPath = path.join(generatedDir, "song-instrumental.wav");
    const outputPath = path.join(generatedDir, `song-mixed-${Date.now()}.wav`);

    // Check if both files exist
    try {
      await fs.access(vocalPath);
      await fs.access(instrumentalPath);
    } catch (error) {
      return NextResponse.json(
        { error: "One or both audio files not found. Please generate vocals first." },
        { status: 404 }
      );
    }

    // Read both WAV files
    const vocalBuffer = await fs.readFile(vocalPath);
    const instrumentalBuffer = await fs.readFile(instrumentalPath);

    // Decode WAV files to audio data
    const vocalData = await decode(vocalBuffer);
    const instrumentalData = await decode(instrumentalBuffer);

    // Get the longer duration
    const maxLength = Math.max(
      vocalData.channelData[0].length,
      instrumentalData.channelData[0].length
    );

    // Mix the audio channels
    const sampleRate = vocalData.sampleRate;
    const numberOfChannels = Math.max(vocalData.numberOfChannels, instrumentalData.numberOfChannels);
    
    const mixedChannels: Float32Array[] = [];
    
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const mixed = new Float32Array(maxLength);
      
      const vocalChannel = vocalData.channelData[channel] || vocalData.channelData[0];
      const instrumentalChannel = instrumentalData.channelData[channel] || instrumentalData.channelData[0];
      
      for (let i = 0; i < maxLength; i++) {
        const vocalSample = i < vocalChannel.length ? vocalChannel[i] : 0;
        const instrumentalSample = i < instrumentalChannel.length ? instrumentalChannel[i] : 0;
        
        // Mix with reduced instrumental volume (vocals at 100%, instrumental at 30%)
        mixed[i] = vocalSample + (instrumentalSample * 0.3);
      }
      
      mixedChannels.push(mixed);
    }

    // Create AudioBuffer-like object
    const mixedAudioBuffer = {
      numberOfChannels: numberOfChannels,
      length: maxLength,
      sampleRate: sampleRate,
      getChannelData: (channel: number) => mixedChannels[channel]
    };

    // Convert to WAV
    const wavBuffer = toWav(mixedAudioBuffer as any);
    await fs.writeFile(outputPath, Buffer.from(wavBuffer));

    const fileName = path.basename(outputPath);
    return NextResponse.json({
      audioUrl: `/generated/${fileName}`,
      success: true,
    });
  } catch (error: any) {
    console.error("Error mixing audio:", error);
    return NextResponse.json(
      { error: error.message || "Failed to mix audio" },
      { status: 500 }
    );
  }
}
