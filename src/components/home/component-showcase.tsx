"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Lock, CreditCard, Check, Settings, Bell } from "lucide-react"

export function ComponentShowcase() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-6 max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Beautiful components out of the box
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              Every component you need, pre-built and ready to customize
            </p>
          </div>

          {/* Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Auth Form */}
            <Card className="p-6 space-y-4 glass-card">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Sign in to Fabrk</h3>
                <p className="text-sm text-muted-foreground">Enter your credentials</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-demo">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email-demo" placeholder="you@example.com" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-demo">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password-demo" type="password" placeholder="••••••••" className="pl-10" />
                  </div>
                </div>
                <Button className="w-full refined-gradient text-white border-0">Sign In</Button>
              </div>
            </Card>

            {/* Pricing Card */}
            <Card className="p-6 space-y-4 glass-card border-primary">
              <div className="space-y-1">
                <Badge className="refined-gradient text-white border-0">Popular</Badge>
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-sm text-muted-foreground">For growing teams</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <Button className="w-full">Get Started</Button>
              <div className="pt-4 border-t space-y-3">
                {["Unlimited projects", "Priority support", "Advanced analytics"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* User Profile Card */}
            <Card className="p-6 space-y-4 glass-card">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold">Sarah Chen</h3>
                  <p className="text-sm text-muted-foreground">sarah@fabrk.dev</p>
                  <Badge variant="secondary" className="text-xs">
                    Pro Member
                  </Badge>
                </div>
              </div>
              <div className="pt-4 border-t space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </Button>
              </div>
            </Card>

            {/* Payment Method Card */}
            <Card className="p-6 space-y-4 glass-card">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <p className="text-sm text-muted-foreground">Manage your billing</p>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">•••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/24</p>
                </div>
                <Badge>Default</Badge>
              </div>
              <Button variant="outline" className="w-full">
                Update Payment
              </Button>
            </Card>

            {/* Stats Card */}
            <Card className="p-6 space-y-4 glass-card">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-3xl font-bold">$45,231</h3>
                <p className="text-sm text-primary">+20.1% from last month</p>
              </div>
              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly</span>
                  <span className="font-medium">$12,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">One-time</span>
                  <span className="font-medium">$32,997</span>
                </div>
              </div>
            </Card>

            {/* Notification Card */}
            <Card className="p-6 space-y-4 glass-card">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <h3 className="text-lg font-semibold">New Activity</h3>
                </div>
                <p className="text-sm text-muted-foreground">3 unread notifications</p>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Payment received", time: "2 min ago" },
                  { title: "New user signup", time: "1 hour ago" },
                  { title: "Update available", time: "3 hours ago" },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-primary/10">
                    <div>
                      <p className="text-sm font-medium">{notif.title}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
