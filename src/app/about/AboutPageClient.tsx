'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { ShieldCheck, HeartHandshake, UsersRound, Leaf, TrendingUp } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Shared Animation Config ─── */
const heroSpring = { type: 'spring' as const, stiffness: 60, damping: 18 };
const entranceSpring = { type: 'spring' as const, stiffness: 80, damping: 20 };
const premiumEase = [0.22, 1, 0.36, 1] as any;

/* ─── Physics-Based Motion Configs ─── */
const activeItemSpring = { type: 'spring' as const, stiffness: 130, damping: 22, mass: 0.9 };
const indicatorDotSpring = { type: 'spring' as const, stiffness: 180, damping: 24, mass: 0.8 };
const iconSpring = { type: 'spring' as const, stiffness: 220, damping: 18, mass: 0.6 };
const panelTransition = { duration: 0.45, ease: premiumEase };

const softSpring = { type: "spring" as const, stiffness: 80, damping: 20, mass: 1 };
const nodeSpring = { type: "spring" as const, stiffness: 160, damping: 22, mass: 0.8 };

/* ─── Shared Components ─── */
function SectionLabel({ text, color = "var(--terracotta)" }: { text: string, color?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}
    >
      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color }}>{text}</span>
    </motion.div>
  );
}

function ArrowIcon({ size = 16, style = {}, className = "", rotate = 0 }: { size?: number, style?: React.CSSProperties, className?: string, rotate?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      fill="currentColor" 
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


export default function AboutPageClient() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

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

  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);
  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Modal ESC handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedLeader(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Scroll Lock for Archive Panel
  useEffect(() => {
    if (isArchiveOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isArchiveOpen]);

  const { scrollYProgress: globalScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });

  const storyImageY = useTransform(storyScroll, [0, 1], ["-4%", "4%"]);

  const coreValues = [
    { 
      name: "Integrity", 
      icon: ShieldCheck,
      desc: "We operate with absolute transparency and institutional accountability. Trust is not a byproduct; it is our foundation. Every decision is measured against its benefit to the community." 
    },
    { 
      name: "Inclusion", 
      icon: UsersRound,
      desc: "Our interventions are designed to be radically inclusive, ensuring that development is shared across every demographic boundary — geography, gender, or social standing." 
    },
    { 
      name: "Community", 
      icon: HeartHandshake,
      desc: "We embed ourselves in the grassroots, building institutional trust through sustained presence and local partnership. We do not work for communities; we work with them." 
    },
    { 
      name: "Sustainability", 
      icon: Leaf,
      desc: "We invest in enduring systems. Our goal is self-reliance — creating structures and capacities that continue to deliver impact long after our direct intervention ends." 
    },
    { 
      name: "Empowerment", 
      icon: TrendingUp,
      desc: "We unlock the latent potential within individuals and systems, providing the training and resources for communities to lead their own transformation." 
    }
  ];

  return (
    <main ref={containerRef} style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', position: 'relative' }}>
      <NavBar />

      {/* Background Depth Gradient (Global for certain sections) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 20%, rgba(201, 169, 110, 0.05) 0%, transparent 70%), radial-gradient(circle at 80% 50%, rgba(15, 42, 68, 0.03) 0%, transparent 50%)' }} />


      {/* ─── 1. HERO — INSTITUTIONAL PRESENCE ─── */}
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
            backgroundImage: 'url("/images/Cultural Integration & Peace-Building/469103772_1245709246521006_3992731619151202266_n (1).jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            filter: 'grayscale(1) contrast(1.2) brightness(0.8)',
            mixBlendMode: 'overlay',
            opacity: 0.4,
          }}
          animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-split-grid">
            <div>
              <SectionLabel text="About" color="var(--terracotta)" />
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
                <span style={{ color: '#FFFFFF' }}>Institutional Integrity.</span> <br />
                <span style={{ color: 'var(--terracotta)', fontWeight: 300 }}>Radical Transparency.</span>
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
                Built on a foundation of technical rigor and multi-generational community trust to engineer sustainable development across Nigeria.
              </p>
              
              <div className="metric-row" style={{ marginTop: '64px' }}>
                <div className="metric-node">
                  <span className="metric-value" style={{ color: '#FFFFFF', fontSize: '24px' }}>20+ Years</span>
                  <span className="metric-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Experience</span>
                </div>
                <div className="metric-node">
                  <span className="metric-value" style={{ color: '#FFFFFF', fontSize: '24px' }}>0% Waste</span>
                  <span className="metric-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Accountability</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. Philosophy (Premium Institutional System) ─── */}
      <section style={{ backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }} className="section-pad">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* 2.1 The Triad: Vision, Mission, Goal */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '64px' }} className="philosophy-triad">
            <PhilosophyColumn 
              label="Vision" 
              title="Our North Star" 
              body="A society where every rural community is empowered to thrive through sustainable, inclusive growth."
              delay={0.1}
            />
            <PhilosophyColumn 
              label="Mission" 
              title="Our Mandate" 
              body="Advancing high-impact, people-centred solutions across health, education, and economic empowerment."
              delay={0.18}
            />
            <PhilosophyColumn 
              label="Goal" 
              title="Our Commitment" 
              body="To build resilient systems that catalyze grassroots transformation and unlock equitable access to opportunity."
              delay={0.26}
            />
          </div>

          {/* Divider & Transition */}
          <div style={{ margin: '120px 0 80px' }}>
            <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: premiumEase }} style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(15, 42, 68, 0.08), transparent)' }} />
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: '48px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8543B' }}>Our DNA</span>
              <h2 style={{ fontFamily: 'var(--font-heading-monumental), sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--sky-blue)', marginTop: '12px' }}>The principles that guide every decision.</h2>
            </motion.div>
          </div>

          {/* 2.2 Core Values Grid (Normal Grid) */}
          <div style={{ marginTop: '80px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '32px' 
            }}>
              {coreValues.map((val, i) => (
                <motion.div
                  key={val.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: premiumEase }}
                  whileHover={{ y: -8 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '40px',
                    borderRadius: '12px',
                    border: '1px solid rgba(15, 42, 68, 0.05)',
                    boxShadow: '0 4px 24px rgba(15, 42, 68, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '12px', 
                    backgroundColor: 'rgba(201, 169, 110, 0.08)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#B8543B'
                  }}>
                    <val.icon size={28} strokeWidth={1.5} />
                  </div>
                  
                  <div>
                    <h4 style={{ 
                      fontFamily: 'var(--font-heading-monumental), serif', 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      color: 'var(--sky-blue)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em',
                      marginBottom: '16px'
                    }}>
                      {val.name}
                    </h4>
                    <p style={{ 
                      fontFamily: 'var(--font-body), sans-serif', 
                      fontSize: '15px', 
                      lineHeight: 1.3, 
                      color: 'rgba(42,47,58,0.7)', 
                      margin: 0 
                    }}>
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ─── 4. Our Story (Cinematic Flagship Origin) ─── */}
      <section ref={storyRef} style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#0A2340', display: 'flex', alignItems: 'center' }}>
        
        {/* Background Layers */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1.02 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0, ease: premiumEase }}
          style={{ 
            position: 'absolute', 
            inset: '-10%', 
            backgroundImage: 'url("/ebonyi-landscape.png")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            y: storyImageY,
            zIndex: 1
          }} 
        />
        
        {/* Overlay System (Bottom-Weighted Vertical Scrim) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to top, rgba(10, 35, 60, 0.95) 0%, rgba(10, 35, 60, 0.8) 35%, rgba(10, 35, 60, 0.5) 65%, rgba(10, 35, 60, 0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'radial-gradient(circle at 45% 45%, rgba(255,255,255,0.04) 0%, rgba(10,35,60,0.1) 42%, rgba(0,0,0,0.32) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 4, opacity: 0.07, pointerEvents: 'none', mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        
        <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(80px, 15vh, 190px) 24px' }}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }} className="story-grid-flagship">
            
            {/* Left Column: Brand Markers */}
            <div className="story-left-col" style={{ flexShrink: 0 }}>
              {/* Eyebrow Row */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: premiumEase, delay: 0.08 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#B8543B' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.72)' }}>OUR STORY</span>
              </motion.div>

              {/* Origin Line */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, ease: premiumEase, delay: 0.14 }} style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 700, letterSpacing: '0.04em', color: '#B8543B', marginTop: '24px' }}>
                FROM OKPOSI. FOR THE WORLD.
              </motion.div>

              {/* Headline */}
              <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: premiumEase, delay: 0.22 }} style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF', marginTop: '24px' }}>
                <span style={{ fontWeight: 600 }}>A development network</span><br />
                <span style={{ fontWeight: 750 }}>born from lived</span><br />
                <span style={{ fontWeight: 800 }}>experience.</span>
              </motion.h2>
            </div>

            {/* Right Column: Narrative & Impact */}
            <div style={{ flex: 1 }}>
              {/* Body Block */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.75, ease: premiumEase, delay: 0.36 }}>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 'clamp(15px, 1vw, 17px)', lineHeight: 1.3, color: 'rgba(255,255,255,0.84)', marginBottom: '16px' }}>The Iveoma Development Network was born in Okposi-Okwu — a community in Ebonyi State shaped by dedicated educators — out of a recognition that external solutions alone would never be enough.</p>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 'clamp(15px, 1vw, 17px)', lineHeight: 1.3, color: 'rgba(255,255,255,0.84)', marginBottom: '16px' }}>Founded by Dr. Nkata Nwani Chuku — a health economist and policy specialist trained at the University of Lagos, the London School of Economics, LSHTM, and Stanford — the network channels world-class expertise directly into the communities that shaped him.</p>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 'clamp(14px, 0.95vw, 16px)', lineHeight: 1.3, color: 'rgba(255,255,255,0.72)' }}>Since 2016, Iveoma has rebuilt school halls, sponsored examinations, distributed relief to over 2,000 women during COVID-19, equipped seven hospitals with PPE, ran literacy programmes across 8 secondary schools, championed a medical centre at Veritas University, and in 2025 inaugurated a state-of-the-art civic centre in Agunabani village offering free ICT training and 24-hour internet access to youth. These are permanent community assets — not temporary programmes.</p>
              </motion.div>

              {/* Metrics Row */}
              <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }} className="metrics-row-flagship">
                {[
                  { val: "2016", label: "OPERATING SINCE" },
                  { val: "9", label: "YEARS OF IMPACT" }
                ].map((m, i) => (
                  <MetricCard key={i} val={m.val} label={m.label} delay={0.52 + (i * 0.08)} />
                ))}
              </div>
            </div>

          </div>

          {/* Location Label (Anchored to content container bottom) */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: premiumEase, delay: 0.65 }} style={{ position: 'absolute', left: '24px', bottom: '48px', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.56)', zIndex: 6 }} className="story-location-label">
            OKPOSI-OKWU, EBONYI STATE / 2016 – 2025
          </motion.div>
        </div>
      </section>

      {/* ─── 5. Leadership (Editorial Authority) ─── */}
      <section style={{ backgroundColor: '#F4F6F9', position: 'relative', overflow: 'hidden' }} className="section-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(201,169,110,0.08), transparent 36%)', pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-60px" }} 
            transition={entranceSpring}
            style={{ marginBottom: '84px', textAlign: 'center' }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#B8543B' }}>Our Leadership</div>
            <h2 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '560px', marginTop: '14px', marginLeft: 'auto', marginRight: 'auto' }}>The people behind the work.</h2>
            <p style={{ fontSize: '17px', lineHeight: 1.3, color: 'rgba(31,42,51,0.72)', maxWidth: '620px', marginTop: '24px', marginLeft: 'auto', marginRight: 'auto' }}>Leadership at Iveoma brings together global development expertise, operational discipline, and deep connection to the communities we serve.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', position: 'relative', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }} className="leadership-grid">
            <LeadershipProfile 
              name="Dr. Nkata Nwani Chuku"
              title="Founder & Principal Financier"
              bio="A preeminent health economist and policy specialist with over 20 years of experience, Dr. Chuku currently serves as Deputy Director of Health Systems Strengthening & Primary Health Care at the Bill and Melinda Gates Foundation’s Nigeria Country Office. He has previously held leadership roles at KPMG and FHI 360, chairs the Health Policy Commission of the Nigerian Economic Summit Group (NESG), and sits on the Nigeria Vision 2050 Technical Committee. Born in Okposi-Okwu, Ebonyi State, he channels global implementation experience into grounded community development through Iveoma."
              credentials="University of Lagos · LSE · LSHTM · Stanford GSB · Gates Foundation"
              initials="NC"
              img="/images/leadership/Nkata-Chuku.jpg"
              onClick={() => setSelectedLeader({
                name: "Dr. Nkata Nwani Chuku",
                title: "Founder & Principal Financier",
                bio: "A preeminent health economist and policy specialist with over 20 years of experience, Dr. Chuku currently serves as Deputy Director of Health Systems Strengthening & Primary Health Care at the Bill and Melinda Gates Foundation’s Nigeria Country Office. He has previously held leadership roles at KPMG and FHI 360, chairs the Health Policy Commission of the Nigerian Economic Summit Group (NESG), and sits on the Nigeria Vision 2050 Technical Committee. Born in Okposi-Okwu, Ebonyi State, he channels global implementation experience into grounded community development through Iveoma.",
                credentials: "University of Lagos · LSE · LSHTM · Stanford GSB · Gates Foundation",
                initials: "NC",
                img: "/images/leadership/Nkata-Chuku.jpg"
              })}
            />

            <LeadershipProfile 
              name="Brigadier General Igwe Omoke"
              title="Director General"
              bio="A distinguished senior officer in the Nigerian Army, formally commended for exemplary professional standards and dedication to national service. His commitment to societal development earned him the National Youth Merit Award from the Nigeria Youth Organisation. As Director General, he brings operational discipline, logistical rigour, and deep community trust to Iveoma’s development mandate, ensuring field initiatives are executed with accountability and community alignment."
              initials="IO"
              img="/gen-omoke-portrait.jpg"
              onClick={() => setSelectedLeader({
                name: "Brigadier General Igwe Omoke",
                title: "Director General",
                bio: "A distinguished senior officer in the Nigerian Army, formally commended for exemplary professional standards and dedication to national service. His commitment to societal development earned him the National Youth Merit Award from the Nigeria Youth Organisation. As Director General, he brings operational discipline, logistical rigour, and deep community trust to Iveoma’s development mandate, ensuring field initiatives are executed with accountability and community alignment.",
                initials: "IO",
                img: "/gen-omoke-portrait.jpg"
              })}
            />
          </div>
        </div>
      </section>

      {/* Leadership Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <LeaderModal 
            leader={selectedLeader} 
            onClose={() => setSelectedLeader(null)} 
          />
        )}
      </AnimatePresence>

      {/* ─── 6. Track Record (Curated Evidence System) ─── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="section-pad milestones-section">
        <div className="container">
          
          {/* Section Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={entranceSpring}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#B8543B', marginBottom: '14px' }}>Our Track Record</div>
            <h2 style={{ fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif', fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '680px', margin: 0 }}>Nine years. Six interventions. All still standing.</h2>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#B8543B', marginTop: '24px' }} />
          </motion.div>

          {/* Primary View: Flagship Cards Grid */}
          <div style={{ 
            marginTop: '72px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }} className="milestones-flagship-grid">
            {[
              { year: "2016", title: "Isi Okposi Girls Secondary School", desc: "First major infrastructure intervention. Renovated and furnished the examination hall for adolescent female students.", img: "/images/reading/150890009_362438534848086_6395988148807759798_n.jpg" },
              { year: "2020", title: "COVID-19 Crisis Response", desc: "Rapid socio-economic relief for 2,000+ women and PPE distribution to 7 public and private hospitals.", img: "/images/stabilization/IMAGE-6472410.jpg" },
              { year: "2025", title: "Learning & Development Centre", desc: "Inaugurated a state-of-the-art ICT centre in Agunabani village providing free 24-hour internet and digital training.", img: "/images/civic-centre.jpg" }
            ].map((card, i) => (
              <FlagshipCard key={i} card={card} index={i} />
            ))}
          </div>

          {/* Full Timeline Trigger */}
          <div style={{ marginTop: '48px' }}>
            <button 
              onClick={() => setIsArchiveOpen(true)}
              className="btn-link on-light"
              style={{
                padding: 0
              }}
            >
              View full timeline <ArrowIcon size={14} />
            </button>
          </div>

        </div>

        {/* Archive Overlay Panel */}
        <AnimatePresence>
          {isArchiveOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsArchiveOpen(false)}
                style={{ 
                  position: 'fixed', 
                  inset: 0, 
                  backgroundColor: 'rgba(10, 35, 60, 0.06)', 
                  backdropFilter: 'blur(4px)', 
                  zIndex: 100 
                }} 
              />

              {/* Panel */}
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ 
                  position: 'fixed', 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  height: '80vh', 
                  backgroundColor: '#FFFFFF', 
                  borderTopLeftRadius: '24px', 
                  borderTopRightRadius: '24px', 
                  boxShadow: '0 -20px 60px rgba(0,0,0,0.08)', 
                  zIndex: 101,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Panel Header */}
                <div style={{ padding: 'clamp(24px, 4vw, 40px) var(--sp-container)', borderBottom: '1px solid rgba(15, 42, 68, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '26px', fontWeight: 700, color: '#0F2A44', margin: 0 }}>Full Programme Timeline</h3>
                    <div style={{ fontSize: '14px', color: '#5B8BBF', marginTop: '6px' }}>2016 — Present</div>
                  </div>
                  <button 
                    onClick={() => setIsArchiveOpen(false)}
                    className="btn-link on-light"
                    style={{
                      padding: 0,
                      opacity: 0.6
                    }}
                  >
                    Close <ArrowIcon size={12} rotate={-90} />
                  </button>
                </div>

                {/* Internal Scroll Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(32px, 5vw, 48px) var(--sp-container) 80px' }}>
                  <div style={{ position: 'relative', maxWidth: '900px' }}>
                    {/* Vertical Rail */}
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1.0, ease: premiumEase, delay: 0.2 }}
                      style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(201,169,110,0.22)', transformOrigin: 'top' }}
                    />
                    
                    {/* Timeline Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { year: "2016", title: "Isi Okposi Girls Secondary School — Examination Hall", body: "Fully renovated and furnished the examination hall of Isi Okposi Girls Secondary School in Okposi, providing a safe and modern environment for adolescent female students.", media: "Photo needed: Renovated examination hall, 2016" },
                        { year: "2019", title: "Primary School Hall Reconstruction", body: "Collaborated with community stakeholders in Ebonyi State to successfully rebuild a dilapidated primary school hall — restoring a functional learning environment.", media: "Photo needed: Rebuilt school hall, 2019" },
                        { year: "2020", title: "COVID-19 Crisis Response", body: "Deployed rapid socio-economic relief — palliatives to 2,000+ widows, PPE to 7 hospitals, and solar-powered handwashing equipment across Ebonyi State.", media: "Photo needed: PPE distribution / relief delivery, 2020" },
                        { year: "2021", title: "School Reading & Literacy Programme", body: "Organised an intensive literacy programme spanning 8 public secondary schools in Okposi. Sponsored WAEC fees in full for all programme winners.", media: "Photo needed: Literacy programme in session, 2021" },
                        { year: "2023", title: "The Chuku Medical Centre, Veritas University", body: "Championed the capital mobilisation and design of a standard Medical Centre at Veritas University, Abuja. Facility named in honour of Iveoma’s founder.", media: "Photo / video needed: Commissioning ceremony, 2023" },
                        { year: "2025", title: "Sir Nwani and Lady Akanele Chuku Learning and Development Centre", body: "Inaugurated a state-of-the-art facility in Agunabani village providing youth with free ICT training, a physical library, and 24-hour internet.", media: "Photo needed: Civic Centre inauguration, 2025" }
                      ].map((ms, i) => (
                        <ArchiveRow key={i} milestone={ms} index={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>


      {/* PARTNERSHIP CTA (Adopting New Asymmetric Design) */}
      <section style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        position: 'relative',
        overflow: 'hidden'
      }} className="section-pad">
        {/* Massive Subtle Background Target */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            right: '-10%',
            top: '0',
            maxWidth: '800px',
            width: '100%',
            height: 'auto',
            aspectRatio: '1',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <img src="/images/target.svg" alt="" style={{ width: '100%', height: '100%', filter: 'invert(1)' }} />
        </motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '80px' }}>
            

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
                  fontFamily: 'var(--font-heading-monumental), serif', 
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

              <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }} className="cta-split-row">
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
                    href="/partner" 
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
        .values-mobile-view { display: none; }
        
        @media (max-width: 1023px) {
          .philosophy-triad { 
            grid-template-columns: 1fr 1fr !important; 
            gap: 40px !important; 
          }
          .modal-grid { grid-template-columns: 1fr !important; }
          .modal-portrait { height: 320px !important; min-height: 0 !important; }
          .modal-content { padding: 40px 32px !important; }
        }
        
        @media (max-width: 639px) {
          .philosophy-triad { 
            grid-template-columns: 1fr !important; 
          }
          .story-grid-flagship {
            flex-direction: column !important;
            gap: 48px !important;
          }
          .story-left-col { width: 100% !important; }
          .story-location-label { position: static !important; margin-top: 64px !important; }
          
          .leadership-grid { 
            display: flex;
            flex-direction: column !important;
            gap: 48px !important;
          }
          .leadership-profile-portrait { height: auto !important; }
          .modal-panel { width: 100vw !important; height: 100vh !important; border-radius: 0 !important; max-height: none !important; }
          .metrics-row-flagship { flex-direction: column !important; }
          .milestones-flagship-grid { 
            grid-template-columns: 1fr !important; 
            gap: 24px !important;
          }
          .flagship-card-container { height: 400px !important; }
          .cta-split-row {
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </main>
  );
}

