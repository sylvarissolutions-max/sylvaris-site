// Lenis smooth scroll wired to GSAP ticker so ScrollTrigger updates stay in sync.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScroll() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Skip smooth scroll entirely
        return null;
    }

    const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        smoothWheel: true,
    });

    // GSAP ticker integration - single RAF loop for everything
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Anchor link smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    lenis.scrollTo(target, { offset: -60 });
                }
            }
        });
    });

    return lenis;
}
