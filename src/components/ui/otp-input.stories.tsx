import type { Meta, StoryObj } from "@storybook/react";
import { OTPInput } from "./otp-input";
import { useState } from "react";

const meta: Meta<typeof OTPInput> = {
  title: "UI/OTPInput",
  component: OTPInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <OTPInput value={value} onChange={setValue} />;
  },
};

export const FourDigits: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <OTPInput length={4} value={value} onChange={setValue} />;
  },
};

export const EightDigits: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <OTPInput length={8} value={value} onChange={setValue} />;
  },
};

export const WithAutoFocus: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <OTPInput value={value} onChange={setValue} autoFocus />;
  },
};

export const WithPrefilledValue: Story = {
  render: () => {
    const [value, setValue] = useState("123456");
    return <OTPInput value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("123456");
    return <OTPInput value={value} onChange={setValue} disabled />;
  },
};

export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleComplete = (code: string) => {
      setCompleted(true);
      setTimeout(() => setCompleted(false), 2000);
    };

    return (
      <div className="w-[500px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">
            Enter verification code
          </label>
          <OTPInput
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
            autoFocus
          />
          <p className="text-sm text-muted-foreground">
            {value.length} / 6 digits entered
          </p>
        </div>
        {completed && (
          <div className="rounded-brutal border-brutal bg-primary/10 p-4">
            <p className="text-sm font-bold text-primary">
              Code verified successfully!
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const TwoFactorAuth: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<
      "idle" | "success" | "error"
    >("idle");

    const handleComplete = (code: string) => {
      setIsVerifying(true);
      setVerificationStatus("idle");

      // Simulate verification
      setTimeout(() => {
        if (code === "123456") {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
          setValue("");
        }
        setIsVerifying(false);
      }, 1500);
    };

    return (
      <div className="w-[500px] space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>
        <div className="space-y-2">
          <OTPInput
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
            disabled={isVerifying}
            autoFocus
          />
        </div>
        {isVerifying && (
          <div className="rounded-brutal border-brutal bg-card p-4">
            <p className="text-sm text-muted-foreground">Verifying...</p>
          </div>
        )}
        {verificationStatus === "success" && (
          <div className="rounded-brutal border-brutal bg-primary/10 p-4">
            <p className="text-sm font-bold text-primary">
              Authentication successful!
            </p>
          </div>
        )}
        {verificationStatus === "error" && (
          <div className="rounded-brutal border-brutal bg-destructive/10 p-4">
            <p className="text-sm font-bold text-destructive">
              Invalid code. Please try again.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Hint: Try 123456
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const EmailVerification: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [canResend, setCanResend] = useState(false);
    const [countdown, setCountdown] = useState(30);

    React.useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setCanResend(true);
      }
    }, [countdown]);

    const handleResend = () => {
      setValue("");
      setCountdown(30);
      setCanResend(false);
    };

    return (
      <div className="w-[500px] space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Verify your email</h3>
          <p className="text-sm text-muted-foreground">
            We sent a code to your email address
          </p>
        </div>
        <div className="space-y-2">
          <OTPInput value={value} onChange={setValue} length={4} autoFocus />
        </div>
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-sm font-bold text-primary hover:underline"
            >
              Resend code
            </button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Resend code in {countdown}s
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const PhoneVerification: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const phoneNumber = "+1 (555) 123-4567";

    return (
      <div className="w-[500px] space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Verify your phone number</h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sm font-bold">{phoneNumber}</p>
        </div>
        <div className="space-y-2">
          <OTPInput value={value} onChange={setValue} autoFocus />
        </div>
        <div className="rounded-brutal border-brutal bg-card p-4 space-y-2">
          <p className="text-sm font-bold">Tips:</p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Code expires in 10 minutes</li>
            <li>Check your SMS messages</li>
            <li>Contact support if you don't receive it</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const CustomLength: Story = {
  render: () => {
    const [length, setLength] = useState(6);
    const [value, setValue] = useState("");

    return (
      <div className="w-[600px] space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">
            Code Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="8"
            value={length}
            onChange={(e) => {
              setLength(parseInt(e.target.value));
              setValue("");
            }}
            className="w-full"
          />
        </div>
        <OTPInput length={length} value={value} onChange={setValue} />
      </div>
    );
  },
};
