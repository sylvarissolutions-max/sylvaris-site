# Sylvaris Design Tokens Catalog

> Extracted from `/mnt/c/agentchain/sylvaris-site/index.html` (inline `<style>` block, lines 24-1104)
> and `/mnt/c/agentchain/sylvaris-site/legal.css` (lines 1-261).
> Read-only catalog. Source of truth for Vite refactor.

---

## 1. Color Tokens

### CSS Custom Properties (`:root`)

Both `index.html` and `legal.css` declare an identical `:root` block. `index.html` adds five extra tokens not present in `legal.css` — marked with `[main only]`.

| Token | Value | Semantic Use |
|-------|-------|-------------|
| `--bg` | `#060610` | Page background (deepest layer) |
| `--bg-elev` | `#0b0b18` | Elevated background, card bottoms (gradient terminus) |
| `--surface` | `#0f0f1c` | Card / panel surface (gradient start) |
| `--surface-2` | `#16162a` | Secondary surface: cockpit footer, mock cells, mock rows, btn-ghost bg, mobile nav bg |
| `--surface-3` | `#1d1d35` | Tertiary surface [main only] - declared but not visibly applied in current markup |
| `--border` | `#22223a` | Default border color, dividers, horizontal rules |
| `--border-strong` | `#30304a` | Hover-state border, stronger dividers |
| `--text` | `#ececf4` | Primary text (headings, labels, strong values) |
| `--text-dim` | `#8c8ca3` | Secondary text (body copy, captions, nav links) |
| `--text-mute` | `#585868` | Muted/tertiary text (timestamps, legal markers, footnotes) |
| `--accent` | `#6366f1` | Primary indigo accent (overline dot, vertical bar accents, borders, btn base) |
| `--accent-bright` | `#818cf8` | Lighter indigo (overline text, gradient tops, featured row text) |
| `--accent-dim` | `#4338ca` | Darker indigo (gradient bottoms, btn shadows) |
| `--accent-glow` | `rgba(99, 102, 241, 0.22)` | Ambient glow fill [main only] |
| `--accent-soft` | `rgba(99, 102, 241, 0.08)` | Soft tint overlay [main only] |
| `--cyan` | `#22d3ee` | Cyan accent for gradient stops [main only] |
| `--success` | `#22c55e` | Green: live status dots, resolved ticks, cockpit live badge [main only] |
| `--warn` | `#f59e0b` | Amber: pending/escalated state chip [main only] |
| `--ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Easing function (stored in `:root`) |

### Hardcoded Colors (not in custom properties)

These appear verbatim in the stylesheet and markup. Flag for token promotion.

| Value | Where used | Suggest Token |
|-------|-----------|--------------|
| `#fff` | btn text color, brand-mark text, mask layer references | `--color-white` |
| `#22c55e` | cockpit dots first-child bg, live dot bg, `.mock-dot.live`, `.mock-row span.ok` | alias `--success` |
| `#22c55e80` | cockpit dot glow (`.dots span:first-child` box-shadow) | `--success-glow` |
| `#22c55e66` | mock live dot glow (`.mock-dot.live` box-shadow) | `--success-glow-2` |
| `#f59e0b` | `.mock-row span.pending` text color | alias `--warn` |
| `rgba(99, 102, 241, …)` | Used pervasively in gradients and shadows — various opacity levels: 0.03, 0.035, 0.04, 0.05, 0.06, 0.08, 0.1, 0.12, 0.15, 0.16, 0.18, 0.2, 0.22, 0.25, 0.35, 0.4, 0.5, 0.6, 0.7, 0.8 | Use `--accent` + opacity utilities |
| `rgba(34, 211, 238, 0.3)` | Gradient border stop (cockpit `::before`, featured price `::before`) | Combine with `--cyan` |
| `rgba(34, 211, 238, 0.4)` | Featured price border gradient (main only) | Same |
| `rgba(0, 0, 0, 0.5)` | Shadow depth (showcase-card, faq-aside, callout, legal-panel) | `--shadow-depth-1` |
| `rgba(0, 0, 0, 0.6)` | Shadow depth (price, trust-item, cockpit) | `--shadow-depth-2` |
| `rgba(0, 0, 0, 0.7)` | Shadow depth (compare-wrap, final-meta, problem-panel) | `--shadow-depth-3` |
| `rgba(0, 0, 0, 0.8)` | Shadow depth (mock panel) | `--shadow-depth-4` |
| `rgba(255, 255, 255, 0.02)` | Inset highlight (showcase-card, price) | `--inset-glow-faint` |
| `rgba(255, 255, 255, 0.03)` | Inset highlight (compare-wrap, callout, faq-aside, legal-panel) | `--inset-glow-subtle` |
| `rgba(255, 255, 255, 0.04)` | Inset highlight (btn-ghost, mock, final-meta, problem-panel, cockpit) | `--inset-glow-soft` |
| `rgba(255, 255, 255, 0.06)` | Inset highlight (featured price, product:hover .mock) | `--inset-glow-medium` |
| `rgba(255, 255, 255, 0.1)` | Inset highlight (brand-mark) | `--inset-glow-strong` |
| `rgba(255, 255, 255, 0.12)` | btn ::before shimmer gradient | `--shimmer` |
| `rgba(255, 255, 255, 0.15)` | btn box-shadow top inset | `--btn-inset-default` |
| `rgba(255, 255, 255, 0.18)` | btn:hover box-shadow top inset | `--btn-inset-hover` |
| `rgba(6, 6, 16, 0.72)` | nav background (semi-transparent) | Use `--bg` + 0.72 opacity |
| `#5b5bf0` | Favicon SVG fill, price list checkmark SVG fill | Near-alias of `--accent` — consolidate |

