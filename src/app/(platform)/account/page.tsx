/**
 * ✅ COMPONENT
 * - File Size: ✓ (< 250 lines)
 * - Type Safety: ✓
 * - Alias Imports: ✓
 */

'use client';

import { ApiKeysSection } from '@/components/account/api-keys-section';
import { BillingSection } from '@/components/account/billing-section';
import { ProfileForm } from '@/components/account/profile-form';
import { SecurityForm } from '@/components/account/security-form';
import { SessionsSection } from '@/components/account/sessions-section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { CreditCard, Key, Monitor, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      value: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Manage your personal information',
    },
    {
      value: 'security',
      label: 'Security',
      icon: Shield,
      description: 'Password and two-factor authentication',
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: CreditCard,
      description: 'Subscription and payment methods',
    },
    {
      value: 'api-keys',
      label: 'API Keys',
      icon: Key,
      description: 'Manage your API access',
    },
    {
      value: 'sessions',
      label: 'Sessions',
      icon: Monitor,
      description: 'Active sessions and devices',
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Account Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid h-auto w-full max-w-6xl grid-cols-5 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  'data-[state=active]:bg-background flex flex-col items-center gap-2 px-4 py-4',
                  'hover:bg-primary hover:text-primary-foreground transition-colors'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TabsContent value="profile" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x00"
                  title="PROFILE_INFORMATION"
                  icon={<User className="h-4 w-4" />}
                  meta="Update your personal details and profile picture"
                />
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x01"
                  title="SECURITY_SETTINGS"
                  icon={<Shield className="h-4 w-4" />}
                  meta="Manage your password and security preferences"
                />
                <CardContent>
                  <SecurityForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x02"
                  title="BILLING_AND_SUBSCRIPTION"
                  icon={<CreditCard className="h-4 w-4" />}
                  meta="Manage your subscription plan and payment methods"
                />
                <CardContent>
                  <BillingSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-keys" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x03"
                  title="API_KEYS"
                  icon={<Key className="h-4 w-4" />}
                  meta="Create and manage API keys for programmatic access"
                />
                <CardContent>
                  <ApiKeysSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="mt-0 space-y-4">
              <Card>
                <CardHeader
                  code="0x04"
                  title="ACTIVE_SESSIONS"
                  icon={<Monitor className="h-4 w-4" />}
                  meta="View and manage your active sessions across devices"
                />
                <CardContent>
                  <SessionsSection />
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader code="0xF0" title="QUICK_ACTIONS" />
              <CardContent className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={cn(
                        'flex w-full items-start gap-6 p-6 text-left transition-colors',
                        mode.radius,
                        'hover:bg-primary hover:text-primary-foreground',
                        activeTab === tab.value &&
                          'bg-primary text-primary-foreground'
                      )}
                    >
                      <Icon className="mt-0.5 size-5" />
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{tab.label}</p>
                        <p className="text-muted-foreground text-xs">
                          {tab.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader code="0xF1" title="ACCOUNT_STATUS" />
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Plan</span>
                  <span className="text-sm font-medium">Pro</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Status</span>
                  <span className="text-primary text-sm font-medium">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Member Since
                  </span>
                  <span className="text-sm font-medium">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Storage Used
                  </span>
                  <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader code="0xF2" title="NEED_HELP" />
              <CardContent className="text-muted-foreground space-y-2 text-sm">
                <p>
                  Visit our{' '}
                  <Link href="/docs" className="text-primary hover:underline">
                    documentation
                  </Link>{' '}
                  for detailed guides.
                </p>
                <p>
                  Contact{' '}
                  <a href="/contact" className="text-primary hover:underline">
                    support
                  </a>{' '}
                  for assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
