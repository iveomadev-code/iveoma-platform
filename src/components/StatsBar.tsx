'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const entranceSpring = { type: 'spring' as const, stiffness: 80, damping: 20 };

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 3,    suffix: '',  label: 'Autonomous Communities Reached' },
  { value: 8,    suffix: '',  label: 'Secondary Schools Supported'  },
  { value: 2000, suffix: '+', label: 'Women & Widows Stabilized'     },
];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        backgroundColor: 'var(--primary)', // Deep Authority Blue (#0F2A44)
        padding: 'var(--sp-section) var(--sp-container)',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Pattern Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/images/square-pattern.svg")',
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Institutional CAPS Accent */}
      <motion.div
        initial={{ opacity: 0, y: 16, x: -12 }} // Subtle asymmetry shift
        animate={inView ? { opacity: 1, y: 0, x: -12 } : {}}
        transition={entranceSpring}
        style={{
          fontFamily: 'var(--font-accent), sans-serif',
          fontSize: '13px',
          fontWeight: 800,
          color: '#B8543B', // Terracotta Accent
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.4em',
          marginBottom: '40px',
        }}
      >
        Our impact, in numbers
      </motion.div>

      {/* 4-column grid — with premium rhythm offsets */}
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
        }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { 
                opacity: 1, 
                y: i % 2 === 0 ? -4 : 4, // Subtle vertical rhythm offset
                transition: entranceSpring 
              },
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 24px',
              borderRight: i < stats.length - 1
                ? '1px solid rgba(10,34,55,0.1)' // Navy Divider
                : 'none',
            }}
          >
            {/* Number */}
            <div
              style={{
                fontFamily: 'var(--font-numbers), var(--font-heading), serif',
                fontSize: 'clamp(34px, 4vw, 58px)', // Corrected size
                fontWeight: 800,
                color: '#FFFFFF', // Stats numbers are white
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>

            {/* Subtle Navy Accent Underline */}
            <div
              style={{
                width: '32px',
                height: '1px',
                backgroundColor: 'var(--muted-gold)', // Muted Gold Divider
                marginBottom: '20px',
              }}
            />

            {/* Label */}
            <div
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '9px', // Reduced by ~30%
                fontWeight: 800,
                color: 'var(--sky-blue)', // Stats labels are #579DD5
                textTransform: 'uppercase',
                letterSpacing: '0.25em', // Increased tracking
                maxWidth: '120px',
                lineHeight: 1.5,
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  );
}
