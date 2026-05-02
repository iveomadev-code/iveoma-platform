'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { ArrowRight, ShieldCheck, Landmark, UsersRound, Mail } from 'lucide-react';

const premiumEase = [0.22, 1, 0.36, 1] as any;
const softSpring = { type: "spring" as const, stiffness: 80, damping: 20, mass: 1 };

/* ─── Shared Components ─── */
function SectionLabel({ text, color = "var(--terracotta)", centered = false }: { text: string, color?: string, centered?: boolean }) {
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

function ArrowCircle({ size = 36 }: { size?: number }) {
  return (
    <div className="arrow-circle" style={{ 
      width: size, 
      height: size, 
      borderRadius: '50%', 
      border: '1px solid rgba(15, 42, 68, 0.15)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      color: '#0F2A44'
    }}>
      <ArrowRight size={16} />
    </div>
  );
}

function CustomTag({ text, isDark = false }: { text: string, isDark?: boolean }) {
  return (
    <span style={{ 
      fontSize: '9px', 
      fontWeight: 700,
      textTransform: 'uppercase', 
      letterSpacing: '0.18em', 
      padding: '5px 10px',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(15, 42, 68, 0.08)',
      borderRadius: '2px',
      color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15, 42, 68, 0.5)',
      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
      transition: 'all 0.3s ease'
    }}>
      {text}
    </span>
  );
}

