import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { role, count } = await req.json()

    const prompt = `Generate ${count} UNIQUE AI use case titles for the role "${role}".

Rules:
- Each title must represent a DIFFERENT workflow.
- Do not repeat ideas with slightly different wording.
- Avoid generic topics.
- Focus on practical professional workflows.

Return ONLY a JSON array of strings.

Example:
[
  "AI for Product Roadmap Planning",
  "AI for Feature Prioritization",
  "AI for Writing User Stories"
]`

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        { role: "user", content: prompt }
      ]
    })

    const raw = response.choices[0].message.content || "[]"
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim()

    const parsedIdeas = JSON.parse(text)
    const uniqueIdeas = Array.from(new Set(parsedIdeas))

    return NextResponse.json({ ideas: uniqueIdeas })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    )
  }
}
