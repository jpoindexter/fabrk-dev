/**
 * Admin Feature Flags Management
 * View and toggle feature flags
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  getAllFlags,
  enableFeature,
  disableFeature,
  setRolloutPercentage,
  type FeatureFlag,
} from "@/lib/feature-flags";

export default function AdminFeatureFlagsPage() {
  const [flags, setFlags] = useState<Record<string, FeatureFlag>>(getAllFlags());

  const handleToggle = (flagKey: string, enabled: boolean) => {
    if (enabled) {
      enableFeature(flagKey);
    } else {
      disableFeature(flagKey);
    }
    setFlags(getAllFlags());
  };

  const handleRolloutChange = (flagKey: string, value: number[]) => {
    setRolloutPercentage(flagKey, value[0]);
    setFlags(getAllFlags());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feature Flags</h1>
        <p className="text-muted-foreground">
          Control feature rollouts and A/B testing
        </p>
      </div>

      <div className="grid gap-4">
        {Object.entries(flags).map(([key, flag]) => (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{flag.key}</CardTitle>
                  {flag.description && (
                    <CardDescription>{flag.description}</CardDescription>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`toggle-${key}`}
                    checked={flag.enabled}
                    onCheckedChange={(checked) => handleToggle(key, checked)}
                  />
                  <Label htmlFor={`toggle-${key}`} className="cursor-pointer">
                    {flag.enabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rollout Percentage */}
                {flag.rolloutPercentage !== undefined && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Rollout Percentage</Label>
                      <Badge variant="outline">{flag.rolloutPercentage}%</Badge>
                    </div>
                    <Slider
                      value={[flag.rolloutPercentage]}
                      onValueChange={(value) => handleRolloutChange(key, value)}
                      max={100}
                      step={5}
                      disabled={!flag.enabled}
                    />
                  </div>
                )}

                {/* Target Users */}
                {flag.targetUsers && flag.targetUsers.length > 0 && (
                  <div>
                    <Label>Target Users</Label>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {flag.targetUsers.map((userId) => (
                        <Badge key={userId} variant="secondary">
                          {userId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Roles */}
                {flag.targetRoles && flag.targetRoles.length > 0 && (
                  <div>
                    <Label>Target Roles</Label>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {flag.targetRoles.map((role) => (
                        <Badge key={role} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Environments */}
                {flag.environments && flag.environments.length > 0 && (
                  <div>
                    <Label>Environments</Label>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {flag.environments.map((env) => (
                        <Badge key={env} variant="outline">
                          {env}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants (A/B Testing) */}
                {flag.variants && Object.keys(flag.variants).length > 0 && (
                  <div>
                    <Label>A/B Testing Variants</Label>
                    <div className="mt-2 space-y-1">
                      {Object.entries(flag.variants).map(([name, value]) => (
                        <div
                          key={name}
                          className="flex items-center justify-between rounded border p-2"
                        >
                          <span className="font-medium">{name}</span>
                          <span className="text-sm text-muted-foreground">
                            {JSON.stringify(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expiration */}
                {flag.expiresAt && (
                  <div>
                    <Label>Expires At</Label>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {new Date(flag.expiresAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
