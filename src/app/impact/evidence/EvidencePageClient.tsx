'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Navigation from '@/components/NavBar';
import Footer from '@/components/Footer';

/* ─── Shared Specs ─── */
const premiumEase = [0.22, 1, 0.36, 1] as any;

/* ─── Animated Components ─── */

function ProgressBar({ fill, labels }: { fill: string, labels: { left: string, right: string } }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--midnight-navy)' }}>{labels.left}</span>
        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--terracotta)' }}>{labels.right}</span>
      </div>
      <div style={{ height: '6px', backgroundColor: 'rgba(15, 42, 68, 0.05)', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.1, ease: premiumEase }}
          style={{ 
            height: '100%', 
            width: fill, 
            backgroundColor: 'var(--terracotta)', 
            transformOrigin: 'left',
            borderRadius: '10px'
          }}
        />
      </div>
    </div>
  );
}

function RingProgress({ label }: { label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '24px' }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle 
          cx="22" cy="22" r="18" 
          fill="none" 
          stroke="rgba(15, 42, 68, 0.05)" 
          strokeWidth="4" 
        />
        <motion.circle 
          cx="22" cy="22" r="18" 
          fill="none" 
          stroke="var(--terracotta)" 
          strokeWidth="4" 
          strokeDasharray="113.1"
          initial={{ strokeDashoffset: 113.1 }}
          animate={isInView ? { strokeDashoffset: 30 } : { strokeDashoffset: 113.1 }}
          transition={{ duration: 1.1, ease: premiumEase }}
          strokeLinecap="round"
          style={{ rotate: -90, transformOrigin: 'center' }}
        />
      </svg>
      <span style={{ fontSize: '11px', lineHeight: 1.4, color: 'rgba(15, 42, 68, 0.6)', fontWeight: 500, maxWidth: '200px' }}>
        {label}
      </span>
    </div>
  );
}

function TimelineItem({ year, title, sub, last = false, index = 0 }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: premiumEase }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}
    >
      <div style={{ fontFamily: 'var(--font-heading-monumental)', fontSize: '18px', fontWeight: 800, color: 'var(--terracotta)' }}>
        {year}
      </div>

      <div style={{ position: 'relative', height: '16px', display: 'flex', alignItems: 'center' }}>
        {/* Horizontal Line connecting nodes */}
        <div 
          className="timeline-connector"
          style={{ 
            position: 'absolute', 
            left: '12px', 
            right: last ? '100%' : '-32px', // Hide right part if last, otherwise extend to next column gap
            height: '2px', 
            backgroundColor: 'rgba(184, 84, 59, 0.2)', 
            zIndex: 1,
            display: last ? 'none' : 'block' // Ensure it doesn't leak out
          }} 
        />
        <div style={{ 
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--terracotta)', 
          zIndex: 2, 
          boxShadow: '0 0 0 6px rgba(184, 84, 59, 0.1)' 
        }} />
      </div>

      <div>
        <h4 style={{ fontFamily: 'var(--font-heading-monumental)', fontSize: '16px', fontWeight: 700, color: 'var(--cool-muted)', margin: '0 0 12px 0', lineHeight: 1.2 }}>{title}</h4>
        <p style={{ fontSize: '14px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>{sub}</p>
      </div>
    </motion.div>
  );
}

function StatStrip({ type = 'primary' }: { type?: 'primary' | 'secondary' }) {
  if (type === 'primary') {
    return (
      <div className="stat-strip-inner" style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        borderRadius: '12px', 
        padding: '40px', 
        display: 'grid', 
        gridTemplateColumns: '1.2fr 2fr', 
        gap: '60px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-numbers)', fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            2,000<span style={{ color: 'var(--terracotta)' }}>+</span>
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.3, maxWidth: '240px' }}>
            Total direct beneficiaries reached through structured, high-fidelity interventions.
          </p>
        </div>
        <div className="ministat-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '32px' }}>
          <MiniStat val="4" label="Strategic pillars" />
          <MiniStat val="3" label="Communities" />
          <MiniStat val="100%" label="Traceable" />
          <MiniStat val="20+" label="Years active" />
        </div>
      </div>
    );
  }
  return (
    <div className="stat-strip-inner" style={{ 
      backgroundColor: 'var(--midnight-navy)', 
      borderRadius: '12px', 
      padding: '40px', 
      display: 'grid', 
      gridTemplateColumns: '1.2fr 2fr', 
      gap: '60px',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h2 style={{ fontFamily: 'var(--font-numbers)', fontSize: '48px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
          100<span style={{ color: 'var(--terracotta)' }}>%</span>
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.3, maxWidth: '240px' }}>
          Traceable impact — every intervention documented with field evidence and verified records.
        </p>
      </div>
      <div className="ministat-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '32px' }}>
        <MiniStat val="4" label="Strategic pillars" />
        <MiniStat val="3" label="Autonomous communities" />
        <MiniStat val="20+" label="Years operating" />
      </div>
    </div>
  );
}

function MiniStat({ val, label }: { val: string, label: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: 'var(--terracotta)', marginBottom: '4px' }}>{val}</div>
      <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{label}</div>
    </div>
  );
}

