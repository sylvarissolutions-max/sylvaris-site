# Sylvaris Motion References

Research pass across 8 reference sites, April 2026. Synthesis toward a Sylvaris-specific motion vocabulary for an operational AI product surface (not marketing SaaS).

---

## 1. Motion.dev - https://motion.dev
Framer team's own dogfood site for the Motion animation library.

- **Hero motion**: Large display headline reveals with spring-eased character and word stagger; demo blocks spring into place with overshoot. A looped code sample types in on load.
- **Scroll behavior**: Native smooth scroll with scroll-linked values driving inline demos. No hijack; ScrollTimeline/ViewTimeline used natively where supported.
- **Section transitions**: Spring fade-up with per-item stagger (~50ms). Each section has a self-contained interactive demo that animates on enter.
- **Interactive elements**: Buttons compress on press, not magnetic. Live playground widgets react to cursor.
- **Color and gradients**: Near-black background, hot pink/purple brand glow under hero, soft radial bleed.
- **Typography**: Massive display type with weight contrast, spring-eased entrance, kinetic number counters in demos.
- **Background**: Dark canvas with subtle noise and an ambient brand-color radial.
- **Differentiator**: Every section is a live, tweakable motion demo. The site is the library.

## 2. Linear - https://linear.app
The restrained-premium benchmark for enterprise product marketing.

- **Hero motion**: Quiet. Headline fades in, cursor icon ticks, product mock appears with a short fade-up. No aggressive reveal.
- **Scroll behavior**: Native smooth scroll. No hijack. Sections pin briefly for product screenshot sequences.
- **Section transitions**: Fade-up 12-16px, opacity 0 to 1, cubic-bezier(0.22, 1, 0.36, 1), 600-800ms.
- **Interactive elements**: Minimal hover, color-only transitions. No magnetic cursor. Links have 200ms color shifts.
- **Color and gradients**: Deep charcoal base, faint violet/indigo radial under hero, crisp mono text.
- **Typography**: Inter, tight tracking, no kinetic type. Purely structural hierarchy.
- **Background**: Signature 5x5 animated dot grid, each dot using steps(1, end) keyframes at 2800-3200ms, staggered to create wave propagation.
- **Differentiator**: The dot-matrix wave background as a full motion language, replacing hero video entirely.

## 3. Cursor - https://cursor.com
AI dev tool, product-first motion.

- **Hero motion**: Staggered headline reveal. Live IDE mockup animates with in-progress task states, type-on code, diff highlights. Feels like watching the product work.
- **Scroll behavior**: Native scroll with intersection-observer triggered reveals. No hijack.
- **Section transitions**: fadeSlideUp (2px Y), fadeSlideRight (2px X), tilePopIn (scale 0.7 to 1), barGrow (scaleY 0 to 1). Short throws, not long slides.
- **Interactive elements**: Conservative hover color shifts. No cursor tracking or magnetism.
- **Color and gradients**: Warm off-white light theme, deep olive-black dark theme. Flat, ambient overlays only.
- **Typography**: CursorGothic display + BerkeleyMono accents. Mono used to signal "code surface."
- **Background**: Plain surface. No particles or shaders. Composition carries the eye.
- **Differentiator**: Multi-surface demo stack (IDE, PR review, Slack, terminal) animating in sync to show ubiquity.

## 4. v0 - https://v0.app
Vercel's AI UI builder. Minimalist product-forward landing.

- **Hero motion**: Chat-style prompt input animates in, a generated UI preview materializes beside it with a fade-mask reveal. Framer Motion orchestrates entrance.
- **Scroll behavior**: Native scroll. Hidden scrollbars (scrollbar-width: none). Progressive disclosure by viewport.
- **Section transitions**: Soft fade-up with 60-80ms stagger. Component cards scale-in from 0.96 to 1.
- **Interactive elements**: Isolated per-card hover, no global cursor effect. Theme toggles with zero flash via MutationObserver.
- **Color and gradients**: hsl(0 0% 4%) dark / hsl(0 0% 98%) light. Almost no color. Accent only on focus.
- **Typography**: Geist Sans + Geist Mono. Restrained sizes. No kinetic type.
- **Background**: Solid. No grid, no particles. Generated UI previews are the visual interest.
- **Differentiator**: Hero demo actually generates live UI - output is the motion.

