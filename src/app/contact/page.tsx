"use client";

/**
 * Contact Page
 * Contact form for sales, support, and general inquiries
 */

import { useState } from "react";
import Link from "next/link";
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
      {/* Header */}
      <header className="border-b-3 border-border bg-card">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-muted-foreground text-lg">
              Have questions? We're here to help. Send us a message and we'll respond
              within 24 hours.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-12">
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
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Prefer email? Send us a message directly:
                    </p>
                    <a
                      href="mailto:support@fabrk.dev"
                      className="text-sm text-primary hover:underline"
                    >
                      support@fabrk.dev
                    </a>
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
                    <h3 className="font-bold mb-1">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours during business days.
                      For urgent issues, please mention "URGENT" in your subject.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Location */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Office Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Remote-first team
                      <br />
                      Available worldwide
                      <br />
                      9 AM - 5 PM EST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="bg-accent/30">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Have a quick question?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Check out our documentation for common questions and guides.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "Do you offer refunds?",
                a: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
              },
              {
                q: "Is technical support included?",
                a: "Yes, we provide email support for all license holders. Response time is typically within 24 hours.",
              },
              {
                q: "Can I use Fabrk for client projects?",
                a: "Absolutely! Your license allows you to create unlimited projects for yourself or clients.",
              },
              {
                q: "Do I get lifetime updates?",
                a: "Yes, all future updates and improvements are included at no additional cost.",
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
