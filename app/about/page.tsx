// tanit-terron / ChiSonoPage.jsx
'use client';
import { Heart, Search, Wind, Shield } from 'lucide-react';
import BgDoodles from '@/app/components/BgDoodles';
import { useFadeUp } from '@/app/hooks';
import { CtaSection, Footer, PhotoPlaceholder, ValueItem, StatBadge } from '@/app/components/ui';
import PhotoFrame from '@/app/components/Photoframe';


export default function ChiSonoPage() {
  const h1 = useFadeUp(300); const h2 = useFadeUp(500);
  const p1 = useFadeUp(0);   const p2 = useFadeUp(120);
  const p3 = useFadeUp(240); const p4 = useFadeUp(360);

  return (
    <div className="tanit-page">
      <section style={{ padding:'140px 24px 60px', position:'relative' }}>
        <BgDoodles variant="about"/>
        <div style={{ position:'relative', zIndex:2, maxWidth:1160, margin:'0 auto' }}>
          <span className="tanit-tag">Chi sono</span>

          <div className="about-hero-grid">
            <div>
              <h1 ref={h1.ref} style={{ ...h1.style, fontFamily:"'DM Serif Display',serif", fontSize:'clamp(2rem,6vw,5rem)', color:'var(--p1)', lineHeight:1.1, marginBottom:24 }}>
                La <em style={{ fontStyle:'italic', color:'var(--p3)' }}>clinica</em><br/>che incontra<br/>l'umano.
              </h1>
              <p ref={h2.ref} style={{ ...h2.style, fontSize:'clamp(1rem,2.5vw,1.18rem)', fontWeight:300, lineHeight:1.9, color:'#3d1a6e', marginBottom:32 }}>
                Mi chiamo Tanit Terron. Sono psicologa, ma prima di tutto sono una persona che ha scelto di stare accanto alle persone nei momenti che contano davvero.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(8px,2vw,16px)' }}>
                <StatBadge number="8+"   label="anni di pratica"    delay={0}/>
                <StatBadge number="300+" label="percorsi seguiti"   delay={100}/>
                <StatBadge number="100%" label="presenza autentica" delay={200}/>
              </div>
            </div>
            <PhotoFrame
              src="/foto-tanit-principale.jpg"
              alt="Tanit Terron"
              rotate={1}
              width={380}
            />
          </div>

          <div className="about-body-grid">
            <div className="about-photo-secondary">
            <PhotoFrame
              src="/foto-tanit-principale.jpg"
              alt="Tanit Terron"
              rotate={1}
              width={380}
            />
            </div>
            <div>
              <div ref={p1.ref} style={{ ...p1.style, fontSize:'clamp(0.95rem,2vw,1.06rem)', lineHeight:1.9, fontWeight:300, color:'#3d1a6e', marginBottom:22 }}>
                Ho costruito la mia formazione clinica con rigore e passione: studi universitari, supervisione, aggiornamento costante. <strong style={{ color:'var(--p1)', fontWeight:600 }}>Ma la mia più grande scuola è stata ascoltare.</strong>
              </div>
              <div ref={p2.ref} style={{ ...p2.style, fontSize:'clamp(0.95rem,2vw,1.06rem)', lineHeight:1.9, fontWeight:300, color:'#3d1a6e', marginBottom:22 }}>
                Ascoltare senza fretta. La sofferenza non ha bisogno di essere sistemata - ha bisogno di essere <strong style={{ color:'var(--p1)', fontWeight:600 }}>riconosciuta, accolta e attraversata</strong>.
              </div>
              <div ref={p3.ref} style={{ ...p3.style, fontSize:'clamp(0.95rem,2vw,1.06rem)', lineHeight:1.9, fontWeight:300, color:'#3d1a6e', marginBottom:22 }}>
                Non lavoro con diagnosi o categorie: lavoro con <strong style={{ color:'var(--p1)', fontWeight:600 }}>persone, storie, momenti di vita</strong>.
              </div>
              <div ref={p4.ref} style={{ ...p4.style, fontSize:'clamp(0.95rem,2vw,1.06rem)', lineHeight:1.9, fontWeight:300, color:'#3d1a6e', marginBottom:40 }}>
                Il mio lavoro nasce sempre da un Patto: di rispetto reciproco, di presenza, di onesta.
              </div>
              <ValueItem icon={Heart}  title="Presenza autentica" delay={0}   text="Non porto una maschera in seduta. Porto me stessa - professionale e umana insieme."/>
              <ValueItem icon={Search} title="Sguardo clinico"    delay={120} text="La formazione scientifica mi da strumenti. L'intuizione mi aiuta a usarli nel modo giusto."/>
              <ValueItem icon={Wind}   title="Ritmo tuo"           delay={240} text="Nessun percorso e uguale. Nessuna fretta. Procediamo al tuo passo - e io resto li."/>
              <ValueItem icon={Shield} title="Etica sempre"        delay={360} text="Riservatezza, rispetto, trasparenza. Il mio codice deontologico e la base, non il soffitto."/>
            </div>
          </div>
        </div>
      </section>
      <CtaSection title="Vuoi saperne di piu?" body="Hai domande? Scrivimi - la prima conversazione e gratuita e senza impegno." btnLabel="Scopri il Metodo"/>
      <Footer/>
    </div>
  );
}