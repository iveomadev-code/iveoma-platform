'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const entranceSpring = { type: 'spring' as const, stiffness: 80, damping: 20 };
const hoverSpring = { type: 'spring' as const, stiffness: 300, damping: 22 };

import { stories } from '@/data/impactStories';

// We take the specific stories that drive action (e.g. Story 06 for Health, Story 07 for Education)
const articles = stories.filter(s => s.num === 'Story 06' || s.num === 'Story 07').map(s => ({
  category: s.tag,
  date: (s as any).date || '2025',
  headline: s.title,
  excerpt: s.intervention,
  image: s.images[0]
}));

function ArticleRow({ article, index }: { article: typeof articles[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: entranceSpring }
      }}
      className="article-row"
      style={{
        display: 'flex',
        gap: '48px',
        alignItems: 'flex-start',
        padding: '40px 0',
        borderTop: index === 0 ? '1px solid rgba(201,169,110,0.25)' : 'none',
        borderBottom: '1px solid rgba(201,169,110,0.25)',
      }}
    >
      {/* Left Meta Column */}
      <div className="meta-col">
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--teal)', // Strategic Teal (#2E8B9A)
          }}
        >
          {article.category}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--cool-muted)', // Cool Muted (#5B8BBF)
            marginTop: '6px',
            fontFamily: 'var(--font-body), sans-serif',
          }}
        >
          {article.date}
        </div>
      </div>

      {/* Center Content */}
      <div className="content-col" style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
            textTransform: 'uppercase', // Monumental All-Caps
            letterSpacing: '0', // Reset to 0
            fontSize: '22px',
            fontWeight: 600,
            color: 'var(--sky-blue)', // Component Headline Role
            lineHeight: 1.2,
            maxWidth: '480px',
            margin: 0,
          }}
        >
          {article.headline}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '15px',
            color: 'rgba(15, 42, 68, 0.7)',
            lineHeight: 1.3,
            marginTop: '10px',
            maxWidth: '480px',
            marginBottom: '16px',
          }}
        >
          {article.excerpt}
        </p>
        
        <motion.a
          href="/impact#vault"
          className="btn-link on-light"
          style={{
            padding: 0
          }}
        >
          Read more <ArrowRight size={14} />
        </motion.a>
      </div>

      {/* Right Image */}
      <div className="image-col" style={{ flexShrink: 0, width: '220px', height: '150px', backgroundColor: 'var(--ice-blue)', borderRadius: '6px', overflow: 'hidden' }}>
        <img 
          src={article.image} 
          alt={article.headline} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
        />
      </div>

      <style jsx>{`
        .meta-col {
          width: 100px;
          flex-shrink: 0;
        }
        @media (max-width: 639px) {
          .article-row {
            flex-direction: column;
            gap: 16px !important;
          }
          .meta-col {
            width: auto;
          }
          .image-col {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default function InsightsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [exploreHovered, setExploreHovered] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF',
      }}
      className="section-pad"
    >
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={entranceSpring}
          style={{ marginBottom: '48px' }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#C9A96E',
              marginBottom: '16px',
            }}
          >
            Insights
          </div>
          
          <h2
            style={{
              fontFamily: 'var(--font-heading-monumental), var(--font-heading), serif',
              textTransform: 'uppercase',
              letterSpacing: '0',
              fontSize: 'clamp(32px, 3.5vw, 46px)',
              fontWeight: 700,
              color: 'var(--primary)',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Thinking that drives action.
          </h2>
        </motion.div>

        {/* Articles List */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {articles.map((article, i) => (
            <ArticleRow key={i} article={article} index={i} />
          ))}
        </motion.div>

        {/* Bottom Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ ...entranceSpring, delay: 0.6 }}
          style={{ textAlign: 'right', marginTop: '32px' }}
        >
          <motion.a
            href="/impact#vault"
            className="btn-link on-light"
            style={{
              padding: 0
            }}
          >
            Explore all insights <ArrowRight size={16} />
          </motion.a>
        </motion.div>

      </div>

      <style jsx>{`
        @media (max-width: 639px) {
          .insights-section {
            padding: 48px 0;
          }
        }
      `}</style>
    </section>
  );
}
