"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  AlertTriangle,
  X,
  MessageSquare,
  Download,
  Trash2,
  GripVertical,
  ExternalLink,
  RotateCcw,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Search,
  FileText,
  Crosshair,
  Target,
  ChevronDown,
  Minus,
  Square,
  Maximize2,
} from "lucide-react";

// Preset issues for quick tagging
const ISSUE_PRESETS = [
  { label: "Wrong color", note: "Color doesn't match design system" },
  { label: "Wrong font", note: "Font family/weight/size incorrect" },
  { label: "Wrong spacing", note: "Padding/margin/gap incorrect" },
  { label: "Border issue", note: "Border missing/wrong style" },
  { label: "Alignment off", note: "Element misaligned" },
  { label: "Responsive", note: "Layout breaks at this viewport" },
  { label: "Hover state", note: "Missing or incorrect hover" },
  { label: "Focus state", note: "Missing or incorrect focus ring" },
  { label: "Contrast", note: "Poor color contrast / hard to read" },
  { label: "Inconsistent", note: "Doesn't match similar elements" },
  { label: "Overflow", note: "Content clipped or overflowing" },
  { label: "Z-index", note: "Stacking/overlap problem" },
  { label: "Animation", note: "Animation timing/easing wrong" },
  { label: "Truncation", note: "Text cut off incorrectly" },
  { label: "Missing", note: "Element missing entirely" },
] as const;

type Status = "pending" | "ok" | "issue" | "skip";

interface ElementTag {
  selector: string;
  note: string;
  timestamp: number;
}

