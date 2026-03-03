// tanit-terron / StickerBoard.jsx
// Full canvas-based board — zero CSS rotation → zero blur.
// Two canvas layers: stickers (bottom) + freehand drawing (top).
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

export default function StickerBoard() {
  const wrapRef   = useRef(null);
  const stickerCv = useRef(null);
  const drawCv    = useRef(null);

  const dragRef    = useRef(null);
  const paintRef   = useRef({ active:false, lx:0, ly:0 });
  const postitsRef = useRef(makeInitPostits());
  const iconsRef   = useRef(makeInitIcons());
  const topUidRef  = useRef(null);

  const [tool,   setTool]   = useState('pen');
  const [dColor, setDColor] = useState('#9d4edd');
  const [dSize,  setDSize]  = useState(5);
  const [boardW, setBoardW] = useState(860);
  const [tick,   setTick]   = useState(0);
  const redraw = useCallback(() => setTick(t => t + 1), []);

  // Measure board width
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

      // dimensione reale (pixel fisici)
      c.width  = boardW * dpr;
      c.height = BH * dpr;

      // dimensione CSS (pixel logici)
      c.style.width  = boardW + 'px';
      c.style.height = BH + 'px';

      const ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scala il contesto
    }

    renderStickers();
  }, [boardW]);

  // Render all stickers onto stickerCv
  const renderStickers = useCallback(() => {
    const canvas = stickerCv.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(199,125,255,0.13)';
    ctx.lineWidth   = 1;
    for (let y = 0; y <= BH; y += 32) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
    for (let x = 0; x <= canvas.width; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,BH); ctx.stroke(); }

    const top = topUidRef.current;
    for (const s  of postitsRef.current) { if (s.uid  !== top) drawPostit(ctx, s, false);  }
    for (const ic of iconsRef.current)   { if (ic.uid !== top) drawIcon(ctx, ic, false);   }
    const topP = postitsRef.current.find(s  => s.uid  === top);
    const topI = iconsRef.current.find(ic => ic.uid === top);
    if (topP) drawPostit(ctx, topP, true);
    if (topI) drawIcon(ctx, topI, true);

    ctx.fillStyle    = 'rgba(199,125,255,0.55)';
    ctx.font         = '14px Caveat, cursive';
    ctx.textBaseline = 'bottom';
    ctx.fillText('✦ disegna, trascina, personalizza', 12, BH - 10);
  }, []);

  useEffect(() => { renderStickers(); }, [tick, renderStickers]);

  const bCoords = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    return { bx: e.clientX - r.left, by: e.clientY - r.top };
  };

  const onPointerDown = useCallback((e) => {
    e.preventDefault();
    const { bx, by } = bCoords(e);
    const top = topUidRef.current;
    const topP = postitsRef.current.find(s => s.uid === top);
    const topI = iconsRef.current.find(ic => ic.uid === top);

    let hit = null;
    if (topP && hitPostit(bx, by, topP)) hit = { uid:topP.uid, type:'postit', startCx:topP.cx, startCy:topP.cy };
    if (!hit && topI && hitIcon(bx, by, topI)) hit = { uid:topI.uid, type:'icon', startCx:topI.cx, startCy:topI.cy };
    if (!hit) {
      for (const s of [...postitsRef.current].reverse()) {
        if (hitPostit(bx, by, s)) { hit = { uid:s.uid, type:'postit', startCx:s.cx, startCy:s.cy }; break; }
      }
    }
    if (!hit) {
      for (const ic of [...iconsRef.current].reverse()) {
        if (hitIcon(bx, by, ic)) { hit = { uid:ic.uid, type:'icon', startCx:ic.cx, startCy:ic.cy }; break; }
      }
    }

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
  }, [tool, renderStickers]);

  const onPointerMove = useCallback((e) => {
    const { bx, by } = bCoords(e);

    if (dragRef.current) {
      const { uid, type, startBx, startBy, startCx, startCy } = dragRef.current;
      const ncx = startCx + (bx - startBx);
      const ncy = startCy + (by - startBy);

      if (type === 'postit') {
        const cx = Math.max(PW/2, Math.min(ncx, boardW - PW/2));
        const cy = Math.max(PH/2, Math.min(ncy, BH - PH/2));
        postitsRef.current = postitsRef.current.map(s => s.uid === uid ? { ...s, cx, cy } : s);
      } else {
        const ic = iconsRef.current.find(ic => ic.uid === uid);
        const r  = ic ? ic.sz/2 : 20;
        const cx = Math.max(r, Math.min(ncx, boardW - r));
        const cy = Math.max(r, Math.min(ncy, BH - r));
        iconsRef.current = iconsRef.current.map(ic => ic.uid === uid ? { ...ic, cx, cy } : ic);
      }
      renderStickers();
      return;
    }

    if (paintRef.current?.active) {
      const canvas = drawCv.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';
      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth   = dSize * 5;
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth   = dSize;
        ctx.strokeStyle = dColor;
      }
      ctx.beginPath();
      ctx.moveTo(paintRef.current.lx, paintRef.current.ly);
      ctx.lineTo(bx, by);
      ctx.stroke();
      paintRef.current.lx = bx;
      paintRef.current.ly = by;
    }
  }, [tool, dColor, dSize, boardW, renderStickers]);

  const onPointerUp = useCallback(() => {
    if (dragRef.current) { dragRef.current = null; redraw(); }
    if (paintRef.current) paintRef.current.active = false;
  }, [redraw]);

  const addPostit = (p) => {
    const uid = p.id + '_' + Date.now();
    postitsRef.current = [...postitsRef.current, { ...p, uid, cx: boardW/2, cy: BH/2 }];
    topUidRef.current  = uid;
    redraw();
  };

  const addIcon = (Ic, icName) => {
    const uid   = 'ic_' + Date.now();
    const color = ICON_COLORS[Math.floor(Math.random() * ICON_COLORS.length)];
    const sz    = 28 + Math.floor(Math.random() * 12);
    iconsRef.current = [...iconsRef.current, { uid, Ic, icName, color, cx: boardW/2, cy: BH/2, sz }];
    topUidRef.current = uid;
    redraw();
  };

  const reset = () => {
    postitsRef.current = makeInitPostits();
    iconsRef.current   = makeInitIcons();
    topUidRef.current  = null;
    const dc = drawCv.current;
    if (dc) dc.getContext('2d').clearRect(0, 0, boardW, BH);
    redraw();
  };

  const boardCursor = tool === 'eraser' ? 'cell' : 'crosshair';

  return (
    <div>
      {/* Toolbar */}
      <div className="draw-bar">
        <button className={`tool-btn${tool==='pen'?' on':''}`}    onClick={() => setTool('pen')}>
          <Pencil size={15} color={tool==='pen'?'#fff':'var(--p2)'} strokeWidth={2}/>
        </button>
        <button className={`tool-btn${tool==='eraser'?' on':''}`} onClick={() => setTool('eraser')}>
          <Eraser size={15} color={tool==='eraser'?'#fff':'var(--p2)'} strokeWidth={2}/>
        </button>
        <div className="bar-sep"/>
        {DRAW_COLORS.map(c => (
          <div key={c} className={`color-dot${dColor===c?' on':''}`}
            style={{ background:c, boxShadow:c==='#ffffff'?'inset 0 0 0 1px var(--p5)':'none' }}
            onClick={() => { setDColor(c); setTool('pen'); }}/>
        ))}
        <div className="bar-sep"/>
        {DRAW_SIZES.map(sz => (
          <div key={sz} className={`sz-dot${dSize===sz?' on':''}`}
            style={{ width:sz+6, height:sz+6 }}
            onClick={() => { setDSize(sz); setTool('pen'); }}/>
        ))}
        <div className="bar-sep"/>
        <button className="tool-btn" title="Cancella disegni"
          onClick={() => { const c = drawCv.current; if (c) c.getContext('2d').clearRect(0, 0, boardW, BH); }}>
          <Trash2 size={15} color="var(--p2)" strokeWidth={2}/>
        </button>
      </div>

      {/* Board */}
      <div
        ref={wrapRef}
        style={{ position:'relative', width:'100%', height:BH, borderRadius:24, border:'2px dashed var(--p4)', overflow:'hidden', boxShadow:'0 8px 40px rgba(90,24,154,0.1)', background:'#fff', cursor:boardCursor, touchAction:'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <canvas ref={stickerCv} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}/>
        <canvas ref={drawCv}    style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}/>
      </div>

      {/* Trays */}
      <div style={{ marginTop:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div>
          <p style={{ fontFamily:"'Caveat',cursive", fontSize:'0.98rem', color:'var(--p3)', marginBottom:6 }}>Testimonianze — clicca per aggiungere al centro</p>
          <div className="sticker-tray">
            {PALETTE.map(p => (
              <div key={p.id} className="tray-chip" onClick={() => addPostit(p)}
                style={{ width:66, height:66, background:p.bg, borderRadius:2, fontSize:'0.6rem', fontFamily:"'Caveat',cursive", color:'#4a2070', padding:6, lineHeight:1.3, textAlign:'center', boxShadow:'2px 3px 10px rgba(90,24,154,0.14)', border:'1px solid rgba(199,125,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily:"'Caveat',cursive", fontSize:'0.98rem', color:'var(--p3)', marginBottom:6 }}>Icone — clicca per aggiungere al centro</p>
          <div className="sticker-tray">
            {TRAY_ICONS.map((Ic, i) => (
              <div key={i} className="tray-chip" onClick={() => addIcon(Ic, ICON_NAMES[i])}
                style={{ width:38, height:38, background:'#fff', borderRadius:10, boxShadow:'0 2px 8px rgba(90,24,154,0.12)', border:'1.5px solid var(--p5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Ic size={18} color={ICON_COLORS[i % ICON_COLORS.length]} strokeWidth={1.6}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={reset}
        style={{ marginTop:12, background:'none', border:'1.5px solid var(--p4)', color:'var(--p2)', fontFamily:"'Caveat',cursive", fontSize:'0.98rem', padding:'7px 18px', borderRadius:999, cursor:'none', display:'inline-flex', alignItems:'center', gap:6 }}
        onMouseEnter={e => e.currentTarget.style.background='var(--p5)'}
        onMouseLeave={e => e.currentTarget.style.background='none'}>
        <RotateCcw size={13} strokeWidth={2}/> Reimposta tutto
      </button>
    </div>
  );
}
