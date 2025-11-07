/**
 * Terms of Service Page
 * Legal agreement between Fabrk and users
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Fabrk",
  description: "Terms and conditions for using Fabrk SaaS boilerplate",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-3 border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Terms of Service</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-6 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Last Updated: November 7, 2024</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Please read these Terms of Service carefully before using Fabrk.
            </p>
          </CardContent>
        </Card>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using Fabrk ("Service", "we", "us", or "our"), you agree to be
              bound by these Terms of Service. If you disagree with any part of these terms,
              you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Description of Service</h2>
            <p>
              Fabrk provides a Next.js SaaS boilerplate with authentication, payments,
              database integration, and UI components. The Service is provided as a software
              license for development purposes.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">2.1 License Grant</h3>
            <p>
              Upon purchase, we grant you a non-exclusive, non-transferable license to:
            </p>
            <ul>
              <li>Use the source code to create unlimited projects</li>
              <li>Modify the code for your own use</li>
              <li>Deploy applications built with Fabrk</li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">2.2 License Restrictions</h3>
            <p>You may NOT:</p>
            <ul>
              <li>Resell, redistribute, or share the source code</li>
              <li>Create derivative boilerplates for sale</li>
              <li>Claim the code as your own creation</li>
              <li>Use the product to build competing boilerplate products</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">3.1 Account Creation</h3>
            <p>
              You must create an account to access certain features. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">3.2 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms,
              engage in fraudulent activity, or pose security risks.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Payment Terms</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">4.1 Pricing</h3>
            <p>
              Current pricing is displayed on our website. We reserve the right to modify
              pricing for new purchases, but existing licenses are honored at their purchase
              price.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">4.2 Payment Processing</h3>
            <p>
              Payments are processed securely through Stripe. We do not store your complete
              credit card information. By providing payment information, you authorize us to
              charge your payment method.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">4.3 Refund Policy</h3>
            <p>
              We offer a 30-day money-back guarantee. If you're not satisfied, contact us
              within 30 days of purchase for a full refund. Refunds are not available after
              30 days.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by
              Fabrk and are protected by international copyright, trademark, patent, trade
              secret, and other intellectual property laws.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">5.1 Your Content</h3>
            <p>
              You retain all rights to any content, code, or applications you create using
              Fabrk. We claim no ownership over your work.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">5.2 Fabrk Content</h3>
            <p>
              The boilerplate code, documentation, and templates remain our intellectual
              property, licensed to you under the terms specified in Section 2.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Prohibited Uses</h2>
            <p>You agree not to use the Service:</p>
            <ul>
              <li>For any unlawful purpose or to violate any laws</li>
              <li>To transmit malware, viruses, or harmful code</li>
              <li>To harass, abuse, or harm others</li>
              <li>To impersonate others or misrepresent your affiliation</li>
              <li>To collect user data without consent</li>
              <li>To overload or interfere with our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Disclaimers and Limitations</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">7.1 "As Is" Service</h3>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
              KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">7.2 Limitation of Liability</h3>
            <p>
              IN NO EVENT SHALL FABRK BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
              INCURRED DIRECTLY OR INDIRECTLY.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">7.3 No Technical Support Guarantee</h3>
            <p>
              While we strive to provide helpful documentation and community support, we do
              not guarantee technical support or troubleshooting assistance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Updates and Maintenance</h2>
            <p>
              We may update, modify, or discontinue any aspect of the Service at any time.
              Lifetime license holders receive all updates at no additional cost, but we do
              not guarantee indefinite maintenance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be
              effective immediately upon posting. Your continued use of the Service after
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">11. Contact Information</h2>
            <p>
              Questions about these Terms? Contact us at:
            </p>
            <ul>
              <li>Email: legal@fabrk.dev</li>
              <li>Website: <Link href="/contact" className="text-primary hover:underline">Contact Form</Link></li>
            </ul>
          </section>
        </div>

        {/* Related Links */}
        <Card className="mt-12">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Related Legal Documents:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/legal/privacy">
                <Button variant="outline" size="sm">Privacy Policy</Button>
              </Link>
              <Link href="/legal/cookies">
                <Button variant="outline" size="sm">Cookie Policy</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
