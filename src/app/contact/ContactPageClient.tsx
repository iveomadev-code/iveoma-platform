'use client';

import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, ArrowRight, Users, Send } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/Button';

const premiumEase = [0.22, 1, 0.36, 1] as any;

/* ─── Brand SVG Nodes ─── */
const Brands = {
  facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
  )
};

/* ─── Helper: Social Node ─── */
function SocialNode({ icon, href }: { icon: 'facebook' | 'instagram' | 'twitter' | 'youtube', href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const IconComponent = Brands[icon];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: isHovered ? 'var(--terracotta)' : 'rgba(15, 42, 68, 0.05)',
        color: isHovered ? '#FFFFFF' : '#0F2A44',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <IconComponent />
    </motion.a>
  );
}

/* ─── Shared Component: Section Label ─── */
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

function SeamlessField({ 
  label, 
  placeholder, 
  name,
  value,
  onChange,
  type = "text", 
  isTextarea = false,
  required = true
}: { 
  label: string, 
  placeholder: string, 
  name: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  type?: string, 
  isTextarea?: boolean,
  required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
      <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#7AA3BE', letterSpacing: '0.1em' }}>{label}</label>
      {isTextarea ? (
        <textarea 
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4} 
          placeholder={placeholder} 
          className="seamless-input-contact"
          style={{ padding: '16px 0', border: 'none', fontSize: '18px', color: '#0F2A44', outline: 'none', background: 'none', resize: 'none', width: '100%' }} 
        />
      ) : (
        <input 
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          type={type} 
          placeholder={placeholder} 
          className="seamless-input-contact"
          style={{ padding: '16px 0', border: 'none', fontSize: '18px', color: '#0F2A44', outline: 'none', background: 'none', width: '100%' }} 
        />
      )}
      <div className="seamless-border-contact" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)', transition: 'all 0.4s ease' }} />
    </div>
  );
}


