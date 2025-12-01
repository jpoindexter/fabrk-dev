"use client";

/**
 * Contact Page
 * Contact form for sales, support, and general inquiries - Terminal Console Style
 */

import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";
import { PageHeader } from "./components/page-header";
import { ContactForm } from "./components/contact-form";
import { ContactSidebar } from "./components/contact-sidebar";
import { FaqSection } from "./components/faq-section";

export default function ContactPage() {
  return (
    <div className="font-mono">
      <SiteNavigation />

      <main className="container mx-auto max-w-7xl px-6 py-16">
        <PageHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Information Sidebar */}
          <ContactSidebar />
        </div>

        {/* FAQ Section */}
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