interface RouteState {
  status: Status;
  note: string;
  elements?: ElementTag[];
}

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "PUBLIC",
    items: [
      { title: "HOME", href: "/" },
      { title: "ABOUT", href: "/about" },
      { title: "CONTACT", href: "/contact" },
      { title: "FEATURES", href: "/features" },
      { title: "PRICING", href: "/pricing" },
      { title: "LANDING_ALT", href: "/landing-alt" },
      { title: "MAINTENANCE", href: "/maintenance" },
      { title: "SHOWCASE", href: "/component-showcase" },
      { title: "DEMO", href: "/demo" },
      { title: "BLOG", href: "/blog" },
      { title: "PRIVACY", href: "/privacy" },
      { title: "COOKIES", href: "/cookies" },
      { title: "TERMS", href: "/terms" },
      { title: "REFUND", href: "/refund" },
    ],
  },
  {
    title: "TEMPLATES",
    items: [
      { title: "INDEX", href: "/templates" },
      { title: "ACCOUNT", href: "/templates/account-pages" },
      { title: "ADMIN", href: "/templates/admin-panels" },
      { title: "ANALYTICS", href: "/templates/analytics-dashboard" },
      { title: "BILLING", href: "/templates/billing-dashboard" },
      { title: "CHARTS", href: "/templates/chart-library" },
      { title: "DASHBOARDS", href: "/templates/dashboards" },
      { title: "DOCS", href: "/templates/documentation" },
      { title: "EMAILS", href: "/templates/email-templates" },
      { title: "EMPTY", href: "/templates/empty-states" },
      { title: "ERRORS", href: "/templates/error-pages" },
      { title: "LANDING", href: "/templates/landing-variations" },
      { title: "MARKETING", href: "/templates/marketing" },
      { title: "MODALS", href: "/templates/modals" },
      { title: "NOTIFICATIONS", href: "/templates/notifications" },
      { title: "ONBOARDING", href: "/templates/onboarding" },
      { title: "PRICING", href: "/templates/pricing-page" },
      { title: "PROFILE", href: "/templates/profile" },
      { title: "SEARCH", href: "/templates/search-results" },
      { title: "SECURITY", href: "/templates/security-privacy" },
      { title: "SETTINGS", href: "/templates/settings-page" },
      { title: "TEAM", href: "/templates/team-dashboard" },
      { title: "USERS", href: "/templates/user-management" },
    ],
  },
  {
    title: "AUTH_TEMPLATES",
    items: [
      { title: "INDEX", href: "/templates/authentication" },
      { title: "SIGN_IN", href: "/templates/authentication/sign-in" },
      { title: "SIGN_UP", href: "/templates/authentication/sign-up" },
      { title: "FORGOT_PW", href: "/templates/authentication/forgot-password" },
      { title: "2FA", href: "/templates/authentication/two-factor" },
    ],
  },
  {
    title: "DASHBOARD",
    items: [
      { title: "DASHBOARD", href: "/dashboard" },
      { title: "ACCOUNT", href: "/account" },
      { title: "PROFILE", href: "/profile" },
      { title: "SETTINGS", href: "/settings" },
      { title: "SECURITY", href: "/settings/security" },
      { title: "NEW_ORG", href: "/organizations/new" },
      { title: "INVOICES", href: "/billing/invoices" },
      { title: "PAYMENTS", href: "/billing/payment-methods" },
      { title: "API_KEYS", href: "/developer/api-keys" },
    ],
  },
  {
    title: "ADMIN",
    items: [
      { title: "DASHBOARD", href: "/admin" },
      { title: "USERS", href: "/admin/users" },
      { title: "ANALYTICS", href: "/admin/analytics" },
      { title: "AUDIT_LOG", href: "/admin/audit-log" },
      { title: "FLAGS", href: "/admin/feature-flags-db" },
      { title: "MONITORING", href: "/admin/monitoring" },
      { title: "SECURITY", href: "/admin/security" },
    ],
  },
  {
    title: "DOCS",
    items: [
      { title: "HOME", href: "/docs" },
      { title: "START", href: "/docs/getting-started" },
    ],
  },
  {
    title: "COMPONENTS",
    items: [
      { title: "OVERVIEW", href: "/docs/components/overview" },
      { title: "ACCORDION", href: "/docs/components/accordion" },
      { title: "ALERT", href: "/docs/components/alert" },
      { title: "AVATAR", href: "/docs/components/avatar" },
      { title: "BADGE", href: "/docs/components/badge" },
      { title: "BREADCRUMB", href: "/docs/components/breadcrumb" },
      { title: "BUTTON", href: "/docs/components/button" },
      { title: "CALENDAR", href: "/docs/components/calendar" },
      { title: "CARD", href: "/docs/components/card" },
      { title: "CHECKBOX", href: "/docs/components/checkbox" },
      { title: "DIALOG", href: "/docs/components/dialog" },
      { title: "DROPDOWN", href: "/docs/components/dropdown-menu" },
      { title: "FORM", href: "/docs/components/form" },
      { title: "INPUT", href: "/docs/components/input" },
      { title: "LABEL", href: "/docs/components/label" },
      { title: "NAV", href: "/docs/components/navigation" },
      { title: "PAGINATION", href: "/docs/components/pagination" },
      { title: "POPOVER", href: "/docs/components/popover" },
      { title: "PROGRESS", href: "/docs/components/progress" },
      { title: "SELECT", href: "/docs/components/select" },
      { title: "SHEET", href: "/docs/components/sheet" },
      { title: "SKELETON", href: "/docs/components/skeleton" },
      { title: "SLIDER", href: "/docs/components/slider" },
      { title: "SWITCH", href: "/docs/components/switch" },
      { title: "TABLE", href: "/docs/components/table" },
      { title: "TABS", href: "/docs/components/tabs" },
      { title: "TEXTAREA", href: "/docs/components/textarea" },
      { title: "TOAST", href: "/docs/components/toast" },
      { title: "TOOLTIP", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "FEATURES",
    items: [
      { title: "ANALYTICS", href: "/docs/features/analytics" },
      { title: "API_KEYS", href: "/docs/features/api-keys" },
      { title: "DATABASE", href: "/docs/features/database" },
      { title: "EMAILS", href: "/docs/features/emails" },
      { title: "FLAGS", href: "/docs/features/feature-flags" },
      { title: "OAUTH", href: "/docs/features/google-oauth" },
      { title: "MAGIC_LINKS", href: "/docs/features/magic-links" },
      { title: "MFA", href: "/docs/features/mfa" },
      { title: "NOTIFICATIONS", href: "/docs/features/notifications" },
      { title: "ORGS", href: "/docs/features/organizations" },
      { title: "PAYMENTS", href: "/docs/features/payments" },
      { title: "WEBHOOKS", href: "/docs/features/webhooks" },
    ],
  },
  {
    title: "SECURITY",
    items: [
      { title: "CSRF", href: "/docs/security/csrf" },
      { title: "RATE_LIMIT", href: "/docs/security/rate-limiting" },
      { title: "HEADERS", href: "/docs/security/headers" },
      { title: "VALIDATION", href: "/docs/security/validation" },
    ],
  },
];

const STORAGE_KEY = "visual-test-states";

export default function VisualTestPage() {
  const [currentPath, setCurrentPath] = useState("/");
  const [states, setStates] = useState<Record<string, RouteState>>({});
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [mounted, setMounted] = useState(false);

  // Element inspection mode
  const [inspectMode, setInspectMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [elementNote, setElementNote] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Tagger position and collapse state
  const [taggerPos, setTaggerPos] = useState({ x: 20, y: 60 });
  const [taggerCollapsed, setTaggerCollapsed] = useState<false | "collapsed" | "minimized">(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStates(JSON.parse(saved));
      } catch {}
    }
    const savedTagger = localStorage.getItem("visual-tagger-state");
    if (savedTagger) {
      try {
        const t = JSON.parse(savedTagger);
        if (t.pos) setTaggerPos(t.pos);
        if (t.collapsed !== undefined) setTaggerCollapsed(t.collapsed);
      } catch {}
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    }
  }, [states, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        "visual-tagger-state",
        JSON.stringify({
          pos: taggerPos,
          collapsed: taggerCollapsed,
        })
      );
    }
  }, [taggerPos, taggerCollapsed, mounted]);

  // Sync note text when path changes
  useEffect(() => {
    setNoteText(states[currentPath]?.note || "");
    setShowNote(false);
    setSelectedElement(null);
    setElementNote("");
  }, [currentPath, states]);

  // Generate CSS selector for element
  const getSelector = (el: Element): string => {
    if (el.id) return `#${el.id}`;
    if (el.className && typeof el.className === "string") {
      const classes = el.className
        .split(" ")
        .filter((c) => c && !c.startsWith("_"))
        .slice(0, 2)
        .join(".");
      if (classes) return `${el.tagName.toLowerCase()}.${classes}`;
    }
    const parent = el.parentElement;
    if (!parent) return el.tagName.toLowerCase();
    const siblings = Array.from(parent.children).filter((c) => c.tagName === el.tagName);
    const index = siblings.indexOf(el);
    return `${getSelector(parent)} > ${el.tagName.toLowerCase()}:nth-of-type(${index + 1})`;
  };

  // Inject inspection handlers into iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !mounted) return;

    const setupInspection = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Remove existing styles/handlers
        const existingStyle = doc.getElementById("visual-tester-style");
        if (existingStyle) existingStyle.remove();

        if (!inspectMode) return;

        // Inject styles for element inspection (colors are intentionally hardcoded
        // since they're injected into iframe and need to be visible across all themes)
        const style = doc.createElement("style");
        style.id = "visual-tester-style";
        style.textContent = `.vt-hover { outline: 2px dashed orange !important; outline-offset: 2px !important; cursor: crosshair !important; } .vt-selected { outline: 3px solid red !important; outline-offset: 2px !important; }`;
        doc.head.appendChild(style);

        let hoveredEl: Element | null = null;

        const handleMouseOver = (e: MouseEvent) => {
          if (hoveredEl) hoveredEl.classList.remove("vt-hover");
          hoveredEl = e.target as Element;
          if (hoveredEl && !hoveredEl.classList.contains("vt-selected")) {
            hoveredEl.classList.add("vt-hover");
          }
        };

        const handleMouseOut = () => {
          if (hoveredEl) hoveredEl.classList.remove("vt-hover");
        };

        const handleClick = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.target as Element;

          // Remove previous selection
          doc.querySelectorAll(".vt-selected").forEach((el) => el.classList.remove("vt-selected"));

          target.classList.add("vt-selected");
          target.classList.remove("vt-hover");

          const selector = getSelector(target);
          setSelectedElement(selector);
        };

        doc.body.addEventListener("mouseover", handleMouseOver);
        doc.body.addEventListener("mouseout", handleMouseOut);
        doc.body.addEventListener("click", handleClick, true);

        return () => {
          doc.body.removeEventListener("mouseover", handleMouseOver);
          doc.body.removeEventListener("mouseout", handleMouseOut);
          doc.body.removeEventListener("click", handleClick, true);
        };
      } catch {
        // Cross-origin or other error
      }
    };

    // Setup after iframe loads
    iframe.addEventListener("load", setupInspection);
    setupInspection();

    return () => {
      iframe.removeEventListener("load", setupInspection);
    };
    // getSelector is stable (no deps), safe to exclude
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectMode, mounted, currentPath]);

  // Add element tag
  const addElementTag = () => {
    if (!selectedElement) return;
    setStates((prev) => {
      const current = prev[currentPath] || { status: "pending", note: "", elements: [] };
      return {
        ...prev,
        [currentPath]: {
          ...current,
          elements: [
            ...(current.elements || []),
            { selector: selectedElement, note: elementNote, timestamp: Date.now() },
          ],
        },
      };
    });
    setSelectedElement(null);
    setElementNote("");

    // Clear selection in iframe
    try {
      const doc = iframeRef.current?.contentDocument;
      doc?.querySelectorAll(".vt-selected").forEach((el) => el.classList.remove("vt-selected"));
    } catch {}
  };

  // Remove element tag
  const removeElementTag = (timestamp: number) => {
    setStates((prev) => {
      const current = prev[currentPath];
      if (!current?.elements) return prev;
      return {
        ...prev,
        [currentPath]: {
          ...current,
          elements: current.elements.filter((e) => e.timestamp !== timestamp),
        },
      };
    });
  };

  // Filter navigation based on search
  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) return navigation;
    const query = searchQuery.toLowerCase();
    return navigation
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) || item.href.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery]);

  // Expand all when searching
  const sectionsToExpand = useMemo(() => {
    if (!searchQuery.trim()) return expandedSections;
    return new Set(filteredNavigation.map((_, i) => i));
  }, [searchQuery, filteredNavigation, expandedSections]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: taggerPos.x,
      startPosY: taggerPos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        setTaggerPos({
          x: dragRef.current.startPosX + (e.clientX - dragRef.current.startX),
          y: dragRef.current.startPosY + (e.clientY - dragRef.current.startY),
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const getState = (path: string): RouteState => states[path] || { status: "pending", note: "" };
  const setStatus = (status: Status) => {
    setStates((prev) => ({ ...prev, [currentPath]: { ...getState(currentPath), status } }));
  };
  const saveNote = () => {
    setStates((prev) => ({ ...prev, [currentPath]: { ...getState(currentPath), note: noteText } }));
    setShowNote(false);
  };
  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const exportReport = (format: "json" | "md" = "json") => {
    const totalElementTags = Object.values(states).reduce(
      (sum, s) => sum + (s.elements?.length || 0),
      0
    );
    const okCount = Object.values(states).filter((s) => s.status === "ok").length;
    const issueCount = Object.values(states).filter((s) => s.status === "issue").length;
    const skipCount = Object.values(states).filter((s) => s.status === "skip").length;

    const pages = Object.entries(states)
      .filter(([, s]) => s.status !== "pending" || (s.elements && s.elements.length > 0))
      .map(([path, state]) => ({
        path,
        status: state.status,
        note: state.note,
        elements: state.elements || [],
      }));

    if (format === "md") {
      const issuePages = pages.filter((p) => p.status === "issue" || p.elements.length > 0);
      const okPages = pages.filter((p) => p.status === "ok" && p.elements.length === 0);
      const skipPages = pages.filter((p) => p.status === "skip");

      let md = `# Visual Audit Report\n\n`;
      md += `**Date:** ${new Date().toLocaleString()}\n\n`;
      md += `## Summary\n\n`;
      md += `| Status | Count |\n|--------|-------|\n`;
      md += `| ✅ OK | ${okCount} |\n`;
      md += `| ⚠️ Issues | ${issueCount} |\n`;
      md += `| ⏭️ Skipped | ${skipCount} |\n`;
      md += `| 🎯 Element Tags | ${totalElementTags} |\n\n`;

      if (issuePages.length > 0) {
        md += `## Issues Found\n\n`;
        for (const page of issuePages) {
          md += `### ${page.path}\n\n`;
          if (page.note) md += `**Note:** ${page.note}\n\n`;
          if (page.elements.length > 0) {
            md += `**Tagged Elements:**\n`;
            for (const el of page.elements) {
              md += `- \`${el.selector}\`${el.note ? ` - ${el.note}` : ""}\n`;
            }
            md += "\n";
          }
        }
      }

      if (okPages.length > 0) {
        md += `## Passed (${okPages.length})\n\n`;
        for (const page of okPages) {
          md += `- ${page.path}${page.note ? ` (${page.note})` : ""}\n`;
        }
        md += "\n";
      }

      if (skipPages.length > 0) {
        md += `## Skipped (${skipPages.length})\n\n`;
        for (const page of skipPages) {
          md += `- ${page.path}${page.note ? ` - ${page.note}` : ""}\n`;
        }
      }

      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `visual-audit-${new Date().toISOString().split("T")[0]}.md`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const report = {
      date: new Date().toISOString(),
      summary: {
        total: Object.keys(states).length,
        ok: okCount,
        issues: issueCount,
        skipped: skipCount,
        elementTags: totalElementTags,
      },
      pages,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visual-audit-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="bg-background flex h-screen items-center justify-center font-mono">
        <span className="text-muted-foreground">[LOADING...]</span>
      </div>
    );
  }

  const current = getState(currentPath);
  const stats = {
    ok: Object.values(states).filter((s) => s.status === "ok").length,
    issues: Object.values(states).filter((s) => s.status === "issue").length,
    skip: Object.values(states).filter((s) => s.status === "skip").length,
    tags: Object.values(states).reduce((sum, s) => sum + (s.elements?.length || 0), 0),
  };

  const _statusColors: Record<Status, string> = {
    pending: "border-border",
    ok: "border-success",
    issue: "border-destructive",
    skip: "border-warning",
  };

  return (
    <div className="bg-background flex h-screen font-mono">
      {/* Left Sidebar - DocsSidebar style */}
      <aside
        className={cn(
          "border-border bg-background flex shrink-0 flex-col border-r transition-all duration-300",
          sidebarCollapsed ? "w-12" : "w-72"
        )}
      >
        {/* Collapsed state */}
        {sidebarCollapsed && (
          <div className="p-2">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center p-1.5"
              aria-label="Expand sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Expanded state */}
        {!sidebarCollapsed && (
          <nav className="flex flex-1 flex-col overflow-hidden">
            {/* Header */}
            <div className="border-border flex items-center justify-between border-b p-3">
              <span className="text-muted-foreground text-xs">[ VISUAL_TESTER ]</span>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted p-1"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Stats */}
            <div className="border-border border-b px-3 py-2 text-xs">
              <span className="text-success">{stats.ok}</span>
              <span className="text-muted-foreground"> / </span>
              <span className="text-destructive">{stats.issues}</span>
              <span className="text-muted-foreground"> / </span>
              <span className="text-warning">{stats.skip}</span>
              {stats.tags > 0 && (
                <>
                  <span className="text-muted-foreground"> / </span>
                  <span className="text-destructive">
                    {stats.tags}
                    <Target className="ml-0.5 inline h-3 w-3" />
                  </span>
                </>
              )}
            </div>

            {/* Search */}
            <div className="border-border relative border-b p-3">
              <Search className="text-muted-foreground absolute top-1/2 left-5 h-3 w-3 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:border-primary w-full border py-1.5 pr-7 pl-7 text-xs focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-5 -translate-y-1/2"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-2">
              {searchQuery && filteredNavigation.length === 0 && (
                <div className="text-muted-foreground py-4 text-center text-xs">
                  No results for &quot;{searchQuery}&quot;
                </div>
              )}

              {filteredNavigation.map((section, sectionIndex) => {
                const isExpanded = sectionsToExpand.has(sectionIndex);
                const hasActiveItem = section.items.some((item) => currentPath === item.href);

                return (
                  <div key={section.title} className={cn(sectionIndex > 0 && "mt-2")}>
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className={cn(
                        "flex w-full items-center gap-2 py-1.5 text-xs font-semibold transition-colors",
                        hasActiveItem
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <ChevronRight
                        className={cn(
                          "h-3 w-3 shrink-0 transition-transform",
                          isExpanded && "rotate-90"
                        )}
                      />
                      [{section.title}]
                    </button>

                    {isExpanded && (
                      <div className="before:bg-border relative ml-[7px] space-y-0.5 pl-4 before:absolute before:top-0 before:bottom-1 before:left-0 before:w-px">
                        {section.items.map((item) => {
                          const state = getState(item.href);
                          const isActive = currentPath === item.href;

                          return (
                            <button
                              key={item.href}
                              onClick={() => setCurrentPath(item.href)}
                              className={cn(
                                "flex w-full items-center gap-2 px-2 py-1 text-xs transition-colors",
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              {state.status === "ok" && <Check className="text-success h-3 w-3" />}
                              {state.status === "issue" && (
                                <AlertTriangle className="text-destructive h-3 w-3" />
                              )}
                              {state.status === "skip" && <X className="text-warning h-3 w-3" />}
                              {state.status === "pending" && (
                                <FileText className="h-3 w-3 opacity-50" />
                              )}
                              <span className="flex-1 text-left">{item.title}</span>
                              {state.elements && state.elements.length > 0 && (
                                <span className="text-destructive flex items-center gap-0.5">
                                  <Target className="h-3 w-3" />
                                  <span className="text-[10px]">{state.elements.length}</span>
                                </span>
                              )}
                              {state.note && <MessageSquare className="text-primary h-3 w-3" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="border-border flex flex-col gap-1 border-t p-2">
              <div className="flex gap-1">
                <button
                  onClick={() => exportReport("json")}
                  className="border-border hover:bg-muted flex flex-1 items-center justify-center gap-1 border px-2 py-1 text-xs"
                  title="Export as JSON"
                >
                  <Download className="h-3 w-3" />
                  .JSON
                </button>
                <button
                  onClick={() => exportReport("md")}
                  className="border-border hover:bg-muted flex flex-1 items-center justify-center gap-1 border px-2 py-1 text-xs"
                  title="Export as Markdown"
                >
                  <FileText className="h-3 w-3" />
                  .MD
                </button>
                <button
                  onClick={() => confirm("Reset all?") && setStates({})}
                  className="border-destructive/50 text-destructive hover:bg-destructive/10 flex items-center justify-center border px-2 py-1 text-xs"
                  title="Reset all"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            </div>
          </nav>
        )}
      </aside>

      {/* Right Pane - iframe */}
      <div className="relative flex-1">
        {/* Path Bar */}
        <div className="border-border bg-card flex items-center justify-between border-b px-3 py-2">
          <span className="text-muted-foreground text-xs">[PATH]: {currentPath}</span>
          <a
            href={currentPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-1 text-xs hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            OPEN
          </a>
        </div>

        {/* iframe */}
        <iframe
          ref={iframeRef}
          src={currentPath}
          className={cn("h-[calc(100vh-41px)] w-full border-0", inspectMode && "cursor-crosshair")}
          title="Preview"
        />

        {/* Draggable Tagger Window */}
        <div
          className={cn(
            "border-border bg-card absolute z-50 border",
            taggerCollapsed === "minimized" && "border-primary",
            taggerCollapsed === false && "w-56"
          )}
          style={{
            left: taggerPos.x,
            top: taggerPos.y,
          }}
        >
          {/* Window Title Bar */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            onMouseDown={handleMouseDown}
            className={cn(
              "border-border flex cursor-move items-center gap-2 border-b px-2 py-1.5",
              isDragging && "bg-muted"
            )}
          >
            <GripVertical className="text-muted-foreground h-3 w-3" />
            <span className="text-muted-foreground flex-1 text-xs">
              [ TAGGER ]
              {taggerCollapsed && current.status !== "pending" && (
                <span
                  className={cn(
                    "ml-1",
                    current.status === "ok" && "text-success",
                    current.status === "issue" && "text-destructive",
                    current.status === "skip" && "text-warning"
                  )}
                >
                  ({current.status.toUpperCase()})
                </span>
              )}
            </span>

            {/* Window Controls */}
            <div className="flex items-center gap-0.5">
              {/* Minimize */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTaggerCollapsed(taggerCollapsed === "minimized" ? false : "minimized");
                }}
                className="text-muted-foreground hover:bg-muted hover:text-foreground p-1"
                title="Minimize"
              >
                <Minus className="h-3 w-3" />
              </button>
              {/* Collapse/Expand */}
              {taggerCollapsed !== "minimized" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTaggerCollapsed(taggerCollapsed === "collapsed" ? false : "collapsed");
                  }}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground p-1"
                  title={taggerCollapsed === "collapsed" ? "Expand" : "Collapse"}
                >
                  {taggerCollapsed === "collapsed" ? (
                    <Maximize2 className="h-3 w-3" />
                  ) : (
                    <Square className="h-3 w-3" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Tagger Content - hidden when minimized or collapsed */}
          {taggerCollapsed === false && (
            <>
              {/* Status Buttons */}
              <div className="p-3">
                <div className="text-muted-foreground mb-2 text-xs">[STATUS]:</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setStatus("ok")}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1 border px-2 py-1.5 text-xs transition-colors",
                      current.status === "ok"
                        ? "border-success bg-success text-success-foreground"
                        : "border-border hover:border-success hover:text-success"
                    )}
                  >
                    <Check className="h-3 w-3" />
                    OK
                  </button>
                  <button
                    onClick={() => setStatus("issue")}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1 border px-2 py-1.5 text-xs transition-colors",
                      current.status === "issue"
                        ? "border-destructive bg-destructive text-destructive-foreground"
                        : "border-border hover:border-destructive hover:text-destructive"
                    )}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    ISSUE
                  </button>
                  <button
                    onClick={() => setStatus("skip")}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1 border px-2 py-1.5 text-xs transition-colors",
                      current.status === "skip"
                        ? "border-warning bg-warning text-warning-foreground"
                        : "border-border hover:border-warning hover:text-warning"
                    )}
                  >
                    <X className="h-3 w-3" />
                    SKIP
                  </button>
                </div>
              </div>

              {/* Note Section */}
              <div className="border-border border-t p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">[NOTE]:</span>
                  <button
                    onClick={() => setShowNote(!showNote)}
                    className="text-primary text-xs hover:underline"
                  >
                    {showNote ? "CANCEL" : current.note ? "EDIT" : "ADD"}
                  </button>
                </div>
                {showNote ? (
                  <div className="space-y-2">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Describe issue..."
                      className="border-border bg-background focus:border-primary h-16 w-full border p-2 text-xs focus:outline-none"
                    />
                    <button
                      onClick={saveNote}
                      className="border-primary bg-primary text-primary-foreground w-full border px-2 py-1 text-xs"
                    >
                      {">"} SAVE
                    </button>
                  </div>
                ) : current.note ? (
                  <p className="text-foreground text-xs">{current.note}</p>
                ) : (
                  <p className="text-muted-foreground text-xs italic">No note</p>
                )}
              </div>

              {/* Element Inspection */}
              <div className="border-border border-t p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">[INSPECT]:</span>
                  <button
                    onClick={() => {
                      setInspectMode(!inspectMode);
                      if (inspectMode) {
                        setSelectedElement(null);
                        setElementNote("");
                        try {
                          const doc = iframeRef.current?.contentDocument;
                          doc?.querySelectorAll(".vt-selected, .vt-hover").forEach((el) => {
                            el.classList.remove("vt-selected", "vt-hover");
                          });
                        } catch {}
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1 border px-2 py-1 text-xs transition-colors",
                      inspectMode
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary hover:text-primary"
                    )}
                  >
                    <Crosshair className="h-3 w-3" />
                    {inspectMode ? "ON" : "OFF"}
                  </button>
                </div>

                {inspectMode && (
                  <p className="text-muted-foreground/80 mb-2 text-xs">
                    Click element in preview to select
                  </p>
                )}

                {selectedElement && (
                  <div className="space-y-2">
                    <div className="border-primary/50 bg-primary/5 border border-dashed p-2">
                      <p className="text-primary text-xs break-all">{selectedElement}</p>
                    </div>

                    {/* Preset dropdown */}
                    <div className="relative">
                      <select
                        onChange={(e) => {
                          const preset = ISSUE_PRESETS.find((p) => p.label === e.target.value);
                          if (preset) {
                            setElementNote(preset.note);
                          }
                          e.target.value = "";
                        }}
                        className="border-border bg-muted/50 text-muted-foreground focus:border-primary w-full appearance-none border px-2 py-1.5 pr-7 text-xs focus:outline-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Quick select issue...
                        </option>
                        {ISSUE_PRESETS.map((preset) => (
                          <option key={preset.label} value={preset.label}>
                            {preset.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2" />
                    </div>

                    <textarea
                      value={elementNote}
                      onChange={(e) => setElementNote(e.target.value)}
                      placeholder="What's wrong with this element?"
                      className="border-border bg-background focus:border-primary h-14 w-full border p-2 text-xs focus:outline-none"
                    />
                    <button
                      onClick={addElementTag}
                      className="border-primary bg-primary text-primary-foreground w-full border px-2 py-1 text-xs"
                    >
                      <Target className="mr-1 inline h-3 w-3" />
                      TAG ELEMENT
                    </button>
                  </div>
                )}

                {/* Tagged Elements List */}
                {current.elements && current.elements.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-muted-foreground text-xs">
                      [TAGGED: {current.elements.length}]
                    </p>
                    <div className="max-h-32 space-y-1 overflow-y-auto">
                      {current.elements.map((tag) => (
                        <div
                          key={tag.timestamp}
                          className="group border-destructive/30 bg-destructive/5 flex items-start gap-1 border p-1.5"
                        >
                          <Target className="text-destructive mt-0.5 h-3 w-3 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-destructive truncate text-xs" title={tag.selector}>
                              {tag.selector}
                            </p>
                            {tag.note && (
                              <p className="text-muted-foreground truncate text-xs">{tag.note}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeElementTag(tag.timestamp)}
                            className="text-muted-foreground hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Export & Clear */}
              <div className="border-border space-y-1 border-t p-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => exportReport("json")}
                    className="border-border hover:bg-muted flex flex-1 items-center justify-center gap-1 border px-2 py-1 text-xs"
                    title="Export as JSON"
                  >
                    <Download className="h-3 w-3" />
                    .JSON
                  </button>
                  <button
                    onClick={() => exportReport("md")}
                    className="border-border hover:bg-muted flex flex-1 items-center justify-center gap-1 border px-2 py-1 text-xs"
                    title="Export as Markdown"
                  >
                    <FileText className="h-3 w-3" />
                    .MD
                  </button>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      setStates((prev) => {
                        const n = { ...prev };
                        delete n[currentPath];
                        return n;
                      })
                    }
                    className="border-border text-muted-foreground hover:bg-muted flex flex-1 items-center justify-center gap-1 border px-2 py-1 text-xs"
                  >
                    <Trash2 className="h-3 w-3" />
                    PAGE
                  </button>
                  <button
                    onClick={() => confirm("Clear ALL tagged items?") && setStates({})}
                    className="border-destructive/50 text-destructive hover:bg-destructive/10 flex flex-1 items-center justify-center gap-1 border px-2 py-1 text-xs"
                  >
                    <RotateCcw className="h-3 w-3" />
                    ALL
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
