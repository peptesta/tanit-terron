// tanit-terron / ui.jsx
'use client';
import { useState } from 'react';
import { useFadeUp } from '@/app/hooks';

export function Btn({ children, variant = 'primary', onClick }) {
  return <button className={`tanit-btn ${variant}`} onClick={onClick}>{children}</button>;
}

export function CtaSection({ title, body, btnLabel }) {
  const { ref, style } = useFadeUp();
  return (
    <section ref={ref} style={{ ...style, padding:'90px 48px', textAlign:'center', position:'relative', zIndex:2 }}>
      <h2 className="section-title" style={{ marginBottom:16 }}>{title}</h2>
      <p style={{ fontSize:'1.05rem', fontWeight:300, lineHeight:1.85, color:'#3d1a6e', maxWidth:500, margin:'0 auto 36px' }}>{body}</p>
      <Btn>{btnLabel}</Btn>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="tanit-footer">
      <p>Tanit Terron — Psicologa &amp; Accompagnatrice · tanit@tanitsterron.com</p>
      <p style={{ marginTop:8, opacity:0.6, fontSize:'0.85rem' }}>Iscrizione Albo Psicologi · Privacy Policy</p>
    </footer>
  );
}

export function PhotoPlaceholder({ label, rotate = 0 }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ position:'relative', transform:`rotate(${rotate}deg)` }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div className="photo-frame" style={{ transform: h ? `rotate(${-rotate+1}deg) scale(1.02)` : 'none' }}>
        <div style={{ width:'100%', paddingBottom:'125%', background:'linear-gradient(145deg,var(--p5) 0%,var(--p4) 45%,var(--p2) 100%)', position:'relative' }}>
          <svg viewBox="0 0 200 250" fill="none" style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.35 }}>
            <ellipse cx="100" cy="85" rx="42" ry="46" fill="white"/>
            <path d="M20 250 Q20 155 100 148 Q180 155 180 250Z" fill="white"/>
          </svg>
          <div style={{ position:'absolute', bottom:20, left:16, right:16, background:'rgba(90,24,154,0.55)', backdropFilter:'blur(8px)', borderRadius:12, padding:'12px 16px', color:'#fff', fontFamily:"'Caveat',cursive", fontSize:'0.95rem', lineHeight:1.5 }}>
            📷 {label}
          </div>
        </div>
      </div>
      <div className="photo-frame-dashed" style={{ transform: h ? 'rotate(-2.5deg) scale(1.04)' : 'none', transition:'transform 0.45s var(--spring)' }} />
    </div>
  );
}

export function FeatureCard({ icon: Icon, title, text, delay = 0 }) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style}>
      <div className="feat-card">
        <div className="feat-icon-wrap"><Icon size={22} color="var(--p1)" strokeWidth={1.8}/></div>
        <h3 style={{ fontFamily:"'Caveat',cursive", fontSize:'1.4rem', color:'var(--p1)', marginBottom:10 }}>{title}</h3>
        <p style={{ fontSize:'0.97rem', lineHeight:1.75, fontWeight:300, color:'#4a2070', margin:0 }}>{text}</p>
      </div>
    </div>
  );
}

export function ValueItem({ icon: Icon, title, text, delay = 0 }) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style}>
      <div className="value-item">
        <div className="value-icon"><Icon size={18} color="var(--p1)" strokeWidth={1.8}/></div>
        <div>
          <div style={{ fontFamily:"'Caveat',cursive", fontSize:'1.25rem', color:'var(--p2)', marginBottom:4 }}>{title}</div>
          <div style={{ fontSize:'0.95rem', fontWeight:300, lineHeight:1.75, color:'#4a2070' }}>{text}</div>
        </div>
      </div>
    </div>
  );
}

export function StatBadge({ number, label, delay }) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style}>
      <div className="stat-badge">
        <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2.4rem', color:'var(--p1)', lineHeight:1 }}>{number}</div>
        <div style={{ fontFamily:"'Caveat',cursive", fontSize:'1.05rem', color:'var(--p3)', marginTop:4 }}>{label}</div>
      </div>
    </div>
  );
}

export function RestCard({ icon: Icon, number, label, desc, delay }) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style}>
      <div className="rest-card">
        <div style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,var(--p5),var(--p4))', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 4px 14px rgba(157,78,221,0.25)' }}>
          <Icon size={22} color="var(--p1)" strokeWidth={1.8}/>
        </div>
        <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2.8rem', color:'var(--p1)', lineHeight:1, marginBottom:6 }}>{number}</div>
        <div style={{ fontFamily:"'Caveat',cursive", fontSize:'1.15rem', color:'var(--p3)', marginBottom:10 }}>{label}</div>
        <div style={{ fontSize:'0.9rem', fontWeight:300, color:'#4a2070', lineHeight:1.65 }}>{desc}</div>
      </div>
    </div>
  );
}

export function TimelineStep({ heading, body, delay }) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={{ ...style, position:'relative', marginBottom:34 }}>
      <div className="timeline-dot"/>
      <div style={{ fontFamily:"'Caveat',cursive", fontSize:'1.3rem', color:'var(--p2)', marginBottom:5 }}>{heading}</div>
      <div style={{ fontSize:'0.96rem', fontWeight:300, lineHeight:1.75, color:'#4a2070' }}>{body}</div>
    </div>
  );
}
