# Motion Architecture Specification
## Sylvaris Solutions Landing Page

**Version:** 1.0  
**Stack:** Vanilla HTML + Vite, Motion One, GSAP + ScrollTrigger + SplitText + Flip, View Transitions API, WebGL canvas  
**Date:** 2026-04-10

---

## 1. Motion Philosophy

Sylvaris motion is operational, not decorative. Every animation communicates system state, surface depth, or narrative progression - it never performs for its own sake. The visual language borrows from real-time operations dashboards: things come online, data streams in, status resolves. Transitions between sections feel like stepping deeper into an active system rather than browsing a marketing site. The pacing is deliberate and precise - influenced by Linear's restraint in micro-interactions and motion.dev's cinematic scroll choreography. Nothing bounces. Nothing overshoots on entrance. Timing is mechanical where it reinforces the "operating system" metaphor (cockpit rows, table reveals) and smoother on copy and editorial panels. The guiding constraint: if removing an animation makes a section harder to understand or feel less credible, the animation was load-bearing. If removing it makes no difference to meaning, cut it.

---

## 2. Performance Budget

| Metric | Hard Limit | Notes |
|--------|-----------|-------|
| Total JS bundle (gzipped) | < 80 KB | GSAP core + ScrollTrigger ~31 KB gz; Motion One ~8 KB gz; ogl ~10 KB gz; custom ~15 KB target |
| LCP | < 1.5 s | Hero H1 and cockpit panel must not be in any animation queue that blocks paint |
| CLS | 0.00 | All animated elements must have explicit dimensions set in CSS before JS runs; no layout shifts from GSAP transforms |
| INP | < 200 ms | All interaction handlers (FAQ toggle, nav scroll, button hover) must be synchronous and non-blocking |
| Frame rate | 60 fps sustained | On MacBook Air M1-class and iPhone 13-class. WebGL canvas capped at 30 fps on mobile via `requestAnimationFrame` throttle |
| GSAP ticker FPS | 60 fps desktop, throttle to 30 fps on battery/mobile | Detect via `navigator.getBattery()` and a `matchMedia("(pointer: coarse)")` check |
| WebGL canvas resolution | `devicePixelRatio` capped at 1.5 | Prevents 3x retina overdraw on the ambient canvas |
| Scroll hijack sections | Maximum 2 pinned panels active at once | ScrollTrigger `anticipatePin: 1` to prevent layout flicker |
| Reduced-motion override | Full degradation path required | See Section 7 |

**Bundle allocation (approximate gzipped):**
- `gsap` core: ~14 KB
- `gsap/ScrollTrigger`: ~12 KB
- `gsap/SplitText`: ~5 KB
- `gsap/Flip`: ~5 KB
- `motion` (Motion One): ~8 KB
- `ogl` (WebGL): ~10 KB
- Custom motion modules: ~10 KB
- Total target: ~64 KB (leaves 16 KB headroom under the 80 KB ceiling)

**LCP protection rules:**
1. The `<h1>` text must render in its final visual position on first paint. SplitText runs after `DOMContentLoaded`, not before. The hero section carries a `min-height` set in CSS so layout is reserved before JS.
2. The WebGL canvas is `position: fixed; z-index: -1` and does not participate in document flow.
3. No hero element is set to `opacity: 0` via inline style in HTML. The initial hide state is applied by the motion module immediately on `DOMContentLoaded`, before the browser's first paint call only if `requestAnimationFrame` timing allows; otherwise elements start visible and the animation is skipped.
4. Font loading uses `display=swap` (already in place via the Google Fonts URL in index.html).

---

## 3. Section-by-Section Choreography

### Section 1 - Nav

**Selector context:** `nav.nav`, `.brand`, `.nav-links li`, `.nav-cta .btn`

**Trigger:** Page load, fires at `DOMContentLoaded` + 80 ms delay to yield to LCP paint.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `nav.nav` | `opacity` | 0 | 1 | 400 ms | `linear` | - |
| 2 | `nav.nav` | `translateY` | -8px | 0 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | - |
| 3 | `.brand` | `opacity` | 0 | 1 | 300 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms after step 1 |
| 4 | `.nav-links li` | `opacity` | 0 | 1 | 280 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 40 ms per item, starts +120 ms after step 1 |
| 5 | `.nav-links li` | `translateX` | -6px | 0 | 280 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | same as step 4 |
| 6 | `.nav-cta .btn` | `opacity` | 0 | 1 | 280 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +240 ms after step 1 |

**Scroll behavior:** On scroll past 40px from top, add class `nav--scrolled` via `IntersectionObserver` on a 1px sentinel element below the nav. The CSS class tightens `border-bottom` opacity to `0.7` and reduces `height` from `60px` to `52px` via a 200 ms CSS transition. No GSAP needed for the scroll state toggle.

**Library:** Motion One (`.animate()`) for the entrance sequence. CSS transition for the scroll-state class.

**Why:** Establishes the Sylvaris interface as already running when the user arrives. The nav slides in like a panel coming online, not a page loading.

---

### Section 2 - Hero

