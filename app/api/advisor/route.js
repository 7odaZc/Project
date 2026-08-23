import { NextResponse } from "next/server";
import {
  buildAdvisorPrompt,
  validateAdvisorResult
} from "../../../lib/advisor";

export async function POST(request) {
  try {
    // Read request body
    const body = await request.json();

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    const role =
      typeof body.role === "string"
        ? body.role.trim()
        : "";

    // Validate user input
    if (description.length < 40) {
      return NextResponse.json(
        {
          error:
            "Opportunity description must be at least 40 characters."
        },
        { status: 400 }
      );
    }

    // Read server-side environment variables
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.ANTHROPIC_MODEL;

    // Make sure AI configuration exists
    if (!apiKey || !model) {
      console.error("Missing Anthropic environment variables.");

      return NextResponse.json(
        {
          error:
            "AI service is not configured. Please try again later."
        },
        { status: 503 }
      );
    }

    // Build the prompt from trusted project data
    const prompt = buildAdvisorPrompt({
      role,
      description
    });

    // Call Anthropic
    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
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
              content: prompt
            }
          ]
        })
      }
    );

    // Handle Anthropic errors
    if (!response.ok) {
      const detail = await response.text();

      console.error("Anthropic API error:", {
        status: response.status,
        model,
        detail
      });

      let userMessage =
        "The AI service is temporarily unavailable. Try again shortly.";

      if (response.status === 400) {
        userMessage =
          "The AI request was invalid. Please try again.";
      } else if (response.status === 401) {
        userMessage =
          "The Anthropic API key is invalid or unauthorized.";
      } else if (response.status === 403) {
        userMessage =
          "The Anthropic API request is not authorized.";
      } else if (response.status === 404) {
        userMessage =
          "The selected Claude model was not found.";
      } else if (response.status === 429) {
        userMessage =
          "The AI service limit was reached. Please try again later.";
      } else if (response.status >= 500) {
        userMessage =
          "Anthropic is temporarily unavailable. Please try again later.";
      }

      return NextResponse.json(
        {
          error: userMessage
        },
        {
          status: response.status === 400 ? 400 : 502
        }
      );
    }

    // Read Anthropic response
    const payload = await response.json();

    const text = payload?.content?.find(
      (item) => item.type === "text"
    )?.text;

    // No usable text
    if (!text) {
      console.error(
        "Anthropic returned no usable text:",
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

    // Parse JSON returned by Claude
    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.error("Invalid JSON from Anthropic:", {
        text,
        parseError
      });

      return NextResponse.json(
        {
          error:
            "The AI returned an invalid result. Please try again."
        },
        { status: 502 }
      );
    }

    // Validate the structure
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

    // Successful response
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