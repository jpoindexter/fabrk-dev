'use client';

/**
 * Contact Page
 * Contact form for sales, support, and general inquiries - Terminal Console Style
 */

import { PageHeader } from './components/page-header';
import { ContactForm } from './components/contact-form';
import { ContactSidebar } from './components/contact-sidebar';
import { FaqSection } from './components/faq-section';
import { generateFAQSchema } from '@/lib/metadata';

const CONTACT_FAQ = [
  {
    question: 'Is Fabrk really open source?',
    answer:
      'Yes. MIT licensed. Fork it, ship it, modify it, sell what you build with it. No fees, no attribution required.',
  },
  {
    question: 'Where do I get support?',
    answer:
      'GitHub Issues for bugs, GitHub Discussions for questions. Community-driven. PRs welcome.',
  },
  {
    question: 'Can I use Fabrk for client projects?',
    answer: 'Yes — MIT covers unlimited personal and commercial use.',
  },
  {
    question: 'How do I get updates?',
    answer: 'Pull from the GitHub repo. New components and features land in main.',
  },
];

const faqSchema = generateFAQSchema(CONTACT_FAQ);

function ContactContent() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Information Sidebar */}
        <ContactSidebar />
      </div>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* AEO: FAQ schema for featured snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeader />
      <ContactContent />
    </>
  );
}
