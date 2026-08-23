import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "../components/ProjectCard";

const project = {
  slug: "demo-project",
  title: "Demo Project",
  summary: "A small project used for testing the portfolio card.",
  skills: ["React", "Testing"]
};

describe("ProjectCard", () => {
  it("renders project content and the case study link", () => {
    render(<ProjectCard project={project} />);

    expect(screen.getByRole("heading", { name: "Demo Project" })).toBeInTheDocument();
    expect(screen.getByText("A small project used for testing the portfolio card.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view case study/i })).toHaveAttribute(
      "href",
      "/work/demo-project"
    );
  });
});