## 5. Framer - https://framer.com
The maximum-motion reference. Maximum in a considered way.

- **Hero motion**: Large kinetic headline, auto-playing looped product video behind, UI chrome elements float in with spring physics. Layered parallax from the first frame.
- **Scroll behavior**: Scroll-linked parallax across 3-5 depth layers. Sticky hero that next sections peek over. Section pinning for feature storytelling.
- **Section transitions**: Mask reveals (clip-path), spring-driven slide-in, stagger 40-80ms. Heavy use of transform and opacity together.
- **Interactive elements**: Magnetic CTAs, custom cursor that scales on hoverables, hover-lift cards with soft shadow growth.
- **Color and gradients**: Animated conic and linear gradients, blurred color blobs drifting in hero background, radial ambient glows.
- **Typography**: Display type scales with scroll via clamp + ScrollTrigger, variable font weight animations on hover.
- **Background**: Animated gradient mesh, drifting blurred orbs, subtle grain overlay.
- **Differentiator**: Kinetic gradient mesh background with drifting color orbs that interact with scroll position.

## 6. Ramp - https://ramp.com
Enterprise fintech. Confident motion, never loud.

- **Hero motion**: Headline fade-up, product dashboard screenshot slides up 24px with opacity 0 to 1, ~900ms. Short looped Jitter-made product micro-animations inside the dashboard (counters ticking, cards sliding).
- **Scroll behavior**: Native smooth scroll. Sections pin briefly for animated product demos. No aggressive hijack.
- **Section transitions**: Fade-up with 60ms stagger for stats, card scale-in 0.98 to 1 for feature tiles.
- **Interactive elements**: Color hover only. Buttons have shadow lift on hover, ~8px translateY on press.
- **Color and gradients**: Warm white base, signature emerald/lime accent, soft diagonal gradient headers.
- **Typography**: Custom sans, large display weights. Numbers animate (count-up) when stats enter viewport.
- **Background**: Clean white surfaces, thin hairline dividers, occasional soft gradient panels.
- **Differentiator**: Jitter-authored in-product micro-animations inside every screenshot - the product is always "moving."

## 7. Anthropic - https://anthropic.com
AI company. Restrained, editorial, technical.

- **Hero motion**: Word-by-word staggered reveal via GSAP, randomized 100-500ms delays per word, cubic-bezier(0.16, 1, 0.3, 1), 800ms, 24px translateY. Lottie-driven SVG hero with intro frames 0-60 then loop 61-120.
- **Scroll behavior**: GSAP ScrollTrigger with scrub 0.8 on feature sections. Background expands from constrained to full-bleed between 70% and 40% viewport.
- **Section transitions**: Opacity 0 + translateY(10%) on enter. Rotating headline text swap with -16px Y and 500ms exit/enter.
- **Interactive elements**: Card images scale 1.05x on hover. Dropdowns rotate 180deg. No magnetic cursor.
- **Color and gradients**: Cloud-light to slate-light tokens, warm cream base, no animated gradients.
- **Typography**: Styrene display + Tiempos serif. Clamp-based responsive sizing. Word stagger is the entire hero motion identity.
- **Background**: Static editorial imagery. Scroll-driven width expansion, no particles or shaders.
- **Differentiator**: Production-grade Lottie lifecycle (visibility pause, prefers-reduced-motion, bfcache-safe).

## 8. Mercury - https://mercury.com
Finance. Beautiful gradient-forward.

- **Hero motion**: Fade-up container (translateY 0, opacity 1). Hero image cross-fades between keyframe states (hero_start to hero_end), pseudo-video without the weight.
- **Scroll behavior**: Native scroll. Section-based intersection reveals. No hijack.
- **Section transitions**: Grid-aligned fade-up stagger. Cards slide up in unison, 80ms delay between columns.
- **Interactive elements**: Standard focus rings, aria-busy states. No custom cursor. Buttons rounded-4xl with color hover.
- **Color and gradients**: Signature purple theme, soft lavender-to-cream hero gradient, radial lighting behind cards.
- **Typography**: Arcadia display, tight tracking, generous leading. Text-balance on headlines. No kinetic type.
- **Background**: Gradient panels, no grid, no particles. Live data constants (APY rates) injected into UI.
- **Differentiator**: Static-looking gradients that shift subtly via keyframe image swaps - pseudo-motion without video cost.

