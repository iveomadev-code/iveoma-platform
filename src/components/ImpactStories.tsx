'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Plus, SlidersHorizontal, Check } from 'lucide-react';
import Link from 'next/link';

import { stories, getStorySlug } from '@/data/impactStories';
import Button from './Button';

const easing = [0.22, 1, 0.36, 1] as any;

export default function ImpactStories() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterTag, setFilterTag] = useState('All');
  const [sortBy, setBy] = useState('Newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const cardsPerPage = 6;

  // Extract unique tags
  const tags = ['All', ...Array.from(new Set(stories.map(s => s.tag)))];

  // Resize Listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter & Sort Logic
  const filteredStories = stories.filter(s => filterTag === 'All' || s.tag === filterTag);
  
  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
    if (sortBy === 'Newest') return b.num.localeCompare(a.num); // Story 10 > Story 01
    return 0;
  });

  const totalPages = Math.ceil(sortedStories.length / cardsPerPage);
  const paginatedStories = sortedStories.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const handleFilterChange = (tag: string) => {
    setFilterTag(tag);
    setCurrentPage(0);
  };

  return (
    <section id="vault" className="impact-stories-section" style={{ padding: '35px 0 150px 0', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 80px' }} className="container-sp">
        
        <div className="stories-header" style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '24px' }}>
              Evidence Vault
            </span>
            <h2 className="stories-title" style={{ 
              fontFamily: 'var(--font-heading-monumental)', 
              fontSize: 'clamp(36px, 5vw, 72px)', 
              fontWeight: 700, 
              color: 'var(--midnight-navy)', 
              margin: 0,
              lineHeight: 1.0,
              letterSpacing: '-0.03em'
            }}>
              Impact Stories.
            </h2>
          </div>

          {/* Intelligence Toolbar */}
          <div className="toolbar-container" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            
            {/* Desktop-Only Chips */}
            <div className="desktop-filters" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleFilterChange(tag)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '100px',
                    border: '1px solid',
                    borderColor: filterTag === tag ? 'var(--midnight-navy)' : 'rgba(15,42,68,0.1)',
                    backgroundColor: filterTag === tag ? 'var(--midnight-navy)' : 'transparent',
                    color: filterTag === tag ? '#FFFFFF' : 'var(--midnight-navy)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Mobile/Tablet Trigger */}
            <button
              className="mobile-filter-trigger"
              onClick={() => setIsFilterSheetOpen(true)}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                borderRadius: '100px',
                backgroundColor: 'var(--midnight-navy)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(15, 42, 68, 0.1)'
              }}
            >
              <SlidersHorizontal size={16} />
              <span>Filter & Sort {filterTag !== 'All' && `• ${filterTag}`}</span>
            </button>

            {/* Sort Toggle (Desktop) */}
            <div className="desktop-sort" style={{ position: 'relative' }}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 24px',
                  borderRadius: '100px',
                  background: 'rgba(15,42,68,0.03)',
                  border: '1px solid rgba(15,42,68,0.1)',
                  color: 'var(--midnight-navy)',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer'
                }}
              >
                <span>Sort: {sortBy}</span>
                <Plus size={14} style={{ transform: isSortOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.4s ease' }} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: easing }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '12px',
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      padding: '8px',
                      zIndex: 100,
                      minWidth: '160px'
                    }}
                  >
                    {['Newest', 'A-Z'].map(option => (
                      <button
                        key={option}
                        onClick={() => { setBy(option); setIsSortOpen(false); }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: sortBy === option ? 'rgba(15,42,68,0.05)' : 'transparent',
                          color: 'var(--midnight-navy)',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* STANDARD UNIFORM GRID */}
        <div className="impact-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '24px' 
        }}>
          {paginatedStories.map((story, i) => (
            <StoryCard 
              key={story.num} 
              story={story} 
            />
          ))}
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
            <button 
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => prev - 1)}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '1px solid rgba(15,42,68,0.1)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 0 ? 0.3 : 1,
                color: 'var(--midnight-navy)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              onMouseEnter={(e) => { if(currentPage !== 0) { e.currentTarget.style.backgroundColor = 'var(--midnight-navy)'; e.currentTarget.style.color = '#FFFFFF'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--midnight-navy)'; }}
            >
              <ChevronLeft size={24} />
            </button>

            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--midnight-navy)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Page <span style={{ color: 'var(--terracotta)' }}>{currentPage + 1}</span> of {totalPages}
            </div>

            <button 
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(prev => prev + 1)}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '1px solid rgba(15,42,68,0.1)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages - 1 ? 0.3 : 1,
                color: 'var(--midnight-navy)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              onMouseEnter={(e) => { if(currentPage !== totalPages - 1) { e.currentTarget.style.backgroundColor = 'var(--midnight-navy)'; e.currentTarget.style.color = '#FFFFFF'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--midnight-navy)'; }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* MOBILE FILTER BOTTOM SHEET */}
      <AnimatePresence>
        {isFilterSheetOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 4000 }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterSheetOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 42, 68, 0.7)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: easing }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '32px 24px 48px 24px',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ width: '40px', height: '4px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px', margin: '0 auto 32px auto' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading-monumental)', fontSize: '20px', fontWeight: 800, color: 'var(--midnight-navy)', margin: 0 }}>Filter & Sort</h3>
                <button 
                  onClick={() => setIsFilterSheetOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--midnight-navy)', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div style={{ marginBottom: '40px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(15,42,68,0.4)', marginBottom: '16px' }}>Categories</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleFilterChange(tag)}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '100px',
                        border: '1px solid',
                        borderColor: filterTag === tag ? 'var(--midnight-navy)' : 'rgba(15,42,68,0.1)',
                        backgroundColor: filterTag === tag ? 'var(--midnight-navy)' : 'transparent',
                        color: filterTag === tag ? '#FFFFFF' : 'var(--midnight-navy)',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {tag}
                      {filterTag === tag && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div style={{ marginBottom: '40px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(15,42,68,0.4)', marginBottom: '16px' }}>Sort By</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['Newest', 'A-Z'].map(option => (
                    <button
                      key={option}
                      onClick={() => setBy(option)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: sortBy === option ? 'var(--midnight-navy)' : 'rgba(15,42,68,0.05)',
                        background: sortBy === option ? 'rgba(15,42,68,0.03)' : 'transparent',
                        color: 'var(--midnight-navy)',
                        fontSize: '13px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {option}
                      {sortBy === option && <Check size={16} color="var(--terracotta)" />}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                label="Apply Filters"
                onClick={() => setIsFilterSheetOpen(false)}
                variant="primary"
                context="on-light"
                fullWidth
                showIcon={false}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1023px) {
          .impact-stories-section { padding: var(--sp-section-md) 0 !important; }
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stories-title { font-size: clamp(32px, 8vw, 56px) !important; }
          .desktop-filters, .desktop-sort { display: none !important; }
          .mobile-filter-trigger { display: flex !important; }
          .toolbar-container { width: 100% !important; justify-content: flex-end !important; }
        }
        @media (max-width: 639px) {
          .impact-stories-section { padding: var(--sp-section-sm) 0 !important; }
          .impact-grid { grid-template-columns: 1fr !important; }
          .stories-header { margin-bottom: 40px !important; gap: 24px !important; }
          .stories-title { font-size: clamp(28px, 10vw, 42px) !important; }
          .toolbar-container { gap: 24px !important; justify-content: flex-start !important; }
        }
      `}</style>
    </section>
  );
}

function StoryCard({ story }: { story: any }) {
  const slug = getStorySlug(story.title);
  return (
    <Link href={`/impact/stories/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        whileHover="hover"
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '340px', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          cursor: 'pointer',
          backgroundColor: '#F1F5F9'
        }}
      >
        <motion.img 
          src={story.images[0]} 
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.6, ease: easing }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        
        {/* Overlay Gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,42,68,0.85) 0%, rgba(15,42,68,0.3) 50%, transparent 100%)' }} />

        {/* Static Content */}
        <div style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
            <motion.div
              variants={{ initial: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
              initial="initial"
              style={{ color: '#FFFFFF' }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>

          <div>
            {/* Horizontal Line above info */}
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '16px' }} />

            {/* Tag as plain text label */}
            <div style={{ 
              fontSize: '9px', 
              fontWeight: 800, 
              color: 'var(--terracotta)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em',
              marginBottom: '8px'
            }}>
              {story.tag}
            </div>

            <h4 style={{ 
              fontFamily: 'var(--font-heading-monumental)', 
              fontSize: '18px', 
              color: '#FFFFFF', 
              margin: '0 0 4px 0', 
              lineHeight: 1.1 
            }}>
              {story.title}
            </h4>

            <div style={{ 
              fontSize: '11px', 
              color: 'rgba(255,255,255,0.6)', 
              fontWeight: 500
            }}>
              {story.loc}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