**Selector context:** `.hero`, `.hero-copy .overline`, `.hero h1` (SplitText words), `.hero-sub`, `.hero-actions`, `.hero-trust span`, `.cockpit`, `.cockpit-row`, `.cockpit-foot`

**Trigger:** Page load sequence, begins 60 ms after nav animation starts. All hero animations run on a single GSAP timeline with labels for synchronization.

**Canvas ambient:** Starts immediately on page load, independent of the GSAP timeline. See Section 4.

**Cursor glow:** Active from page load, passive. See Section 4.

**Sequence (GSAP timeline, label: `"hero"`):**

| # | Target | Property | From | To | Duration | Easing | Delay/Position |
|---|--------|----------|------|----|----------|--------|----------------|
| 1 | `.hero-copy .overline` | `opacity` | 0 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero"` |
| 2 | `.hero-copy .overline` | `translateY` | 12px | 0 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero"` |
| 3 | H1 words (SplitText `.word`) | `opacity` | 0 | 1 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 28 ms per word, starts `"hero+=0.2"` |
| 4 | H1 words | `translateY` | 18px | 0 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | same as step 3 |
| 5 | H1 words | `rotateX` | 12deg | 0deg | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | same as step 3; `perspective: 800px` on parent |
| 6 | `.hero-sub` | `opacity` | 0 | 1 | 440 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero+=0.55"` |
| 7 | `.hero-sub` | `translateY` | 12px | 0 | 440 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero+=0.55"` |
| 8 | `.hero-actions` | `opacity` | 0 | 1 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero+=0.72"` |
| 9 | `.hero-trust span` | `opacity` | 0 | 1 | 280 ms | `linear` | stagger 50 ms, starts `"hero+=0.88"` |
| 10 | `.cockpit` | `opacity` | 0 | 1 | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero+=0.3"` |
| 11 | `.cockpit` | `translateY` | 24px | 0 | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero+=0.3"` |
| 12 | `.cockpit` | `rotateX` | 8deg | 0deg | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero+=0.3"`; `perspective: 1200px` on `.hero-inner` |
| 13 | `.cockpit-head` | `opacity` | 0 | 1 | 280 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `"hero+=0.68"` |
| 14 | `.cockpit-row` (each) | `opacity` | 0 | 1 | 300 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 90 ms per row, starts `"hero+=0.82"` |
| 15 | `.cockpit-row` (each) | `translateX` | -10px | 0 | 300 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | same as step 14 |
| 16 | `.cockpit-foot` | `opacity` | 0 | 1 | 220 ms | `linear` | `"hero+=1.3"` |

**SplitText note:** Run `new SplitText(".hero h1", { type: "words" })` before the timeline is created. Wrap each `.word` in a `overflow: hidden` span to clip the Y travel. Revert SplitText on resize via `ResizeObserver` and reinitialize.

**Library:** GSAP timeline + SplitText for H1. Motion One for overline, sub, actions, and trust spans (simpler, lighter for these non-sequenced elements). GSAP for cockpit (needs timeline synchronization with the copy reveal).

**Why:** The cockpit comes online as the copy is being read, reinforcing that this is a live operational system. The word-by-word H1 reveal creates a reading rhythm that matches how a technical headline lands. The 3D rotateX on cockpit entry communicates depth, like a panel being angled into view.

---

### Section 3 - Problem

**Selector context:** `#problem`, `.problem-copy`, `.problem-stat-num`, `.problem-panel`

**Trigger:** ScrollTrigger, `start: "top 72%"`, `once: true`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.problem-copy .overline` | `opacity` | 0 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 2 | `.problem-copy .overline` | `translateX` | -16px | 0 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 3 | `.problem-copy h2` | `opacity` | 0 | 1 | 480 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms |
| 4 | `.problem-copy h2` | `translateY` | 14px | 0 | 480 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms |
| 5 | `.problem-copy p` | `opacity` | 0 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +180 ms |
| 6 | `.problem-panel` | `opacity` | 0 | 1 | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +120 ms from trigger |
| 7 | `.problem-panel` | `translateY` | 20px | 0 | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +120 ms |
| 8 | `.problem-stat-num` | `innerText` count-up | `0` | `$2.4M` | 1,200 ms | `cubic-bezier(0.1, 0.9, 0.2, 1)` | starts after panel is 40% visible |

**Stat count-up:** Use a custom counter function, not a library. Interpolate from 0 to 2.4, render as `$X.XM`. Clamp decimal to one place. The count-up starts only when `.problem-panel` reaches 40% viewport visibility (secondary IntersectionObserver).

**Library:** Motion One for copy reveals. GSAP ScrollTrigger for panel entrance. Vanilla JS for count-up.

**Why:** The $2.4M stat count-up is the single most important credibility beat on the page. The panel sliding in from below and the counter animating creates the sensation of data loading. The left-to-right reveal on the overline reinforces the left accent border already styled on `.problem-copy::before`.

---

### Section 4 - Products

**Selector context:** `#products`, `.product` (both), `.product-info`, `.mock`, `.mock-cell`, `.mock-row`

