// tanit-terron / stickerBoardHelpers.ts

export const BH: number = 540;
export const PW: number = 176;
export const PH: number = 190;

// --- INTERFACES ---

export interface PaletteItem {
  id: string;
  bg: string;
  rot: number;
  text: string;
  name: string;
}

export interface Postit extends PaletteItem {
  uid: string;
  cx: number;
  cy: number;
}

export interface IconItem {
  uid: string;
  icName: string;
  color: string;
  cx: number;
  cy: number;
  sz: number;
}

// --- CONSTANTS ---

export const PALETTE: PaletteItem[] = [
  { id: 'p1', bg: '#fff0f8', rot: -3, text: 'Ho capito che chiedere aiuto non è debolezza.', name: 'M., 34 anni' },
  { id: 'p2', bg: '#f3e8ff', rot: 2, text: 'Il sistema dei 5€ mi ha fatto sentire che il percorso era davvero mio.', name: 'L., 28 anni' },
  { id: 'p3', bg: '#fef9c3', rot: -1.5, text: 'Tanit sa stare nel silenzio. E a volte, è lì che avviene la magia.', name: 'C., 41 anni' },
  { id: 'p4', bg: '#e0f2fe', rot: 2.5, text: 'Ho trovato la professionista che cercavo e la persona umana di cui avevo bisogno.', name: 'S., 52 anni' },
  { id: 'p5', bg: '#fff7ed', rot: -2, text: 'Ogni seduta è stata un passo verso me stessa.', name: 'R., 29 anni' },
  { id: 'p6', bg: '#f0fdf4', rot: 1.5, text: 'Non sapevo dove iniziare. Tanit mi ha aiutata a trovare il punto di partenza.', name: 'E., 45 anni' },
];

export const ICON_COLORS: string[] = ['#9d4edd', '#c77dff', '#7b2cbf', '#5a189a'];
export const DRAW_COLORS: string[] = ['#5a189a', '#9d4edd', '#c77dff', '#e0aaff', '#f472b6', '#34d399', '#60a5fa', '#f59e0b', '#1a0a2e', '#ffffff'];
export const DRAW_SIZES: number[] = [2, 5, 10, 18];
export const ICON_NAMES: string[] = ['Star', 'Heart', 'Flower2', 'Sun', 'Cloud', 'Moon', 'Coffee', 'BookOpen', 'Feather', 'Zap', 'Music'];

// --- HELPERS ---

export function makeInitPostits(): Postit[] {
  return [
    { ...PALETTE[0], uid: 'u1', cx: PW / 2 + 30, cy: PH / 2 + 20 },
    { ...PALETTE[1], uid: 'u2', cx: PW / 2 + 240, cy: PH / 2 + 40 },
    { ...PALETTE[2], uid: 'u3', cx: PW / 2 + 470, cy: PH / 2 + 15 },
  ];
}

export function makeInitIcons(): IconItem[] {
  return [
    { uid: 'i1', icName: 'Star', color: '#9d4edd', cx: 170, cy: 240, sz: 32 },
    { uid: 'i2', icName: 'Heart', color: '#c77dff', cx: 390, cy: 215, sz: 28 },
    { uid: 'i3', icName: 'Flower2', color: '#7b2cbf', cx: 655, cy: 248, sz: 34 },
  ];
}

export function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

export function drawPostit(ctx: CanvasRenderingContext2D, s: Postit, isTop: boolean): void {
  const rad = (s.rot * Math.PI) / 180;
  ctx.save();
  ctx.translate(s.cx, s.cy);
  ctx.rotate(rad);

  const x = -PW / 2;
  const y = -PH / 2;

  ctx.shadowColor = isTop ? 'rgba(90,24,154,0.30)' : 'rgba(90,24,154,0.18)';
  ctx.shadowBlur = isTop ? 18 : 10;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = isTop ? 8 : 4;

  ctx.fillStyle = s.bg;
  ctx.beginPath();
  ctx.rect(x, y, PW, PH);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = 'rgba(255,255,255,0.62)';
  ctx.fillRect(x + PW / 2 - 16, y - 9, 32, 13);

  ctx.fillStyle = '#2a0a4e';
  ctx.font = '15px Caveat, cursive';
  ctx.textBaseline = 'top';
  const lines = wrapText(ctx, s.text, PW - 28);
  let ty = y + 22;
  for (const line of lines) {
    ctx.fillText(line, x + 14, ty);
    ty += 20;
  }

  ctx.fillStyle = 'rgba(74,32,112,0.55)';
  ctx.font = '13px Caveat, cursive';
  ctx.fillText('— ' + s.name, x + 14, y + PH - 28);

  ctx.restore();
}

type ShapeFn = (ctx: CanvasRenderingContext2D, sz: number) => void;

