'use client';
import { Leaf, Handshake, RefreshCw, Sparkles } from 'lucide-react';
import BgDoodles from '@/app/components/BgDoodles';
import StickerBoard from '@/app/components/StickerBoard';
import { Btn, CtaSection, Footer, FeatureCard } from '@/app/components/ui';

export default function HomePage() {

  return (
    <div className="tanit-page">
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'120px 48px 80px', position:'relative' }}>
        <BgDoodles variant="home"/>
        <div style={{ position:'relative', zIndex:2, textAlign:'center', maxWidth:820 }}>
          <span className="fade-stagger-1" style={{ fontFamily:"'Caveat',cursive", fontSize:'1.35rem', color:'var(--p3)', letterSpacing:'0.08em', display:'inline-block', marginBottom:16 }}>✦ Psicologa &amp; Accompagnatrice ✦</span>
          <h1 className="fade-stagger-2" style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(3.6rem,9vw,7.5rem)', lineHeight:1.05, color:'var(--p1)', margin:'0 0 8px' }}>
            <em style={{ fontStyle:'italic', color:'var(--p3)' }}>Tanit</em><br/>Terron
          </h1>
          <p className="fade-stagger-3" style={{ fontFamily:"'Caveat',cursive", fontSize:'1.55rem', color:'var(--p2)', margin:'0 0 28px' }}>Perché ogni percorso nasce da un atto di coraggio.</p>
          <p className="fade-stagger-4" style={{ fontSize:'1.12rem', fontWeight:300, lineHeight:1.85, color:'#3d1a6e', maxWidth:560, margin:'0 auto 48px' }}>Non sono qui per darti risposte. Sono qui per camminare con te mentre le trovi. Un accompagnamento umano, professionale e profondamente tuo.</p>
          <div className="fade-stagger-5" style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={() => console.log('ciao')}>Scopri il Percorso</Btn>
            <Btn onClick={() => console.log('chi sono')} variant="outline">Chi sono</Btn>
          </div>
        </div>
        <div className="fade-stagger-6" style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <span style={{ fontFamily:"'Caveat',cursive", fontSize:'0.9rem', color:'var(--p4)', letterSpacing:'0.1em' }}>scorri</span>
          <div className="scroll-arrow" style={{ width:22, height:22, borderRight:'2px solid var(--p4)', borderBottom:'2px solid var(--p4)', transform:'rotate(45deg)' }}/>
        </div>
      </section>

      <section style={{ padding:'60px 48px 80px', position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:32, maxWidth:1120, margin:'0 auto' }}>
        <FeatureCard icon={Leaf}      title="Accompagnamento autentico" delay={0}   text="Non una terapia standardizzata. Un percorso costruito su di te, passo dopo passo, nel tuo tempo."/>
        <FeatureCard icon={Handshake} title="Il Patto di Impegno"        delay={120} text="Un investimento consapevole che diventa strumento terapeutico. La tua volontà, resa concreta fin dal primo momento."/>
        <FeatureCard icon={RefreshCw} title="Premio alla Costanza"       delay={240} text="Per ogni seduta completata, 5€ tornano a te a metà e a fine percorso. Il tuo impegno genera valore reale."/>
        <FeatureCard icon={Sparkles}  title="Presenza totale"            delay={360} text="Ogni seduta è uno spazio sicuro. Nessun giudizio, nessuna fretta. Solo ascolto vero e profondo."/>
      </section>

      <section style={{ padding:'20px 48px 80px', maxWidth:1120, margin:'0 auto', position:'relative', zIndex:2 }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <h2 className="section-title">Voci dal <span className="drawn">viaggio</span></h2>
          <p className="section-sub">Disegna, trascina, aggiungi — fai tuo questo spazio</p>
        </div>
        <StickerBoard/>
      </section>

      <CtaSection title={<>Pronta a <span className="drawn">cominciare</span>?</>} body="Il primo passo è il più importante. Scrivimi: parliamo insieme di come posso accompagnarti." btnLabel="Scrivi a Tanit"/>
      <Footer/>
    </div>
  );
}