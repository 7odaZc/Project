import { NextResponse } from "next/server";
import { buildAdvisorPrompt, validateAdvisorResult } from "../../../lib/advisor";

export async function POST(request) {
  try {
    const body = await request.json();
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";

    if (description.length < 40) {
      return NextResponse.json(
        { error: "Opportunity description must be at least 40 characters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.ANTHROPIC_MODEL;

    if (!apiKey || !model) {
      return NextResponse.json(
        { error: "AI service is not configured. Add ANTHROPIC_API_KEY and ANTHROPIC_MODEL." },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model,
        max_tokens: 700,
        temperature: 0,
        messages: [
          {
            role: "user",
            content: buildAdvisorPrompt({ role, description })
          }
        ]
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Anthropic request failed:", detail);
      return NextResponse.json(
        { error: "The AI service is temporarily unavailable. Try again in a moment." },
        { status: 502 }
      );
    }

    const payload = await response.json();
    const text = payload?.content?.find((item) => item.type === "text")?.text;

    if (!text) {
      return NextResponse.json(
        { error: "The AI service returned no usable content." },
        { status: 502 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "The AI response was not valid structured data." },
        { status: 502 }
      );
    }

    if (!validateAdvisorResult(parsed)) {
      return NextResponse.json(
        { error: "The AI response did not match the expected structure." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Advisor route error:", error);
    return NextResponse.json(
      { error: "Something went wrong while processing the request." },
      { status: 500 }
    );
  }
}