export default function PartnerPageClient() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <NavBar />

      {/* ─── 1. HERO — FISCAL AUTHORITY ─── */}
      <section style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        color: '#FFFFFF', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="section-pad hero-section-pad">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--sp-container)', position: 'relative', zIndex: 10 }}>
          <div className="hero-split-grid">
            <div>
              <SectionLabel text="Partnership" color="var(--terracotta)" />
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
                <span style={{ color: '#FFFFFF' }}>Global Partnership.</span> <br />
                <span style={{ color: 'var(--terracotta)', fontWeight: 300 }}>Local Agency.</span>
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
                We do not accept passive sponsorship — we build operational co-investment with partners who share our commitment to systemic, traceable change across underserved communities.
              </p>
              
              <div style={{ display: 'flex', gap: '48px', marginTop: '64px' }} className="hero-stats">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>3</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Engagement Tiers</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>20+</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Operational Years</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. PARTNERSHIP TYPE CARDS ─── */}
      <section style={{ padding: '160px 0', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ marginBottom: '80px' }}>
            <SectionLabel text="How we work together" color="var(--terracotta)" />
            <h2 style={{ 
              fontFamily: 'var(--font-heading-monumental), serif', 
              fontSize: '52px', 
              fontWeight: 700, 
              color: 'var(--primary)', 
              lineHeight: 1.05,
              letterSpacing: '-0.03em'
            }}>
              Three ways to partner.
            </h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid rgba(15, 42, 68, 0.1)',
              borderBottom: '1px solid rgba(15, 42, 68, 0.1)'
            }}
            className="partnership-horizontal-grid"
          >
             {/* Card 01 — Featured (Dark) */}
             <PartnershipCard 
                label="Strategic"
                title="Strategic Partnership"
                desc="Align with our institutional framework to scale proven interventions across regional boundaries and systemic domains. We build long-term co-investment — not one-off grants."
                tags={["NGOs & Foundations", "Government agencies", "Multilateral bodies"]}
                isDark
             />
             
             {/* Card 02 */}
             <PartnershipCard 
                label="Technical"
                title="Technical Collaboration"
                desc="Deploy expertise and operational resources to enhance the fidelity of our infrastructure projects — from digital hub architecture to clinical facility commissioning."
                tags={["Technical firms", "Health organisations", "Education specialists"]}
             />

             {/* Card 03 */}
             <PartnershipCard 
                label="Capital"
                title="Capital Mobilisation"
                desc="Target specific systemic bottlenecks with structured funding. Capital deployed here builds physical infrastructure that outlasts the investment."
                tags={["Private sector", "Impact investors", "Nigerian businesses"]}
             />
          </motion.div>
        </div>
      </section>

      {/* ─── 3. BOOK AN INSTITUTIONAL DIALOGUE ─── */}
      <section id="dialogue" style={{ padding: '200px 0', backgroundColor: '#F0F5FA', color: '#0F2A44' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '120px', alignItems: 'start' }} className="dialogue-grid">
            <div>
              <SectionLabel text="Start the conversation" color="var(--terracotta)" />
              <h2 style={{ 
                fontFamily: 'var(--font-heading-monumental), serif', 
                fontSize: '56px', 
                fontWeight: 700, 
                color: 'var(--primary)', 
                lineHeight: 1.05,
                marginBottom: '40px',
                letterSpacing: '-0.03em'
              }}>
                Book an institutional <br />dialogue.
              </h2>
              <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.6)', maxWidth: '480px', marginBottom: '64px' }}>
                Submit your interest and we will schedule a structured conversation with our partnership team. We respond to every serious inquiry within 48 hours.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(15, 42, 68, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mail size={18} color="var(--terracotta)" />
                   </div>
                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#0F2A44' }}>partner@iveomadevelopmentnetwork.org</span>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <form style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <SeamlessField label="Full Name" placeholder="Institutional Representative" />
                  <SeamlessField label="Organisation" placeholder="Institution Name" />
                </div>
                <SeamlessField label="Institutional Email" placeholder="representative@institution.org" type="email" />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#7AA3BE', letterSpacing: '0.1em' }}>Area of Engagement</label>
                  <select className="seamless-select-partner">
                    <option>Strategic Partnership</option>
                    <option>Technical Collaboration</option>
                    <option>Capital Mobilisation</option>
                    <option>General Inquiry</option>
                  </select>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)' }} />
                </div>

                <SeamlessField label="Institutional Objective" placeholder="Describe the scope of your intended partnership." isTextarea />
                
                <div style={{ marginTop: '20px' }}>
                  <Button 
                    label="Initiate Dialogue"
                    type="submit"
                    variant="primary"
                    context="on-light"
                    icon={<ArrowRight size={18} />}
                  />
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @media (max-width: 991px) {
          .partnership-horizontal-grid { grid-template-columns: 1fr !important; }
          .partnership-card { border-right: none !important; border-bottom: 1px solid rgba(15, 42, 68, 0.1) !important; padding: 48px !important; }
          .grid-3, .dialogue-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-descriptor { border-left: none !important; padding-left: 0 !important; margin-top: 32px !important; }
        }

        .seamless-input-partner:focus + .seamless-border-partner {
          height: 2px;
          background-color: var(--terracotta);
        }
        .seamless-input-partner::placeholder {
          color: rgba(15, 42, 68, 0.2);
        }
        .seamless-select-partner {
          padding: 16px 0;
          border: none;
          font-size: 18px;
          color: #0F2A44;
          background: none;
          cursor: pointer;
          width: 100%;
          outline: none;
          appearance: none;
        }
      `}</style>
    </div>
  );
}

function PartnershipCard({ label, title, desc, tags, isDark = false }: { label: string, title: string, desc: string, tags: string[], isDark?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: isHovered ? '#F8FAFC' : 'transparent', 
        color: '#0F2A44',
        padding: '64px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid rgba(15, 42, 68, 0.1)',
        zIndex: isHovered ? 10 : 1,
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      className="partnership-card"
    >
      {/* Subtle Background Watermark for Featured Card (01) */}
      {isDark && (
        <motion.img 
          src="/images/target.svg" 
          alt="" 
          style={{ 
            position: 'absolute', 
            right: '-10%', 
            top: '20%', 
            width: '300px', 
            height: '300px', 
            opacity: 0.04, 
            pointerEvents: 'none',
          }} 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ 
          fontSize: '10px', 
          fontWeight: 700, 
          color: (isHovered || isDark) ? 'var(--terracotta)' : 'rgba(15, 42, 68, 0.4)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'color 0.4s ease'
        }}>
          <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--terracotta)', opacity: (isHovered || isDark) ? 1 : 0.2, transition: 'all 0.4s ease' }} />
          {label}
        </div>
        <h3 style={{ 
          fontFamily: 'var(--font-heading-monumental), serif', 
          fontSize: '28px', 
          fontWeight: 700, 
          color: 'var(--sky-blue)',
          marginBottom: '20px', 
          lineHeight: 1.2,
          letterSpacing: '-0.01em'
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: '16px', 
          lineHeight: 1.3, 
          opacity: 0.7, 
          marginBottom: '32px', 
          color: '#1F2A33' 
        }}>
          {desc}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map((tag, i) => <CustomTag key={i} text={tag} isDark={false} />)}
        </div>
      </div>
    </motion.div>
  );
}

function CapabilityCard({ title, body }: { title: string, body: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(184, 84, 59, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
        <ShieldCheck size={18} color="var(--terracotta)" />
      </div>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F2A44', margin: '0 0 16px', lineHeight: 1.3 }}>{title}</h3>
        <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: 'rgba(31,42,51,0.7)', margin: 0 }}>{body}</p>
      </div>
    </div>
  );
}

function SeamlessField({ label, placeholder, type = "text", isTextarea = false }: { label: string, placeholder: string, type?: string, isTextarea?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
      <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#7AA3BE', letterSpacing: '0.1em' }}>{label}</label>
      {isTextarea ? (
        <textarea 
          rows={4} 
          placeholder={placeholder} 
          className="seamless-input-partner"
          style={{ padding: '16px 0', border: 'none', fontSize: '18px', color: '#0F2A44', outline: 'none', background: 'none', resize: 'none', width: '100%' }} 
        />
      ) : (
        <input 
          type={type} 
          placeholder={placeholder} 
          className="seamless-input-partner"
          style={{ padding: '16px 0', border: 'none', fontSize: '18px', color: '#0F2A44', outline: 'none', background: 'none', width: '100%' }} 
        />
      )}
      <div className="seamless-border-partner" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)', transition: 'all 0.4s ease' }} />

    </div>
  );
}


