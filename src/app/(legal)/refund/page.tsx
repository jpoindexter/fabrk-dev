import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Fabrk",
  description: "30-day money-back guarantee policy",
};

export default function RefundPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="mb-2 text-4xl font-bold text-foreground">Refund Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: January 2025</p>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground">30-Day Money-Back Guarantee</h2>
          <p>
            We stand behind Fabrk. If you're not satisfied with your purchase for any reason, we
            offer a <strong>full refund within 30 days</strong> of purchase—no questions asked.
          </p>
          <p className="mt-4">
            We want you to be confident in your purchase. If Fabrk doesn't meet your needs, we'll
            refund your money.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">How to Request a Refund</h2>
          <ol className="ml-6 list-decimal space-y-3">
            <li>
              <strong>Email us:</strong> Send an email to{" "}
              <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
                support@fabrk.dev
              </a>{" "}
              with "Refund Request" in the subject line
            </li>
            <li>
              <strong>Include your details:</strong> Provide your purchase email and license key (or
              order number)
            </li>
            <li>
              <strong>Optional feedback:</strong> While not required, we appreciate knowing what
              didn't work for you so we can improve
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Refund Processing</h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Processing time:</strong> Refunds are processed within 5-7 business days of
              your request
            </li>
            <li>
              <strong>Refund method:</strong> Refunds are issued to your original payment method
              (same card/account you used to purchase)
            </li>
            <li>
              <strong>Stripe processing:</strong> It may take an additional 5-10 business days for
              your bank to reflect the refund
            </li>
            <li>
              <strong>Confirmation:</strong> You'll receive an email confirmation once the refund is
              processed
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">What Happens After a Refund</h2>

          <h3 className="mt-6 text-xl font-semibold text-foreground">You Keep:</h3>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Any code you've already downloaded—you can continue using it in your existing projects
            </li>
            <li>
              Knowledge and experience gained from using Fabrk
            </li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-foreground">You Lose Access To:</h3>
          <ul className="ml-6 list-disc space-y-2">
            <li>Future updates and new versions</li>
            <li>Discord community access</li>
            <li>Email support</li>
            <li>New components and features added after your refund</li>
          </ul>

          <p className="mt-4">
            <strong>Important:</strong> We trust our customers. While you can keep the code you
            downloaded, we ask that you honor the spirit of the refund and not use it for new
            commercial projects after receiving a refund.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Eligibility</h2>
          <p>Refunds are available:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Within 30 days of purchase</li>
            <li>For any reason (no questions asked)</li>
            <li>One refund per customer (to prevent abuse)</li>
          </ul>
          <p className="mt-4">
            <strong>Note:</strong> We reserve the right to refuse refunds for suspected fraud or
            abuse (e.g., repeated purchases and refunds).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">EU Consumer Rights</h2>
          <p>
            If you are a consumer in the European Union, you have a legal right to a 14-day
            withdrawal period under the EU Consumer Rights Directive.
          </p>
          <p className="mt-4">
            <strong>However:</strong> By downloading Fabrk immediately after purchase, you
            acknowledge that you waive this 14-day right of withdrawal (as you requested immediate
            delivery of digital content).
          </p>
          <p className="mt-4">
            <strong>Good news:</strong> Our 30-day money-back guarantee is more generous than the EU
            legal requirement, giving you twice as long to decide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Chargebacks</h2>
          <p>
            We have a generous refund policy—there's no need for chargebacks. If you file a
            chargeback instead of requesting a refund:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>It costs us significant processing fees (often more than the purchase price)</li>
            <li>It's flagged as fraudulent activity</li>
            <li>You may be banned from future purchases</li>
          </ul>
          <p className="mt-4">
            <strong>Please contact us first.</strong> We'll process your refund quickly and
            professionally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Refund Exceptions</h2>
          <p>Refunds are NOT available:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>After 30 days from purchase date</li>
            <li>
              For customers who have already received a refund for Fabrk (one refund per customer
              policy)
            </li>
            <li>In cases of suspected fraud or terms of service violations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Questions?</h2>
          <p>
            Have questions about our refund policy? Contact us at{" "}
            <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
              support@fabrk.dev
            </a>
          </p>
          <p className="mt-4">
            We're here to help and want to ensure you have a great experience with Fabrk.
          </p>
        </section>
      </div>
    </article>
  );
}
