/**
 * The drifting dune field behind the landing hero.
 *
 * One full-screen fragment shader on a bare WebGL context rather than a 3D
 * library: the scene is a handful of layered ridgelines, and a library would
 * cost more bytes than the rest of the page's JavaScript put together.
 *
 * Everything here is decoration. If WebGL is missing the canvas stays
 * transparent and the CSS gradient under it is the hero background.
 */

const VERTEX = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform float uBand;
uniform vec3 uSkyTop;
uniform vec3 uSkyMid;
uniform vec3 uGlow;
uniform vec3 uFar;
uniform vec3 uNear;
uniform vec3 uRim;

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(hash(i), hash(i + 1.0), u);
}

// Mostly one long swell with a little detail on top, so the ridges read as
// wind-shaped dunes rather than a mountain skyline.
float ridge(float x) {
  return noise(x) * 0.68 + noise(x * 2.07 + 11.3) * 0.24 + noise(x * 4.3 + 5.7) * 0.08;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  // Horizontal distance in units of the dune band's height, so the dunes keep
  // their proportions on a phone and on an ultra-wide display alike.
  float x = gl_FragCoord.x / (uBand * uRes.y);

  vec3 col = mix(uSkyMid, uSkyTop, smoothstep(uBand + 0.12, 1.0, uv.y));
  float glow = exp(-pow((uv.y - uBand * 1.05) / 0.17, 2.0));
  col = mix(col, uGlow, glow * 0.9);

  for (int i = 0; i < 6; i++) {
    float fi = float(i) / 5.0;
    float base = uBand * mix(0.9, 0.2, fi);
    float amp = uBand * mix(0.2, 0.42, fi);
    float freq = mix(1.55, 0.6, fi);
    float px = x * freq + fi * 37.0 + uTime * mix(0.004, 0.02, fi);

    float crest = base + (ridge(px) - 0.5) * amp;
    float below = crest - uv.y;
    float edge = smoothstep(0.0, 2.5 / uRes.y, below);

    // Warm light comes from the right, so slopes that fall away to the right
    // catch it and the ones behind them stay in blue shadow.
    float slope = (ridge(px + 0.04) - ridge(px - 0.04)) / 0.08;
    float facing = smoothstep(-0.55, 0.75, -slope);
    float depth = clamp(below / (uBand * 0.3), 0.0, 1.0);

    vec3 body = mix(uFar, uNear, fi);
    vec3 dune = mix(body, uRim, facing * (1.0 - depth) * (1.0 - depth) * 0.85);
    // Mist settles in the hollow between one ridge and the next.
    dune = mix(dune, uSkyMid, depth * 0.3 * (1.0 - fi * 0.6));
    // Distant dunes fade into the air in front of them.
    dune = mix(dune, uGlow, (1.0 - fi) * 0.2);

    col = mix(col, dune, edge);
  }

  gl_FragColor = vec4(col, 1.0);
}`;

type RGB = [number, number, number];
type Palette = Record<'skyTop' | 'skyMid' | 'glow' | 'far' | 'near' | 'rim', RGB>;

const hex = (value: string): RGB => [
  parseInt(value.slice(1, 3), 16) / 255,
  parseInt(value.slice(3, 5), 16) / 255,
  parseInt(value.slice(5, 7), 16) / 255,
];

const LIGHT: Palette = {
  skyTop: hex('#bcd6ee'),
  skyMid: hex('#edf4fa'),
  glow: hex('#fbe2cf'),
  far: hex('#a6c6e6'),
  near: hex('#3d70b0'),
  rim: hex('#fff1e3'),
};

const DARK: Palette = {
  skyTop: hex('#050818'),
  skyMid: hex('#0f1738'),
  glow: hex('#3b2f66'),
  far: hex('#27306a'),
  near: hex('#0b1030'),
  rim: hex('#8d97ff'),
};

/** How tall the dune band is, in CSS pixels, before it is capped. */
const BAND_PX = 430;
/** Soft shapes do not need a retina buffer, and a phone GPU is glad of it. */
const MAX_DPR = 1.5;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function initHeroSky(canvas: HTMLCanvasElement): void {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  // One oversized triangle covers the viewport without a diagonal seam.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const uRes = uniform('uRes');
  const uTime = uniform('uTime');
  const uBand = uniform('uBand');
  const colours: [keyof Palette, WebGLUniformLocation | null][] = [
    ['skyTop', uniform('uSkyTop')],
    ['skyMid', uniform('uSkyMid')],
    ['glow', uniform('uGlow')],
    ['far', uniform('uFar')],
    ['near', uniform('uNear')],
    ['rim', uniform('uRim')],
  ];

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isDark = () => root.classList.contains('dark');

  // 0 is the day palette, 1 the night one; it eases between them so the theme
  // toggle cross-fades the sky instead of snapping it.
  let night = isDark() ? 1 : 0;
  let visible = true;
  let frame = 0;
  let last = performance.now();
  let clock = 0;

  function resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl!.viewport(0, 0, width, height);
  }

  function draw(): void {
    resize();
    gl!.uniform2f(uRes, canvas.width, canvas.height);
    gl!.uniform1f(uTime, clock);
    gl!.uniform1f(uBand, Math.min(0.5, BAND_PX / Math.max(1, canvas.clientHeight)));
    for (const [key, location] of colours) {
      const day = LIGHT[key];
      const dusk = DARK[key];
      gl!.uniform3f(
        location,
        day[0] + (dusk[0] - day[0]) * night,
        day[1] + (dusk[1] - day[1]) * night,
        day[2] + (dusk[2] - day[2]) * night,
      );
    }
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    canvas.dataset.ready = 'true';
  }

  function tick(now: number): void {
    const delta = Math.max(0, Math.min(0.1, (now - last) / 1000));
    last = now;

    const target = isDark() ? 1 : 0;
    const fading = Math.abs(target - night) > 0.001;
    night = fading ? night + (target - night) * Math.min(1, delta * 6) : target;

    if (!reducedMotion.matches) clock += delta;
    draw();

    // With motion reduced the dunes stand still, so the loop only has to run
    // for as long as a theme cross-fade is in progress.
    const keepGoing = visible && !document.hidden && (!reducedMotion.matches || fading);
    frame = keepGoing ? requestAnimationFrame(tick) : 0;
  }

  /** Starts the loop if it is idle; a no-op while it is already running. */
  function schedule(): void {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }

  // Off-screen or in a background tab there is nothing to see, so stop drawing.
  new IntersectionObserver(entries => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) schedule();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) schedule();
  });

  new ResizeObserver(schedule).observe(canvas);
  new MutationObserver(schedule).observe(root, { attributes: true, attributeFilter: ['class'] });
  reducedMotion.addEventListener('change', schedule);

  schedule();
}
