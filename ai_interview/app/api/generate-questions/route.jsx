// app/api/generate-questions/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const prompt = `You are an expert technical interviewer.
Job Title: ${jobPosition}
Job Description: ${jobDescription}
Interview Duration: ${duration}
Interview Type: ${type}

Please generate relevant interview questions.`;

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-small-3.2-24b-instruct:free',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
