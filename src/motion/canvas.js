// Ambient WebGL gradient canvas - scroll-reactive, visible, cinematic.
// Three drifting radial gradients with stronger intensity.
// Responds to scroll position so the gradient shifts as user moves through the page.
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uScroll;
in vec2 vUv;
out vec4 fragColor;

float blob(vec2 uv, vec2 center, float r, float soft) {
    return 1.0 - smoothstep(r - soft, r, length(uv - center));
}

void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    float t = uTime * 0.08;
    float scroll = uScroll * 0.0003;

    vec2 c1 = vec2((0.55 + sin(t * 0.7) * 0.25) * aspect, 0.3 + cos(t * 0.5) * 0.2 - scroll);
    vec2 c2 = vec2((0.4 + cos(t * 0.6) * 0.3) * aspect, 0.7 + sin(t * 0.8) * 0.25 - scroll * 0.5);
    vec2 c3 = vec2((0.7 + sin(t * 0.4) * 0.15) * aspect, 0.5 + cos(t * 0.9) * 0.15 - scroll * 0.3);

    float b1 = blob(uv, c1, 0.45, 0.5);
    float b2 = blob(uv, c2, 0.4, 0.45);
    float b3 = blob(uv, c3, 0.3, 0.35);

    vec3 base = vec3(0.024, 0.024, 0.063);
    vec3 color = base;
    color = mix(color, vec3(0.39, 0.4, 0.945), b1 * 0.30);
    color = mix(color, vec3(0.13, 0.83, 0.93), b2 * 0.16);
    color = mix(color, vec3(0.55, 0.35, 0.95), b3 * 0.12);

    fragColor = vec4(color, 1.0);
}
`;

let scrollY = 0;

export function updateCanvasScroll(y) { scrollY = y; }

export function initCanvas() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

    const canvas = document.createElement('canvas');
    canvas.className = 'ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = matchMedia('(pointer: coarse)').matches;
    const frameInterval = 1000 / (isMobile ? 30 : 60);

    let renderer, program, mesh;
    try {
        renderer = new Renderer({ canvas, dpr, alpha: false, antialias: false });
        renderer.gl.clearColor(0.024, 0.024, 0.063, 1);

        const geometry = new Triangle(renderer.gl);
        program = new Program(renderer.gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [1, 1] },
                uScroll: { value: 0 },
            },
        });
        mesh = new Mesh(renderer.gl, { geometry, program });
    } catch (err) {
        canvas.remove();
        return null;
    }

    const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastFrame = 0;
    const loop = (t) => {
        if (t - lastFrame >= frameInterval) {
            program.uniforms.uTime.value = t * 0.001;
            program.uniforms.uScroll.value = scrollY;
            renderer.render({ scene: mesh });
            lastFrame = t;
        }
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return { canvas, renderer };
}
