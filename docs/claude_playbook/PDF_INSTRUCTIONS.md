# Creating PDF from the Claude Code Master Guide

## Current Files

✅ `Claude_Code_Master_Guide.md` - Source markdown (143 KB)
✅ `Claude_Code_Master_Guide.html` - Professional HTML version (303 KB)
📄 `Claude_Code_Master_Guide.pdf` - **Create using one of the methods below**

---

## Method 1: Browser Print to PDF (EASIEST - Do This Now!)

The HTML file should be open in your browser right now.

**Steps:**
1. Press `Cmd + P` (or go to File → Print)
2. In the print dialog:
   - **Destination:** Select "Save as PDF"
   - **Layout:** Portrait
   - **Margins:** Default
   - **Pages:** All
   - **Options:** ☑ Background graphics
3. Click **Save**
4. Save as: `Claude_Code_Master_Guide.pdf` in this same folder

**Result:** Professional PDF with table of contents, syntax highlighting, and proper formatting!

---

## Method 2: Install BasicTeX & Use Pandoc (For Future)

If you want to generate PDFs directly from markdown in the future:

```bash
# Install BasicTeX (will ask for your password)
brew install --cask basictex

# After installation, update PATH
eval "$(/usr/libexec/path_helper)"

# Then you can use pandoc to create PDF directly:
pandoc Claude_Code_Master_Guide.md -o Claude_Code_Master_Guide.pdf \
  --toc \
  --toc-depth=2 \
  --number-sections \
  --pdf-engine=xelatex \
  --highlight-style=tango \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V mainfont="Arial" \
  --metadata title="Claude Code Master Guide" \
  --metadata author="THEFT Studio"
```

**Note:** BasicTeX is 100+ MB and takes a few minutes to install.

---

## Method 3: Online Converter (No Installation)

If neither method above works:

1. Go to: https://www.markdowntopdf.com/
2. Upload `Claude_Code_Master_Guide.md`
3. Download the generated PDF

---

## ✅ Recommended: Method 1 (Browser)

Use the browser print-to-PDF method right now. It's:
- Instant (no installation)
- Professional quality
- Preserves all formatting
- Creates clickable table of contents

The HTML file is already open in your browser - just press **Cmd+P** and save as PDF!

---

© 2025 THEFT Studio | Internal Use Only
