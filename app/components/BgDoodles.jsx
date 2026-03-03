'use client';

export default function BgDoodles({ variant = 'home' }) {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      <div style={{ position:'absolute', width:480, height:480, borderRadius:'50%', background:'var(--p5)', filter:'blur(80px)', opacity:0.28, top:-100, right:-80 }} />
      <div style={{ position:'absolute', width:320, height:320, borderRadius:'50%', background:'var(--p4)', filter:'blur(70px)', opacity:0.22, bottom:'10%', left:-60 }} />
      <div style={{ position:'absolute', width:240, height:240, borderRadius:'50%', background:'var(--p3)', filter:'blur(60px)', opacity:0.14, top:'40%', right:'10%' }} />

      {variant === 'home' && <>
        <svg className="doodle-spin" style={{ position:'absolute', top:'14%', left:'6%', opacity:0.18, width:50, height:50 }} viewBox="0 0 50 50" fill="none">
          <path d="M25 3L29 18L44 18L32 27L36 42L25 33L14 42L18 27L6 18L21 18Z" stroke="#9d4edd" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
        <svg className="doodle-spin-rev" style={{ position:'absolute', bottom:'20%', right:'4%', opacity:0.17, width:72, height:72 }} viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="30" stroke="#c77dff" strokeWidth="1.6" strokeDasharray="8 5"/>
        </svg>
        <svg className="doodle-float" style={{ position:'absolute', top:'58%', left:'3%', opacity:0.18, width:100, height:36 }} viewBox="0 0 100 36" fill="none">
          <path d="M2 24 Q18 6 34 24 Q50 42 66 24 Q82 6 98 24" stroke="#e0aaff" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        </svg>
        <svg className="doodle-spin-slow" style={{ position:'absolute', top:'6%', right:'14%', opacity:0.13, width:90, height:90 }} viewBox="0 0 90 90" fill="none">
          {[0,60,120,180,240,300].map((d,i) => (
            <ellipse key={i} cx="45" cy="45" rx="18" ry="7" stroke="#c77dff" strokeWidth="1.3" fill="none" transform={`rotate(${d} 45 45)`} opacity={0.5+i*0.07}/>
          ))}
          <circle cx="45" cy="45" r="4" stroke="#c77dff" strokeWidth="1.5"/>
        </svg>
        <svg className="doodle-wiggle" style={{ position:'absolute', top:'30%', left:'16%', opacity:0.13, width:30, height:30 }} viewBox="0 0 30 30" fill="none">
          <line x1="15" y1="2" x2="15" y2="28" stroke="#c77dff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="2" y1="15" x2="28" y2="15" stroke="#c77dff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg className="doodle-float2" style={{ position:'absolute', bottom:'28%', left:'8%', opacity:0.14, width:42, height:42 }} viewBox="0 0 42 42" fill="none">
          <path d="M21 4L25 16L38 16L27 24L31 36L21 28L11 36L15 24L4 16L17 16Z" stroke="#7b2cbf" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      </>}

      {variant === 'about' && <>
        <svg className="doodle-float" style={{ position:'absolute', top:'20%', right:'6%', opacity:0.17, width:46, height:46 }} viewBox="0 0 46 46" fill="none">
          <path d="M23 6 Q36 13 38 23 Q36 36 23 42 Q10 36 8 23 Q10 10 23 6Z" stroke="#c77dff" strokeWidth="1.5" fill="none"/>
          <circle cx="23" cy="23" r="7" stroke="#c77dff" strokeWidth="1" fill="none" opacity="0.5"/>
        </svg>
        <svg className="doodle-spin-slow" style={{ position:'absolute', bottom:'14%', left:'5%', opacity:0.15, width:80, height:80 }} viewBox="0 0 80 80" fill="none">
          {[0,60,120,180,240,300].map((d,i) => (
            <ellipse key={i} cx="40" cy="40" rx="16" ry="6" stroke="#9d4edd" strokeWidth="1.3" fill="none" transform={`rotate(${d} 40 40)`} opacity={0.5+i*0.07}/>
          ))}
          <circle cx="40" cy="40" r="3.5" stroke="#9d4edd" strokeWidth="1.5"/>
        </svg>
        <svg className="doodle-spin-rev" style={{ position:'absolute', top:'12%', left:'38%', opacity:0.13, width:56, height:56 }} viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="24" stroke="#e0aaff" strokeWidth="1.5" strokeDasharray="6 4"/>
        </svg>
      </>}

      {variant === 'metodo' && <>
        <svg className="doodle-spin-rev" style={{ position:'absolute', top:'7%', left:'3%', opacity:0.15, width:76, height:76 }} viewBox="0 0 76 76" fill="none">
          <circle cx="38" cy="38" r="32" stroke="#9d4edd" strokeWidth="1.6" strokeDasharray="8 5"/>
        </svg>
        <svg className="doodle-spin" style={{ position:'absolute', bottom:'16%', right:'4%', opacity:0.16, width:52, height:52 }} viewBox="0 0 52 52" fill="none">
          <path d="M26 3L31 18L46 18L34 28L39 43L26 33L13 43L18 28L6 18L21 18Z" stroke="#c77dff" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
        <svg className="doodle-wiggle" style={{ position:'absolute', top:'44%', left:'2%', opacity:0.17, width:110, height:36 }} viewBox="0 0 110 36" fill="none">
          <path d="M2 24 Q18 6 34 24 Q50 42 66 24 Q82 6 98 24" stroke="#e0aaff" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        </svg>
      </>}
    </div>
  );
}
