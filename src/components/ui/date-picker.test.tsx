import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DatePicker } from "./date-picker";

describe("DatePicker", () => {
  it("renders with placeholder", () => {
    render(<DatePicker placeholder="Select date" />);
    expect(screen.getByText("Select date")).toBeInTheDocument();
  });

  it("displays formatted date when date is provided", () => {
    const date = new Date(2024, 0, 15);
    render(<DatePicker date={date} />);

    expect(screen.getByText(/January 15th, 2024/i)).toBeInTheDocument();
  });

  it("opens calendar on button click", async () => {
    render(<DatePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  it("calls onDateChange when date is selected", async () => {
    const handleChange = vi.fn();
    render(<DatePicker onDateChange={handleChange} />);

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
    render(<DatePicker disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<DatePicker className="custom-date-picker" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-date-picker");
  });

  it("shows calendar icon", () => {
    const { container } = render(<DatePicker />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("uses default placeholder when not provided", () => {
    render(<DatePicker />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("clears date when undefined is passed", () => {
    const { rerender } = render(<DatePicker date={new Date(2024, 0, 15)} />);
    expect(screen.getByText(/January 15th, 2024/i)).toBeInTheDocument();

    rerender(<DatePicker date={undefined} />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("closes popover after date selection", async () => {
    render(<DatePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    const today = new Date();
    const dateButton = screen.getByRole("gridcell", {
      name: new RegExp(today.getDate().toString()),
    });

    fireEvent.click(dateButton);

    // Popover should close (grid should disappear)
    await waitFor(() => {
      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });
  });
});
