import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PhotoGridProps {
  photos: string[];
  layout?: 'masonry' | 'grid' | 'collage';
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  layout = 'grid',
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getGridClass = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-4';
      case 'collage':
        return 'grid grid-cols-4 grid-rows-2 gap-2';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  };

  const getItemClass = (index: number) => {
    if (layout === 'collage') {
      const patterns = [
        'col-span-2 row-span-2',
        'col-span-1 row-span-1',
        'col-span-1 row-span-2',
        'col-span-1 row-span-1',
        'col-span-1 row-span-1',
      ];
      return patterns[index % patterns.length];
    }
    return '';
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={getGridClass()}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`mb-4 break-inside-avoid ${getItemClass(index)}`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo}
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            aria-label="Close lightbox"
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={32} />
          </button>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedPhoto}
            alt="Selected"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        </motion.div>
      )}
    </>
  );
};

export default PhotoGrid;
