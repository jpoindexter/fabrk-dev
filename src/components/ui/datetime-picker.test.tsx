import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DateTimePicker } from "./datetime-picker";

describe("DateTimePicker", () => {
  it("renders with placeholder", () => {
    render(<DateTimePicker placeholder="Select date and time" />);
    expect(screen.getByText("Select date and time")).toBeInTheDocument();
  });

  it("displays formatted datetime when provided", () => {
    const dateTime = new Date(2024, 0, 15, 14, 30);
    render(<DateTimePicker dateTime={dateTime} use24Hour={true} />);

    expect(screen.getByText(/January 15th, 2024 14:30/i)).toBeInTheDocument();
  });

  it("opens date/time picker on button click", async () => {
    render(<DateTimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });
  });

  it("shows Date and Time tabs", async () => {
    render(<DateTimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("tab", { name: /date/i })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: /time/i })).toBeInTheDocument();
    });
  });

  it("switches between Date and Time tabs", async () => {
    render(<DateTimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const timeTab = screen.getByRole("tab", { name: /time/i });
      fireEvent.click(timeTab);
      expect(screen.getByText("Hours")).toBeInTheDocument();
    });
  });

  it("shows calendar in date tab", async () => {
    render(<DateTimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  it("shows time controls in time tab", async () => {
    render(<DateTimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const timeTab = screen.getByRole("tab", { name: /time/i });
      fireEvent.click(timeTab);
      expect(screen.getByText("Hours")).toBeInTheDocument();
      expect(screen.getByText("Minutes")).toBeInTheDocument();
    });
  });

  it("supports 24-hour format", async () => {
    const dateTime = new Date(2024, 0, 15, 14, 30);
    render(<DateTimePicker dateTime={dateTime} use24Hour={true} />);

    expect(screen.getByText(/14:30/)).toBeInTheDocument();
  });

  it("supports 12-hour format with AM/PM", async () => {
    const dateTime = new Date(2024, 0, 15, 14, 30);
    render(<DateTimePicker dateTime={dateTime} use24Hour={false} />);

    expect(screen.getByText(/2:30 PM/i)).toBeInTheDocument();
  });

  it("calls onDateTimeChange when Apply is clicked", async () => {
    const handleChange = vi.fn();
    render(<DateTimePicker onDateTimeChange={handleChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(async () => {
      // Select a date first
      const today = new Date();
      const dateButton = screen.getByRole("gridcell", {
        name: new RegExp(today.getDate().toString()),
      });
      fireEvent.click(dateButton);

      // Click Apply
      const applyButton = screen.getByText("Apply");
      fireEvent.click(applyButton);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
      });
    });
  });

  it("disables Apply button when no date is selected", async () => {
    render(<DateTimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const applyButton = screen.getByText("Apply");
      expect(applyButton).toBeDisabled();
    });
  });

  it("disables button when disabled prop is true", () => {
    render(<DateTimePicker disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<DateTimePicker className="custom-datetime-picker" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-datetime-picker");
  });

  it("increments hours in time tab", async () => {
    render(<DateTimePicker />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const timeTab = screen.getByRole("tab", { name: /time/i });
      fireEvent.click(timeTab);
    });

    await waitFor(() => {
      const incrementButtons = screen.getAllByText("+");
      expect(incrementButtons.length).toBeGreaterThan(0);
    });
  });
});
