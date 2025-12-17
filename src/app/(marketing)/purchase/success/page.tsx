import { Suspense } from 'react';
import { CheckCircle, Download, Mail, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
          <Card className="w-fit border-success/20 bg-success/5">
            <CardContent className="p-6">
              <CheckCircle className="text-success h-16 w-16" />
            </CardContent>
          </Card>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-semibold uppercase tracking-tight">
            [SUCCESS] WELCOME TO FABRK
          </h1>
          <p className="text-muted-foreground text-base">
            Purchase confirmed. Check your email for download instructions.
          </p>
        </div>

        {/* What's Next */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="uppercase">[NEXT STEPS]</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email */}
            <Card className="bg-card/50">
              <CardContent className="flex gap-4 p-6">
                <div className="shrink-0">
                  <Card className="w-fit border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <Mail className="text-primary h-6 w-6" />
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1">
                  <CardTitle className="mb-2 text-sm uppercase">[1] CHECK YOUR EMAIL</CardTitle>
                  <CardDescription className="text-sm">
                    Confirmation email sent with download links and instructions. Check spam folder
                    if not received within 5 minutes.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>

            {/* Download */}
            <Card className="bg-card/50">
              <CardContent className="flex gap-4 p-6">
                <div className="shrink-0">
                  <Card className="w-fit border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <Download className="text-primary h-6 w-6" />
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1">
                  <CardTitle className="mb-2 text-sm uppercase">[2] DOWNLOAD FABRK</CardTitle>
                  <CardDescription className="text-sm">
                    Use email link to download complete boilerplate (ZIP file). Extract and follow
                    setup instructions in README.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>

            {/* Setup */}
            <Card className="bg-card/50">
              <CardContent className="flex gap-4 p-6">
                <div className="shrink-0">
                  <Card className="w-fit border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <Github className="text-primary h-6 w-6" />
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1">
                  <CardTitle className="mb-2 text-sm uppercase">[3] START BUILDING</CardTitle>
                  <CardDescription className="text-sm">
                    Run <code className="bg-muted rounded-none px-2 py-1 text-xs">npm install</code>{' '}
                    and <code className="bg-muted rounded-none px-2 py-1 text-xs">npm run dev</code>{' '}
                    to start. Documentation in{' '}
                    <code className="bg-muted rounded-none px-2 py-1 text-xs">docs/</code> folder.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Need Help */}
        <Card className="mb-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm uppercase">[NEED HELP?]</CardTitle>
            <CardDescription className="text-sm">
              Check documentation in download or reach out with questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button asChild variant="outline" size="sm" className="uppercase">
                <Link href="mailto:support@fabrek.dev">&gt; EMAIL SUPPORT</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="uppercase">
                <Link href="/#faq">&gt; VIEW FAQ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button asChild variant="ghost" className="uppercase">
            <Link href="/">&gt; BACK TO HOME</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
