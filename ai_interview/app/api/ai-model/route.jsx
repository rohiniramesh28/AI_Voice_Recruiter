import { QUESTIONS_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    // Defensive check
    if (!jobPosition || !jobDescription || !duration || !type) {
      return NextResponse.json({ error: "Missing input fields" }, { status: 400 });
    }

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [{ role: "user", content: FINAL_PROMPT }],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", data);

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: "No output from model" }, { status: 500 });
    }

    return NextResponse.json(data.choices[0].message);

  } catch (err) {
    console.error("Error generating questions:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
