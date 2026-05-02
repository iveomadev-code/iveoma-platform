'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';

const cinematicSpring = { type: 'spring' as const, stiffness: 60, damping: 18 };

export default function VideoIntervention() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF', // Bottom half color
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Background extension for "Our Approach" (Ice Blue) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'var(--ice-blue)',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          padding: '40px 0 80px 0', // Reduced top gap
          position: 'relative',
        }}>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={cinematicSpring}
            style={{ marginBottom: '40px' }}
          >
            <div className="eyebrow" style={{ color: 'var(--terracotta)', fontWeight: 800 }}>Intervention in Action</div>
            <h2 style={{
              fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 600,
              color: 'var(--primary)',
              lineHeight: 1.1,
              margin: '12px 0 0 0',
              maxWidth: '650px'
            }}>
              Commissioning of the Dr. Nkata Nwani Chuku Medical Center.
            </h2>
          </motion.div>

          {/* Video Holder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...cinematicSpring, delay: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: 'var(--primary)',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(13, 58, 92, 0.15)',
              cursor: 'pointer'
            }}
          >
            {/* YouTube Iframe (Placeholder) */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/KstPQRdahy4?controls=1&modestbranding=1&rel=0"
              title="Blessing and Commissioning of the Dr. Nkata Nwani Chuku Medical Center"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 1,
              }}
            />

            {/* Premium Overlay (Visible before play) */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(13, 58, 92, 0.4) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

            {/* Dynamic Play Button (Visual only if iframe handles click) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              pointerEvents: 'none'
            }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Play fill="#FFFFFF" size={24} />
              </motion.div>
            </div>
          </motion.div>

          {/* Sub-caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '14px',
              color: 'var(--cool-muted)',
              marginTop: '24px',
              maxWidth: '700px',
              lineHeight: 1.5
            }}
          >
            A landmark moment in Veritas University Abuja's healthcare: The official blessing and commissioning of the Dr. Nkata Nwani Chuku Medical Center.
          </motion.p>

        </div>
      </div>
    </section>
  );
}