---

## 2. Gradient Tokens

### Named Gradient Variables (`:root`, main only)

| Token | Value | Use |
|-------|-------|-----|
| `--grad-hero` | `radial-gradient(ellipse at 70% 40%, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 55%)` | Hero section ambient wash |
| `--grad-border` | `linear-gradient(135deg, rgba(99, 102, 241, 0.5) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(34, 211, 238, 0.3) 100%)` | Gradient border mask technique |
| `--grad-surface` | `linear-gradient(180deg, rgba(99, 102, 241, 0.04) 0%, rgba(99, 102, 241, 0) 100%)` | Subtle surface tint overlay |

### Inline Gradients (hardcoded in rules)

| Element / Class | Gradient | Direction / Type |
|-----------------|----------|-----------------|
| `body::before` (grid) | `linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px)` + `linear-gradient(90deg, …)` | Ambient grid lines |
| `body::after` (glow blob) | `radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.06) 30%, rgba(99,102,241,0) 65%)` | Hero glow behind cockpit |
| `body::before` (legal.css) | Same grid but `0.03` opacity instead of `0.035` | Legal page grid |
| `.nav::after` | `linear-gradient(180deg, rgba(99,102,241,0.04) 0%, transparent 100%)` | Nav bottom tint |
| `.btn` | `linear-gradient(180deg, var(--accent-bright) 0%, var(--accent) 50%, var(--accent-dim) 100%)` | Primary button fill |
| `.btn::before` | `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%)` | Button top shimmer |
| `.brand-mark` | `linear-gradient(135deg, var(--accent-bright) 0%, var(--accent) 50%, var(--accent-dim) 100%)` | Logo mark background |
| `.cockpit` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.cockpit::before` | `linear-gradient(135deg, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0.05) 40%, rgba(34,211,238,0.3) 100%)` | Gradient border (mask technique) |
| `.cockpit-head` | `linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 100%)` | Panel header tint |
| `.problem-panel` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.problem-stat-num` | `linear-gradient(180deg, var(--text) 0%, var(--accent-bright) 140%)` | Gradient text fill |
| `.mock` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.compare tr.sylvaris td` | `linear-gradient(90deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 100%)` | Highlighted table row |
| `.compare-wrap` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.showcase-card` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.price` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.price-amt` | `linear-gradient(180deg, var(--text) 0%, var(--text-dim) 140%)` | Gradient text fill |
| `.price.featured` | `linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 100%)` layered over panel fill | Featured card overlay |
| `.price.featured::before` | `linear-gradient(180deg, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0.2) 60%, rgba(34,211,238,0.4) 100%)` | Featured card gradient border |
| `.price.featured::after` (badge) | `linear-gradient(135deg, var(--accent-bright) 0%, var(--accent) 100%)` | "Recommended" badge |
| `.callout` | `linear-gradient(135deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.callout::before` | `radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 60%)` | Decorative glow, top-right |
| `.trust-item` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.faq-aside` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.faq-aside::before` | `radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)` | Decorative glow, top-right |
| `.final-meta` | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |
| `.legal-panel` (legal.css) | `linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` | Panel fill |

**Recurring pattern — surface card fill:**
`linear-gradient(180deg, var(--surface) 0%, var(--bg-elev) 100%)` — used 10+ times. Extract as `--grad-card`.

---

## 3. Shadow Tokens

