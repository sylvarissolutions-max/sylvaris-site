// Ambient WebGL gradient canvas using ogl.
// Two slowly drifting radial gradients with smoothstep falloff.
// Capped at ~30 fps on mobile, 60 fps on desktop. devicePixelRatio capped at 1.5.

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
in vec2 vUv;
out vec4 fragColor;

float smoothBlob(vec2 uv, vec2 center, float radius, float softness) {
    float d = length(uv - center);
    return 1.0 - smoothstep(radius - softness, radius, d);
}

void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.05;

    // Two slowly drifting blob centers
    vec2 c1 = vec2(0.5 + sin(t * 0.6) * 0.2, 0.35 + cos(t * 0.4) * 0.15);
    vec2 c2 = vec2(0.6 + cos(t * 0.5) * 0.25, 0.65 + sin(t * 0.7) * 0.2);

    c1.x *= uResolution.x / uResolution.y;
    c2.x *= uResolution.x / uResolution.y;

    float blob1 = smoothBlob(uv, c1, 0.35, 0.4);
    float blob2 = smoothBlob(uv, c2, 0.3, 0.35);

    // Accent purple blended with deep base
    vec3 base = vec3(0.024, 0.024, 0.063);
    vec3 accent1 = vec3(0.388, 0.4, 0.945);
    vec3 accent2 = vec3(0.137, 0.827, 0.933);

    vec3 color = base;
    color = mix(color, accent1, blob1 * 0.18);
    color = mix(color, accent2, blob2 * 0.08);

    fragColor = vec4(color, 1.0);
}
`;

export function initCanvas() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

    const canvas = document.createElement('canvas');
    canvas.className = 'ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = matchMedia('(pointer: coarse)').matches;
    const fpsCap = isMobile ? 30 : 60;
    const frameInterval = 1000 / fpsCap;

    let renderer, program, mesh;
    try {
        renderer = new Renderer({ canvas, dpr, alpha: false, antialias: false });
        const gl = renderer.gl;
        gl.clearColor(0.024, 0.024, 0.063, 1);

        const geometry = new Triangle(gl);
        program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [1, 1] },
            },
        });
        mesh = new Mesh(gl, { geometry, program });
    } catch (err) {
        // WebGL not available - fail silently, CSS ambient gradient will show through
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
            renderer.render({ scene: mesh });
            lastFrame = t;
        }
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return { canvas, renderer };
}
