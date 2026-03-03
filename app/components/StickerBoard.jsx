'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Pencil, Eraser, Trash2, RotateCcw, Star, Heart, Flower2, Sun, Cloud, Moon, Coffee, BookOpen, Feather, Zap, Music } from 'lucide-react';
import {
  BH, PW, PH,
  PALETTE, ICON_COLORS, DRAW_COLORS, DRAW_SIZES, ICON_NAMES,
  makeInitPostits, makeInitIcons,
  drawPostit, drawIcon, hitPostit, hitIcon,
} from '@/app/helpers/stickerBoardHelpers';

const TRAY_ICONS = [Star, Heart, Flower2, Sun, Cloud, Moon, Coffee, BookOpen, Feather, Zap, Music];

const MOBILE_SCALE = 0.62;
const MW  = Math.round(PW * MOBILE_SCALE);
const MH  = Math.round(PH * MOBILE_SCALE);
const MBH = 320;

function makeInitPostitsMobile() {
  return [
    { ...PALETTE[0], uid:'u1', cx: MW/2 + 10,  cy: MH/2 + 16 },
    { ...PALETTE[1], uid:'u2', cx: MW/2 + 130, cy: MH/2 + 28 },
    { ...PALETTE[2], uid:'u3', cx: MW/2 + 250, cy: MH/2 + 10 },
  ];
}
function makeInitIconsMobile() {
  return [
    { uid:'i1', icName:'Star',    color:'#9d4edd', cx:90,  cy:160, sz:22 },
    { uid:'i2', icName:'Heart',   color:'#c77dff', cx:200, cy:145, sz:20 },
    { uid:'i3', icName:'Flower2', color:'#7b2cbf', cx:310, cy:165, sz:22 },
  ];
}

function drawPostitMobile(ctx, s, isTop, pw, ph) {
  const rad = (s.rot * Math.PI) / 180;
  ctx.save();
  ctx.translate(s.cx, s.cy);
  ctx.rotate(rad);
  const x = -pw / 2, y = -ph / 2;

  ctx.shadowColor   = isTop ? 'rgba(90,24,154,0.28)' : 'rgba(90,24,154,0.15)';
  ctx.shadowBlur    = isTop ? 12 : 7;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = isTop ? 5 : 3;

  ctx.fillStyle = s.bg;
  ctx.beginPath(); ctx.rect(x, y, pw, ph); ctx.fill();

  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;

  ctx.fillStyle = 'rgba(255,255,255,0.62)';
  ctx.fillRect(x + pw/2 - 12, y - 7, 24, 10);

  // Font leggermente più grande su mobile piccoli schermi
  const baseFont = 11;
  const fs = window.innerWidth < 400 ? baseFont + 2 : baseFont + 1;

  ctx.fillStyle = '#2a0a4e';
  ctx.font = `${fs}px Caveat, cursive`;
  ctx.textBaseline = 'top';

  const words = s.text.split(' ');
  const lines = [];
  let cur = '';
  const maxW = pw - 16;
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; }
    else cur = test;
  }
  if (cur) lines.push(cur);

  let ty = y + 12;
  for (const line of lines) { ctx.fillText(line, x + 8, ty); ty += 15; }

  ctx.fillStyle = 'rgba(74,32,112,0.55)';
  ctx.font = '10px Caveat, cursive';
  ctx.fillText('— ' + s.name, x + 8, y + ph - 18);
  ctx.restore();
}

