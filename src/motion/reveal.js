// Scroll-reveal system - CINEMATIC version.
// Uses GSAP ScrollTrigger with scrub for parallax and 3D transforms.
// Every section has intentionally visible motion, not subtle polish.
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

    // ========================================
    // PROBLEM SECTION - pinned stat counter
    // ========================================
    const problemSection = document.querySelector('#problem');
    const problemPanel = document.querySelector('.problem-panel');
    const problemCopy = document.querySelector('.problem-copy');

    if (problemSection && problemPanel) {
        // Reveal the copy first
        gsap.to(problemCopy, {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: problemSection, start: 'top 80%', toggleActions: 'play none none none' },
        });

        // Problem panel slides in with 3D rotation
        gsap.to(problemPanel, {
            opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: problemSection, start: 'top 75%', toggleActions: 'play none none none' },
        });

        // Animated counter
        document.querySelectorAll('.problem-stat-num').forEach(el => {
            if (el.textContent.includes('2.4') || el.textContent.includes('0.0')) {
                el.textContent = '$0.0M';
                animateCounter(el, 2.4, 2.5);
            }
        });
    }

    // ========================================
    // PRODUCTS - alternating slide-in with parallax on mock dashboards
    // ========================================
    document.querySelectorAll('.product').forEach((el, i) => {
        const mock = el.querySelector('.mock');
        const info = el.querySelector('.product-info');
        const fromRight = i % 2 === 1;

        // Product info slides in from the side
        if (info) {
            gsap.set(info, { x: fromRight ? 60 : -60, opacity: 0 });
            gsap.to(info, {
                x: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
            });
        }

        // Mock dashboard slides in from the opposite side with 3D
        if (mock) {
            gsap.set(mock, {
                x: fromRight ? -60 : 60,
                opacity: 0,
                rotateY: fromRight ? 8 : -8,
                transformPerspective: 1200,
            });
            gsap.to(mock, {
                x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
            });

            // Parallax: mock dashboard scrolls slower than content
            gsap.to(mock, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    });

    // ========================================
    // SECTION HEADS - slide in with accent bar grow
    // ========================================
    document.querySelectorAll('.section-head').forEach(el => {
        gsap.to(el, {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
    });

    // ========================================
    // COMPARE TABLE - rows cascade with stagger
    // ========================================
    const compareWrap = document.querySelector('.compare-wrap');
    if (compareWrap) {
        gsap.to(compareWrap, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: compareWrap, start: 'top 85%', toggleActions: 'play none none none' },
        });
        const rows = document.querySelectorAll('.compare tbody tr');
        if (rows.length) {
            gsap.to(rows, {
                opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
                scrollTrigger: { trigger: compareWrap, start: 'top 80%', toggleActions: 'play none none none' },
            });
        }
    }

    // ========================================
    // SHOWCASE CARDS - fly in from bottom with 3D rotation
    // ========================================
    const showcaseGrid = document.querySelector('.showcase-grid');
    if (showcaseGrid) {
        const cards = showcaseGrid.querySelectorAll('.showcase-card');
        cards.forEach((card, i) => {
            gsap.set(card, { rotateX: 8, transformPerspective: 800, scale: 0.92 });
            gsap.to(card, {
                opacity: 1, y: 0, rotateX: 0, scale: 1,
                duration: 0.9, delay: i * 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: showcaseGrid, start: 'top 82%', toggleActions: 'play none none none' },
            });
        });
    }

    // ========================================
    // PROCESS STEPS - counter-style cascade with number highlight
    // ========================================
    const processGrid = document.querySelector('.process');
    if (processGrid) {
        const steps = processGrid.querySelectorAll('.process-step');
        steps.forEach((step, i) => {
            gsap.set(step, { scale: 0.9 });
            gsap.to(step, {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7, delay: i * 0.14, ease: 'power3.out',
                scrollTrigger: { trigger: processGrid, start: 'top 82%', toggleActions: 'play none none none' },
            });
        });
    }

    // ========================================
    // PRICING TIERS - dramatic cascade with featured tier emphasis
    // ========================================
    const pricingGrid = document.querySelector('.pricing');
    if (pricingGrid) {
        const tiers = pricingGrid.querySelectorAll('.price');
        tiers.forEach((tier, i) => {
            const isFeatured = tier.classList.contains('featured');
            gsap.set(tier, {
                scale: isFeatured ? 0.88 : 0.92,
                rotateY: i === 0 ? 6 : i === 2 ? -6 : 0,
                transformPerspective: 1200,
            });
            gsap.to(tier, {
                opacity: 1, y: 0, scale: 1, rotateY: 0,
                duration: isFeatured ? 1.0 : 0.8,
                delay: i * 0.2,
                ease: 'power3.out',
                scrollTrigger: { trigger: pricingGrid, start: 'top 82%', toggleActions: 'play none none none' },
            });

            // Featured tier gets extra glow animation on reveal
            if (isFeatured) {
                gsap.fromTo(tier, {
                    boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)',
                }, {
                    boxShadow: '0 40px 80px -32px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.35) inset',
                    duration: 1.2,
                    delay: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: pricingGrid, start: 'top 82%', toggleActions: 'play none none none' },
                });
            }
        });
    }

    // ========================================
    // CALLOUT, RISK, TRUST, FAQ, FINAL
    // ========================================
    ['.callout', '.trust-strip .overline', '.final-copy', '.final-meta', '.faq-intro'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            });
        });
    });

    // Risk items with stagger
    const riskGrid = document.querySelector('.risk-grid');
    if (riskGrid) {
        const items = riskGrid.querySelectorAll('.risk-item');
        gsap.to(items, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: riskGrid, start: 'top 85%', toggleActions: 'play none none none' },
        });
    }

    // Trust items cascade
    const trustRow = document.querySelector('.trust-row');
    if (trustRow) {
        const items = trustRow.querySelectorAll('.trust-item');
        items.forEach((item, i) => {
            gsap.set(item, { scale: 0.85 });
            gsap.to(item, {
                opacity: 1, y: 0, scale: 1,
                duration: 0.5, delay: i * 0.06, ease: 'power3.out',
                scrollTrigger: { trigger: trustRow, start: 'top 85%', toggleActions: 'play none none none' },
            });
        });
    }

    // FAQ items cascade
    const faqContainer = document.querySelector('.faq');
    if (faqContainer) {
        const items = faqContainer.querySelectorAll('.faq-item');
        gsap.to(items, {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: faqContainer, start: 'top 85%', toggleActions: 'play none none none' },
        });
    }

    // ========================================
    // GLOBAL PARALLAX LAYERS
    // ========================================
    // Section borders get a subtle parallax shift
    document.querySelectorAll('.section').forEach(section => {
        const head = section.querySelector('.section-head');
        if (head) {
            gsap.to(head, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    });

    // Final meta panel parallax
    const finalMeta = document.querySelector('.final-meta');
    if (finalMeta) {
        gsap.to(finalMeta, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.final',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }
}
