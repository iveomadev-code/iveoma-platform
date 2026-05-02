'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Search } from 'lucide-react';
import Link from 'next/link';

const cinematicSpring = { type: 'spring' as const, stiffness: 80, damping: 20 };
const hoverSpring = { type: 'spring' as const, stiffness: 300, damping: 25 };

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Programmes', href: '/programmes' },
  { name: 'Impact', href: '/impact' },
  { name: 'Partner', href: '/partner' },
  { name: 'Contact', href: '/contact' }
];

function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0F2A44', // Opaque Deep Authority (#0F2A44)
            backdropFilter: 'blur(30px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(20px, 5vw, 40px)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'clamp(20px, 4vw, 40px)',
              right: 'clamp(20px, 4vw, 40px)',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-accent), sans-serif',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            Close <X size={20} strokeWidth={1.5} />
          </button>

          <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, ...cinematicSpring }}
            >
              <div style={{ 
                fontFamily: 'var(--font-body), sans-serif', 
                fontSize: '12px', 
                color: '#C9A96E', 
                textTransform: 'uppercase', 
                letterSpacing: '0.4em',
                marginBottom: '40px'
              }}>
                Institutional Search
              </div>
              
              <input
                ref={inputRef}
                type="text"
                placeholder="What are you looking for?"
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading-monumental), sans-serif',
                  textTransform: 'uppercase', 
                  fontSize: 'clamp(28px, 8vw, 64px)',
                  fontWeight: 800,
                  textAlign: 'center',
                  padding: 'clamp(16px, 4vw, 24px) 0',
                  outline: 'none',
                  letterSpacing: '-0.02em',
                }}
              />
              
              <div style={{ 
                marginTop: '40px', 
                color: 'rgba(255,255,255,0.3)', 
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '14px'
              }}>
                Press <span style={{ color: 'rgba(255,255,255,0.6)' }}>ESC</span> to return to the portal
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import Button from './Button';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      const y = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.width = '100%';
    } else {
      const y = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (y) window.scrollTo(0, parseInt(y || '0') * -1);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ height: 100 }}
        animate={{
          height: scrolled ? 'clamp(56px, 8vh, 80px)' : 'clamp(64px, 10vh, 100px)',
          backgroundColor: scrolled ? 'rgba(15, 42, 68, 0.85)' : 'rgba(15, 42, 68, 0)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          paddingTop: 'env(safe-area-inset-top)',
        }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: `0 var(--sp-container) ${scrolled ? '16px' : '20px'}`,
          boxSizing: 'border-box',
        }}
      >
        {/* Architectural Noise Texture Overlay (Only visible when scrolled) */}
        {scrolled && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.02,
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              zIndex: -1,
            }}
          />
        )}

        {/* Logo Section */}
        <Link href="/" style={{ display: 'flex', alignItems: 'flex-end', textDecoration: 'none', position: 'relative' }}>
          <motion.div
            animate={{ 
              scale: scrolled ? 0.85 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            style={{ position: 'relative', zIndex: 2, padding: '10px 15px 0 0' }}
          >
            <img 
              src="/images/logo.svg" 
              alt="Iveoma" 
              style={{ height: 'clamp(48px, 9vw, 72px)', width: 'auto', display: 'block' }} 
            />
          </motion.div>
          
          {!scrolled && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'flex-end', gap: '56px' }}>
          <div className="nav-link-group" style={{ display: 'flex', alignItems: 'flex-end', gap: '40px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="btn-link on-dark"
                style={{
                   fontSize: '11px',
                   letterSpacing: '0.18em',
                   padding: '12px 0'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="cta-group" style={{ display: 'flex', alignItems: 'flex-end', gap: '32px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '32px' }}>
            {/* Minimalist Search Icon Entry */}
            <motion.button
              onClick={() => setSearchOpen(true)}
              whileHover={{ scale: 1.1, color: '#C9A96E' }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                transition: 'color 0.3s ease',
              }}
            >
              <Search size={18} strokeWidth={1.5} />
            </motion.button>

            {/* Primary Institutional CTA */}
            <Button 
              label="Donate"
              href="/funding"
              variant="primary"
              context="on-dark"
              icon={<Heart size={14} fill="currentColor" />}
            />
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-nav-toggle" style={{ display: 'none', alignItems: 'center', gap: 'clamp(12px, 3vw, 24px)' }}>
          <div className="tablet-cta">
             <Button 
              label="Donate"
              href="/funding"
              variant="primary"
              context="on-dark"
              showIcon={false}
              className="compact-btn"
            />
          </div>
          <button
            onClick={() => setSearchOpen(true)}
            className="mobile-search-btn"
            style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '8px' }}
          >
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '8px' }}
          >
            <Menu size={30} />
          </button>
        </div>

        <style jsx>{`
          @media (max-width: 1279px) {
            .desktop-nav { gap: 32px !important; }
            .nav-link-group { gap: 24px !important; }
          }
          @media (max-width: 1023px) {
            .desktop-nav { display: none !important; }
            .mobile-nav-toggle { display: flex !important; }
          }
          @media (max-width: 639px) {
            .tablet-cta { display: none !important; }
          }
          @media (max-width: 374px) {
            .mobile-search-btn { display: none !important; }
          }
        `}</style>
      </motion.nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cinematic Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#0F2A44', // Fully Opaque Deep Authority
              backdropFilter: 'blur(20px)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(20px, 4vw, 24px) var(--sp-container)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'clamp(64px, 10vh, 100px)', paddingTop: 'env(safe-area-inset-top)' }}>
              <img src="/images/logo.svg" alt="Iveoma" style={{ height: 'clamp(48px, 9vw, 72px)' }} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={36} />
              </button>
            </div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              style={{ 
                marginTop: 'clamp(32px, 6vh, 80px)', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'clamp(20px, 4vh, 40px)' 
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
                    textTransform: 'uppercase', 
                    fontSize: 'clamp(26px, 8vw, 36px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: cinematicSpring }
                    }}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
              
              <Button 
                label="Donate Now"
                href="/funding"
                variant="primary"
                context="on-dark"
                icon={<Heart size={16} fill="currentColor" />}
                className="w-full-btn"
                onClick={() => setMobileMenuOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
