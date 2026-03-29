'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import type { Artwork } from '@/data/artworks';

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}

export function ArtworkCard({ artwork, index, onClick }: ArtworkCardProps) {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-white/70 p-3 md:p-4 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-sm">
        <div className="relative overflow-hidden">
          <Image
            src={artwork.src}
            alt={artwork.title[lang]}
            width={600}
            height={600}
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="font-brush text-lg text-ink/70">{artwork.title.zh}</p>
        <p className="font-serif text-sm text-ink/40 italic">{artwork.title.en}</p>
        {artwork.description && (
          <p className="font-serif text-xs text-ink/30 mt-1">{artwork.description[lang]}</p>
        )}
      </div>
    </motion.div>
  );
}
