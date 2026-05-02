'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

export default function ImpactBanner() {
  const pills = ['Education', 'Digital Access', 'Health Systems', 'Institutional'];

  return (
    <section className="impact-banner-section" style={{ padding: '100px 0 25px 0', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 80px' }} className="container-sp">
        <div className="banner-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto', 
          backgroundColor: 'var(--ice-blue)', 
          border: '1px solid rgba(15, 42, 68, 0.05)',
          borderRadius: '12px',
          overflow: 'hidden',
          alignItems: 'center'
        }}>
          {/* Left Column */}
          <div className="banner-left" style={{ padding: '32px 36px' }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 800, 
              color: 'var(--terracotta)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              display: 'block', 
              marginBottom: '16px' 
            }}>
              Overall impact
            </span>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <h2 className="banner-number" style={{ 
                fontFamily: 'var(--font-numbers)', 
                fontSize: 'clamp(48px, 6vw, 72px)', 
                fontWeight: 800, 
                color: 'var(--midnight-navy)', 
                margin: 0,
                lineHeight: 1
              }}>
                2,000
              </h2>
              <span className="banner-plus" style={{ 
                fontFamily: 'var(--font-numbers)', 
                fontSize: 'clamp(48px, 6vw, 72px)', 
                fontWeight: 800, 
                color: 'var(--terracotta)',
                lineHeight: 1
              }}>+</span>
            </div>

            <p className="banner-text" style={{ 
              fontSize: '16px', 
              lineHeight: 1.6, 
              color: 'var(--midnight-navy)', 
              maxWidth: '680px',
              margin: '0 0 24px 0',
              opacity: 0.8
            }}>
              Vulnerable women — widows and indigent women — stabilised through direct socio-economic palliatives and essential supplies during severe economic lockdowns.
            </p>

            <div className="banner-pills" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {pills.map((pill) => (
                <div 
                  key={pill}
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(15, 42, 68, 0.1)',
                    color: 'rgba(15, 42, 68, 0.5)'
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="banner-right" style={{ 
            padding: '32px 60px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '60px',
            position: 'relative'
          }}>
            {/* Vertical Rule */}
            <div className="banner-divider" style={{ 
              width: '1px', 
              height: '80px', 
              backgroundColor: 'rgba(15, 42, 68, 0.1)'
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <Button 
                label="Explore the evidence"
                href="/impact/evidence"
                variant="primary"
                context="on-light"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .impact-banner-section { padding: 80px 0 25px 0 !important; }
          .container-sp { padding: 0 48px !important; }
          .banner-number, .banner-plus { font-size: clamp(32px, 5vw, 40px) !important; }
          .banner-right { padding: 32px 40px !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .impact-banner-section { padding: 60px 0 20px 0 !important; }
          .container-sp { padding: 0 24px !important; }
          .banner-grid { grid-template-columns: 1fr !important; }
          .banner-left { padding: 28px 24px !important; }
          .banner-number, .banner-plus { font-size: clamp(28px, 8vw, 32px) !important; }
          .banner-text { fontSize: 14px !important; }
          .banner-right {
            padding: 0 24px 32px 24px !important;
            gap: 24px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .banner-divider {
            width: 100% !important;
            height: 1px !important;
          }
        }
      `}</style>
    </section>
  );
}
