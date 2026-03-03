// tanit-terron / styles.js
export const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=DM+Serif+Display:ital@0;1&family=Lato:ital,wght@0,300;0,400;1,300&display=swap');

  :root {
    --p1:#5a189a; --p2:#7b2cbf; --p3:#9d4edd;
    --p4:#c77dff; --p5:#e0aaff; --bg:#faf7ff;
    --ink:#1a0a2e; --ease:cubic-bezier(0.4,0,0.2,1);
    --spring:cubic-bezier(0.34,1.56,0.64,1);
  }
  *, *::before, *::after { box-sizing:border-box; }

  .tanit-root { font-family:'Lato',sans-serif; background:var(--bg); color:var(--ink); overflow-x:hidden; cursor:none; }

  .tanit-nav {
    position:fixed; top:0; left:0; right:0; z-index:200;
    padding:18px 48px; display:flex; align-items:center; justify-content:space-between;
    backdrop-filter:blur(16px); background:rgba(250,247,255,0.8);
    border-bottom:1px solid rgba(199,125,255,0.12);
  }
  .tanit-logo { font-family:'Caveat',cursive; font-size:1.7rem; font-weight:700; color:var(--p1); cursor:none; }
  .tanit-nav-links { display:flex; gap:36px; list-style:none; margin:0; padding:0; }
  .tanit-nav-links button {
    font-family:'Caveat',cursive; font-size:1.15rem; background:none; border:none;
    color:var(--p2); cursor:none; padding:0 0 4px;
    transition:color 0.3s;
    position:relative;
  }
  .tanit-nav-links button::after {
    content:'';
    position:absolute; bottom:0; left:0;
    width:100%; height:2.5px;
    background:var(--p4);
    border-radius:2px;
    transform:scaleX(0);
    transform-origin:left center;
    transition:transform 0.3s var(--ease);
  }
  .tanit-nav-links button:hover { color:var(--p1); }
  .tanit-nav-links button:hover::after { transform:scaleX(1); }
  .tanit-nav-links button.active { color:var(--p1); }
  .tanit-nav-links button.active::after { transform:scaleX(1); background:var(--p3); }

  .tanit-page { animation:tanitPageIn 0.75s var(--ease) both; }
  @keyframes tanitPageIn { from{opacity:0;transform:translateY(55px)} to{opacity:1;transform:translateY(0)} }

  .feat-card {
    background:#fff; border-radius:20px; padding:36px 28px; position:relative;
    transition:all 0.4s var(--spring);
    box-shadow:0 0 0 1.5px var(--p5),0 0 0 4px #fff,0 0 0 6px var(--p4),0 8px 32px rgba(90,24,154,0.1);
  }
  .feat-card::before {
    content:''; position:absolute; inset:-2px; border-radius:22px;
    border:1.5px dashed var(--p5); pointer-events:none;
    transition:transform 0.4s var(--spring);
  }
  .feat-card:hover { transform:translateY(-6px) rotate(-0.5deg); box-shadow:0 0 0 1.5px var(--p4),0 0 0 4px #fff,0 0 0 6px var(--p3),0 16px 48px rgba(90,24,154,0.18); }
  .feat-card:hover::before { transform:rotate(1.5deg) scale(1.01); border-color:var(--p3); }
  .feat-icon-wrap { width:52px; height:52px; border-radius:14px; background:linear-gradient(135deg,var(--p5),var(--p4)); display:flex; align-items:center; justify-content:center; margin-bottom:18px; box-shadow:0 4px 14px rgba(157,78,221,0.25); }

  .photo-frame { border-radius:22px; overflow:hidden; position:relative; box-shadow:0 0 0 1.5px var(--p5),0 0 0 5px #fff,0 0 0 7px var(--p4),0 16px 48px rgba(90,24,154,0.18); transition:all 0.45s var(--spring); }
  .photo-frame:hover { transform:rotate(1deg) scale(1.02); box-shadow:0 0 0 2px var(--p3),0 0 0 6px #fff,0 0 0 8px var(--p2),0 24px 64px rgba(90,24,154,0.28); }
  .photo-frame-dashed { position:absolute; inset:-12px; border:2px dashed var(--p4); border-radius:30px; opacity:0.45; pointer-events:none; transition:transform 0.45s var(--spring); }

  .sticker-tray { display:flex; flex-wrap:wrap; gap:12px; padding:16px 20px; background:#fff; border-radius:18px; border:1.5px solid var(--p5); box-shadow:0 2px 12px rgba(90,24,154,0.07); margin-top:14px; }
  .tray-chip { cursor:none; transition:transform 0.2s var(--spring); border-radius:4px; display:flex; align-items:center; justify-content:center; }
  .tray-chip:hover { transform:scale(1.14) rotate(-2deg); }

  .draw-bar { display:flex; align-items:center; gap:9px; flex-wrap:wrap; padding:11px 16px; background:#fff; border-radius:16px; border:1.5px solid var(--p5); box-shadow:0 2px 10px rgba(90,24,154,0.07); margin-bottom:12px; }
  .tool-btn { display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:10px; border:1.5px solid var(--p5); background:#fff; cursor:none; transition:all 0.15s; }
  .tool-btn:hover { background:var(--p5); border-color:var(--p4); }
  .tool-btn.on { background:var(--p2); border-color:var(--p2); }
  .color-dot { width:24px; height:24px; border-radius:50%; cursor:none; border:2.5px solid transparent; transition:transform 0.15s; flex-shrink:0; }
  .color-dot.on { border-color:#1a0a2e; transform:scale(1.25); }
  .sz-dot { border-radius:50%; background:var(--p3); cursor:none; flex-shrink:0; transition:transform 0.15s; }
  .sz-dot.on { background:var(--p1); transform:scale(1.35); }
  .bar-sep { width:1px; height:26px; background:var(--p5); margin:0 3px; flex-shrink:0; }

  .value-item { padding:22px 26px; background:#fff; border-radius:16px; border-left:4px solid var(--p3); margin-bottom:18px; box-shadow:0 2px 14px rgba(90,24,154,0.07); display:flex; gap:14px; align-items:flex-start; }
  .value-icon { width:38px; height:38px; min-width:38px; border-radius:10px; background:linear-gradient(135deg,var(--p5),var(--p4)); display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(157,78,221,0.2); }
  .tanit-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 38px; border-radius:999px; font-family:'Caveat',cursive; font-size:1.25rem; font-weight:600; text-decoration:none; cursor:none; border:none; transition:transform 0.3s var(--spring),box-shadow 0.3s; }
  .tanit-btn:hover { transform:translateY(-3px) scale(1.03); }
  .tanit-btn.primary { background:var(--p1); color:#fff; box-shadow:0 4px 22px rgba(90,24,154,0.35); }
  .tanit-btn.primary:hover { box-shadow:0 10px 36px rgba(90,24,154,0.42); }
  .tanit-btn.outline { background:transparent; color:var(--p2); border:2px solid var(--p4); }
  .tanit-btn.outline:hover { background:var(--p5); }
  .section-title { font-family:'DM Serif Display',serif; font-size:clamp(2rem,4vw,3rem); color:var(--p1); margin:0 0 8px; }
  .section-sub { font-family:'Caveat',cursive; font-size:1.25rem; color:var(--p3); }
  .timeline { position:relative; padding-left:36px; }
  .timeline::before { content:''; position:absolute; left:8px; top:0; bottom:0; width:2px; background:linear-gradient(to bottom,var(--p3),var(--p5)); border-radius:2px; }
  .timeline-dot { position:absolute; left:-32px; top:5px; width:15px; height:15px; background:var(--p3); border-radius:50%; border:3px solid var(--bg); box-shadow:0 0 0 2px var(--p3); }
  .rest-card { background:#fff; border-radius:20px; padding:32px 24px; text-align:center; box-shadow:0 0 0 1.5px var(--p5),0 0 0 4px #fff,0 0 0 6px var(--p4),0 8px 24px rgba(90,24,154,0.08); transition:all 0.4s var(--spring); }
  .rest-card:hover { transform:translateY(-5px); box-shadow:0 0 0 1.5px var(--p4),0 0 0 4px #fff,0 0 0 6px var(--p3),0 16px 40px rgba(90,24,154,0.18); }
  .patto-card { background:linear-gradient(135deg,#fff 55%,#f9f0ff); border-radius:28px; padding:56px 60px; box-shadow:0 0 0 1.5px var(--p5),0 0 0 4px #fff,0 0 0 6px var(--p4),0 12px 50px rgba(90,24,154,0.12); position:relative; overflow:hidden; }
  .tanit-footer { background:var(--p1); color:var(--p5); text-align:center; padding:36px 24px; font-family:'Caveat',cursive; font-size:1rem; letter-spacing:0.04em; }
  .tanit-tag { display:inline-block; background:var(--p5); color:var(--p1); font-family:'Caveat',cursive; font-size:1rem; padding:6px 20px; border-radius:999px; margin-bottom:20px; letter-spacing:0.05em; }
  .tanit-cursor { position:fixed; border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition:width 0.25s,height 0.25s,background 0.25s; border:2px solid var(--p3); }
  .stat-badge { background:#fff; border-radius:18px; padding:22px 20px; text-align:center; box-shadow:0 0 0 1.5px var(--p5),0 0 0 4px #fff,0 0 0 6px var(--p4),0 4px 20px rgba(90,24,154,0.08); }
  .drawn { position:relative; display:inline; }
  .drawn::after { content:''; position:absolute; bottom:-4px; left:-2px; right:-2px; height:8px; background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 8'%3E%3Cpath d='M2,6 Q50,1 100,5 Q150,9 198,3' stroke='%23c77dff' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") center/100% 100% no-repeat; }
  input[type=range] { -webkit-appearance:none; height:6px; border-radius:3px; background:var(--p5); outline:none; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:var(--p2); cursor:grab; box-shadow:0 2px 8px rgba(90,24,154,0.3); border:3px solid #fff; }
  .fade-stagger-1{animation:tanitFadeUp 0.8s var(--ease) 0.2s both}
  .fade-stagger-2{animation:tanitFadeUp 0.8s var(--ease) 0.4s both}
  .fade-stagger-3{animation:tanitFadeUp 0.8s var(--ease) 0.6s both}
  .fade-stagger-4{animation:tanitFadeUp 0.8s var(--ease) 0.8s both}
  .fade-stagger-5{animation:tanitFadeUp 0.8s var(--ease) 1.0s both}
  .fade-stagger-6{animation:tanitFadeUp 0.8s var(--ease) 1.2s both}
  @keyframes tanitFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  .doodle-spin{animation:tSpin 16s linear infinite}
  .doodle-spin-slow{animation:tSpin 28s linear infinite}
  .doodle-spin-rev{animation:tSpin 20s linear reverse infinite}
  .doodle-float{animation:tFloat 6s ease-in-out infinite}
  .doodle-float2{animation:tFloat 8s ease-in-out 1.5s infinite}
  .doodle-wiggle{animation:tWiggle 5s ease-in-out infinite}
  @keyframes tSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes tFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes tWiggle{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
  @keyframes tScroll{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(8px)}}
  .scroll-arrow{animation:tScroll 1.5s ease infinite}
  /* ── Griglie About ── */
  .about-hero-grid {
    display:grid; grid-template-columns:1fr 380px;
    gap:clamp(24px,5vw,72px); align-items:center;
    margin-bottom:clamp(40px,6vw,80px);
  }
  .about-body-grid {
    display:grid; grid-template-columns:340px 1fr;
    gap:clamp(24px,5vw,72px); align-items:start;
  }

  @media(max-width:768px){
    .tanit-nav { padding:14px 20px; }
    .tanit-nav-links { gap:20px; }
    .tanit-nav-links button { font-size:1rem; }
    .patto-card { padding:28px 20px; }
    .tanit-btn  { padding:12px 28px; font-size:1.1rem; }

    /* About: tutto in colonna centrata */
    .about-hero-grid {
      grid-template-columns:1fr;
      text-align:center;
    }
    .about-hero-grid > div:last-child { max-width:280px; margin:0 auto; }
    .about-body-grid { grid-template-columns:1fr; }
    .about-photo-secondary { display:none; }
    section { padding-left:20px !important; padding-right:20px !important; }
    .section-title { font-size:1.8rem; }
  }

  .tanit-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  padding: 18px 48px; display: flex; align-items: center; justify-content: space-between;
  
  /* Stato iniziale: Trasparente */
  background: transparent;
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(0px);
  
  /* Transizione fluida per il cambio colore */
  transition: all 0.4s var(--ease);
}

/* Stato quando si scrolla: Diventa Viola/Blur */
.tanit-nav.scrolled {
  padding: 14px 48px; /* Si stringe leggermente per un effetto premium */
  backdrop-filter: blur(16px); 
  background: rgba(90, 24, 154, 0.9); /* Il tuo --p1 con opacità */
  border-bottom: 1px solid rgba(199, 125, 255, 0.2);
}

/* Se vuoi che il testo e il logo diventino bianchi quando la barra è viola */
.tanit-nav.scrolled .tanit-logo,
.tanit-nav.scrolled .tanit-nav-links button {
  color: #fff;
}

.tanit-nav.scrolled .tanit-nav-links button.active {
  border-bottom-color: #fff;
}
`;