### Named Shadow Variables (`:root`, main only)

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-card` | `0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)` | Default card shadow |
| `--shadow-glow` | `0 0 80px -20px rgba(99,102,241,0.5)` | Hero glow layer |

### Inline Shadows (grouped by semantic use)

**Overline dot / live dot glow (text-shadow / box-shadow):**
| Element | Shadow |
|---------|--------|
| `.overline::before` box-shadow | `0 0 8px var(--accent)` |
| `.legal-overline::before` box-shadow | `0 0 8px var(--accent)` |
| `.cockpit-head .live::before` box-shadow | `0 0 8px #22c55e` |
| `.cockpit-head .dots span:first-child` | `0 0 8px #22c55e80` |
| `.mock-dot.live` | `0 0 6px #22c55e66` |

**Brand mark:**
| Element | Shadow |
|---------|--------|
| `.brand-mark` | `0 4px 12px -2px rgba(99,102,241,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset` |

**Button — default:**
| Element | Shadow |
|---------|--------|
| `.btn` | `0 1px 0 rgba(255,255,255,0.15) inset, 0 6px 16px -6px rgba(99,102,241,0.6), 0 0 0 1px rgba(99,102,241,0.1)` |

**Button — hover:**
| Element | Shadow |
|---------|--------|
| `.btn:hover` | `0 1px 0 rgba(255,255,255,0.18) inset, 0 12px 28px -8px rgba(99,102,241,0.7), 0 0 0 1px rgba(99,102,241,0.2)` |

**Button ghost:**
| Element | Shadow |
|---------|--------|
| `.btn-ghost` | `0 1px 0 rgba(255,255,255,0.04) inset` |

**Cockpit panel:**
| Element | Shadow |
|---------|--------|
| `.cockpit` | `0 40px 80px -32px rgba(99,102,241,0.4), 0 0 0 1px rgba(99,102,241,0.12) inset, 0 1px 0 rgba(255,255,255,0.04) inset` |

**Problem panel:**
| Element | Shadow |
|---------|--------|
| `.problem-panel` | `0 40px 80px -32px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.08) inset, 0 1px 0 rgba(255,255,255,0.04) inset` |

**Mock dashboard (product):**
| State | Shadow |
|-------|--------|
| Default | `0 24px 60px -28px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.08) inset, 0 1px 0 rgba(255,255,255,0.04) inset` |
| Hover | `0 32px 70px -28px rgba(99,102,241,0.35), 0 0 0 1px rgba(99,102,241,0.16) inset, 0 1px 0 rgba(255,255,255,0.06) inset` |

**Compare wrap:**
| Element | Shadow |
|---------|--------|
| `.compare-wrap` | `0 24px 60px -32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset` |

**Showcase card:**
| State | Shadow |
|-------|--------|
| Default | `0 20px 40px -24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset` |
| Hover | `0 28px 48px -20px rgba(99,102,241,0.25), 0 0 0 1px rgba(99,102,241,0.1) inset` |

**Price card:**
| State | Shadow |
|-------|--------|
| Default | `0 20px 40px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset` |
| Hover | `0 32px 60px -24px rgba(99,102,241,0.25), 0 0 0 1px rgba(99,102,241,0.1) inset` |

**Featured price card:**
| State | Shadow |
|-------|--------|
| Default | `0 40px 80px -32px rgba(99,102,241,0.5), 0 0 0 1px rgba(99,102,241,0.35) inset, 0 1px 0 rgba(255,255,255,0.06) inset` |

**Price featured badge:**
| Element | Shadow |
|---------|--------|
| `.price.featured::after` | `0 4px 12px -2px rgba(99,102,241,0.6)` |

**Callout:**
| Element | Shadow |
|---------|--------|
| `.callout` | `0 20px 40px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset` |

**Trust item:**
| State | Shadow |
|-------|--------|
| Default | `0 12px 24px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset` |
| Hover | `0 16px 32px -16px rgba(99,102,241,0.25), 0 0 0 1px rgba(99,102,241,0.12) inset` |

**FAQ aside:**
| Element | Shadow |
|---------|--------|
| `.faq-aside` | `0 20px 40px -24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset` |

**Final meta panel:**
| Element | Shadow |
|---------|--------|
| `.final-meta` | `0 40px 80px -32px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.08) inset, 0 1px 0 rgba(255,255,255,0.04) inset` |

**Legal panel (legal.css):**
| Element | Shadow |
|---------|--------|
| `.legal-panel` | `0 20px 40px -24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset` |

---

## 4. Border / Radius Tokens

### Border Radius Values

