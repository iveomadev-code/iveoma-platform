'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ImpactBanner from '@/components/ImpactBanner';
import ImpactStories from '@/components/ImpactStories';
import { Globe, Zap, Network, ArrowRight, ShieldCheck, Activity, GraduationCap, HeartPulse, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Shared Motion Specs (User Requested) ─── */
const springConfig = { type: 'spring' as const, stiffness: 80, damping: 20 };
const premiumEase = [0.22, 1, 0.36, 1] as any;
const inViewConfig = { once: true, margin: "-80px" };

/* ─── Components ─── */

function SectionLabel({ text, color = "#B8543B", centered = false }: { text: string, color?: string, centered?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: centered ? 0 : -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={inViewConfig}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: centered ? 'center' : 'flex-start', 
        marginBottom: '32px' 
      }}
    >
      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color }}>{text}</span>
    </motion.div>
  );
}

function AnimatedMetric({ value, label, size = 'tertiary', delay = 0, light = false }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const numericPart = parseInt(value.replace(/[^0-9]/g, ''));
      const suffix = value.replace(/[0-9]/g, '');
      let start = 0;
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = numericPart / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericPart) {
          setDisplayValue(numericPart.toLocaleString() + suffix);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start).toLocaleString() + suffix);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay }}
      className="metric-node"
    >
      <div 
        className="metric-value"
        style={{ 
          fontSize: size === 'primary' ? 'clamp(64px, 8vw, 120px)' : 'clamp(32px, 4vw, 48px)',
          color: light ? 'var(--action-gold)' : 'var(--midnight-navy)'
        }}
      >
        {displayValue}
      </div>
      <div 
        className="metric-label"
        style={{ 
          color: light ? 'rgba(255,255,255,0.6)' : 'rgba(15, 42, 68, 0.5)',
          maxWidth: size === 'primary' ? '400px' : '200px',
          fontSize: size === 'primary' ? '14px' : '11px'
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

function ImpactCluster({ label, metrics, delay = 0 }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        type: "spring", 
        stiffness: 80, 
        damping: 20, 
        delay 
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '160px', flex: 1 }}
    >
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#B8543B', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {metrics.map((m: any, i: number) => (
          <AnimatedMetric key={i} {...m} delay={delay + 0.2 + (i * 0.1)} size="secondary" />
        ))}
      </div>
    </motion.div>
  );
}



