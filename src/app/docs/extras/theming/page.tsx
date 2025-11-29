import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Theming & Colors - Fabrk Docs",
  description: "Customize your Fabrk app with 20 built-in color themes. Switch themes instantly or create your own brand colors.",
};

export default function ThemingPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-2 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0xB0] EXTRAS ] THEMING</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">THEMING_AND_CUSTOMIZATION</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Choose from 20 professionally-designed color themes or create your own.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="mb-2 font-mono text-xs font-semibold">Theme System</h3>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <strong>20 Color Themes:</strong> Inspired by{" "}
              <a href="https://daisyui.com/docs/themes/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                DaisyUI's theme system
              </a>
            </div>
            <div>├─ <strong>Light/Dark Mode:</strong> Automatic dark mode with next-themes</div>
            <div>├─ <strong>Persistent:</strong> Theme choice saved to localStorage</div>
            <div>├─ <strong>No Flash:</strong> Pre-hydration loading prevents theme flash</div>
            <div>└─ <strong>Tailwind v4 Native:</strong> Works seamlessly with Tailwind CSS v4</div>
          </div>
        </CardContent>
      </Card>

      {/* Available Themes */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">AVAILABLE_COLOR_THEMES</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          All themes from{" "}
          <a href="https://daisyui.com/docs/themes/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            DaisyUI
          </a>
          . Select any theme from the dropdown in the navbar to preview.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {/* Light Themes */}
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#ffffff] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Light</div>
                  <div className="font-mono text-xs text-muted-foreground">Default</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#65c3c8] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Cupcake</div>
                  <div className="font-mono text-xs text-muted-foreground">Soft</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#e0a82e] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Bumblebee</div>
                  <div className="font-mono text-xs text-muted-foreground">Yellow</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#66cc8a] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Emerald</div>
                  <div className="font-mono text-xs text-muted-foreground">Green</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#4b6bfb] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Corporate</div>
                  <div className="font-mono text-xs text-muted-foreground">Business</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#ef9995] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Retro</div>
                  <div className="font-mono text-xs text-muted-foreground">Vintage</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#d1c1d7] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Pastel</div>
                  <div className="font-mono text-xs text-muted-foreground">Soft</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#6e0b75] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Fantasy</div>
                  <div className="font-mono text-xs text-muted-foreground">Purple</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#5c7f67] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Garden</div>
                  <div className="font-mono text-xs text-muted-foreground">Green</div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Dark Themes */}
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#1d232a] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Dark</div>
                  <div className="font-mono text-xs text-muted-foreground">Default dark</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#e779c1] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Synthwave</div>
                  <div className="font-mono text-xs text-muted-foreground">Neon</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#ff7598] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Cyberpunk</div>
                  <div className="font-mono text-xs text-muted-foreground">Futuristic</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#e96d7b] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Valentine</div>
                  <div className="font-mono text-xs text-muted-foreground">Pink</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#ff7700] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Halloween</div>
                  <div className="font-mono text-xs text-muted-foreground">Orange</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#1eb854] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Forest</div>
                  <div className="font-mono text-xs text-muted-foreground">Nature</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#09ecf3] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Aqua</div>
                  <div className="font-mono text-xs text-muted-foreground">Cyan</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#0d0d0d] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Lo-Fi</div>
                  <div className="font-mono text-xs text-muted-foreground">Minimal</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#ff79c6] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Dracula</div>
                  <div className="font-mono text-xs text-muted-foreground">Dark purple</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#8c0327] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Autumn</div>
                  <div className="font-mono text-xs text-muted-foreground">Warm</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#1c4e80] border-2 border-border" />
                <div>
                  <div className="font-mono font-semibold text-xs">Business</div>
                  <div className="font-mono text-xs text-muted-foreground">Professional</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Theme Dropdown Component */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">THEME_SWITCHER_COMPONENT</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          The <code className="bg-muted px-1 font-mono text-xs">ThemeDropdown</code> component provides a compact dropdown for navbar:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { ThemeDropdown } from "@/components/theme/theme-dropdown";

export function MyNavbar() {
  return (
    <nav>
      <ThemeDropdown /> {/* Dropdown with all 20 DaisyUI themes */}
    </nav>
  );
}`} />
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">HOW_IT_WORKS</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">Themes are applied via data-theme attribute:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="html" code={`<!-- Themes work via data-theme attribute (DaisyUI pattern) -->
<html data-theme="light">
  <!-- data-theme="light" sets the color palette -->
  <!-- Options: light, dark, cupcake, synthwave, dracula, etc. -->
