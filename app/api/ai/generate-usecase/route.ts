import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { title, role } = await req.json()

    const prompt = `
You are writing a practical AI use case article.

Title: ${title}
Target Role: ${role}

Return a JSON object with:

{
  "seo_title": "",
  "seo_description": "",
  "content": ""
}

Rules:

SEO title:
60 characters max

SEO description:
160 characters max

Content must be in MDX format using this structure:

## Overview

## Why This Matters for ${role}

## AI Workflow

## Step-by-Step Guide

## Prompt Examples

## Tools You Can Use

## Benefits

## Related AI Workflows

List 3–5 related AI workflow titles as bullet points relevant to the ${role} role.
Do not include URLs, just the titles.

Example:
- AI for Feature Prioritization
- AI for Sprint Planning
- AI for Product Analytics

Use practical examples.

Do not include explanations outside JSON.
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
