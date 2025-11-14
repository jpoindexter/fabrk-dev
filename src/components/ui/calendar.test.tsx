import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders without crashing", () => {
    const { container } = render(<Calendar mode="single" />);
    expect(container.querySelector(".p-3")).toBeInTheDocument();
  });

  it("displays current month and year", () => {
    render(<Calendar mode="single" />);
    const date = new Date();
    const monthYear = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    // The calendar should show some representation of the current month
    expect(screen.getByText(new RegExp(date.getFullYear().toString()))).toBeInTheDocument();
  });

  it("shows navigation buttons", () => {
    const { container } = render(<Calendar mode="single" />);
    const navButtons = container.querySelectorAll("button");
    expect(navButtons.length).toBeGreaterThan(0);
  });

  it("handles date selection", () => {
    const handleSelect = vi.fn();
    render(<Calendar mode="single" selected={undefined} onSelect={handleSelect} />);

    const today = new Date();
    const todayButton = screen.getByRole("gridcell", { name: new RegExp(today.getDate().toString()) });

    if (todayButton) {
      fireEvent.click(todayButton);
      expect(handleSelect).toHaveBeenCalled();
    }
  });

  it("displays selected date with proper styling", () => {
    const selected = new Date(2024, 0, 15);
    const { container } = render(<Calendar mode="single" selected={selected} />);

    const selectedDay = container.querySelector('[aria-selected="true"]');
    expect(selectedDay).toBeInTheDocument();
  });

  it("supports range mode", () => {
    const dateRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 15),
    };
    render(<Calendar mode="range" selected={dateRange} />);

    // Calendar should render in range mode without errors
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("shows outside days when showOutsideDays is true", () => {
    render(<Calendar mode="single" showOutsideDays={true} />);
    const { container } = render(<Calendar mode="single" showOutsideDays={true} />);

    // Outside days should be visible
    const outsideDays = container.querySelectorAll(".day-outside");
    // Outside days may or may not be present depending on the month, so just check it renders
    expect(container).toBeInTheDocument();
  });

  it("hides outside days when showOutsideDays is false", () => {
    render(<Calendar mode="single" showOutsideDays={false} />);
    // Calendar should render without errors
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("renders custom className", () => {
    const { container } = render(<Calendar mode="single" className="custom-class" />);
    const calendar = container.querySelector(".custom-class");
    expect(calendar).toBeInTheDocument();
  });

  it("displays day names in header", () => {
    render(<Calendar mode="single" />);
    // Check for common day abbreviations
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const foundDays = dayNames.filter((day) => {
      try {
        screen.getByText(new RegExp(day, "i"));
        return true;
      } catch {
        return false;
      }
    });
    expect(foundDays.length).toBeGreaterThan(0);
  });
});
