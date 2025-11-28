import { TerminalBackground } from "@/components/landing/terminal-background";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-mono">
      <TerminalBackground />
      {children}
    </div>
  );
}
