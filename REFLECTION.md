# Reflection

The hardest part of this capstone is making the AI feature useful without turning the portfolio into a generic chatbot. The Portfolio Fit Advisor has a narrow job: compare a real opportunity with evidence from my actual projects and explain the match. That forced me to think about what information I trust, what the AI is allowed to claim, and what should happen when there is not enough evidence.

One thing I would do differently next time is plan the verification boundary earlier. The UI is straightforward, but the AI route has more failure modes than a normal form: missing environment variables, provider failures, invalid JSON, and answers that look plausible but are not supported by the project data. I would define those cases before writing the first version.

The biggest thing that surprised me is that the AI prompt is only one part of the feature. The useful system is the combination of trusted input data, constrained instructions, structured output, server-side validation, and a UI that explains failure safely. The model is only one component in that pipeline.
