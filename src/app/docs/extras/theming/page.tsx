import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Theming & Colors - Fabrk Docs",
  description: "Customize your Fabrk app with 20 built-in color themes. Switch themes instantly or create your own brand colors.",
};

export default function ThemingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Theming & Customization</h1>
        <p className="text-lg text-muted-foreground">
          Choose from 20 professionally-designed color themes or create your own.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">Theme System</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li><strong>20 Color Themes:</strong> Inspired by{" "}
              <a href="https://daisyui.com/docs/themes/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                DaisyUI's theme system
              </a>
            </li>
            <li><strong>Light/Dark Mode:</strong> Automatic dark mode with next-themes</li>
            <li><strong>Persistent:</strong> Theme choice saved to localStorage</li>
            <li><strong>No Flash:</strong> Pre-hydration loading prevents theme flash</li>
            <li><strong>Tailwind v4 Native:</strong> Works seamlessly with Tailwind CSS v4</li>
          </ul>
        </CardContent>
      </Card>

      {/* Available Themes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Color Themes (20)</h2>
        <p className="text-muted-foreground">
          Includes Light, Dark, Cupcake, Bumblebee, Emerald, Corporate, Synthwave, Retro, Cyberpunk, Valentine, Halloween, Garden, Forest, Aqua, Lofi, Pastel, Fantasy, Wireframe, Black, Luxury, Dracula, and more.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(262,83%,58%)] border-2 border-border" />
                <div>
                  <div className="font-semibold">Purple</div>
                  <div className="text-xs text-muted-foreground">Default</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(217,91%,60%)] border-2 border-border" />
                <div>
                  <div className="font-semibold">Ocean Blue</div>
                  <div className="text-xs text-muted-foreground">Professional</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(142,76%,36%)] border-2 border-border" />
                <div>
                  <div className="font-semibold">Forest Green</div>
                  <div className="text-xs text-muted-foreground">Natural</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(25,95%,53%)] border-2 border-border" />
                <div>
                  <div className="font-semibold">Sunset Orange</div>
                  <div className="text-xs text-muted-foreground">Energetic</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(330,81%,60%)] border-2 border-border" />
                <div>
                  <div className="font-semibold">Hot Pink</div>
                  <div className="text-xs text-muted-foreground">Bold</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(0,84%,60%)] border-2 border-border" />
                <div>
                  <div className="font-semibold">Ruby Red</div>
                  <div className="text-xs text-muted-foreground">Powerful</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Theme Dropdown Component */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Switcher Component</h2>
        <p className="text-muted-foreground">
          The <code className="rounded bg-muted px-1 py-0.5">ThemeDropdown</code> component provides a compact dropdown for navbar:
        </p>
        <CodeBlock language="tsx" code={`import { ThemeDropdown } from "@/components/theme/theme-dropdown";

export function MyNavbar() {
  return (
    <nav>
      <ThemeDropdown /> {/* Dropdown with all 20 DaisyUI themes */}
    </nav>
  );
}`} />
      </div>

      {/* How It Works */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <CodeBlock language="html" code={`<!-- Themes work via data-theme attribute + CSS variables -->
<html data-theme="purple" class="dark">
  <!-- data-theme="purple" sets the color palette -->
  <!-- class="dark" enables dark mode -->
</html>

<!-- Theme is auto-loaded before React hydration (no flash) -->
<script>
  const theme = localStorage.getItem('theme') || 'purple';
  document.documentElement.setAttribute('data-theme', theme);
</script>`} />
      </div>

      {/* CSS Implementation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">CSS Implementation</h2>
        <p className="text-muted-foreground">
          Each theme defines custom CSS variables in <code className="rounded bg-muted px-1 py-0.5">globals.css</code>:
        </p>
        <CodeBlock language="css" code={`/* Purple (default) */
[data-theme="purple"] {
  --primary: 262.1 83.3% 57.8%;
  --ring: 262.1 83.3% 57.8%;
}

[data-theme="purple"].dark {
  --primary: 263.4 70% 50.4%;
  --ring: 263.4 70% 50.4%;
}

/* Ocean Blue */
[data-theme="blue"] {
  --primary: 217.2 91.2% 59.8%;
  --ring: 217.2 91.2% 59.8%;
}

/* ...and 18 more DaisyUI-inspired themes */`} />
      </div>

      {/* Using Theme Colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Using Theme Colors</h2>
        <p className="text-muted-foreground">
          Always use semantic color classes that adapt to the active theme:
        </p>
        <CodeBlock language="tsx" code={`// ✅ GOOD - Theme-aware colors
<button className="bg-primary text-primary-foreground">
  Matches active theme (purple, blue, green, etc.)
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

      {/* Adding Custom Themes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Adding Custom Themes</h2>
        <p className="text-muted-foreground">
          Add new themes in 3 steps:
        </p>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold mb-2">1. Add CSS in globals.css</h3>
            <CodeBlock language="css" code={`/* Your Custom Theme */
[data-theme="teal"] {
  --primary: 173 80% 40%;
  --ring: 173 80% 40%;
}

[data-theme="teal"].dark {
  --primary: 173 80% 45%;
  --ring: 173 80% 45%;
}`} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Add to ThemeDropdown.tsx</h3>
            <CodeBlock language="tsx" code={`const themes = [
  { id: "purple", name: "Purple", preview: "hsl(262, 83%, 58%)" },
  { id: "blue", name: "Ocean Blue", preview: "hsl(217, 91%, 60%)" },
  // ...existing themes...
  { id: "teal", name: "Teal Dream", preview: "hsl(173, 80%, 40%)" },
];`} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Update type definition</h3>
            <CodeBlock language="tsx" code={`export type ColorTheme = 
  | "purple" 
  | "blue" 
  | "green" 
  | "orange" 
  | "pink" 
  | "red"
  | "teal"; // Add your new theme`} />
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>DaisyUI theme system:</strong> 20 color themes with data-theme attribute (inspired by DaisyUI)</li>
              <li><strong>Use semantic colors:</strong> <code className="bg-muted px-1 rounded">bg-primary</code> instead of <code className="bg-muted px-1 rounded">bg-purple-500</code></li>
              <li><strong>Light and dark themes:</strong> Select from various light themes (Light, Cupcake, Fantasy) or dark themes (Dark, Dracula, Synthwave)</li>
              <li><strong>Test across themes:</strong> Verify UI works across multiple light and dark theme variants</li>
              <li><strong>Default to Light theme:</strong> Clean, neutral starting point for most users</li>
              <li><strong>Customize themes:</strong> Modify theme colors in globals.css by editing the [data-theme="..."] selectors</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Architecture */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Architecture</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm">
              <div>
                <strong>ThemeDropdown</strong> - Navbar component for selecting from 20 DaisyUI-inspired color themes
              </div>
              <div>
                <strong>ColorThemeSwitcher</strong> - Full-page grid showing all themes (for settings pages)
              </div>
              <div>
                <strong>globals.css</strong> - Contains all 20 theme CSS variable definitions with [data-theme] selectors
              </div>
              <div>
                <strong>layout.tsx</strong> - Pre-hydration script prevents theme flash on page load
              </div>
              <div>
                <strong>localStorage</strong> - Persists user theme preference (key: 'theme')
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Credits & Inspiration</h2>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-muted-foreground">
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
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">UI Components</h3>
                <p className="text-sm text-muted-foreground">
                  All components use semantic colors and adapt to themes
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/extras/testing">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Testing</h3>
                <p className="text-sm text-muted-foreground">
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
