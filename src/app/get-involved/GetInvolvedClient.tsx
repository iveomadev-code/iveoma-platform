'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ArrowRight, Mail, MapPin, Send } from 'lucide-react';
import Button from '@/components/Button';

const springConfig = { type: 'spring' as const, stiffness: 80, damping: 20 };
const premiumEase = [0.22, 1, 0.36, 1] as const;

function SectionLabel({ text, color = "#B8543B", centered = false }: { text: string, color?: string, centered?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: centered ? 0 : -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: centered ? 'center' : 'flex-start', 
        marginBottom: '32px' 
      }}
    >
      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color }}>{text}</span>
    </motion.div>
  );
}

const pillars = [
  {
    index: '01',
    title: 'Strategic Partnerships',
    body: 'Align with our institutional framework to scale proven interventions across regional boundaries and systemic domains. We do not accept passive sponsorship — we build operational co-investment.',
    stat: '9+',
    statLabel: 'Years of structured operations',
  },
  {
    index: '02',
    title: 'Technical Collaboration',
    body: 'Deploy expertise and operational resources to enhance the fidelity of our infrastructure projects. From digital hub architecture to clinical facility commissioning — we need technical operators, not observers.',
    stat: '2000+',
    statLabel: 'Direct beneficiaries engaged',
  },
  {
    index: '03',
    title: 'Capital Mobilisation',
    body: 'Target specific systemic bottlenecks with structured funding models built for permanence, not cycles. Capital deployed here builds physical infrastructure and institutional systems that outlast the investment.',
    stat: '4',
    statLabel: 'Flagship interventions delivered',
  },
];