**Trigger:** Per-product ScrollTrigger. Each `.product` block triggers independently at `start: "top 68%"`, `once: true`. The mock dashboards get a subtle 3D tilt on mouse proximity (cursor module, not scroll).

**Sequence (per product, fired independently):**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.product-info .overline` | `opacity`, `translateY` | 0, 14px | 1, 0 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 2 | `.product-info h3` | `opacity`, `translateY` | 0, 16px | 1, 0 | 440 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +60 ms |
| 3 | `.product-info p` | `opacity` | 0 | 1 | 380 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +140 ms |
| 4 | `.product-meta div` | `opacity`, `translateY` | 0, 8px | 1, 0 | 300 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 60 ms, starts +200 ms |
| 5 | `.mock` (the dashboard) | `opacity` | 0 | 1 | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms from trigger |
| 6 | `.mock` | `translateY` | 28px | 0 | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms |
| 7 | `.mock` | `rotateX` | 6deg | 0deg | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms; `perspective: 1000px` on `.product` |
| 8 | `.mock-cell` | `opacity`, `scale` | 0, 0.92 | 1, 1 | 280 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 50 ms, starts after mock is visible |
| 9 | `.mock-row` | `opacity`, `translateX` | 0, -8px | 1, 0 | 240 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 60 ms, starts after cells |

**Hover 3D tilt (cursor proximity, not scroll):** When cursor is within 200px of `.mock`, apply `rotateX` and `rotateY` proportional to cursor offset from mock center, clamped to +-8deg on each axis. Eased with Motion One `animate()` at 120 ms duration on each `mousemove`. On `mouseleave`, animate back to 0/0. This is handled in `cursor.js`, not in the scroll sequence.

**Library:** Motion One for copy reveals and mock entrance. GSAP ScrollTrigger for scroll-into-view detection. Motion One for hover 3D tilt.

**Why:** Each product mock streams in like it is booting up - cells appear, then rows - mirroring the cockpit's row-streaming pattern established in the hero. The 3D tilt on hover communicates that these are real interactive systems, not static screenshots.

---

### Section 5 - Compare Table

**Selector context:** `#compare`, `.compare-wrap`, `thead tr`, `tbody tr`, `tr.sylvaris`

**Trigger:** ScrollTrigger, `start: "top 70%"`, `once: true`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.compare-wrap` | `opacity` | 0 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 2 | `.compare-wrap` | `translateY` | 16px | 0 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 3 | `thead tr` | `opacity` | 0 | 1 | 300 ms | `linear` | +200 ms |
| 4 | `tbody tr` (rows 1-3) | `opacity` | 0 | 1 | 300 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 80 ms, starts +320 ms |
| 5 | `tbody tr` | `translateY` | 10px | 0 | 300 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | same as step 4 |
| 6 | `tr.sylvaris` | `opacity` | 0 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms after last competitor row |
| 7 | `tr.sylvaris` | `scale` | 0.98 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | same as step 6 |
| 8 | `tr.sylvaris` | box-shadow (CSS class toggle) | none | `0 0 0 1px var(--accent) inset` | 600 ms CSS transition | `ease` | same as step 6 |

**Sylvaris row highlight:** The `tr.sylvaris` row already has the gradient background in CSS. On entrance, additionally apply a 1px inset border pulse: add class `sylvaris--active` which triggers a CSS `@keyframes` border-glow animation (opacity 0 to 1 at 600 ms, hold, then maintain). This avoids GSAP driving the accent border and keeps it in CSS where it belongs.

**Library:** Motion One for table entrance. CSS `@keyframes` for the Sylvaris row accent glow.

**Why:** Competitor rows stream in like rejection signals, making the Sylvaris row's entrance feel conclusive. The slight scale-up on the Sylvaris row gives it visual authority without an aggressive bounce.

---

### Section 6 - Selected Work Showcase

**Selector context:** `#showcase`, `.showcase-card`

**Trigger:** ScrollTrigger, `start: "top 72%"`, `once: true`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.showcase-card` | `opacity` | 0 | 1 | 440 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 100 ms |
| 2 | `.showcase-card` | `translateY` | 20px | 0 | 440 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 100 ms |
| 3 | `.showcase-card` | `rotateX` | 4deg | 0deg | 440 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 100 ms; `perspective: 1000px` on `.showcase-grid` |
| 4 | `.showcase-tag` | `opacity` | 0 | 1 | 280 ms | `linear` | +80 ms after card visible |
| 5 | `.showcase-card h4` | `opacity`, `translateY` | 0, 8px | 1, 0 | 340 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +120 ms after card visible |

**Library:** Motion One for all steps.

**Why:** Two-card stagger creates a brief reading pause between cards, matching the "internal reference" positioning - these are real but deliberately understated. No scroll hijack here; these are informational, not cinematic.

---

### Section 7 - Process

**Selector context:** `#process`, `.process-step`

