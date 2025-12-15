'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Image, Palette, History, Wand2 } from 'lucide-react';

export default function AiImageDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.04]"
      category="AI Tools"
      title="AI Image Generation"
      description="Text-to-image generation interface with style presets."
      overview="Enable users to generate high-quality images from text descriptions. Includes support for style presets (photorealistic, anime, 3d render), aspect ratio selection, and a personal gallery of generated history."
      features={[
        {
          icon: Wand2,
          title: 'Text to Image',
          description: 'Generate images from natural language prompts.',
        },
        {
          icon: Palette,
          title: 'Style Presets',
          description: 'One-click style modifiers for consistent results.',
        },
        {
          icon: Image,
          title: 'Aspect Ratios',
          description: 'Support for square, landscape, and portrait formats.',
        },
        {
          icon: History,
          title: 'History Gallery',
          description: 'Automatically save and browse previously generated images.',
        },
      ]}
      setup={[]}
      usage={[]}
      configuration={[]}
      previous={{ title: 'AI Text Tools', href: '/docs/library/ai-text-tools' }}
      next={{ title: 'AI Voice', href: '/docs/library/ai-voice' }}
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