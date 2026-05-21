'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { ArrowRight, ShieldCheck, Globe, Landmark, TrendingUp, HeartHandshake } from 'lucide-react';

const premiumEase = [0.22, 1, 0.36, 1] as any;
const softSpring = { type: "spring" as const, stiffness: 80, damping: 20, mass: 1 };

function SectionLabel({ text, color = "var(--action-gold)", centered = false }: { text: string, color?: string, centered?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: centered ? 0 : -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: centered ? 'center' : 'flex-start', 
        marginBottom: '24px' 
      }}
    >
      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color }}>{text}</span>
    </motion.div>
  );
}

export default function FundingPageClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  
  return (
    <div ref={containerRef} style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <NavBar />

      <section style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        color: '#FFFFFF', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="section-pad hero-section-pad">
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-split-grid">
            <div>
              <SectionLabel text="Fiscal Stewardship" color="var(--terracotta)" />
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: premiumEase }}
                style={{ 
                  fontFamily: 'var(--font-heading-monumental), serif', 
                  fontSize: 'clamp(40px, 8vw, 84px)', 
                  fontWeight: 700, 
                  lineHeight: 0.9, 
                  letterSpacing: '-0.04em',
                  margin: 0
                }}
              >
                <span style={{ color: '#FFFFFF' }}>Capital Deployment</span> <br />
                <span style={{ color: 'var(--terracotta)', fontWeight: 300 }}>for systemic change.</span>
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
              style={{ paddingLeft: '40px', borderLeft: '1px solid rgba(255,255,255,0.15)', marginTop: '48px' }}
              className="hero-descriptor"
            >
              <p style={{ 
                fontSize: '18px', 
                lineHeight: 1.3, 
                color: 'rgba(255,255,255,0.7)', 
                maxWidth: '460px',
                margin: 0
              }}>
                We don't just collect donations; we deploy capital. Our model ensures that every resource is directed toward high-fidelity infrastructure and human capital interventions with radical transparency.
              </p>
              
              <div style={{ display: 'flex', gap: '48px', marginTop: '64px' }} className="hero-stats">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>100%</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Stewardship</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>Direct</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Impact</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. THE STEWARDSHIP PROSPECTUS ─── */}
      <section style={{ backgroundColor: '#F8FAFC' }} className="section-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px, 6vw, 120px)', alignItems: 'center' }} className="prospectus-grid">
            <div>
              <div style={{ width: '48px', height: '3px', backgroundColor: '#B8543B', marginBottom: '32px' }} />
              <h2 style={{ 
                fontFamily: 'var(--font-heading-monumental), serif', 
                fontSize: 'clamp(28px, 5.5vw, 42px)', 
                fontWeight: 700, 
                color: 'var(--primary)', 
                lineHeight: 1.05, 
                marginBottom: '32px' 
              }}>
                The 100% Impact <br />Guarantee.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <StewardshipPillar 
                  icon={<ShieldCheck size={24} />} 
                  title="Radical Accountability" 
                  body="Every project is physically verifiable. We use a zero-dilution model where operational overhead is funded through specific institutional grants, ensuring your direct capital reaches the field."
                />
                <StewardshipPillar 
                  icon={<TrendingUp size={24} />} 
                  title="Outcome-Based Deployment" 
                  body="Funds are allocated to interventions that demonstrate measurable performance in maternal health, digital literacy, and sustainable infrastructure."
                />
              </div>
            </div>
            
            <motion.div 
              style={{ 
                position: 'relative', 
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(15, 42, 68, 0.1)'
              }}
            >
              <img 
                src="/images/stabilization/IMAGE-6472410.jpg" 
                alt="Impact Deployment" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 42, 68, 0.4), transparent)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. FUNDING PROTOCOLS — THE BANK CARDS ─── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 100px' }}>
            <SectionLabel text="Funding Protocols" centered />
            <h2 style={{ 
              fontFamily: 'var(--font-heading-monumental), serif', 
              fontSize: 'clamp(28px, 6vw, 48px)', 
              fontWeight: 700, 
              color: 'var(--primary)', 
              lineHeight: 1.05,
              letterSpacing: '-0.02em'
            }}>
              Direct Institutional Transfers.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="funding-grid">
            {/* Naira Account */}
            <AccountCard 
              label="Local Currency (Naira)"
              bank="Fidelity Bank"
              accountName="Iveoma Development Network"
              accountNumber="5600719672"
              icon={<Landmark size={24} color="#B8543B" />}
              accent="#B8543B"
            />
            
            {/* International Account (Placeholder for Domiciliary/USD) */}
            <AccountCard 
              label="International Transfers (USD)"
              bank="Zenith Bank PLC (USD)"
              accountName="Iveoma Development Network"
              accountNumber="5071194200"
              icon={<Globe size={24} color="#1B5C8E" />}
              accent="#1B5C8E"
              isInternational
              isComingSoon
            />
          </div>

          <div style={{ marginTop: '80px', padding: 'clamp(24px, 4vw, 48px)', backgroundColor: '#F0F5FA', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: 'rgba(15, 42, 68, 0.6)', margin: 0 }}>
              For specific project-based sponsorship or structured partnership agreements, please <a href="/partner#dialogue" className="btn-link on-light" style={{ display: 'inline-flex', padding: 0 }}>Initiate an Institutional Dialogue <ArrowRight size={14} /></a>.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 4. FINAL CTA — COLLABORATION ─── */}
      <section style={{ backgroundColor: 'var(--midnight-navy)', color: '#FFFFFF' }} className="section-pad">
        <div className="container" style={{ textAlign: 'center' }}>
           <HeartHandshake size={48} color="var(--action-gold)" style={{ marginBottom: '40px' }} />
           <h2 style={{ 
             fontFamily: 'var(--font-heading-monumental), serif', 
             fontSize: 'clamp(32px, 7vw, 56px)', 
             fontWeight: 700, 
             background: 'linear-gradient(to right, var(--action-gold), #FFFFFF)',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent',
             lineHeight: 1.05,
             maxWidth: '800px',
             margin: '0 auto 40px'
           }}>
             Beyond capital, <br />we seek collaboration.
           </h2>
           <Button 
             label="Become a Partner"
             href="/partner"
             variant="secondary"
             context="on-dark"
             icon={<ArrowRight size={16} />}
             className="cta-btn-center"
           />
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @media (max-width: 1023px) {
          .prospectus-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .funding-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StewardshipPillar({ icon, title, body }: { icon: React.ReactNode, title: string, body: string }) {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ color: '#B8543B', flexShrink: 0 }}>{icon}</div>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sky-blue)', margin: '0 0 12px' }}>{title}</h3>
        <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: 'rgba(31,42,51,0.7)', margin: 0 }}>{body}</p>
      </div>
    </div>
  );
}

