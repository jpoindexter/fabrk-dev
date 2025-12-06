# Content & Copy Inconsistencies Audit

> Phase 1 Inventory - Observation Only (No Changes)

## Overview

This audit documents all content/copy inconsistencies found across the Fabrk_plate codebase, including button text, labels, card headers, error messages, navigation labels, placeholders, and system labels.

---

## 1. Button Text Formats

### Severity: CRITICAL

**Expected Terminal Format:** `> TEXT_IN_UPPERCASE_WITH_UNDERSCORES`

### Correct Examples Found
| Location | Code |
|----------|------|
| `src/app/docs/components/button/page.tsx:16-120` | `> CLICK_ME`, `> SUBMIT`, `> CANCEL` |
| `src/app/docs/components/card/page.tsx:25,70,81` | `> ACTION`, `> CANCEL`, `> CONFIRM` |
| `src/app/contact/components/contact-form.tsx:225-229` | `> SENDING...`, `> EXECUTE: SEND_MESSAGE` |
| `src/components/landing/navigation.tsx:83,87,152,157,168` | `> VIEW_DEMO`, `> GET_STARTED`, `> START` |

### Inconsistencies Found

#### Pattern 1: Colon Separator Usage
| File | Uses Colon | No Colon |
|------|------------|----------|
| contact-form.tsx | `> EXECUTE: SEND_MESSAGE` | - |
| hero-section.tsx | `> EXECUTE: GET_FABRK` | - |
| hero-section.tsx | `> VIEW: LIVE_DEMO` | - |
| templates/user-management | - | `> ADD_USER` |
| docs/button/page.tsx | - | `> SUBMIT` |

**Issue:** No standardization on when to use `> VERB: OBJECT` vs `> VERB_OBJECT`

#### Pattern 2: Action Verb Standardization
- Simple verbs: `SUBMIT`, `DELETE`, `CANCEL`, `CONTINUE`
- Compound with EXECUTE: `EXECUTE: SEND_MESSAGE`, `EXECUTE: GET_FABRK`
- Compound without EXECUTE: `VIEW_DEMO`, `GET_STARTED`, `ADD_USER`

**Issue:** Some destructive/submission actions use `EXECUTE:` prefix, others don't

---

## 2. Label Formats

### Severity: MEDIUM

**Expected Terminal Format:** `[LABEL_IN_UPPERCASE]:`

### Correct Examples Found
| Location | Example |
|----------|---------|
| `src/app/docs/components/input/page.tsx:37` | `[EMAIL]:` |
| `src/app/docs/components/checkbox/page.tsx:25` | `[ACCEPT_TERMS_AND_CONDITIONS]:` |
| `src/app/docs/components/checkbox/page.tsx:52` | `[SUBSCRIBE_TO_NEWSLETTER]:` |
| `src/app/docs/components/checkbox/page.tsx:89-95` | `[OPTION_1]:`, `[OPTION_2]:`, `[OPTION_3]:` |

### Inconsistencies Found

#### Pattern 1: Rendered vs Code Example Mismatch
| Location | Code Example Shows | Rendered Output |
|----------|-------------------|-----------------|
| input/page.tsx:32 | `formatLabel("Email")` → `[EMAIL]:` | Plain text "Email Address" in preview |
| checkbox/page.tsx:20,47 | Uses `formatLabel()` function | Preview shows different format |

**Issue:** Documentation code examples show bracket format, but actual rendered previews show plain text

#### Pattern 2: Casing Variations
- In brackets: `[ACCEPT_TERMS_AND_CONDITIONS]:` (uppercase with underscores)
- Without brackets: "Email Address", "Accept terms and conditions" (sentence case)

---

## 3. Card Header/Title Formats

### Severity: HIGH

**Expected Terminal Format:** `[ [0xHEX_CODE] TITLE_IN_UPPERCASE ]`

### Correct Examples Found
| Location | Example |
|----------|---------|
| `src/components/landing/hero-section.tsx:231` | `[ [0x00] SYSTEM_INIT ] SAAS_BOILERPLATE_v2.0` |
| `src/components/landing/hero-section.tsx:257` | `[ [0x01] STATUS ]────────────────────────` |
| `src/components/landing/hero-section.tsx:297` | `[ [0x02] POWERED_BY ] FIB[1,1,2,3,5,8,13]` |
| `src/app/contact/components/contact-form.tsx:96` | `[0x01] message_composer.exe │ PID:4096` |

