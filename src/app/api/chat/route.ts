import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
    });

    const text = response.choices?.[0]?.message?.content || "No response";

    return Response.json(text);
  } catch (error) {
    console.error("Gemini OpenAI-compatible error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
