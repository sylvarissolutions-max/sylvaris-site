// Motion system orchestrator.
// Critical fix: ScrollTrigger.refresh() runs AFTER hero animation completes
// so below-fold trigger positions are calculated correctly.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initReveal } from './reveal.js';
import { initCursor } from './cursor.js';
import { initCanvas, updateCanvasScroll } from './canvas.js';
import { initScroll } from './scroll.js';
import { initFaq } from './faq.js';

gsap.registerPlugin(ScrollTrigger);

function boot() {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    initFaq();

    if (reduced) {
        document.documentElement.classList.remove('motion-ready');
        return;
    }

    // Canvas (background)
    initCanvas();

    // Smooth scroll (Lenis wired to GSAP ticker)
    const lenis = initScroll();

    // Wire canvas to scroll position for reactive gradient
    if (lenis) {
        lenis.on('scroll', ({ scroll }) => {
            updateCanvasScroll(scroll);
        });
    }

    // Cursor glow
    initCursor();

    // Nav entrance
    initNav();

    // Hero choreography
    const heroTimeline = initHero();

    // Scroll reveals MUST wait for hero to finish.
    // Hero animation splits text and repositions elements, which invalidates
    // ScrollTrigger's cached positions. Refresh after hero completes.
    if (heroTimeline) {
        heroTimeline.eventCallback('onComplete', () => {
            ScrollTrigger.refresh(true);
            initReveal();
        });
    } else {
        gsap.delayedCall(1.8, () => {
            ScrollTrigger.refresh(true);
            initReveal();
        });
    }

    // Safety: refresh again after window load (images, fonts, everything settled)
    window.addEventListener('load', () => {
        gsap.delayedCall(0.5, () => ScrollTrigger.refresh(true));
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
