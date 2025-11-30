import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard, DocsLinkCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Sun, Moon, Sparkles } from "lucide-react";

export const metadata = {
  title: "Theming & Colors - Fabrk Docs",
  description: "Customize your Fabrk app with 20 built-in color themes. Switch themes instantly or create your own brand colors.",
};

export default function ThemingPage() {
  return (
    <FeatureGuideTemplate
      code="[0xB0]"
      category="Extras"
      title="Theming_And_Customization"
      description="Choose from 20 professionally-designed color themes or create your own."
      overview="20 color themes inspired by DaisyUI. Light/dark mode with next-themes, persistent localStorage, no theme flash, and Tailwind v4 native."
      features={[
        { icon: Palette, title: "20 Themes", description: "DaisyUI-inspired palettes." },
        { icon: Sun, title: "Light/Dark", description: "Automatic mode switching." },
        { icon: Moon, title: "Persistent", description: "Saved to localStorage." },
        { icon: Sparkles, title: "No Flash", description: "Pre-hydration loading." },
      ]}
      usage={[
        {
          title: "Theme Switcher Component",
          description: "Compact dropdown for navbar",
          code: `import { ThemeDropdown } from "@/components/theme/theme-dropdown";

export function MyNavbar() {
  return (
    <nav>
      <ThemeDropdown /> {/* Dropdown with all 20 DaisyUI themes */}
    </nav>
  );
}`,
          language: "tsx",
        },
        {
          title: "How It Works",
          description: "Themes applied via data-theme attribute",
          code: `<!-- Themes work via data-theme attribute (DaisyUI pattern) -->
<html data-theme="light">
  <!-- data-theme="light" sets the color palette -->
  <!-- Options: light, dark, cupcake, synthwave, dracula, etc. -->
</html>

<!-- Theme is auto-loaded before React hydration (no flash) -->
<script>
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
</script>`,
          language: "html",
        },
        {
          title: "CSS Implementation",
          description: "Each theme defines CSS variables in globals.css",
          code: `/* Light (default) */
[data-theme="light"] {
  --primary: 259 94% 51%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 5% 96%;
  /* ...more variables */
}

/* Synthwave (dark neon theme) */
[data-theme="synthwave"] {
  --primary: 321 70% 69%;
  --primary-foreground: 0 0% 100%;
  --background: 259 20% 15%;
  /* ...more variables */
}

/* Dracula (dark purple theme) */
[data-theme="dracula"] {
  --primary: 326 100% 74%;
  --background: 231 15% 18%;
  /* ...more variables */
}`,
          language: "css",
        },
        {
          title: "Using Theme Colors",
          description: "Always use semantic color classes",
          code: `// ✅ GOOD - Theme-aware colors
<button className="bg-primary text-primary-foreground">
  Matches active theme (light, synthwave, dracula, etc.)
</button>

<div className="border-primary ring-primary">
  Adapts automatically when user switches themes
</div>

// ❌ BAD - Hardcoded colors
<button className="bg-blue-500 text-white">
  Always blue, ignores theme selection
</button>`,
          language: "tsx",
        },
        {
          title: "Adding Custom Themes",
          description: "Add your own DaisyUI-style themes",
          code: `/* Step 1: Add CSS in globals.css */
[data-theme="ocean"] {
  --primary: 199 89% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 199 19% 90%;
  --background: 0 0% 100%;
  --foreground: 199 10% 10%;
  /* Add all required CSS variables */
}

/* Step 2: Add to theme dropdown */
const themes = [
  { id: "light", name: "Light", preview: "#ffffff" },
  { id: "dark", name: "Dark", preview: "#1d232a" },
  // ...existing DaisyUI themes...
  { id: "ocean", name: "Ocean", preview: "#0ea5e9" }, // Your custom theme
];`,
          language: "css",
        },
      ]}
      previous={{ title: "Testing", href: "/docs/extras/testing" }}
      next={{ title: "Launch Checklist", href: "/docs/launch/checklist" }}
    >
      {/* Theme System */}
      <DocsSection title="Theme System">
        <DocsCard title="THEME_SYSTEM">
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <strong>20 Color Themes:</strong> Inspired by DaisyUI's theme system</div>
            <div>├─ <strong>Light/Dark Mode:</strong> Automatic dark mode with next-themes</div>
            <div>├─ <strong>Persistent:</strong> Theme choice saved to localStorage</div>
            <div>├─ <strong>No Flash:</strong> Pre-hydration loading prevents theme flash</div>
            <div>└─ <strong>Tailwind v4 Native:</strong> Works seamlessly with Tailwind CSS v4</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Available Themes */}
      <DocsSection title="Available Color Themes">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Light", desc: "Default", color: "#ffffff" },
            { name: "Cupcake", desc: "Soft", color: "#65c3c8" },
            { name: "Bumblebee", desc: "Yellow", color: "#e0a82e" },
            { name: "Emerald", desc: "Green", color: "#66cc8a" },
            { name: "Corporate", desc: "Business", color: "#4b6bfb" },
            { name: "Retro", desc: "Vintage", color: "#ef9995" },
            { name: "Pastel", desc: "Soft", color: "#d1c1d7" },
            { name: "Fantasy", desc: "Purple", color: "#6e0b75" },
            { name: "Dark", desc: "Default dark", color: "#1d232a" },
            { name: "Synthwave", desc: "Neon", color: "#e779c1" },
            { name: "Cyberpunk", desc: "Futuristic", color: "#ff7598" },
            { name: "Dracula", desc: "Dark purple", color: "#ff79c6" },
          ].map((theme) => (
            <Card key={theme.name} className="transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded-full border-2 border-border"
                    style={{ backgroundColor: theme.color }}
                  />
                  <div>
                    <div className={docsTypography.label}>{theme.name}</div>
                    <div className={docsTypography.caption}>{theme.desc}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DocsSection>

      {/* Best Practices */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST_PRACTICES">
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <strong>Use semantic colors:</strong> bg-primary instead of bg-purple-500</div>
            <div>├─ <strong>Test across themes:</strong> Verify UI works in light and dark variants</div>
            <div>├─ <strong>Default to Light:</strong> Clean, neutral starting point</div>
            <div>└─ <strong>Customize themes:</strong> Modify colors in globals.css [data-theme] selectors</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Architecture */}
      <DocsSection title="Architecture">
        <DocsCard title="ARCHITECTURE">
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <strong>ThemeDropdown</strong> - Navbar component for theme selection</div>
            <div>├─ <strong>ColorThemeSwitcher</strong> - Full-page grid for settings</div>
            <div>├─ <strong>globals.css</strong> - All 20 theme CSS variable definitions</div>
            <div>├─ <strong>layout.tsx</strong> - Pre-hydration script prevents flash</div>
            <div>└─ <strong>localStorage</strong> - Persists user preference (key: 'theme')</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/components/overview"
            title="UI Components"
            description="All components use semantic colors"
          />
          <DocsLinkCard
            href="/docs/extras/testing"
            title="Testing"
            description="Test across different themes"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
