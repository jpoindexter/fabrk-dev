/**
 * ✅ FABRK COMPONENT
 * Organization Switcher Component
 * Production-ready multi-tenancy switcher for navbar
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Check, ChevronsUpDown, Plus, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  role: string;
}

interface OrgSwitcherProps {
  className?: string;
}

export function OrgSwitcher({ className }: OrgSwitcherProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [currentOrg, setCurrentOrg] = React.useState<Organization | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations");
        if (!response.ok) throw new Error("Failed to fetch organizations");

        const data = await response.json();
        setOrganizations(data.organizations || []);

        // Set current org from session or first org
        const activeOrgId = (session?.user as any)?.activeOrganizationId;
        if (activeOrgId) {
          const active = data.organizations.find((org: Organization) => org.id === activeOrgId);
          setCurrentOrg(active || data.organizations[0] || null);
        } else {
          setCurrentOrg(data.organizations[0] || null);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch organizations:", error);
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchOrganizations();
    }
  }, [session]);

  const handleSwitchOrg = async (orgId: string) => {
    try {
      const response = await fetch("/api/organizations/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId: orgId }),
      });

      if (!response.ok) throw new Error("Failed to switch organization");

      const selected = organizations.find((org) => org.id === orgId);
      setCurrentOrg(selected || null);
      setOpen(false);

      // Refresh the page to update context
      router.refresh();
    } catch (error: unknown) {
      console.error("Failed to switch organization:", error);
    }
  };

  const handleCreateOrg = () => {
    setOpen(false);
    router.push("/organizations/new");
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-brutal border-2 border-brutal bg-card px-3 py-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  // Show personal workspace if no orgs
  if (organizations.length === 0) {
    return (
      <Button
        variant="outline"
        onClick={handleCreateOrg}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Create Organization
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select organization"
          className={cn(
            "w-[200px] justify-between gap-2 rounded-brutal border-2 border-brutal shadow-brutal hover:shadow-brutal-lg transition-all",
            className
          )}
        >
          {currentOrg?.logo ? (
            <img
              src={currentOrg.logo}
              alt={currentOrg.name}
              className="h-5 w-5 rounded"
            />
          ) : (
            <Building2 className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="flex-1 truncate text-left text-sm font-medium">
            {currentOrg?.name || "Select organization"}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[200px] rounded-brutal border-2 border-brutal shadow-brutal-lg"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Your Organizations
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onSelect={() => handleSwitchOrg(org.id)}
            className="cursor-pointer"
          >
            <div className="flex w-full items-center gap-2">
              {org.logo ? (
                <img
                  src={org.logo}
                  alt={org.name}
                  className="h-5 w-5 rounded"
                />
              ) : (
                <Building2 className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="flex-1 truncate text-sm">{org.name}</span>
              {currentOrg?.id === org.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
            {org.role && (
              <span className="ml-auto text-xs text-muted-foreground">
                {org.role}
              </span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleCreateOrg}
          className="cursor-pointer text-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-sm font-medium">Create Organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
