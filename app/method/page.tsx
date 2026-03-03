// tanit-terron / MetodoPage.jsx
'use client';
import { useState } from 'react';
import { Leaf, Star, RefreshCw } from 'lucide-react';
import BgDoodles from '@/app/components/BgDoodles';
import { useFadeUp } from '@/app/hooks';
import { CtaSection, Footer, RestCard, TimelineStep } from '@/app/components/ui';

export default function MetodoPage() {
  const h1 = useFadeUp(300); const h2 = useFadeUp(500);
  const pc  = useFadeUp(100); const cf  = useFadeUp(200);
  const [sessions, setSessions] = useState(12);
  const total = sessions * 5;
  const half  = Math.floor(sessions / 2) * 5;

  const steps = [
    { heading:'Firma del Patto',                        body:"Decidi il numero di sedute, paghi in un'unica soluzione. Il viaggio ha inizio." },
    { heading:'Ogni seduta completata',                 body:'5€ vengono accantonati automaticamente. Ogni presenza conta, letteralmente.' },
    { heading:'Premio alla Costanza — a metà percorso', body:"Raggiungi la metà? La prima Restituzione ti viene restituita. Un traguardo da celebrare." },
    { heading:'Investimento Circolare — alla fine',     body:"Hai completato il percorso. L'intera somma accantonata torna a te." },
  ];

  return (
    <div className="tanit-page">
      <section style={{ minHeight:'52vh', display:'flex', alignItems:'flex-end', padding:'160px 48px 64px', position:'relative' }}>
        <BgDoodles variant="metodo"/>
        <div style={{ position:'relative', zIndex:2, maxWidth:720 }}>
          <span className="tanit-tag">✦ Il Metodo</span>
          <h1 ref={h1.ref} style={{ ...h1.style, fontFamily:"'DM Serif Display',serif", fontSize:'clamp(2.6rem,6.5vw,5.5rem)', color:'var(--p1)', lineHeight:1.1, marginBottom:20 }}>
            Il <em style={{ fontStyle:'italic', color:'var(--p3)' }}>Patto</em><br/>di Impegno.
          </h1>
          <p ref={h2.ref} style={{ ...h2.style, fontSize:'1.18rem', fontWeight:300, lineHeight:1.9, color:'#3d1a6e' }}>
            Un sistema pensato per rendere visibile e concreto il tuo desiderio di cambiamento.
          </p>
        </div>
      </section>

      <section style={{ padding:'60px 48px 20px', position:'relative', zIndex:2 }}>
        <div ref={pc.ref} style={{ ...pc.style, maxWidth:900, margin:'0 auto' }}>
          <div className="patto-card">
            <div style={{ position:'absolute', top:-70, right:-70, width:240, height:240, background:'var(--p5)', borderRadius:'50%', opacity:0.3, pointerEvents:'none' }}/>
            <span style={{ fontFamily:"'Caveat',cursive", fontSize:'1rem', color:'var(--p3)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:10 }}>✦ Il cuore del percorso</span>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2.5rem', color:'var(--p1)', marginBottom:24 }}>L'Investimento Circolare</h2>
            <p style={{ fontSize:'1.06rem', fontWeight:300, lineHeight:1.9, color:'#3d1a6e', marginBottom:20 }}>
              Le sessioni vengono pagate in un'unica soluzione anticipata. <strong style={{ color:'var(--p1)', fontWeight:600 }}>Mettere le risorse in campo — prima ancora di iniziare — è la prima forma di cura verso sé stessi.</strong>
            </p>
            <p style={{ fontSize:'1.06rem', fontWeight:300, lineHeight:1.9, color:'#3d1a6e', marginBottom:44 }}>
              Per ogni seduta effettuata, 5€ vengono accantonati. Non è un rimborso, non è uno sconto: è la tua <strong style={{ color:'var(--p1)', fontWeight:600 }}>Restituzione del Compromesso</strong>.
            </p>
            <div className="timeline">
              {steps.map((s, i) => <TimelineStep key={i} heading={s.heading} body={s.body} delay={i * 130}/>)}
            </div>
          </div>
        </div>

        <div ref={cf.ref} style={{ ...cf.style, background:'#fff', borderRadius:24, padding:'40px 44px', boxShadow:'0 0 0 1.5px var(--p5),0 0 0 4px #fff,0 0 0 6px var(--p4),0 8px 30px rgba(90,24,154,0.1)', maxWidth:900, margin:'36px auto 0' }}>
          <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'1.8rem', color:'var(--p1)', marginBottom:8 }}>Calcola il tuo Investimento Circolare</h3>
          <p style={{ fontFamily:"'Caveat',cursive", fontSize:'1.1rem', color:'var(--p3)', marginBottom:28 }}>Quante sedute stai pensando di fare?</p>
          <div style={{ display:'flex', alignItems:'center', gap:24, marginBottom:32 }}>
            <input type="range" min={4} max={30} value={sessions} onChange={e => setSessions(Number(e.target.value))} style={{ flex:1 }}/>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2.4rem', color:'var(--p1)', minWidth:48 }}>{sessions}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {[
              { icon:Leaf,      label:'Accantonati totali',  value:`${total}€` },
              { icon:Star,      label:'Premio a metà',       value:`${half}€`  },
              { icon:RefreshCw, label:'Restituzione finale', value:`${total}€` },
            ].map(({ icon:Icon, label, value }) => (
              <div key={label} style={{ background:'var(--bg)', borderRadius:16, padding:20, border:'1px solid var(--p5)', textAlign:'center' }}>
                <Icon size={22} color="var(--p3)" strokeWidth={1.6} style={{ marginBottom:10 }}/>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2rem', color:'var(--p1)' }}>{value}</div>
                <div style={{ fontFamily:"'Caveat',cursive", fontSize:'1rem', color:'var(--p3)', marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'64px 48px', maxWidth:1000, margin:'0 auto', position:'relative', zIndex:2 }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 className="section-title">La <span className="drawn">Restituzione</span></h2>
          <p className="section-sub">Il ritorno concreto del tuo impegno</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:24 }}>
          <RestCard icon={Leaf}      number="5€"   label="per ogni seduta"  delay={0}   desc="Accantonati nel tuo fondo personale. Ogni presenza è un investimento su di te."/>
          <RestCard icon={Star}      number="50%"  label="a metà percorso"  delay={150} desc="Il primo Premio alla Costanza. Il riconoscimento che il viaggio è già in corso."/>
          <RestCard icon={RefreshCw} number="100%" label="alla fine"         delay={300} desc="Tutta la Restituzione del Compromesso. Il cerchio si chiude — e si apre qualcosa di nuovo."/>
        </div>
      </section>

      <CtaSection title={<>Inizia il <span className="drawn">tuo percorso</span></>} body="Sei pronta a fare il primo passo? Scrivimi — definiamo insieme la struttura del tuo cammino." btnLabel="Contatta Tanit"/>
      <Footer/>
    </div>
  );
}