'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import Button from './Button';

const cinematicSpring = { type: 'spring' as const, stiffness: 60, damping: 18 };
const entranceSpring  = { type: 'spring' as const, stiffness: 80, damping: 20 };

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        backgroundColor: 'var(--midnight-navy)',
        overflow: 'hidden',
        minHeight: '600px',
        textAlign: 'center' as const,
        display: 'flex',
        alignItems: 'center',
      }}
      className="section-pad"
    >
      <div className="container">
        <div 
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            maxWidth: '1000px', 
            margin: '0 auto', 
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Gold Accent Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'var(--action-gold)', 
              fontWeight: 400,
              marginBottom: '24px',
              letterSpacing: '-0.01em'
            }}
          >
            Your legacy, our mission.
          </motion.div>

          {/* Primary Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.05,
              margin: '0 0 32px 0',
              letterSpacing: '-0.02em',
              maxWidth: '800px'
            }}
          >
            Be the catalyst for sustainable change.
          </motion.h2>

          {/* Narrative Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...entranceSpring, delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.3,
              maxWidth: '720px',
              marginBottom: '48px',
            }}
          >
            The road to resilience is built through collective action. Whether as a donor, volunteer, or advocate, your commitment helps us scale dignity across every community we serve.
          </motion.p>

          {/* Engagement Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...entranceSpring, delay: 0.7 }}
            style={{ 
              display: 'flex', 
              gap: '24px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Button 
              label="Donate Now" 
              href="/funding" 
              variant="primary"
              context="on-dark"
            />
            <Button 
              label="Become a Partner" 
              href="/partner" 
              variant="secondary"
              context="on-dark"
              showIcon={false}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .container {
            padding: 0 var(--sp-container);
          }
        }
      `}</style>
    </section>
  );
}
