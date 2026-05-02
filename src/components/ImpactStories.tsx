'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Plus, SlidersHorizontal, Check } from 'lucide-react';

import { stories } from '@/data/impactStories';

const easing = [0.22, 1, 0.36, 1];

export default function ImpactStories() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [heroImageIdx, setHeroImageIdx] = useState(0);
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

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') nextStory();
      if (e.key === 'ArrowLeft') prevStory();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  const nextStory = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % stories.length);
    setHeroImageIdx(0);
  }, [activeIdx]);

  const prevStory = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + stories.length) % stories.length);
    setHeroImageIdx(0);
  }, [activeIdx]);

  const openStory = (idx: number) => {
    setActiveIdx(idx);
    setHeroImageIdx(0);
  };

  // Filter & Sort Logic
  const filteredStories = stories.filter(s => filterTag === 'All' || s.tag === filterTag);
  
  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
    if (sortBy === 'Newest') return b.num.localeCompare(a.num); // Story 07 > Story 01
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
              key={i} 
              story={story} 
              onClick={() => openStory(stories.indexOf(story))} 
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

      {/* OVERLAY: PANEL / BOTTOM SHEET */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 42, 68, 0.75)',
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Content Container */}
            <motion.div
              initial={isMobile ? { y: '100%' } : { x: '100%' }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: '100%' } : { x: '100%' }}
              transition={{ duration: 0.6, ease: easing }}
              className="panel-container"
              style={{
                position: 'absolute',
                top: isMobile ? 'auto' : 0,
                bottom: 0,
                right: 0,
                left: isMobile ? 0 : 'auto',
                width: isMobile ? '100%' : '600px',
                height: isMobile ? '85vh' : '100%',
                backgroundColor: '#FFFFFF',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                borderTopLeftRadius: isMobile ? '24px' : '0',
                borderTopRightRadius: isMobile ? '24px' : '0',
                overflow: 'hidden'
              }}
            >
              {isMobile && (
                <div style={{ width: '40px', height: '4px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px', margin: '16px auto', flexShrink: 0 }} />
              )}

              {/* Story Content Area */}
              <div style={{ flex: 1, overflowY: 'auto' }} className="panel-scroll">
                {/* 1. Hero Image */}
                <div className="panel-hero" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={heroImageIdx + stories[activeIdx].num}
                      src={stories[activeIdx].images[heroImageIdx]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </AnimatePresence>
                  
                  {/* Overlay Meta */}
                  <div className="panel-meta" style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(15,42,68,0.9) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '40px'
                  }}>
                    <h3 style={{ fontFamily: 'var(--font-heading-monumental)', fontSize: '28px', color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: 1.1 }}>
                      {stories[activeIdx].title}
                    </h3>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                      {stories[activeIdx].loc}
                    </div>
                  </div>

                  {/* Close Button Desktop */}
                  {!isMobile && (
                    <button 
                      onClick={() => setActiveIdx(null)}
                      style={{ position: 'absolute', top: '24px', right: '24px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', backdropFilter: 'blur(10px)', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                {/* 2. Thumbnail Strip */}
                {stories[activeIdx].images.length > 1 && (
                  <div style={{ display: 'flex', background: '#F8FAFC', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    {stories[activeIdx].images.map((img, i) => (
                      <button 
                        key={i} 
                        onClick={() => setHeroImageIdx(i)}
                        style={{ 
                          width: '60px', 
                          height: '44px', 
                          padding: 0, 
                          border: 'none', 
                          background: 'none', 
                          cursor: 'pointer', 
                          position: 'relative' 
                        }}
                      >
                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {heroImageIdx === i && (
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: 'var(--terracotta)' }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Content Body */}
                <div className="panel-body" style={{ padding: '48px 40px' }}>
                  {/* 3. Tag */}
                  <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '100px', backgroundColor: 'rgba(184, 84, 59, 0.1)', color: 'var(--terracotta)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '40px' }}>
                    {stories[activeIdx].tag}
                  </div>

                  {/* 4. 2x2 Pillar Grid */}
                  <div className="pillar-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
                    <PillarItem label="The Challenge" text={stories[activeIdx].challenge} />
                    <PillarItem label="Intervention" text={stories[activeIdx].intervention} />
                    <PillarItem label="Outcome" text={stories[activeIdx].outcome} />
                    <PillarItem label="Programme Area" text={stories[activeIdx].prog} />
                  </div>

                  {/* 4b. Institutional Voice (Conditional) */}
                  {(stories[activeIdx] as any).quote && (
                    <div style={{ 
                      marginBottom: '40px', 
                      padding: '32px', 
                      backgroundColor: '#FFF9E5', 
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--midnight-navy)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px', opacity: 0.5 }}>
                        The Philosophy
                      </div>
                      <p style={{ 
                        fontSize: '15px', 
                        lineHeight: 1.7, 
                        color: 'var(--midnight-navy)', 
                        margin: 0, 
                        fontWeight: 500,
                        fontStyle: 'italic',
                        opacity: 0.9,
                        whiteSpace: 'pre-line'
                      }}>
                        "{ (stories[activeIdx] as any).quote }"
                      </p>
                    </div>
                  )}

                  {/* 5. Dark Evidence Block */}
                  <div className="evidence-block" style={{ backgroundColor: 'var(--midnight-navy)', borderRadius: '12px', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {stories[activeIdx].d.map((val, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: 'var(--font-numbers)', fontSize: '24px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>{val}</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.2 }}>
                          {stories[activeIdx].dl[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Footer Navigation */}
              <div className="panel-footer" style={{ padding: '24px 40px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(15,42,68,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Story <span style={{ color: 'var(--midnight-navy)' }}>{String(activeIdx + 1).padStart(2, '0')}</span> of {String(stories.length).padStart(2, '0')}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <NavBtn icon={<ChevronLeft size={20} />} onClick={prevStory} />
                  <NavBtn icon={<ChevronRight size={20} />} onClick={nextStory} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
        @media (max-width: 1024px) {
          .impact-stories-section { padding: 80px 0 100px 0 !important; }
          .container-sp { padding: 0 48px !important; }
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stories-title { font-size: 56px !important; }
          .desktop-filters, .desktop-sort { display: none !important; }
          .mobile-filter-trigger { display: flex !important; }
          .toolbar-container { width: 100% !important; justify-content: flex-end !important; }
        }
        @media (max-width: 768px) {
          .impact-stories-section { padding: 60px 0 80px 0 !important; }
          .container-sp { padding: 0 24px !important; }
          .impact-grid { grid-template-columns: 1fr !important; }
          .stories-header { margin-bottom: 40px !important; gap: 24px !important; }
          .stories-title { font-size: 42px !important; }
          .toolbar-container { gap: 24px !important; justify-content: flex-start !important; }
          
          .panel-body { padding: 32px 24px !important; }
          .pillar-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .panel-meta { padding: 24px !important; }
          .panel-footer { padding: 20px 24px !important; }
          .evidence-block { grid-template-columns: 1fr !important; gap: 24px !important; padding: 24px !important; }
        }
        .panel-scroll::-webkit-scrollbar { width: 6px; }
        .panel-scroll::-webkit-scrollbar-track { background: transparent; }
        .panel-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>
    </section>
  );
}

function StoryCard({ story, onClick }: { story: any, onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
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
  );
}

function PillarItem({ label, text }: { label: string, text: string }) {
  return (
    <div>
      <div style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(15,42,68,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
        {label}
      </div>
      <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--midnight-navy)', margin: 0, fontWeight: 500 }}>
        {text}
      </p>
    </div>
  );
}

function NavBtn({ icon, onClick }: { icon: any, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(15,42,68,0.03)', border: '1px solid rgba(15,42,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--midnight-navy)', transition: 'all 0.3s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--midnight-navy)'; e.currentTarget.style.color = '#FFFFFF'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(15,42,68,0.03)'; e.currentTarget.style.color = 'var(--midnight-navy)'; }}
    >
      {icon}
    </button>
  );
}
