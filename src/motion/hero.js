// Hero choreography - cinematic version.
// Phase 1: page-load entrance (word reveal, cockpit stream-in)
// Phase 2: scroll-hijacked pin - cockpit rotates in 3D, stats animate,
//          background gradient shifts, hero text scales down and fades
import { gsap } from 'gsap';

function splitHeadline(el) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.textContent = '';
    return words.map((word) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = word;
        el.appendChild(span);
        el.appendChild(document.createTextNode(' '));
        return span;
    });
}

export function initHero() {
    const hero = document.querySelector('.hero');
    const heroOverline = document.querySelector('.hero-copy .overline');
    const heroHeadline = document.querySelector('.hero h1');
    const heroSub = document.querySelector('.hero-sub');
    const heroActions = document.querySelector('.hero-actions');
    const heroTrust = document.querySelectorAll('.hero-trust span');
    const cockpit = document.querySelector('.cockpit');
    const cockpitRows = document.querySelectorAll('.cockpit-row');
    const heroCopy = document.querySelector('.hero-copy');

    if (!heroHeadline || !hero) return null;

    const words = splitHeadline(heroHeadline);
    gsap.set(words, { opacity: 0, y: 24, rotateX: 15, force3D: true });

    // Phase 1: entrance timeline (plays on load)
    const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });

    tl.to(heroOverline, { opacity: 1, y: 0, duration: 0.5 }, 'hero')
      .to(words, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.04 }, 'hero+=0.18')
      .to(heroSub, { opacity: 1, y: 0, duration: 0.5 }, 'hero+=0.6')
      .to(heroActions, { opacity: 1, y: 0, duration: 0.4 }, 'hero+=0.78')
      .to(heroTrust, { opacity: 1, duration: 0.3, stagger: 0.06, ease: 'none' }, 'hero+=0.92')
      .to(cockpit, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: 'power2.out' }, 'hero+=0.35')
      .to(cockpitRows, { opacity: 1, x: 0, duration: 0.4, stagger: 0.13, ease: 'power2.out' }, 'hero+=0.6');

    // No scroll-hijack pin - it created a 540px void between hero and
    // the next section. The entrance animation is enough.

    return tl;
}
