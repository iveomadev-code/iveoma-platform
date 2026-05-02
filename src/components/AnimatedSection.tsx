'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' */
  variant?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right';
  as?: 'section' | 'div' | 'article' | 'footer';
}

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
};

const spring = {
  type: 'spring' as const,
  stiffness: 80,
  damping: 20,
};

export function AnimatedSection({
  children,
  className,
  style,
  delay = 0,
  variant = 'fade-up',
  as = 'section',
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const MotionTag = motion[as] as typeof motion.section;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ ...spring, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** For staggered children within a section */
export function StaggerContainer({
  children,
  className,
  style,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Individual stagger child */
export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 80, damping: 20 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
