// Nav entrance + scroll-state toggle (GSAP only, no Motion One).
import { gsap } from 'gsap';

export function initNav() {
    const nav = document.querySelector('.nav');
    const brand = document.querySelector('.nav .brand');
    const links = document.querySelectorAll('.nav .nav-links li');
    const cta = document.querySelector('.nav .nav-cta .btn');

    if (!nav) return;

    // Prime initial states explicitly so GSAP knows the start values
    gsap.set(links, { x: -6 });

    // Entrance timeline - runs 80ms after page load to yield to LCP paint
    const tl = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } });
    tl.to(nav, { opacity: 1, y: 0, duration: 0.4 }, 0)
      .to(brand, { opacity: 1, duration: 0.3 }, 0.08)
      .to(links, { opacity: 1, x: 0, duration: 0.28, stagger: 0.04 }, 0.12)
      .to(cta, { opacity: 1, duration: 0.28 }, 0.24);

    // Scroll-state toggle - sentinel with IntersectionObserver
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:40px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);

    const io = new IntersectionObserver(([entry]) => {
        nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(sentinel);

    // Mobile menu toggle
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const visible = navLinks.style.display === 'flex';
            navLinks.style.display = visible ? '' : 'flex';
            if (!visible) {
                Object.assign(navLinks.style, {
                    position: 'absolute',
                    top: '60px',
                    left: '0',
                    right: '0',
                    flexDirection: 'column',
                    background: 'var(--surface)',
                    borderBottom: '1px solid var(--border)',
                    padding: '20px 24px',
                    gap: '18px',
                });
            }
        });
    }
}
