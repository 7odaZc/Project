'use client';

import { useState } from "react";

const initialForm = { role: "", description: "" };

export default function AdvisorForm() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (form.description.trim().length < 40) {
      setError("Add a little more detail about the opportunity so the matches are useful.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The advisor could not complete the request.");
      }

      setResult(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-[#101B2E] p-6">
        <div>
          <p className="text-xs font-bold tracking-[.14em] text-[#7785FF]">AI FEATURE</p>
          <h2 className="mt-2 text-2xl font-bold">Find the most relevant work.</h2>
          <p className="mt-3 leading-7 text-[#9EACC0]">
            Paste an opportunity description and the advisor will match it against real projects in this portfolio.
          </p>
        </div>

        <label className="mt-6 grid gap-2">
          <span className="text-sm font-semibold">Role or opportunity type</span>
          <input
            name="role"
            value={form.role}
            onChange={updateField}
            placeholder="e.g. Frontend Developer Intern"
            className="rounded-xl border border-white/10 bg-[#0B1424] px-4 py-3 outline-none focus:border-[#7785FF]"
          />
        </label>

        <label className="mt-4 grid gap-2">
          <span className="text-sm font-semibold">Opportunity description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            rows={8}
            placeholder="Paste the job description or describe what the opportunity needs…"
            className="rounded-xl border border-white/10 bg-[#0B1424] px-4 py-3 outline-none focus:border-[#7785FF]"
            required
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-[#ff9aa6]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-[#7785FF] px-5 py-3 font-bold transition-opacity disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Analyzing…" : "Match the work"}
        </button>
      </form>

      <section
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-[#101B2E] p-6"
      >
        <p className="text-xs font-bold tracking-[.14em] text-[#7785FF]">RESULT</p>

        {!result && !loading && (
          <div className="mt-8 max-w-md">
            <h2 className="text-2xl font-bold">Evidence, not generic advice.</h2>
            <p className="mt-3 leading-7 text-[#9EACC0]">
              The feature only recommends work from the projects actually listed on this portfolio.
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-8">
            <p className="text-lg font-semibold">Comparing the opportunity with project evidence…</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#7785FF]" />
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6">
            <p className="leading-7 text-[#DCE3ED]">{result.summary}</p>

            <div className="mt-7 grid gap-4">
              {result.matches.map((match) => (
                <article key={match.project} className="rounded-2xl border border-white/10 bg-[#0B1424] p-5">
                  <h3 className="font-bold">{match.project}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#9EACC0]">{match.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {match.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#C7D0DD]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 p-5">
              <h3 className="font-bold">Evidence still needed</h3>
              {result.missingEvidence.length === 0 ? (
                <p className="mt-2 text-sm text-[#9EACC0]">No obvious evidence gaps were identified.</p>
              ) : (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#9EACC0]">
                  {result.missingEvidence.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
