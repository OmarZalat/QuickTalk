import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    console.log(text);
    return Response.json(text);
  } catch (error) {
    console.error("Gemini error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
