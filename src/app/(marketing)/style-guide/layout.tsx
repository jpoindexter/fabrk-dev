import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Style Guide | Fabrk',
  description: '100% coverage of the design system - all components, typography, colors, and effects',
  robots: { index: false, follow: false },
};

export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
