# AI-Enhanced Portfolio Capstone

## Project Brief

This portfolio helps people evaluating my work identify which projects best support a specific opportunity. Its Portfolio Fit Advisor compares a visitor's role and description with evidence from real projects, explains the strongest matches, and identifies missing proof. I chose the idea because it makes the AI feature useful to the portfolio's core purpose instead of adding a generic chatbot.

## Live Application

https://mahmoud-elzayat-capstone-ai-enhance.vercel.app

The deployed portfolio routes were smoke-tested successfully, including the home, work, about, contact, and React case-study pages. The AI request requires `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` environment variables configured in Vercel.

## Repository and README

https://github.com/7odaZc/Project

Setup, architecture, AI integration, testing, limitations, deployment, and future improvements are documented in [README.md](README.md).

## Testing Evidence

Local command:

```text
npm test
```

Result: 3 tests passed across 2 test files with Vitest coverage enabled. The tests cover ProjectCard rendering, short advisor input rejection without an API call, and structured advisor result rendering.

## Performance and Accessibility Audit

Actual Lighthouse and axe results are recorded in [AUDIT.md](AUDIT.md) after running those audits against the live URL. Mobile and desktop Lighthouse both reported Performance 100, Accessibility 100, Best Practices 96, and SEO 100. axe-core reported 0 violations.

The advisor includes real labels, keyboard-focusable controls, semantic sections, `role="alert"` for errors, and `aria-live="polite"` for result updates. An initial contrast issue was fixed by updating the CTA, placeholder, and accent text colors; the post-fix accessibility audits are recorded in [AUDIT.md](AUDIT.md).

## Deployment and Operation

The application is deployed on Vercel from the `main` branch at commit `455f256`. The production checklist is in [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md). The advisor returned HTTP 200 with structured matches for the live happy-path test and HTTP 400 for short input. It returns human-readable errors when configuration, the provider, or the structured response is invalid. The rollback plan is to revert the offending commit and redeploy the known-good commit through Vercel.

## Reflection

The reflection is documented in [REFLECTION.md](REFLECTION.md).