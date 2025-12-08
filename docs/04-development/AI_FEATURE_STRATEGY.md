# AI Feature Strategy: The "Killer App" Plan

**Objective:** Elevate Fabrk from a "SaaS Boilerplate" to an "AI-Native Builder's Kit" by integrating high-value, "Lovable-style" AI features.
**Target Pricing:** $249 - $349 (Premium Tier).

---

## 1. Market Gap Analysis

| Feature Category | ShipFast & Competitors | Fabrk (Current) | The Opportunity |
| :--- | :--- | :--- | :--- |
| **UI Generation** | "Magic Copy" (Text Gen) | None | **"Prompt-to-UI" (Code Gen)** - The V0/Lovable killer feature. |
| **Docs/Support** | Basic Chatbots | None | **"Ask Docs" (RAG)** - Enterprise standard. |
| **Data Handling** | Basic CRUD | Prisma/Postgres | **"Smart Forms"** - AI-generated schemas & validation. |
| **Developer DX** | Standard Boilerplate | Terminal Aesthetic | **"CLI-style AI"** - Generate features via chat. |

---

## 2. The Feature Menu (Ranked by ROI)

We rank these by **Value** (How much allows you to raise price) vs. **Effort** (Dev time).

### 🥇 Tier 1: The "Lovable" Features (High Value / Medium Effort)
*These are showstoppers. They generate actual code/UI.*

#### 1. Prompt-to-Form Generator ("FormSmith")
*   **Concept:** User types "Contact form with name, email, and phone". System outputs React Hook Form + Zod code + Live Preview.
*   **Value:** Developer productivity hack. Saves 1-2 hours per form. "V0 for Forms".
*   **Effort:** Medium (1-2 Days). Needs Structured Output (JSON mode).
*   **Tech:** Vercel AI SDK, OpenAI/Ollama, Zod.

#### 2. AI Component Assembler
*   **Concept:** User types "Pricing section with 3 tiers". System picks the best component from your *existing* library and pre-fills the copy.
*   **Value:** "Instant Landing Pages".
*   **Effort:** Medium (2 Days).
*   **Tech:** Embeddings (to search your component library) or Structured Output.

### 🥈 Tier 2: The "Enterprise" Features (High Value / High Effort)
*These are expected in $1k+ kits but rare in $200 kits.*

#### 3. "Ask Docs" (RAG Chat)
*   **Concept:** Chat interface trained on your documentation. "How do I add Stripe?" -> "Go to `src/lib/stripe.ts`...".
*   **Value:** Huge for support and onboarding.
*   **Effort:** High (3-4 Days). Requires Vector Database (Supabase pgvector) + Embeddings Pipeline.
*   **Tech:** LangChain/LlamaIndex or Vercel AI SDK + pgvector.

### 🥉 Tier 3: The "Utility" Features (Low Value / Low Effort)
*   **Magic Copywriter:** Generate blog posts/emails. (Dime a dozen).
*   **Commit Message Gen:** Generate git messages. (Nice to have).
*   **Image Gen:** Wrapper around DALL-E. (Flashy but shallow).

---

## 3. Recommended "Launch Package"

To maximize impact for the least debt, we should build **The "Builder's AI Suite"**:

1.  **Core Infrastructure:**
    *   `useAI` hooks (Abstracted provider for OpenAI/Ollama).
    *   `<ChatInterface />` (Reusable, terminal-styled chat UI).
    *   `src/lib/ai` (Structured output helpers).

2.  **The Flagship Feature: "Prompt-to-Form"**
    *   It proves you can do "Structured Generation" (the hard part of AI).
    *   It fits the "Boilerplate" use case perfectly (setting up apps).
    *   It works locally with Ollama (huge privacy selling point).

---

## 4. Implementation Plan: "Prompt-to-Form"

### Phase 1: The Brain (1 Day)
*   Install `ai`, `zod`, `@ai-sdk/openai`, `@ai-sdk/ollama`.
*   Create `src/app/api/ai/generate/route.ts`.
*   Implement `generateObject` to force the AI to return a JSON schema (Fields, Types, Labels).

### Phase 2: The Body (1 Day)
*   Create `src/components/ai/form-preview.tsx`: A component that takes that JSON and renders a live Shadcn/Radix form.
*   Create `src/components/ai/code-viewer.tsx`: A component that takes the JSON and writes the `zod` and `useForm` code string for the user to copy.

### Phase 3: The Face (0.5 Days)
*   Create `src/app/(marketing)/library/ai-forms/page.tsx`.
*   Use the `<ChatInterface />` style input.
*   "Terminal Mode" output.

---

## 5. Technical Requirements

*   **Vercel AI SDK:** The industry standard for Next.js AI.
*   **Ollama:** For local, free dev testing (critical for "Zero Cost" dev story).
*   **OpenAI API Key:** For production power.
*   **Zod:** For schema validation (already installed).

## 6. Why NOT "Ask Docs" yet?
"Ask Docs" requires a Vector Database (Supabase/Pinecone). This adds a **dependency** for your customers.
"Prompt-to-Form" requires **ONLY** an API Key. It is much cleaner to sell as a "pure code" boilerplate. We can add RAG in V2.
