/**
 * The Himalayan skyline behind the landing hero: snow peaks at the back,
 * rounded foothills in front.
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
uniform float uBand;
uniform vec3 uSkyTop;
uniform vec3 uSkyMid;
uniform vec3 uGlow;
uniform vec3 uFar;
uniform vec3 uNear;
uniform vec3 uRim;
uniform vec3 uRock;
uniform vec3 uSnow;
uniform vec3 uSnowShade;

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(hash(i), hash(i + 1.0), u);
}

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x),
             mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Rounded hills: one long swell with a little detail, for the foothills.
float hills(float x) {
  return noise(x) * 0.68 + noise(x * 2.07 + 11.3) * 0.24 + noise(x * 4.3 + 5.7) * 0.08;
}

// Six octaves of squared ridged noise: sharp, eroded crests whose detail
// shrinks with each octave, the way a real ridgeline breaks into smaller spurs.
float ridged(float x) {
  float h = 0.0;
  float a = 0.55;
  float f = 1.0;
  for (int o = 0; o < 6; o++) {
    float n = 1.0 - abs(noise(x * f + float(o) * 7.3) * 2.0 - 1.0);
    h += a * n * n;
    a *= 0.48;
    f *= 2.03;
  }
  return h;
}

// A slow envelope lifts a few summits far above their neighbours, as one
// massif stands over the rest of a range.
float massif(float x) {
  return 0.3 + 0.95 * smoothstep(0.15, 0.95, noise(x * 0.33 + 3.1));
}

// The same ridge with only its three broadest octaves: the big faces, without
// the small spurs, for working out which way a slope faces.
float ridgedBroad(float x) {
  float h = 0.0;
  float a = 0.55;
  float f = 1.0;
  for (int o = 0; o < 3; o++) {
    float n = 1.0 - abs(noise(x * f + float(o) * 7.3) * 2.0 - 1.0);
    h += a * n * n;
    a *= 0.48;
    f *= 2.03;
  }
  return h;
}

// The far ranges are jagged peaks; towards the front they soften into hills.
float profile(float x, float fi) {
  return mix(ridged(x) * massif(x), hills(x) * 0.7, smoothstep(0.45, 0.85, fi));
}

float profileBroad(float x, float fi) {
  return mix(ridgedBroad(x) * massif(x), hills(x) * 0.7, smoothstep(0.45, 0.85, fi));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  // Horizontal distance in units of the mountain band's height, so the range
  // keeps its proportions on a phone and on an ultra-wide display alike.
  float x = gl_FragCoord.x / (uBand * uRes.y);

  vec3 col = mix(uSkyMid, uSkyTop, smoothstep(uBand + 0.12, 1.0, uv.y));
  float glow = exp(-pow((uv.y - uBand * 1.05) / 0.17, 2.0));
  col = mix(col, uGlow, glow * 0.9);

  for (int i = 0; i < 5; i++) {
    float fi = float(i) / 4.0;
    float base = uBand * mix(0.6, 0.08, fi);
    float amp = uBand * mix(0.9, 0.34, fi);
    float freq = mix(0.85, 0.55, fi);
    float px = x * freq + fi * 37.0 + 3.0;

    float h = profile(px, fi);
    float crest = base + h * amp;
    float below = crest - uv.y;
    float edge = smoothstep(0.0, 1.5 / uRes.y, below);

    // Which way the face under this point looks. A face runs down and out from
    // its summit, so the deeper the point, the further sideways its ridge is
    // sampled: light and shadow then fall diagonally from each peak instead of
    // in vertical columns. Warm light comes from the right.
    float d = max(below, 0.0) / uBand;
    float sx = px + d * freq * 1.1;
    float e = 0.03;
    float s = (profileBroad(sx + e, fi) - profileBroad(sx - e, fi)) / (2.0 * e) * (amp / uBand) * freq;
    float facing = smoothstep(-0.7, 0.7, -s);

    // Gullies: streaks leaning down the faces at the same angle, bent a little
    // so they wander like real couloirs instead of ruled lines.
    vec2 q = vec2(px * 7.0 - d * 5.0, d * 2.0);
    q.x += (noise2(q * vec2(0.5, 1.4)) - 0.5) * 1.4;
    float gully = pow(1.0 - abs(noise2(vec2(q.x, q.y * 0.7)) * 2.0 - 1.0), 4.0);

    float light = clamp(facing * 0.8 + (gully - 0.3) * 0.35, 0.0, 1.0);

    // Bare rock: blue-grey on the high ranges, darker on the hills in front.
    vec3 rockTone = mix(uRock, uNear, smoothstep(0.35, 1.0, fi));
    vec3 layer = mix(rockTone * 0.78, mix(rockTone, uRim, 0.4), light);

    // Snow lies above an uneven snow line, runs down the gullies, and slides
    // off the steepest rock; the foothills in front carry none.
    float alt = (uv.y - base) / amp;
    float line = 0.62 + fi * 0.3 + (noise2(vec2(px * 3.0, 1.7)) - 0.5) * 0.18;
    float snow = smoothstep(line - 0.04, line + 0.02, alt + gully * 0.22 - (1.0 - facing) * 0.08);
    snow *= 1.0 - smoothstep(2.0, 4.0, abs(s)) * 0.75;
    snow *= 1.0 - smoothstep(0.4, 0.62, fi);
    vec3 snowTone = mix(uSnowShade, uSnow, smoothstep(0.25, 0.85, light));
    layer = mix(layer, snowTone, snow);

    // Forest grain on the nearest hills.
    float grain = 0.86 + 0.14 * noise2(gl_FragCoord.xy * vec2(0.45, 0.8));
    layer *= mix(1.0, grain, smoothstep(0.6, 1.0, fi));

    // Distant ranges sink into blue air, and mist pools at the foot of each.
    layer = mix(layer, mix(uSkyMid, uGlow, 0.35), (1.0 - fi) * 0.4);
    float mist = 1.0 - smoothstep(0.0, amp * 0.4, uv.y - base);
    layer = mix(layer, uSkyMid, mist * 0.55 * (1.0 - fi * 0.4));

    col = mix(col, layer, edge);
  }

  gl_FragColor = vec4(col, 1.0);
}`;

type RGB = [number, number, number];
type Palette = Record<'skyTop' | 'skyMid' | 'glow' | 'far' | 'near' | 'rim' | 'rock' | 'snow' | 'snowShade', RGB>;

const hex = (value: string): RGB => [
  parseInt(value.slice(1, 3), 16) / 255,
  parseInt(value.slice(3, 5), 16) / 255,
  parseInt(value.slice(5, 7), 16) / 255,
];

const LIGHT: Palette = {
  skyTop: hex('#bcd6ee'),
  skyMid: hex('#edf4fa'),
  glow: hex('#fbe2cf'),
  far: hex('#a9bdd6'),
  near: hex('#2c4d6e'),
  rim: hex('#fff1e3'),
  rock: hex('#7488a3'),
  snow: hex('#ffffff'),
  snowShade: hex('#c8d7ea'),
};

const DARK: Palette = {
  skyTop: hex('#050818'),
  skyMid: hex('#0f1738'),
  glow: hex('#3b2f66'),
  far: hex('#27306a'),
  near: hex('#0b1030'),
  rim: hex('#8d97ff'),
  rock: hex('#2a3170'),
  snow: hex('#d6dbff'),
  snowShade: hex('#5b63a3'),
};

/** How tall the mountain band is, in CSS pixels, before it is capped. */
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
  const uBand = uniform('uBand');
  const colours: [keyof Palette, WebGLUniformLocation | null][] = [
    ['skyTop', uniform('uSkyTop')],
    ['skyMid', uniform('uSkyMid')],
    ['glow', uniform('uGlow')],
    ['far', uniform('uFar')],
    ['near', uniform('uNear')],
    ['rim', uniform('uRim')],
    ['rock', uniform('uRock')],
    ['snow', uniform('uSnow')],
    ['snowShade', uniform('uSnowShade')],
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

    draw();

    // With motion reduced the mountains stand still, so the loop only has to run
    // for as long as a theme cross-fade is in progress.
    const keepGoing = visible && !document.hidden && fading;
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
