// Product page entry - styles + minimal interactivity (no heavy motion)
import './styles/tokens.css';
import './styles/app.css';
import './styles/product-page.css';

// FAQ-style expand/collapse for feature sections
document.querySelectorAll('.feature-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle('open');
    });
});

// Nav scroll state (reuse from main)
const nav = document.querySelector('.nav');
if (nav) {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:40px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(([entry]) => {
        nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(sentinel);
}

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
    toggle.addEventListener('click', () => {
        const visible = links.style.display === 'flex';
        links.style.display = visible ? '' : 'flex';
        if (!visible) {
            Object.assign(links.style, {
                position: 'absolute', top: '60px', left: '0', right: '0',
                flexDirection: 'column', background: 'var(--surface)',
                borderBottom: '1px solid var(--border)', padding: '20px 24px', gap: '18px',
            });
        }
    });
}
