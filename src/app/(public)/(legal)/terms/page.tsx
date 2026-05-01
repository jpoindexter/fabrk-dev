'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import { FileText, Shield, AlertTriangle, Globe, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className={cn('container mx-auto max-w-4xl px-6 py-16', mode.font)}>
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge code="0x00" label="LEGAL" meta="TERMS OF SERVICE" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>FABRK LEGAL:</h1>
          <h2 className={cn('mb-4 text-xs font-bold tracking-tight', mode.font)}>
            TERMS OF SERVICE
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={cn('text-muted-foreground text-xs', mode.font)}>
            [LAST UPDATED]: May 1, 2026
          </span>
        </motion.div>
      </div>

      <div className="space-y-8">
        <Card size="auto">
          <CardHeader code="0x10" title="OVERVIEW" icon={<FileText className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs leading-relaxed', mode.font)}>
              Fabrk is an open-source Next.js boilerplate distributed under the MIT License. These
              Terms govern your use of the fabrk.dev website and any community resources we host.
              The source code itself is governed by its{' '}
              <Link
                href="https://github.com/THEFT-DEV/fabrk/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                MIT LICENSE
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card size="auto">
          <CardHeader code="0x20" title="MIT LICENSE" icon={<Shield className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-2 text-xs leading-relaxed', mode.font)}>
              You are granted a perpetual, worldwide, royalty-free license to use, copy, modify,
              merge, publish, distribute, sublicense, and sell the Fabrk source code, subject to the
              MIT License notice being preserved.
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>├─ Unlimited personal and commercial use</li>
              <li>├─ No royalties, fees, or attribution required beyond the LICENSE file</li>
              <li>├─ Modify and redistribute as you see fit</li>
              <li>└─ The software is provided AS IS, without warranty of any kind</li>
            </ul>
          </CardContent>
        </Card>

        <Card size="auto">
          <CardHeader code="0x30" title="NO WARRANTY" icon={<AlertTriangle className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs leading-relaxed', mode.font)}>
              The Software is provided &quot;AS IS&quot;, without warranty of any kind, express or
              implied, including but not limited to the warranties of merchantability, fitness for a
              particular purpose and noninfringement. The authors and copyright holders shall not be
              liable for any claim, damages, or other liability arising from use of the Software.
            </p>
          </CardContent>
        </Card>

        <Card size="auto">
          <CardHeader code="0x40" title="WEBSITE USE" icon={<Globe className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-2 text-xs leading-relaxed', mode.font)}>
              When using fabrk.dev you agree not to:
            </p>
            <ul className={cn('text-muted-foreground space-y-1 pl-4 text-xs', mode.font)}>
              <li>├─ Attempt to disrupt, attack, or probe site infrastructure</li>
              <li>├─ Scrape content in violation of the robots policy or rate limits</li>
              <li>└─ Submit unlawful or harmful content via contact forms</li>
            </ul>
          </CardContent>
        </Card>

        <Card size="auto">
          <CardHeader code="0x50" title="GOVERNING LAW" icon={<Globe className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground text-xs leading-relaxed', mode.font)}>
              These Terms are governed by the laws of the Netherlands. The MIT License governs the
              source code itself worldwide.
            </p>
          </CardContent>
        </Card>

        <Card size="auto">
          <CardHeader code="0x60" title="CONTACT" icon={<Mail className="size-4" />} />
          <CardContent padding="md">
            <p className={cn('text-muted-foreground mb-2 text-xs leading-relaxed', mode.font)}>
              Bugs and questions: open an issue on GitHub. General contact:{' '}
              <Link href="/contact" className="text-primary hover:underline">
                /contact
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Card size="auto">
          <CardHeader
            code="0xD0"
            title="RELATED DOCUMENTS"
            icon={<FileText className="size-4" />}
          />
          <CardContent padding="md">
            <div className={cn('flex flex-wrap gap-4 text-xs', mode.font)}>
              <Link href="/privacy" className="text-primary hover:underline">
                &gt; PRIVACY POLICY
              </Link>
              <Link href="/cookies" className="text-primary hover:underline">
                &gt; COOKIE POLICY
              </Link>
              <Link
                href="https://github.com/THEFT-DEV/fabrk/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                &gt; MIT LICENSE
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
