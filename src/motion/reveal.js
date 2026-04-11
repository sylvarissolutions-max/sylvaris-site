// Scroll-reveal system - uses IntersectionObserver for efficiency.
// Handles data-animate elements AND section-level batch reveals.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initReveal() {
    // Section heads and hero-anchored layout pieces
    const simpleReveal = [
        '.section-head',
        '.problem-copy',
        '.problem-panel',
        '.final-copy',
        '.final-meta',
        '.faq-intro',
        '.compare-wrap',
        '.callout',
        '.trust-strip .overline',
    ];
    simpleReveal.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                },
            });
        });
    });

    // Problem stat gradient reveal - a soft fade with no y translation
    document.querySelectorAll('.problem-stat-num').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 78%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Product blocks stagger (two big product sections)
    document.querySelectorAll('.product').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Showcase cards, process steps, pricing tiers, risk items, trust items, FAQ items
    const staggerGroups = [
        { parent: '.showcase-grid', items: '.showcase-card', stagger: 0.12 },
        { parent: '.process', items: '.process-step', stagger: 0.1 },
        { parent: '.pricing', items: '.price', stagger: 0.14 },
        { parent: '.risk-grid', items: '.risk-item', stagger: 0.1 },
        { parent: '.trust-row', items: '.trust-item', stagger: 0.06 },
        { parent: '.faq', items: '.faq-item', stagger: 0.06 },
    ];

    staggerGroups.forEach(({ parent, items, stagger }) => {
        const parentEl = document.querySelector(parent);
        if (!parentEl) return;
        const targets = parentEl.querySelectorAll(items);
        if (!targets.length) return;
        gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger,
            scrollTrigger: {
                trigger: parentEl,
                start: 'top 82%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Compare table rows cascade
    const compareRows = document.querySelectorAll('.compare tbody tr');
    if (compareRows.length) {
        gsap.to(compareRows, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
                trigger: '.compare',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    }
}