**Trigger:** ScrollTrigger, `start: "top 68%"`, `once: true`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.process-step` | `opacity` | 0 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 80 ms |
| 2 | `.process-step` | `translateY` | 16px | 0 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 80 ms |
| 3 | `.process-step::before` (counter) | `opacity` | 0 | 1 | 200 ms | `linear` | stagger 80 ms, offset +60 ms per step |

**Counter pseudo-element:** CSS pseudo-elements cannot be animated by GSAP directly. Instead, each `.process-step` gets a real `<span class="step-num">` element injected by the motion module at init time to carry the counter display. CSS `counter-reset/increment` continues to work on the pseudo-element for fallback; the injected span is what gets animated.

**Library:** Motion One for step reveals. Vanilla JS for span injection.

**Why:** Sequential step appearance reinforces the linear four-phase delivery narrative. Counter appearing with a slight lag after the step card reads as a step number being assigned, not just decorating.

---

### Section 8 - Pricing

**Selector context:** `#pricing`, `.price` (three tiers), `.price.featured`, `.callout`

**Trigger:** ScrollTrigger, `start: "top 70%"`, `once: true`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.price:not(.featured)` (first) | `opacity`, `translateY` | 0, 24px | 1, 0 | 480 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 2 | `.price.featured` | `opacity`, `translateY` | 0, 32px | 1, -4px | 560 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | +60 ms (travels further, arrives with its CSS offset already applied) |
| 3 | `.price:not(.featured)` (last) | `opacity`, `translateY` | 0, 24px | 1, 0 | 480 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +120 ms |
| 4 | `.price.featured::before` (gradient border) | `opacity` | 0 | 1 | 700 ms CSS transition | `ease` | triggered by class add at step 2 complete |
| 5 | `.price.featured::after` ("Recommended" badge) | `opacity`, `translateY` | 0, -8px | 1, 0 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +400 ms after featured reveal |
| 6 | `.callout` | `opacity`, `translateY` | 0, 16px | 1, 0 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +200 ms after last price card |

**Featured tier note:** The `.price.featured` has `transform: translateY(-4px)` in CSS as its resting state. The GSAP `to` value must be `-4px`, not `0`, or the featured offset will be lost on animation complete. Use `gsap.set(".price.featured", { translateY: 32 })` as the from-state, then `gsap.to` to `-4px`.

**Library:** Motion One for outer tier cards. GSAP for the featured tier (needs precise final-state management). CSS transition for border glow.

**Why:** The featured tier arriving last and traveling further signals hierarchy without resorting to a larger card or a different color scheme. The badge dropping in after the card establishes itself prevents visual competition during the entrance.

---

### Section 9 - Risk Reversal Band

**Selector context:** `.risk`, `.risk-item` (three items)

**Trigger:** ScrollTrigger, `start: "top 80%"`, `once: true`. This band is lower on the page and less prominent - the trigger fires earlier so it is already visible on slower scrolls.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.risk h3` | `opacity`, `translateY` | 0, 10px | 1, 0 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 2 | `.risk-item` | `opacity`, `translateY` | 0, 16px | 1, 0 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 70 ms, starts +120 ms |
| 3 | `.risk-item h4` | `color` | `var(--text-mute)` | `var(--accent)` | 400 ms CSS transition | `ease` | triggered by class on item reveal complete |

**Library:** Motion One for all steps.

**Why:** Three risk items appearing in a brief cascade reads as a checklist being confirmed. The h4 color transition to accent reinforces approval semantics without adding an icon.

---

### Section 10 - Trust Strip

**Selector context:** `.trust-strip`, `.trust-item` (six badges)

**Trigger:** ScrollTrigger, `start: "top 82%"`, `once: true`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.trust-strip .overline` | `opacity` | 0 | 1 | 300 ms | `linear` | 0 |
| 2 | `.trust-item` | `opacity` | 0 | 1 | 320 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 40 ms, starts +80 ms |
| 3 | `.trust-item` | `scale` | 0.94 | 1 | 320 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 40 ms, same timing as step 2 |

**Library:** Motion One.

**Why:** Six badges appearing in rapid stagger (40 ms gaps, total spread 240 ms) reads as a credential list being scanned. The slight scale-up avoids the badges looking like they popped in from nowhere.

---

### Section 11 - FAQ

**Selector context:** `#faq`, `.faq-intro`, `.faq-aside`, `.faq-item`

