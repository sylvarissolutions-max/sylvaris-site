// Cursor-following radial glow and 3D card tilt.
// Disabled on coarse pointer (touch) devices.

export function initCursor() {
    if (matchMedia('(pointer: coarse)').matches) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let raf = null;
    let visible = false;

    const tick = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!visible) {
            visible = true;
            glow.classList.add('visible');
        }
        if (!raf) tick();
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
        visible = false;
        glow.classList.remove('visible');
    });

    // 3D tilt on hover for cards with `.tiltable` or key product elements
    const tiltables = document.querySelectorAll('.cockpit, .mock, .problem-panel, .final-meta, .showcase-card, .price');
    tiltables.forEach((el) => {
        let rect = null;
        const update = () => {
            rect = el.getBoundingClientRect();
        };
        el.addEventListener('pointerenter', () => { update(); });
        el.addEventListener('pointermove', (e) => {
            if (!rect) update();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotX = (-y * 4).toFixed(2);
            const rotY = (x * 4).toFixed(2);
            el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
        }, { passive: true });
        el.addEventListener('pointerleave', () => {
            el.style.transform = '';
            rect = null;
        });
    });
}
