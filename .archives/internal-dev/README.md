# Internal Development Documentation Archive

Historical development documentation and internal guides.

## Contents

### CLAUDE-DEV.md

Development version of CLAUDE.md with sync workflow instructions.

**Key Differences from Official CLAUDE.md:**
- Includes sync workflow instructions (`./scripts/sync-to-official.sh`)
- References 234 components (outdated - now 77 components)
- Mentions DaisyUI with 20 themes (outdated - now terminal-only design)
- Contains development-specific context

**Why Archived:**
This file contains outdated information that conflicts with the current official CLAUDE.md:
- Component count: 234 → 77 (focused on quality over quantity)
- Design system: DaisyUI 20 themes → Terminal-only design (14 CRT variants)
- Tech stack references that no longer match current state

### GITHUB_SECURITY_CHECKLIST.md

Security checklist for GitHub repository configuration and best practices.

**Contents:**
- Repository settings security
- Branch protection rules
- Secrets management
- Dependency scanning
- Code scanning setup

---

## Current Documentation

All development instructions are now in:
- **CLAUDE.md** (root) - Official development guide
- **docs/08-design/DESIGN_SYSTEM.md** - Design system specification
- **.internal/** - Active internal documentation

---

**Archived:** December 12, 2025
**Reason:** Outdated information that could conflict with current official documentation
**Status:** Historical reference only