export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          organisation: '',
          email: '',
          subject: 'General Inquiry',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      setStatusMessage('A secure connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <NavBar />

      {/* ─── 1. HERO — INSTITUTIONAL PRESENCE ─── */}
      <section style={{ 
        backgroundColor: 'var(--midnight-navy)', 
        color: '#FFFFFF', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="section-pad hero-section-pad">
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-split-grid">
            <div>
              <SectionLabel text="Contact" color="var(--terracotta)" />
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
                <span style={{ color: '#FFFFFF' }}>Direct Access.</span> <br />
                <span style={{ color: 'var(--terracotta)', fontWeight: 300 }}>Institutional Presence.</span>
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
                We maintain active communication channels for institutional partners, government agencies, and community stakeholders across our operational domains.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. CONTACT CHANNELS — THE ARCHITECTURE ─── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="section-pad">
        <div className="container">
          <div className="contact-grid-responsive">
            
            {/* Physical Presence — Ebonyi HQ */}
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(184, 84, 59, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <MapPin size={20} color="var(--terracotta)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '24px', fontWeight: 700, color: 'var(--sky-blue)', marginBottom: '24px' }}>Ebonyi Headquarters</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(15, 42, 68, 0.7)', margin: 0, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                Court Area, Okposi<br />
                Ohaozara LGA, Ebonyi State<br />
                Nigeria
              </p>
            </div>

            {/* Digital Channels */}
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(184, 84, 59, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <Mail size={20} color="var(--terracotta)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '24px', fontWeight: 700, color: 'var(--sky-blue)', marginBottom: '24px' }}>Digital Inquiry</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(15, 42, 68, 0.7)', margin: 0, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                Inquiries: <a href="mailto:info@iveomadevelopmentnetwork.org" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontWeight: 600 }}>info@iveomadevelopmentnetwork.org</a><br />
                Partnerships: <a href="mailto:partner@iveomadevelopmentnetwork.org" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontWeight: 600 }}>partner@iveomadevelopmentnetwork.org</a>
              </p>
            </div>

            {/* Direct Dial */}
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(184, 84, 59, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <Phone size={20} color="var(--terracotta)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '24px', fontWeight: 700, color: 'var(--sky-blue)', marginBottom: '24px' }}>Direct Dial</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(15, 42, 68, 0.7)', margin: 0, wordBreak: 'break-word', overflowWrap: 'anywhere', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="tel:+2348069233093" style={{ color: 'rgba(15, 42, 68, 0.7)', textDecoration: 'none' }}>+234 (0) 806 923 3093</a>
                <a href="tel:+2348170707815" style={{ color: 'rgba(15, 42, 68, 0.7)', textDecoration: 'none' }}>+234 (0) 817 070 7815</a>
                <a href="tel:+2348164724362" style={{ color: 'rgba(15, 42, 68, 0.7)', textDecoration: 'none' }}>+234 (0) 816 472 4362</a>
              </p>
            </div>

            {/* Digital Ecosystem — Followership */}
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(184, 84, 59, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <Users size={20} color="var(--terracotta)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading-monumental), serif', fontSize: '24px', fontWeight: 700, color: 'var(--sky-blue)', marginBottom: '24px' }}>Ecosystem</h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                <SocialNode icon="facebook" href="https://www.facebook.com/IveomaDevelopmentNetwork" />
                <SocialNode icon="instagram" href="https://www.instagram.com/iveomadevelopmentnetwork?igsh=MTM5eG9jZWdwbHZuZg==" />
                <SocialNode icon="twitter" href="https://x.com/IveomaNetwork" />
                <SocialNode icon="youtube" href="https://www.youtube.com/@IveomaDevelopmentNetwork" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. SEAMLESS INQUIRY PORTAL ─── */}
      <section style={{ backgroundColor: '#F0F5FA' }} className="section-pad">
        <div className="container">
          <div className="inquiry-grid">
            <div>
              <SectionLabel text="Inquiry Form" color="var(--terracotta)" />
              <h2 style={{ 
                fontFamily: 'var(--font-heading-monumental), serif', 
                fontSize: 'clamp(32px, 8vw, 56px)', 
                fontWeight: 700, 
                color: 'var(--primary)', 
                lineHeight: 1.05,
                marginBottom: '40px',
                letterSpacing: '-0.03em'
              }}>
                Submit an institutional <br />inquiry.
              </h2>
              <p style={{ fontSize: '18px', lineHeight: 1.3, color: 'rgba(15, 42, 68, 0.6)', maxWidth: '440px', margin: 0 }}>
                For technical collaborations, archival requests, or general information, please use the secure portal below. Our team evaluates and routes every submission within 24–48 hours.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(184, 84, 59, 0.15)',
                    boxShadow: '0 20px 40px rgba(15, 42, 68, 0.05)',
                    borderRadius: '16px',
                    padding: '48px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px'
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(184, 84, 59, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Send size={24} color="var(--terracotta)" />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading-monumental), serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      marginBottom: '12px'
                    }}>
                      Inquiry Received
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: 1.5,
                      color: 'rgba(15, 42, 68, 0.6)',
                      maxWidth: '380px',
                      margin: 0
                    }}>
                      Thank you for contacting the Iveoma Development Network. Your inquiry has been securely routed and is under review. Our team will correspond within 24 to 48 hours.
                    </p>
                  </div>
                  <Button 
                    label="Submit Another Inquiry"
                    onClick={() => setSubmitStatus('idle')}
                    variant="secondary"
                    context="on-light"
                    showIcon={false}
                  />
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="form-row-2col">
                    <SeamlessField 
                      label="Full Name" 
                      placeholder="Institutional Representative" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <SeamlessField 
                      label="Organisation" 
                      placeholder="Institution Name" 
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleInputChange}
                      required={false}
                    />
                  </div>
                  <SeamlessField 
                    label="Email Address" 
                    placeholder="representative@institution.org" 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#7AA3BE', letterSpacing: '0.1em' }}>Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="seamless-select-contact"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Archival & Media Requests">Archival & Media Requests</option>
                      <option value="Technical Collaboration">Technical Collaboration</option>
                      <option value="Career Opportunities">Career Opportunities</option>
                    </select>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(15, 42, 68, 0.1)' }} />
                  </div>

                  <SeamlessField 
                    label="Message" 
                    placeholder="How can we assist your inquiry?" 
                    isTextarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  
                  {submitStatus === 'error' && (
                    <div style={{ 
                      padding: '16px', 
                      backgroundColor: 'rgba(239, 68, 68, 0.05)', 
                      border: '1px solid rgba(239, 68, 68, 0.15)', 
                      borderRadius: '8px', 
                      color: '#DC2626', 
                      fontSize: '14px',
                      lineHeight: 1.5
                    }}>
                      {statusMessage}
                    </div>
                  )}

                  <div style={{ marginTop: '20px' }}>
                    <Button 
                      label={isSubmitting ? "Routing Inquiry..." : "Submit Inquiry"}
                      type="submit"
                      variant="primary"
                      context="on-light"
                      icon={<ArrowRight size={18} />}
                    />
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <style jsx global>{`
        .contact-grid-responsive {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 64px;
        }
        .inquiry-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 120px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .contact-grid-responsive { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
          .inquiry-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
        }
        @media (max-width: 639px) {
          .contact-grid-responsive { grid-template-columns: 1fr !important; }
          .form-row-2col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-descriptor { border-left: none !important; padding-left: 0 !important; margin-top: 32px !important; }
        }
        .seamless-input-contact:focus + .seamless-border-contact {
          height: 2px;
          background-color: var(--terracotta);
        }
        .seamless-input-contact::placeholder {
          color: rgba(15, 42, 68, 0.2);
        }
        .seamless-select-contact {
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
        @media (max-width: 1023px) {
          .hero-descriptor { 
            border-left: none !important; 
            padding-left: 0 !important; 
            margin-top: 32px !important; 
          }
        }
      `}</style>
    </div>
  );
}