---

## Common patterns across all 8

- **Dark or near-dark base with mono accents** (6/8). Even light themes lean desaturated.
- **Fade-up reveal as the default entrance**, 12-24px Y, opacity 0 to 1, 600-900ms, cubic-bezier(0.16, 1, 0.3, 1) or similar ease-out quint (8/8).
- **Intersection-observer driven scroll reveals** (8/8). Scroll hijack is rare; pinning is used sparingly.
- **Stagger between 40-100ms** across cards, words, grid cells (7/8).
- **Mono typeface used as a credibility signal** (5/8) - BerkeleyMono, Geist Mono, IBM Plex Mono.
- **Radial ambient glow under hero** (6/8) - soft, off-brand-color, 40-60% opacity.
- **Grid or dot backdrop** as a structural signature (5/8).
- **Minimal hover treatments** - color and 1.02-1.05 scale only. No magnetic cursors except Framer.
- **prefers-reduced-motion respected** at the library level (7/8 verified).

## Cinematic patterns Sylvaris should steal

1. **Anthropic's word-stagger hero reveal**. GSAP SplitText per-word spans, per-word transition-delay randomized 80-320ms, 24px translateY, opacity 0 to 1, 800ms, cubic-bezier(0.16, 1, 0.3, 1). Feels editorial and technical, never showy.
2. **Linear's 5x5 animated dot grid backdrop**. CSS-only, 50 keyframe tracks, steps(1, end), 2800-3200ms per dot, staggered to create wave propagation. Pure CSS, no JS cost.
3. **Framer's scroll-linked parallax depth layers**. 3 depth planes (background grid, mid-glow, foreground UI), each driven by scrollYProgress with different multipliers (0.2x, 0.5x, 1x) via Motion One useScroll.
4. **Motion.dev's spring-eased display headline**. Spring config stiffness 120, damping 20, mass 1. Applied to headline word scale 0.96 to 1 + translateY 20px to 0.
5. **Cursor's barGrow + tilePopIn product mock reveal**. scaleY 0 to 1 from bottom origin for accent bars, scale 0.7 to 1 + translateY 10px for tiles, 60ms stagger between tiles.
6. **Ramp's count-up stat animation on viewport enter**. Intersection observer fires a 1200ms tween from 0 to target, ease-out-expo, mono numerals to prevent width jitter.
7. **Anthropic's scrub-linked container expansion**. ScrollTrigger with scrub 0.8 animating container margin from clamp() to 0 as section crosses 70% to 40% viewport.

## Restrained patterns Sylvaris should borrow

1. **Linear's color-only link hover**, 200ms ease, no underline animation, no transform.
2. **Mercury's keyframe image swap** as a lightweight alternative to hero video - two stills cross-fading on a 6s loop.
3. **v0's zero-flash theme transition** via MutationObserver on documentElement class.
4. **Ramp's 8px press translateY** on primary CTAs, 100ms ease-out.
5. **Anthropic's rotating headline** with data-rotate attribute, 500ms exit/enter, -16px Y, for kinetic but quiet taglines.
6. **Linear's steps(1, end) timing** on status indicator pulses - discrete, not smooth, reads as system telemetry not decoration.
7. **Cursor's 2px fadeSlideUp** on small UI elements - barely visible but gives life.

## Anti-patterns to avoid

- **Framer-style maximalism** (animated gradient meshes, floating orbs, magnetic cursors). Reads as "design tool", not "operational system."
- **Mercury's purple pastel gradients**. Too finance-consumer, not enough technical density.
- **Ramp's warm cream backgrounds**. Too enterprise-brochure, not enough cockpit.
- **Cursor's multi-mockup stacking**. Visually busy, competes with headline.
- **Lottie for hero** (Anthropic). Heavy, hard to maintain, feels editorial not operational.
- **Long scroll hijacks** (>300ms scrub). Breaks the feeling that the user is piloting the interface.
- **Ornamental particles, WebGL noise shaders**. Drift from "operational" toward "AI art demo".
- **Excessive spring overshoot**. Sylvaris is instruments, not toys.

## Sylvaris's voice (inferred from the brief)