export const ICON_SHAPES: Record<string, ShapeFn> = {
  Star: (ctx, sz) => {
    const r1 = sz / 2, r2 = sz / 4, pts = 5;
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const a = (i * Math.PI / pts) - Math.PI / 2;
      i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
  },
  Heart: (ctx, sz) => {
    const s = sz / 2;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s * 0.1, -s * 0.6, -s, -s * 0.3, -s, s * 0.1);
    ctx.bezierCurveTo(-s, s * 0.6, 0, s, 0, s);
    ctx.bezierCurveTo(0, s, s, s * 0.6, s, s * 0.1);
    ctx.bezierCurveTo(s, -s * 0.3, s * 0.1, -s * 0.6, 0, s * 0.3);
    ctx.closePath();
  },
  Flower2: (ctx, sz) => {
    const r = sz / 4;
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      ctx.beginPath();
      ctx.ellipse(Math.cos(a) * r, Math.sin(a) * r, r * 0.9, r * 0.55, a, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
  },
  Sun: (ctx, sz) => {
    ctx.beginPath(); ctx.arc(0, 0, sz / 4, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * sz / 3.5, Math.sin(a) * sz / 3.5);
      ctx.lineTo(Math.cos(a) * sz / 2, Math.sin(a) * sz / 2);
      ctx.lineWidth = 2; ctx.stroke();
    }
  },
  Cloud: (ctx, sz) => {
    const r = sz / 4;
    ctx.beginPath();
    ctx.arc(-r * 0.6, r * 0.2, r * 0.8, Math.PI, 0);
    ctx.arc(0, -r * 0.2, r, Math.PI, 0);
    ctx.arc(r * 0.6, r * 0.2, r * 0.7, Math.PI, 0);
    ctx.lineTo(r * 1.3, r); ctx.lineTo(-r * 1.4, r); ctx.closePath();
  },
  Moon: (ctx, sz) => {
    ctx.beginPath();
    ctx.arc(0, 0, sz / 2.5, 0.4, Math.PI * 2 - 0.4);
    ctx.arc(sz / 6, -sz / 8, sz / 3, Math.PI * 2 - 0.4, 0.4, true);
    ctx.closePath();
  },
  Coffee: (ctx, sz) => {
    const r = sz / 3;
    ctx.beginPath(); ctx.rect(-r, -r, r * 2, r * 2.2); ctx.fill();
    ctx.beginPath(); ctx.arc(r, 0, r * 0.55, Math.PI * 1.5, Math.PI * 0.5);
    ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 2; ctx.stroke();
  },
  BookOpen: (ctx, sz) => {
    const w = sz / 2, h = sz / 2.5;
    ctx.beginPath(); ctx.rect(-w, -h, w, h * 2); ctx.fill();
    ctx.beginPath(); ctx.rect(0, -h, w, h * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, -h); ctx.lineTo(0, h); ctx.stroke();
  },
  Feather: (ctx, sz) => {
    ctx.beginPath();
    ctx.moveTo(0, -sz / 2);
    ctx.bezierCurveTo(sz / 2, -sz / 4, sz / 2, sz / 4, 0, sz / 2);
    ctx.bezierCurveTo(-sz / 2, sz / 4, -sz / 2, -sz / 4, 0, -sz / 2);
    ctx.closePath();
  },
  Zap: (ctx, sz) => {
    ctx.beginPath();
    ctx.moveTo(sz * 0.1, -sz / 2); ctx.lineTo(-sz * 0.15, 0); ctx.lineTo(sz * 0.1, 0);
    ctx.lineTo(-sz * 0.1, sz / 2); ctx.lineTo(sz * 0.2, -sz * 0.1); ctx.lineTo(-sz * 0.05, -sz * 0.1);
    ctx.closePath();
  },
  Music: (ctx, sz) => {
    ctx.beginPath(); ctx.arc(-sz * 0.2, sz * 0.2, sz * 0.18, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sz * 0.2, sz * 0.1, sz * 0.18, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-sz * 0.02, -sz * 0.4); ctx.lineTo(sz * 0.38, -sz * 0.5);
    ctx.lineTo(sz * 0.38, sz * 0.1); ctx.lineTo(-sz * 0.02, sz * 0.2);
    ctx.closePath();
  },
};

export function drawIcon(ctx: CanvasRenderingContext2D, ic: IconItem, isTop: boolean): void {
  ctx.save();
  ctx.translate(ic.cx, ic.cy);
  ctx.shadowColor = isTop ? 'rgba(90,24,154,0.3)' : 'rgba(90,24,154,0.15)';
  ctx.shadowBlur = isTop ? 14 : 6;
  ctx.fillStyle = ic.color;
  ctx.strokeStyle = ic.color;
  const shapeFn = ICON_SHAPES[ic.icName] || ((c: CanvasRenderingContext2D, sz: number) => { c.beginPath(); c.arc(0, 0, sz / 3, 0, Math.PI * 2); });
  shapeFn(ctx, ic.sz);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.restore();
}

export function hitPostit(px: number, py: number, s: Postit): boolean {
  const rad = -(s.rot * Math.PI) / 180;
  const dx = px - s.cx;
  const dy = py - s.cy;
  const lx = dx * Math.cos(rad) - dy * Math.sin(rad);
  const ly = dx * Math.sin(rad) + dy * Math.cos(rad);
  return Math.abs(lx) <= PW / 2 && Math.abs(ly) <= PH / 2;
}

export function hitIcon(px: number, py: number, ic: IconItem): boolean {
  const dx = px - ic.cx;
  const dy = py - ic.cy;
  return Math.sqrt(dx * dx + dy * dy) <= ic.sz / 1.5;
}