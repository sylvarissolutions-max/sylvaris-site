// Hero choreography - cinematic version.
// Phase 1: page-load entrance (word reveal, cockpit stream-in)
// Phase 2: scroll-hijacked pin - cockpit rotates in 3D, stats animate,
//          background gradient shifts, hero text scales down and fades
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    // Phase 2: scroll-hijacked hero pin
    // When user scrolls past the hero, the section pins and the cockpit
    // rotates in 3D while the copy fades/scales down. Creates a cinematic
    // transition effect between the hero and the problem section.
    tl.eventCallback('onComplete', () => {
        // Only create the pin AFTER entrance completes
        ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: '+=60%',
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            onUpdate: (self) => {
                const p = self.progress;

                // Hero copy fades and scales down as you scroll
                gsap.set(heroCopy, {
                    opacity: 1 - p * 0.7,
                    scale: 1 - p * 0.08,
                    y: -p * 40,
                    filter: `blur(${p * 3}px)`,
                });

                // Cockpit rotates and lifts - creates a 3D reveal effect
                gsap.set(cockpit, {
                    rotateY: p * 6,
                    rotateX: -p * 4,
                    scale: 1 + p * 0.06,
                    y: -p * 20,
                    boxShadow: `0 ${40 + p * 40}px ${80 + p * 40}px -${32 - p * 10}px rgba(99, 102, 241, ${0.4 + p * 0.3})`,
                });
            },
        });

        // Parallax on the hero ambient glow
        gsap.to('body::after', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    });

    return tl;
}
