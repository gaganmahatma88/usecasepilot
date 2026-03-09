import OpenAI from "openai"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { role, count } = await req.json()

    // Fetch existing use case titles for this role to avoid duplication
    const { data: roleRow } = await supabaseAdmin
      .from("roles")
      .select("id")
      .eq("title", role)
      .single()

    let existingTitles: string[] = []
    if (roleRow) {
      const { data: existingUseCases } = await supabaseAdmin
        .from("usecases")
        .select("title")
        .eq("role_id", roleRow.id)

      existingTitles = (existingUseCases || []).map((uc) => uc.title)
    }

    const existingSection =
      existingTitles.length > 0
        ? `\nAlready existing use cases (DO NOT repeat or paraphrase these):\n${existingTitles.map((t) => `- ${t}`).join("\n")}\n`
        : ""

    const prompt = `Generate ${count} AI use case titles for the role "${role}".
${existingSection}
Format rules:
- Every title MUST follow this exact format: "AI for [specific professional task]"
- The task must be a concrete daily workflow that a "${role}" actually performs.
- Be specific: name the exact task, not a broad category.

Quality rules:
- GOOD: "AI for Writing Sprint Retrospective Reports", "AI for Analysing Customer Churn Data", "AI for Drafting Job Offer Letters"
- BAD: "AI for productivity", "AI for business", "AI for automation", "AI for efficiency", "AI for decision making"
- Each title must describe a different, named workflow — not a rephrasing of the same idea.
- Do not generate vague or generic titles. If a title could apply to any professional in any industry, it is too generic.

Return ONLY a JSON array of strings. No explanation, no markdown, no extra text.

Example output:
[
  "AI for Product Roadmap Planning",
  "AI for Feature Prioritization",
  "AI for Customer Feedback Analysis",
  "AI for Writing User Stories",
  "AI for Sprint Retrospective Analysis"
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