**Trigger:** Two triggers. `.faq-intro` and `.faq-aside` trigger at `start: "top 72%"`. The `.faq-item` list triggers at `start: "top 65%"`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.faq-intro .overline` | `opacity`, `translateX` | 0, -12px | 1, 0 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 2 | `.faq-intro h2` | `opacity`, `translateY` | 0, 14px | 1, 0 | 440 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms |
| 3 | `.faq-intro p` | `opacity` | 0 | 1 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +160 ms |
| 4 | `.faq-aside` | `opacity`, `translateY` | 0, 12px | 1, 0 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +200 ms |
| 5 | `.faq-item` | `opacity`, `translateY` | 0, 10px | 1, 0 | 300 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 50 ms, second trigger |

**FAQ toggle animation (interactive):** The existing CSS `max-height` + `padding` transition is sufficient. Do not replace it with GSAP. Upgrade it slightly: add `transition: max-height 240ms cubic-bezier(0.2, 0.8, 0.2, 1), padding 240ms cubic-bezier(0.2, 0.8, 0.2, 1)` in `motion.css` to override the existing `200ms ease`. The `+` icon rotation already in CSS uses `transform: rotate(45deg)` at 120 ms - leave as is.

**Library:** Motion One for entrance. CSS for interactive toggle.

**Why:** The sticky intro panel with questions cascading in on the right mirrors the FAQ layout itself (left panel = context, right panel = content). Questions appearing in order signals that the most important ones are first.

---

### Section 12 - Final CTA

**Selector context:** `.final`, `.final-copy`, `.final-meta`, `.final-meta-row`

**Trigger:** ScrollTrigger, `start: "top 70%"`, `once: true`.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.final-copy .overline` | - | (none; already revealed by section-head pattern) | - | - | - | - |
| 2 | `.final-copy h2` | `opacity`, `translateY` | 0, 16px | 1, 0 | 480 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 0 |
| 3 | `.final-copy p` | `opacity` | 0 | 1 | 400 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +120 ms |
| 4 | `.final-copy .btn` | `opacity`, `scale` | 0, 0.96 | 1, 1 | 360 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +200 ms |
| 5 | `.final-meta` | `opacity`, `translateY` | 0, 24px | 1, 0 | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms from trigger |
| 6 | `.final-meta` | `rotateX` | 6deg | 0deg | 500 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | +80 ms; `perspective: 1000px` on `.final-layout` |
| 7 | `.final-meta-head` | `opacity` | 0 | 1 | 280 ms | `linear` | +400 ms from trigger |
| 8 | `.final-meta-row` | `opacity`, `translateX` | 0, -8px | 1, 0 | 280 ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | stagger 70 ms, starts +480 ms |

**The meta panel echoes the cockpit:** Same 3D entry angle, same row-streaming pattern. This is intentional - it closes the loop with the hero, signaling the same operational surface is available to the viewer.

**Library:** Motion One for copy. GSAP for meta panel (3D + row stagger synchronized on one timeline).

**Why:** The final CTA must feel conclusive, not exhausted. The meta panel streaming in with the same motion vocabulary as the hero cockpit reinforces: this is the system you are being invited into.

---

### Section 13 - Footer

**Selector context:** `.footer`, `.footer-grid`, `.footer-bottom`

**Trigger:** ScrollTrigger, `start: "top 90%"`, `once: true`. Footer is low-stakes; fire late, keep short.

**Sequence:**

| # | Target | Property | From | To | Duration | Easing | Stagger |
|---|--------|----------|------|----|----------|--------|---------|
| 1 | `.footer-grid` | `opacity` | 0 | 1 | 400 ms | `linear` | 0 |
| 2 | `.footer-bottom` | `opacity` | 0 | 1 | 300 ms | `linear` | +200 ms |

No transforms. Pure fade. The footer is infrastructure, not narrative.

**Library:** Motion One.

**Why:** A motionless footer entrance signals the journey is complete. Anything more complex would undermine the gravity of the final CTA just above it.

---

## 4. Global Motion Layers

### 4a. Canvas / WebGL Ambient Background

**Purpose:** Replace the current CSS `body::after` radial gradient with a live WebGL canvas that slowly shifts the gradient field, making the hero feel inhabited rather than static.

**Library:** `ogl` (5-10 KB gzipped). No Three.js.

**Canvas setup:**
- `position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none`
- `alpha: true` context so the dark `--bg` body background shows through
- Resolution: `Math.min(window.devicePixelRatio, 1.5)` - never above 1.5x to cap overdraw

**Shader approach (fullscreen quad, fragment shader only):**

The shader renders two overlapping radial gradient fields that drift slowly on independent time offsets:

- Gradient A: centered near `(0.72, 0.38)` in UV space (top-right, matching the current CSS `body::after`), color `rgba(99, 102, 241, 0.18)` (the `--accent` value), radius driven by `sin(time * 0.18) * 0.08 + 0.45`
- Gradient B: centered near `(0.28, 0.75)` (bottom-left), color `rgba(34, 211, 238, 0.06)` (the `--cyan` value), radius driven by `cos(time * 0.13) * 0.06 + 0.30`
- Both gradients use smooth falloff: `smoothstep(radius, radius * 0.1, dist)` to avoid hard edges
- Output is additive blend: `fragColor = vec4(colorA + colorB, 1.0)` with the alpha of the combined field clamped to `[0.0, 0.22]`
- The canvas itself uses `opacity: 1` but the shader's own alpha output provides the blend

**Uniforms:**
- `uTime`: incremented per frame, `time += delta * 0.001` (very slow drift)
- `uResolution`: vec2 of canvas pixel dimensions
- `uScroll`: `window.scrollY / document.body.scrollHeight` - passed each frame to gently shift gradient center on scroll (range: 0.0 to 1.0, multiplied by 0.08 to keep shift subtle)

