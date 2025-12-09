import { Suspense } from 'react';
import { CheckCircle, Download, Mail, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PurchaseTracker } from '@/components/analytics/purchase-tracker';
import Link from 'next/link';

export const metadata = {
  title: 'Purchase Successful - Fabrk',
  description: 'Thank you for purchasing Fabrk!',
};

export default function PurchaseSuccessPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      {/* Track purchase conversion in GA4 */}
      <Suspense fallback={null}>
        <PurchaseTracker value={149} itemName="Fabrk Boilerplate" />
      </Suspense>
      <div className="w-full max-w-2xl">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-success/10 rounded-none p-6">
            <CheckCircle className="text-success h-16 w-16" />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-semibold">Welcome to Fabrk! 🎉</h1>
          <p className="text-muted-foreground text-xl">
            Your purchase was successful. Check your email for download instructions.
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-card border-border mb-8 rounded-none border p-8">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">What's Next?</h2>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="bg-primary/10 rounded-none p-4">
                  <Mail className="text-primary h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-1 font-semibold">1. Check Your Email</h3>
                <p className="text-muted-foreground text-sm">
                  We've sent you a confirmation email with download links and instructions. Check
                  your spam folder if you don't see it within 5 minutes.
                </p>
              </div>
            </div>

            {/* Download */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="bg-primary/10 rounded-none p-4">
                  <Download className="text-primary h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-1 font-semibold">2. Download Fabrk</h3>
                <p className="text-muted-foreground text-sm">
                  Use the download link in your email to get the complete Fabrk boilerplate (ZIP
                  file). Extract it and follow the setup instructions in the README.
                </p>
              </div>
            </div>

            {/* Setup */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="bg-primary/10 rounded-none p-4">
                  <Github className="text-primary h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-1 font-semibold">3. Start Building</h3>
                <p className="text-muted-foreground text-sm">
                  Run <code className="bg-muted rounded px-2 py-1 text-xs">npm install</code> and{' '}
                  <code className="bg-muted rounded px-2 py-1 text-xs">npm run dev</code> to get
                  started. Full documentation is included in the{' '}
                  <code className="bg-muted rounded px-2 py-1 text-xs">docs/</code> folder.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-muted/50 mb-8 rounded-none p-6">
          <h3 className="mb-2 font-semibold">Need Help?</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Check the comprehensive documentation included in your download, or reach out if you
            have any questions.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="mailto:support@fabrek.dev">Email Support</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/#faq">View FAQ</Link>
            </Button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Button asChild variant="ghost">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
