'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const entranceSpring = { type: 'spring' as const, stiffness: 60, damping: 16 };
const hoverSpring    = { type: 'spring' as const, stiffness: 300, damping: 22 };

const steps = [
  { num: '01', title: 'Identify', desc: 'We build deep relationships with communities to understand real needs and root causes.' },
  { num: '02', title: 'Intervene', desc: 'We deploy high-impact programmes across education, health, and livelihoods.' },
  { num: '03', title: 'Empower', desc: 'We build local capacity, enabling communities to own their development process.' },
  { num: '04', title: 'Sustain', desc: 'We forge lasting resilience so communities can thrive beyond our direct support.' }
];

export default function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--ice-blue)', // Ice Grey (#F4F6F9)
        width: '100%',
        overflow: 'hidden',
      }}
      className="how-we-work-section"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={entranceSpring}
          style={{ marginBottom: 'var(--sp-inner-gap)' }}
        >
          <div className="eyebrow">Our Approach</div>
          
          <h2
            style={{
              fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
              fontSize: 'clamp(34px, 4vw, 56px)',
              fontWeight: 600,
              maxWidth: '620px',
              lineHeight: 1.05,
              margin: 0,
              textTransform: 'none',
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, var(--terracotta) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}
          >
            From the ground up.
          </h2>

        </motion.div>

        {/* Connected Process System */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
          style={{ position: 'relative', marginTop: '40px' }}
        >
          {/* Subtle Horizontal Rail (Background) */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '1px',
            backgroundColor: 'rgba(201,169,110,0.25)',
            zIndex: 1
          }} />

          {/* Active Process Fill (Cumulative Progress) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: hoveredIndex !== null 
                ? `calc(${(hoveredIndex / (steps.length - 1)) * 100}% )` 
                : 0 
            }}
            transition={hoverSpring}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              height: '2px',
              backgroundColor: 'var(--primary)', // Deep Authority (#0F2A44)
              zIndex: 3,
              transformOrigin: 'left'
            }}
          />

          <div className="steps-grid">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                variants={{
                  hidden: { opacity: 0, x: -32 },
                  visible: { opacity: 1, x: 0, transition: entranceSpring }
                }}
                className="step-item"
                style={{
                  // Slight vertical offset for rhythmic flow (steps 2 and 4 drop down)
                  transform: i % 2 === 1 ? 'translateY(32px)' : 'translateY(0)',
                }}
              >
                {/* Node on the rail */}
                <motion.div 
                  animate={{ 
                    scale: hoveredIndex !== null && hoveredIndex >= i ? 1.5 : 1,
                    backgroundColor: hoveredIndex !== null && hoveredIndex >= i ? 'var(--primary)' : '#C9A96E',
                    borderColor: hoveredIndex !== null && hoveredIndex >= i ? 'var(--primary)' : 'transparent',
                  }}
                  transition={hoverSpring}
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '0',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    zIndex: 4,
                    border: '2px solid transparent'
                  }}
                />

                <div style={{ paddingTop: '32px' }}>
                  <motion.div
                    animate={{ 
                      color: hoveredIndex === i ? 'var(--primary)' : '#C9A96E',
                      y: hoveredIndex === i ? -4 : 0
                    }}
                    transition={hoverSpring}
                    style={{
                      fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                      textTransform: 'uppercase', // Monumental All-Caps
                      letterSpacing: '0', // Reset to 0
                      fontSize: '14px',
                      fontWeight: 800,
                      marginBottom: '12px',
                    }}
                  >
                    {step.num}
                  </motion.div>
                  
                  <motion.h3
                    animate={{ x: hoveredIndex === i ? 4 : 0 }}
                    transition={hoverSpring}
                    style={{
                      fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                      textTransform: 'uppercase', // Monumental All-Caps
                      letterSpacing: '0', // Reset to 0
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--sky-blue)', // Component Headline Role
                      margin: 0,
                    }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  <p
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '15px',
                      color: hoveredIndex === i ? '#1F2A33' : 'rgba(31, 42, 51, 0.7)',
                      lineHeight: 1.3,
                      margin: '12px 0 0 0',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        </div>
      </div>

      <style jsx>{`
        .how-we-work-section {
          padding: var(--sp-section) var(--sp-container) 40px var(--sp-container); // Reduced bottom padding
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
          min-height: 280px;
        }

        .step-item {
          position: relative;
          cursor: default;
        }

        @media (max-width: 1024px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 80px 48px;
          }
          .step-item {
            transform: none !important;
          }
        }

        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}