**FPS targeting:**
- Desktop: uncapped via `requestAnimationFrame`
- Mobile (`matchMedia("(pointer: coarse)")`): throttle to 30 fps by skipping every other frame
- Battery saver (`navigator.getBattery().then(b => b.level < 0.2)`): pause animation entirely, leave last frame visible
- `prefers-reduced-motion`: stop animation loop immediately on module init, render a single static frame

**Resize handling:** `ResizeObserver` on `document.body`, debounced at 100 ms, resizes canvas and updates `uResolution` uniform.

---

### 4b. Cursor Glow

**Purpose:** A soft radial glow that follows the cursor, reinforcing the sense of operating a live system. Secondary purpose: drives the 3D tilt on `.mock` and `.cockpit` panels.

**Implementation:**
- A `<div id="cursor-glow">` injected at the top of `<body>` by `cursor.js` on init
- CSS: `position: fixed; pointer-events: none; z-index: 9998; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%); transform: translate(-50%, -50%); will-change: transform`
- Position updated on `mousemove` via `requestAnimationFrame` throttle (not directly on the event) using `lerp(current, target, 0.12)` for smooth lag
- The glow does NOT render on touch devices (`matchMedia("(pointer: coarse)")` check - module returns early)
- `prefers-reduced-motion`: glow element is not injected

**3D tilt on hover panels:**
- `cursor.js` maintains a registry of "tiltable" elements: `.mock`, `.cockpit`, `.price.featured`, `.final-meta`
- On each `requestAnimationFrame` tick, for each registered element that is currently hovered, calculate cursor offset from element center, normalize to `[-1, 1]` on both axes, multiply by `MAX_TILT` (8deg for `.mock`, 5deg for `.cockpit`, 4deg for pricing/meta panels), and apply via `element.style.transform`
- On `mouseleave`, animate back to identity via Motion One `animate(element, { rotateX: 0, rotateY: 0 }, { duration: 0.3, easing: [0.2, 0.8, 0.2, 1] })`
- `perspective` is set in CSS on the parent of each tiltable element, not via JS

---

### 4c. Scroll Smoothing

**Decision: Lenis, not native `scroll-behavior: smooth`.**

Rationale: Native smooth scroll conflicts with GSAP ScrollTrigger's scroll position capture when pinned sections are active. Lenis integrates directly with GSAP's ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`), ensuring ScrollTrigger and Lenis share the same scroll position source.

**Lenis configuration:**
```
new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,   // native momentum on iOS, Lenis on desktop
  touchMultiplier: 2,
})
```

**GSAP ScrollTrigger sync:**
```
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

**Reduced motion:** Lenis is not initialized. `scroll-behavior: smooth` is removed from `html` element via JS. Native browser scroll is used.

**Bundle impact:** Lenis is ~3.5 KB gzipped. Acceptable within budget.

---

### 4d. Page Transitions (View Transitions API)

**Pages involved:** `index.html` -> `privacy.html`, `index.html` -> `terms.html`, `index.html` -> `dpa.html`, and all reverses.

**Strategy:** Use the View Transitions API with named transition elements. No polyfill. If the API is unavailable (Safari < 18, Firefox), navigation proceeds instantly with no animation.

**Named transition elements:**

| Element | `view-transition-name` | Behavior |
|---------|----------------------|---------|
| `nav.nav` | `site-nav` | Persists across transition (nav does not animate out/in) |
| `.brand` | `site-brand` | Morphs position smoothly if nav layout differs |
| `h1` on legal pages | `page-heading` | Cross-fades and repositions from hero H1 position |

**Transition CSS (in `motion.css`):**
```css
::view-transition-old(root) {
  animation: 240ms cubic-bezier(0.4, 0, 1, 1) both slide-out;
}
::view-transition-new(root) {
  animation: 340ms cubic-bezier(0, 0, 0.2, 1) both slide-in;
}
@keyframes slide-out {
  to { opacity: 0; transform: translateY(-12px); }
}
@keyframes slide-in {
  from { opacity: 0; transform: translateY(8px); }
}
::view-transition-old(site-nav),
::view-transition-new(site-nav) {
  animation: none;
  mix-blend-mode: normal;
}
```

**Intercept handler (in `page-transitions.js`):**
```
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', async (e) => {
    if (!document.startViewTransition) return;
    e.preventDefault();
    const transition = document.startViewTransition(() => {
      window.location.href = link.href;
    });
  });
});
```

**Reduced motion:** CSS `@media (prefers-reduced-motion: reduce)` block removes the keyframe animations from `::view-transition-old/new(root)`, replacing with a simple 180 ms cross-fade at `opacity` only.

---

## 5. File Structure

