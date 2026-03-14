import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  photos: string[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (photos.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl aspect-video">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
        aria-label="Previous photo"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
        aria-label="Next photo"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-elegant-gold w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
