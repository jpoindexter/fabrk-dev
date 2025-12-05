/**
 * Contact Form Component
 * Main contact form with terminal styling
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WindowControls } from "@/components/ui/window-controls";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Track contact form submission in GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "contact_form_submit",
        form_subject: formData.subject,
      });

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: unknown) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Failed to send message";
      setErrorMessage(`${message}. Please try again or email us directly at support@fabrk.dev`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="border-border bg-card border"
    >
      {/* Terminal Header */}
      <div className="border-border flex items-center gap-2 border-b px-4 py-2">
        <WindowControls size="md" />
        <span className="text-muted-foreground text-xs">
          [0x01] message_composer.exe │ PID:4096
        </span>
      </div>

      <div className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <MessageCircle className="text-primary h-5 w-5" />
          <span className="text-sm font-semibold">[MESSAGE_FORM]</span>
        </div>
        <p className="text-muted-foreground mb-6 text-xs">
          │ &gt; Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs">
              [NAME]:<span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="name"
              className="rounded-none text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="> Enter your name..."
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs">
              [EMAIL]:<span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              className="rounded-none text-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="> Enter your email..."
              required
            />
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs">
              [SUBJECT]:<span className="text-destructive ml-1">*</span>
            </Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
              required
            >
              <SelectTrigger className="rounded-none text-sm">
                <SelectValue placeholder="> Select a subject..." />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="sales">SALES_INQUIRY</SelectItem>
                <SelectItem value="support">TECHNICAL_SUPPORT</SelectItem>
                <SelectItem value="billing">BILLING_QUESTION</SelectItem>
                <SelectItem value="feature">FEATURE_REQUEST</SelectItem>
                <SelectItem value="bug">BUG_REPORT</SelectItem>
                <SelectItem value="partnership">PARTNERSHIP_OPPORTUNITY</SelectItem>
                <SelectItem value="other">OTHER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs">
              [MESSAGE]:<span className="text-destructive ml-1">*</span>
            </Label>
            <Textarea
              id="message"
              className="rounded-none text-sm"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="> Tell us more about your inquiry..."
              rows={6}
              required
            />
            <p className="text-muted-foreground text-xs">
              Please provide as much detail as possible
            </p>
          </div>

          {/* Success Message */}
          {status === "success" && (
            <Alert className="bg-success/10 border-success/20 rounded-none" aria-live="polite">
              <CheckCircle2 className="text-success h-4 w-4" />
              <AlertDescription className="text-success text-xs">
                [OK] MESSAGE_SENT - We've received your message and will respond within 24 hours.
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {status === "error" && (
            <Alert variant="destructive" className="rounded-none" aria-live="polite">
              <AlertDescription className="text-xs">[ERROR] {errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-none text-xs"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              "> SENDING..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                &gt; SEND_MESSAGE
              </>
            )}
          </Button>

          <p className="text-muted-foreground text-center text-xs">
            By submitting this form, you agree to our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              PRIVACY_POLICY
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