function Card({ num, title, sub, children, dark = false }: any) {
  return (
    <div style={{ 
      backgroundColor: dark ? 'var(--midnight-navy)' : '#FFFFFF', 
      padding: '40px', 
      borderRadius: '12px', 
      border: dark ? 'none' : '1px solid rgba(15, 42, 68, 0.05)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '48px', fontWeight: 900, color: dark ? 'var(--terracotta)' : 'var(--midnight-navy)', marginBottom: '24px', lineHeight: 0.9 }}>{num}</div>
      <h3 style={{ fontFamily: 'var(--font-heading-monumental)', fontSize: '18px', fontWeight: 700, color: dark ? '#FFFFFF' : 'var(--sky-blue)', marginBottom: '16px', lineHeight: 1.2 }}>{title}</h3>
      <p style={{ fontSize: '14px', lineHeight: 1.3, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(15, 42, 68, 0.7)', margin: 0 }}>{sub}</p>
      {children}
    </div>
  );
}

/* ─── Main Client Page ─── */

export default function EvidencePageClient() {
  return (
    <main style={{ backgroundColor: 'var(--ice-blue)' }}>
      <Navigation />

      {/* ─── Page Hero (Dark) ─── */}
      <section style={{ backgroundColor: 'var(--midnight-navy)', padding: '160px 0 40px 0' }}>
        <div className="evidence-hero-inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '36px 80px 28px 80px' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-end' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '24px' }}>
                Impact evidence
              </span>
              <h1 className="evidence-hero-h1" style={{ 
                fontFamily: 'var(--font-heading-monumental)', 
                fontSize: 'clamp(40px, 5vw, 64px)', 
                fontWeight: 800, 
                color: '#FFFFFF', 
                margin: 0,
                lineHeight: 0.9,
                letterSpacing: '-0.03em'
              }}>
                Every number.<br />Every <span style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>intervention.</span><br />Verified.
              </h1>
            </div>
            <div className="hero-content-right" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px', paddingBottom: '8px' }}>
              <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(255,255,255,0.7)', maxWidth: '440px', margin: '0 0 32px 0' }}>
                A public record of every infrastructure project and community programme — from first intervention to current status.
              </p>
              <Link href="/impact" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
                <ChevronLeft size={16} />
                <span>Back to Impact</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Page Body (Cream/Ice) ─── */}
      <section style={{ padding: '80px 0 160px 0' }}>
        <div className="evidence-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 80px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Section 1 — Headline anchor strip (Removed as per Section B of STRUCTURE_CHANGES.md) */}

          {/* Section 2 — Infrastructure Growth */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '60px', borderRadius: '12px', border: '1px solid rgba(15, 42, 68, 0.05)' }}>
            <div className="infrastructure-header" style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '60px' }}>
              <span className="infrastructure-growth-label" style={{ fontSize: '11px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>Infrastructure Growth</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)' }} />
            </div>
            
            <div className="timeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', position: 'relative' }}>
              <TimelineItem 
                year="2016" 
                title="Isi Okposi Girls Secondary School — Examination Hall" 
                sub="Full renovation restoring a critical assessment facility for female students in Okposi." 
                index={0}
              />
              <TimelineItem 
                year="2019" 
                title="Central School Okposi — Primary Hall" 
                sub="Rebuilt the primary school assembly and learning hall for the broader community." 
                index={1}
              />
              <TimelineItem 
                year="2020" 
                title="COVID-19 Community Response" 
                sub="Handwash basins, sanitizers, masks, and emergency cash relief deployed across Okposi and Ebonyi State during the pandemic." 
                index={2}
              />
              <TimelineItem 
                year="2021" 
                title="Sir & Lady Nwani Chuku Hall — Holy Rosary College" 
                sub="Assembly hall consecrated by Bishop Michael Okoro on 13 July 2021, named in honour of the founder's parents." 
                last={true}
                index={3}
              />
              <TimelineItem 
                year="2021–2025" 
                title="Iveoma Annual Health Walk" 
                sub="Five consecutive annual health walks in Okposi, growing into one of the community's most attended yearly events." 
                index={4}
              />
              <TimelineItem 
                year="2024" 
                title="Dr. Nkata Nwani Chuku Medical Centre — Veritas University, Abuja" 
                sub="Chaired capital mobilisation and led design to expand clinical training capacity at the tertiary level." 
                index={5}
              />
              <TimelineItem 
                year="2025" 
                title="Sir Nwani & Lady Akanele Chuku Learning and Development Centre — Agunabani" 
                sub="Multi-facility ICT hub providing free, mandatory training and 24-hour high-speed internet to senior secondary students." 
                last={true}
                index={6}
              />
            </div>
          </div>

          {/* Section 3 — Education */}
          <div className="education-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Card 
              num="8" 
              title="Public Secondary Schools Reached" 
              sub="Senior students across eight schools in Okposi — intensive reading programmes and full WAEC fee sponsorships."
            >
              <ProgressBar fill="80%" labels={{ left: '8 reached', right: '10 target' }} />
            </Card>
            <Card 
              num="3" 
              title="Major Academic Facilities Rehabilitated" 
              sub="Isi Okposi Girls Secondary School examination hall and multi-purpose hall at Holy Rosary College."
            >
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                {[1,2,3].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--terracotta)' }} />)}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(15, 42, 68, 0.4)', textTransform: 'uppercase', marginTop: '12px' }}>3 facilities fully completed</div>
            </Card>
            <Card 
              num="9" 
              title="Distinctions — the benchmark for our students" 
              sub="Dr. Nkata Nwani Chuku set a school record with 9 WAEC distinctions — the standard of excellence the network holds for every student it supports."
              dark
            />
          </div>

          {/* Section 4 — Technology & Digital Access */}
          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Card 
              num="1" 
              title="High-Tech Civic Centre Established" 
              sub="The Sir Nwani & Lady Akanele Chuku Learning and Development Centre, Agunabani — free, mandatory ICT training for senior secondary students."
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '32px', borderTop: '1px solid rgba(15, 42, 68, 0.05)', paddingTop: '24px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--midnight-navy)' }}>24h</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(15, 42, 68, 0.4)', textTransform: 'uppercase' }}>Uninterrupted internet</div>
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--midnight-navy)' }}>2hrs</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(15, 42, 68, 0.4)', textTransform: 'uppercase' }}>Min. weekly ICT training</div>
                </div>
              </div>
            </Card>
            <Card 
              num="15+" 
              title="15+ Years in Global Health" 
              sub="Dr. Nkata Nwani Chuku brings over 15 years of health policy, health financing, and systems-strengthening experience — spanning FHI 360, KPMG West Africa, and the London School of Economics."
            >
              <RingProgress label="Spanning global health policy and community systems strengthening" />
            </Card>
          </div>

          {/* Section 5 — Health Systems */}
          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Card 
              num="7" 
              title="Regional Hospitals Fortified" 
              sub="Public and private hospitals in Ebonyi State equipped with critical PPE to protect frontline workers during acute health crises."
            >
              <ProgressBar fill="100%" labels={{ left: 'All 7 target hospitals', right: '100% equipped' }} />
            </Card>
            <Card 
              num="1" 
              title="Tertiary Medical Centre Supported" 
              sub="Spearheaded capital mobilisation and design for the Dr. Nkata Nwani Chuku Medical Centre at Veritas University, Abuja."
            >
              <RingProgress label="Abuja — expanding clinical training at the tertiary level" />
            </Card>
          </div>

          {/* Section 6 — Institutional Depth (Removed as per Section E of STRUCTURE_CHANGES.md) */}

        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 1023px) {
          .evidence-hero-inner { padding: var(--sp-section-md) var(--sp-container) !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; align-items: flex-start !important; }
          .hero-content-right { border-left: none !important; padding-left: 0 !important; border-top: 1px solid rgba(255,255,255,0.1) !important; padding-top: 32px !important; }
          .timeline-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 48px 32px !important; }
          .timeline-connector { display: none !important; }
          .education-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .evidence-container { padding: 0 var(--sp-container) !important; }
          .stat-strip-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 639px) {
          .timeline-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .education-grid { grid-template-columns: 1fr !important; }
          .metrics-grid { grid-template-columns: 1fr !important; }
          .ministat-container { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          .evidence-hero-h1 { font-size: clamp(32px, 10vw, 48px) !important; }
          .infrastructure-growth-label { white-space: normal !important; text-align: center; }
          .infrastructure-header { flex-direction: column !important; gap: 24px !important; }
        }
        @media (max-width: 374px) {
          .ministat-container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
