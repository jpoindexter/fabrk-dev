"use client";

/**
 * Contact Page
 * Contact form for sales, support, and general inquiries - Terminal Console Style
 */

import { useState } from "react";

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
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

    try {
      // In a real implementation, this would send to an API endpoint
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Track contact form submission in GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'contact_form_submit',
        form_subject: formData.subject,
      });

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again or email us directly.");
    }
  };

  return (
    <div className="min-h-screen bg-background font-mono">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-6 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
            [ [0x00] CONTACT ] COMMUNICATION_INTERFACE
          </span>
          <h1 className="text-2xl font-bold lg:text-3xl mb-2">CONTACT_US</h1>
          <p className="text-sm text-muted-foreground">
            Send us a message and we'll respond within 24 hours
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-border bg-card"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-destructive/50" />
                  <div className="size-3 rounded-full bg-warning/50" />
                  <div className="size-3 rounded-full bg-success/50" />
                </div>
                <span className="text-xs text-muted-foreground">
                  [0x01] message_composer.exe │ PID:4096
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">[MESSAGE_FORM]</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  │ &gt; Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs">
                      NAME <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      className="rounded-none text-sm"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="> Enter your name..."
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs">
                      EMAIL <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="rounded-none text-sm"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="> Enter your email..."
                      required
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs">
                      SUBJECT <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject: value })
                      }
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
                      MESSAGE <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      className="rounded-none text-sm"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="> Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Please provide as much detail as possible
                    </p>
                  </div>

                  {/* Success Message */}
                  {status === "success" && (
                    <Alert
                      className="rounded-none bg-success/10 border-success/20"
                      aria-live="polite"
                    >
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <AlertDescription className="text-success text-xs">
                        [OK] MESSAGE_SENT - We've received your message and will respond within 24 hours.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Error Message */}
                  {status === "error" && (
                    <Alert
                      variant="destructive"
                      className="rounded-none"
                      aria-live="polite"
                    >
                      <AlertDescription className="text-xs">[ERROR] {errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-none w-full text-xs"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      "&gt; SENDING..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        &gt; EXECUTE: SEND_MESSAGE
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      PRIVACY_POLICY
                    </Link>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 border border-border">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">[0x02]</span>
                  <h3 className="text-sm font-semibold mb-1">EMAIL_US</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Prefer email? Send us a message directly:
                  </p>
                  <a
                    href="mailto:support@fabrk.dev"
                    className="text-xs text-primary hover:underline"
                  >
                    &gt; support@fabrk.dev
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 border border-border">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">[0x03]</span>
                  <h3 className="text-sm font-semibold mb-1">RESPONSE_TIME</h3>
                  <p className="text-xs text-muted-foreground">
                    We typically respond within 24 hours during business days.
                    For urgent issues, please mention "URGENT" in your subject.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
              [ [0x04] FAQ ]
            </span>
            <h2 className="text-xl font-bold mb-2">FREQUENTLY_ASKED_QUESTIONS</h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to know
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value="refunds"
                  className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                    [Q] Do you offer refunds?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-xs text-muted-foreground">
                    [A] No, all sales are final. Due to the nature of digital products, we do not offer refunds once you have access to the code. Please review our{" "}
                    <Link href="/refund" className="text-primary hover:underline">
                      REFUND_POLICY
                    </Link>{" "}
                    for more details.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value="support"
                  className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                    [Q] Is technical support included?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-xs text-muted-foreground">
                    [A] Yes, we provide email support for all license holders. Response time is typically within 24 hours.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value="client-projects"
                  className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                    [Q] Can I use Fabrk for client projects?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-xs text-muted-foreground">
                    [A] Absolutely! Your license allows you to create unlimited projects for yourself or clients.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value="updates"
                  className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                    [Q] Do I get lifetime updates?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-xs text-muted-foreground">
                    [A] Yes, all future updates and improvements are included at no additional cost.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
