import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const API_KEY = "sk-0d95caa1656e412cbca084845d7b9c1f";

    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: `You are a professional prompt engineer. Enhance the given prompt to be more specific, detailed, and effective. Add context, constraints, desired format, and clarity. 

IMPORTANT: Return ONLY the enhanced prompt as plain text without any markdown formatting, asterisks (*), bold text (**), headers (#), bullet points (-), or any other formatting symbols. Use simple, clean text only.`,
            },
            {
              role: "user",
              content: `Enhance this prompt: "${prompt}"`,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    let enhanced = data.choices[0]?.message?.content || "";

    // Strip any remaining markdown formatting
    enhanced = enhanced
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold **text**
      .replace(/\*(.*?)\*/g, "$1") // Remove italic *text*
      .replace(/#{1,6}\s/g, "") // Remove headers #
      .replace(/^[-*+]\s/gm, "") // Remove bullet points
      .replace(/^\d+\.\s/gm, "") // Remove numbered lists
      .replace(/`{1,3}(.*?)`{1,3}/gs, "$1") // Remove code blocks
      .replace(/---+/g, "") // Remove horizontal rules
      .replace(/^\s*>\s/gm, "") // Remove blockquotes
      .trim();

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error("Enhancement error:", error);
    return NextResponse.json(
      { error: "Failed to enhance prompt" },
      { status: 500 }
    );
  }
}
