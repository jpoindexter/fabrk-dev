import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputNumber } from "./input-number";

describe("InputNumber", () => {
  it("renders with default value", () => {
    const { container } = render(<InputNumber defaultValue={10} />);
    const input = container.querySelector("input");
    expect(input).toHaveValue(10);
  });

  it("renders with controlled value", () => {
    const { container } = render(<InputNumber value={25} />);
    const input = container.querySelector("input");
    expect(input).toHaveValue(25);
  });

  it("calls onValueChange when value changes", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber onValueChange={handleChange} />);

    const input = container.querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "42" } });
      expect(handleChange).toHaveBeenCalledWith(42);
    }
  });

  it("increments value when + button is clicked", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber value={10} step={1} onValueChange={handleChange} />);

    const incrementButton = screen.getByLabelText("Increment value");
    fireEvent.click(incrementButton);

    expect(handleChange).toHaveBeenCalledWith(11);
  });

  it("decrements value when - button is clicked", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber value={10} step={1} onValueChange={handleChange} />);

    const decrementButton = screen.getByLabelText("Decrement value");
    fireEvent.click(decrementButton);

    expect(handleChange).toHaveBeenCalledWith(9);
  });

  it("respects min constraint", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber value={5} min={5} step={1} onValueChange={handleChange} />);

    const decrementButton = screen.getByLabelText("Decrement value");
    expect(decrementButton).toBeDisabled();
  });

  it("respects max constraint", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber value={10} max={10} step={1} onValueChange={handleChange} />);

    const incrementButton = screen.getByLabelText("Increment value");
    expect(incrementButton).toBeDisabled();
  });

  it("applies custom step value", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber value={10} step={5} onValueChange={handleChange} />);

    const incrementButton = screen.getByLabelText("Increment value");
    fireEvent.click(incrementButton);

    expect(handleChange).toHaveBeenCalledWith(15);
  });

  it("applies precision to value", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber precision={2} onValueChange={handleChange} />);

    const input = container.querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "10.456" } });
      expect(handleChange).toHaveBeenCalledWith(10.46);
    }
  });

  it("hides controls when showControls is false", () => {
    render(<InputNumber showControls={false} />);

    expect(screen.queryByLabelText("Increment value")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Decrement value")).not.toBeInTheDocument();
  });

  it("handles keyboard arrow up", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber value={10} step={1} onValueChange={handleChange} />);

    const input = container.querySelector("input");
    if (input) {
      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(handleChange).toHaveBeenCalledWith(11);
    }
  });

  it("handles keyboard arrow down", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber value={10} step={1} onValueChange={handleChange} />);

    const input = container.querySelector("input");
    if (input) {
      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(handleChange).toHaveBeenCalledWith(9);
    }
  });

  it("handles empty value", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputNumber onValueChange={handleChange} />);

    const input = container.querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "" } });
      expect(handleChange).toHaveBeenCalledWith(undefined);
    }
  });

  it("disables input when disabled prop is true", () => {
    const { container } = render(<InputNumber disabled />);
    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("disables control buttons when disabled", () => {
    render(<InputNumber disabled />);

    const incrementButton = screen.getByLabelText("Increment value");
    const decrementButton = screen.getByLabelText("Decrement value");

    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });

  it("applies custom className", () => {
    const { container } = render(<InputNumber className="custom-number" />);
    const wrapper = container.querySelector('[data-slot="input-number"]');
    expect(wrapper).toHaveClass("custom-number");
  });

  it("has proper ARIA attributes", () => {
    const { container } = render(<InputNumber value={10} min={0} max={100} />);
    const input = container.querySelector("input");

    expect(input).toHaveAttribute("role", "spinbutton");
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "100");
    expect(input).toHaveAttribute("aria-valuenow", "10");
  });
});
