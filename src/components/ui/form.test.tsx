import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./form";
import { Input } from "./input";

// Test form component wrapper
function TestForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

describe("Form Components", () => {
  it("renders form with all components", () => {
    const handleSubmit = () => {};
    render(<TestForm onSubmit={handleSubmit} />);

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("renders FormDescription", () => {
    const handleSubmit = () => {};
    render(<TestForm onSubmit={handleSubmit} />);

    expect(screen.getByText("This is your public display name.")).toBeInTheDocument();
  });

  it("renders FormLabel with correct htmlFor attribute", () => {
    const handleSubmit = () => {};
    render(<TestForm onSubmit={handleSubmit} />);

    const label = screen.getByText("Username");
    expect(label).toHaveAttribute("for");
  });

  it("renders FormItem with grid gap layout", () => {
    const handleSubmit = () => {};
    const { container } = render(<TestForm onSubmit={handleSubmit} />);

    const formItem = container.querySelector('[data-slot="form-item"]');
    expect(formItem).toHaveClass("grid", "gap-2");
  });

  it("FormControl has proper aria attributes", () => {
    const handleSubmit = () => {};
    render(<TestForm onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toHaveAttribute("aria-describedby");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("displays error state on FormLabel when error exists", () => {
    function TestFormWithError() {
      const form = useForm({
        defaultValues: { test: "" },
      });

      form.setError("test", { message: "This field is required" });

      return (
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Field</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestFormWithError />);
    const label = screen.getByText("Test Field");
    expect(label).toHaveAttribute("data-error", "true");
  });

  it("FormMessage displays error message", () => {
    function TestFormWithError() {
      const form = useForm({
        defaultValues: { test: "" },
      });

      form.setError("test", { message: "This field is required" });

      return (
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Field</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      );
    }

    render(<TestFormWithError />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("FormMessage does not render when no error", () => {
    const handleSubmit = () => {};
    const { container } = render(<TestForm onSubmit={handleSubmit} />);

    // Username field has description but no error message
    const formMessages = container.querySelectorAll('[data-slot="form-message"]');
    // Both fields should have FormMessage components, but they shouldn't render anything when no error
    formMessages.forEach((message) => {
      expect(message).toBeEmptyDOMElement();
    });
  });

  it("FormControl sets aria-invalid when error exists", () => {
    function TestFormWithError() {
      const form = useForm({
        defaultValues: { test: "" },
      });

      form.setError("test", { message: "Error" });

      return (
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      );
    }

    const { container } = render(<TestFormWithError />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