export default function StickerBoard() {
  const wrapRef   = useRef(null);
  const stickerCv = useRef(null);
  const drawCv    = useRef(null);
  const dragRef   = useRef(null);
  const paintRef  = useRef({ active:false, lx:0, ly:0 });
  const postitsRef = useRef([]);
  const iconsRef   = useRef([]);
  const topUidRef  = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [tool,   setTool]   = useState('pen');
  const [dColor, setDColor] = useState('#9d4edd');
  const [dSize,  setDSize]  = useState(5);
  const [boardW, setBoardW] = useState(860);
  const [tick,   setTick]   = useState(0);
  const redraw = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    const mobile = window.innerWidth < 640;
    setIsMobile(mobile);
    postitsRef.current = mobile ? makeInitPostitsMobile() : makeInitPostits();
    iconsRef.current   = mobile ? makeInitIconsMobile()   : makeInitIcons();
  }, []);

  const bh = isMobile ? MBH : BH;
  const pw = isMobile ? MW  : PW;
  const ph = isMobile ? MH  : PH;

  useEffect(() => {
    const measure = () => { if (wrapRef.current) setBoardW(wrapRef.current.offsetWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;

    for (const ref of [stickerCv, drawCv]) {
      const c = ref.current;
      if (!c) continue;

      // dimensioni reali in pixel fisici
      c.width  = Math.round(boardW * dpr);
      c.height = Math.round(bh * dpr);

      // dimensioni CSS (pixel logici)
      c.style.width  = boardW + 'px';
      c.style.height = bh + 'px';

      const ctx = c.getContext('2d');

      // reset trasformazioni precedenti
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // scala per retina
      ctx.scale(dpr, dpr);
    }

    renderStickers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardW, bh]);

  const renderStickers = useCallback(() => {
    const canvas = stickerCv.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(199,125,255,0.13)';
    ctx.lineWidth   = 1;
    for (let y = 0; y <= bh; y += 32) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
    for (let x = 0; x <= canvas.width; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,bh); ctx.stroke(); }

    const top   = topUidRef.current;
    const drawP = (s, isTop) => isMobile ? drawPostitMobile(ctx, s, isTop, pw, ph) : drawPostit(ctx, s, isTop);

    for (const s  of postitsRef.current) { if (s.uid  !== top) drawP(s, false); }
    for (const ic of iconsRef.current)   { if (ic.uid !== top) drawIcon(ctx, ic, false); }
    const topP = postitsRef.current.find(s  => s.uid  === top);
    const topI = iconsRef.current.find(ic => ic.uid === top);
    if (topP) drawP(topP, true);
    if (topI) drawIcon(ctx, topI, true);

    ctx.fillStyle    = 'rgba(199,125,255,0.55)';
    ctx.font         = isMobile ? '11px Caveat, cursive' : '14px Caveat, cursive';
    ctx.textBaseline = 'bottom';
    ctx.fillText('✦ disegna, trascina, personalizza', 10, bh - 8);
  }, [isMobile, pw, ph, bh]);

  useEffect(() => { renderStickers(); }, [tick, renderStickers]);

  const bCoords = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    return { bx: e.clientX - r.left, by: e.clientY - r.top };
  };

  const hitP = useCallback((bx, by, s) => {
    if (isMobile) {
      const rad = -(s.rot * Math.PI) / 180;
      const dx = bx - s.cx, dy = by - s.cy;
      const lx = dx * Math.cos(rad) - dy * Math.sin(rad);
      const ly = dx * Math.sin(rad) + dy * Math.cos(rad);
      return Math.abs(lx) <= pw/2 && Math.abs(ly) <= ph/2;
    }
    return hitPostit(bx, by, s);
  }, [isMobile, pw, ph]);

  const onPointerDown = useCallback((e) => {
    e.preventDefault();
    const { bx, by } = bCoords(e);
    const top  = topUidRef.current;
    const topP = postitsRef.current.find(s  => s.uid  === top);
    const topI = iconsRef.current.find(ic => ic.uid === top);

    let hit = null;
    if (topP && hitP(bx, by, topP))    hit = { uid:topP.uid, type:'postit', startCx:topP.cx, startCy:topP.cy };
    if (!hit && topI && hitIcon(bx, by, topI)) hit = { uid:topI.uid, type:'icon',   startCx:topI.cx, startCy:topI.cy };
    if (!hit) for (const s  of [...postitsRef.current].reverse()) { if (hitP(bx, by, s))     { hit = { uid:s.uid,  type:'postit', startCx:s.cx,  startCy:s.cy  }; break; } }
    if (!hit) for (const ic of [...iconsRef.current].reverse())   { if (hitIcon(bx, by, ic)) { hit = { uid:ic.uid, type:'icon',   startCx:ic.cx, startCy:ic.cy }; break; } }

    if (hit) {
      dragRef.current   = { ...hit, startBx:bx, startBy:by };
      topUidRef.current = hit.uid;
      renderStickers();
      wrapRef.current.setPointerCapture(e.pointerId);
      return;
    }
    if (tool === 'pen' || tool === 'eraser') {
      paintRef.current = { active:true, lx:bx, ly:by };
      wrapRef.current.setPointerCapture(e.pointerId);
    }
  }, [tool, renderStickers, hitP]);

  const onPointerMove = useCallback((e) => {
    const { bx, by } = bCoords(e);
    if (dragRef.current) {
      const { uid, type, startBx, startBy, startCx, startCy } = dragRef.current;
      const ncx = startCx + (bx - startBx);
      const ncy = startCy + (by - startBy);
      if (type === 'postit') {
        const cx = Math.max(pw/2, Math.min(ncx, boardW - pw/2));
        const cy = Math.max(ph/2, Math.min(ncy, bh - ph/2));
        postitsRef.current = postitsRef.current.map(s => s.uid === uid ? { ...s, cx, cy } : s);
      } else {
        const ic = iconsRef.current.find(ic => ic.uid === uid);
        const r  = ic ? ic.sz/2 : 20;
        const cx = Math.max(r, Math.min(ncx, boardW - r));
        const cy = Math.max(r, Math.min(ncy, bh - r));
        iconsRef.current = iconsRef.current.map(ic => ic.uid === uid ? { ...ic, cx, cy } : ic);
      }
      renderStickers(); return;
    }
    if (paintRef.current?.active) {
      const canvas = drawCv.current; if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = dSize * 5; ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = dSize; ctx.strokeStyle = dColor;
      }
      ctx.beginPath();
      ctx.moveTo(paintRef.current.lx, paintRef.current.ly);
      ctx.lineTo(bx, by); ctx.stroke();
      paintRef.current.lx = bx; paintRef.current.ly = by;
    }
  }, [tool, dColor, dSize, boardW, bh, pw, ph, renderStickers]);

  const onPointerUp = useCallback(() => {
    if (dragRef.current) { dragRef.current = null; redraw(); }
    if (paintRef.current) paintRef.current.active = false;
  }, [redraw]);

  const addPostit = (p) => {
    const uid = p.id + '_' + Date.now();
    postitsRef.current = [...postitsRef.current, { ...p, uid, cx: boardW/2, cy: bh/2 }];
    topUidRef.current  = uid; redraw();
  };
  const addIcon = (Ic, icName) => {
    const uid   = 'ic_' + Date.now();
    const color = ICON_COLORS[Math.floor(Math.random() * ICON_COLORS.length)];
    const sz    = isMobile ? 18 + Math.floor(Math.random()*8) : 28 + Math.floor(Math.random()*12);
    iconsRef.current = [...iconsRef.current, { uid, Ic, icName, color, cx: boardW/2, cy: bh/2, sz }];
    topUidRef.current = uid; redraw();
  };
  const reset = () => {
    postitsRef.current = isMobile ? makeInitPostitsMobile() : makeInitPostits();
    iconsRef.current   = isMobile ? makeInitIconsMobile()   : makeInitIcons();
    topUidRef.current  = null;
    const dc = drawCv.current;
    if (dc) dc.getContext('2d').clearRect(0, 0, boardW, bh);
    redraw();
  };

  const boardCursor  = tool === 'eraser' ? 'cell' : 'crosshair';
  const drawColors   = isMobile ? DRAW_COLORS.slice(0, 6) : DRAW_COLORS;
  const drawSizes    = isMobile ? [2, 4, 8] : DRAW_SIZES;
  const dotSize      = isMobile ? 18 : 24;
  const chipSizePost = isMobile ? 52 : 66;
  const chipSizeIcon = isMobile ? 32 : 38;
  const iconSize     = isMobile ? 14 : 18;

  return (
    <div>
      <div className="draw-bar" style={{ gap: isMobile ? 5 : 9 }}>
        <button className={`tool-btn${tool==='pen'?' on':''}`} onClick={() => setTool('pen')}>
          <Pencil size={14} color={tool==='pen'?'#fff':'var(--p2)'} strokeWidth={2}/>
        </button>
        <button className={`tool-btn${tool==='eraser'?' on':''}`} onClick={() => setTool('eraser')}>
          <Eraser size={14} color={tool==='eraser'?'#fff':'var(--p2)'} strokeWidth={2}/>
        </button>
        <div className="bar-sep"/>
        {drawColors.map(c => (
          <div key={c} className={`color-dot${dColor===c?' on':''}`}
            style={{ background:c, width:dotSize, height:dotSize, boxShadow:c==='#ffffff'?'inset 0 0 0 1px var(--p5)':'none' }}
            onClick={() => { setDColor(c); setTool('pen'); }}/>
        ))}
        <div className="bar-sep"/>
        {drawSizes.map(sz => (
          <div key={sz} className={`sz-dot${dSize===sz?' on':''}`}
            style={{ width:sz+6, height:sz+6 }}
            onClick={() => { setDSize(sz); setTool('pen'); }}/>
        ))}
        <div className="bar-sep"/>
        <button className="tool-btn" title="Cancella disegni"
          onClick={() => { const c = drawCv.current; if (c) c.getContext('2d').clearRect(0,0,boardW,bh); }}>
          <Trash2 size={14} color="var(--p2)" strokeWidth={2}/>
        </button>
      </div>

      <div ref={wrapRef}
        style={{ position:'relative', width:'100%', height:bh, borderRadius:18, border:'2px dashed var(--p4)', overflow:'hidden', boxShadow:'0 8px 40px rgba(90,24,154,0.1)', background:'#fff', cursor:boardCursor, touchAction:'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <canvas ref={stickerCv} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}/>
        <canvas ref={drawCv}    style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}/>
      </div>

      <div style={{ marginTop:12, display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:12 }}>
        <div>
          <p style={{ fontFamily:"'Caveat',cursive", fontSize:'0.9rem', color:'var(--p3)', marginBottom:6 }}>
            Testimonianze — {isMobile ? 'tocca' : 'clicca'} per aggiungere
          </p>
          <div className="sticker-tray">
            {PALETTE.map(p => (
              <div key={p.id} className="tray-chip" onClick={() => addPostit(p)}
                style={{ width:chipSizePost, height:chipSizePost, background:p.bg, borderRadius:2, fontSize:'0.55rem', fontFamily:"'Caveat',cursive", color:'#4a2070', padding:4, lineHeight:1.3, textAlign:'center', boxShadow:'2px 3px 10px rgba(90,24,154,0.14)', border:'1px solid rgba(199,125,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily:"'Caveat',cursive", fontSize:'0.9rem', color:'var(--p3)', marginBottom:6 }}>
            Icone — {isMobile ? 'tocca' : 'clicca'} per aggiungere
          </p>
          <div className="sticker-tray">
            {TRAY_ICONS.map((Ic, i) => (
              <div key={i} className="tray-chip" onClick={() => addIcon(Ic, ICON_NAMES[i])}
                style={{ width:chipSizeIcon, height:chipSizeIcon, background:'#fff', borderRadius:10, boxShadow:'0 2px 8px rgba(90,24,154,0.12)', border:'1.5px solid var(--p5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Ic size={iconSize} color={ICON_COLORS[i % ICON_COLORS.length]} strokeWidth={1.6}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={reset}
        style={{ marginTop:10, background:'none', border:'1.5px solid var(--p4)', color:'var(--p2)', fontFamily:"'Caveat',cursive", fontSize:'0.92rem', padding:'6px 16px', borderRadius:999, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 }}
        onMouseEnter={e => (e.currentTarget.style.background='var(--p5)')}
        onMouseLeave={e => (e.currentTarget.style.background='none')}>
        <RotateCcw size={12} strokeWidth={2}/> Reimposta tutto
      </button>
    </div>
  );
}