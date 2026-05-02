'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, animate, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Globe, Zap, Network } from 'lucide-react';
import Button from '@/components/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import Navigation from '@/components/NavBar';
import Footer from '@/components/Footer';

const premiumEase = [0.22, 1, 0.36, 1];
const heroSpring = { type: 'spring' as const, stiffness: 60, damping: 18 };
const entranceSpring = { type: 'spring' as const, stiffness: 80, damping: 20 };

const pillarsData = [
  {
    id: "youth",
    number: "01",
    title: "Digital Skills & Community ICT Access",
    eyebrow: "Technology",
    desc: "We provide structured ICT training and high-speed digital access to youth in rural communities, bridging the gap between local talent and global digital opportunities.",
    image: "/digital_skills_community.jpg",
    stat: "1 High-Tech Hub",
    ops: ["ICT Literacy Training", "CBT Examination Preparation", "24-Hour Internet & Virtual Lectures"],
    ctaTitle: "Support Digital Inclusion",
    ctaSub: "Help build the infrastructure required for the future of rural youth.",
    ctaLabel: "Partner with Us",
    ctaHref: "/partner#dialogue"
  },
  {
    id: "education",
    number: "02",
    title: "Educational Infrastructure & Performance",
    eyebrow: "Education",
    desc: "Restoring learning environments and supporting student performance through infrastructure upgrades and fee sponsorship schemes for underserved secondary schools.",
    image: "/educational_infrastructure_ebonyi.jpeg",
    stat: "8 Schools",
    ops: ["Infrastructure Rehabilitation", "WAEC Exam Sponsorships", "Literacy Resource Distribution"],
    ctaTitle: "Enhance Learning Access",
    ctaSub: "Empower the next generation of leaders through stable academic foundations.",
    ctaLabel: "Support Schools",
    ctaHref: "/partner#dialogue"
  },
  {
    id: "health",
    number: "03",
    title: "Health Systems Strengthening",
    eyebrow: "Healthcare",
    desc: "Developing specialized healthcare assets and equipping clinics with critical medical infrastructure to improve service delivery and emergency resilience in remote settings.",
    image: "/dr_nkata_medical_centre.jpeg",
    stat: "7 Hospitals",
    ops: ["Clinical Equipment Procurement", "PPE Distribution", "Tertiary Medical Infrastructure"],
    ctaTitle: "Strengthen Health Assets",
    ctaSub: "Deliver life-saving medical resources to where they are needed most.",
    ctaLabel: "Learn More",
    ctaHref: "/partner#dialogue"
  },
  {
    id: "rural",
    number: "04",
    title: "Crisis Response & Resilience",
    eyebrow: "Resilience",
    desc: "Deploying rapid, traceable relief and sanitation infrastructure to protect lives and maintain socio-economic stability during sudden health or economic shocks.",
    image: "/crisis_response_new.jpg",
    stat: "2,000+ Reached",
    ops: ["Rapid Food Distribution", "Sanitation Infrastructure", "Socio-Economic Stabilization"],
    ctaTitle: "Mobilize Relief",
    ctaSub: "Join our rapid response team to support immediate community stabilization.",
    ctaLabel: "Contribute",
    ctaHref: "/get-involved"
  }
];

function ArrowIcon({ size = 16, style = {}, className = "", rotate = 0, color = "currentColor" }: { size?: number, style?: React.CSSProperties, className?: string, rotate?: number, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        transform: `rotate(${rotate}deg)`,
        transition: 'transform 0.3s ease',
        ...style
      }}
      className={className}
    >
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
    </svg>
  );
}

function SectionLabel({ text, color = "#B8543B", centered = false, light = false }: { text: string, color?: string, centered?: boolean, light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: centered ? 0 : -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: centered ? 'center' : 'flex-start', marginBottom: '24px' }}
    >
      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: light ? 'rgba(255,255,255,0.6)' : color }}>{text}</span>
    </motion.div>
  );
}

