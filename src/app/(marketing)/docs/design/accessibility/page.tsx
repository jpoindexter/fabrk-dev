import { Metadata } from 'next';
import { DocsCard, DocsSection } from '@/components/docs';
import { DocsNavFooter } from '@/components/docs/blocks/docs-nav-footer';

export const metadata: Metadata = {
  title: 'Accessibility Guide - Fabrk Docs',
  description: 'WCAG 2.2 AA compliance guidelines and accessibility patterns for Fabrk components.',
};

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <div className="space-y-4">
        <div className="border-border bg-muted inline-block border px-4 py-1">
          <span className="text-muted-foreground font-mono text-xs">[A11Y.00] ACCESSIBILITY</span>
        </div>
        <h1 className="font-mono text-3xl font-bold">Accessibility Guide</h1>
        <p className="text-muted-foreground">
          WCAG 2.2 AA compliance guidelines and accessibility patterns for Fabrk components.
        </p>
      </div>

      <DocsSection title="OVERVIEW">
        <DocsCard title="COMPLIANCE TARGET">
          <p className="text-muted-foreground mb-4 text-sm">
            Fabrk targets WCAG 2.2 Level AA compliance. All components are built with accessibility
            as a core requirement, not an afterthought.
          </p>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>• WCAG 2.2 AA compliance target</li>
            <li>• OKLCH color system with built-in contrast</li>
            <li>• Keyboard navigation throughout</li>
            <li>• Screen reader optimized components</li>
            <li>• Reduced motion support</li>
            <li>• Focus visible indicators</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="WCAG 2.2 PRINCIPLES">
        <DocsCard title="PERCEIVABLE">
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>• Text alternatives for non-text content</li>
            <li>• Captions and alternatives for multimedia</li>
            <li>• Content adaptable without losing meaning</li>
            <li>• Distinguishable foreground from background</li>
          </ul>
        </DocsCard>
        <DocsCard title="OPERABLE">
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>• All functionality via keyboard</li>
            <li>• Enough time to read and use content</li>
            <li>• No content that causes seizures</li>
            <li>• Navigable structure and wayfinding</li>
          </ul>
        </DocsCard>
        <DocsCard title="UNDERSTANDABLE">
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>• Readable and predictable text</li>
            <li>• Predictable UI behavior</li>
            <li>• Input assistance for errors</li>
          </ul>
        </DocsCard>
        <DocsCard title="ROBUST">
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>• Compatible with assistive technologies</li>
            <li>• Valid semantic HTML</li>
            <li>• Proper ARIA usage where needed</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="COLOR CONTRAST">
        <DocsCard title="OKLCH CONTRAST SYSTEM">
          <p className="text-muted-foreground mb-4 text-sm">
            Fabrk uses OKLCH color format for perceptually uniform contrast. All theme tokens are
            pre-validated for WCAG 2.2 compliance.
          </p>
          {/* eslint-disable design-system/no-hardcoded-colors -- Documentation example showing OKLCH syntax */}
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* WCAG 2.2 AA Requirements */
Text (normal):     4.5:1 minimum
Text (large):      3:1 minimum
UI Components:     3:1 minimum (borders, icons, controls)
Focus indicators:  3:1 minimum against adjacent colors

/* Example OKLCH token with sufficient contrast */
--foreground: oklch(98% 0.01 145);  /* Light text */
--background: oklch(15% 0.02 145);  /* Dark bg, ~12:1 ratio */`}
          </pre>
          {/* eslint-enable design-system/no-hardcoded-colors */}
        </DocsCard>
        <DocsCard title="TESTING CONTRAST">
          <p className="text-muted-foreground mb-4 text-sm">
            Test your customizations with these tools:
          </p>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              • <span className="text-foreground">OKLCH.com</span> - Convert and check OKLCH values
            </li>
            <li>
              • <span className="text-foreground">WebAIM Contrast Checker</span> - WCAG ratio
              calculator
            </li>
            <li>
              • <span className="text-foreground">axe DevTools</span> - Browser extension for
              automated testing
            </li>
            <li>
              • <span className="text-foreground">WAVE</span> - Web accessibility evaluation tool
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="KEYBOARD NAVIGATION">
        <DocsCard title="FOCUS MANAGEMENT">
          <p className="text-muted-foreground mb-4 text-sm">
            All Fabrk components support full keyboard navigation. Focus rings are always visible
            for keyboard users.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* Focus ring styles (applied globally) */
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Never hide focus for keyboard users */
.focus-visible:focus-visible {
  outline: 2px solid var(--ring);
}`}
          </pre>
        </DocsCard>
        <DocsCard title="COMMON PATTERNS">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold">[TAB] Navigation</p>
              <p className="text-muted-foreground mt-1">
                Move focus between interactive elements. Tab order follows DOM order.
              </p>
            </div>
            <div>
              <p className="font-semibold">[ARROW] Keys</p>
              <p className="text-muted-foreground mt-1">
                Navigate within components (tabs, menus, radio groups, sliders).
              </p>
            </div>
            <div>
              <p className="font-semibold">[ENTER/SPACE]</p>
              <p className="text-muted-foreground mt-1">
                Activate buttons, links, and toggles. Space scrolls when not on interactive element.
              </p>
            </div>
            <div>
              <p className="font-semibold">[ESCAPE]</p>
              <p className="text-muted-foreground mt-1">
                Close dialogs, sheets, popovers, and dropdown menus.
              </p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="SCREEN READERS">
        <DocsCard title="ARIA BEST PRACTICES">
          <p className="text-muted-foreground mb-4 text-sm">
            Fabrk components use semantic HTML first, ARIA attributes only when necessary.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* Icon-only button - REQUIRES aria-label */
<Button aria-label="Close dialog" size="icon">
  <X className="h-4 w-4" />
