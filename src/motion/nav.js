// Nav entrance + scroll-state toggle.
import { animate, stagger } from 'motion';

export function initNav() {
    const nav = document.querySelector('.nav');
    const brand = document.querySelector('.nav .brand');
    const links = document.querySelectorAll('.nav .nav-links li');
    const cta = document.querySelector('.nav .nav-cta .btn');

    if (!nav) return;

    // Entrance - runs 80ms after page load to yield to LCP paint
    setTimeout(() => {
        animate(nav, { opacity: [0, 1], transform: ['translateY(-8px)', 'translateY(0)'] }, { duration: 0.4, easing: 'ease-out' });
        if (brand) animate(brand, { opacity: [0, 1] }, { duration: 0.3, delay: 0.08 });
        if (links.length) {
            animate(links, { opacity: [0, 1], transform: ['translateX(-6px)', 'translateX(0)'] }, { duration: 0.28, delay: stagger(0.04, { start: 0.12 }) });
        }
        if (cta) animate(cta, { opacity: [0, 1] }, { duration: 0.28, delay: 0.24 });
    }, 80);

    // Scroll-state toggle - uses a 1px sentinel with IntersectionObserver
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:40px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);

    const io = new IntersectionObserver(([entry]) => {
        nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(sentinel);

    // Nav link smooth scroll handled by Lenis (it intercepts anchor clicks)
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