### Inconsistencies Found

#### Pattern 1: Hex vs UI Dot Notation
| Location | Format Used |
|----------|-------------|
| hero-section.tsx | `[0x00]`, `[0x01]`, `[0x02]` (hex format) |
| docs/components/button/page.tsx:10 | `[UI.01]` (bracket + dot notation) |
| docs/components/input/page.tsx:11 | `[UI.02]` (bracket + dot notation) |
| docs/components/card/page.tsx:10 | `[UI.10]` (bracket + dot notation) |
| docs/components/alert-dialog/page.tsx:20 | `[UI.21]` (bracket + dot notation) |

**Issue:** Two competing code systems - hex (`0xXX`) vs UI designation (`UI.XX`)

#### Pattern 2: Bracket Wrapping Styles
| Style | Example | Location |
|-------|---------|----------|
| Double nested | `[ [0x00] TITLE ]` | hero-section.tsx |
| Single with code | `[0x01] title` | contact-form.tsx |
| Component prop | `code="[UI.01]"` | docs pages |

**Issue:** Three different structural patterns for the same visual concept

#### Pattern 3: Title Positioning
- Landing: `[ [0xXX] TITLE ] EXTRA_TEXT` (inline suffix)
- Contact form: `[0xXX] description │ extra` (pipe separator)
- Docs: Separate `code` and `title` props

---

## 4. Error/Success/Warning Message Formats

### Severity: MEDIUM

### Correct Examples Found
| Location | Type | Format |
|----------|------|--------|
| `contact-form.tsx:201` | Success | `[OK] MESSAGE_SENT - We've received your message...` |
| `contact-form.tsx:213` | Error | `[ERROR] {errorMessage}` |

### Inconsistencies Found

#### Missing Patterns
- `[WARNING]` format not found in codebase despite being documented in design system
- No standardized info message format `[INFO]`

#### Prefix Variations
- Success: `[OK]`
- Error: `[ERROR]`
- Warning: Not implemented
- Info: Not implemented

---

## 5. Navigation Labels

### Severity: MEDIUM

### Examples Found

#### Landing Navigation (UPPERCASE)
| Location | Labels |
|----------|--------|
| `navigation.tsx:21-24` | `FEATURES`, `PRICING`, `DOCS`, `FAQ` |

#### Dashboard Navigation (Title Case)
| Location | Labels |
|----------|--------|
| `navigation.tsx:41-44` | `Dashboard`, `Settings`, `Billing`, `API Keys` |
| `dashboard-header.tsx:41-44` | `Dashboard`, `Settings`, `Billing`, `API Keys` |

### Inconsistency
| Context | Casing Used |
|---------|-------------|
| Landing page nav | UPPERCASE |
| Dashboard nav | Title Case |

**Issue:** Same navigation pattern uses different casing based on context, but no documented rule

---

## 6. Placeholder Text

### Severity: MEDIUM

### Examples Found

#### With `>` Prefix (Contact Form)
| Location | Placeholder |
|----------|-------------|
| `contact-form.tsx:122` | `> Enter your name...` |
| `contact-form.tsx:140` | `> Enter your email...` |
| `contact-form.tsx:158` | `> Select a subject...` |
| `contact-form.tsx:184` | `> Tell us more about your inquiry...` |

#### Without `>` Prefix (Docs)
| Location | Placeholder |
|----------|-------------|
| `input/page.tsx:17` | `Enter your email...` |
| `input/page.tsx:24` | `Type here...` |
| `input/page.tsx:33` | `m@example.com` |

### Inconsistency
| Context | Uses `>` Prefix |
|---------|-----------------|
| Contact form inputs | Yes |
| Documentation examples | No |

**Issue:** Terminal-style prompt prefix (`>`) inconsistently applied to placeholders

---

## 7. System Labels/Prefixes

### Severity: HIGH

### Examples Found
| Location | Label | Format |
|----------|-------|--------|
| `navigation.tsx:59` | `[NAVIGATE]:` | Single bracket + colon |
| `navigation.tsx:115` | `[SYSTEM_MENU]` | Single bracket, no colon |
| `navigation.tsx:136` | `[THEME]:` | Single bracket + colon |
| `navigation.tsx:144` | `[ACTIONS]:` | Single bracket + colon |
| `hero-section.tsx:231` | `[ [0x00] SYSTEM_INIT ]` | Nested brackets |
| `contact-form.tsx:103` | `[MESSAGE_FORM]` | Single bracket, no colon |

