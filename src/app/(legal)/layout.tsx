import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-black/10 bg-white px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="text-xl font-bold text-black hover:text-[#007AFF]">
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
      <footer className="border-t border-black/10 bg-[#F7F7F7] px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-[#666666]">
            © 2025 Fabrk. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/terms" className="text-sm text-[#333333] hover:text-[#007AFF]">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-[#333333] hover:text-[#007AFF]">
              Privacy
            </Link>
            <Link href="/refund" className="text-sm text-[#333333] hover:text-[#007AFF]">
              Refund Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
