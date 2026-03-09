import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { title, role } = await req.json()

    const prompt = `
You are writing a practical, professional AI use case article for a website that documents real workflows.

Title: ${title}
Target Role: ${role}

Return a JSON object with exactly these fields:

{
  "seo_title": "",
  "seo_description": "",
  "content": ""
}

---

SEO title rules:
- 60 characters max
- Include the main keyword from the title
- Do not start with "How to" or "The"

SEO description rules:
- 160 characters max
- Describe what the reader will learn
- Include the role name and the specific task
- Write as a complete sentence

---

Content rules:
- Written in MDX (standard Markdown — no JSX or custom components)
- Use clear, professional language
- Be specific to the "${role}" role — avoid generic statements that apply to any profession
- Each section must have real substance — no filler or placeholder text

Content must follow this exact structure with these exact headings:

## Overview

2–3 sentences explaining what the workflow is and what problem it solves for ${role}.

## Why This Matters for ${role}

2–3 sentences on why this specific task is important in the daily work of a ${role}. Focus on business impact or professional outcomes.

## How AI Helps With ${title.replace(/^AI for /i, '')}

2–3 sentences describing how AI improves, accelerates, or automates this workflow. Be concrete — name what the AI actually does (e.g. drafts, classifies, summarises, generates).

## Example Workflow

A short numbered step-by-step showing how a ${role} would complete this task using AI. 4–6 steps. Each step should be one clear sentence.

## Tools That Can Help

A short bulleted list of AI tool categories relevant to this workflow (e.g. "AI writing assistants", "AI meeting transcription tools"). Do not name or promote specific products.

---

Do not include any text outside the JSON object.
Do not wrap the response in markdown code blocks.
`

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "user", content: prompt }
      ]
    })

    const raw = response.choices[0].message.content || "{}"
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim()

    const parsed = JSON.parse(text)

    return NextResponse.json(parsed)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    )
  }
}
