/**
 * Accept Organization Invite Page
 * Allows invited users to accept invitations and join organizations
 */

"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import {
  Mail,
  Building2,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface InviteDetails {
  id: string;
  email: string;
  role: string;
  expiresAt: string;
  organization: {
    id: string;
    name: string;
    description: string | null;
    logo: string | null;
  };
  inviter: {
    name: string | null;
    email: string;
  };
}

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [accepting, setAccepting] = React.useState(false);
  const [invite, setInvite] = React.useState<InviteDetails | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const token = searchParams.get("token");

  React.useEffect(() => {
    const fetchInvite = async () => {
      if (!token) {
        setError("Invalid invitation link");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/organizations/invites/${token}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch invitation");
        }

        const data = await response.json();
        setInvite(data.invite);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [token]);

  const handleAccept = async () => {
    if (!token) return;

    setAccepting(true);
    try {
      const response = await fetch("/api/organizations/invites/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to accept invitation");
      }

      const result = await response.json();
      toast.success(`Successfully joined ${result.organization.name}!`);
      router.push(`/organizations/${result.organization.slug}/members`);
    } catch (error: any) {
      toast.error(error.message);
      setAccepting(false);
    }
  };

  const handleDecline = () => {
    toast.info("Invitation declined");
    router.push("/dashboard");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md rounded-brutal border-2 border-brutal shadow-brutal-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Loading invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !invite) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-brutal border-2 border-brutal border-destructive shadow-brutal-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full border-2 border-brutal border-destructive bg-destructive/10 p-3">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Invalid Invitation</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {error || "This invitation link is invalid or has expired."}
            </p>
            <Button onClick={() => router.push("/dashboard")} className="mt-6">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if expired
  const isExpired = new Date(invite.expiresAt) < new Date();
  if (isExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-brutal border-2 border-brutal border-destructive shadow-brutal-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full border-2 border-brutal border-destructive bg-destructive/10 p-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Invitation Expired</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              This invitation expired on {new Date(invite.expiresAt).toLocaleDateString()}.
              Please contact the organization owner for a new invitation.
            </p>
            <Button onClick={() => router.push("/dashboard")} className="mt-6">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is logged in
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-brutal border-2 border-brutal shadow-brutal-lg">
          <CardHeader className="text-center">
            <div className="mx-auto rounded-full border-2 border-brutal bg-primary p-3">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="mt-4 text-2xl">You're Invited!</CardTitle>
            <CardDescription>
              Sign in to accept your invitation to join <strong>{invite.organization.name}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-brutal border-2 border-brutal bg-muted p-4">
                <p className="text-sm">
                  <strong>{invite.inviter.name || invite.inviter.email}</strong> invited you to
                  join as a <Badge variant="secondary">{invite.role}</Badge>
                </p>
              </div>
              <Button onClick={() => signIn()} className="w-full" size="lg">
                Sign In to Accept
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if email matches
  const emailMatches = session?.user?.email === invite.email;
  if (!emailMatches) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-brutal border-2 border-brutal border-destructive shadow-brutal-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full border-2 border-brutal border-destructive bg-destructive/10 p-3">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Email Mismatch</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              This invitation was sent to <strong>{invite.email}</strong>, but you're logged in
              as <strong>{session?.user?.email}</strong>.
            </p>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" onClick={() => signIn()}>
                Switch Account
              </Button>
              <Button onClick={() => router.push("/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main invitation card
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl rounded-brutal border-2 border-brutal shadow-brutal-xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center gap-4">
            {invite.organization.logo ? (
              <img
                src={invite.organization.logo}
                alt={invite.organization.name}
                className="h-16 w-16 rounded-brutal border-2 border-brutal object-cover"
              />
            ) : (
              <div className="rounded-brutal border-2 border-brutal bg-primary p-4">
                <Building2 className="h-8 w-8 text-primary-foreground" />
              </div>
            )}
          </div>
          <CardTitle className="mt-4 text-3xl">You're Invited!</CardTitle>
          <CardDescription className="text-base">
            <strong>{invite.inviter.name || invite.inviter.email}</strong> invited you to join{" "}
            <strong>{invite.organization.name}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Organization Info */}
          <div className="rounded-brutal border-2 border-brutal bg-card p-6">
            <h4 className="mb-3 font-medium">Organization Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{invite.organization.name}</p>
                  {invite.organization.description && (
                    <p className="text-muted-foreground">{invite.organization.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Role & Permissions */}
          <div className="rounded-brutal border-2 border-brutal bg-card p-6">
            <h4 className="mb-3 font-medium">Your Role & Permissions</h4>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-base">
                {invite.role}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {invite.role === "OWNER" && "Full control over the organization"}
                {invite.role === "ADMIN" && "Manage members, settings, and billing"}
                {invite.role === "MEMBER" && "Standard access to resources"}
                {invite.role === "GUEST" && "Limited read-only access"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleAccept}
              disabled={accepting}
              className="flex-1"
              size="lg"
            >
              {accepting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Accept Invitation
            </Button>
            <Button
              variant="outline"
              onClick={handleDecline}
              disabled={accepting}
              className="flex-1"
              size="lg"
            >
              <XCircle className="mr-2 h-5 w-5" />
              Decline
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            This invitation expires on {new Date(invite.expiresAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
