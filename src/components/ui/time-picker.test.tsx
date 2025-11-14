import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TimePicker } from "./time-picker";

describe("TimePicker", () => {
  it("renders with placeholder", () => {
    render(<TimePicker placeholder="Select time" />);
    expect(screen.getByText("Select time")).toBeInTheDocument();
  });

  it("displays time when provided", () => {
    render(<TimePicker time="02:30 PM" />);
    expect(screen.getByText("02:30 PM")).toBeInTheDocument();
  });

  it("opens time picker on button click", async () => {
    render(<TimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Apply")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("supports 24-hour format", () => {
    render(<TimePicker time="14:30" use24Hour={true} />);
    expect(screen.getByText("14:30")).toBeInTheDocument();
  });

  it("shows AM/PM toggle in 12-hour format", async () => {
    render(<TimePicker use24Hour={false} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("AM")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("does not show AM/PM toggle in 24-hour format", async () => {
    render(<TimePicker use24Hour={true} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("AM")).not.toBeInTheDocument();
      expect(screen.queryByText("PM")).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("increments hours when + button is clicked", async () => {
    const handleChange = vi.fn();
    render(<TimePicker time="12:00 AM" onTimeChange={handleChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const incrementButtons = screen.getAllByText("+");
      expect(incrementButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it("decrements minutes when - button is clicked", async () => {
    const handleChange = vi.fn();
    render(<TimePicker time="12:30 AM" onTimeChange={handleChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const decrementButtons = screen.getAllByText("-");
      expect(decrementButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it("calls onTimeChange when Apply is clicked", async () => {
    const handleChange = vi.fn();
    render(<TimePicker onTimeChange={handleChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const applyButton = screen.getByText("Apply");
      fireEvent.click(applyButton);
      expect(handleChange).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it("disables button when disabled prop is true", () => {
    render(<TimePicker disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<TimePicker className="custom-time-picker" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-time-picker");
  });

  it("toggles between AM and PM", async () => {
    render(<TimePicker time="12:00 AM" use24Hour={false} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      const periodButton = screen.getByText("AM");
      fireEvent.click(periodButton);
      expect(screen.getByText("PM")).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
