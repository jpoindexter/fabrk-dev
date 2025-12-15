/**
 * Cards Audit - Standalone Page
 * No header, no sidebar, no footer - just cards analysis
 */

'use client';

import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { User, Server, Shield, Check, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CardsAuditPage() {
  return (
    <div className="bg-background min-h-screen px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <Badge code="AUDIT" label="CARDS" meta="247 FILES" />
        <h1 className={cn('mt-8 mb-4 text-xs font-bold', mode.font)}>CARD STANDARDIZATION AUDIT</h1>
        <p className={cn('text-muted-foreground text-xs', mode.font)}>
          247 files • 6 patterns • 120 need updates • Target: 2 patterns
        </p>
      </div>

      {/* Stats */}
      <div className="mb-16 grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader code="0x01" title="TOTAL" />
          <CardContent>
            <div className={cn('text-xs font-bold', mode.font)}>247 files</div>
            <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>Using Card</p>
          </CardContent>
        </Card>
        <Card tone="warning">
          <CardHeader code="0x02" title="NEEDS FIX" />
          <CardContent>
            <div className={cn('text-xs font-bold', mode.font, 'text-warning')}>120 files</div>
            <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>49% non-compliant</p>
          </CardContent>
        </Card>
        <Card tone="success">
          <CardHeader code="0x03" title="COMPLIANT" />
          <CardContent>
            <div className={cn('text-xs font-bold', mode.font, 'text-success')}>127 files</div>
            <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>
              51% follow standards
            </p>
          </CardContent>
        </Card>
        <Card tone="primary">
          <CardHeader code="0x04" title="TARGET" />
          <CardContent>
            <div className={cn('text-xs font-bold', mode.font, mode.color.text.accent)}>
              2 patterns
            </div>
            <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>Animated + Static</p>
          </CardContent>
        </Card>
      </div>

      {/* Pattern 1: GOLD STANDARD */}
      <section className="mb-16">
        <div className="border-success mb-6 flex items-center justify-between border-b pb-2">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-success size-4" />
              <h2 className={cn('text-xs font-bold', mode.font, 'text-success')}>
                [PATTERN 1] GOLD STANDARD - ANIMATED MARKETING
              </h2>
            </div>
            <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>
              89 files (36%) • CardHeader(code+title+icon) • text-xs • mode.font • Framer Motion
            </p>
          </div>
          <Badge code="✓" label="USE THIS" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full">
              <CardHeader
                code="0x11"
                title="SOLO FOUNDERS"
                icon={
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <User className={cn('size-5', mode.color.text.accent)} />
                  </motion.div>
                }
              />
              <CardContent>
                <p className={cn('mb-2 text-xs', mode.font, mode.color.text.muted)}>
                  [PROBLEM]: You waste months building auth
                </p>
                <p className={cn('text-xs font-semibold', mode.font, mode.color.text.primary)}>
                  Ship MVP in days
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="h-full"
          >
            <Card className="h-full">
              <CardHeader
                code="0x12"
                title="INFRASTRUCTURE"
                icon={
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Server className={cn('size-5', mode.color.text.accent)} />
                  </motion.div>
                }
              />
              <CardContent>
                <ul className="space-y-2">
                  <li className={cn('flex gap-2 text-xs', mode.font)}>
                    <Check className="text-success mt-0.5 size-3 shrink-0" />
                    <span>NEXTAUTH V5</span>
                  </li>
                  <li className={cn('flex gap-2 text-xs', mode.font)}>
                    <Check className="text-success mt-0.5 size-3 shrink-0" />
                    <span>STRIPE + POLAR</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-full"
          >
            <Card className="h-full">
              <CardHeader
                code="0x13"
                title="AUTH SYSTEM"
                icon={
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Shield className={cn('size-5', mode.color.text.accent)} />
                  </motion.div>
                }
              />
              <CardContent>
                <p className={cn('mb-2 text-xs font-semibold', mode.font, mode.color.text.primary)}>
                  Auth without headaches
                </p>
                <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                  Stop wasting weeks. NextAuth v5 built-in.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pattern 2: STANDARD */}
      <section className="mb-16">
        <div className="border-primary mb-6 flex items-center justify-between border-b pb-2">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary size-4" />
              <h2 className={cn('text-xs font-bold', mode.font, mode.color.text.accent)}>
                [PATTERN 2] STANDARD - STATIC CONTENT
              </h2>
            </div>
            <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>
              64 files (26%) • CardHeader(code+title) • text-xs • mode.font • No animation
            </p>
          </div>
          <Badge code="✓" label="USE THIS" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader code="0x21" title="DOCS" />
            <CardContent>
              <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                Library templates, docs, static content
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader code="0x22" title="DASHBOARD" />
            <CardContent>
              <div className={cn('text-xs font-bold', mode.font)}>$12,450</div>
              <p className={cn('text-muted-foreground mt-1 text-xs', mode.font)}>
                <span className="text-success">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader code="0x23" title="SETTINGS" />
            <CardContent>
              <ul className={cn('space-y-2 text-xs', mode.font)}>
                <li className="flex justify-between">
                  <span>Two-factor auth</span>
                  <span className="text-success">[ON]</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ISSUES */}
      <section className="mb-16">
        <div className="border-destructive mb-6 border-b pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-destructive size-4" />
            <h2 className={cn('text-xs font-bold', mode.font, 'text-destructive')}>
              [ISSUES] 120 FILES NEED FIXES
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card tone="danger">
            <CardHeader
              code="ERR1"
              title="MISSING MODE.FONT"
              icon={<XCircle className="text-destructive size-5" />}
            />
            <CardContent>
              <div className="mb-4">
                <span className={cn('text-xs font-bold', mode.font, 'text-destructive')}>
                  77 files (32%)
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[PROBLEM]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Platform/security components missing mode.font
                  </p>
                </div>
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[IMPACT]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Breaks terminal aesthetic
                  </p>
                </div>
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[FIX]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Add mode.font to ALL text
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card tone="danger">
            <CardHeader
              code="ERR2"
              title="CUSTOM HEADERS"
              icon={<XCircle className="text-destructive size-5" />}
            />
            <CardContent>
              <div className="mb-4">
                <span className={cn('text-xs font-bold', mode.font, 'text-destructive')}>
                  18 files (7%)
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[PROBLEM]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Using custom div instead of CardHeader
                  </p>
                </div>
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[FIX]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Migrate to CardHeader component
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card tone="danger">
            <CardHeader
              code="ERR3"
              title="MIXED TYPOGRAPHY"
              icon={<AlertTriangle className="text-warning size-5" />}
            />
            <CardContent>
              <div className="mb-4">
                <span className={cn('text-xs font-bold', mode.font, 'text-warning')}>
                  25 files (10%)
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[PROBLEM]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Mixing text-xs, text-sm, text-base
                  </p>
                </div>
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[STANDARD]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    text-xs for ALL content. Use font-weight for hierarchy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card tone="danger">
            <CardHeader
              code="ERR4"
              title="NO HEADERS"
              icon={<AlertTriangle className="text-warning size-5" />}
            />
            <CardContent>
              <div className="mb-4">
                <span className={cn('text-xs font-bold', mode.font, 'text-warning')}>
                  17 files (7%)
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[PROBLEM]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Card with CardContent only, no header
                  </p>
                </div>
                <div>
                  <p className={cn('mb-1 text-xs font-semibold', mode.font)}>[DECISION]:</p>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    OK for minimal cards. Add header if context needed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ACTION PLAN */}
      <section>
        <Card tone="primary">
          <CardHeader code="PLAN" title="ACTION PLAN" />
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className={cn('mb-3 text-xs font-bold', mode.font)}>
                  [PHASE 1]: CRITICAL (77 files)
                </h3>
                <ul className={cn('space-y-2 text-xs', mode.font, mode.color.text.muted)}>
                  <li>• Add mode.font to all text in platform components</li>
                  <li>
                    • Files: /components/dashboard/*, /components/security/*, /app/(platform)/*
                  </li>
                  <li>
                    • Find/replace: className="text-xs" → {`className={cn('text-xs', mode.font)}`}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-3 text-xs font-bold', mode.font)}>
                  [PHASE 2]: STRUCTURAL (18 files)
                </h3>
                <ul className={cn('space-y-2 text-xs', mode.font, mode.color.text.muted)}>
                  <li>• Migrate custom header divs to CardHeader</li>
                  <li>
                    • Replace {`<div className="border-b">`} with {`<CardHeader />`}
                  </li>
                  <li>• Manual review required</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-3 text-xs font-bold', mode.font)}>
                  [PHASE 3]: TYPOGRAPHY (25 files)
                </h3>
                <ul className={cn('space-y-2 text-xs', mode.font, mode.color.text.muted)}>
                  <li>• Standardize all content to text-xs</li>
                  <li>• Use font-weight for hierarchy, not font-size</li>
                  <li>• Review library and dashboard pages</li>
                </ul>
              </div>

              <div>
                <h3 className={cn('mb-3 text-xs font-bold', mode.font)}>[RESULT]: 2 PATTERNS</h3>
                <ul className={cn('space-y-2 text-xs', mode.font, mode.color.text.muted)}>
                  <li className="flex gap-2">
                    <Check className="text-success mt-0.5 size-3 shrink-0" />
                    Pattern 1: Animated marketing (landing, features, benefits)
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-success mt-0.5 size-3 shrink-0" />
                    Pattern 2: Static content (docs, dashboard, settings)
                  </li>
                  <li className="flex gap-2">
                    <Check className="text-success mt-0.5 size-3 shrink-0" />
                    Both: CardHeader + text-xs + mode.font + consistent structure
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
