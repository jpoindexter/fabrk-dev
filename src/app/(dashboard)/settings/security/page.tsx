import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SecuritySettings } from "@/components/security/security-settings";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Security Settings | Fabrk",
  description: "Manage your account security, two-factor authentication, and active sessions",
};

export default async function SecurityPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user security data
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      emailVerified: true,
      sessionVersion: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Fetch OAuth accounts (connected providers)
  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: {
      provider: true,
      providerAccountId: true,
    },
  });

  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/settings">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Settings
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Security Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account security and authentication methods
        </p>
      </div>

      <SecuritySettings
        user={{
          email: user.email || "",
          emailVerified: !!user.emailVerified,
          sessionVersion: user.sessionVersion || 1,
          twoFactorEnabled: false,
        }}
        connectedAccounts={accounts.map((acc) => ({
          provider: acc.provider,
          accountId: acc.providerAccountId,
        }))}
      />
    </div>
  );
}
