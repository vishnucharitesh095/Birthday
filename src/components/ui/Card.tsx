import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'dark';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
}) => {
  const baseStyles = 'rounded-2xl overflow-hidden';
  
  const variantStyles: Record<string, string> = {
    default: 'bg-white shadow-lg',
    glass: 'glass',
    dark: 'glass-dark',
  };

  const hoverStyles = hover 
    ? 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1' 
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