</Button>

/* Decorative icons - hide from screen readers */
<Icon aria-hidden="true" />

/* Live regions for dynamic updates */
<div role="status" aria-live="polite">
  {statusMessage}
</div>

/* Dialog with proper labeling */
<Dialog>
  <DialogContent aria-labelledby="dialog-title" aria-describedby="dialog-desc">
    <DialogTitle id="dialog-title">Confirm Action</DialogTitle>
    <DialogDescription id="dialog-desc">Are you sure?</DialogDescription>
  </DialogContent>
</Dialog>`}
          </pre>
        </DocsCard>
        <DocsCard title="COMPONENT ROLES">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground">Button</span>
              <span className="text-muted-foreground">role=&quot;button&quot;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Dialog</span>
              <span className="text-muted-foreground">role=&quot;dialog&quot;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Alert</span>
              <span className="text-muted-foreground">role=&quot;alert&quot;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Tabs</span>
              <span className="text-muted-foreground">
                role=&quot;tablist&quot;, role=&quot;tab&quot;, role=&quot;tabpanel&quot;
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Menu</span>
              <span className="text-muted-foreground">
                role=&quot;menu&quot;, role=&quot;menuitem&quot;
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Switch</span>
              <span className="text-muted-foreground">role=&quot;switch&quot;</span>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="MOTION & ANIMATION">
        <DocsCard title="REDUCED MOTION">
          <p className="text-muted-foreground mb-4 text-sm">
            Fabrk respects the prefers-reduced-motion media query. Users who prefer reduced motion
            see minimal or no animations.
          </p>
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* CSS approach */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Framer Motion approach (built-in) */
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  /* Framer Motion automatically respects reduced motion */
/>`}
          </pre>
        </DocsCard>
        <DocsCard title="ANIMATION GUIDELINES">
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>• Keep animations under 400ms for optimal perception</li>
            <li>• Avoid flashing content (no more than 3 flashes per second)</li>
            <li>• Use subtle movements (8-16px translation max)</li>
            <li>• Provide pause/stop controls for auto-playing content</li>
            <li>• Never use animation to convey critical information alone</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="FORMS & INPUTS">
        <DocsCard title="FORM ACCESSIBILITY">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* Every input needs an associated label */
<div className="space-y-2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" aria-describedby="email-error" />
  {error && (
    <p id="email-error" role="alert" className="text-destructive text-xs">
      [ERROR]: {error}
    </p>
  )}
</div>

/* Required fields */
<Label htmlFor="name">
  Name <span aria-hidden="true">*</span>
  <span className="sr-only">(required)</span>
</Label>
<Input id="name" required aria-required="true" />

/* Group related inputs */
<fieldset>
  <legend className="text-sm font-medium">Notification Preferences</legend>
  <RadioGroup name="notifications" aria-label="Notification preferences">
    <RadioGroupItem value="email" id="notify-email" />
    <Label htmlFor="notify-email">Email</Label>
    ...
  </RadioGroup>
</fieldset>`}
          </pre>
        </DocsCard>
        <DocsCard title="ERROR HANDLING">
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>• Use role=&quot;alert&quot; for error messages to announce immediately</li>
            <li>• Associate errors with inputs via aria-describedby</li>
            <li>• Don&apos;t rely on color alone to indicate errors</li>
            <li>• Provide clear, actionable error messages</li>
            <li>• Focus first invalid field on form submission</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="TESTING CHECKLIST">
        <DocsCard title="MANUAL TESTS">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>Navigate entire page with Tab key only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>Activate all buttons/links with Enter and Space</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>Navigate menus and tabs with Arrow keys</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>Close dialogs with Escape key</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>Test with screen reader (VoiceOver, NVDA, or JAWS)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>View page at 200% zoom without horizontal scroll</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>Verify focus rings visible on all interactive elements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">□</span>
              <span>Check form error messages are announced</span>
            </li>
          </ul>
        </DocsCard>
        <DocsCard title="AUTOMATED TESTS">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`# Run accessibility audit with axe-core
npx playwright test --project=a11y

# Or use Lighthouse in Chrome DevTools
# Run accessibility audit category

# ESLint jsx-a11y rules (built into Fabrk)
npm run lint

# axe-core programmatic testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('page has no accessibility violations', async () => {
  const { container } = render(<Page />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="COMPONENT PATTERNS">
        <DocsCard title="ICON BUTTONS">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* ALWAYS add aria-label to icon-only buttons */

// ✓ CORRECT
<Button aria-label="Delete item" variant="ghost" size="icon">
  <Trash className="h-4 w-4" />
</Button>

// ✗ WRONG - screen reader announces nothing useful
<Button variant="ghost" size="icon">
  <Trash className="h-4 w-4" />
</Button>`}
          </pre>
        </DocsCard>
        <DocsCard title="LOADING STATES">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* Announce loading state to screen readers */

<Button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? (
    <>
      <TerminalSpinner size="sm" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </>
  ) : (
    '> SUBMIT'
  )}
</Button>

/* For page-level loading */
<div role="status" aria-live="polite" aria-busy={isLoading}>
  {isLoading ? 'Loading content...' : children}
</div>`}
          </pre>
        </DocsCard>
        <DocsCard title="SKIP LINKS">
          <pre className="bg-muted overflow-x-auto p-4 font-mono text-xs">
            {`/* Provide skip link for keyboard users */

<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:z-50
             focus:bg-background focus:p-4 focus:text-foreground"
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Page content */}
</main>`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsNavFooter
        previous={{ title: 'Component Authoring', href: '/docs/design/component-authoring' }}
        next={{ title: 'Theme Gallery', href: '/docs/extras/theme-gallery' }}
      />
    </div>
  );
}
