// FAQ accordion toggle - uses native max-height CSS transition for smoothness.

export function initFaq() {
    document.querySelectorAll('.faq-q').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');
            item.classList.toggle('open', !isOpen);
        });
    });
}
