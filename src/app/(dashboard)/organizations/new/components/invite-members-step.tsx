/**
 * Invite Members Step
 * Step 2: Send email invitations to team members
 */

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { Mail, ChevronLeft, Check, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteFormData {
  emails: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "GUEST";
}

interface InviteMembersStepProps {
  form: UseFormReturn<InviteFormData>;
  onSubmit: (data: InviteFormData) => Promise<void>;
  loading: boolean;
  onBack: () => void;
  onSkip: () => void;
}

export function InviteMembersStep({
  form,
  onSubmit,
  loading,
  onBack,
  onSkip,
}: InviteMembersStepProps) {
  return (
    <Card className="rounded-none border border-border shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="rounded-none border border-border bg-primary p-2">
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Addresses</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="john@example.com&#10;jane@example.com&#10;alex@example.com"
                      className="rounded-none border border-border font-mono text-sm"
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
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-none border border-border">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none border border-border">
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

            <div className="rounded-none border border-border bg-muted p-4">
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
                onClick={onBack}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onSkip}
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
  );
}
