import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Autocomplete } from "./autocomplete";

describe("Autocomplete", () => {
  const simpleOptions = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  const complexOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  it("renders with placeholder", () => {
    render(<Autocomplete placeholder="Select fruit" options={simpleOptions} />);
    expect(screen.getByPlaceholderText("Select fruit")).toBeInTheDocument();
  });

  it("opens dropdown on focus", async () => {
    render(<Autocomplete options={simpleOptions} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  it("displays all options when opened", async () => {
    render(<Autocomplete options={simpleOptions} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.getByText("Cherry")).toBeInTheDocument();
    });
  });

  it("filters options based on input", async () => {
    render(<Autocomplete options={simpleOptions} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.queryByText("Banana")).not.toBeInTheDocument();
    });
  });

  it("filters are case-insensitive", async () => {
    render(<Autocomplete options={simpleOptions} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "APPLE" } });

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });
  });

  it("selects option on click", async () => {
    const handleChange = vi.fn();
    render(<Autocomplete options={simpleOptions} onValueChange={handleChange} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      const option = screen.getByText("Apple");
      fireEvent.click(option);
    });

    expect(handleChange).toHaveBeenCalledWith("Apple");
  });

  it("closes dropdown after selection", async () => {
    render(<Autocomplete options={simpleOptions} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      const option = screen.getByText("Apple");
      fireEvent.click(option);
    });

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("supports complex options with value and label", async () => {
    const handleChange = vi.fn();
    render(<Autocomplete options={complexOptions} onValueChange={handleChange} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      const option = screen.getByText("Apple");
      fireEvent.click(option);
    });

    expect(handleChange).toHaveBeenCalledWith("apple");
  });

  it("displays empty message when no results", async () => {
    render(<Autocomplete options={simpleOptions} emptyMessage="No fruits found" />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "xyz" } });

    await waitFor(() => {
      expect(screen.getByText("No fruits found")).toBeInTheDocument();
    });
  });

  it("navigates options with arrow keys", async () => {
    render(<Autocomplete options={simpleOptions} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });

    // Second option should be highlighted
    const options = screen.getAllByRole("option");
    expect(options[1]).toHaveAttribute("aria-selected", "true");
  });

  it("selects highlighted option on Enter", async () => {
    const handleChange = vi.fn();
    render(<Autocomplete options={simpleOptions} onValueChange={handleChange} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleChange).toHaveBeenCalled();
  });

  it("closes dropdown on Escape", async () => {
    render(<Autocomplete options={simpleOptions} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("closes dropdown when clicking outside", async () => {
    render(
      <div>
        <Autocomplete options={simpleOptions} />
        <button>Outside</button>
      </div>
    );

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByText("Outside"));

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("applies custom className", () => {
    const { container } = render(<Autocomplete options={simpleOptions} className="custom-auto" />);
    const autocomplete = container.querySelector(".custom-auto");
    expect(autocomplete).toBeInTheDocument();
  });

  it("has proper ARIA attributes", () => {
    render(<Autocomplete options={simpleOptions} aria-label="Fruit selector" />);

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-label", "Fruit selector");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-controls", "autocomplete-list");
  });
});
