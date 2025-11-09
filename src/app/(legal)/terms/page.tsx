import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Fabrk",
  description: "Terms of service for Fabrk boilerplate",
};

export default function TermsPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="mb-2 text-4xl font-bold text-foreground">Terms of Service</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: January 2025</p>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground">1. License Grant</h2>
          <p>
            By purchasing Fabrk, you are granted a non-exclusive, perpetual license to use the
            boilerplate code for:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Unlimited projects:</strong> Create as many SaaS applications, websites, or
              products as you want (personal or commercial)
            </li>
            <li>
              <strong>Client work:</strong> Use Fabrk to build products for clients
            </li>
            <li>
              <strong>Modifications:</strong> Modify, adapt, and extend the code as needed
            </li>
            <li>
              <strong>No attribution:</strong> You are not required to credit Fabrk in your projects
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">2. Restrictions</h2>
          <p>You may NOT:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Resell or redistribute:</strong> You cannot resell, redistribute, or share
              Fabrk as a boilerplate, template, or starter kit (even if modified)
            </li>
            <li>
              <strong>Compete:</strong> You cannot use Fabrk to create a competing boilerplate
              product
            </li>
            <li>
              <strong>Share your license:</strong> Each license is for a single developer. Team
              members need their own licenses
            </li>
            <li>
              <strong>Claim ownership:</strong> You cannot claim Fabrk or its original code as your
              own intellectual property
            </li>
          </ul>
          <p className="mt-4">
            <strong>Clarification:</strong> You CAN sell products you build with Fabrk (e.g., a SaaS
            app, a client website). You CANNOT sell Fabrk itself or create a product that competes
            with Fabrk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">3. Updates and Support</h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Lifetime updates for v1.x:</strong> You receive all minor and patch updates
              for version 1 (e.g., 1.0, 1.1, 1.2... 1.99) at no additional cost
            </li>
            <li>
              <strong>Major version upgrades:</strong> Major versions (e.g., v2.0) are offered at a
              50% discount for existing customers
            </li>
            <li>
              <strong>Support:</strong> Email support (support@fabrk.dev) and Discord community
              access included
            </li>
            <li>
              <strong>No guarantee of support:</strong> Support is provided on a best-effort basis.
              We do not guarantee response times or issue resolution
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">4. Refund Policy</h2>
          <p>
            We offer a <strong>30-day money-back guarantee</strong>. If you're not satisfied with
            Fabrk, email support@fabrk.dev within 30 days of purchase for a full refund.
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Refunds are processed within 5-7 business days</li>
            <li>You may keep any code you've already downloaded</li>
            <li>After refund, you lose access to future updates and support</li>
          </ul>
          <p className="mt-4">
            See our <a href="/refund" className="text-primary hover:underline">Refund Policy</a>{" "}
            for full details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">5. Warranty Disclaimer</h2>
          <p>
            Fabrk is provided <strong>"as is"</strong> without warranty of any kind, express or
            implied. We do not guarantee that:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>The code is error-free or bug-free</li>
            <li>The code meets your specific requirements</li>
            <li>The code is compatible with all environments or third-party services</li>
            <li>Updates will not introduce breaking changes</li>
          </ul>
          <p className="mt-4">
            You are responsible for testing and ensuring Fabrk meets your needs before deploying to
            production.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Fabrk and its operators shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages, including but not
            limited to:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Loss of profits, revenue, or data</li>
            <li>Business interruption</li>
            <li>Damage to reputation</li>
          </ul>
          <p className="mt-4">
            Our total liability is limited to the amount you paid for Fabrk ($79).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">7. EU Consumer Rights</h2>
          <p>
            If you are a consumer in the European Union, you have additional rights under the EU
            Consumer Rights Directive:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>14-day withdrawal period:</strong> You have the right to withdraw from this
              contract within 14 days without giving any reason
            </li>
            <li>
              <strong>Exception:</strong> By downloading Fabrk, you acknowledge that you lose your
              right of withdrawal as you have requested the digital content be made available
              immediately
            </li>
            <li>
              However, our 30-day money-back guarantee provides more generous terms than EU law
              requires
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">8. GDPR Compliance</h2>
          <p>
            We comply with the General Data Protection Regulation (GDPR). You have the right to:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Access your personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Data portability</li>
          </ul>
          <p className="mt-4">
            See our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{" "}
            for details on how we handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction where Fabrk operates, without
            regard to conflict of law provisions.
          </p>
          <p className="mt-4">
            For EU customers, nothing in these Terms affects your statutory rights under EU consumer
            protection law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">10. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Changes will be posted on this page with an
            updated "Last updated" date. Continued use of Fabrk after changes constitutes acceptance
            of the new Terms.
          </p>
          <p className="mt-4">
            Material changes will be notified via email to customers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">11. Contact</h2>
          <p>
            Questions about these Terms? Contact us at:{" "}
            <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
              support@fabrk.dev
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