export default function ProgrammesPageClient() {
  const containerRef = useRef(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const activePillar = pillarsData[activePillarIndex];

  // Hash-based selection
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const index = pillarsData.findIndex(p => p.id === hash);
        if (index !== -1) {
          setActivePillarIndex(index);
          // Scroll to the pillars section if we're coming from another page
          const target = document.getElementById('pillar-selection');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Resize Listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroInsights = [
    { value: '04', label: 'Strategic Pillars', delay: 0.6 },
    { value: '100%', label: 'Traceable Impact', delay: 0.8 },
  ];
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const shouldReduceMotion = useReducedMotion();

  return (
    <main
      ref={containerRef}
      style={{
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(201,169,110,0.04), transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(15, 42, 68,0.04), transparent 50%)
        `
      }}
    >
      <Navigation />

      {/* ─── 1. HERO — INSTITUTIONAL STRATEGY ─── */}
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
            backgroundImage: 'url("/crisis_response_new.jpg")',
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
              <SectionLabel text="Operational Focus" color="var(--terracotta)" />
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
                <span style={{ color: '#FFFFFF' }}>Strategic Focus.</span> <br />
                <span style={{ color: 'var(--terracotta)', fontWeight: 300 }}>Systemic Impact.</span>
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
                Engineering high-impact frameworks for systemic resilience in underserved communities through four targeted strategic pillars.
              </p>
              
              <div style={{ display: 'flex', gap: '48px', marginTop: '64px' }} className="hero-stats">
                {heroInsights.map((insight, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>{insight.value}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>{insight.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section 
        id="pillar-selection"
        style={{ 
          padding: '150px 0', 
          backgroundColor: '#FFFFFF', 
          position: 'relative'
        }} aria-label="Programme pillars">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
          
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-heading-monumental)', 
              fontSize: 'clamp(36px, 4.5vw, 54px)', 
              fontWeight: 700, 
              color: 'var(--primary)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em'
            }}>
              The Four Strategic Pillars
            </h2>
          </div>
 
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '20px', 
            marginBottom: '40px'
          }} className="pillar-static-grid">
            {pillarsData.map((pillar, index) => (
              <motion.div
                key={index}
                id={pillar.id}
                onClick={() => setActivePillarIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  borderRadius: '4px', 
                  border: 'none', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  backgroundColor: 'var(--midnight-navy)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '32px'
                }}
              >
                {/* Background Image Layer with Chromacity Transition & Zoom */}
                <motion.div
                  animate={{ 
                    filter: (activePillarIndex === index || hoveredIndex === index) ? 'grayscale(0%)' : 'grayscale(100%)', 
                    opacity: (activePillarIndex === index || hoveredIndex === index) ? 1 : 0.6,
                    scale: hoveredIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6, ease: premiumEase }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${pillar.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                  }}
                />

                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 42, 68, 0.95) 0%, rgba(15, 42, 68, 0.3) 60%, transparent 100%)',
                  zIndex: 1
                }} />

                {/* ID Header - Subtle Overlay */}
                <div style={{ 
                  position: 'absolute', 
                  top: '24px', 
                  left: '24px',
                  fontFamily: 'var(--font-numbers), serif', 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  lineHeight: 1, 
                  color: 'rgba(255,255,255,0.2)',
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  {pillar.number}
                </div>

                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={{ 
                    fontFamily: 'var(--font-heading-monumental)', 
                    fontSize: '15px', 
                    fontWeight: 700, 
                    lineHeight: 1.2, 
                    color: '#FFFFFF',
                    maxWidth: '140px'
                  }}>
                    {pillar.title}
                  </div>
                  <div style={{ 
                    marginTop: '12px',
                    width: activePillarIndex === index ? '32px' : '0',
                    height: '2px',
                    backgroundColor: 'var(--terracotta)',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillarIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{ 
                marginTop: '40px',
                paddingTop: '60px',
                borderTop: '1px solid rgba(15, 42, 68, 0.08)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', minHeight: '440px' }} className="pillar-detail-grid">
                
                {/* Left: Narrative Content */}
                <div style={{ padding: '0' }}>
                  <p style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    letterSpacing: '0.2em', 
                    textTransform: 'uppercase', 
                    color: 'var(--terracotta)', 
                    marginBottom: '16px' 
                  }}>
                    {activePillar.eyebrow}
                  </p>
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading-monumental)', 
                    fontSize: '34px', 
                    fontWeight: 700, 
                    lineHeight: 1.1, 
                    color: 'var(--primary)',
                    marginBottom: '32px',
                    letterSpacing: '-0.02em',
                    display: 'inline-block'
                  }}>
                    {activePillar.title}
                  </h3>
                  <p style={{ 
                    fontSize: '18px', 
                    color: '#2A2F3A', 
                    lineHeight: 1.3, 
                    fontWeight: 400, 
                    marginBottom: '48px',
                    maxWidth: '520px'
                  }}>
                    {activePillar.desc}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px', 
                    marginBottom: '56px', 
                    padding: '32px', 
                    background: 'var(--ice-blue)', 
                    borderRadius: '4px'
                  }}>
                    <div style={{ 
                      fontFamily: 'var(--font-numbers), serif', 
                      fontSize: '32px', 
                      fontWeight: 800, 
                      color: 'var(--terracotta)',
                      lineHeight: 0.9
                    }}>
                      {activePillar.stat}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      fontWeight: 600, 
                      color: 'rgba(15, 42, 68, 0.5)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.12em',
                      lineHeight: 1.3
                    }}>
                      Documented<br />Programme Impact
                    </div>
                  </div>

                  <p style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase', 
                    color: 'rgba(15, 42, 68, 0.4)', 
                    marginBottom: '24px' 
                  }}>
                    Operational Components
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {activePillar.ops.map((op, i) => (
                      <div key={i} style={{ 
                        padding: '12px 0', 
                        borderBottom: i === activePillar.ops.length - 1 ? 'none' : '1px solid rgba(15, 42, 68, 0.06)' 
                      }}>
                        <span style={{ fontSize: '15px', color: 'var(--midnight-navy)', fontWeight: 500, lineHeight: 1.3 }}>
                          {op}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Field Asset + CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div style={{ 
                    flex: 1,
                    borderRadius: '4px', 
                    backgroundImage: `url(${activePillar.image})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    minHeight: '300px'
                  }} />
                  
                  <div style={{ 
                    background: 'var(--midnight-navy)', 
                    borderRadius: '4px', 
                    padding: '40px',
                    color: '#FFFFFF'
                  }}>
                    <h4 style={{ 
                      fontFamily: 'var(--font-heading-monumental)',
                      fontSize: '22px', 
                      fontWeight: 600, 
                      lineHeight: 1.3, 
                      marginBottom: '12px',
                      color: '#FFFFFF'
                    }}>
                      {activePillar.ctaTitle}
                    </h4>
                    <p style={{ 
                      fontSize: '14px', 
                      color: 'rgba(255, 255, 255, 0.4)', 
                      fontWeight: 400, 
                      marginBottom: '32px', 
                      lineHeight: 1.6 
                    }}>
                      {activePillar.ctaSub}
                    </p>
                    <Button 
                      label={activePillar.ctaLabel}
                      href={activePillar.ctaHref}
                      variant="primary"
                      context="on-dark"
                      className="w-full-btn"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      <section style={{
        backgroundColor: 'var(--ice-blue)',
        padding: '150px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Institutional Watermark Backdrop */}
        <div style={{
          position: 'absolute',
          left: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '600px',
          height: '600px',
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <img src="/images/target.svg" alt="" style={{ width: '100%', height: '100%', filter: 'invert(1)' }} />
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '70px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SectionLabel text="Operational Protocol" color="var(--terracotta)" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: premiumEase }}
              style={{
                fontFamily: 'var(--font-heading-monumental), sans-serif',
                fontSize: 'clamp(40px, 5.5vw, 76px)',
                fontWeight: 800,
                color: 'var(--primary)',
                lineHeight: 1.05,
                margin: '32px 0 0',
                letterSpacing: '-0.04em'
              }}
            >
              Engineering <span style={{ color: 'var(--terracotta)' }}>Success.</span>
            </motion.h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '80px',
            position: 'relative'
          }} className="protocol-row">
            
            {/* Seamless Connector Line (Desktop Only) */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: '7px', // Align with middle of number
                left: '20px',
                right: '20px',
                height: '1px',
                background: 'rgba(184, 84, 59, 0.15)',
                zIndex: 1
              }} />
            )}

            {[
              {
                id: "01",
                title: "Institutional Technocracy",
                desc: "We apply global standards to rural development, utilizing data-driven assessments and rigorous accountability metrics to ensure every dollar translates into a verifiable community asset."
              },
              {
                id: "02",
                title: "Operational Rigor",
                desc: "Implementation is governed by disciplined project management and local coordination. We build with the intent to sustain, ensuring that facilities remain functional for decades."
              },
              {
                id: "03",
                title: "Systemic Integration",
                desc: "We do not work in isolation. Our model integrates with local community structures and cultural protocols, creating the social capital necessary for true project ownership."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: premiumEase }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  zIndex: 2
                }}
              >
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'var(--terracotta)',
                  boxShadow: '0 0 0 8px rgba(184, 84, 59, 0.1)',
                  marginBottom: '8px'
                }} />

                <div style={{
                  fontFamily: 'var(--font-numbers), serif',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: 'var(--terracotta)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  lineHeight: 1
                }}>
                  Stage {step.id}
                </div>
                
                <div style={{ marginTop: '-8px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading-monumental), sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--sky-blue)',
                    marginBottom: '12px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: 1.3,
                    color: 'rgba(15, 42, 68, 0.7)',
                    margin: 0,
                    fontWeight: 400
                  }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP CTA (Redesigned) */}
      <section style={{
        padding: '160px 0',
        backgroundColor: 'var(--midnight-navy)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Massive Subtle Background Target */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            right: '-10%',
            top: '0',
            width: '800px',
            height: '800px',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <img src="/images/target.svg" alt="" style={{ width: '100%', height: '100%', filter: 'invert(1)' }} />
        </motion.div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '80px' }}>

            {/* Vertical Side-Rail */}
            <div style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              opacity: 0.4
            }}>

              <span style={{
                fontFamily: 'var(--font-heading-monumental)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.4em',
                color: '#FFFFFF'
              }}>
                Strategic Alliances
              </span>
            </div>

            {/* Content Narrative */}
            <div style={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '40px' }}
              >
                <div className="eyebrow" style={{ color: 'var(--action-gold)', marginBottom: '16px' }}>Forward Movement</div>
                <h2 style={{
                  fontFamily: 'var(--font-heading-monumental), sans-serif',
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  margin: 0
                }}>
                  Development requires<br />collective partnership.
                </h2>
              </motion.div>

              <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '18px',
                    lineHeight: 1.3,
                    color: '#FFFFFF',
                    maxWidth: '460px',
                    margin: 0
                  }}
                >
                  We work with global strategic collaborators to scale proven interventions and expand essential infrastructure across underserved regions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
                >
                  <Button
                    label="Initiate Partnership"
                    href="/partner#dialogue"
                    variant="primary"
                    context="on-dark"
                  />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .container-sp { box-sizing: border-box; }
        @media (max-width: 1400px) {
          .protocol-row { gap: 32px !important; }
        }
        @media (max-width: 1150px) {
          .protocol-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 1024px) {
          .container-sp { padding: 0 48px !important; }
          .pillar-static-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .container-sp { padding: 0 24px !important; }
          .protocol-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-split div:nth-child(2) { display: none; } /* Hide divider */
        }
        @media (max-width: 640px) {
          .pillar-static-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
