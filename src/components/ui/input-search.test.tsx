import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputSearch } from "./input-search";

describe("InputSearch", () => {
  it("renders with placeholder", () => {
    render(<InputSearch placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("shows search icon", () => {
    const { container } = render(<InputSearch />);
    const searchIcon = container.querySelector("svg");
    expect(searchIcon).toBeInTheDocument();
  });

  it("calls onValueChange when input changes", () => {
    const handleChange = vi.fn();
    render(<InputSearch onValueChange={handleChange} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalledWith("test");
  });

  it("shows clear button when value is present and showClearButton is true", () => {
    render(<InputSearch value="test" showClearButton={true} />);
    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<InputSearch value="" showClearButton={true} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("hides clear button when showClearButton is false", () => {
    render(<InputSearch value="test" showClearButton={false} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    const handleChange = vi.fn();
    render(<InputSearch value="test" onValueChange={handleChange} showClearButton={true} />);

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("calls onClear when clear button is clicked", () => {
    const handleClear = vi.fn();
    render(<InputSearch value="test" onClear={handleClear} showClearButton={true} />);

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
  });

  it("shows loading spinner when loading is true", () => {
    const { container } = render(<InputSearch loading={true} />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("hides clear button when loading", () => {
    render(<InputSearch value="test" loading={true} showClearButton={true} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("disables input when disabled prop is true", () => {
    render(<InputSearch disabled />);
    const input = screen.getByRole("searchbox");
    expect(input).toBeDisabled();
  });

  it("disables clear button when disabled", () => {
    render(<InputSearch value="test" disabled showClearButton={true} />);
    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<InputSearch className="custom-search" />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("custom-search");
  });

  it("applies padding for search icon", () => {
    render(<InputSearch />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("pl-8");
  });

  it("applies padding for clear button when visible", () => {
    render(<InputSearch value="test" showClearButton={true} />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("pr-8");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<InputSearch ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("has type search attribute", () => {
    render(<InputSearch />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("type", "search");
  });
});
