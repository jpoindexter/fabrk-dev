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
          <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 text-xs">
            [ [0x00] LEGAL ] COOKIE_POLICY
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-muted-foreground mb-2 text-sm">FABRK_LEGAL:</h1>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight">COOKIE_POLICY</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-muted-foreground text-xs">LAST_UPDATED: November 26, 2025</span>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-border bg-card mb-12 border p-6"
      >
        <div className="text-muted-foreground mb-2 text-xs">
          [ [0x01] OVERVIEW ]────────────────────────
        </div>
        <p className="text-muted-foreground text-sm">
          This Cookie Policy explains how Fabrk uses cookies and similar technologies to recognize
          you when you visit our website.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Section 1 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x10]</span>
            <h2 className="text-lg font-semibold">WHAT_ARE_COOKIES</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Cookies are small text files placed on your device when you visit a website. They are
            widely used to make websites work efficiently and provide information to website owners.
          </p>

          <h3 className="mb-2 text-sm font-semibold">[1.1] COOKIE_TYPES</h3>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">SESSION:</span> Temporary, expire when browser
              closes
            </li>
            <li>
              ├─ <span className="text-foreground">PERSISTENT:</span> Remain until expiry or
              deletion
            </li>
            <li>
              ├─ <span className="text-foreground">FIRST_PARTY:</span> Set by Fabrk directly
            </li>
            <li>
              └─ <span className="text-foreground">THIRD_PARTY:</span> Set by external services
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x20]</span>
            <h2 className="text-lg font-semibold">COOKIES_WE_USE</h2>
          </div>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">[2.1] ESSENTIAL_COOKIES (REQUIRED)</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                These cookies are necessary for the website to function and cannot be disabled.
              </p>
              <div className="border-border bg-background overflow-x-auto border p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-border border-b">
                      <th className="text-muted-foreground py-2 pr-4 text-left">COOKIE_NAME</th>
                      <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                      <th className="text-muted-foreground py-2 text-left">DURATION</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-border/50 border-b">
                      <td className="text-foreground py-2 pr-4">next-auth.session-token</td>
                      <td className="py-2 pr-4">User authentication</td>
                      <td className="py-2">30 days</td>
                    </tr>
                    <tr className="border-border/50 border-b">
                      <td className="text-foreground py-2 pr-4">next-auth.csrf-token</td>
                      <td className="py-2 pr-4">CSRF protection</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="text-foreground py-2 pr-4">__Secure-next-auth.callback-url</td>
                      <td className="py-2 pr-4">OAuth callback</td>
                      <td className="py-2">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Functional Cookies */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">[2.2] FUNCTIONAL_COOKIES (OPTIONAL)</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                These cookies enable enhanced functionality and personalization.
              </p>
              <div className="border-border bg-background overflow-x-auto border p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-border border-b">
                      <th className="text-muted-foreground py-2 pr-4 text-left">COOKIE_NAME</th>
                      <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                      <th className="text-muted-foreground py-2 text-left">DURATION</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-border/50 border-b">
                      <td className="text-foreground py-2 pr-4">theme</td>
                      <td className="py-2 pr-4">Light/dark mode preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-border/50 border-b">
                      <td className="text-foreground py-2 pr-4">color-scheme</td>
                      <td className="py-2 pr-4">Color scheme preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="text-foreground py-2 pr-4">locale</td>
                      <td className="py-2 pr-4">Language preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">[2.3] ANALYTICS_COOKIES (OPTIONAL)</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                These cookies help us understand how visitors use our website.
              </p>
              <div className="border-border bg-background overflow-x-auto border p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-border border-b">
                      <th className="text-muted-foreground py-2 pr-4 text-left">SERVICE</th>
                      <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                      <th className="text-muted-foreground py-2 text-left">DURATION</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-border/50 border-b">
                      <td className="text-foreground py-2 pr-4">Vercel Analytics</td>
                      <td className="py-2 pr-4">Page views, performance (anonymized)</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="text-foreground py-2 pr-4">Custom Analytics</td>
                      <td className="py-2 pr-4">Feature usage (anonymized)</td>
                      <td className="py-2">90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">[2.4] THIRD_PARTY_COOKIES</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                External services may set their own cookies:
              </p>
              <div className="border-border bg-background overflow-x-auto border p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-border border-b">
                      <th className="text-muted-foreground py-2 pr-4 text-left">SERVICE</th>
                      <th className="text-muted-foreground py-2 pr-4 text-left">PURPOSE</th>
                      <th className="text-muted-foreground py-2 text-left">POLICY</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-border/50 border-b">
                      <td className="text-foreground py-2 pr-4">Polar.sh</td>
                      <td className="py-2 pr-4">Payment processing</td>
                      <td className="py-2">
                        <a
                          href="https://polar.sh/legal/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          VIEW_POLICY
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-foreground py-2 pr-4">Google OAuth</td>
                      <td className="py-2 pr-4">Authentication</td>
                      <td className="py-2">
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
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
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x30]</span>
            <h2 className="text-lg font-semibold">MANAGE_COOKIES</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[3.1] BROWSER_SETTINGS</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Most browsers allow you to control cookies:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ View and delete cookies individually</li>
                <li>├─ Block third-party cookies</li>
                <li>├─ Block cookies from specific websites</li>
                <li>└─ Delete all cookies on browser close</li>
              </ul>
              <p className="text-warning mt-2 text-xs">
                Note: Blocking essential cookies prevents login and core features.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[3.2] BROWSER_INSTRUCTIONS</h3>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>
                  ├─ <span className="text-foreground">CHROME:</span> Settings → Privacy → Cookies
                </li>
                <li>
                  ├─ <span className="text-foreground">FIREFOX:</span> Settings → Privacy → Cookies
                </li>
                <li>
                  ├─ <span className="text-foreground">SAFARI:</span> Preferences → Privacy → Manage
                  Data
                </li>
                <li>
                  └─ <span className="text-foreground">EDGE:</span> Settings → Cookies and
                  permissions
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[3.3] OPT_OUT_ANALYTICS</h3>
              <p className="text-muted-foreground text-sm">
                Opt-out via account settings or by enabling "Do Not Track" in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x40]</span>
            <h2 className="text-lg font-semibold">OTHER_TRACKING</h2>
          </div>
          <p className="text-muted-foreground mb-2 text-sm">In addition to cookies, we may use:</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">LOCAL_STORAGE:</span> Store preferences and app
              state
            </li>
            <li>
              ├─ <span className="text-foreground">SESSION_STORAGE:</span> Temporary storage
              (cleared on tab close)
            </li>
            <li>
              └─ <span className="text-foreground">WEB_BEACONS:</span> Small images for email
              tracking
            </li>
          </ul>
        </section>

        {/* Section 5-6 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x50]</span>
            <h2 className="text-lg font-semibold">POLICY_UPDATES</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            We may update this Cookie Policy. Changes will be posted with an updated "Last Updated"
            date.
          </p>
        </section>

        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x60]</span>
            <h2 className="text-lg font-semibold">QUESTIONS</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">Questions about cookies?</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">EMAIL:</span> support@fabrk.dev
            </li>
            <li>
              └─ <span className="text-foreground">FORM:</span>{" "}
              <Link href="/contact" className="text-primary hover:underline">
                /contact
              </Link>
            </li>
          </ul>
        </section>
      </div>

      {/* Cookie Management Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-primary/30 bg-primary/5 mt-12 border p-6"
      >
        <h3 className="mb-2 text-sm font-semibold">[MANAGE_PREFERENCES]</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          You&apos;ll see a cookie consent banner on first visit. Click below to update your
          preferences.
        </p>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-cookie-settings"));
          }}
          className="text-primary cursor-pointer font-mono text-xs hover:underline"
        >
          &gt; COOKIE_SETTINGS
        </button>
      </motion.div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="border-border bg-card mt-8 border p-6"
      >
        <span className="text-muted-foreground mb-4 block text-xs">[ RELATED_DOCUMENTS ]</span>
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