| Value | Used on |
|-------|---------|
| `50%` | All dot indicators (overline, trust, status, cockpit, hero-trust) |
| `2px` | Section vertical bars (`.section-head::before`, `.problem-copy::before`, `.faq-intro::before`, `.final-copy::before`, legal bar) |
| `3px` | Problem panel top corner bar (`.problem-panel::before`) |
| `4px` | Price featured badge, showcase tag, mock-row, price list item divider (indirect) |
| `6px` | Brand mark |
| `8px` | Primary buttons |
| `10px` | Trust item cards |
| `12px` | Mock panel, FAQ aside, legal-panel |
| `14px` | Showcase card, compare-wrap, price card, cockpit, callout, featured price `::before` |
| `16px` | Problem panel, final-meta |
| `6px` | Mock cell (inner cell within mock) |

### Border Width + Color Combinations

| Value | Used on |
|-------|---------|
| `1px solid var(--border)` | Default border everywhere (nav, hero, sections, cockpit rows, mock, price, compare, faq, footer) |
| `1px solid var(--border-strong)` | Hover state borders (showcase-card:hover, price:hover, trust-item:hover, btn-ghost:hover) |
| `1px solid var(--accent)` | Primary button border |
| `border-color: transparent` | Featured price card (border replaced by pseudo-element gradient trick) |
| `2px` (width only) | Section vertical accent bars via `width: 2px` and `background: var(--accent)` |
| `3px` (width only) | Problem panel top-left bar via `width: 3px` |

---

## 5. Typography Tokens

### Font Families

| Family | Stack | Use |
|--------|-------|-----|
| Inter | `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif` | Body, headings, buttons, all default text |
| JetBrains Mono | `'JetBrains Mono', ui-monospace, monospace` | Overlines, cockpit, mocks, process counters, price badges, final-meta, legal-meta |

**Load method:** Google Fonts via `<link>` preconnect + stylesheet.
Weights loaded: Inter 400, 500, 600, 700 / JetBrains Mono 400, 500.

### Font Weights Used

| Weight | Label | Where |
|--------|-------|-------|
| `400` | Regular | Body paragraphs, faq answers, `price-amt small` |
| `500` | Medium | h4, nav links weight, btn, overline, `.brand`, many label classes |
| `600` | SemiBold | h1, h2, h3, brand-mark, footer col headings, `.btn` (not stated but implied), `.price.featured td` |
| `700` | Bold | Brand mark letter ("S"), OG image headings |

### Font Sizes — By Semantic Level

| Level | Value(s) | Token suggestion |
|-------|----------|-----------------|
| **h1** | `clamp(40px, 4.6vw, 60px)` | `--text-h1` |
| **h2** | `clamp(28px, 3.4vw, 42px)` | `--text-h2` |
| **h2 (legal)** | `clamp(32px, 4.4vw, 46px)` | `--text-h2-legal` |
| **h2 (legal section)** | `22px` (legal.css) | `--text-h2-section` |
| **h3** | `20px` (default), `26px` (`.product-info h3`), `16px` (`.risk h3`, `.legal h3`) | `--text-h3`, `--text-h3-product` |
| **h4** | `15px` (default), `18px` (`.showcase-card h4`) | `--text-h4` |
| **h5** | `12px` (footer col) | `--text-h5` |
| **Large stat** | `clamp(56px, 7vw, 84px)` (`.problem-stat-num`), responsive min `44px` at 560px | `--text-stat` |
| **Price amount** | `36px` | `--text-price` |
| **Body** | `16px` (default), `15px` (legal body, `.product-info p`, `.section-head p`) | `--text-body` |
| **Hero subheading** | `18px` | `--text-hero-sub` |
| **Small body** | `14px` (compare, faq-q, price ul, footer-brand p) | `--text-sm` |
| **Caption / small** | `13px` (btn-sm, nav-links, footer-col links, price-name, callout spans) | `--text-xs` |
| **Micro** | `12px` (hero-trust, overline, cockpit head title, footer bottom, legal-meta) | `--text-micro` |
| **Nano** | `11px` (overline label, cockpit head live, stat-label, process counter, final-meta-head) | `--text-nano` |
| **Dot/widget** | `10px` (cockpit foot, mock-title, mock-cell-label, price badge, showcase-tag) | `--text-dot` |
| **Overline** | `11px`, `JetBrains Mono`, `uppercase`, `letter-spacing: 0.14em` | Composite token |

### Line Heights

| Value | Used on |
|-------|---------|
| `1.08` | h1 |
| `1.12` | h2 |
| `1.15` | h1/h2/h3/h4 base rule |
| `1.55` | body (main) |
| `1.6` | `.faq-a` |
| `1.65` | body (legal.css), `.legal li` |
| `1.7` | `.legal p` |
| `1` | `.problem-stat-num` (tight stat number) |

### Letter Spacing Values