export default function GetInvolvedClient() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  return (
    <div ref={containerRef} style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <NavBar />

      {/* ─── 1. HERO — INSTITUTIONAL ENGAGEMENT ─── */}
      <section style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        color: '#FFFFFF', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="section-pad hero-section-pad">
        {/* Background Image Layer with Parallax & Overlay Blend */}
        <motion.div 
          style={{ 
            position: 'absolute', 
            inset: '-60px', 
            zIndex: 1,
            backgroundImage: 'url("/images/partnership_cinematic_office.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            filter: 'grayscale(1) contrast(1.2) brightness(0.8)',
            mixBlendMode: 'overlay',
            opacity: 0.4,
          }}
          animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--sp-container)', position: 'relative', zIndex: 10 }}>
          <div className="hero-split-grid">
            <div>
              <SectionLabel text="Collaboration" color="var(--terracotta)" />
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
                Collaborating with global strategic stakeholders to scale high-impact infrastructure and human capital development across rural Nigeria.
              </p>
              
              <div style={{ display: 'flex', gap: '48px', marginTop: '64px' }} className="hero-stats">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>12+</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Strategic Partners</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>Unlimited</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Human Potential</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. ENGAGEMENT PILLARS — Alternating editorial splits ─── */}
      <section style={{ padding: '160px 80px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {pillars.map((pillar, i) => {
            const isReverse = i % 2 !== 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ ...springConfig, delay: 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '80px',
                  alignItems: 'center',
                  paddingBottom: i < pillars.length - 1 ? '120px' : '0',
                  borderBottom: i < pillars.length - 1 ? '1px solid rgba(27, 92, 142, 0.06)' : 'none',
                  marginBottom: i < pillars.length - 1 ? '120px' : '0',
                  direction: isReverse ? 'rtl' : 'ltr',
                }}
              >
                {/* Text side */}
                <div style={{ direction: 'ltr' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#B8543B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
                    {pillar.index}
                  </div>
                  <h2 style={{ 
                    fontFamily: 'var(--font-heading-monumental), sans-serif', 
                    fontSize: 'clamp(32px, 4vw, 52px)', 
                    fontWeight: 700, 
                    color: 'var(--primary)', 
                    marginBottom: '32px',
                    lineHeight: 1.05,
                    letterSpacing: '-0.01em'
                  }}>
                    {pillar.title}
                  </h2>
                  <p style={{ 
                    fontSize: '18px', 
                    lineHeight: 1.3, 
                    color: 'rgba(31,42,51,0.72)',
                    marginBottom: '48px',
                    maxWidth: '500px'
                  }}>
                    {pillar.body}
                  </p>
                  <Link
                    href="#dialogue"
                    className="btn-link on-light"
                    style={{
                      marginTop: '12px',
                      padding: 0,
                      display: 'inline-flex'
                    }}
                  >
                    Explore Partnership <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Data pullout side */}
                <div style={{ direction: 'ltr', display: 'flex', alignItems: 'center', justifyContent: isReverse ? 'flex-start' : 'flex-end' }}>
                  <div style={{ 
                    padding: '64px',
                    backgroundColor: '#F0F5FA',
                    borderRadius: '4px',
                    width: '100%',
                    maxWidth: '360px'
                  }}>
                    <div style={{ 
                      fontFamily: 'var(--font-heading-monumental), sans-serif',
                      fontSize: '80px',
                      fontWeight: 700,
                      color: '#1B5C8E',
                      lineHeight: 1,
                      marginBottom: '16px',
                      letterSpacing: '-0.03em'
                    }}>
                      {pillar.stat}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'rgba(31,42,51,0.5)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      lineHeight: 1.3
                    }}>
                      {pillar.statLabel}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 4. INQUIRY FORM ─── */}
      <section style={{ 
        padding: '200px 80px', 
        backgroundColor: '#F0F5FA', 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '120px', alignItems: 'start' }}>
          <div>
            <SectionLabel text="The Inquiry" />
            <h2 style={{ 
              fontFamily: 'var(--font-heading-monumental), sans-serif', 
              fontSize: 'clamp(36px, 4vw, 56px)', 
              fontWeight: 700, 
              color: 'var(--primary)', 
              marginBottom: '48px',
              lineHeight: 1.0,
              letterSpacing: '-0.02em'
            }}>
              Start an<br />institutional<br />dialogue.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <Mail size={18} color="#B8543B" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(31,42,51,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Email</div>
                  <div style={{ fontSize: '16px', color: '#1B5C8E', fontWeight: 600 }}>partner@iveomadevelopmentnetwork.org</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <MapPin size={18} color="#B8543B" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(31,42,51,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Location</div>
                  <div style={{ fontSize: '16px', color: '#1B5C8E', fontWeight: 600 }}>Okposi-Okwu, Ebonyi State</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: premiumEase }}
            style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '64px', 
              borderRadius: '4px', 
              boxShadow: '0 32px 64px rgba(13, 58, 92, 0.06)' 
            }}
          >
            <form style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <SeamlessField label="Full Name" placeholder="Institutional Representative" />
                <SeamlessField label="Organisation" placeholder="Institution Name" />
              </div>
              <SeamlessField label="Email Address" placeholder="representative@institution.org" type="email" />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#7AA3BE', letterSpacing: '0.1em' }}>Area of Engagement</label>
                <select className="seamless-select-involved">
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
                  label="Submit Inquiry"
                  type="submit"
                  variant="primary"
                  context="on-light"
                  icon={<ArrowRight size={18} />}
                />
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      <style jsx global>{`
        .seamless-input-involved:focus + .seamless-border-involved {
          height: 2px;
          background-color: var(--terracotta);
        }
        .seamless-input-involved::placeholder {
          color: rgba(15, 42, 68, 0.2);
        }
        .seamless-select-involved {
          padding: 16px 0;
          border: none;
          font-size: 18px;
          color: #1B5C8E;
          background: none;
          cursor: pointer;
          width: 100%;
          outline: none;
          appearance: none;
        }
        @media (max-width: 991px) {
          .funding-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
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
          className="seamless-input-involved"
          style={{ padding: '16px 0', border: 'none', fontSize: '18px', color: '#1B5C8E', outline: 'none', background: 'none', resize: 'none', width: '100%' }} 
        />
      ) : (
        <input 
          type={type} 
          placeholder={placeholder} 
          className="seamless-input-involved"
          style={{ padding: '16px 0', border: 'none', fontSize: '18px', color: '#1B5C8E', outline: 'none', background: 'none', width: '100%' }} 
        />
      )}
      <div className="seamless-border-involved" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)', transition: 'all 0.4s ease' }} />

    </div>
  );
}

