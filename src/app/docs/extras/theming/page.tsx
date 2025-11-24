import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function ThemingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Theming</h1>
        <p className="text-lg text-muted-foreground">
          Customize your app with 6 built-in color themes and dark mode support.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">Available Themes</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Purple (default)</li>
            <li>Ocean Blue</li>
            <li>Forest Green</li>
            <li>Sunset Orange</li>
            <li>Hot Pink</li>
            <li>Ruby Red</li>
          </ul>
        </CardContent>
      </Card>

      {/* CSS Variables */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">CSS Variables</h2>
        <p className="text-muted-foreground">
          Themes are built using CSS variables in <code className="rounded bg-muted px-1 py-0.5">src/app/globals.css</code>:
        </p>
        <CodeBlock language="css" code={`/* src/app/globals.css */

:root {
  /* Background colors */
  --background: 0 0% 100%;        /* Main background */
  --foreground: 240 10% 3.9%;     /* Main text color */

  /* Card/surface colors */
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;

  /* Primary brand color */
  --primary: 262.1 83.3% 57.8%;           /* Purple */
  --primary-foreground: 210 20% 98%;

  /* Secondary/muted colors */
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;

  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;

  /* UI elements */
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 262.1 83.3% 57.8%;

  /* Semantic colors */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;

  --success: 142 76% 36%;
  --success-foreground: 0 0% 98%;

  /* Border radius */
  --radius: 0.5rem;
}

/* Dark mode */
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;

  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;

  --primary: 263.4 70% 50.4%;
  --primary-foreground: 210 20% 98%;

  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;

  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;

  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 263.4 70% 50.4%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
}`} />
      </div>

      {/* Theme Definitions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Definitions</h2>
        <p className="text-muted-foreground">
          Each theme overrides the primary color:
        </p>
        <CodeBlock language="css" code={`/* Purple (default) */
:root {
  --primary: 262.1 83.3% 57.8%;
  --ring: 262.1 83.3% 57.8%;
}

/* Ocean Blue */
[data-theme="blue"] {
  --primary: 217.2 91.2% 59.8%;
  --ring: 217.2 91.2% 59.8%;
}

/* Forest Green */
[data-theme="green"] {
  --primary: 142.1 76.2% 36.3%;
  --ring: 142.1 76.2% 36.3%;
}

/* Sunset Orange */
[data-theme="orange"] {
  --primary: 24.6 95% 53.1%;
  --ring: 24.6 95% 53.1%;
}

/* Hot Pink */
[data-theme="pink"] {
  --primary: 330.4 81.2% 60.4%;
  --ring: 330.4 81.2% 60.4%;
}

/* Ruby Red */
[data-theme="red"] {
  --primary: 0 84.2% 60.2%;
  --ring: 0 84.2% 60.2%;
}`} />
      </div>

      {/* Theme Provider */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Provider</h2>
        <p className="text-muted-foreground">
          Uses next-themes for theme management:
        </p>
        <CodeBlock language="tsx" code={`// src/components/providers/theme-provider.tsx

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// src/app/layout.tsx

import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`} />
      </div>

      {/* Theme Switcher */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Switcher Component</h2>
        <p className="text-muted-foreground">
          Let users switch between light/dark modes:
        </p>
        <CodeBlock language="tsx" code={`"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`} />
      </div>

      {/* Color Theme Switcher */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Color Theme Switcher</h2>
        <p className="text-muted-foreground">
          Switch between color themes (purple, blue, etc.):
        </p>
        <CodeBlock language="tsx" code={`"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "purple", name: "Purple", color: "hsl(262, 83%, 58%)" },
  { id: "blue", name: "Ocean Blue", color: "hsl(217, 91%, 60%)" },
  { id: "green", name: "Forest Green", color: "hsl(142, 76%, 36%)" },
  { id: "orange", name: "Sunset Orange", color: "hsl(25, 95%, 53%)" },
  { id: "pink", name: "Hot Pink", color: "hsl(330, 81%, 60%)" },
  { id: "red", name: "Ruby Red", color: "hsl(0, 84%, 60%)" },
];

export function ColorThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("purple");

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem("color-theme") || "purple";
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("color-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  return (
    <div className="flex gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => handleChange(theme.id)}
          className={\`h-6 w-6 rounded-full border-2 \${
            currentTheme === theme.id
              ? "border-foreground"
              : "border-transparent"
          }\`}
          style={{ backgroundColor: theme.color }}
          title={theme.name}
        />
      ))}
    </div>
  );
}`} />
      </div>

      {/* Using Theme Colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Using Theme Colors</h2>
        <p className="text-muted-foreground">
          Always use CSS variables, never hardcoded colors:
        </p>
        <CodeBlock language="tsx" code={`// ✅ GOOD - Uses theme variables
<button className="bg-primary text-primary-foreground">
  Click me
</button>

<div className="border-border bg-card text-card-foreground">
  Card content
</div>

<p className="text-muted-foreground">
  Secondary text
</p>

<span className="text-destructive">
  Error message
</span>

// ❌ BAD - Hardcoded colors break theming
<button className="bg-purple-500 text-white">
  Click me
</button>

<div className="border-gray-200 bg-white text-gray-900">
  Card content
</div>

// Run lint to catch hardcoded colors:
npm run scan:hex`} />
      </div>

      {/* Custom Colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Adding Custom Colors</h2>
        <p className="text-muted-foreground">
          Add new semantic colors to your theme:
        </p>
        <CodeBlock language="css" code={`/* src/app/globals.css */

:root {
  /* Add custom semantic colors */
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 100%;

  --info: 199 89% 48%;
  --info-foreground: 0 0% 100%;

  --accent: 262 83% 58%;
  --accent-foreground: 0 0% 100%;
}

.dark {
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 0%;

  --info: 199 89% 48%;
  --info-foreground: 0 0% 0%;
}

/* tailwind.config.ts */

module.exports = {
  theme: {
    extend: {
      colors: {
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
      },
    },
  },
};

// Usage
<div className="bg-warning text-warning-foreground">
  Warning message
</div>`} />
      </div>

      {/* Dark Mode Images */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dark Mode Images</h2>
        <p className="text-muted-foreground">
          Swap images based on theme:
        </p>
        <CodeBlock language="tsx" code={`// Using CSS to swap images
<img
  src="/logo-light.svg"
  alt="Logo"
  className="dark:hidden"
/>
<img
  src="/logo-dark.svg"
  alt="Logo"
  className="hidden dark:block"
/>

// Or use CSS filter to invert
<img
  src="/logo.svg"
  alt="Logo"
  className="dark:invert"
/>

// Using useTheme hook
"use client";

import { useTheme } from "next-themes";

export function ThemedLogo() {
  const { resolvedTheme } = useTheme();

  return (
    <img
      src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
      alt="Logo"
    />
  );
}`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/extras/i18n">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Internationalization</h3>
                <p className="text-sm text-muted-foreground">
                  Add multiple language support
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/extras/testing">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Test your themed components
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
