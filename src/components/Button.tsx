'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  context?: 'on-light' | 'on-dark';
  icon?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export default function Button({
  label,
  href,
  onClick,
  variant = 'primary',
  context = 'on-light',
  icon,
  showIcon = true,
  className = '',
  type = 'button',
  fullWidth = false
}: ButtonProps) {
  const combinedClasses = `btn btn-${variant} ${context} ${fullWidth ? 'w-full-btn' : ''} ${className}`;

  const content = (
    <>
      <span>{label}</span>
      {showIcon && (icon || <ArrowRight size={18} />)}
    </>
  );

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={combinedClasses}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      type={type}
      onClick={onClick} 
      className={combinedClasses}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
