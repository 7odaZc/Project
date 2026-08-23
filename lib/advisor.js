import { projects } from "./projects";

export function buildAdvisorPrompt(input) {
  const projectSummary = projects
    .map((project) =>
      `${project.title}: ${project.summary} Skills: ${project.skills.join(", ")}. Proof: ${project.proof}`
    )
    .join("\n");

  return `You are a portfolio-fit advisor for Mahmoud Elzayat.
Your job is NOT to chat generally. Use the project evidence below to help a visitor decide
which work is most relevant to an opportunity.

Opportunity type: ${input.role || "Not specified"}
Job/opportunity description:
${input.description}

PROJECT EVIDENCE:
${projectSummary}

Return JSON only with this exact shape:
{
  "summary": "one short sentence",
  "matches": [
    {
      "project": "exact project title from evidence",
      "reason": "specific evidence-based reason",
      "skills": ["skill", "skill"]
    }
  ],
  "missingEvidence": ["short item", "short item"]
}

Rules:
- Return at most 3 matches.
- Use only projects listed in the evidence.
- Do not invent metrics, employers, users, revenue, awards, or results.
- If evidence is insufficient, say so in missingEvidence.
- Keep each reason under 30 words.
- Do not include markdown fences.`;
}

export function validateAdvisorResult(result) {
  if (!result || typeof result !== "object") return false;
  if (typeof result.summary !== "string") return false;
  if (!Array.isArray(result.matches)) return false;
  if (!Array.isArray(result.missingEvidence)) return false;
  return result.matches.every(
    (match) =>
      match &&
      typeof match.project === "string" &&
      typeof match.reason === "string" &&
      Array.isArray(match.skills)
  );
}
