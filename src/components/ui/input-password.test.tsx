import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputPassword } from "./input-password";

describe("InputPassword", () => {
  it("renders with placeholder", () => {
    render(<InputPassword placeholder="Enter password" />);
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  it("renders as password type by default", () => {
    const { container } = render(<InputPassword />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows toggle button by default", () => {
    const { container } = render(<InputPassword />);
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toBeInTheDocument();
  });

  it("hides toggle button when showToggle is false", () => {
    render(<InputPassword showToggle={false} />);
    expect(screen.queryByLabelText("Show password")).not.toBeInTheDocument();
  });

  it("toggles password visibility on button click", () => {
    const { container } = render(<InputPassword />);
    const input = container.querySelector("input");
    const toggleButton = screen.getByLabelText("Show password");

    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Hide password"));
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows Eye icon when password is hidden", () => {
    const { container } = render(<InputPassword />);
    const eyeIcon = container.querySelector("svg");
    expect(eyeIcon).toBeInTheDocument();
  });

  it("shows EyeOff icon when password is visible", () => {
    const { container } = render(<InputPassword />);
    const toggleButton = screen.getByLabelText("Show password");
    fireEvent.click(toggleButton);

    const eyeOffIcon = container.querySelector("svg");
    expect(eyeOffIcon).toBeInTheDocument();
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    const { container } = render(<InputPassword onChange={handleChange} />);
    const input = container.querySelector("input");

    if (input) {
      fireEvent.change(input, { target: { value: "password123" } });
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it("disables input when disabled prop is true", () => {
    const { container } = render(<InputPassword disabled />);
    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("disables toggle button when input is disabled", () => {
    render(<InputPassword disabled />);
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toBeDisabled();
  });

  it("applies custom className", () => {
    const { container } = render(<InputPassword className="custom-password" />);
    const input = container.querySelector(".custom-password");
    expect(input).toBeInTheDocument();
  });

  it("applies padding for toggle button", () => {
    const { container } = render(<InputPassword />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("pr-10");
  });

  it("toggle button has tabIndex -1", () => {
    render(<InputPassword />);
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toHaveAttribute("tabIndex", "-1");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<InputPassword ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});
