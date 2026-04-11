// Motion system orchestrator - single entry point imported by main.js.
// Initializes all motion modules in the correct order on DOMContentLoaded.

import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initReveal } from './reveal.js';
import { initCursor } from './cursor.js';
import { initCanvas } from './canvas.js';
import { initScroll } from './scroll.js';
import { initFaq } from './faq.js';

function boot() {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Always initialize FAQ (it's functional, not decorative)
    initFaq();

    if (reduced) {
        // Reveal all animated elements immediately
        document.documentElement.classList.remove('motion-ready');
        return;
    }

    // Canvas first - it's a background effect, independent of scroll
    initCanvas();

    // Scroll system next - Lenis must be running before ScrollTrigger fires
    initScroll();

    // Cursor effects
    initCursor();

    // Nav entrance
    initNav();

    // Hero choreography (timeline, runs on load)
    initHero();

    // Scroll-reveal bindings for everything else
    initReveal();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