| Value | Used on |
|-------|---------|
| `-0.04em` | `.problem-stat-num` |
| `-0.035em` | h1 |
| `-0.03em` | `.legal h1` |
| `-0.025em` | h2, `.price-amt` |
| `-0.02em` | h1/h2/h3/h4 base rule |
| `-0.015em` | h3, `.showcase-card h4`, `.legal h2` |
| `0` | (default) |
| `0.04em` | `.cockpit-head .title`, `.problem-source` |
| `0.06em` | `.cockpit-foot` |
| `0.08em` | `.compare th`, `.showcase-tag`, `.mock-cell-label`, `.price-name`, `.mock-row`, `.risk-item h4`, `.footer-col h5`, `.legal-overline` (same as overline) |
| `0.1em` | `.stat-label`, `.final-meta-head`, `.footer-col h5`, `.legal h2` letter-spacing also `-0.015em` |
| `0.12em` | `.price.featured::after` badge |
| `0.14em` | `.overline`, `.legal-overline` |

### Font Feature Settings

| Value | Where |
|-------|-------|
| `'ss01', 'cv11'` | `body` in `index.html` only (not in legal.css) |

---

## 6. Spacing Tokens

### Unique Values Extracted (padding / margin / gap)

Collected from all padding, margin, and gap declarations:

`4px`, `6px`, `7px`, `8px`, `9px`, `10px`, `12px`, `13px`, `14px`, `16px`, `18px`, `20px`, `22px`, `24px`, `26px`(?), `28px`, `30px`, `32px`, `36px`, `40px`, `48px`, `56px`, `60px` (height), `64px`, `72px`, `80px`, `88px`(?), `96px`, `120px`

### Suggested Rational Scale

Map all values to the following 4-base scale:

| Token | Value | Used for |
|-------|-------|---------|
| `--space-1` | `4px` | Micro gaps (badge padding y, dot gap) |
| `--space-2` | `8px` | Small inline gap (btn gap, list gap, cockpit dot gap) |
| `--space-3` | `12px` | Compact padding (btn-sm y, cockpit foot y, mock-bar bottom) |
| `--space-4` | `16px` | Base unit (compare cell padding y, footer col h5 mb, hero-actions mb partial) |
| `--space-5` | `20px` | Section-head padding-left, hero trust pt, trust overline mb |
| `--space-6` | `24px` | Container mobile padding, legal list padding-left, gap many contexts |
| `--space-7` | `28px` | Pricing gap, nav-links gap, faq-q padding-y |
| `--space-8` | `32px` | Container padding, footer-bottom pt, problem panel padding small |
| `--space-9` | `36px` | price padding y, final-meta padding |
| `--space-10` | `40px` | Pricing callout margin-top, risk pt, legal-head pb small bp |
| `--space-12` | `48px` | trust-strip padding y, footer padding, section padding at 880px |
| `--space-14` | `56px` | hero-inner gap, section-head mb partial |
| `--space-16` | `64px` | section-head mb, product padding, footer-grid gap (large) |
| `--space-18` | `72px` | problem-layout gap, faq-layout gap, final-layout gap, legal-contact mt |
| `--space-20` | `80px` | legal padding top at 640px, hero padding at 880px |
| `--space-24` | `96px` | section padding, hero bottom, final padding |
| `--space-30` | `120px` | hero top padding, legal bottom padding |

**Values outside the 4-base scale:** `7px`, `9px`, `13px`, `14px`, `18px`, `22px`, `26px` — these are mostly one-off visual tuning values. At refactor time, round to nearest scale step or introduce half-steps.

---

## 7. Motion Tokens

### Easing

| Token | Value | Declared in |
|-------|-------|------------|
| `--ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `:root` in both files |
| `ease` | Native CSS keyword | `max-height` and `padding` transition in `.faq-a` |
| `ease-in-out` | Native CSS keyword | `@keyframes pulse` (animation) |

### Transition Durations Used

| Value | Where |
|-------|-------|
| `120ms` | `.nav-links a` color, `.faq-q::after` transform |
| `150ms` | `a` color in `legal.css` |
| `180ms` | `.btn` all properties |
| `200ms` | `.trust-item` all, `.faq-a` max-height and padding |
| `220ms` | `.mock` transform+shadow, `.showcase-card` all, `.price` all |

### Suggested Duration Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--dur-fast` | `120ms` | Micro interactions (text color changes) |
| `--dur-base` | `180ms` | Buttons |
| `--dur-card` | `220ms` | Card lift/transform |
| `--dur-expand` | `200ms` | Accordion expand |

### Keyframe Animations

