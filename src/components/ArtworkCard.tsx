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
      <div className="relative bg-white/70 p-3 md:p-4 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-sm">
        {/* Ink wash reveal overlay */}
        <motion.div
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 bg-rice origin-right z-10 pointer-events-none"
        />

        <div className="relative overflow-hidden">
          {/* Ink blur reveal on image */}
          <motion.div
            initial={{ filter: 'blur(6px) saturate(0)' }}
            whileInView={{ filter: 'blur(0px) saturate(1)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: index * 0.15 + 0.2 }}
          >
            <Image
              src={artwork.src}
              alt={artwork.title[lang]}
              width={600}
              height={600}
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Subtle ink corner decoration */}
        <svg className="absolute top-1 left-1 w-4 h-4 opacity-10" viewBox="0 0 20 20">
          <path d="M0,0 L20,0 L0,20" fill="none" stroke="#2C2C2C" strokeWidth="1"/>
        </svg>
        <svg className="absolute bottom-1 right-1 w-4 h-4 opacity-10" viewBox="0 0 20 20">
          <path d="M20,20 L0,20 L20,0" fill="none" stroke="#2C2C2C" strokeWidth="1"/>
        </svg>
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
