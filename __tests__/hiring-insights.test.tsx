import { render, screen, waitFor } from "@testing-library/react";
import HiringInsights from "@/components/hiring-insights";
import "@testing-library/jest-dom";

describe("HiringInsights Component", () => {
  it("should render the title and legend correctly", async () => {
    render(<HiringInsights />);

    expect(screen.getByText("Hiring Insights")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText("Application to Interview Rate"),
      ).toBeInTheDocument();
      expect(screen.getByText("Offer Acceptance Rate")).toBeInTheDocument();
      expect(screen.getByText("Rejection Rate")).toBeInTheDocument();
    });
  });

  it("should show a loading state initially", () => {
    render(<HiringInsights />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
});
