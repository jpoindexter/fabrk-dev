import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/components/ui/button";
import React from "react";

describe("Button Component", () => {
    it("renders correctly with default props", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    describe("Variants", () => {
        it("renders default variant", () => {
            render(<Button variant="default">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders destructive variant", () => {
            render(<Button variant="destructive">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders outline variant", () => {
            render(<Button variant="outline">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders secondary variant", () => {
            render(<Button variant="secondary">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders ghost variant", () => {
            render(<Button variant="ghost">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders link variant", () => {
            render(<Button variant="link">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });
    });

    describe("Sizes", () => {
        it("renders default size", () => {
            render(<Button size="default">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders sm size", () => {
            render(<Button size="sm">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders lg size", () => {
            render(<Button size="lg">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders icon size", () => {
            render(<Button size="icon">Button</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });
    });

    describe("Loading State", () => {
        it("shows loading text and spinner when loading is true", () => {
            render(<Button loading>Submit</Button>);
            const button = screen.getByRole("button");
            expect(button).toBeDisabled();
            expect(screen.getByText("> LOADING...")).toBeInTheDocument();
            expect(button.querySelector(".animate-spin")).toBeInTheDocument();
        });

        it("shows custom loading text", () => {
            render(<Button loading loadingText="Processing...">Submit</Button>);
            expect(screen.getByText("Processing...")).toBeInTheDocument();
        });

        it("sets aria-busy and aria-label when loading", () => {
            render(<Button loading loadingText="Wait">Submit</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveAttribute("aria-busy", "true");
            expect(button).toHaveAttribute("aria-label", "Wait");
        });
    });

    describe("Interactions", () => {
        it("calls onClick handler when clicked", () => {
            const handleClick = vi.fn();
            render(<Button onClick={handleClick}>Click me</Button>);
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("does not call onClick when disabled", () => {
            const handleClick = vi.fn();
            render(<Button disabled onClick={handleClick}>Click me</Button>);
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).not.toHaveBeenCalled();
        });

        it("does not call onClick when loading", () => {
            const handleClick = vi.fn();
            render(<Button loading onClick={handleClick}>Click me</Button>);
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    describe("Polymorphism", () => {
        it("renders as a different element when asChild is true", () => {
            render(
                <Button asChild>
                    <a href="/link">Link Button</a>
                </Button>
            );
            const link = screen.getByRole("link", { name: /link button/i });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", "/link");
        });
    });
});
