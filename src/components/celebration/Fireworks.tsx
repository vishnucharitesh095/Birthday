import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FireworkParticle {
  id: number;
  angle: number;
  color: string;
  delay: number;
}

interface Firework {
  id: number;
  x: number;
  particles: FireworkParticle[];
}

interface FireworksProps {
  active?: boolean;
  fireworkCount?: number;
}

const Fireworks: React.FC<FireworksProps> = ({
  active = true,
  fireworkCount = 5,
}) => {
  const fireworks = useMemo<Firework[]>(() => {
    if (!active) return [];

    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#d4af37', '#aa96da'];
    const newFireworks: Firework[] = [];

    for (let f = 0; f < fireworkCount; f++) {
      const particles: FireworkParticle[] = [];
      const color = colors[f % colors.length];

      for (let p = 0; p < 12; p++) {
        particles.push({
          id: p,
          angle: p * 30,
          color,
          delay: f * 0.3,
        });
      }

      newFireworks.push({
        id: f,
        x: 20 + (f * 60) / fireworkCount,
        particles,
      });
    }

    return newFireworks;
  }, [active, fireworkCount]);

  if (!active || fireworks.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute firework-container"
          style={{ '--firework-left': firework.x + '%' } as React.CSSProperties}
        >
          {firework.particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: Math.cos((particle.angle * Math.PI) / 180) * 150,
                y: Math.sin((particle.angle * Math.PI) / 180) * 150,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: 'easeOut',
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: particle.color, boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}` } }
            />
          ))}
          {/* Center flash */}
          <motion.div
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{
              duration: 0.5,
              delay: firework.id * 0.3,
            }}
            className="absolute w-5 h-5 rounded-full bg-white firework-center"
          />
        </div>
      ))}
    </div>
  );
};

export default Fireworks;
