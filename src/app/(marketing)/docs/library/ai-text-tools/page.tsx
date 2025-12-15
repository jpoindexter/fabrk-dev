'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { FileText, Languages, Search, Sparkles } from 'lucide-react';

export default function AiTextToolsDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.03]"
      category="AI Tools"
      title="AI Text Tools"
      description="Suite of utilities for text summarization, translation, and sentiment analysis."
      overview="A comprehensive set of text processing tools powered by AI. Quickly integrate features like summarization, language translation, grammar correction, and tone adjustment into your application."
      features={[
        {
          icon: FileText,
          title: 'Summarization',
          description: 'Condense long articles or documents into concise summaries.',
        },
        {
          icon: Languages,
          title: 'Translation',
          description: 'Translate text between dozens of languages instantly.',
        },
        {
          icon: Search,
          title: 'Analysis',
          description: 'Extract keywords, sentiment, and entities from text.',
        },
        {
          icon: Sparkles,
          title: 'Refinement',
          description: 'Rewrite text to change tone (professional, friendly, etc.).',
        },
      ]}
      setup={[]}
      usage={[]}
      configuration={[]}
      previous={{ title: 'AI Forms', href: '/docs/library/ai-forms' }}
      next={{ title: 'AI Image', href: '/docs/library/ai-image' }}
    >
      <DocsSection title="Status">
        <DocsCard title="UNDER CONSTRUCTION">
          <p className="text-sm text-muted-foreground font-mono">
            Documentation for this component is currently being updated.
            <br />
            Please check the library template for implementation details.
          </p>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}