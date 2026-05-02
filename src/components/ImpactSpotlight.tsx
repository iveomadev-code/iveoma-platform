'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cinematicSpring = { type: 'spring' as const, stiffness: 60, damping: 18 };
const entranceSpring  = { type: 'spring' as const, stiffness: 80, damping: 20 };
const hoverSpring     = { type: 'spring' as const, stiffness: 300, damping: 22 };

function AnimatedMetric({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <span>{count.toLocaleString()}</span>;
}

export default function ImpactSpotlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const [isMetricHovered, setIsMetricHovered] = useState(false);

  // Scroll-based parallax for background texture
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const patternY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        backgroundColor: 'var(--primary)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
      className="section-pad"
    >
      {/* Pattern Overlay (Environmental Parallax) */}
      {/* Deep Institutional Gradient Scrim */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(87, 157, 213, 0.15) 0%, transparent 70%), linear-gradient(to right, rgba(13, 58, 92, 0.8) 0%, rgba(13, 58, 92, 0.4) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <motion.div 
        style={{
          position: 'absolute',
          inset: '-100px',
          backgroundImage: 'url("/images/square-pattern.svg")',
          backgroundSize: '240px',
          backgroundRepeat: 'repeat',
          opacity: 0.2,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          zIndex: 1,
          y: patternY
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div 
          className="impact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          
          {/* Left Column (Content) */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={cinematicSpring}
            className="left-column"
            style={{ 
              position: 'relative', 
              zIndex: 10,
            }}
          >
            <div className="eyebrow" style={{ color: 'var(--terracotta)', fontWeight: 800 }}>Removing Barriers</div>
            
            <h2
              style={{
                fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                fontSize: 'clamp(34px, 4vw, 52px)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.05,
                textTransform: 'none',
                letterSpacing: '-0.02em',
                margin: '0 0 32px 0',
              }}
            >
              Unlocking potential across every community.
            </h2>
            
            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.3,
                maxWidth: '460px',
                margin: '0 0 40px 0',
                letterSpacing: '0.01em',
              }}
            >
              In underserved communities, access — not ability — is often the greatest limitation. Through targeted interventions, we have supported thousands of students with educational resources, expanded healthcare access, and created pathways for women and youth to achieve economic independence.
            </p>
            
            <motion.a
              href="/impact"
              className="btn-link on-dark"
              style={{
                padding: 0
              }}
            >
              View our interventions <ArrowRight size={16} />
            </motion.a>
          </motion.div>


          {/* Right Column (Dominant Metric) */}
          <motion.div
            className="right-column"
            onHoverStart={() => setIsMetricHovered(true)}
            onHoverEnd={() => setIsMetricHovered(false)}
            style={{ 
              position: 'relative', 
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '400px',
              cursor: 'default',
            }}
          >
            {/* Target SVG Background Decoration */}
            <motion.div 
              initial={{ scale: 1 }}
              animate={{ 
                scale: isMetricHovered ? [1, 1.08, 0.96, 1.04, 1] : 1,
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: '100%',
                maxWidth: '600px',
                aspectRatio: '1',
                backgroundImage: 'url("/images/target.svg")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.12,
                zIndex: -1,
                pointerEvents: 'none',
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
                maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
                mixBlendMode: 'plus-lighter',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...entranceSpring, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '12px',
                fontWeight: 800,
                color: 'var(--terracotta)',
                marginBottom: '32px',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
              }}
            >
              women & widows stabilized
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ ...cinematicSpring, delay: 0.6 }}
              style={{
                fontFamily: 'var(--font-numbers), var(--font-heading), serif',
                fontSize: 'clamp(80px, 12vw, 160px)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <AnimatedMetric value={2000} inView={inView} />
              <span style={{ color: 'var(--terracotta)', fontSize: '0.6em', marginLeft: '4px' }}>+</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--terracotta)', opacity: 0.5 }} />
              <span className="spotlight-status" style={{ whiteSpace: 'nowrap' }}>Active Empowerment / Ebonyi State</span>
              <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--terracotta)', opacity: 0.5 }} />
            </motion.div>
          </motion.div>

        </div>
        </div>
      </div>


      <style jsx>{`
        @media (max-width: 1023px) {
          .impact-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .left-column { text-align: center; }
          .left-column h2, .left-column p { margin-left: auto !important; margin-right: auto !important; }
          .left-column .btn-link { justify-content: center; }
        }
        @media (max-width: 639px) {
          .spotlight-status { white-space: normal !important; text-align: center; max-width: 200px; }
        }
      `}</style>
    </section>
  );
}
