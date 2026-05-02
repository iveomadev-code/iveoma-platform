'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, Download, Send, Heart, Users, Activity, Globe, 
  Landmark, TrendingUp, Mail, MapPin, Phone, ArrowUpRight, 
  Search, ShieldCheck, CheckCircle2, ChevronRight
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function DesignSystemClient() {
  const premiumEase = [0.22, 1, 0.36, 1];

  const colors = [
    { name: 'Midnight Navy', var: '--midnight-navy', hex: '#0D3A5C', desc: 'The architectural foundation. Used for deepest backgrounds and primary headings.' },
    { name: 'Deep Authority Blue', var: '--primary', hex: '#1B5C8E', desc: 'The brand’s primary voice. Projects stability and institutional scale.' },
    { name: 'Logo Primary Blue', var: '--sky-blue', hex: '#579DD5', desc: 'Aspiration and insight. Used for visionary headings and secondary highlights.' },
    { name: 'Strategic Accent Teal', var: '--teal', hex: '#2E8B9A', desc: 'Technical rigor. Used for specific programmatic domains and metrics.' },
    { name: 'Action Gold', var: '--action-gold', hex: '#C9A96E', desc: 'The interactive spark. Reserved for CTAs and high-value performance data.' },
    { name: 'Terracotta Accent', var: '--terracotta', hex: '#B8543B', desc: 'Human legitimacy. Represents the cultural fabric and local agency.' },
    { name: 'Ice Blue', var: '--ice-blue', hex: '#F0F5FA', desc: 'The environmental canvas. Provides subtle depth to secondary sections.' },
    { name: 'Cool Muted Blue', var: '--cool-muted', hex: '#7AA3BE', desc: 'The technical meta-layer. Used for labels and secondary text.' },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <NavBar />

      {/* ─── 00. SYSTEM HERO ─── */}
      <section style={{ padding: '280px 0 160px', backgroundColor: 'var(--midnight-navy)', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '900px' }}>
            <motion.span 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--action-gold)', letterSpacing: '0.25em', display: 'block', marginBottom: '24px' }}
            >
              Institutional Framework v1.0
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 'clamp(56px, 10vw, 100px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '-0.04em', margin: 0 }}
            >
              Design System <br /><span style={{ fontWeight: 300, color: 'var(--action-gold)' }}>Manual.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ fontSize: '22px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '48px', lineHeight: 1.6, maxWidth: '720px' }}
            >
              A unified visual language for the Iveoma Development Network, engineered for mathematical rigor, cultural legitimacy, and high-fidelity institutional presence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── 01. BRAND PALETTE ─── */}
      <section id="palette" style={{ padding: '160px 0' }}>
        <div className="container">
          <SectionHeader num="01" title="Brand Palette" sub="Harmonized colors that project authority and cultural depth." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
            {colors.map((color, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid rgba(15, 42, 68, 0.05)', borderRadius: '12px', transition: 'all 0.4s ease' }}
              >
                <div style={{ width: '100%', height: '140px', backgroundColor: `var(${color.var})`, borderRadius: '6px', marginBottom: '24px', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '8px' }}>{color.name}</h3>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--terracotta)', marginBottom: '16px', fontWeight: 600 }}>{color.hex} • {color.var}</div>
                <p style={{ fontSize: '14px', color: 'rgba(15, 42, 68, 0.6)', lineHeight: 1.6, margin: 0 }}>{color.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 02. TYPOGRAPHIC MATRIX ─── */}
      <section id="typography" style={{ padding: '160px 0', backgroundColor: 'var(--ice-blue)' }}>
        <div className="container">
          <SectionHeader num="02" title="Typographic Matrix" sub="Scale, weight, and color partitioning across institutional contexts." />
          
          {/* THE COLOR MATRIX PROTOCOL */}
          <div style={{ marginBottom: '120px', padding: '64px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 40px 100px rgba(15, 42, 68, 0.05)' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '48px' }}>Color Partitioning Protocol</div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(15, 42, 68, 0.1)' }}>
                    <th style={{ padding: '24px 16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cool-muted)' }}>Level</th>
                    <th style={{ padding: '24px 16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cool-muted)' }}>Role</th>
                    <th style={{ padding: '24px 16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cool-muted)' }}>Light Context</th>
                    <th style={{ padding: '24px 16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cool-muted)' }}>Dark Context</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '14px', color: 'var(--midnight-navy)' }}>
                  <tr style={{ borderBottom: '1px solid rgba(15, 42, 68, 0.05)' }}>
                    <td style={{ padding: '24px 16px', fontWeight: 800 }}>Display Title (H1)</td>
                    <td style={{ padding: '24px 16px', opacity: 0.6 }}>Hero / Narrative Opener</td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--midnight-navy)" label="Midnight Navy" /></td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="#FFFFFF" label="White" isWhite /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(15, 42, 68, 0.05)' }}>
                    <td style={{ padding: '24px 16px', fontWeight: 800 }}>Section Header (H2)</td>
                    <td style={{ padding: '24px 16px', opacity: 0.6 }}>Major Block Division</td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--primary)" label="Deep Authority" /></td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="#FFFFFF" label="White" isWhite /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(15, 42, 68, 0.05)' }}>
                    <td style={{ padding: '24px 16px', fontWeight: 800 }}>Component Headline (H3)</td>
                    <td style={{ padding: '24px 16px', opacity: 0.6 }}>Sub-section / Card Title</td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--sky-blue)" label="Logo Primary Blue" /></td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--action-gold)" label="Action Gold" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(15, 42, 68, 0.05)' }}>
                    <td style={{ padding: '24px 16px', fontWeight: 800 }}>Sub-component Title (H4)</td>
                    <td style={{ padding: '24px 16px', opacity: 0.6 }}>Stat / Detail Label</td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--cool-muted)" label="Cool Muted Blue" /></td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="#FFFFFF" label="White (60%)" opacity={0.6} isWhite /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(15, 42, 68, 0.05)' }}>
                    <td style={{ padding: '24px 16px', fontWeight: 800 }}>Primary Body (P)</td>
                    <td style={{ padding: '24px 16px', opacity: 0.6 }}>Narrative Flow</td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--neutral-charcoal)" label="Neutral Charcoal" /></td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="#FFFFFF" label="White (70%)" opacity={0.7} isWhite /></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '24px 16px', fontWeight: 800 }}>Metadata / Eyebrow</td>
                    <td style={{ padding: '24px 16px', opacity: 0.6 }}>Context Labeling</td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--terracotta)" label="Terracotta" /></td>
                    <td style={{ padding: '24px 16px' }}><ColorPill color="var(--action-gold)" label="Action Gold" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
            
            {/* LIGHT CONTEXT */}
            <div style={{ padding: '80px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
              <div style={{ marginBottom: '64px', opacity: 0.4, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Light Background (Standard Context)</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                <div>
                   <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>H1 • Display Header</div>
                   <h1 style={{ fontSize: '72px', color: 'var(--midnight-navy)', lineHeight: 0.9, letterSpacing: '-0.04em', margin: 0 }}>Institutional Voice.</h1>
                   <p style={{ marginTop: '24px', fontSize: '20px', lineHeight: 1.3, color: 'var(--neutral-charcoal)', opacity: 0.9, letterSpacing: '-0.01em', fontWeight: 300 }}>Lead text in Midnight Navy for peak authority.</p>
                </div>
                <div>
                   <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>H2 • Section Authority</div>
                   <h2 style={{ fontSize: '48px', color: 'var(--primary)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Structural Clarity.</h2>
                   <p style={{ marginTop: '16px', fontSize: '16px', lineHeight: 1.3, color: 'var(--neutral-charcoal)', letterSpacing: '0' }}>Body text in Neutral Charcoal (#1F2A33) at 1.3 density.</p>
                </div>
                <div>
                   <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>H3 • Component Level</div>
                   <h3 style={{ fontSize: '32px', color: 'var(--sky-blue)', lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0, fontWeight: 600 }}>Data Infrastructure</h3>
                   <p style={{ marginTop: '12px', fontSize: '13px', lineHeight: 1.4, color: 'var(--cool-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700 }}>Captions in Cool Muted Blue (H4 role).</p>
                </div>
              </div>
            </div>

            {/* DARK CONTEXT */}
            <div style={{ padding: '80px', backgroundColor: 'var(--midnight-navy)', borderRadius: '16px' }}>
              <div style={{ marginBottom: '64px', opacity: 0.4, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#FFFFFF' }}>Dark Background (Immersive Context)</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                <div>
                   <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--action-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>H1 • Display Header</div>
                   <h1 style={{ fontSize: '72px', color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '-0.04em', margin: 0 }}>
                     Peak <span style={{ color: 'var(--action-gold)', fontWeight: 300 }}>Resilience.</span>
                   </h1>
                   <p style={{ marginTop: '24px', fontSize: '20px', lineHeight: 1.3, color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.01em', fontWeight: 300 }}>White (80%) for high-fidelity immersion.</p>
                </div>
                <div>
                   <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--action-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>H2 • Section Authority</div>
                   <h2 style={{ fontSize: '48px', color: '#FFFFFF', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Verified Impact.</h2>
                   <p style={{ marginTop: '16px', fontSize: '16px', lineHeight: 1.3, color: 'rgba(255,255,255,0.7)', letterSpacing: '0' }}>Body text in White (70%) for reading comfort.</p>
                </div>
                <div>
                   <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--action-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>H3 • Component Level</div>
                   <h3 style={{ fontSize: '32px', color: 'var(--action-gold)', lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0, fontWeight: 600 }}>Performance Node</h3>
                   <p style={{ marginTop: '12px', fontSize: '13px', lineHeight: 1.4, color: 'var(--action-gold)', opacity: 0.6, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700 }}>Gold accents for technical metadata.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ─── 03. VERTICAL RHYTHM & SPACING ─── */}
      <section id="spacing" style={{ padding: 'var(--sp-section) 0', borderTop: '1px solid rgba(15, 42, 68, 0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--sp-container)' }}>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>Protocol 03</div>
            <h2 style={{ fontSize: '48px', fontWeight: 700, color: 'var(--midnight-navy)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Vertical Rhythm</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div style={{ padding: '40px', backgroundColor: 'var(--ice-blue)', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--midnight-navy)', marginBottom: '12px' }}>160px</div>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cool-muted)', letterSpacing: '0.1em' }}>Institutional Section Gap</div>
              <p style={{ marginTop: '16px', fontSize: '14px', lineHeight: 1.6, color: 'rgba(15, 42, 68, 0.6)' }}>The standard vertical separation between major narrative blocks.</p>
            </div>
            <div style={{ padding: '40px', backgroundColor: 'var(--ice-blue)', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--midnight-navy)', marginBottom: '12px' }}>48px</div>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cool-muted)', letterSpacing: '0.1em' }}>Component Cluster Gap</div>
              <p style={{ marginTop: '16px', fontSize: '14px', lineHeight: 1.6, color: 'rgba(15, 42, 68, 0.6)' }}>Spacing between related functional components within a section.</p>
            </div>
            <div style={{ padding: '40px', backgroundColor: 'var(--ice-blue)', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--midnight-navy)', marginBottom: '12px' }}>24px</div>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cool-muted)', letterSpacing: '0.1em' }}>Surgical Content Gap</div>
              <p style={{ marginTop: '16px', fontSize: '14px', lineHeight: 1.6, color: 'rgba(15, 42, 68, 0.6)' }}>Tight spacing for title-to-body relationships.</p>
            </div>
          </div>
        </div>
      </section>


      {/* ─── 04. BUTTON PROTOCOLS ─── */}
      <section id="buttons" style={{ padding: '160px 0' }}>
        <div className="container">
          <SectionHeader num="04" title="Button Protocols" sub="Surgical interactive states for institutional action." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div style={{ padding: '80px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px' }}>
              <div style={{ marginBottom: '48px', opacity: 0.4, fontSize: '11px', fontWeight: 800, color: 'var(--midnight-navy)' }}>ON LIGHT CONTEXT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', alignItems: 'flex-start' }}>
                <Button label="Primary Engagement" href="#" variant="primary" context="on-light" />
                <Button label="Secondary Research" href="#" variant="secondary" context="on-light" />
                <a href="#" className="btn-link on-light">View Technical Report <ArrowRight size={14} /></a>
              </div>
            </div>
            <div style={{ padding: '80px', backgroundColor: 'var(--midnight-navy)', borderRadius: '16px' }}>
              <div style={{ marginBottom: '48px', opacity: 0.4, fontSize: '11px', fontWeight: 800, color: '#FFFFFF' }}>ON DARK CONTEXT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', alignItems: 'flex-start' }}>
                <Button label="Submit Inquiry" href="#" variant="primary" context="on-dark" icon={<Send size={16} />} />
                <Button label="Partner Protocol" href="#" variant="secondary" context="on-dark" />
                <a href="#" className="btn-link on-dark">Explore Global Network <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05. DATA NODES ─── */}
      <section id="metrics" style={{ padding: '160px 0', backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <SectionHeader num="05" title="Impact & Metrics" sub="Standardized units for reporting institutional performance." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            
            <div style={{ padding: '48px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px' }}>
              <div style={{ width: '48px', height: '2px', backgroundColor: 'var(--terracotta)', marginBottom: '32px' }} />
              <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '56px', fontWeight: 800, color: 'var(--midnight-navy)', marginBottom: '12px' }}>2,000+</div>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(15, 42, 68, 0.4)', letterSpacing: '0.2em' }}>Direct Beneficiaries</div>
            </div>

            <div style={{ padding: '48px', backgroundColor: 'var(--midnight-navy)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <Activity size={28} color="var(--action-gold)" />
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>Stewardship</span>
              </div>
              <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '56px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>100%</div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>Traceable capital deployment across all programmatic domains.</p>
            </div>

            <div style={{ padding: '48px', backgroundColor: '#FFFFFF', border: '1px solid rgba(15, 42, 68, 0.05)', borderRadius: '12px' }}>
               <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '0.1em' }}>01. STRATEGY</div>
               <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '20px', lineHeight: 1.2 }}>Education Systems</h3>
               <p style={{ fontSize: '15px', color: 'rgba(15, 42, 68, 0.6)', lineHeight: 1.6, margin: 0 }}>Engineering resilient facilities to restore essential learning environments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06. FORM PROTOCOLS ─── */}
      <section id="forms" style={{ padding: '160px 0' }}>
        <div className="container">
          <SectionHeader num="06" title="Inquiry Systems" sub="Seamless, frictionless input protocols for institutional dialogue." />
          
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '80px', 
            backgroundColor: '#FFFFFF',
            borderRadius: '2px',
            border: '1px solid rgba(15, 42, 68, 0.05)',
            boxShadow: '0 40px 100px rgba(15, 42, 68, 0.03)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              
              {/* Seamless Input Group */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
                <SeamlessInput label="Full Name" placeholder="Institutional Representative" />
                <SeamlessInput label="Organisation" placeholder="Entity Name" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
                <SeamlessInput label="Email Address" placeholder="representative@institution.org" type="email" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                  <label style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cool-muted)', letterSpacing: '0.2em' }}>Engagement Protocol</label>
                  <select className="seamless-select">
                    <option>Strategic Co-investment</option>
                    <option>Technical Collaboration</option>
                    <option>Capital Mobilisation</option>
                  </select>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)' }} />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button label="Initialize Dialogue" href="#" variant="primary" context="on-light" icon={<ChevronRight size={18} />} />
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* ─── 07. ICONOGRAPHY ─── */}
      <section id="icons" style={{ padding: '160px 0', backgroundColor: 'var(--midnight-navy)', color: '#FFFFFF' }}>
        <div className="container">
          <SectionHeader num="07" title="Iconography" sub="A curated set of technical and biological identifiers." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '48px', textAlign: 'center' }}>
            {[
              { icon: <Users size={32} />, label: 'Community' },
              { icon: <Activity size={32} />, label: 'Resilience' },
              { icon: <Globe size={32} />, label: 'Network' },
              { icon: <Landmark size={32} />, label: 'Institution' },
              { icon: <TrendingUp size={32} />, label: 'Performance' },
              { icon: <Mail size={32} />, label: 'Dialogue' },
              { icon: <ShieldCheck size={32} />, label: 'Legitimacy' },
              { icon: <CheckCircle2 size={32} />, label: 'Verified' },
              { icon: <ArrowUpRight size={32} />, label: 'Expansion' },
              { icon: <Search size={32} />, label: 'Research' },
              { icon: <Heart size={32} />, label: 'Humanity' },
              { icon: <Send size={32} />, label: 'Impact' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ color: 'var(--action-gold)', transition: 'transform 0.4s ease' }} className="icon-hover">{item.icon}</div>
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 08. STRUCTURAL LOGIC ─── */}
      <section id="grid" style={{ padding: '160px 0' }}>
        <div className="container">
          <SectionHeader num="08" title="Structural Logic" sub="The 8px baseline grid that governs all layout density." />
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '120px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'var(--midnight-navy)', marginBottom: '48px', fontWeight: 300 }}>
                Every element in the Iveoma network is positioned on a mathematical grid. This ensures that even the most complex data remains legible and aesthetically rigorous.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[8, 16, 24, 32, 48, 64, 80, 120, 160].map((unit) => (
                  <div key={unit} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ width: `${unit}px`, height: '10px', backgroundColor: 'var(--terracotta)', opacity: 0.2, borderRadius: '2px' }} />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--midnight-navy)', width: '50px' }}>{unit}px</span>
                    <span style={{ fontSize: '11px', color: 'var(--cool-muted)', fontWeight: 600 }}>--sp-unit-{unit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '80px', backgroundColor: 'var(--ice-blue)', borderRadius: '24px', border: '2px dashed rgba(122, 163, 190, 0.2)', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '10px', fontWeight: 800, color: 'var(--terracotta)', opacity: 0.5 }}>8PX GRID ACTIVE</div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                 <div style={{ width: '100%', height: '48px', backgroundColor: '#FFFFFF', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} />
                 <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(0,0,0,0.05)' }} />
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ height: '120px', backgroundColor: '#FFFFFF', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} />
                    <div style={{ height: '120px', backgroundColor: '#FFFFFF', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        input:focus { border-color: var(--terracotta) !important; }
        input::placeholder { color: rgba(13, 58, 92, 0.25) !important; }
        .icon-hover:hover { transform: scale(1.2) rotate(5deg); }

        .seamless-select {
          padding: 16px 0;
          border: none;
          font-size: 18px;
          color: var(--midnight-navy);
          background: none;
          cursor: pointer;
          width: 100%;
          outline: none;
          appearance: none;
        }

        .seamless-input:focus + .seamless-border {
          height: 2px;
          background-color: var(--terracotta);
        }
        .seamless-input::placeholder {
          color: rgba(15, 42, 68, 0.2);
          font-weight: 300;
        }
      `}</style>
    </div>
  );
}

function SectionHeader({ num, title, sub }: { num: string, title: string, sub: string }) {
  return (
    <div style={{ marginBottom: '100px', borderBottom: '1px solid rgba(15, 42, 68, 0.08)', paddingBottom: '48px' }}>
      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px' }}>{num}. Architectural Standards</div>
      <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, color: 'inherit', marginBottom: '24px', letterSpacing: '-0.03em', lineHeight: 1 }}>{title}</h2>
      <p style={{ fontSize: '20px', color: 'inherit', opacity: 0.5, margin: 0, fontWeight: 300 }}>{sub}</p>
    </div>
  );
}

function SeamlessInput({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
      <label style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cool-muted)', letterSpacing: '0.2em' }}>{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        className="seamless-input"
        style={{ 
          padding: '16px 0', 
          border: 'none', 
          fontSize: '18px', 
          color: 'var(--midnight-navy)', 
          outline: 'none', 
          background: 'none',
          width: '100%'
        }} 
      />
      <div className="seamless-border" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)', transition: 'all 0.4s ease' }} />

    </div>
  );
}

function ColorPill({ color, label, opacity = 1, isWhite = false }: { color: string, label: string, opacity?: number, isWhite?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ 
        width: '12px', 
        height: '12px', 
        borderRadius: '2px', 
        backgroundColor: color, 
        opacity,
        border: isWhite ? '1px solid rgba(15, 42, 68, 0.1)' : 'none'
      }} />
      <span style={{ fontSize: '12px', fontWeight: 600 }}>{label}</span>
    </div>
  );
}
