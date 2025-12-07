import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/marketing/footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <SiteNavigation />
      {children}
      <Footer />
    </div>
  );
}
