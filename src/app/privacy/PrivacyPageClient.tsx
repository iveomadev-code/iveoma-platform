'use client';

import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

const premiumEase = [0.22, 1, 0.36, 1] as any;

export default function PrivacyPageClient() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <NavBar />

      {/* ─── HERO — DATA GOVERNANCE ─── */}
      <section style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        color: '#FFFFFF', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="section-pad hero-section-pad">
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--terracotta)', letterSpacing: '0.25em', display: 'block', marginBottom: '24px' }}
          >
            Data Protection Policy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: premiumEase }}
            style={{ 
              fontFamily: 'var(--font-heading-monumental), serif', 
              fontSize: 'clamp(40px, 8vw, 84px)', 
              fontWeight: 700, 
              lineHeight: 0.95, 
              letterSpacing: '-0.04em',
              margin: 0
            }}
          >
            Data Governance & <br /><span style={{ color: 'var(--terracotta)', fontWeight: 300 }}>Privacy Protocol.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
            style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '48px', lineHeight: 1.3, maxWidth: '720px' }}
          >
            Transparency is the foundation of our institutional trust. We protect your data with the same discipline we apply to our development interventions.
          </motion.p>
        </div>
      </section>

      {/* ─── POLICY CONTENT — EDITORIAL LAYOUT ─── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="section-pad">
        <div className="container">
          <div className="policy-grid">
            
            {/* Sidebar — Quick Navigation */}
            <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }} className="policy-sidebar">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ padding: '32px', backgroundColor: 'var(--ice-blue)', borderRadius: '12px' }}>
                  <Shield size={24} color="var(--terracotta)" style={{ marginBottom: '20px' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '12px' }}>Institutional Integrity</h4>
                  <p style={{ fontSize: '13px', color: 'rgba(15, 42, 68, 0.6)', lineHeight: 1.5, margin: 0 }}>IDN strictly adheres to NDPR 2019 standards.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {['Institutional Commitment', 'Data Collection', 'Utilization', 'Security Protocols', 'Governance Rights'].map((item, i) => (
                    <div key={i} style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cool-muted)', letterSpacing: '0.1em', cursor: 'pointer', transition: 'color 0.3s ease' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Policy Narrative */}
            <article style={{ display: 'flex', flexDirection: 'column', gap: '80px' }} className="policy-article">
              
              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>1. Institutional Commitment</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>
                  The Iveoma Development Network (IDN) is committed to processing your personal data in strict accordance with the Nigeria Data Protection Regulation (NDPR) 2019 and global data privacy standards. This protocol outlines how we collect, safeguard, and utilize the information of our partners, donors, and digital visitors.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>2. Data Collection Parameters</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', marginBottom: '32px' }}>
                  We operate on a principle of data minimization, collecting only what is necessary to fulfill our developmental mandate. This includes:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="policy-2col-grid">
                  <div style={{ padding: '40px', border: '1px solid rgba(15, 42, 68, 0.08)', borderRadius: '4px' }}>
                    <Lock size={20} color="var(--terracotta)" style={{ marginBottom: '16px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '12px' }}>Partnership & Donation</h4>
                    <p style={{ fontSize: '14px', color: 'rgba(15, 42, 68, 0.6)', margin: 0 }}>Names, institutional affiliations, and secure transaction data for philanthropic investments.</p>
                  </div>
                  <div style={{ padding: '40px', border: '1px solid rgba(15, 42, 68, 0.08)', borderRadius: '4px' }}>
                    <Eye size={20} color="var(--terracotta)" style={{ marginBottom: '16px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '12px' }}>Digital Infrastructure</h4>
                    <p style={{ fontSize: '14px', color: 'rgba(15, 42, 68, 0.6)', margin: 0 }}>IP addresses and browser types utilized to optimize platform security and performance.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>3. Utilization of Information</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', marginBottom: '24px' }}>
                  Your data is strictly utilized to advance our operational pillars. We use this information to:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {['Process and verify strategic co-investments and grassroots donations.', 'Distribute verified field reports, case studies, and institutional updates.', 'Ensure full compliance with the Corporate Affairs Commission (CAC) and allied regulatory bodies.'].map((text, i) => (
                    <li key={i} style={{ display: 'flex', gap: '16px', fontSize: '16px', color: 'rgba(15, 42, 68, 0.7)' }}>
                      <ChevronRight size={18} color="var(--terracotta)" /> {text}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>4. Data Security & Third-Party Protocols</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>
                  We do not sell, trade, or compromise partner data. Your information is never shared with third parties without your explicit consent, except where mandated by Nigerian law or required by secure, vetted financial processing partners.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>5. Your Governance Rights</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>
                  Under the NDPR, you retain absolute authority over your personal data. You have the right to request a comprehensive record of the data we hold, demand rectification of inaccuracies, or request total erasure of your profile from our systems.
                </p>
              </section>

              <div style={{ padding: '64px', backgroundColor: 'var(--midnight-navy)', borderRadius: '16px', color: '#FFFFFF' }} className="policy-contact-box">
                <FileText size={32} color="var(--action-gold)" style={{ marginBottom: '32px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Contact our Data Protection Office</h3>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.3, marginBottom: '32px' }}>
                  For inquiries regarding our data governance, or to exercise your rights as a data subject, please contact our administrative board at:
                </p>
                <a href="mailto:privacy@iveomadevelopmentnetwork.org" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--action-gold)', textDecoration: 'none', wordBreak: 'break-all' }}>privacy@iveomadevelopmentnetwork.org</a>
              </div>

            </article>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .policy-grid {
          display: grid;
          grid-template-columns: 1fr 2.5fr;
          gap: 80px;
        }
        @media (max-width: 1023px) {
          .policy-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
          .policy-sidebar { display: none !important; }
          .policy-article { gap: 64px !important; }
          .policy-article section h2 { font-size: 24px !important; }
          .policy-2col-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .policy-contact-box { padding: 40px !important; }
        }
      `}</style>
    </div>
  );
}
