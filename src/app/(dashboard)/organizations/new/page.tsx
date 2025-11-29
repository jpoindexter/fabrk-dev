/**
 * Create Organization Page
 * 3-step wizard for creating a new organization
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Check,
  Mail,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const organizationSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  description: z.string().optional(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
});

const inviteSchema = z.object({
  emails: z.string(),
  role: z.enum(["OWNER", "ADMIN", "MEMBER", "GUEST"]),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;
type InviteFormData = z.infer<typeof inviteSchema>;

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [createdOrgId, setCreatedOrgId] = React.useState<string | null>(null);

  const orgForm = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
  });

  const inviteForm = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      emails: "",
      role: "MEMBER",
    },
  });

  // Auto-generate slug from name
  React.useEffect(() => {
    const subscription = orgForm.watch((value, { name }) => {
      if (name === "name" && value.name) {
        const slug = value.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        orgForm.setValue("slug", slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [orgForm]);

  const onCreateOrganization = async (data: OrganizationFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/organizations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ownerId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create organization");
      }

      const result = await response.json();
      setCreatedOrgId(result.organization.id);
      toast.success("Organization created successfully!");
      setStep(2);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create organization";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSendInvites = async (data: InviteFormData) => {
    if (!data.emails || !createdOrgId) {
      // Skip invites
      router.push("/dashboard");
      return;
    }

    setLoading(true);
    try {
      const emailList = data.emails
        .split(/[\n,;]+/)
        .map((e) => e.trim())
        .filter((e) => e);

      const promises = emailList.map((email) =>
        fetch("/api/organizations/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            organizationId: createdOrgId,
            email,
            role: data.role,
            invitedBy: session?.user?.id,
          }),
        })
      );

      await Promise.all(promises);
      toast.success(`Sent ${emailList.length} invitation(s)!`);
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error("Failed to send some invitations");
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 2;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-border font-bold transition-all ${
                step >= s
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {step > s ? <Check className="h-5 w-5" /> : s}
            </div>
            {s < totalSteps && (
              <div
                className={`h-0.5 w-12 transition-all ${
                  step > s ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Organization Details */}
      {step === 1 && (
        <Card className="rounded-md border border-border shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-md border border-border bg-primary p-2">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Create Organization</CardTitle>
                <CardDescription>
                  Set up your organization's basic information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...orgForm}>
              <form
                onSubmit={orgForm.handleSubmit(onCreateOrganization)}
                className="space-y-4"
              >
                <FormField
                  control={orgForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Acme Inc."
                          className="rounded-md border border-border"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The public name of your organization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={orgForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="acme-inc"
                          className="rounded-md border border-border"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Used in your organization's URL: /org/{field.value || "your-slug"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={orgForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What does your organization do?"
                          className="rounded-md border border-border"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Invite Members */}
      {step === 2 && (
        <Card className="rounded-md border border-border shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-md border border-border bg-primary p-2">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Invite Team Members</CardTitle>
                <CardDescription>
                  Send invitations to your team (optional)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...inviteForm}>
              <form
                onSubmit={inviteForm.handleSubmit(onSendInvites)}
                className="space-y-4"
              >
                <FormField
                  control={inviteForm.control}
                  name="emails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Addresses</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="john@example.com&#10;jane@example.com&#10;alex@example.com"
                          className="rounded-md border border-border font-mono text-sm"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter email addresses separated by commas or new lines
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={inviteForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-md border border-border">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-md border border-border">
                          <SelectItem value="MEMBER">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">MEMBER</Badge>
                              <span className="text-xs text-muted-foreground">
                                Standard access
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="ADMIN">
                            <div className="flex items-center gap-2">
                              <Badge variant="default">ADMIN</Badge>
                              <span className="text-xs text-muted-foreground">
                                Can manage members
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="GUEST">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">GUEST</Badge>
                              <span className="text-xs text-muted-foreground">
                                Limited access
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The role assigned to all invited members
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-md border border-border bg-muted p-4">
                  <h4 className="mb-2 font-medium">Role Permissions:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• <strong>OWNER</strong>: Full control (assigned to creator)</li>
                    <li>• <strong>ADMIN</strong>: Manage members, settings, billing</li>
                    <li>• <strong>MEMBER</strong>: Standard access to resources</li>
                    <li>• <strong>GUEST</strong>: Read-only access</li>
                  </ul>
                </div>

                <div className="flex justify-between gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => router.push("/dashboard")}
                    >
                      Skip for now
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send Invitations
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Success State */}
      {step === 3 && (
        <Card className="rounded-md border border-border shadow">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full border border-border bg-success p-4 shadow">
              <Check className="h-8 w-8 text-success-foreground" />
            </div>
            <h3 className="mt-4 text-2xl font-bold">All Set!</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Your organization has been created and invitations sent.
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="mt-6"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
