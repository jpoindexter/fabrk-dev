/**
 * Cookie Policy Page
 * How we use cookies and similar tracking technologies - Terminal Console Style
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16 font-mono">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            [ [0x00] LEGAL ] COOKIE_POLICY
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="mb-2 text-sm text-muted-foreground">FABRK_LEGAL:</h1>
          <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
            COOKIE_POLICY
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-xs text-muted-foreground">LAST_UPDATED: November 26, 2025</span>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12 border border-border bg-card p-6"
      >
        <div className="mb-2 text-xs text-muted-foreground">
          [ [0x01] OVERVIEW ]────────────────────────
        </div>
        <p className="text-sm text-muted-foreground">
          This Cookie Policy explains how Fabrk uses cookies and similar technologies to recognize you when you visit our website.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Section 1 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x10]</span>
            <h2 className="text-lg font-bold">WHAT_ARE_COOKIES</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and provide information to website owners.
          </p>

          <h3 className="text-sm font-semibold mb-2">[1.1] COOKIE_TYPES</h3>
          <ul className="space-y-1 text-sm text-muted-foreground pl-4">
            <li>├─ <span className="text-foreground">SESSION:</span> Temporary, expire when browser closes</li>
            <li>├─ <span className="text-foreground">PERSISTENT:</span> Remain until expiry or deletion</li>
            <li>├─ <span className="text-foreground">FIRST_PARTY:</span> Set by Fabrk directly</li>
            <li>└─ <span className="text-foreground">THIRD_PARTY:</span> Set by external services</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x20]</span>
            <h2 className="text-lg font-bold">COOKIES_WE_USE</h2>
          </div>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div>
              <h3 className="text-sm font-semibold mb-3">[2.1] ESSENTIAL_COOKIES (REQUIRED)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                These cookies are necessary for the website to function and cannot be disabled.
              </p>
              <div className="border border-border bg-background p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground">COOKIE_NAME</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground">PURPOSE</th>
                      <th className="text-left py-2 text-muted-foreground">DURATION</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-foreground">next-auth.session-token</td>
                      <td className="py-2 pr-4">User authentication</td>
                      <td className="py-2">30 days</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-foreground">next-auth.csrf-token</td>
                      <td className="py-2 pr-4">CSRF protection</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-foreground">__Secure-next-auth.callback-url</td>
                      <td className="py-2 pr-4">OAuth callback</td>
                      <td className="py-2">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Functional Cookies */}
            <div>
              <h3 className="text-sm font-semibold mb-3">[2.2] FUNCTIONAL_COOKIES (OPTIONAL)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                These cookies enable enhanced functionality and personalization.
              </p>
              <div className="border border-border bg-background p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground">COOKIE_NAME</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground">PURPOSE</th>
                      <th className="text-left py-2 text-muted-foreground">DURATION</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-foreground">theme</td>
                      <td className="py-2 pr-4">Light/dark mode preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-foreground">color-scheme</td>
                      <td className="py-2 pr-4">Color scheme preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-foreground">locale</td>
                      <td className="py-2 pr-4">Language preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div>
              <h3 className="text-sm font-semibold mb-3">[2.3] ANALYTICS_COOKIES (OPTIONAL)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                These cookies help us understand how visitors use our website.
              </p>
              <div className="border border-border bg-background p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground">SERVICE</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground">PURPOSE</th>
                      <th className="text-left py-2 text-muted-foreground">DURATION</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-foreground">Vercel Analytics</td>
                      <td className="py-2 pr-4">Page views, performance (anonymized)</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-foreground">Custom Analytics</td>
                      <td className="py-2 pr-4">Feature usage (anonymized)</td>
                      <td className="py-2">90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div>
              <h3 className="text-sm font-semibold mb-3">[2.4] THIRD_PARTY_COOKIES</h3>
              <p className="text-sm text-muted-foreground mb-3">
                External services may set their own cookies:
              </p>
              <div className="border border-border bg-background p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground">SERVICE</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground">PURPOSE</th>
                      <th className="text-left py-2 text-muted-foreground">POLICY</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-foreground">Polar.sh</td>
                      <td className="py-2 pr-4">Payment processing</td>
                      <td className="py-2">
                        <a href="https://polar.sh/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          VIEW_POLICY
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-foreground">Google OAuth</td>
                      <td className="py-2 pr-4">Authentication</td>
                      <td className="py-2">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          VIEW_POLICY
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x30]</span>
            <h2 className="text-lg font-bold">MANAGE_COOKIES</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">[3.1] BROWSER_SETTINGS</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Most browsers allow you to control cookies:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground pl-4">
                <li>├─ View and delete cookies individually</li>
                <li>├─ Block third-party cookies</li>
                <li>├─ Block cookies from specific websites</li>
                <li>└─ Delete all cookies on browser close</li>
              </ul>
              <p className="text-xs text-warning mt-2">
                Note: Blocking essential cookies prevents login and core features.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">[3.2] BROWSER_INSTRUCTIONS</h3>
              <ul className="space-y-1 text-sm text-muted-foreground pl-4">
                <li>├─ <span className="text-foreground">CHROME:</span> Settings → Privacy → Cookies</li>
                <li>├─ <span className="text-foreground">FIREFOX:</span> Settings → Privacy → Cookies</li>
                <li>├─ <span className="text-foreground">SAFARI:</span> Preferences → Privacy → Manage Data</li>
                <li>└─ <span className="text-foreground">EDGE:</span> Settings → Cookies and permissions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">[3.3] OPT_OUT_ANALYTICS</h3>
              <p className="text-sm text-muted-foreground">
                Opt-out via account settings or by enabling "Do Not Track" in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x40]</span>
            <h2 className="text-lg font-bold">OTHER_TRACKING</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-2">In addition to cookies, we may use:</p>
          <ul className="space-y-1 text-sm text-muted-foreground pl-4">
            <li>├─ <span className="text-foreground">LOCAL_STORAGE:</span> Store preferences and app state</li>
            <li>├─ <span className="text-foreground">SESSION_STORAGE:</span> Temporary storage (cleared on tab close)</li>
            <li>└─ <span className="text-foreground">WEB_BEACONS:</span> Small images for email tracking</li>
          </ul>
        </section>

        {/* Section 5-6 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x50]</span>
            <h2 className="text-lg font-bold">POLICY_UPDATES</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            We may update this Cookie Policy. Changes will be posted with an updated "Last Updated" date.
          </p>
        </section>

        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x60]</span>
            <h2 className="text-lg font-bold">QUESTIONS</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Questions about cookies?</p>
          <ul className="space-y-1 text-sm text-muted-foreground pl-4">
            <li>├─ <span className="text-foreground">EMAIL:</span> support@fabrk.dev</li>
            <li>└─ <span className="text-foreground">FORM:</span> <Link href="/contact" className="text-primary hover:underline">/contact</Link></li>
          </ul>
        </section>
      </div>

      {/* Cookie Management Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 border border-primary/30 bg-primary/5 p-6"
      >
        <h3 className="text-sm font-semibold mb-2">[MANAGE_PREFERENCES]</h3>
        <p className="text-sm text-muted-foreground mb-3">
          You'll see a cookie consent banner on first visit. Change preferences anytime in account settings.
        </p>
        <Link href="/settings" className="text-xs text-primary hover:underline">
          &gt; COOKIE_SETTINGS
        </Link>
      </motion.div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-8 border border-border bg-card p-6"
      >
        <span className="block mb-3 text-xs text-muted-foreground">
          [ RELATED_DOCUMENTS ]
        </span>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/terms" className="text-primary hover:underline">
            &gt; TERMS_OF_SERVICE
          </Link>
          <Link href="/privacy" className="text-primary hover:underline">
            &gt; PRIVACY_POLICY
          </Link>
          <Link href="/refund" className="text-primary hover:underline">
            &gt; REFUND_POLICY
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
