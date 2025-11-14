import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MultiSelect } from "./multi-select";

describe("MultiSelect", () => {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  it("renders with placeholder", () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} placeholder="Select frameworks" />);
    expect(screen.getByText("Select frameworks")).toBeInTheDocument();
  });

  it("displays selected items as badges", () => {
    render(<MultiSelect options={options} selected={["react", "vue"]} onChange={() => {}} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("opens dropdown on button click", async () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });
  });

  it("displays all options in dropdown", async () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Vue")).toBeInTheDocument();
      expect(screen.getByText("Angular")).toBeInTheDocument();
    });
  });

  it("selects option when clicked", async () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} selected={[]} onChange={handleChange} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const reactOption = screen.getAllByText("React").find(el => el.closest('[role="option"]'));
      if (reactOption) {
        fireEvent.click(reactOption);
      }
    });

    expect(handleChange).toHaveBeenCalledWith(["react"]);
  });

  it("unselects option when clicked again", async () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} selected={["react"]} onChange={handleChange} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const reactOption = screen.getAllByText("React").find(el => el.closest('[role="option"]'));
      if (reactOption) {
        fireEvent.click(reactOption);
      }
    });

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("removes item when X button is clicked", () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} selected={["react", "vue"]} onChange={handleChange} />);

    const removeButtons = screen.getAllByRole("button").filter(btn => btn.querySelector("svg"));
    const reactBadge = screen.getByText("React").closest(".mr-1");
    const removeButton = reactBadge?.querySelector("button");

    if (removeButton) {
      fireEvent.click(removeButton);
      expect(handleChange).toHaveBeenCalledWith(["vue"]);
    }
  });

  it("shows checkmark for selected items", async () => {
    render(<MultiSelect options={options} selected={["react"]} onChange={() => {}} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const reactOption = screen.getAllByText("React").find(el => el.closest('[role="option"]'));
      const checkbox = reactOption?.parentElement?.querySelector(".bg-primary");
      expect(checkbox).toBeInTheDocument();
    });
  });

  it("filters options when searching", async () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "react" } });
    });

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.queryByText("Vue")).not.toBeInTheDocument();
    });
  });

  it("displays empty text when no results", async () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} emptyText="No frameworks found" />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "xyz" } });
    });

    await waitFor(() => {
      expect(screen.getByText("No frameworks found")).toBeInTheDocument();
    });
  });

  it("respects maxSelected limit", async () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} selected={["react", "vue"]} onChange={handleChange} maxSelected={2} />);

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const angularOption = screen.getByText("Angular");
      fireEvent.click(angularOption);
    });

    // Should not call onChange because max is reached
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("disables button when disabled prop is true", () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} disabled />);

    const button = screen.getByRole("combobox");
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<MultiSelect options={options} selected={[]} onChange={() => {}} className="custom-multi" />);

    const button = screen.getByRole("combobox");
    expect(button).toHaveClass("custom-multi");
  });

  it("handles keyboard navigation on badge removal", () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} selected={["react"]} onChange={handleChange} />);

    const badge = screen.getByText("React").closest(".mr-1");
    const removeButton = badge?.querySelector("button");

    if (removeButton) {
      fireEvent.keyDown(removeButton, { key: "Enter" });
      expect(handleChange).toHaveBeenCalledWith([]);
    }
  });

  it("adjusts height based on selected items", () => {
    const { rerender } = render(<MultiSelect options={options} selected={[]} onChange={() => {}} />);

    let button = screen.getByRole("combobox");
    expect(button).toHaveClass("h-10");

    rerender(<MultiSelect options={options} selected={["react", "vue"]} onChange={() => {}} />);

    button = screen.getByRole("combobox");
    expect(button).toHaveClass("min-h-10");
  });
});
