// Cursor-following glow and 3D card tilt - DRAMATIC version.
// Bigger glow, stronger tilt, magnetic button pull, visible on every section.
import { gsap } from 'gsap';

export function initCursor() {
    if (matchMedia('(pointer: coarse)').matches) return;

    // Cursor glow
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let visible = false;

    const tick = () => {
        currentX += (targetX - currentX) * 0.12; // slower follow = more cinematic lag
        currentY += (targetY - currentY) * 0.12;
        glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('pointermove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!visible) {
            visible = true;
            glow.classList.add('visible');
        }
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
        visible = false;
        glow.classList.remove('visible');
    });

    // 3D tilt on hover - STRONGER rotation for cinematic feel
    const tiltables = document.querySelectorAll('.cockpit, .mock, .problem-panel, .final-meta, .showcase-card, .price, .compare-wrap, .faq-aside, .callout');
    tiltables.forEach((el) => {
        el.style.transformStyle = 'preserve-3d';
        let rect = null;

        el.addEventListener('pointerenter', () => {
            rect = el.getBoundingClientRect();
            gsap.to(el, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });

        el.addEventListener('pointermove', (e) => {
            if (!rect) rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(el, {
                rotateX: -y * 8,
                rotateY: x * 8,
                transformPerspective: 800,
                duration: 0.4,
                ease: 'power2.out',
            });
        }, { passive: true });

        el.addEventListener('pointerleave', () => {
            gsap.to(el, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out',
            });
            rect = null;
        });
    });

    // Magnetic buttons - pull toward cursor on hover
    document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('pointermove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.3,
                ease: 'power2.out',
            });
        }, { passive: true });

        btn.addEventListener('pointerleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
    });
}
