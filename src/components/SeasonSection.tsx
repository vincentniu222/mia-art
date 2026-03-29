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

export function SeasonSection({ season, title, subtitle, artworks, onArtworkClick }: SeasonSectionProps) {
  const { lang } = useLanguage();

  return (
    <section className={`relative py-16 md:py-24 bg-gradient-to-b ${seasonColors[season]}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="font-brush text-5xl md:text-7xl text-ink/80">{title[lang]}</h2>
        <p className="font-serif text-base md:text-lg text-ink/40 mt-2">{subtitle[lang]}</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
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
