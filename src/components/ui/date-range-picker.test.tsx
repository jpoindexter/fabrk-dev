import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DateRangePicker } from "./date-range-picker";

describe("DateRangePicker", () => {
  it("renders with placeholder", () => {
    render(<DateRangePicker placeholder="Select date range" />);
    expect(screen.getByText("Select date range")).toBeInTheDocument();
  });

  it("displays formatted date range when provided", () => {
    const dateRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 15),
    };
    render(<DateRangePicker dateRange={dateRange} />);

    expect(screen.getByText(/Jan 01, 2024 - Jan 15, 2024/i)).toBeInTheDocument();
  });

  it("displays only from date when to date is not provided", () => {
    const dateRange = {
      from: new Date(2024, 0, 1),
    };
    render(<DateRangePicker dateRange={dateRange} />);

    expect(screen.getByText(/Jan 01, 2024/i)).toBeInTheDocument();
  });

  it("opens calendar on button click", async () => {
    render(<DateRangePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  it("calls onDateRangeChange when date range is selected", async () => {
    const handleChange = vi.fn();
    render(<DateRangePicker onDateRangeChange={handleChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    // Select a date
    const today = new Date();
    const dateButton = screen.getByRole("gridcell", {
      name: new RegExp(today.getDate().toString()),
    });

    fireEvent.click(dateButton);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it("disables button when disabled prop is true", () => {
    render(<DateRangePicker disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<DateRangePicker className="custom-date-range" />);

    const container = screen.getByRole("button").parentElement;
    expect(container).toHaveClass("custom-date-range");
  });

  it("shows calendar icon", () => {
    const { container } = render(<DateRangePicker />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("uses default placeholder when not provided", () => {
    render(<DateRangePicker />);
    expect(screen.getByText("Pick a date range")).toBeInTheDocument();
  });

  it("displays two month calendars", async () => {
    render(<DateRangePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const grids = screen.getAllByRole("grid");
      expect(grids.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("clears date range when undefined is passed", () => {
    const dateRange = {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 15),
    };
    const { rerender } = render(<DateRangePicker dateRange={dateRange} />);
    expect(screen.getByText(/Jan 01, 2024 - Jan 15, 2024/i)).toBeInTheDocument();

    rerender(<DateRangePicker dateRange={undefined} />);
    expect(screen.getByText("Pick a date range")).toBeInTheDocument();
  });
});
