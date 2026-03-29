'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import type { Artwork } from '@/data/artworks';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const { lang, t } = useLanguage();

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[90vh] bg-rice p-4 md:p-6 shadow-2xl rounded-sm"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-ink/40 hover:text-ink transition-colors text-xl"
              aria-label={t.close}
            >
              ✕
            </button>

            <div className="flex items-center justify-center">
              <Image
                src={artwork.src}
                alt={artwork.title[lang]}
                width={1200}
                height={1200}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="text-center mt-4">
              <h3 className="font-brush text-2xl text-ink">{artwork.title.zh}</h3>
              <p className="font-serif text-base text-ink/50 italic">{artwork.title.en}</p>
              {artwork.description && (
                <p className="font-serif text-sm text-ink/40 mt-1">{artwork.description[lang]}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