```
sylvaris-site/
├── index.html                    (existing; modified to add data-section ids and aria landmarks)
├── privacy.html
├── terms.html
├── dpa.html
├── 404.html
├── vite.config.js
├── package.json
├── public/
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── design-system/
│   ├── motion-spec.md            (this file)
│   └── tokens.md                 (to be created; CSS custom property inventory)
└── src/
    ├── main.js                   (entry point; imports motionController, Lenis, ScrollTrigger setup)
    ├── motion/
    │   ├── index.js              (motionController: orchestrates all modules, reduced-motion guard)
    │   ├── hero.js               (GSAP hero timeline, SplitText init, cockpit streaming)
    │   ├── sections.js           (all non-hero section ScrollTrigger setups; Motion One reveals)
    │   ├── scroll.js             (Lenis init + GSAP ticker sync + ScrollTrigger.scrollerProxy)
    │   ├── cursor.js             (cursor glow DOM element, tilt registry, rAF loop)
    │   ├── canvas.js             (ogl WebGL ambient gradient; shader source as JS template literal)
    │   ├── page-transitions.js   (View Transitions API link intercept)
    │   └── nav.js                (nav entrance animation, scroll-state class toggle via IntersectionObserver)
    └── styles/
        ├── tokens.css            (CSS custom properties; all --var declarations)
        ├── base.css              (reset, html/body, typography, .container, .overline, .btn)
        ├── components.css        (nav, cockpit, mock, compare, pricing, trust, faq, footer)
        ├── sections.css          (section-level layout: hero, problem, products, showcase, process, final)
        └── motion.css            (initial hidden states for animated elements; view-transition CSS;
                                   reduced-motion overrides; .nav--scrolled; @keyframes; cursor-glow)
```

**Notes on the structure:**

- The existing single `index.html` inline `<style>` block will be extracted and split across the four CSS files above during the Vite migration. No CSS changes to existing rules - only relocation.
- `sections.js` handles all sections except hero (which is complex enough to warrant its own module). This avoids a proliferation of small files for simple reveal sequences.
- `canvas.js` contains the GLSL shader source as a JS template literal. No `.glsl` files, no webpack/vite GLSL loader needed. ogl accepts shader source strings directly.
- `vite.config.js` uses `vite-plugin-html` only if multi-page HTML templating is needed; otherwise vanilla Vite multi-page config (`build.rollupOptions.input`) handles the four HTML files.
- No framework. No JSX. No TypeScript. Vanilla ES modules throughout.

---

## 6. Orchestration Strategy

### Single `motionController` pattern

All motion initializes through one entry point: `src/motion/index.js`. This module is the only import in `src/main.js` beyond Lenis.

**Boot sequence (in `motionController.init()`):**

```
1. Check prefers-reduced-motion  -> if true, call motionController.initReduced() and return
2. canvas.init()                 -> start WebGL ambient (fires immediately, no DOM dependency)
3. scroll.init()                 -> init Lenis, sync GSAP ticker
4. ScrollTrigger.refresh(false)  -> initial scroll position calibration (no animation)
5. nav.init()                    -> entrance sequence starts (80 ms delay internal to nav.js)
6. hero.init()                   -> hero GSAP timeline created, starts after nav delay
7. cursor.init()                 -> inject cursor glow div, start rAF loop
8. sections.init()               -> register all ScrollTrigger instances for sections 3-13
9. pageTransitions.init()        -> attach View Transitions link intercept
```

All `init()` calls are synchronous. No async module loading on the critical path.

**Communication between modules:**

- Modules do not call each other directly. They communicate through two shared primitives:
  1. `motionController.state` - a plain object: `{ scrollY: 0, cursorX: 0, cursorY: 0, reducedMotion: false }`. Updated by `scroll.js` and `cursor.js` each frame. Read by `canvas.js` (for `uScroll` uniform) and `cursor.js` (tilt calculations).
  2. A minimal event bus: `motionController.emit(event, data)` and `motionController.on(event, handler)`. Currently used for two events: `"hero:complete"` (emitted by `hero.js` when its timeline finishes, listened to by `sections.js` to `ScrollTrigger.refresh()` after hero layout settles) and `"scroll:update"` (emitted by Lenis on each scroll, listened to by `canvas.js` to update `uScroll`).

**Why not a full event emitter library:** The two-event requirement does not justify the dependency. A 15-line pub/sub implementation in `index.js` covers it.

**Lazy loading:** Sections 3-13 are not lazy-loaded per-section. The ScrollTrigger instances are all registered at page load but do not fire until their triggers are met. This is simpler and avoids IntersectionObserver + dynamic import overhead for what is a single-page site.

**Page transitions wiring:** `pageTransitions.js` attaches to all links at init. When a transition fires, the destination page runs its own `motionController.init()` on `DOMContentLoaded`. There is no cross-page state transfer. Canvas and cursor reinitialize fresh on each page load.

**Cursor glow hook-in:** `cursor.js` injects the glow `<div>` before `<body>`'s first child during `cursor.init()`. The tilt registry is populated during `sections.init()` by calling `cursor.registerTiltable(element, maxDegrees)` for each `.mock`, `.cockpit`, `.price.featured`, and `.final-meta` element. This is the only cross-module function call in the system.

---

## 7. Fallback Plan for Reduced Motion

Detection: `window.matchMedia("(prefers-reduced-motion: reduce)").matches` checked once at the top of `motionController.init()`. Also listen for changes via `addEventListener("change", ...)` on the media query in case the user changes the system setting mid-session.

**`motionController.initReduced()` behavior:**

