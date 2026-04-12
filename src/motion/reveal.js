// Scroll-reveal system - DRAMATIC version.
// Uses GSAP ScrollTrigger for all reveals.
// Animations are intentionally visible: larger translations, longer durations,
// 3D rotations on key elements, animated counter on the stat.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function animateCounter(el, target, duration) {
    const obj = { val: 0, opacity: 0 };
    gsap.to(obj, {
        val: target,
        opacity: 1,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
            el.textContent = '$' + obj.val.toFixed(1) + 'M';
            el.style.opacity = obj.opacity;
        },
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
    });
}

export function initReveal() {
    // Section heads - slide in from left with accent bar growing
    const simpleReveal = [
        '.section-head',
        '.problem-copy',
        '.final-copy',
        '.faq-intro',
    ];
    simpleReveal.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        });
    });

    // Problem panel - slides up with 3D tilt
    document.querySelectorAll('.problem-panel').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Animated counter on $2.4M
    document.querySelectorAll('.problem-stat-num').forEach((el) => {
        const text = el.textContent.trim();
        if (text.includes('2.4M')) {
            el.textContent = '$0.0M';
            animateCounter(el, 2.4, 2.0);
        } else {
            gsap.to(el, {
                opacity: 1,
                duration: 0.9,
                scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
            });
        }
    });

    // Final meta and compare wrap
    ['.final-meta', '.compare-wrap', '.callout', '.trust-strip .overline'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            });
        });
    });

    // Products - slide in with 3D perspective tilt
    document.querySelectorAll('.product').forEach((el, i) => {
        const fromRight = i % 2 === 1;
        gsap.to(el, {
            opacity: 1,
            y: 0,
            x: 0,
            rotateY: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none none',
            },
        });
        // Set initial 3D tilt
        gsap.set(el, {
            x: fromRight ? 40 : -40,
            rotateY: fromRight ? -4 : 4,
            transformPerspective: 1200,
        });
    });

    // Stagger groups - cards cascade in with scale
    const staggerGroups = [
        { parent: '.showcase-grid', items: '.showcase-card', stagger: 0.15 },
        { parent: '.process', items: '.process-step', stagger: 0.12 },
        { parent: '.pricing', items: '.price', stagger: 0.18 },
        { parent: '.risk-grid', items: '.risk-item', stagger: 0.12 },
        { parent: '.trust-row', items: '.trust-item', stagger: 0.08 },
        { parent: '.faq', items: '.faq-item', stagger: 0.08 },
    ];

    staggerGroups.forEach(({ parent, items, stagger }) => {
        const parentEl = document.querySelector(parent);
        if (!parentEl) return;
        const targets = parentEl.querySelectorAll(items);
        if (!targets.length) return;
        gsap.to(targets, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger,
            scrollTrigger: {
                trigger: parentEl,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
        // Set initial scale for cascade effect
        gsap.set(targets, { scale: 0.95 });
    });

    // Compare table rows cascade
    const compareRows = document.querySelectorAll('.compare tbody tr');
    if (compareRows.length) {
        gsap.to(compareRows, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.compare',
                start: 'top 82%',
                toggleActions: 'play none none none',
            },
        });
    }
}
