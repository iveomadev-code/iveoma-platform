'use client';

import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Landmark, Scale, FileText, AlertCircle, ChevronRight, Gavel } from 'lucide-react';

const premiumEase = [0.22, 1, 0.36, 1] as any;

export default function TermsPageClient() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <NavBar />

      {/* ─── HERO — INSTITUTIONAL TERMS ─── */}
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
            style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--action-gold)', letterSpacing: '0.25em', display: 'block', marginBottom: '24px' }}
          >
            Terms of Engagement
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
            Institutional <br /><span style={{ color: 'var(--action-gold)', fontWeight: 300 }}>Terms & Conditions.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
            style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '48px', lineHeight: 1.3, maxWidth: '720px' }}
          >
            The frameworks and operational agreements guiding our digital platforms, strategic partnerships, and philanthropic capital.
          </motion.p>
        </div>
      </section>

      {/* ─── TERMS CONTENT ─── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="section-pad">
        <div className="container">
          <div className="terms-grid">
            
            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }} className="policy-sidebar">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ padding: '32px', backgroundColor: '#F8FAFC', borderLeft: '4px solid var(--action-gold)', borderRadius: '4px' }}>
                  <Gavel size={24} color="var(--midnight-navy)" style={{ marginBottom: '20px' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '12px' }}>Operational Framework</h4>
                  <p style={{ fontSize: '13px', color: 'rgba(15, 42, 68, 0.6)', lineHeight: 1.5, margin: 0 }}>Governed by CAMA and the laws of the Federal Republic of Nigeria.</p>
                </div>
              </div>
            </aside>

            {/* Main Terms */}
            <article style={{ display: 'flex', flexDirection: 'column', gap: '80px' }} className="policy-article">
              
              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>1. Operational Mandate</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>
                  The Iveoma Development Network is a registered, non-profit, non-governmental entity operating within the Federal Republic of Nigeria. Our digital infrastructure is designed to facilitate transparent capital mobilization, disseminate verified impact metrics, and build strategic partnerships aimed at human capital accumulation and health systems strengthening.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>2. Partnership and Capital Deployment</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', marginBottom: '32px' }}>
                  All philanthropic contributions and strategic investments made through this platform are subjected to rigorous institutional oversight.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="policy-2col-grid">
                  <div style={{ padding: '40px', backgroundColor: 'var(--ice-blue)', borderRadius: '8px' }}>
                    <Landmark size={20} color="var(--midnight-navy)" style={{ marginBottom: '16px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '12px' }}>Purpose-Bound Capital</h4>
                    <p style={{ fontSize: '14px', color: 'rgba(15, 42, 68, 0.6)', margin: 0 }}>Funds are utilized strictly for intervention pillars: education, health, and digital capacity.</p>
                  </div>
                  <div style={{ padding: '40px', backgroundColor: 'rgba(184, 84, 59, 0.05)', borderRadius: '8px', border: '1px solid rgba(184, 84, 59, 0.1)' }}>
                    <AlertCircle size={20} color="var(--terracotta)" style={{ marginBottom: '16px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--terracotta)', marginBottom: '12px' }}>No-Refund Protocol</h4>
                    <p style={{ fontSize: '14px', color: 'rgba(15, 42, 68, 0.6)', margin: 0 }}>Due to rapid-deployment nature, all contributions are final and non-refundable once allocated.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>3. Intellectual Property and Editorial Integrity</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>
                  We are an evidence-driven organization. All field photography, impact reports, demographic data, and editorial content published on this platform are the exclusive intellectual property of the Iveoma Development Network or its strategic partners. You may not reproduce, scrape, or misrepresent our field data for commercial purposes.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>4. Accountability and Governance</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>
                  We operate in alignment with the regulatory frameworks of the Corporate Affairs Commission (CAMA) governing Incorporated Trustees and NGOs in Nigeria. We reserve the right to decline partnerships or capital that conflict with our ethical standards or national security interests.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>5. Limitation of Liability</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.7)', margin: 0 }}>
                  While we ensure our digital infrastructure is highly secure, the Iveoma Development Network is not liable for disruptions caused by exogenous network failures, third-party payment gateway downtimes, or unauthorized breaches beyond our advanced protocols.
                </p>
              </section>

              <section style={{ padding: '64px', backgroundColor: 'var(--ice-blue)', borderRadius: '16px' }} className="policy-contact-box">
                <Scale size={32} color="var(--midnight-navy)" style={{ marginBottom: '32px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--midnight-navy)', marginBottom: '16px' }}>Policy Evolution</h3>
                <p style={{ fontSize: '16px', color: 'rgba(15, 42, 68, 0.6)', lineHeight: 1.3, margin: 0 }}>
                  As our operational footprint expands, these terms may be updated to reflect new regulatory requirements. Continued engagement constitutes acceptance of our active institutional terms.
                </p>
              </section>

            </article>
          </div>
        </div>
      </section>

      <Footer />
      <style jsx global>{`
        .terms-grid {
          display: grid;
          grid-template-columns: 1fr 2.5fr;
          gap: 80px;
        }
        @media (max-width: 1023px) {
          .terms-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
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
