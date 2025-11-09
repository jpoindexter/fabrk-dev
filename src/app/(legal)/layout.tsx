import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="border-b border-border/60 bg-background px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary">
            ← Back to Fabrk
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border/60 bg-muted px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Fabrk. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="/refund" className="text-sm text-muted-foreground hover:text-primary">
              Refund Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
