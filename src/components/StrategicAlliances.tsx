'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Globe, Users } from 'lucide-react';

const entranceSpring = { type: 'spring' as const, stiffness: 60, damping: 16 };

const alliancePillars = [
  {
    icon: <ShieldCheck size={24} />,
    title: 'Philanthropic Support',
    desc: 'Empowering long-term stability through high-impact, transparent donor financing.'
  },
  {
    icon: <Globe size={24} />,
    title: 'Strategic Alliances',
    desc: 'Co-designing systemic interventions with governments and multi-lateral institutions.'
  },
  {
    icon: <Users size={24} />,
    title: 'Operational Partnership',
    desc: 'Collaborating with on-ground NGOs to scale proven development models.'
  }
];



export default function StrategicAlliances() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderTop: '1px solid var(--ice-blue)',
      }}
      className="section-pad"
    >
      <div className="container">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Header Row */}
          <div className="alliances-header" style={{ display: 'flex', gap: '80px', marginBottom: '80px' }}>
            <motion.div 
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={entranceSpring}
              style={{ flex: '0 0 40%' }}
              className="alliances-title-col"
            >
              <div className="eyebrow" style={{ color: 'var(--terracotta)', fontWeight: 800 }}>Strategic Alliances</div>
              <h2 style={{
                fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 600,
                color: 'var(--primary)',
                lineHeight: 1.1,
                margin: '16px 0 0 0',
                textTransform: 'none',
                letterSpacing: '-0.02em',
              }}>
                A Global Network of Trust.
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ ...entranceSpring, delay: 0.2 }}
              style={{ flex: '1', display: 'flex', alignItems: 'flex-end' }}
              className="alliances-desc-col"
            >
              <p style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '17px',
                color: 'var(--neutral-charcoal)',
                opacity: 0.7,
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: 0
              }}>
                We work with global institutions to bridge the gap between intent and impact—ensuring every collaboration drives sustainable development.
              </p>
            </motion.div>
          </div>



          {/* Partnership Pillars Grid */}
          <div className="pillars-grid">
            {alliancePillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...entranceSpring, delay: 0.4 + (i * 0.1) }}
                className="pillar-card"
              >
                <div className="pillar-icon" style={{ color: 'var(--action-gold)', marginBottom: '24px' }}>
                  {pillar.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '14px',
                  color: 'var(--neutral-charcoal)',
                  opacity: 0.7,
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 40px 0;
          border-top: 1px solid rgba(0,0,0,0.05);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .marquee-content {
          display: flex;
          gap: 100px;
          width: max-content;
          animation: scroll 40s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logo-item {
          font-family: var(--font-heading-monumental), var(--font-heading), serif;
          font-size: 24px;
          font-weight: 800;
          color: rgba(0,0,0,0.15);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .logo-item:hover {
          color: var(--primary);
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 40px;
        }

        .pillar-card {
          padding: 40px;
          background: var(--ice-blue);
          border-radius: 4px;
          transition: transform 0.3s ease;
        }

        .pillar-card:hover {
          transform: translateY(-8px);
        }

        @media (max-width: 1023px) {
          .alliances-header { flex-direction: column; gap: 32px; }
          .alliances-title-col { flex: 0 0 100% !important; }
          .pillars-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </section>
  );
}