export default function ImpactPageClient() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  return (
    <div ref={containerRef} style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', position: 'relative' }}>
      <NavBar />

      {/* ─── 1. HERO — INSTITUTIONAL IMPACT ─── */}
      <section style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        color: '#FFFFFF', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="section-pad hero-section-pad">
        {/* Background Image Layer with Parallax & Overlay Blend */}
        <motion.div 
          style={{ 
            position: 'absolute', 
            inset: '-60px', 
            zIndex: 1,
            backgroundImage: 'url("/images/Cynlinder/481174399_953616346885424_6243334226804506322_n.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            filter: 'grayscale(1) contrast(1.2) brightness(0.8)',
            mixBlendMode: 'overlay',
            opacity: 0.4,
          }}
          animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-split-grid">
            <div>
              <SectionLabel text="Field Evidence" color="var(--terracotta)" />
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: premiumEase }}
                style={{ 
                  fontFamily: 'var(--font-heading-monumental), serif', 
                  fontSize: 'clamp(40px, 8vw, 84px)', 
                  fontWeight: 700, 
                  lineHeight: 0.9, 
                  letterSpacing: '-0.04em',
                  margin: 0
                }}
              >
                <span style={{ color: '#FFFFFF' }}>From intervention</span> <br />
                <span style={{ color: 'var(--terracotta)', fontWeight: 300 }}>to outcome.</span>
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
              style={{ paddingLeft: '40px', borderLeft: '1px solid rgba(255,255,255,0.15)', marginTop: '48px' }}
              className="hero-descriptor"
            >
              <p style={{ 
                fontSize: '18px', 
                lineHeight: 1.3, 
                color: 'rgba(255,255,255,0.7)', 
                maxWidth: '460px',
                margin: 0
              }}>
                Quantifying the intersection of technical intervention and community resilience through rigorous data mapping and longitudinal evidence.
              </p>
              
              <div style={{ display: 'flex', gap: '48px', marginTop: '64px' }} className="hero-stats">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>100%</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Traceability</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>2k+</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Direct Beneficiaries</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ImpactBanner />
      <ImpactStories />


      {/* ─── 7. COMMUNITY TRUST — LEGITIMACY (“WE ARE TRUSTED”) ─── */}
      <section style={{ 
        backgroundColor: '#0F2A44', 
        position: 'relative', 
        overflow: 'hidden',
        color: '#FFFFFF'
      }} className="section-pad">
        {/* Background Atmosphere */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }} 
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundImage: 'url(/images/institutional-legitimacy-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
            zIndex: 1
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          
          <div className="legitimacy-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '100px' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <SectionLabel text="Institutional Legitimacy" />
              <h2 style={{ fontFamily: 'var(--font-heading-monumental), sans-serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.05, marginBottom: '0' }}>
                Embedded in the<br />cultural fabric.
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="legitimacy-narrative"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '40px' }}
            >
              <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(255,255,255,0.85)', marginBottom: '32px', margin: '0 0 32px 0' }}>
                Unlike external agencies, Iveoma Development Network operates from within. Our interventions are rooted in the social and cultural systems of the communities we serve — ensuring that every project carries the weight of local legitimacy and long-term partnership.
              </p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--action-gold)', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Social capital is the currency of sustainable change.
              </p>
            </motion.div>
          </div>

          {/* Cultural Integration Grid */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '60px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Cultural integration — Okposi clan</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            </div>

            <div className="legitimacy-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              {[
                { num: "01", title: "Okposi Okwu", sub: "Birthplace of the network's founder, Dr. Nkata Nwani Chuku, and home of the Agunabani Civic Development Centre — the network's most significant infrastructural intervention.", label: "Primary area of intervention" },
                { num: "02", title: "Mgbom N'Achara", sub: "One of the three autonomous communities of the Okposi clan (Okposi Ezinasato). The network maintains active engagement with the community's traditional rulers and governance structures.", label: "Autonomous community" },
                { num: "03", title: "Iri ji ovuru — New Yam Festival", sub: "The historic festival uniting all three autonomous communities of the Okposi clan. Iveoma Development Network is officially on record attending and supporting this cultural milestone alongside traditional rulers.", label: "Annual cultural participation" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '32px', fontWeight: 900, color: 'var(--terracotta)', marginBottom: '16px', lineHeight: 1 }}>{item.num}</div>
                  <h4 style={{ fontFamily: 'var(--font-heading-monumental)', fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.2 }}>{item.title}</h4>
                  <p style={{ fontSize: '15px', lineHeight: 1.3, color: 'rgba(255,255,255,0.6)', flex: 1, marginBottom: '32px', marginTop: 0 }}>{item.sub}</p>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--action-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── 8. CLOSING — INSTITUTIONAL POSITIONING (“WE ENDURE”) ─── */}
      <section style={{ 
        backgroundColor: 'var(--ice-blue)', 
        position: 'relative',
        overflow: 'hidden'
      }} className="section-pad">
        {/* Massive Subtle Background Target */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            right: '-10%',
            top: '0',
            maxWidth: '800px',
            width: '100%',
            height: 'auto',
            aspectRatio: '1',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <img src="/images/target.svg" alt="" style={{ width: '100%', height: '100%', filter: 'brightness(0) opacity(0.3)' }} />
        </motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '80px' }}>
            

            {/* Content Narrative */}
            <div style={{ flex: 1 }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '40px' }}
              >
                <div className="eyebrow" style={{ color: 'var(--terracotta)', marginBottom: '16px' }}>Forward Movement</div>
                <h2 style={{ 
                  fontFamily: 'var(--font-heading-monumental), serif', 
                  fontSize: 'clamp(40px, 6vw, 72px)', 
                  fontWeight: 800, 
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--midnight-navy)',
                  margin: 0
                }}>
                  Development requires<br />collective partnership.
                </h2>
              </motion.div>

              <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }} className="cta-split-row">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  style={{ 
                    fontFamily: 'var(--font-body), sans-serif', 
                    fontSize: '18px', 
                    lineHeight: 1.3, 
                    color: 'rgba(15, 42, 68, 0.7)', 
                    maxWidth: '460px',
                    margin: 0
                  }}
                >
                  We work with global strategic collaborators to scale proven interventions and expand essential infrastructure across underserved regions.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
                >
                  <Button 
                    label="Initiate Partnership" 
                    href="/partner" 
                    variant="primary"
                    context="on-dark"
                  />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 1023px) {
          .legitimacy-header { grid-template-columns: 1fr !important; gap: 40px !important; }
          .legitimacy-narrative { 
            border-left: none !important; 
            padding-left: 0 !important; 
            border-top: 1px solid rgba(255,255,255,0.1) !important; 
            padding-top: 32px !important; 
          }
          .legitimacy-grid { 
            grid-template-columns: 1fr 1fr !important; 
            gap: 40px !important; 
          }
        }
        @media (max-width: 639px) {
          .legitimacy-grid { 
            grid-template-columns: 1fr !important; 
            gap: 48px !important; 
          }
          .cta-split-row {
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
