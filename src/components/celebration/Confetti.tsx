import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  delay: number;
  size: number;
  duration: number;
  isCircle: boolean;
}

interface ConfettiProps {
  active?: boolean;
  pieceCount?: number;
}

const Confetti: React.FC<ConfettiProps> = ({
  active = true,
  pieceCount = 100,
}) => {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    if (!active) return [];
    
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da', '#d4af37'];
    const durations = [3, 3.5, 4, 4.5, 5];
    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < pieceCount; i++) {
      newPieces.push({
        id: i,
        x: (i * 100) / pieceCount + ((i * 7) % 10 - 5),
        color: colors[i % colors.length],
        rotation: i * 15,
        delay: i * 0.02,
        size: 8 + (i % 8),
        duration: durations[i % durations.length],
        isCircle: i % 2 === 0,
      });
    }

    return newPieces;
  }, [active, pieceCount]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: '110vh',
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: piece.size,
            height: piece.size * 1.5,
            backgroundColor: piece.color,
            borderRadius: piece.isCircle ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