| Name | Definition | Used on |
|------|-----------|---------|
| `pulse` | `0%, 100% { opacity: 1 }` `50% { opacity: 0.4 }` | `.cockpit-head .live::before` dot — `2s ease-in-out infinite` |

---

## 8. Breakpoints

All `@media` queries appear in `index.html` only. `legal.css` has one breakpoint.

| Breakpoint | Query | Changes |
|-----------|-------|---------|
| 1024px | `(max-width: 1024px)` | `.trust-row` collapses to 3-column |
| 1100px | `(max-width: 1100px)` | Hero, problem, final, faq layouts go single-column; faq-intro unsticks |
| 880px | `(max-width: 880px)` | Nav collapses (links+ghost btn hidden, toggle shown); hero/section padding reduced; product/showcase/pricing go single-column; footer grid 2-col; cockpit row stacks |
| 640px | `(max-width: 640px)` | legal.css only: container padding reduced, legal padding reduced, legal h2 smaller, footer-inner stacks |
| 560px | `(max-width: 560px)` | Process/trust columns further collapse; stat number smaller (44px); hero actions stack; footer single-column |

---

## 9. Z-Index Values

| Value | Element |
|-------|---------|
| `0` | `body::before` (grid), `body::after` (glow), `body::before` (legal grid) |
| `1` | `.nav`, `.hero`, `.section`, `.trust-strip`, `.final`, `.footer` (stacking context above backdrop); `.container` (legal.css); `.footer` (legal.css) |
| `50` | `.nav` (sticky layer, above page content) |

---

## 10. Component Inventory

All components listed by CSS class name, file/section, and role.

### index.html — CSS Components

| Class | Section | Role |
|-------|---------|------|
| `.nav` | Navigation | Sticky top bar, `z-index: 50`, blurred backdrop |
| `.nav-inner` | Navigation | Flex row, height 60px |
| `.brand` | Navigation | Logo text + brand-mark pair |
| `.brand-mark` | Navigation | 24x24 indigo gradient square logo icon |
| `.nav-links` | Navigation | Horizontal link list (hidden at 880px) |
| `.nav-cta` | Navigation | CTA button group (right side) |
| `.nav-toggle` | Navigation | Hamburger button, shown at 880px |
| `.hero` | Hero | Full-width section, padding 120px 0 96px |
| `.hero-inner` | Hero | 2-col grid (copy + cockpit) |
| `.hero-copy` | Hero | Left column: headline, sub, CTAs, trust strip |
| `.hero-sub` | Hero | 18px subheading paragraph |
| `.hero-actions` | Hero | Button row (primary + ghost) |
| `.hero-trust` | Hero | Micro compliance badges below CTAs |
| `.cockpit` | Hero | Right column: live status terminal panel |
| `.cockpit-head` | Hero | Terminal bar (dots + title + live badge) |
| `.cockpit-body` | Hero | Rows of service metrics |
| `.cockpit-row` | Hero | Single service status row |
| `.cockpit-foot` | Hero | Footer strip (system count + last update) |
| `.overline` | Shared | JetBrains Mono section label (11px, uppercase, dot prefix) |
| `.btn` | Shared | Primary indigo gradient CTA button |
| `.btn-ghost` | Shared | Surface-fill ghost button variant |
| `.btn-sm` | Shared | Small button size modifier |
| `.section` | Shared | Full-width section, padding 96px 0, border-bottom |
| `.section-head` | Shared | Max-width section heading block with left accent bar |
| `.container` | Shared | 1240px max-width centered wrapper |
| `.problem-layout` | Problem | 2-col grid (copy + stat panel) |
| `.problem-copy` | Problem | Left copy block with left accent bar |
| `.problem-panel` | Problem | Stat callout card (16px radius) |
| `.problem-stat-num` | Problem | Large gradient number display |
| `.problem-stat-label` | Problem | Supporting text below stat |
| `.problem-source` | Problem | Monospace citation line |
| `.product` | Products | 2-col grid (info + mock), border-top separator |
| `.product-info` | Products | Product description left column |
| `.product-meta` | Products | Buyer/Deploy/Status row below description |
| `.mock` | Products | Simulated dashboard panel |
| `.mock-bar` | Products | Terminal dot row at top of mock |
| `.mock-dot` | Products | Status dot (plain or `.live`) |
| `.mock-title` | Products | Panel title in mock bar |
| `.mock-grid` | Products | 3-col KPI grid inside mock |
| `.mock-cell` | Products | Individual KPI tile |
| `.mock-cell-label` | Products | Micro label inside KPI tile |
| `.mock-cell-val` | Products | Value inside KPI tile (`.accent` modifier) |
| `.mock-rows` | Products | List of simulated log rows |
| `.mock-row` | Products | Single log row with status span (`.ok`, `.pending`) |
| `.compare-wrap` | Compare | Scrollable table container card |
| `.compare` | Compare | Full comparison table |
| `.showcase-grid` | Showcase | 2-col card grid |
| `.showcase-card` | Showcase | Single work reference card |
| `.showcase-tag` | Showcase | Monospace label pill ("Internal reference") |
| `.showcase-meta` | Showcase | Meta line at card bottom (status + access) |
| `.process` | Process | 4-col counter grid |
| `.process-step` | Process | Single step block with CSS counter heading |
| `.pricing` | Pricing | 3-col price card grid |
| `.price` | Pricing | Individual pricing tier card |
| `.price.featured` | Pricing | Highlighted middle card (gradient border, raised) |
| `.price-name` | Pricing | Tier name label |
| `.price-amt` | Pricing | Price display (gradient text) |
| `.price-desc` | Pricing | One-line tier description |
| `.callout` | Pricing | Custom build CTA banner below pricing grid |
| `.callout-text` | Pricing | Text portion of callout |
| `.risk` | Pricing | Risk reversal section below callout |
| `.risk-grid` | Pricing | 3-col risk item grid |
| `.risk-item` | Pricing | Single de-risk point |
| `.trust-strip` | Trust | Full-width band with 6-item security badges |
| `.trust-row` | Trust | 6-col badge grid (collapses at breakpoints) |
| `.trust-item` | Trust | Individual security badge card |
| `.faq-layout` | FAQ | 2-col grid (sticky intro + accordion) |
| `.faq-intro` | FAQ | Left sticky column: overline, h2, p, aside |
| `.faq-aside` | FAQ | Contact panel inside faq-intro |
| `.faq` | FAQ | Accordion container |
| `.faq-item` | FAQ | Single Q/A pair (`.open` state modifier) |
| `.faq-q` | FAQ | Question button (+ toggle indicator via ::after) |
| `.faq-a` | FAQ | Answer panel (max-height animated collapse) |
| `.final` | Final CTA | 2-col CTA section |
| `.final-layout` | Final CTA | Grid (copy + meta panel) |
| `.final-copy` | Final CTA | Left CTA copy block |
| `.final-meta` | Final CTA | Right "what to expect" info panel (monospace) |
| `.final-meta-row` | Final CTA | Single key-value row in meta panel |
| `.final-meta-head` | Final CTA | Panel section label |
| `.footer` | Footer | Full-width site footer |
| `.footer-grid` | Footer | 4-col link grid |
| `.footer-brand` | Footer | Brand + tagline + founder note column |
| `.footer-col` | Footer | Supplementary link column |
| `.footer-bottom` | Footer | Copyright + email row |
| `.mono` | Utility | JetBrains Mono typeface class |