### Inconsistencies Found

#### Pattern 1: Colon Usage
| With Colon | Without Colon |
|------------|---------------|
| `[NAVIGATE]:` | `[SYSTEM_MENU]` |
| `[THEME]:` | `[MESSAGE_FORM]` |
| `[ACTIONS]:` | `[ [0x00] SYSTEM_INIT ]` |

**Issue:** No rule for when labels should include trailing colon

#### Pattern 2: Bracket Nesting
| Single Brackets | Nested Brackets |
|-----------------|-----------------|
| `[NAVIGATE]:` | `[ [0x00] TEXT ]` |
| `[THEME]:` | - |

**Issue:** Hex codes use nested brackets, other labels use single

#### Pattern 3: Separator Characters
| Separator | Example | Location |
|-----------|---------|----------|
| Pipe `│` | `│ PID:4096` | contact-form.tsx |
| Dashes `────` | `────────────────────────` | hero-section.tsx |
| None | `[ [0x00] TITLE ] TEXT` | hero-section.tsx |

---

## 8. Form Submission Patterns

### Severity: MEDIUM

### Examples Found
| Location | Button Text | Pattern |
|----------|-------------|---------|
| `contact-form.tsx:229` | `> EXECUTE: SEND_MESSAGE` | EXECUTE prefix |
| `hero-section.tsx:282-283` | `> EXECUTE: GET_FABRK` | EXECUTE prefix |
| `form/page.tsx:68` | `> SUBMIT` | Simple verb |
| `card/page.tsx:25` | `> ACTION` | Simple verb |

### Inconsistency
| Pattern | Example | When Used |
|---------|---------|-----------|
| `> VERB` | `> SUBMIT`, `> DELETE` | Generic actions |
| `> EXECUTE: ACTION` | `> EXECUTE: SEND_MESSAGE` | Complex actions |

**Issue:** No documented rule for when to use `EXECUTE:` prefix

---

## Summary Table

| Category | Severity | Primary Issue | Files Affected |
|----------|----------|---------------|----------------|
| Button Text | CRITICAL | Colon usage inconsistent | contact-form, hero-section, navigation |
| Button Text | MEDIUM | EXECUTE prefix rules unclear | form, contact-form, hero-section |
| Labels | MEDIUM | formatLabel output mismatch | input/page, checkbox/page |
| Card Headers | HIGH | Hex vs UI.XX code systems | All docs pages vs landing |
| Card Headers | MEDIUM | Bracket nesting patterns | hero-section vs contact-form |
| Messages | MEDIUM | Missing [WARNING] pattern | N/A |
| Navigation | MEDIUM | UPPERCASE vs Title Case | navigation.tsx, dashboard-header.tsx |
| Placeholders | MEDIUM | Inconsistent `>` prefix | contact-form vs docs pages |
| System Labels | HIGH | Colon/bracket inconsistent | navigation.tsx, hero-section.tsx |
| Form Actions | MEDIUM | VERB vs EXECUTE:ACTION | Multiple components |

---

## Key Findings

1. **Two Code Systems:** Hex codes (`0xXX`) used in marketing, UI notation (`UI.XX`) used in docs
2. **Button Compound Actions:** No standard for `> VERB_OBJECT` vs `> EXECUTE: VERB_OBJECT`
3. **Label Rendering Gap:** Code examples show `[LABEL]:` but previews show plain text
4. **Context-Based Casing:** Landing uses UPPERCASE, dashboard uses Title Case
5. **Placeholder Prefix:** Terminal `>` prompt used in some inputs, not others
6. **Missing Message Types:** `[WARNING]` and `[INFO]` not implemented
7. **Colon Rules Undefined:** System labels inconsistently use trailing colons

---

## Issue Count by Category

| Category | Issues Found |
|----------|--------------|
| Button Text | 4 |
| Labels | 2 |
| Card Headers | 3 |
| Messages | 2 |
| Navigation | 1 |
| Placeholders | 1 |
| System Labels | 3 |
| Form Actions | 1 |
| **Total** | **17** |

---

*Generated: Phase 1 Audit - Observation Only*
