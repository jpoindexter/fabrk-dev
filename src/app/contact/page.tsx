"use client";

/**
 * Contact Page
 * Contact form for sales, support, and general inquiries
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  H2,
  H3,
  Body,
  BodyMuted,
  Small,
  Link as TypographyLink,
} from "@/components/ui/typography";
import { Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Please provide as much detail as possible
                    </p>
                  </div>

                  {/* Success Message */}
                  {status === "success" && (
                    <Alert className="bg-success/10 border-success/20">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <AlertDescription className="text-success">
                        Thank you! We've received your message and will respond within 24
                        hours.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Error Message */}
                  {status === "error" && (
                    <Alert variant="destructive">
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Email */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <H3 className="mb-1">Email Us</H3>
                    <Small className="block mb-2">
                      Prefer email? Send us a message directly:
                    </Small>
                    <TypographyLink
                      href="mailto:support@fabrk.dev"
                      className="text-sm"
                    >
                      support@fabrk.dev
                    </TypographyLink>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <H3 className="mb-1">Response Time</H3>
                    <Small>
                      We typically respond within 24 hours during business days.
                      For urgent issues, please mention "URGENT" in your subject.
                    </Small>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <H2 className="mb-2 text-center">Frequently Asked Questions</H2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <BodyMuted className="mb-12 text-center">
              Everything you need to know
            </BodyMuted>
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
                  className="rounded-lg border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-base font-semibold text-foreground hover:no-underline">
                    Do you offer refunds?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 font-normal text-muted-foreground">
                    No, all sales are final. Due to the nature of digital products, we do not offer refunds once you have access to the code. Please review our{" "}
                    <Link href="/refund" className="text-primary hover:underline">
                      Refund Policy
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
                  className="rounded-lg border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-base font-semibold text-foreground hover:no-underline">
                    Is technical support included?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 font-normal text-muted-foreground">
                    Yes, we provide email support for all license holders. Response time is typically within 24 hours.
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
                  className="rounded-lg border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-base font-semibold text-foreground hover:no-underline">
                    Can I use Fabrk for client projects?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 font-normal text-muted-foreground">
                    Absolutely! Your license allows you to create unlimited projects for yourself or clients.
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
                  className="rounded-lg border border-border bg-card transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 text-left text-base font-semibold text-foreground hover:no-underline">
                    Do I get lifetime updates?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 font-normal text-muted-foreground">
                    Yes, all future updates and improvements are included at no additional cost.
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
