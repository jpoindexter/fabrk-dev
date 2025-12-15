'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Mic, Volume2, Radio, Languages } from 'lucide-react';

export default function AiVoiceDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.05]"
      category="AI Tools"
      title="AI Voice"
      description="Speech-to-Text (STT) and Text-to-Speech (TTS) interfaces."
      overview="A dual-purpose voice interface for transcribing audio and generating speech. Features a real-time audio visualizer, multiple voice selections, and support for audio file uploads."
      features={[
        {
          icon: Mic,
          title: 'Speech to Text',
          description: 'High-accuracy transcription for microphone input or file uploads.',
        },
        {
          icon: Volume2,
          title: 'Text to Speech',
          description: 'Natural sounding voice generation with multiple accents.',
        },
        {
          icon: Radio,
          title: 'Visualizer',
          description: 'Real-time audio waveform visualization.',
        },
        {
          icon: Languages,
          title: 'Multi-language',
          description: 'Support for transcription and synthesis in multiple languages.',
        },
      ]}
      setup={[]}
      usage={[]}
      configuration={[]}
      previous={{ title: 'AI Image', href: '/docs/library/ai-image' }}
      next={{ title: 'AI Integration', href: '/docs/features/ai-integration' }}
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