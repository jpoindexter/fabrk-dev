import { Suspense } from 'react'
import { CheckCircle, Download, Mail, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PurchaseTracker } from '@/components/analytics/purchase-tracker'
import Link from 'next/link'

export const metadata = {
  title: 'Purchase Successful - Fabrk',
  description: 'Thank you for purchasing Fabrk!',
}

export default function PurchaseSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Track purchase conversion in GA4 */}
      <Suspense fallback={null}>
        <PurchaseTracker value={149} itemName="Fabrk Boilerplate" />
      </Suspense>
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="rounded-none bg-success/10 p-6">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to Fabrk! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Your purchase was successful. Check your email for download instructions.
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-card border border-border rounded-none p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">What's Next?</h2>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="rounded-none bg-primary/10 p-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  1. Check Your Email
                </h3>
                <p className="text-sm text-muted-foreground">
                  We've sent you a confirmation email with download links and instructions.
                  Check your spam folder if you don't see it within 5 minutes.
                </p>
              </div>
            </div>

            {/* Download */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="rounded-none bg-primary/10 p-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  2. Download Fabrk
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use the download link in your email to get the complete Fabrk boilerplate
                  (ZIP file). Extract it and follow the setup instructions in the README.
                </p>
              </div>
            </div>

            {/* Setup */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="rounded-none bg-primary/10 p-4">
                  <Github className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  3. Start Building
                </h3>
                <p className="text-sm text-muted-foreground">
                  Run <code className="bg-muted px-2 py-1 rounded text-xs">npm install</code> and{' '}
                  <code className="bg-muted px-2 py-1 rounded text-xs">npm run dev</code> to get started.
                  Full documentation is included in the <code className="bg-muted px-2 py-1 rounded text-xs">docs/</code> folder.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-muted/50 rounded-none p-6 mb-8">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check the comprehensive documentation included in your download, or reach out
            if you have any questions.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="mailto:support@fabrk.dev">
                Email Support
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/#faq">
                View FAQ
              </Link>
            </Button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Button asChild variant="ghost">
            <Link href="/">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
