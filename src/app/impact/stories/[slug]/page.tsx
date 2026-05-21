'use client';

import { stories, getStorySlug } from '@/data/impactStories';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Calendar, Play } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React, { useState, useRef, useEffect } from 'react';

export default function StoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const story = stories.find(s => getStorySlug(s.title) === slug);

  if (!story) {
    notFound();
  }

  // Cast arrays to string[] for 100% Type Safety
  const storyVideos = (story.videos || []) as string[];
  const storyImages = (story.images || []) as string[];

  // State management for unified media sections
  const [activeVideo, setActiveVideo] = useState<string>(storyVideos[0] || '');
  const [isVideosExpanded, setIsVideosExpanded] = useState<boolean>(false);
  const [isPhotosExpanded, setIsPhotosExpanded] = useState<boolean>(false);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync native browser dialog with lightbox React state
  useEffect(() => {
    if (lightboxPhotoIndex !== null) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [lightboxPhotoIndex]);

  // Accessibility & Keyboard support for Lightbox
  useEffect(() => {
    if (lightboxPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxPhotoIndex((prev) => {
          if (prev === null) return null;
          return (prev + 1) % storyImages.length;
        });
      } else if (e.key === 'ArrowLeft') {
        setLightboxPhotoIndex((prev) => {
          if (prev === null) return null;
          return (prev - 1 + storyImages.length) % storyImages.length;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxPhotoIndex, storyImages.length]);

  // Media presence checks
  const hasVideos = storyVideos.length > 0;
  const hasPhotos = storyImages.length > 0;

  // Secondary video logic
  const secondaryVideos = storyVideos.slice(1);
  const displaySecondaryVideos = isVideosExpanded 
    ? secondaryVideos 
    : secondaryVideos.slice(0, 2);

  // Handle clicking outside centered image to close lightbox
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      setLightboxPhotoIndex(null);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      {/* ─── Back to Impact Header ─── */}
      <section style={{ backgroundColor: 'var(--midnight-navy)', padding: '120px 0 30px 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <Link 
            href="/impact" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none', 
              fontSize: '13px', 
              fontWeight: 600,
              transition: 'color 0.3s ease'
            }}
            className="back-btn"
          >
            <ChevronLeft size={16} />
            <span>Back to Impact</span>
          </Link>
        </div>
      </section>

      {/* ─── Story Main Section ─── */}
      <main style={{ flex: 1, padding: '60px 0 120px 0', backgroundColor: '#FCFDFE' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Tag & Meta */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 800, 
              color: 'var(--terracotta)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em' 
            }}>
              {story.tag}
            </span>
          </div>

          {/* Title (H1) */}
          <h1 style={{ 
            fontFamily: 'var(--font-heading-monumental), serif', 
            fontSize: 'clamp(32px, 5vw, 56px)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            color: 'var(--midnight-navy)', 
            margin: '0 0 20px 0',
            letterSpacing: '-0.02em'
          }}>
            {story.title}
          </h1>

          {/* Metadata line (Location + Year) */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '24px', 
            fontSize: '14px', 
            color: 'rgba(15, 42, 68, 0.6)', 
            fontWeight: 500,
            marginBottom: '48px',
            borderBottom: '1px solid rgba(15, 42, 68, 0.08)',
            paddingBottom: '24px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} style={{ color: 'var(--terracotta)' }} />
              {story.loc}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} style={{ color: 'var(--terracotta)' }} />
              {story.date}
            </span>
          </div>

          {/* Story Primary Image */}
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '16 / 9', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 20px 40px rgba(15, 42, 68, 0.05)',
            marginBottom: '48px',
            backgroundColor: '#F1F5F9'
          }}>
            <img 
              src={storyImages[0]} 
              alt={story.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* Layout Columns: Prose Content */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '60px' 
          }} className="story-layout-grid">
            
            {/* Prose Body & Blockquote */}
            <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
              
              <div style={{ 
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '17px', 
                lineHeight: 1.7, 
                color: 'rgba(15, 42, 68, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <p>{story.challenge}</p>
                <p>{story.intervention}</p>
                <p>{story.outcome}</p>
              </div>

              {/* Optional pull quote (blockquote) */}
              {story.quote && (
                <blockquote style={{ 
                  margin: '48px 0', 
                  padding: '32px 40px', 
                  backgroundColor: '#FFF9E5', 
                  borderLeft: '4px solid var(--terracotta)',
                  borderRadius: '0 12px 12px 0',
                  boxShadow: '0 4px 20px rgba(15, 42, 68, 0.02)'
                }}>
                  <p style={{ 
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '18px', 
                    lineHeight: 1.6, 
                    color: 'var(--midnight-navy)', 
                    fontStyle: 'italic',
                    fontWeight: 500,
                    margin: 0
                  }}>
                    "{story.quote}"
                  </p>
                </blockquote>
              )}

              {/* Verified Metrics Block */}
              <div style={{ 
                backgroundColor: 'var(--midnight-navy)', 
                borderRadius: '16px', 
                padding: '40px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '24px',
                marginTop: '60px',
                boxShadow: '0 20px 40px rgba(15, 42, 68, 0.1)'
              }} className="metrics-box">
                {story.d.map((val, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontFamily: 'var(--font-numbers)', 
                      fontSize: 'clamp(24px, 4vw, 36px)', 
                      fontWeight: 800, 
                      color: '#FFFFFF', 
                      marginBottom: '8px' 
                    }}>
                      {val}
                    </div>
                    <div style={{ 
                      fontSize: '10px', 
                      color: 'rgba(255, 255, 255, 0.5)', 
                      textTransform: 'uppercase', 
                      fontWeight: 700, 
                      letterSpacing: '0.08em', 
                      lineHeight: 1.3 
                    }}>
                      {story.dl[i]}
                    </div>
                  </div>
                ))}
              </div>

              {/* ─── UNIFIED MEDIA SECTION ─── */}
              {(hasVideos || hasPhotos) && (
                <div style={{ marginTop: '80px' }} className="unified-media-section">
                  
                  {/* Section A — Optional Ceremony Label */}
                  {story.date && (
                    <div style={{ 
                      fontSize: '14px', 
                      color: 'rgba(15, 42, 68, 0.6)', 
                      fontWeight: 500, 
                      marginBottom: '24px' 
                    }}>
                      From the ceremony — {story.date}
                    </div>
                  )}

                  {/* Section B — Featured Video */}
                  {hasVideos && (
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        aspectRatio: '16 / 9',
                        boxShadow: '0 20px 40px rgba(15, 42, 68, 0.05)',
                        backgroundColor: '#0F2A44',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <video 
                          src={activeVideo} 
                          controls 
                          preload="metadata"
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            backgroundColor: '#0F2A44'
                          }}
                          aria-label={`Featured video: ${story.title}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Section C — Secondary Video Thumbnails */}
                  {hasVideos && storyVideos.length >= 2 && (
                    <div style={{ marginBottom: '40px' }}>
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        marginTop: '12px', 
                        overflowX: 'auto', 
                        paddingBottom: '8px' 
                      }} className="video-thumbnails-row">
                        {displaySecondaryVideos.map((vid, idx) => {
                          const originalIdx = storyVideos.indexOf(vid);
                          return (
                            <button
                              key={originalIdx}
                              onClick={() => setActiveVideo(vid)}
                              aria-label={`Play video ${originalIdx + 1}`}
                              style={{
                                height: '80px',
                                aspectRatio: '16 / 9',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: '#0F2A44',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                flexShrink: 0
                              }}
                              className="video-thumb-btn"
                            >
                              <video 
                                src={vid}
                                preload="metadata"
                                muted
                                playsInline
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  opacity: 0.5
                                }}
                              />
                              <Play size={20} style={{ color: '#FFFFFF', opacity: 0.9, zIndex: 1 }} />
                            </button>
                          );
                        })}

                        {/* +N more thumbnails button */}
                        {!isVideosExpanded && secondaryVideos.length > 2 && (
                          <button
                            onClick={() => setIsVideosExpanded(true)}
                            aria-label="Show more videos"
                            style={{
                              height: '80px',
                              aspectRatio: '16 / 9',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: 'rgba(15, 42, 68, 0.05)',
                              color: 'var(--midnight-navy)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontWeight: 700,
                              fontSize: '12px',
                              flexShrink: 0
                            }}
                          >
                            <span>+{secondaryVideos.length - 2} more</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Section D — Divider */}
                  {hasVideos && hasPhotos && (
                    <hr style={{ 
                      border: 'none', 
                      borderTop: '1px solid rgba(15, 42, 68, 0.08)', 
                      margin: '48px 0' 
                    }} />
                  )}

                  {/* Section E — Photo Grid */}
                  {hasPhotos && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      
                      {/* Row 1 — anchor + stack */}
                      <div className="photo-grid-row1" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: storyImages.length > 1 ? '1.6fr 1fr' : '1fr', 
                        gap: '4px' 
                      }}>
                        {/* Left Cell */}
                        <div 
                          onClick={() => setLightboxPhotoIndex(0)}
                          style={{ 
                            position: 'relative', 
                            height: '152px', 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            cursor: 'pointer' 
                          }}
                          className="photo-cell"
                        >
                          <img 
                            src={storyImages[0]} 
                            alt={story.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                          <div className="photo-overlay" />
                        </div>

                        {/* Right Stack */}
                        {storyImages.length > 1 && (
                          <div className="photo-grid-row1-right" style={{ 
                            display: 'grid', 
                            gridTemplateRows: storyImages.length > 2 ? '1fr 1fr' : '1fr', 
                            gap: '4px' 
                          }}>
                            <div 
                              onClick={() => setLightboxPhotoIndex(1)}
                              style={{ 
                                position: 'relative', 
                                height: storyImages.length > 2 ? '74px' : '152px', 
                                borderRadius: '8px', 
                                overflow: 'hidden', 
                                cursor: 'pointer' 
                              }}
                              className="photo-cell"
                            >
                              <img 
                                src={storyImages[1]} 
                                alt={story.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                              <div className="photo-overlay" />
                            </div>

                            {storyImages.length > 2 && (
                              <div 
                                onClick={() => setLightboxPhotoIndex(2)}
                                style={{ 
                                  position: 'relative', 
                                  height: '74px', 
                                  borderRadius: '8px', 
                                  overflow: 'hidden', 
                                  cursor: 'pointer' 
                                }}
                                className="photo-cell"
                              >
                                <img 
                                  src={storyImages[2]} 
                                  alt={story.title} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                                <div className="photo-overlay" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Row 2 — 3 equal cells */}
                      {storyImages.length >= 4 && (
                        <div className="photo-grid-row2" style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(3, 1fr)', 
                          gap: '4px' 
                        }}>
                          {/* Cell 1 */}
                          <div 
                            onClick={() => setLightboxPhotoIndex(3)}
                            style={{ 
                              position: 'relative', 
                              height: '72px', 
                              borderRadius: '8px', 
                              overflow: 'hidden', 
                              cursor: 'pointer' 
                            }}
                            className="photo-cell"
                          >
                            <img 
                              src={storyImages[3]} 
                              alt={story.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                            <div className="photo-overlay" />
                          </div>

                          {/* Cell 2 */}
                          {storyImages.length >= 5 && (
                            <div 
                              onClick={() => setLightboxPhotoIndex(4)}
                              style={{ 
                                position: 'relative', 
                                height: '72px', 
                                borderRadius: '8px', 
                                overflow: 'hidden', 
                                cursor: 'pointer' 
                              }}
                              className="photo-cell"
                            >
                              <img 
                                src={storyImages[4]} 
                                alt={story.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                              <div className="photo-overlay" />
                            </div>
                          )}

                          {/* Cell 3 or "+N more" tile */}
                          {storyImages.length >= 6 && (
                            <>
                              {storyImages.length === 6 || isPhotosExpanded ? (
                                <div 
                                  onClick={() => setLightboxPhotoIndex(5)}
                                  style={{ 
                                    position: 'relative', 
                                    height: '72px', 
                                    borderRadius: '8px', 
                                    overflow: 'hidden', 
                                    cursor: 'pointer' 
                                  }}
                                  className="photo-cell"
                                >
                                  <img 
                                    src={storyImages[5]} 
                                    alt={story.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                  />
                                  <div className="photo-overlay" />
                                </div>
                              ) : (
                                <div 
                                  onClick={() => setIsPhotosExpanded(true)}
                                  style={{ 
                                    height: '72px', 
                                    borderRadius: '8px', 
                                    backgroundColor: 'rgba(15, 42, 68, 0.05)', 
                                    color: 'var(--midnight-navy)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: '14px'
                                  }}
                                  className="more-tile"
                                >
                                  <span>+{storyImages.length - 5} more</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}

                      {/* Inline Expanded Photos */}
                      {isPhotosExpanded && storyImages.length > 6 && (
                        <div className="photo-grid-row2" style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(3, 1fr)', 
                          gap: '4px' 
                        }}>
                          {storyImages.slice(6).map((img, idx) => {
                            const realIdx = idx + 6;
                            return (
                              <div 
                                key={realIdx}
                                onClick={() => setLightboxPhotoIndex(realIdx)}
                                style={{ 
                                  position: 'relative', 
                                  height: '72px', 
                                  borderRadius: '8px', 
                                  overflow: 'hidden', 
                                  cursor: 'pointer' 
                                }}
                                className="photo-cell"
                              >
                                <img 
                                  src={img} 
                                  alt={story.title} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                                <div className="photo-overlay" />
                              </div>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  )}

                </div>
              )}

              {/* Bottom Back Button */}
              <div style={{ marginTop: '80px', borderTop: '1px solid rgba(15, 42, 68, 0.08)', paddingTop: '40px', textAlign: 'center' }}>
                <Link 
                  href="/impact" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: 'var(--terracotta)', 
                    textDecoration: 'none', 
                    fontSize: '14px', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'opacity 0.3s ease'
                  }}
                  className="bottom-back-link"
                >
                  <ChevronLeft size={16} />
                  <span>Return to Evidence Vault</span>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* ─── FULLSCREEN ACCESSIBLE LIGHTBOX <DIALOG> ─── */}
      <dialog
        ref={dialogRef}
        onClose={() => setLightboxPhotoIndex(null)}
        onClick={handleDialogClick}
        aria-label="Photo gallery"
        style={{
          border: 'none',
          padding: 0,
          background: 'transparent',
          width: '100%',
          height: '100%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          outline: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      >
        {lightboxPhotoIndex !== null && (
          <div style={{ 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative' 
          }}>
            {/* Centered Image */}
            <img 
              src={storyImages[lightboxPhotoIndex]} 
              alt={story.title} 
              style={{ 
                maxWidth: '90vw', 
                maxHeight: '90vh', 
                objectFit: 'contain',
                userSelect: 'none'
              }} 
            />

            {/* Close Button */}
            <button
              onClick={() => setLightboxPhotoIndex(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '36px',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '8px',
                outline: 'none',
                zIndex: 10000
              }}
            >
              &times;
            </button>

            {/* Previous Arrow Button */}
            {storyImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhotoIndex((prev) => {
                    if (prev === null) return null;
                    return (prev - 1 + storyImages.length) % storyImages.length;
                  });
                }}
                aria-label="Previous photo"
                style={{
                  position: 'absolute',
                  left: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  transition: 'background-color 0.3s ease',
                  zIndex: 10000
                }}
                className="lightbox-nav-btn"
              >
                &#8249;
              </button>
            )}

            {/* Next Arrow Button */}
            {storyImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhotoIndex((prev) => {
                    if (prev === null) return null;
                    return (prev + 1) % storyImages.length;
                  });
                }}
                aria-label="Next photo"
                style={{
                  position: 'absolute',
                  right: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  transition: 'background-color 0.3s ease',
                  zIndex: 10000
                }}
                className="lightbox-nav-btn"
              >
                &#8250;
              </button>
            )}
          </div>
        )}
      </dialog>

      <Footer />

      <style>{`
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.94) !important;
        }
        .back-btn:hover {
          color: #FFFFFF !important;
        }
        .bottom-back-link:hover {
          opacity: 0.8;
        }
        
        /* ─── Photo Cell Hover Overlays ─── */
        .photo-cell {
          position: relative;
          overflow: hidden;
        }
        .photo-cell img {
          transition: transform 0.5s ease;
        }
        .photo-cell:hover img {
          transform: scale(1.03);
        }
        .photo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(15, 42, 68, 0);
          transition: background-color 0.3s ease;
          pointer-events: none;
        }
        .photo-cell:hover .photo-overlay {
          background-color: rgba(15, 42, 68, 0.15);
        }

        .lightbox-nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.25) !important;
        }
        .more-tile:hover {
          background-color: rgba(15, 42, 68, 0.08) !important;
        }

        /* ─── Scrollbar for video thumbnails ─── */
        .video-thumbnails-row::-webkit-scrollbar {
          height: 4px;
        }
        .video-thumbnails-row::-webkit-scrollbar-thumb {
          background: rgba(15, 42, 68, 0.15);
          border-radius: 2px;
        }

        @media (max-width: 767px) {
          .story-layout-grid {
            gap: 40px !important;
          }
          .metrics-box {
            grid-template-columns: 1fr !important;
            padding: 30px 20px !important;
            gap: 32px !important;
          }
          
          /* Mobile Collapsing as per requirements */
          .photo-grid-row1 {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
          .photo-grid-row1-right {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
            gap: 4px !important;
          }
          .photo-grid-row1 .photo-cell {
            height: 180px !important;
            aspect-ratio: 16 / 10;
          }
          .photo-grid-row1-right .photo-cell {
            height: 180px !important;
            aspect-ratio: 16 / 10;
          }
          .photo-grid-row2 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 4px !important;
          }
          .photo-grid-row2 .photo-cell, .photo-grid-row2 .more-tile {
            height: 100px !important;
          }
        }
      `}</style>
    </div>
  );
}
