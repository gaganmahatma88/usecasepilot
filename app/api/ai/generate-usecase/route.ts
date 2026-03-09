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
- Written in MDX (standard Markdown — inline HTML anchor tags are allowed, no other JSX or custom components)
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

A bulleted list of 3–5 real, well-known tools relevant to this workflow.
For each tool, output an HTML anchor tag using this exact format:

- <a href="https://example.com" target="_blank" rel="nofollow noopener">Tool Name</a> — one sentence describing what it does for this workflow.

Rules:
- Use the tool's real homepage URL (e.g. https://snyk.io, https://www.sonarqube.org, https://github.com/features/copilot)
- Only include tools that genuinely apply to the workflow described
- Do not invent URLs — only use well-known tools with verifiable public websites
- Keep the description to one sentence focused on the specific workflow

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
