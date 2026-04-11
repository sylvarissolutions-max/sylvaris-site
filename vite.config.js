import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page Vite config for Sylvaris Solutions landing page.
// Each HTML file is a separate entry so Vercel gets proper static output
// with working cross-links (/privacy, /terms, /dpa, /404).

export default defineConfig({
    root: 'src',
    publicDir: resolve(__dirname, 'public'),
    base: '/',
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        cssMinify: 'esbuild',
        minify: 'esbuild',
        sourcemap: false,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                privacy: resolve(__dirname, 'src/privacy.html'),
                terms: resolve(__dirname, 'src/terms.html'),
                dpa: resolve(__dirname, 'src/dpa.html'),
                notFound: resolve(__dirname, 'src/404.html'),
            },
            output: {
                manualChunks: {
                    gsap: ['gsap'],
                    ogl: ['ogl'],
                    lenis: ['lenis'],
                },
            },
        },
    },
    server: {
        port: 5173,
        host: true,
    },
});
