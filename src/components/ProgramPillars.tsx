'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Heart, Users, Sprout, ArrowRight } from 'lucide-react';

const entranceSpring = { type: 'spring' as const, stiffness: 80, damping: 20 };
const hoverSpring    = { type: 'spring' as const, stiffness: 300, damping: 22 };

import Link from 'next/link';

const pillars = [
  {
    num: '01',
    id: 'education',
    icon: BookOpen,
    title: 'Education & Literacy',
    desc: 'Access to quality education, scholarships, school infrastructure, and girl-child retention across underserved communities.',
  },
  {
    num: '02',
    id: 'health',
    icon: Heart,
    title: 'Health Systems',
    desc: 'Community health outreach, maternal and child health, disease prevention, and mental health awareness programmes.',
  },
  {
    num: '03',
    id: 'youth',
    icon: Users,
    title: 'Women & Youth',
    desc: 'Vocational training, entrepreneurship pathways, leadership development, and civic participation for women and young people.',
  },
  {
    num: '04',
    id: 'rural',
    icon: Sprout,
    title: 'Rural Development',
    desc: 'Infrastructure projects, agricultural livelihoods, environmental awareness, and community mobilisation across Ebonyi State.',
  },
];

interface PillarItemProps {
  pillar: typeof pillars[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function PillarItem({ pillar, index, isHovered, onHover, onLeave }: PillarItemProps) {
  return (
    <Link 
      href={`/programmes#${pillar.id}`}
      style={{ textDecoration: 'none' }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -24 },
          visible: { opacity: 1, x: 0, transition: entranceSpring },
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={`pillar-item pillar-item-${index}`}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '24px 0',
          cursor: 'pointer',
          borderBottom: index === pillars.length - 1 ? 'none' : '1px solid rgba(15, 42, 68,0.1)', // Deep Authority divider
        }}
      >
        {/* Number Pillar */}
        <div
          style={{
            fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
            textTransform: 'uppercase', // Monumental All-Caps
            letterSpacing: '0', // Reset to 0
            fontSize: '11px',
            fontWeight: 800,
            color: isHovered ? '#C9A96E' : 'rgba(15, 42, 68,0.3)',
            transition: 'color 0.3s ease',
            width: '60px',
            flexShrink: 0
          }}
        >
          {pillar.num}
        </div>

        {/* Icon Pillar */}
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 15 : 0
          }}
          transition={hoverSpring}
          style={{ 
            color: isHovered ? 'var(--primary)' : '#C9A96E', 
            width: '80px',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <pillar.icon size={16} strokeWidth={1.5} />
        </motion.div>

        {/* Title Pillar */}
        <motion.h3
          animate={{ x: isHovered ? 20 : 0 }}
          transition={hoverSpring}
          style={{
            fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
            textTransform: 'uppercase', // Monumental All-Caps
            fontSize: 'clamp(14px, 1.5vw, 22px)',
            fontWeight: 800,
            color: 'var(--sky-blue)', // Component Headline Role
            margin: 0,
            flex: 1,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {pillar.title}
        </motion.h3>

        {/* Arrow Reveal */}
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -20
          }}
          transition={hoverSpring}
          style={{ color: '#C9A96E' }}
        >
          <ArrowRight size={20} strokeWidth={1} />
        </motion.div>

        {/* Shimmer Line Overlay */}
        <motion.div
          animate={{ 
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: "circOut" }}
          style={{
            height: '2px',
            backgroundColor: 'var(--muted-gold)',
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            right: 0,
            transformOrigin: 'left',
            zIndex: 2,
          }}
        />
      </motion.div>
    </Link>
  );
}

export default function ProgramPillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--ice-blue)',
      }}
      className="section-pad"
    >
      <div className="container">
        <div className="pillars-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={entranceSpring}
          style={{ 
            marginBottom: 'var(--sp-inner-gap)', 
            textAlign: 'left',
          }}
        >
          <div style={{ 
            fontFamily: 'var(--font-accent), sans-serif', 
            fontSize: '14px', 
            fontWeight: 800, 
            color: 'var(--terracotta)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.25em',
            marginBottom: '16px'
          }}>
            Focus Areas
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 600,
              color: 'var(--primary)',
              maxWidth: '700px',
              lineHeight: 1.05,
              textTransform: 'none',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Four Pillars.<br />One Mission.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '16px',
              color: 'var(--neutral-charcoal)',
              opacity: 0.8,
              marginTop: '24px',
              maxWidth: '420px',
              lineHeight: 1.3,
            }}
          >
            Our interconnected approach ensures that targeted interventions across health, education, and economic empowerment work together to build resilient, self-sustaining communities.
          </p>
        </motion.div>

        {/* Vertical List Layout */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '1px solid rgba(15, 42, 68,0.1)',
          }}
          className="pillars-list"
        >
          {pillars.map((pillar, i) => (
            <PillarItem
              key={pillar.num}
              pillar={pillar}
              index={i}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </motion.div>
        </div>
      </div>

      <style jsx>{`
        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: flex-start;
        }
        @media (max-width: 1023px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}
