'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const entranceSpring = { type: 'spring' as const, stiffness: 60, damping: 16 };

export default function GeographicPresence() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  
  // Subtle parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Stronger pixel-based parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '90vh',
        minHeight: '700px',
        backgroundColor: 'var(--ice-blue)', // Ice Grey (#F4F6F9)
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Rural Landscape Background (Undeniable Parallax) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20%', // Massive bleed for strong parallax
          left: 0,
          right: 0,
          bottom: '-20%',
          backgroundImage: 'url("/images/okposi-landscape.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
          scale: backgroundScale,
          zIndex: 1,
        }}
      />

      {/* 2. Texture Layer (Grain) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0.05,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Layered Cinematic Overlays */}
      {/* Primary Layered Gradient (Starting from bottom) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(240, 245, 250, 0.95) 0%, rgba(240, 245, 250, 0.4) 50%, rgba(240, 245, 250, 0.1) 100%)',
          zIndex: 3,
        }}
      />
      
      {/* Soft Cinematic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          boxShadow: 'inset 0 0 180px rgba(240, 245, 250, 0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* 4. Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: 'var(--sp-container)',
          paddingRight: 'var(--sp-container)',
        }}
      >
        <div className="geo-content-grid">
          {/* Left Column: Eyebrow + Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Micro line / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...entranceSpring, delay: 0.2 }}
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#C9A96E',
                marginBottom: 'var(--sp-eyebrow)',
              }}
            >
              Local insight. Global perspective.
            </motion.div>

            {/* Headline with rhythm and tension */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...entranceSpring, delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                fontSize: 'clamp(38px, 4.5vw, 60px)',
                fontWeight: 800,
                color: 'var(--primary)', // Deep Authority (#0F2A44)
                lineHeight: 1.1,
                textTransform: 'uppercase', // Monumental All-Caps
                letterSpacing: '0', // Reset to 0
                maxWidth: '480px', // Reduced width for elegance
                margin: 0,
              }}
            >
              Rooted in Ebonyi.
              <span style={{ display: 'block', height: '16px' }} /> {/* Rhythm spacer */}
              Expanding impact <br />
              across communities.
            </motion.h2>
          </div>

          {/* Right Column: Body Text */}
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '8px' }}>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...entranceSpring, delay: 0.6 }}
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '18px',
                color: 'var(--neutral-charcoal)', // Charcoal Text
                lineHeight: 1.7,
                maxWidth: '480px',
                margin: 0,
              }}
            >
              Our work is grounded in deep community engagement across Ebonyi State, with a growing footprint shaped by partnerships, data-driven insights, and scalable development models.
            </motion.p>
          </div>
        </div>
      </div>

      {/* 5. Location Label (Understated documentary layer) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.25 } : {}}
        transition={{ delay: 1.2, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '48px',
          right: 'var(--sp-container)',
          zIndex: 10,
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--primary)', // Deep Authority (#0F2A44)
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Okposi, Ebonyi State, Nigeria
      </motion.div>

      <style jsx>{`
        .geo-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 120px;
          align-items: flex-end;
        }

        @media (max-width: 1024px) {
          .geo-content-grid {
            gap: 60px;
          }
        }

        @media (max-width: 768px) {
          .geo-content-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-heading-body);
            align-items: flex-start;
          }
          .container {
            padding-left: var(--sp-container-sm) !important;
            padding-right: var(--sp-container-sm) !important;
          }
        }
      `}</style>
    </section>
  );
}
