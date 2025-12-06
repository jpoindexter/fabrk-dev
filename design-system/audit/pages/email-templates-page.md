# Design System Audit: Email Templates Tutorial

**Route:** `/docs/tutorials/email-templates`
**File:** `src/app/docs/tutorials/email-templates/page.tsx`
**Category:** Tutorial Documentation
**Status:** ✅ ACCEPTABLE (Email HTML Requirements)

## Purpose
Tutorial page teaching developers how to create HTML email templates with inline styles for email client compatibility.

## Key Components
- FeatureGuideTemplate
- DocsSection, DocsCard, DocsLinkCard

## Violations Found

### Hex Colors (3 instances)
**Lines:** 129, 146, 148
**Context:** Inline styles within HTML email template code example

```tsx
// Line 129: Button background color
background-color: #6366f1;

// Line 146: HR border color
<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

// Line 148: Footer text color
<p style="color: #6b7280; font-size: 14px;">
```

**Severity:** ⚠️ WARNING
**Verdict:** **ACCEPTABLE - Email HTML requirement**

### Justification
1. **Email Client Limitations**: Email clients (Gmail, Outlook, etc.) don't support external CSS or CSS variables
2. **Industry Standard**: HTML emails **require** inline styles with hardcoded colors
3. **Documentation Accuracy**: Tutorial must show real-world email HTML that actually works
4. **Not Application Styling**: These colors are in a code example string, not styling the docs page

### Why Email HTML is Different
- ❌ **Web App**: Can use `className="bg-primary text-primary-foreground"` with CSS variables
- ✅ **Email HTML**: Must use `style="background-color: #6366f1; color: #ffffff;"` for compatibility

### Email Client Compatibility Matrix
| Feature | Web Browsers | Email Clients |
|---------|-------------|---------------|
| External CSS | ✅ Full support | ❌ No support |
| CSS Variables | ✅ Full support | ❌ No support |
| Inline Styles | ✅ Supported | ✅ **Required** |
| Hex Colors | ⚠️ Avoid (use tokens) | ✅ **Required** |

## Recommendation
**NO ACTION REQUIRED** - This is correct email development practice.

**Optional Enhancement**: Add a callout explaining why email HTML is different:

```tsx
<DocsCard title="EMAIL_STYLING_EXCEPTION">
  <p>Email HTML requires inline styles with hardcoded colors due to email client limitations.</p>
  <div className="space-y-1">
    <div>├─ ❌ Email clients don't support external CSS</div>
    <div>├─ ❌ Email clients don't support CSS variables</div>
    <div>├─ ✅ Use inline styles with hex colors</div>
    <div>└─ ✅ Test across Gmail, Outlook, Apple Mail</div>
  </div>
</DocsCard>
```

## Terminal Design Compliance
The documentation page itself follows terminal design:
- ✅ Uses FeatureGuideTemplate
- ✅ All page styling uses design tokens
- ✅ Code examples properly formatted in terminal-style blocks
- ✅ Monospace fonts for code

## Notes
This is a **perfect example** of context-dependent exceptions:
- **In React components**: Always use design tokens
- **In email HTML**: Use inline styles with hex colors (no choice)
- **In documentation**: Show the actual working code developers need

The page correctly demonstrates email HTML best practices.
