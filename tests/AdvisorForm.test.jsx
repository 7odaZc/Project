import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdvisorForm from "../components/AdvisorForm";

describe("AdvisorForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows validation feedback for a description that is too short", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<AdvisorForm />);

    await user.type(
      screen.getByLabelText(/opportunity description/i),
      "Too short"
    );
    await user.click(screen.getByRole("button", { name: /match the work/i }));

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent(/add a little more detail/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("renders structured matches returned by the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            summary: "Your frontend work is the strongest match.",
            matches: [
              {
                project: "React Web Applications",
                reason: "It demonstrates React and API-based frontend work.",
                skills: ["React", "APIs"]
              }
            ],
            missingEvidence: ["Add a live demo URL."]
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        )
      )
    );

    const user = userEvent.setup();
    render(<AdvisorForm />);

    await user.type(
      screen.getByLabelText(/opportunity description/i),
      "We need a frontend intern comfortable with React, APIs, responsive UI, and testing."
    );
    await user.click(screen.getByRole("button", { name: /match the work/i }));

    expect(await screen.findByText(/strongest match/i)).toBeInTheDocument();
    expect(screen.getByText("React Web Applications")).toBeInTheDocument();
    expect(screen.getByText(/Add a live demo URL/i)).toBeInTheDocument();
  });
});
