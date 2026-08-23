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
  if (
    typeof result.summary !== "string" ||
    result.summary.length === 0 ||
    result.summary.length > 300
  ) return false;
  if (!Array.isArray(result.matches) || result.matches.length > 3) return false;
  if (!Array.isArray(result.missingEvidence) || result.missingEvidence.length > 8) return false;

  const projectTitles = new Set(projects.map((project) => project.title));

  if (
    !result.missingEvidence.every(
      (item) => typeof item === "string" && item.length > 0 && item.length <= 160
    )
  ) return false;

  return result.matches.every(
    (match) =>
      match &&
      projectTitles.has(match.project) &&
      typeof match.reason === "string" &&
      match.reason.length > 0 &&
      match.reason.length <= 240 &&
      Array.isArray(match.skills) &&
      match.skills.length <= 8 &&
      match.skills.every(
        (skill) => typeof skill === "string" && skill.length > 0 && skill.length <= 80
      )
  );
}
