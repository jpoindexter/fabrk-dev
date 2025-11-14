import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp";

describe("InputOTP", () => {
  it("renders OTP input slots", () => {
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    );

    const slots = container.querySelectorAll('[class*="items-center"]');
    expect(slots.length).toBeGreaterThan(0);
  });

  it("accepts value changes", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <InputOTP maxLength={6} onChange={handleChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = container.querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "123" } });
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it("renders with custom maxLength", () => {
    const { container } = render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    );

    expect(container.querySelector('[data-slot="input-otp"]')).toBeInTheDocument();
  });

  it("renders separator between groups", () => {
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );

    const separator = container.querySelector('[role="separator"]');
    expect(separator).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    const { container } = render(
      <InputOTP maxLength={6} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <InputOTP maxLength={6} containerClassName="custom-container">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    );

    const customContainer = container.querySelector(".custom-container");
    expect(customContainer).toBeInTheDocument();
  });

  it("applies custom className to input", () => {
    const { container } = render(
      <InputOTP maxLength={6} className="custom-input">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = container.querySelector(".custom-input");
    expect(input).toBeInTheDocument();
  });

  it("renders slots with proper styling", () => {
    const { container } = render(
      <InputOTP maxLength={3}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    );

    const slots = container.querySelectorAll('[class*="border"]');
    expect(slots.length).toBeGreaterThan(0);
  });

  it("handles keyboard input", () => {
    const handleComplete = vi.fn();
    const { container } = render(
      <InputOTP maxLength={3} onComplete={handleComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = container.querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "123" } });
      expect(handleComplete).toHaveBeenCalledWith("123");
    }
  });
});
