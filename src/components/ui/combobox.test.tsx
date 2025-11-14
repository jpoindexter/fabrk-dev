import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Combobox } from "./combobox";

describe("Combobox", () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "rust", label: "Rust" },
  ];

  it("renders with placeholder", () => {
    render(<Combobox options={options} placeholder="Select language" />);
    expect(screen.getByText("Select language")).toBeInTheDocument();
  });

  it("displays selected value", () => {
    render(<Combobox options={options} value="javascript" />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("opens dropdown on button click", async () => {
    render(<Combobox options={options} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("displays all options in dropdown", async () => {
    render(<Combobox options={options} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.getByText("Rust")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("selects option when clicked", async () => {
    const handleChange = vi.fn();
    render(<Combobox options={options} onValueChange={handleChange} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const jsOption = screen.getByText("JavaScript");
      fireEvent.click(jsOption);
    }, { timeout: 3000 });

    expect(handleChange).toHaveBeenCalledWith("javascript");
  });

  it("closes dropdown after selection", async () => {
    render(<Combobox options={options} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const jsOption = screen.getByText("JavaScript");
      fireEvent.click(jsOption);
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("deselects option when clicking selected option", async () => {
    const handleChange = vi.fn();
    render(<Combobox options={options} value="javascript" onValueChange={handleChange} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const jsOption = screen.getByText("JavaScript");
      fireEvent.click(jsOption);
    }, { timeout: 3000 });

    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("shows checkmark for selected option", async () => {
    render(<Combobox options={options} value="javascript" />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const checkIcons = screen.getAllByRole("img", { hidden: true });
      const visibleCheck = checkIcons.find(icon =>
        icon.classList.contains("opacity-100")
      );
      expect(visibleCheck).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("filters options when searching", async () => {
    render(<Combobox options={options} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "type" } });
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.queryByText("JavaScript")).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("displays empty text when no results", async () => {
    render(<Combobox options={options} emptyText="No languages found" />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "xyz" } });
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText("No languages found")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("uses custom search placeholder", async () => {
    render(<Combobox options={options} searchPlaceholder="Type to search..." />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Type to search...")).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("applies custom className", () => {
    render(<Combobox options={options} className="custom-combobox" />);

    const button = screen.getByRole("combobox");
    expect(button).toHaveClass("custom-combobox");
  });

  it("has proper ARIA attributes when closed", () => {
    render(<Combobox options={options} />);

    const button = screen.getByRole("combobox");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("has proper ARIA attributes when open", async () => {
    render(<Combobox options={options} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true");
    }, { timeout: 3000 });
  });

  it("shows caret icon", () => {
    const { container } = render(<Combobox options={options} />);

    const caretIcon = container.querySelector("svg");
    expect(caretIcon).toBeInTheDocument();
  });

  it("handles empty options array", async () => {
    render(<Combobox options={[]} emptyText="No options available" />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("No options available")).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
