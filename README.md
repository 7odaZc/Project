# Mahmoud Elzayat — AI-Enhanced Portfolio Capstone

## Project brief
This portfolio solves a small but real problem for people evaluating my work: a visitor may have an opportunity in mind but not know which projects are most relevant. The portfolio includes an AI-powered **Portfolio Fit Advisor** that takes an opportunity description and matches it against evidence from my real projects, explaining why the matches are relevant and what proof is still missing. I chose this because it makes the AI capability part of the portfolio's actual purpose instead of adding a generic chatbot.

## Live application
Production URL:
https://mahmoud-elzayat-capstone-ai-enhance.vercel.app

Repository:
https://github.com/7odaZc/Project

## Local setup
```bash
npm install && npm run dev
```

Open:
http://localhost:3000

## Environment
Create `.env.local`:

```bash
OPENROUTER_API_KEY=your_server_side_key
OPENROUTER_MODEL=openrouter/free
```

The OpenRouter API key is only read on the server in `app/api/advisor/route.js`. It is never exposed to the browser.

## Architecture
- `app/page.jsx` — home/portfolio entry point and AI feature placement.
- `components/AdvisorForm.jsx` — client-side interactive AI feature.
- `app/api/advisor/route.js` — server-side LLM proxy and validation boundary.
- `lib/advisor.js` — prompt construction and structured-output validation.
- `lib/projects.js` — trusted project evidence used by the prompt.
- `components/ProjectCard.jsx` — reusable project UI.
- `app/work/[slug]/page.jsx` — case-study route.
- `tests/` — component tests for representative UI and the AI feature.

The default rendering strategy is Server Components. `AdvisorForm` is a Client Component because it needs form state, loading state, and browser interaction.

## AI integration
The Portfolio Fit Advisor is not a generic chat box. The visitor provides a job/opportunity description. The server combines that request with a fixed list of my real project evidence, then sends a constrained prompt to an OpenRouter model.

The prompt requires JSON with:
- one short summary
- up to three matching projects
- evidence-based reasons
- relevant skills
- missing evidence

The server parses the JSON and validates the shape before returning it to the browser. The prompt explicitly forbids invented metrics or unsupported achievements.

## Resilience and edge cases
- Too-short input is rejected before an API call.
- Missing API configuration returns a clear service-unavailable message.
- LLM HTTP errors return a safe fallback.
- Empty/non-text AI responses are rejected.
- Invalid JSON is rejected.
- Incorrect structured output is rejected.
- The UI shows loading and error states.

## Testing
Run:

```bash
npm test
```

Current local evidence: 3 tests passed across 2 test files with Vitest coverage enabled.

The test suite covers:
- ProjectCard rendering and navigation
- AdvisorForm validation
- Successful structured AI-result rendering

This gives direct coverage over 2 of the 4 main interactive components in this small application.

## Accessibility
The AI feature uses:
- real labels
- keyboard-focusable controls
- `role="alert"` for errors
- `aria-live="polite"` for result updates
- semantic navigation
- readable contrast using the portfolio identity system

Run Lighthouse and axe/WAVE against the deployed URL before final submission and record the actual results in `AUDIT.md`. The current audit file intentionally contains no invented scores.

## Known limitations
- The AI result depends on the external OpenRouter API and configured server-side credentials.
- The project evidence is manually maintained in `lib/projects.js`; a CMS/database would be needed for larger portfolios.
- The current contact page is still a presentation layer; the capstone's AI feature is the Portfolio Fit Advisor.
- The live deployment must have valid `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` environment variables configured to enable the AI feature. `OPENROUTER_MODEL` defaults to `openrouter/free`.

## Future improvements
- Add rate limiting and abuse protection to the API route.
- Store project evidence in a database or CMS.
- Add analytics for advisor usage.
- Add richer case-study proof and real screenshots.
- Add an automated end-to-end test for the live advisor flow.

## Deployment checklist
See `DEPLOYMENT_CHECKLIST.md`.

## Reflection
See `REFLECTION.md`.
