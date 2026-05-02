'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const premiumEase = [0.22, 1, 0.36, 1] as any;

/* ─── Institutional Brand Tones ─── */
const BRAND = {
  NAVY: '#0F2A44',
  GOLD: '#C9A96E',
  RUST: '#B8543B',
  WHITE: '#FFFFFF'
};

const BrandIcons = {
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  TwitterX: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.482h2.039L6.486 3.24H4.298l13.311 17.395z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><path d="m9.75 15.02 5.75-3.02-5.75-3.02v6.04z"/>
    </svg>
  )
};

function SocialIcon({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, color: BRAND.GOLD }}
      whileTap={{ scale: 0.9 }}
      style={{
        color: 'rgba(255,255,255,0.4)',
        transition: 'color 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon />
    </motion.a>
  );
}

function FooterLink({ label, small, href = "#" }: { label: string, small?: boolean, href?: string }) {
  return (
    <Link
      href={href}
      className="btn-link on-dark"
      style={{
        fontSize: small ? '11px' : '13px',
        letterSpacing: '0.12em',
        padding: '8px 0',
        display: 'inline-flex'
      }}
    >
      {label}
    </Link>
  );
}

import Link from 'next/link';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0A1B2C', // Deepest Navy
        padding: '120px 0 40px',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--sp-container)' }}>
        
        {/* Top Grid */}
        <motion.div 
          className="footer-top-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '64px', marginBottom: '80px' }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <div style={{ marginBottom: '32px' }}>
              <img src="/images/logo.svg" alt="Iveoma" style={{ maxWidth: '160px', height: 'auto' }} />
            </div>
            <p style={{ 
              fontSize: '15px', 
              lineHeight: 1.7, 
              color: 'rgba(255,255,255,0.6)', 
              maxWidth: '260px', 
              margin: '0 0 32px' 
            }}>
              Advancing Human and Community Development through institutional strategic foresight and administrative rigor.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <SocialIcon icon={BrandIcons.Facebook} href="https://www.facebook.com/IveomaDevelopmentNetwork" />
              <SocialIcon icon={BrandIcons.TwitterX} href="https://x.com/IveomaNetwork" />
              <SocialIcon icon={BrandIcons.Instagram} href="https://www.instagram.com/iveomadevelopmentnetwork?igsh=MTM5eG9jZWdwbHZuZg==" />
              <SocialIcon icon={BrandIcons.Youtube} href="https://www.youtube.com/@IveomaDevelopmentNetwork" />
            </div>
          </motion.div>

          {/* Nav Columns */}
          <motion.div variants={itemVariants}>
            <h4 style={{ 
              fontFamily: 'var(--font-heading-monumental)',
              fontSize: '11px', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              color: BRAND.RUST, 
              marginBottom: '32px' 
            }}>Our Portals</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <FooterLink label="Education Hub" href="/programmes#education" />
              <FooterLink label="Health Systems" href="/programmes#health" />
              <FooterLink label="Youth Empowerment" href="/programmes#youth" />
              <FooterLink label="Rural Futures" href="/programmes#rural" />
            </nav>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 style={{ 
              fontFamily: 'var(--font-heading-monumental)',
              fontSize: '11px', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              color: BRAND.RUST, 
              marginBottom: '32px' 
            }}>Institutional</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <FooterLink label="About the Network" href="/about" />
              <FooterLink label="Impact Reports" href="/impact" />
              <FooterLink label="Strategic Pillars" href="/programmes" />
              <FooterLink label="Governance" href="/about" />
            </nav>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 style={{ 
              fontFamily: 'var(--font-heading-monumental)',
              fontSize: '11px', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              color: BRAND.RUST, 
              marginBottom: '32px' 
            }}>Action</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <FooterLink label="Donate & Support" href="/funding" />
              <FooterLink label="Partner with IDN" href="/partner" />
              <FooterLink label="Volunteer Core" href="/contact" />
              <FooterLink label="Inquiry Portal" href="/contact" />
            </nav>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="footer-bottom-row">
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
            © 2026 Iveoma Development Network. All administrative rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <FooterLink label="Privacy Protocol" small href="/privacy" />
            <FooterLink label="Institutional Terms" small href="/terms" />
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-top-grid { grid-template-columns: 1fr 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 768px) {
          .footer-top-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-bottom-row { flex-direction: column; align-items: flex-start; gap: 24px; }
        }
      `}</style>
    </footer>
  );
}
