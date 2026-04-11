// Boot script - sets html.motion-ready synchronously BEFORE first paint.
// This must run as a blocking script in <head> so animated elements are
// hidden before the browser paints them, preventing flash-of-visible-content.
// If JS is disabled or fails, the class is never set and elements stay visible.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) {
    document.documentElement.classList.add('motion-ready');
}
