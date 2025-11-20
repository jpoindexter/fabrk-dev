/**
 * Privacy Policy Page
 * How we collect, use, and protect user data
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Fabrk",
  description: "How Fabrk collects, uses, and protects your personal data",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-3 border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground">Your data protection rights</p>
              </div>
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
        {/* Compliance Badges */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <CardTitle>Last Updated: November 7, 2024</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  We value your privacy and are committed to protecting your personal data.
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                <Badge variant="secondary">GDPR Compliant</Badge>
                <Badge variant="secondary">CCPA Compliant</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Summary */}
        <Card className="mb-8 bg-accent/30">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold mb-4">Privacy at a Glance</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Data Encryption</p>
                  <p className="text-xs text-muted-foreground">
                    All data encrypted in transit and at rest
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">No Data Selling</p>
                  <p className="text-xs text-muted-foreground">
                    We never sell your personal information
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Data Minimization</p>
                  <p className="text-xs text-muted-foreground">
                    We only collect what's necessary
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Your Rights</p>
                  <p className="text-xs text-muted-foreground">
                    Access, edit, or delete your data anytime
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">1.1 Information You Provide</h3>
            <p>When you use Fabrk, we collect information you provide directly:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, password (hashed)</li>
              <li><strong>Payment Information:</strong> Processed by Stripe (we don't store full card details)</li>
              <li><strong>Profile Data:</strong> Optional profile picture, bio, preferences</li>
              <li><strong>Communications:</strong> Support inquiries, feedback, email correspondence</li>
              <li><strong>GitHub Username:</strong> Required for granting repository access to purchased code. This information is used to invite you as a collaborator to our private GitHub repository with read-only access.</li>
            </ul>

            <h3 className="text-xl font-bold mt-4 mb-2">1.2 Automatically Collected Information</h3>
            <p>We automatically collect certain information when you use our Service:</p>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent</li>
              <li><strong>Device Information:</strong> Browser type, OS, device model</li>
              <li><strong>Log Data:</strong> IP address, access times, error logs</li>
              <li><strong>Cookies:</strong> Session cookies, preference cookies (see Cookie Policy)</li>
            </ul>

            <h3 className="text-xl font-bold mt-4 mb-2">1.3 Third-Party Data</h3>
            <p>If you authenticate via OAuth (Google, GitHub), we receive:</p>
            <ul>
              <li>Your name and email address</li>
              <li>Profile picture (if provided)</li>
              <li>Account ID (for linking purposes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. How We Use Your Information</h2>
            <p>We use collected information for:</p>
            <ul>
              <li><strong>Service Provision:</strong> Account creation, authentication, service delivery</li>
              <li><strong>Payment Processing:</strong> Billing, invoices, subscription management</li>
              <li><strong>Communication:</strong> Service updates, security alerts, support responses</li>
              <li><strong>Improvement:</strong> Analyzing usage to improve features and performance</li>
              <li><strong>Security:</strong> Fraud detection, abuse prevention, system security</li>
              <li><strong>Legal Compliance:</strong> Meeting legal obligations, enforcing terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Legal Basis for Processing (GDPR)</h2>
            <p>Under GDPR, we process your data based on:</p>
            <ul>
              <li><strong>Contract:</strong> Processing necessary to provide the Service you purchased</li>
              <li><strong>Consent:</strong> You've given explicit consent (e.g., marketing emails)</li>
              <li><strong>Legitimate Interest:</strong> Necessary for our business operations (e.g., fraud prevention)</li>
              <li><strong>Legal Obligation:</strong> Required by law (e.g., tax records, payment history)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">4.1 Service Providers</h3>
            <p>We share data with trusted third parties who help us operate:</p>
            <ul>
              <li><strong>Stripe:</strong> Payment processing (PCI-DSS compliant)</li>
              <li><strong>Resend:</strong> Transactional email delivery</li>
              <li><strong>Vercel/Hosting Provider:</strong> Infrastructure and hosting</li>
              <li><strong>Analytics Services:</strong> Usage analytics (anonymized when possible)</li>
              <li><strong>GitHub:</strong> We use GitHub's Collaborator API to grant you access to the fabrk-boilerplate repository after purchase. GitHub is a data processor for your GitHub username and will receive a collaboration invitation request. <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">GitHub's privacy policy</a></li>
            </ul>

            <h3 className="text-xl font-bold mt-4 mb-2">4.2 Legal Requirements</h3>
            <p>We may disclose data if required by law or in response to:</p>
            <ul>
              <li>Valid legal process (subpoenas, court orders)</li>
              <li>Enforcement of our Terms of Service</li>
              <li>Protection of rights, property, or safety</li>
            </ul>

            <h3 className="text-xl font-bold mt-4 mb-2">4.3 Business Transfers</h3>
            <p>
              If Fabrk is acquired or merged, your information may be transferred to the new
              owner. We'll notify you before any transfer.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Data Security</h2>
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li><strong>Encryption:</strong> TLS 1.3 for data in transit, AES-256 for data at rest</li>
              <li><strong>Authentication:</strong> Bcrypt password hashing (12 rounds)</li>
              <li><strong>Session Security:</strong> JWT tokens with expiration, session versioning</li>
              <li><strong>Infrastructure:</strong> Secure cloud hosting with regular security patches</li>
              <li><strong>Access Control:</strong> Limited employee access to user data</li>
              <li><strong>Monitoring:</strong> Automated security monitoring and alerts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Data Retention</h2>
            <p>We retain your data for:</p>
            <ul>
              <li><strong>Active Accounts:</strong> Duration of your account + 30 days after deletion</li>
              <li><strong>Payment Records:</strong> 7 years (required by tax law)</li>
              <li><strong>Logs:</strong> 90 days for security and debugging</li>
              <li><strong>Backups:</strong> 30 days (then automatically deleted)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Your Privacy Rights</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">7.1 GDPR Rights (EU Users)</h3>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Objection:</strong> Object to data processing</li>
              <li><strong>Withdraw Consent:</strong> Revoke consent at any time</li>
            </ul>

            <h3 className="text-xl font-bold mt-4 mb-2">7.2 CCPA Rights (California Users)</h3>
            <p>California residents have the right to:</p>
            <ul>
              <li>Know what personal information we collect</li>
              <li>Know whether we sell or disclose personal information (we don't sell)</li>
              <li>Access your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of sale (not applicable - we don't sell data)</li>
              <li>Non-discrimination for exercising your rights</li>
            </ul>

            <h3 className="text-xl font-bold mt-4 mb-2">7.3 Exercising Your Rights</h3>
            <p>To exercise any of these rights, contact us at:</p>
            <ul>
              <li>Email: privacy@fabrk.dev</li>
              <li>Account Settings: <Link href="/settings" className="text-primary hover:underline">Edit your data directly</Link></li>
            </ul>
            <p>We'll respond within 30 days.</p>

            <h3 className="text-xl font-bold mt-4 mb-2">7.4 GitHub Access Revocation</h3>
            <p>
              If you request your data be deleted, we will revoke your access to the fabrk-boilerplate repository on GitHub.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Cookies and Tracking</h2>
            <p>We use cookies for:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Authentication, session management (required)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings (theme, language)</li>
              <li><strong>Analytics Cookies:</strong> Understand usage patterns (optional)</li>
            </ul>
            <p>
              See our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for
              detailed information.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">9. Children's Privacy</h2>
            <p>
              Fabrk is not intended for users under 18. We do not knowingly collect data from
              children. If you believe we've collected data from a child, contact us
              immediately and we'll delete it.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. International Data Transfers</h2>
            <p>
              Your data may be processed in countries outside your own. We ensure adequate
              protection through:
            </p>
            <ul>
              <li>Standard Contractual Clauses (EU-approved)</li>
              <li>Data Processing Agreements with all vendors</li>
              <li>Compliance with applicable data protection laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this policy periodically. We'll notify you of significant changes
              via email or prominent notice on our website. Continued use after changes
              constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">12. Contact Us</h2>
            <p>Privacy questions or concerns? Contact us:</p>
            <ul>
              <li><strong>Email:</strong> privacy@fabrk.dev</li>
              <li><strong>Data Protection Officer:</strong> dpo@fabrk.dev</li>
              <li><strong>Contact Form:</strong> <Link href="/contact" className="text-primary hover:underline">Contact Page</Link></li>
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
              <Link href="/terms">
                <Button variant="outline" size="sm">Terms of Service</Button>
              </Link>
              <Link href="/cookies">
                <Button variant="outline" size="sm">Cookie Policy</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