function AccountCard({ label, bank, accountName, accountNumber, icon, accent, isInternational = false, isComingSoon = false }: { label: string, bank: string, accountName: string, accountNumber: string, icon: React.ReactNode, accent: string, isInternational?: boolean, isComingSoon?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={softSpring}
      style={{ 
        padding: 'clamp(24px, 4vw, 64px)', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '16px', 
        border: '1px solid rgba(15, 42, 68, 0.08)',
        boxShadow: '0 20px 40px rgba(15, 42, 68, 0.04)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        minWidth: 0,
        minHeight: '420px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accent, marginBottom: '8px' }}>{label}</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)' }}>{bank}</div>
        </div>
        <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      </div>

      {isComingSoon ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '140px', border: '1px dashed rgba(15, 42, 68, 0.12)', borderRadius: '12px', backgroundColor: '#F8FAFC' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(15, 42, 68, 0.4)' }}>Coming Soon</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(15, 42, 68, 0.4)', marginBottom: '4px' }}>Account Holder</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#0F2A44' }}>{accountName}</div>
          </div>
          
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(15, 42, 68, 0.4)', marginBottom: '4px' }}>Account Number</div>
            <div style={{ 
              fontSize: 'clamp(20px, 5vw, 36px)', 
              fontFamily: 'var(--font-numbers)', 
              fontWeight: 800, 
              color: '#0F2A44', 
              letterSpacing: '0.05em',
              wordBreak: 'break-all',
              lineHeight: 1.1,
            }}>
              {accountNumber}
            </div>
            <button 
              onClick={copyToClipboard}
              style={{ 
                marginTop: '16px',
                background: 'none', 
                border: 'none', 
                color: copied ? '#10B981' : '#579DD5', 
                fontSize: '11px', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: 0
              }}
            >
              {copied ? '✓ Copied' : 'Copy Number'}
            </button>
          </div>
        </div>
      )}

      {isInternational && !isComingSoon && (
        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(15, 42, 68, 0.05)', fontSize: '13px', color: 'rgba(15, 42, 68, 0.5)', lineHeight: 1.5 }}>
          Contact us for SWIFT/BIC codes and correspondent bank details for international wire transfers.
        </div>
      )}
    </motion.div>
  );
}
