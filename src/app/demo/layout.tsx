export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-mono">
      {children}
    </div>
  );
}