</html>

<!-- Theme is auto-loaded before React hydration (no flash) -->
<script>
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
</script>`} />
        </div>
      </div>

      {/* CSS Implementation */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">CSS_IMPLEMENTATION</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Each DaisyUI theme defines CSS variables in <code className="bg-muted px-1 font-mono text-xs">globals.css</code>:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="css" code={`/* Light (default) */
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
}

/* ...and 17 more DaisyUI themes */`} />
        </div>
      </div>

      {/* Using Theme Colors */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">USING_THEME_COLORS</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Always use semantic color classes that adapt to the active theme:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`// ✅ GOOD - Theme-aware colors
<button className="bg-primary text-primary-foreground">
  Matches active theme (light, synthwave, dracula, etc.)
</button>

<div className="border-primary ring-primary">
  Adapts automatically when user switches themes
</div>

// ❌ BAD - Hardcoded colors
<button className="bg-blue-500 text-white">
  Always blue, ignores theme selection
</button>

<div className="border-green-500">
  Hardcoded green doesn't respect user preference
</div>`} />
        </div>
      </div>

      {/* Adding Custom Themes */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">ADDING_CUSTOM_THEMES</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Add your own DaisyUI-style themes in 2 steps:
        </p>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">1</span>
              <h3 className="font-mono text-xs font-semibold">ADD_CSS_IN_GLOBALS</h3>
            </div>
          </div>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="css" code={`/* Your Custom Theme */
[data-theme="ocean"] {
  --primary: 199 89% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 199 19% 90%;
  --background: 0 0% 100%;
  --foreground: 199 10% 10%;
  /* Add all required CSS variables */
}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">2</span>
              <h3 className="font-mono text-xs font-semibold">ADD_TO_THEME_DROPDOWN</h3>
            </div>
          </div>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="tsx" code={`const themes = [
  { id: "light", name: "Light", preview: "#ffffff" },
  { id: "dark", name: "Dark", preview: "#1d232a" },
  // ...existing DaisyUI themes...
  { id: "ocean", name: "Ocean", preview: "#0ea5e9" }, // Your custom theme
];`} />
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground mt-3">
          <strong>Note:</strong> The <code className="bg-muted px-1 font-mono">ColorTheme</code> type is automatically inferred from the themes array, so no type changes needed.
        </p>
      </div>

      {/* Best Practices */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
              <div>├─ <strong>DaisyUI theme system:</strong> 20 color themes with data-theme attribute (inspired by DaisyUI)</div>
              <div>├─ <strong>Use semantic colors:</strong> <code className="bg-muted px-1 font-mono">bg-primary</code> instead of <code className="bg-muted px-1 font-mono">bg-purple-500</code></div>
              <div>├─ <strong>Light and dark themes:</strong> Select from various light themes (Light, Cupcake, Fantasy) or dark themes (Dark, Dracula, Synthwave)</div>
              <div>├─ <strong>Test across themes:</strong> Verify UI works across multiple light and dark theme variants</div>
              <div>├─ <strong>Default to Light theme:</strong> Clean, neutral starting point for most users</div>
              <div>└─ <strong>Customize themes:</strong> Modify theme colors in globals.css by editing the [data-theme="..."] selectors</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Architecture */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">ARCHITECTURE</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
              <div>├─ <strong>ThemeDropdown</strong> - Navbar component for selecting from 20 DaisyUI-inspired color themes</div>
              <div>├─ <strong>ColorThemeSwitcher</strong> - Full-page grid showing all themes (for settings pages)</div>
              <div>├─ <strong>globals.css</strong> - Contains all 20 theme CSS variable definitions with [data-theme] selectors</div>
              <div>├─ <strong>layout.tsx</strong> - Pre-hydration script prevents theme flash on page load</div>
              <div>└─ <strong>localStorage</strong> - Persists user theme preference (key: 'theme')</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">CREDITS_AND_INSPIRATION</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <p className="font-mono text-xs text-muted-foreground">
              Fabrk's theme system is inspired by{" "}
              <a
                href="https://daisyui.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                DaisyUI
              </a>
              , a popular Tailwind CSS component library with an excellent theme system.
              Check out their{" "}
              <a
                href="https://daisyui.com/docs/themes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                theme documentation
              </a>
              {" "}for more theme ideas and color inspiration.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/docs/components">
            <Card className="rounded-none h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-xs font-semibold">UI Components</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  All components use semantic colors and adapt to themes
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/extras/testing">
            <Card className="rounded-none h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-xs font-semibold">Testing</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Test your app across different themes and modes
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