function PhilosophyColumn({ label, title, body, delay }: { label: string, title: string, body: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: premiumEase, delay }}
      whileHover="hover"
      style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
    >
      <motion.div 
        variants={{ hover: { scaleX: 1.1 } }}
        transition={{ duration: 0.4, ease: premiumEase }}
        style={{ width: '40px', height: '2px', backgroundColor: '#B8543B', marginBottom: '24px', originX: 0 }} 
      />
      <motion.div 
        variants={{ hover: { y: -6 } }}
        transition={{ duration: 0.32, ease: premiumEase }}
      >
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#B8543B', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>{label}</div>
        <h4 style={{ fontFamily: 'var(--font-heading-monumental), sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--sky-blue)', marginBottom: '16px', lineHeight: 1.2 }}>{title}</h4>
        <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px', lineHeight: 1.3, color: 'rgba(42,47,58,0.7)', margin: 0 }}>{body}</p>
      </motion.div>
    </motion.div>
  );
}

function FlagshipCard({ card, index }: { card: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: premiumEase, delay: index * 0.15 }}
      whileHover="hover"
      style={{ 
        height: '360px', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        position: 'relative', 
        cursor: 'pointer',
        backgroundColor: '#0A2340' 
      }}
      className="flagship-card-container"
    >
      {/* Background with Image or Placeholder Gradient */}
      <motion.div 
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.6, ease: premiumEase }}
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 1 
        }} 
      >
        {card.img ? (
          <img 
            src={card.img} 
            alt={card.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0F2A44 0%, #0A2340 100%)' }} />
        )}
      </motion.div>

      {/* Cinematic Overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'linear-gradient(180deg, rgba(10,35,60,0.2) 0%, rgba(10,35,60,0.55) 55%, rgba(10,35,60,0.9) 100%)',
        zIndex: 2 
      }} />

      {/* Content */}
      <motion.div 
        variants={{ hover: { y: -6 } }}
        transition={{ duration: 0.32, ease: premiumEase }}
        style={{ position: 'absolute', inset: 0, zIndex: 3, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>{card.year}</div>
        <h3 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '22px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, margin: 0 }}>{card.title}</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginTop: '12px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{card.desc}</p>
      </motion.div>
    </motion.div>
  );
}

function ArchiveRow({ milestone, index }: { milestone: any, index: number }) {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: premiumEase, delay: index * 0.1 }}
      style={{ position: 'relative', padding: '32px 0 32px 64px' }}
    >
      {/* Dot */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: (index * 0.1) + 0.15 }}
        style={{ position: 'absolute', left: '21px', top: '40px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#B8543B', border: '2px solid #FFFFFF', boxShadow: '0 0 0 3px rgba(184,84,59,0.15)', transform: 'translateX(-50%)', zIndex: 2 }}
      />

      {/* Content */}
      <div style={{ maxWidth: '680px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#B8543B', marginBottom: '4px' }}>{milestone.year}</div>
        <h4 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '18px', fontWeight: 700, color: '#0F2A44', margin: '0 0 12px 0' }}>{milestone.title}</h4>
        <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(31,42,51,0.8)', margin: 0 }}>{milestone.body}</p>
        
        <button 
          onClick={() => setIsMediaOpen(!isMediaOpen)}
          className="btn-link on-light"
          style={{
            marginTop: '16px',
            padding: 0
          }}
        >
          {isMediaOpen ? "Hide documentation" : "View documentation"}
          <ArrowIcon size={12} rotate={isMediaOpen ? -90 : 0} />
        </button>

        <AnimatePresence>
          {isMediaOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: premiumEase }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ marginTop: '20px' }}>
                <MediaPlaceholder label={milestone.media} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div style={{ aspectRatio: '16/9', width: '100%', maxWidth: '440px', borderRadius: '10px', background: 'linear-gradient(135deg, #F4F6F9 0%, #E7EEF5 100%)', border: '1px solid rgba(122,163,190,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div style={{ fontSize: '11px', color: '#5B8BBF', letterSpacing: '0.02em', textAlign: 'center', padding: '24px', lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

function LeadershipProfile({ name, title, initials, img, onClick, bio, credentials }: { name: string, title: string, initials: string, img: string, onClick: () => void, bio?: string, credentials?: string }) {
  return (
    <div 
      className="leadership-profile-card"
      onClick={onClick}
      style={{ cursor: 'pointer', textAlign: 'center' }}
    >
      <motion.div
        whileHover="hover"
        initial="initial"
        style={{ position: 'relative', width: '100%', maxWidth: '220px', aspectRatio: '4/5', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#E1E9F0', margin: '0 auto' }}
        className="leadership-profile-portrait"
      >
        <motion.div
          variants={{ hover: { scale: 1.04 } }}
          transition={{ duration: 0.6, ease: premiumEase }}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {/* Portrait Image */}
          {img && (
            <img 
              src={img} 
              alt={name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} 
            />
          )}
          {/* Initials Placeholder (Fall-back) */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0F2A44 0%, #579DD5 100%)' }}>
            <span style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '32px', fontWeight: 700, color: '#FFFFFF', opacity: 0.2 }}>{initials}</span>
          </div>
          {/* Overlays */}
          <motion.div 
            variants={{ hover: { opacity: 1 } }}
            initial={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,35,60,0.18)', zIndex: 2 }} 
          />
        </motion.div>
      </motion.div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 700, color: '#0F2A44', lineHeight: 1.15, margin: 0 }}>{name}</h3>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#2E8B9A', marginTop: '4px' }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#579DD5', fontSize: '14px', fontWeight: 600, marginTop: '16px' }} className="profile-link">
          <span>View profile</span>
          <ArrowIcon size={14} className="arrow" />
        </div>
      </div>

      <style jsx>{`
        .leadership-profile-card:hover .arrow { transform: translateX(4px); }
        .arrow { transition: transform 0.3s ease; }
      `}</style>
    </div>
  );
}

function LeaderModal({ leader, onClose }: { leader: any, onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 35, 60, 0.72)', backdropFilter: 'blur(8px)' }}
      />
      
      <motion.div
        initial={{ y: 32, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 32, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="modal-panel"
        style={{ 
          position: 'relative', 
          backgroundColor: '#FFFFFF', 
          width: 'min(920px, calc(100vw - 48px))', 
          maxHeight: 'calc(100vh - 64px)', 
          borderRadius: '18px', 
          overflow: 'hidden', 
          zIndex: 2,
          boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: '24px', top: '24px', zIndex: 10, background: 'none', border: 'none', color: '#0F2A44', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          Close ×
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '38% 62%', height: '100%', overflowY: 'auto' }} className="modal-grid">
          {/* Image Side */}
          <div className="modal-portrait" style={{ position: 'relative', height: '100%', minHeight: '400px', backgroundColor: '#F4F6F9' }}>
             {leader.img && (
               <img 
                 src={leader.img} 
                 alt={leader.name} 
                 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }} 
               />
             )}
             <motion.div
               initial={{ opacity: 0, scale: 1.03 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0F2A44 0%, #579DD5 100%)', position: 'relative', zIndex: 1 }}
             >
               <span style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '48px', fontWeight: 700, color: '#FFFFFF', opacity: 0.15 }}>{leader.initials}</span>
             </motion.div>
          </div>

          {/* Content Side */}
          <div style={{ padding: '64px', overflowY: 'auto' }} className="modal-content">
            <h2 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: 'clamp(34px, 4vw, 42px)', fontWeight: 700, color: '#0F2A44', lineHeight: 1.1, margin: 0 }}>{leader.name}</h2>
            <div style={{ fontSize: '15px', color: '#2E8B9A', fontWeight: 600, marginTop: '8px' }}>{leader.title}</div>
            
            <div style={{ width: '48px', height: '2px', backgroundColor: '#B8543B', margin: '20px 0 24px' }} />

            <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(31,42,51,0.78)', margin: 0 }}>{leader.bio}</p>

            {leader.credentials && (
              <div style={{ fontSize: '11.5px', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#579DD5', marginTop: '24px', lineHeight: 1.6 }}>
                {leader.credentials}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MetricCard({ val, label, delay }: { val: string, label: string, delay: number }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: premiumEase, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ 
        y: isHovered ? -3 : 0,
        backgroundColor: isHovered ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.045)',
        borderColor: isHovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.09)'
      }}
      style={{
        padding: '18px 20px',
        minWidth: '160px',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        cursor: 'default'
      }}
    >
      <div style={{ fontSize: 'clamp(24px, 2vw, 32px)', fontWeight: 700, color: '#B8543B', lineHeight: 1 }}>{val}</div>
      <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{label}</div>
    </motion.div>
  );
}
