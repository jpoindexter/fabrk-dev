/**
 * CMS Layout - Outstatic Dashboard
 * Separate layout required for Outstatic to function properly
 */

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="outstatic">{children}</body>
    </html>
  );
}
