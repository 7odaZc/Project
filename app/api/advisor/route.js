import { NextResponse } from "next/server";
import {
  buildAdvisorPrompt,
  validateAdvisorResult
} from "../../../lib/advisor";

export async function POST(request) {
  try {
    const body = await request.json();

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    const role =
      typeof body.role === "string"
        ? body.role.trim()
        : "";

    if (description.length < 40) {
      return NextResponse.json(
        {
          error:
            "Opportunity description must be at least 40 characters."
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "openrouter/free";

    if (!apiKey) {
      console.error("Missing OPENROUTER_API_KEY");

      return NextResponse.json(
        {
          error:
            "AI service is not configured. Please try again later."
        },
        { status: 503 }
      );
    }

    const prompt = buildAdvisorPrompt({
      role,
      description
    });

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL ||
            "https://mahmoud-elzayat-capstone-ai-enhanced-portfolio-50t88b47j.vercel.app",
          "X-Title": "Mahmoud Elzayat Portfolio"
        },

        body: JSON.stringify({
          model,
          temperature: 0,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const detail = await response.text();

      console.error("OpenRouter API error:", {
        status: response.status,
        model,
        detail
      });

      let userMessage =
        "The AI service is temporarily unavailable. Please try again shortly.";

      if (response.status === 401) {
        userMessage =
          "The OpenRouter API key is invalid or unauthorized.";
      } else if (response.status === 402) {
        userMessage =
          "The selected AI model is not currently available on the free tier.";
      } else if (response.status === 403) {
        userMessage =
          "The AI request is not authorized.";
      } else if (response.status === 404) {
        userMessage =
          "The selected AI model was not found.";
      } else if (response.status === 429) {
        userMessage =
          "The free AI request limit was reached. Please try again later.";
      } else if (response.status >= 500) {
        userMessage =
          "The AI provider is temporarily unavailable.";
      }

      return NextResponse.json(
        { error: userMessage },
        { status: 502 }
      );
    }

    const payload = await response.json();

    const text =
      payload?.choices?.[0]?.message?.content;

    if (!text) {
      console.error(
        "OpenRouter returned no usable content:",
        payload
      );

      return NextResponse.json(
        {
          error:
            "The AI service returned no usable result."
        },
        { status: 502 }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error("Invalid JSON from OpenRouter:", {
        error,
        text
      });

      return NextResponse.json(
        {
          error:
            "The AI returned an invalid result. Please try again."
        },
        { status: 502 }
      );
    }

    if (!validateAdvisorResult(parsed)) {
      console.error(
        "Invalid advisor result structure:",
        parsed
      );

      return NextResponse.json(
        {
          error:
            "The AI returned an unexpected result format."
        },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);

  } catch (error) {
    console.error("Advisor route error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while processing your request."
      },
      { status: 500 }
    );
  }
}