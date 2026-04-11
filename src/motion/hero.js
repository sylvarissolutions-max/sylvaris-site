// Hero choreography - GSAP timeline with SplitText word reveals, cockpit streaming, CTA cascade.
import { gsap } from 'gsap';

const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

function splitHeadline(el) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.textContent = '';
    const spans = words.map((word) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = word;
        el.appendChild(span);
        el.appendChild(document.createTextNode(' '));
        return span;
    });
    return spans;
}

export function initHero() {
    const heroOverline = document.querySelector('.hero-copy .overline');
    const heroHeadline = document.querySelector('.hero h1');
    const heroSub = document.querySelector('.hero-sub');
    const heroActions = document.querySelector('.hero-actions');
    const heroTrust = document.querySelectorAll('.hero-trust span');
    const cockpit = document.querySelector('.cockpit');
    const cockpitRows = document.querySelectorAll('.cockpit-row');
    const cockpitHead = document.querySelector('.cockpit-head');
    const cockpitFoot = document.querySelector('.cockpit-foot');

    if (!heroHeadline) return;

    const words = splitHeadline(heroHeadline);

    // Prime word initial state (applies inline so GSAP can animate cleanly)
    gsap.set(words, { opacity: 0, y: 18, rotateX: 12, force3D: true });

    const tl = gsap.timeline({ delay: 0.12, defaults: { ease: 'power3.out' } });

    tl.to(heroOverline, { opacity: 1, y: 0, duration: 0.4 }, 'hero')
      .to(words, { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.032 }, 'hero+=0.2')
      .to(heroSub, { opacity: 1, y: 0, duration: 0.44 }, 'hero+=0.55')
      .to(heroActions, { opacity: 1, y: 0, duration: 0.36 }, 'hero+=0.72')
      .to(heroTrust, { opacity: 1, duration: 0.28, stagger: 0.05, ease: 'none' }, 'hero+=0.88')
      .to(cockpit, { opacity: 1, y: 0, rotateX: 0, duration: 0.56, ease: 'power2.out' }, 'hero+=0.3')
      .to(cockpitRows, { opacity: 1, x: 0, duration: 0.36, stagger: 0.11, ease: 'power2.out' }, 'hero+=0.55');

    return tl;
}