| Feature | Full motion | Reduced motion |
|---------|-------------|----------------|
| WebGL canvas | Animated gradient drift | Single static frame rendered once, then loop stops |
| Cursor glow | Active, follows cursor | Not injected into DOM |
| Nav entrance | Slide + fade sequence | Immediate `opacity: 1` via CSS; no JS animation |
| Hero H1 | Word-by-word SplitText reveal | SplitText not run; H1 renders as plain text; no animation |
| Hero cockpit | Sequential row streaming | All rows visible immediately at `opacity: 1` |
| All section reveals | Fade + translateY sequences | Elements start at `opacity: 1`; no JS animation runs |
| Scroll hijack / pinning | Enabled | ScrollTrigger not initialized; native scroll |
| Lenis smooth scroll | Active | Not initialized; `html { scroll-behavior: auto }` |
| Page transitions | View Transitions with slide | View Transitions with 180 ms cross-fade only (no translate) |
| 3D tilt on hover | Active on `.mock`, `.cockpit`, etc. | Not registered; no tilt |
| Stat count-up | Animated from 0 | Displays final value immediately |
| FAQ toggle | CSS transition 240 ms | CSS transition reduced to 1 ms (effectively instant) |

**CSS layer for reduced motion (in `motion.css`):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .faq-a { transition: none !important; }
}
```

The `!important` CSS block serves as a safety net even if JS-driven animations somehow run. The JS `initReduced()` path is the primary enforcement mechanism.

**Screen reader / keyboard-only users:** All animated elements must have their final visible state accessible without JS. The CSS initial state for animated elements (set in `motion.css`) uses `opacity: 0` only when a JS class `.motion-ready` is present on `<html>`. If JS fails or is disabled, the class is never added and all elements are visible by default.

```css
html.motion-ready [data-animate] {
  opacity: 0;
}
```

The `motionController.init()` adds `motion-ready` to `<html>` before registering any animations.

---

## 8. Testing Strategy

### 8a. Playwright Visual Regression per Section

For each of the 13 sections, a Playwright test:

1. Navigates to `localhost:5173`
2. Disables CSS `transition` and `animation` globally to freeze final state
3. Scrolls to the section
4. Takes a screenshot
5. Compares against a stored baseline

Tests run in three configurations: desktop (1440x900), tablet (768x1024), mobile (390x844).

A separate test suite runs with `prefers-reduced-motion: reduce` forced via `page.emulateMedia({ reducedMotion: "reduce" })` and verifies that all elements are visible (no `opacity: 0` elements remaining).

### 8b. Lighthouse CI on Every Commit

GitHub Actions (or local `lhci autorun`) after each `git push`:

- Performance score >= 90
- LCP <= 1.5 s
- CLS = 0.00
- TBT < 200 ms (proxy for INP)
- Accessibility score >= 95

Lighthouse run in desktop and mobile profiles. Any regression in LCP or CLS blocks merge.

### 8c. Chrome DevTools Performance Profile

Manual check at major milestones (after hero module, after full page):

1. Open DevTools Performance panel
2. Record 3 seconds from page load
3. Verify: no long tasks > 50 ms on main thread during animation sequences
4. Verify: WebGL canvas frame rendering stays under 16 ms per frame on desktop, under 33 ms on mobile
5. Verify: `will-change: transform` is present on animated elements that need GPU compositing (cursor glow, cockpit, hero h1 wrapper, mock panels)

**`will-change` policy:** Apply only to elements that animate on scroll or continuous events (cursor glow, canvas, cockpit during hero). Do not apply to elements that animate once on scroll-into-view - the cost of the GPU layer exceeds the benefit for a one-shot transition.

### 8d. Bundle Size Check

`vite build` output is checked against the 80 KB gzipped JS budget via a `build:check` npm script using `bundlesize` or a simple Node script that reads the Rollup manifest and sums gzipped sizes of all JS chunks. Fail the build if the budget is exceeded.

### 8e. Real Device Testing

Before any public deployment:

- iPhone 13 (Safari): verify WebGL canvas renders, cursor glow absent (touch device), animations at 60 fps
- Pixel 7 (Chrome Android): verify 30 fps canvas throttle activates, touch scroll is native (Lenis `smoothTouch: false`)
- MacBook Air M1 on battery (Safari): verify battery-saver canvas pause fires when battery < 20%

---

## Design Token Reference

The following CSS custom properties from `index.html` are referenced throughout this spec. They should be extracted to `src/styles/tokens.css` during the Vite migration without modification:

| Token | Value | Motion usage |
|-------|-------|-------------|
| `--ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Default easing for all transitions |
| `--accent` | `#6366f1` | Canvas gradient A color, cursor glow color |
| `--accent-bright` | `#818cf8` | Canvas gradient A highlight |
| `--cyan` | `#22d3ee` | Canvas gradient B color |
| `--accent-glow` | `rgba(99, 102, 241, 0.22)` | Cursor glow radial center color |
| `--bg` | `#060610` | Canvas clear color |
| `--border` | `#22223a` | Used in `@keyframes` border-glow for compare table |
| `--text` | `#ececf4` | SplitText word initial color (inherited; no override needed) |

