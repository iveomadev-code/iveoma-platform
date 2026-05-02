'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Globe, Users, Activity } from 'lucide-react';
import Button from './Button';

/* ─── Motion Settings ─── */
const cinematicSpring = { type: 'spring' as const, stiffness: 40, damping: 14 };
const standardSpring  = { type: 'spring' as const, stiffness: 80, damping: 20 };

const heroImage = '/images/hero/girl-in-uniform-main.jpg';

const insights = [
  { value: '3', label: 'Autonomous Communities Reached', delay: 1.8 },
  { value: '8', label: 'Secondary Schools Supported', delay: 2.0 },
  { value: '2,000+', label: 'Women & Widows Stabilized', delay: 2.2 },
];

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-based parallax for environmental layers
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 1000], [0, 150]);
  const noiseY = useTransform(scrollY, [0, 1000], [0, 80]);
  const contentY = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100dvh + 100px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        marginTop: '-100px', // Adjusted for the new taller NavBar
        backgroundColor: 'var(--midnight-navy)', // Deepest Dark Scrim Base (#0F2A44)
      }}
    >
      {/* Background Image Layer */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: '-60px', 
          zIndex: 1,
          backgroundImage: `url("${heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'saturate(0.8) contrast(1.15) brightness(0.85)', // Cinematic Color Grade
          x: useSpring(mousePos.x * -0.5, { stiffness: 50, damping: 20 }),
          y: useSpring(mousePos.y * -0.5, { stiffness: 50, damping: 20 }),
        }}
      />

      {/* Deep Institutional Scrim Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(15, 42, 68, 0) 0%, rgba(15, 42, 68, 0.5) 50%, rgba(15, 42, 68, 0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Architectural Grid Overlay (Micro-Scroll Parallax) */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: '-200px',
          zIndex: 6,
          opacity: 0.04,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          y: gridY
        }}
      />

      {/* 4. Main Content Container */}
      <div
        className="hero-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingTop: '400px',
        }}
      >
        {/* Institutional Insight Markers */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...cinematicSpring, delay: insight.delay }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              {/* Technical Marker Accent */}
              <div style={{ width: '1.5px', height: '14px', backgroundColor: 'var(--terracotta)' }} />
              
              <span style={{ 
                fontFamily: 'var(--font-numbers), var(--font-heading), serif', 
                fontSize: '16px', 
                fontWeight: 800, 
                color: 'var(--action-gold)' 
              }}>
                {insight.value}
              </span>
              <span style={{ opacity: 0.8 }}>
                {insight.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Side-by-Side Content Grid */}
        <div 
          className="hero-grid"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '64px', // Reduced horizontal gap
            width: '100%',
          }}
        >
          {/* Left Column: Headlines */}
          <div style={{ flex: '1 1 60%' }}>
            <div style={{ marginBottom: '0', position: 'relative' }}>
              <div style={{ overflow: 'hidden' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
                  style={{
                    fontSize: 'clamp(40px, 6vw, 80px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.0,
                    margin: '0',
                    fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Empowering <span style={{ fontWeight: 400, opacity: 0.9 }}>Rural Communities.</span>
                </motion.h1>
              </div>
              <div style={{ overflow: 'hidden', marginTop: '0' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.7 }}
                  style={{
                    fontSize: 'clamp(40px, 6vw, 80px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.0,
                    margin: '0',
                    fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                    letterSpacing: '-0.02em',
                    textTransform: 'none',
                  }}
                >
                  Enabling <span style={{ fontWeight: 400, opacity: 0.9 }}>Sustainable Futures.</span>
                </motion.h1>
              </div>
            </div>
          </div>

          {/* Vertical Divider (Strengthened) */}
          <div 
            style={{
              width: '1.5px', // Thicker for stronger connection
              height: '160px', // Increased height
              backgroundColor: 'rgba(255,255,255,0.35)', // Darker/More visible
              alignSelf: 'flex-end',
              marginBottom: '10px',
            }}
          />

          {/* Right Column: Sub-headline & CTAs */}
          <div style={{ flex: '0 0 35%', paddingBottom: '10px' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...standardSpring, delay: 1.3 }}
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '380px',
                lineHeight: 1.3,
                marginBottom: '40px',
              }}
            >
              We partner with underserved regions to build sustainable systems in education, healthcare, and economic opportunity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...standardSpring, delay: 1.5 }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            >
              <Button 
                label="Partner" 
                href="/partner" 
                variant="primary"
                context="on-dark"
              />
              <Button 
                label="Explore" 
                href="/about" 
                variant="secondary"
                context="on-dark"
                showIcon={false}
              />
            </motion.div>
          </div>
        </div>
      </div>



      <style jsx>{`
        .hero-container {
          padding-left: var(--sp-container);
          padding-right: var(--sp-container);
        }
        
        @media (max-width: 1024px) {
          .hero-grid {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 48px !important;
          }
          .hero-grid > div {
            flex: 0 0 100% !important;
            width: 100% !important;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            padding-left: var(--sp-container-sm);
            padding-right: var(--sp-container-sm);
          }
        }
      `}</style>
    </section>
  );
}
