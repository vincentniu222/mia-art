'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArtworkCard } from './ArtworkCard';
import type { Artwork, Season } from '@/data/artworks';

interface SeasonSectionProps {
  season: Season;
  title: { zh: string; en: string };
  subtitle: { zh: string; en: string };
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

const seasonColors: Record<Season, string> = {
  spring: 'from-spring-light/0 via-spring-light/40 to-spring-light/0',
  summer: 'from-summer-light/0 via-summer-light/40 to-summer-light/0',
  autumn: 'from-autumn-light/0 via-autumn-light/40 to-autumn-light/0',
  winter: 'from-winter-light/0 via-winter-light/40 to-winter-light/0',
};

const inkWashPositions: Record<Season, { side: string; blur: string }> = {
  spring: { side: 'left-0 top-20', blur: 'blur-3xl' },
  summer: { side: 'right-0 top-40', blur: 'blur-2xl' },
  autumn: { side: 'left-0 bottom-20', blur: 'blur-3xl' },
  winter: { side: 'right-0 bottom-10', blur: 'blur-2xl' },
};

export function SeasonSection({ season, title, subtitle, artworks, onArtworkClick }: SeasonSectionProps) {
  const { lang } = useLanguage();
  const inkPos = inkWashPositions[season];

  return (
    <section className={`relative py-16 md:py-24 bg-gradient-to-b ${seasonColors[season]} overflow-hidden`}>
      {/* Ink wash cloud decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className={`absolute ${inkPos.side} w-64 h-64 pointer-events-none`}
      >
        <div className={`w-full h-full bg-ink/[0.02] rounded-full ${inkPos.blur}`} />
      </motion.div>

      {/* Season title with ink brush effect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16 relative"
      >
        {/* Large faded character behind */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.04, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-brush text-[12rem] md:text-[16rem] text-ink pointer-events-none select-none"
        >
          {title.zh}
        </motion.span>

        <motion.h2
          initial={{ filter: 'blur(4px)' }}
          whileInView={{ filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-brush text-5xl md:text-7xl text-ink/80 relative"
        >
          {title[lang]}
        </motion.h2>

        {/* Brush stroke under title */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-3"
        >
          <svg width="120" height="8" viewBox="0 0 120 8" className="mx-auto">
            <path
              d="M5,4 C20,1 40,7 60,4 C80,1 100,7 115,4"
              fill="none"
              stroke="#2C2C2C"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.15"
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-base md:text-lg text-ink/40 mt-2"
        >
          {subtitle[lang]}
        </motion.p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {artworks.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={i}
              onClick={() => onArtworkClick(artwork)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
