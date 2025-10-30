# Claude Code Master Guide - Playbook

## Files in this Directory

- **Claude_Code_Master_Guide.md** - Complete playbook in Markdown format (6,216 lines, ~50-55 pages)
- **Claude_Code_Master_Guide.html** - Professional HTML version (303 KB) ✅
- **Claude_Code_Master_Guide.pdf** - Create from HTML (see PDF_INSTRUCTIONS.md)
- **PDF_INSTRUCTIONS.md** - Step-by-step guide to create PDF ⭐
- **assets/** - Directory for any diagrams or images

## Creating PDF (Easiest Method)

**The HTML file is already created and should be open in your browser right now!**

**Quick Steps:**
1. Press `Cmd + P` (to print)
2. Select "Save as PDF" as destination
3. Save to this folder
4. Done! ✅

For detailed instructions and alternatives, see: **PDF_INSTRUCTIONS.md**

## Converting to DOCX (Alternative)

The markdown file can also be converted to DOCX using one of these methods:

### Option 1: Using Pandoc (Recommended)

```bash
# Install pandoc (Mac)
brew install pandoc

# Convert to DOCX
pandoc Claude_Code_Master_Guide.md -o Claude_Code_Master_Guide.docx \
  --toc \
  --toc-depth=2 \
  --number-sections \
  --highlight-style=tango \
  --reference-doc=custom-reference.docx  # Optional: for custom styling
```

### Option 2: Online Converter
- https://www.markdowntodocx.com/
- Upload `Claude_Code_Master_Guide.md`
- Download the generated DOCX

### Option 3: VS Code Extension
- Install "Markdown PDF" extension
- Open the .md file
- Right-click → "Markdown PDF: Export (docx)"

## Contents

### Main Sections
1. Executive Overview
2. Part I: AI as a Coach
3. Part II: Context Engineering
4. Part III: Advanced Prompting Techniques
5. Part IV: Claude Code Workflow Mastery
6. Part V: MCP Servers
7. Part VI: Subagents & Parallel Execution
8. Part VII: Skills & Commands
9. Part VIII: Startup Validation Playbook
10. Part IX: Technical Building Strategies
11. Part X: Production Best Practices

### Appendices
- Appendix A: Top 50 Claude Prompt Patterns
- Appendix B: File Organization Reference
- Appendix C: Tools & Resources

## Features

- **800+ hours of learning** distilled into actionable content
- **50 copy-paste ready prompt patterns** covering all major use cases
- **Real-world examples** from production projects
- **Verbose prompts** you can use immediately
- **Comprehensive coverage** from basics to advanced orchestration

## Usage

This is an internal playbook for THEFT Studio. Use it as:
- Quick reference for prompt patterns
- Training material for new team members
- Source of truth for AI development workflows
- Living document (update as you learn)

---

© 2025 THEFT Studio | Internal Use Only
