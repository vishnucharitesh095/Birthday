import React from 'react';
import { motion } from 'framer-motion';

interface BalloonProps {
  color?: string;
  delay?: number;
  left?: string;
  size?: number;
}

const Balloon: React.FC<BalloonProps> = ({
  color = '#ff6b6b',
  delay = 0,
  left = '10%',
  size = 60,
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        width: size,
        height: size * 1.3,
      }}
      initial={{ y: '110vh', opacity: 0 }}
      animate={{
        y: ['110vh', '-10vh', '-10vh', '110vh'],
        opacity: [0, 1, 1, 0],
        x: [0, 20, -20, 0],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* Balloon body */}
      <svg viewBox="0 0 100 130" className="w-full h-full">
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="50"
          fill={color}
          opacity="0.9"
        />
        {/* Highlight */}
        <ellipse
          cx="35"
          cy="35"
          rx="15"
          ry="20"
          fill="white"
          opacity="0.3"
        />
        {/* String */}
        <path
          d="M50 100 Q50 115 50 130"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </motion.div>
  );
};

interface BalloonsProps {
  count?: number;
  colors?: string[];
}

const Balloons: React.FC<BalloonsProps> = ({
  count = 15,
  colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da', '#fcbad3'],
}) => {
  const balloonElements = React.useMemo(() => {
    const sizes = [45, 55, 65, 50, 60, 70, 48, 58];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      delay: i * 0.5,
      left: `${5 + (i * (90 / count))}%`,
      size: sizes[i % sizes.length],
    }));
  }, [count, colors]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {balloonElements.map((balloon) => (
        <Balloon
          key={balloon.id}
          color={balloon.color}
          delay={balloon.delay}
          left={balloon.left}
          size={balloon.size}
        />
      ))}
    </div>
  );
};

export default Balloons;
