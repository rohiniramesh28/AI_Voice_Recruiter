import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    console.log("🟡 Final Prompt:\n", FINAL_PROMPT);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "user",
            content: FINAL_PROMPT,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("🟢 API Response:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: "No response from model." }, { status: 500 });
    }

    return NextResponse.json(data.choices[0].message);

  } catch (e) {
    console.error("🔴 Error generating questions:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