### legal.css — Additional Components

| Class | Role |
|-------|------|
| `.legal` | Article wrapper, padding 80px 0 120px |
| `.legal-head` | Article heading block with left accent bar |
| `.legal-overline` | Monospace legal label (same style as `.overline`) |
| `.legal-meta` | Monospace date/version row |
| `.legal-panel` | Callout/note card inside legal article |
| `.legal-contact` | Contact block at bottom of legal articles |
| `.nav-back` | Back-to-home link in legal nav |
| `.footer-inner` | Legal footer inner flex row |
| `.footer-links` | Legal footer link row |

---

## 11. Assets

### External Assets Referenced

| Asset | URL / Method | Purpose |
|-------|-------------|---------|
| `og-image.svg` | `https://sylvaris-site.vercel.app/og-image.svg` | Open Graph and Twitter card image (1200x630) |
| Inter font | `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700` | Primary typeface |
| JetBrains Mono | `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500` | Monospace typeface |
| Google Fonts preconnect | `https://fonts.googleapis.com`, `https://fonts.gstatic.com` | Font preconnect hints |

### Inline SVG Assets

| Location | Description |
|----------|-------------|
| `<link rel="icon">` (data URI) | Favicon: 32x32, rx=7, fill `#5b5bf0`, white "S" at 18px Inter 600 |
| `.nav-toggle` button SVG | Hamburger icon: 22x22 viewBox 24x24, three horizontal lines, `stroke="currentColor"` stroke-width 2 |
| `.price li::before` (data URI) | Checkmark icon: 20x20, fill `%235b5bf0` (#5b5bf0), path via `url()` in `background` |

### `og-image.svg` (file at `/mnt/c/agentchain/sylvaris-site/og-image.svg`)

Standalone SVG, 1200x630. Uses these colors directly: `#060610`, `#0b0b18`, `#6366f1`, `#818cf8`, `#4338ca`, `#ececf4`, `#8c8ca3`, `#585868`. Internally defines gradients: `#bg`, `#glow`, `#mark`, `#accent`, pattern `#grid`.

---

## 12. File Size Report

| File | Lines | Bytes |
|------|-------|-------|
| `index.html` | 1,584 | 57,727 bytes (~56.4 KB) |
| `legal.css` | 261 | 6,251 bytes (~6.1 KB) |
| **Total** | **1,845** | **63,978 bytes (~62.5 KB)** |

### Breakdown of `index.html` (~57.7 KB)

| Section | Approx lines | Approx % |
|---------|-------------|---------|
| `<head>` + meta tags | lines 1-23 | ~1% |
| Inline `<style>` CSS | lines 24-1104 (~1,080 lines) | ~68% |
| HTML markup | lines 1106-1553 (~448 lines) | ~28% |
| Inline `<script>` JS | lines 1555-1581 (~27 lines) | ~2% |
| Closing tags | 3 lines | <1% |

The file is CSS-heavy: approximately **68% of the line count is stylesheet**. The HTML and JS together make up ~30%.

---

## Inconsistencies Found

### IC-01 - `#5b5bf0` vs `--accent` (`#6366f1`)
Three locations use the hardcoded value `#5b5bf0` (favicon fill, checkmark SVG fill, og-image.svg grid stroke) while the accent token is `#6366f1`. These are different colors (5b5b vs 6366). Decide on one authoritative indigo value and unify.

### IC-02 - Duplicate `:root` declarations
`index.html` and `legal.css` both declare a full `:root` block with 12 identical tokens. In the Vite project, extract to a single shared `tokens.css` imported by both. The current duplication means any token change must be made twice.

### IC-03 - `--surface-3` declared but unused
`--surface-3: #1d1d35` is defined in `:root` (main only) but does not appear anywhere in the stylesheet or markup. Either use it to replace some hardcoded surface-level colors, or remove it.

### IC-04 - Three slightly different black drop-shadow opacities
Depth shadows use `rgba(0,0,0,0.5)`, `rgba(0,0,0,0.6)`, `rgba(0,0,0,0.7)`, and `rgba(0,0,0,0.8)` without a clear naming convention. Formalize as `--shadow-depth-1` through `--shadow-depth-4`.

### IC-05 - Three different `rgba(99,102,241, …)` inset glow opacities
Inset ring glows use 0.08, 0.1, 0.12, 0.16, 0.35 — 5 different values across cards. Formalize into `--ring-faint`, `--ring-soft`, `--ring-medium`, `--ring-strong` tokens.

### IC-06 - `rgba(255,255,255, …)` inset highlight has 6 distinct opacity levels
0.02, 0.03, 0.04, 0.06, 0.1, 0.12, 0.15, 0.18 — suggest consolidating to 3 named tokens: `--inset-subtle`, `--inset-soft`, `--inset-strong`.

### IC-07 - `body` line-height inconsistency between files
`index.html` sets `body { line-height: 1.55 }` while `legal.css` sets `body { line-height: 1.65 }`. Decide on one base value; the legal pages can override at the `.legal` container level if needed.

### IC-08 - `body` font-size inconsistency between files
`index.html` sets `body { font-size: 16px }` while `legal.css` sets `body { font-size: 15px }`. Unify to `16px` and override locally in `.legal p` as needed.

### IC-09 - `font-feature-settings` only on main page
`'ss01', 'cv11'` is set on `body` in `index.html` but not in `legal.css`. Should be shared.

### IC-10 - `.legal-overline` vs `.overline` are parallel but separate implementations
Both classes produce identical visual output (11px JetBrains Mono, uppercase, 0.14em tracking, dot prefix via `::before`). In the Vite project, use one `.overline` component class.

### IC-11 - `og-image.svg` hardcodes all color values
The SVG does not use the CSS custom properties. All palette values are manually duplicated. After the Vite refactor, consider generating the OG image from a single source of truth or documenting the color mapping explicitly.

### IC-12 - `--grad-hero` and `--grad-border` and `--grad-surface` tokens declared but not directly applied
These three named gradient tokens in `:root` exist but the corresponding rules use hardcoded gradient strings that match (or nearly match) them. Enforce usage of the token variables in the refactor.

---

*Total named CSS custom properties cataloged: 22 (17 shared + 5 main-only)*
*Total gradient instances: 27 unique declarations*
*Total shadow instances: 25 unique rule-level declarations*
*Total component classes: 82*
*Total breakpoints: 5 (4 in main, 1 in legal)*
