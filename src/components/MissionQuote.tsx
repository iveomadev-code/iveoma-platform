'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const slowCalmSpring = { type: 'spring' as const, stiffness: 40, damping: 22 };

export default function MissionQuote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: slowCalmSpring }
  };

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--ice-blue)',
        padding: 'var(--sp-section) var(--sp-container)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Centralized Wrapper for Top Content */}
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Eyebrow Label on a separate row */}
          <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ marginBottom: '16px' }}
        >
          <motion.div
            variants={itemVariants}
            className="eyebrow"
            style={{ marginBottom: 0 }}
          >
            Our Purpose
          </motion.div>
        </motion.div>

        {/* Row 1: 2-Column Grid */}
        <div className="purpose-layout">
          
          {/* Left Column: Headline */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            style={{ position: 'relative', zIndex: 1, width: '100%' }}
          >

            <motion.h2
              style={{
                fontSize: 'clamp(20px, 2vw, 32px)',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--terracotta) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.05,
                margin: 0,
                maxWidth: '600px',
                fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                letterSpacing: '-0.02em',
                fontWeight: 800,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <motion.span variants={itemVariants}>
                Where you are born should not determine how far you can go.
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Right Column: Body Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-start',
              position: 'relative',
              zIndex: 1,
              width: '100%',
            }}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: '#2A2F3A',
                lineHeight: 1.3,
                maxWidth: '500px',
                margin: 0,
                fontFamily: 'var(--font-body), sans-serif',
                opacity: 0.85
              }}
            >
              We work at the intersection of access, opportunity, and dignity — ensuring that underserved communities are not left behind in a rapidly evolving world.
            </motion.p>
          </motion.div>

        </div>
        </div>

        {/* Row 2: Responsive Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            marginTop: '64px',
            width: '100%',
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '21 / 9',
            backgroundColor: 'var(--primary)',
          }}
        >
          <img 
            src="/images/group-africans-feeling-excited-about-what-they-saw-their-cellphone.jpg" 
            alt="Excited community" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'saturate(0.85) contrast(1.1)'
            }}
          />
        </motion.div>

      </div>

      <style jsx>{`
        .purpose-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: flex-start;
        }
        @media (max-width: 1024px) {
          .purpose-layout {
            gap: 48px;
          }
        }
        @media (max-width: 768px) {
          .purpose-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