Sylvaris is an **operational AI cockpit**, not a SaaS landing page. The visual tone should read the way a mission control console reads: calm, dense with telemetry, low-chroma, mono-typed, and quietly alive. Motion exists to signal system state, not to entertain. The target emotional response is "this is running in production right now" - not "this looks fun to try".

Lean into:
- Near-black base (#07090B to #0B0E12), hairline grid backdrop, mono accent typography (IBM Plex Mono or Geist Mono) alongside a tight sans display (Inter Tight or Geist Sans).
- Single cool accent (cyan-teal or electric green) reserved for status dots and interactive affordances only.
- Motion that echoes telemetry: pulses, count-ups, ticker rolls, scanline sweeps on pinned sections, cursor readouts.
- No decorative color. No pastel. No playfulness. Every movement should answer "what is the system doing right now?"
- Restraint inherited from Linear and Anthropic, spring-ease from Motion.dev, depth parallax from Framer, product micro-animation density from Ramp.

The one sentence: **Sylvaris should feel like watching a live NASA console, not scrolling a product site.**

## Top 10 specific motion effects Sylvaris should implement

1. **Hero headline word-stagger reveal**. Trigger: page load after font-ready event. Target: h1 words wrapped in spans. Technique: GSAP SplitText + per-word delay randomized 80-320ms, translateY 24px to 0, opacity 0 to 1, 800ms, cubic-bezier(0.16, 1, 0.3, 1). Library: GSAP 3.13 + SplitText plugin.
2. **Ambient dot-grid backdrop with wave propagation**. Trigger: always on, visibility-paused when off-screen. Target: fixed background SVG or CSS grid. Technique: 6x6 dot matrix, each dot has opacity keyframes 0.2 to 0.9 to 0.2, duration 3000-3400ms, staggered diagonally, steps(1, end) for discrete telemetry feel. Library: pure CSS @keyframes.
3. **Live status pill pulse**. Trigger: always on. Target: green status dot beside "All systems operational". Technique: box-shadow spread 0 to 6px + opacity 0.8 to 0 at 1800ms linear, infinite. Library: CSS only.
4. **Section fade-up reveal on scroll**. Trigger: intersection observer 15% threshold. Target: every top-level section child. Technique: translateY 20px to 0, opacity 0 to 1, 700ms, cubic-bezier(0.22, 1, 0.36, 1), stagger 60ms between siblings. Library: Motion One (animate + inView).
5. **Count-up for stats and KPIs**. Trigger: intersection observer once. Target: any [data-count] element. Technique: 1400ms tween 0 to target, ease-out-expo, tabular-nums CSS for no layout shift. Library: Motion One animate() with onUpdate.
6. **Scroll-linked parallax depth (3 layers)**. Trigger: scroll. Target: background grid, mid-glow, foreground product mock. Technique: useScroll + useTransform, multipliers 0.15, 0.4, 1.0 on translateY, max offset 120px. Library: Motion (React) or Motion One scroll().
7. **Pinned cockpit section with scanline sweep**. Trigger: ScrollTrigger pin when section center crosses viewport center. Target: feature hero section. Technique: pin 1.5x viewport height, during pin a cyan horizontal scanline translates top to bottom with linear gradient mask, 2400ms linear loop. Library: GSAP ScrollTrigger.
8. **Mono ticker roll for the "live feed" strip**. Trigger: always on. Target: horizontal ticker of agent events. Technique: translateX from 0 to -100% of content width, 40s linear infinite, duplicated content for seamless loop. Library: CSS only.
9. **CTA press micro-interaction**. Trigger: pointerdown/up. Target: primary buttons. Technique: translateY 0 to 2px on down, back on up, 120ms ease-out. Plus color-shift hover 200ms. No magnetism. Library: CSS + pointer events.
10. **View Transitions API for route changes**. Trigger: client-side nav between landing sections or dashboard routes. Target: root. Technique: document.startViewTransition wrapping the DOM swap, with ::view-transition-old(root) and ::view-transition-new(root) running 260ms fade + 8px translateY. Fallback: instant swap. Library: native View Transitions API.

---

End of reference pass. Next step is Phase 2 motion architecture spec translating these ten effects into a reusable Sylvaris motion token set and a shared Motion One / GSAP wrapper layer.
