'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThemeDropdown } from '@/components/theme/theme-dropdown';
import { VisualThemeDropdown } from '@/components/theme/visual-theme-dropdown';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Home,
  Settings,
  Users,
  FileText,
} from 'lucide-react';

const crtEffects = [
  { id: 'none', name: 'None' },
  { id: 'noise', name: 'Noise' },
  { id: 'scanlines', name: 'Scanlines' },
  { id: 'both', name: 'Noise + Scanlines' },
  { id: 'heavy', name: 'Heavy CRT' },
  { id: 'authentic', name: 'Authentic CRT' },
] as const;

type CRTEffect = (typeof crtEffects)[number]['id'];

export default function ThemeShowcasePage() {
  const [crtEffect, setCrtEffect] = useState<CRTEffect>('noise');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
    setMounted(true);

    const savedCRT = (localStorage.getItem('crt-effect') as CRTEffect) || 'noise';
    setCrtEffect(savedCRT);
    document.body.setAttribute('data-crt-effect', savedCRT);
  }, []);

  const handleCRTChange = (effect: CRTEffect) => {
    setCrtEffect(effect);
    localStorage.setItem('crt-effect', effect);
    document.body.setAttribute('data-crt-effect', effect);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header with Controls */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-foreground font-mono text-4xl font-bold">[THEME_SHOWCASE]</h1>
            <p className="text-muted-foreground font-mono text-sm">
              Complete design system component library for theme testing
            </p>
          </div>

          <div className="flex gap-4">
            {/* Theme Controls */}
            <Card className={cn(mode.radius, 'w-80')}>
              <CardHeader code="0x00" title="THEME_CONTROLS" />
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className={mode.font}>[COLOR_THEME]</Label>
                  <ThemeDropdown />
                  <p className="text-muted-foreground font-mono text-xs">
                    Switch between light and dark color schemes
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className={mode.font}>[VISUAL_THEME]</Label>
                  <VisualThemeDropdown />
                  <p className="text-muted-foreground font-mono text-xs">
                    Switch between Terminal and Modern visual styles
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CRT Effect Switcher */}
            <Card className={cn(mode.radius, 'w-64')}>
              <CardHeader code="0xFF" title="CRT_EFFECTS" />
              <CardContent className="space-y-2">
                <Label className={mode.font}>[EFFECT_TYPE]</Label>
                <Select value={crtEffect} onValueChange={handleCRTChange}>
                  <SelectTrigger className={cn(mode.radius, mode.font)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={mode.radius}>
                    {crtEffects.map((effect) => (
                      <SelectItem key={effect.id} value={effect.id} className={mode.font}>
                        {effect.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground font-mono text-xs">Toggle CRT screen effects</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Color Tokens */}
        <Card className={mode.radius}>
          <CardHeader code="0x01" title="COLOR_TOKENS" />
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="bg-background border-border h-20 border" />
              <p className="font-mono text-xs">background</p>
            </div>
            <div className="space-y-2">
              <div className="bg-foreground h-20" />
              <p className="font-mono text-xs">foreground</p>
            </div>
            <div className="space-y-2">
              <div className="bg-card border-border h-20 border" />
              <p className="font-mono text-xs">card</p>
            </div>
            <div className="space-y-2">
              <div className="bg-muted border-border h-20 border" />
              <p className="font-mono text-xs">muted</p>
            </div>
            <div className="space-y-2">
              <div className="bg-primary h-20" />
              <p className="font-mono text-xs">primary</p>
            </div>
            <div className="space-y-2">
              <div className="bg-secondary h-20" />
              <p className="font-mono text-xs">secondary</p>
            </div>
            <div className="space-y-2">
              <div className="bg-accent h-20" />
              <p className="font-mono text-xs">accent</p>
            </div>
            <div className="space-y-2">
              <div className="bg-destructive h-20" />
              <p className="font-mono text-xs">destructive</p>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card className={mode.radius}>
          <CardHeader code="0x02" title="BUTTONS" />
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="default" className={cn(mode.radius, mode.font)}>
              &gt; DEFAULT
            </Button>
            <Button variant="secondary" className={cn(mode.radius, mode.font)}>
              &gt; SECONDARY
            </Button>
            <Button variant="destructive" className={cn(mode.radius, mode.font)}>
              &gt; DESTRUCTIVE
            </Button>
            <Button variant="outline" className={cn(mode.radius, mode.font)}>
              &gt; OUTLINE
            </Button>
            <Button variant="ghost" className={cn(mode.radius, mode.font)}>
              &gt; GHOST
            </Button>
            <Button variant="link" className={cn(mode.radius, mode.font)}>
              &gt; LINK
            </Button>
            <Button disabled className={cn(mode.radius, mode.font)}>
              &gt; DISABLED
            </Button>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className={mode.radius}>
          <CardHeader code="0x03" title="BADGES" />
          <CardContent className="flex flex-wrap gap-4">
            <Badge variant="default" className={cn(mode.radius, mode.font)}>
              DEFAULT
            </Badge>
            <Badge variant="secondary" className={cn(mode.radius, mode.font)}>
              SECONDARY
            </Badge>
            <Badge variant="destructive" className={cn(mode.radius, mode.font)}>
              DESTRUCTIVE
            </Badge>
            <Badge variant="outline" className={cn(mode.radius, mode.font)}>
              OUTLINE
            </Badge>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className={mode.radius}>
          <CardHeader code="0x04" title="ALERTS" />
          <CardContent className="space-y-4">
            <Alert className={mode.radius}>
              <Info className="h-4 w-4" />
              <AlertTitle className={mode.font}>INFO</AlertTitle>
              <AlertDescription className={mode.font}>
                This is an informational alert message.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive" className={mode.radius}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className={mode.font}>ERROR</AlertTitle>
              <AlertDescription className={mode.font}>
                This is an error alert message.
              </AlertDescription>
            </Alert>
            <Alert className={cn(mode.radius, 'border-yellow-500 bg-yellow-500/10')}>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertTitle className={cn(mode.font, 'text-yellow-500')}>WARNING</AlertTitle>
              <AlertDescription className={cn(mode.font, 'text-yellow-500/90')}>
                This is a warning alert message.
              </AlertDescription>
            </Alert>
            <Alert className={cn(mode.radius, 'border-green-500 bg-green-500/10')}>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertTitle className={cn(mode.font, 'text-green-500')}>SUCCESS</AlertTitle>
              <AlertDescription className={cn(mode.font, 'text-green-500/90')}>
                This is a success alert message.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card className={mode.radius}>
          <CardHeader code="0x05" title="FORM_ELEMENTS" />
          <CardContent className="space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text-input" className={mode.font}>
                [TEXT_INPUT]
              </Label>
              <Input
                id="text-input"
                placeholder="Enter text..."
                className={cn(mode.radius, mode.font)}
              />
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Label htmlFor="textarea" className={mode.font}>
                [TEXTAREA]
              </Label>
              <Textarea
                id="textarea"
                placeholder="Enter multiple lines..."
                className={cn(mode.radius, mode.font)}
              />
            </div>

            {/* Select */}
            <div className="space-y-2">
              <Label htmlFor="select" className={mode.font}>
                [SELECT]
              </Label>
              <Select>
                <SelectTrigger className={cn(mode.radius, mode.font)}>
                  <SelectValue placeholder="Select option..." />
                </SelectTrigger>
                <SelectContent className={mode.radius}>
                  <SelectItem value="option1" className={mode.font}>
                    Option 1
                  </SelectItem>
                  <SelectItem value="option2" className={mode.font}>
                    Option 2
                  </SelectItem>
                  <SelectItem value="option3" className={mode.font}>
                    Option 3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox" className={mode.radius} />
              <Label htmlFor="checkbox" className={mode.font}>
                [CHECKBOX] Accept terms
              </Label>
            </div>

            {/* Radio Group */}
            <div className="space-y-2">
              <Label className={mode.font}>[RADIO_GROUP]</Label>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1" className={mode.font}>
                    Option 1
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2" className={mode.font}>
                    Option 2
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Switch */}
            <div className="flex items-center space-x-2">
              <Switch id="switch" />
              <Label htmlFor="switch" className={mode.font}>
                [SWITCH] Enable feature
              </Label>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <Label className={mode.font}>[SLIDER]</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <Label className={mode.font}>[PROGRESS]</Label>
              <Progress value={66} />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className={mode.radius}>
          <CardHeader code="0x06" title="TABS" />
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList className={mode.radius}>
                <TabsTrigger value="tab1" className={cn(mode.radius, mode.font)}>
                  [TAB_1]
                </TabsTrigger>
                <TabsTrigger value="tab2" className={cn(mode.radius, mode.font)}>
                  [TAB_2]
                </TabsTrigger>
                <TabsTrigger value="tab3" className={cn(mode.radius, mode.font)}>
                  [TAB_3]
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className={mode.font}>
                <p className="text-muted-foreground text-sm">Content for tab 1</p>
              </TabsContent>
              <TabsContent value="tab2" className={mode.font}>
                <p className="text-muted-foreground text-sm">Content for tab 2</p>
              </TabsContent>
              <TabsContent value="tab3" className={mode.font}>
                <p className="text-muted-foreground text-sm">Content for tab 3</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className={mode.radius}>
          <CardHeader code="0x07" title="TABLE" />
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={mode.font}>[ID]</TableHead>
                  <TableHead className={mode.font}>[NAME]</TableHead>
                  <TableHead className={mode.font}>[STATUS]</TableHead>
                  <TableHead className={cn(mode.font, 'text-right')}>[AMOUNT]</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className={mode.font}>001</TableCell>
                  <TableCell className={mode.font}>User Alpha</TableCell>
                  <TableCell>
                    <Badge variant="default" className={cn(mode.radius, mode.font)}>
                      ACTIVE
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(mode.font, 'text-right')}>$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={mode.font}>002</TableCell>
                  <TableCell className={mode.font}>User Beta</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(mode.radius, mode.font)}>
                      PENDING
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(mode.font, 'text-right')}>$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={mode.font}>003</TableCell>
                  <TableCell className={mode.font}>User Gamma</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className={cn(mode.radius, mode.font)}>
                      INACTIVE
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(mode.font, 'text-right')}>$350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className={mode.radius}>
          <CardHeader code="0x08" title="TYPOGRAPHY" />
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-foreground font-mono text-4xl font-bold">HEADING_1</h1>
            </div>
            <div>
              <h2 className="text-foreground font-mono text-3xl font-semibold">HEADING_2</h2>
            </div>
            <div>
              <h3 className="text-foreground font-mono text-2xl font-medium">HEADING_3</h3>
            </div>
            <div>
              <h4 className="text-foreground font-mono text-xl">HEADING_4</h4>
            </div>
            <Separator className={mode.radius} />
            <div>
              <p className="text-foreground font-mono text-base">
                Body text - Regular foreground color for main content.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground font-mono text-sm">
                Muted text - Used for secondary content and descriptions.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground font-mono text-xs">
                Small text - Captions, labels, and metadata.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card className={mode.radius}>
          <CardHeader code="0x09" title="NAVIGATION" />
          <CardContent>
            <nav className="flex flex-wrap gap-2">
              <Button variant="ghost" className={cn(mode.radius, mode.font, 'gap-2')}>
                <Home className="h-4 w-4" />
                HOME
              </Button>
              <Button variant="ghost" className={cn(mode.radius, mode.font, 'gap-2')}>
                <Users className="h-4 w-4" />
                USERS
              </Button>
              <Button variant="ghost" className={cn(mode.radius, mode.font, 'gap-2')}>
                <FileText className="h-4 w-4" />
                DOCS
              </Button>
              <Button variant="ghost" className={cn(mode.radius, mode.font, 'gap-2')}>
                <Settings className="h-4 w-4" />
                SETTINGS
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Text Colors */}
        <Card className={mode.radius}>
          <CardHeader code="0x10" title="TEXT_COLORS" />
          <CardContent className="space-y-2">
            <p className="text-foreground font-mono text-sm">text-foreground</p>
            <p className="text-muted-foreground font-mono text-sm">text-muted-foreground</p>
            <p className="text-primary font-mono text-sm">text-primary</p>
            <p className="text-secondary font-mono text-sm">text-secondary</p>
            <p className="text-accent font-mono text-sm">text-accent (if exists)</p>
            <p className="text-destructive font-mono text-sm">text-destructive</p>
          </CardContent>
        </Card>

        {/* Background Colors */}
        <Card className={mode.radius}>
          <CardHeader code="0x11" title="BACKGROUND_COLORS" />
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="bg-primary space-y-2 p-4">
              <p className="text-primary-foreground font-mono text-sm">
                bg-primary / text-primary-foreground
              </p>
            </div>
            <div className="bg-secondary space-y-2 p-4">
              <p className="text-secondary-foreground font-mono text-sm">
                bg-secondary / text-secondary-foreground
              </p>
            </div>
            <div className="bg-accent space-y-2 p-4">
              <p className="text-accent-foreground font-mono text-sm">
                bg-accent / text-accent-foreground
              </p>
            </div>
            <div className="bg-destructive space-y-2 p-4">
              <p className="text-destructive-foreground font-mono text-sm">
                bg-destructive / text-destructive-foreground
              </p>
            </div>
            <div className="bg-muted space-y-2 p-4">
              <p className="text-muted-foreground font-mono text-sm">
                bg-muted / text-muted-foreground
              </p>
            </div>
            <div className="bg-card border-border space-y-2 border p-4">
              <p className="text-card-foreground font-mono text-sm">
                bg-card / text-card-foreground
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Borders */}
        <Card className={mode.radius}>
          <CardHeader code="0x12" title="BORDERS" />
          <CardContent className="space-y-4">
            <div className="border-border border p-4">
              <p className="font-mono text-sm">border-border (default)</p>
            </div>
            <div className="border-primary border-2 p-4">
              <p className="text-primary font-mono text-sm">border-primary</p>
            </div>
            <div className="border-destructive border-2 p-4">
              <p className="text-destructive font-mono text-sm">border-destructive</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
