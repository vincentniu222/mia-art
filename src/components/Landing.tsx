'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollHint } from './ScrollHint';

export function Landing() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
      {/* Seal stamp */}
      <motion.div
        initial={{ y: -60, opacity: 0, rotate: -5 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.3 }}
        className="w-20 h-20 md:w-24 md:h-24 bg-seal rounded-md flex items-center justify-center mb-8 shadow-lg"
      >
        <span className="text-white font-brush text-3xl md:text-4xl">Mia</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="font-brush text-4xl md:text-6xl lg:text-7xl text-ink text-center"
      >
        {t.siteTitle}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="font-serif text-lg md:text-xl text-ink/60 mt-4 text-center"
      >
        {t.siteSubtitle}
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12"
      >
        <ScrollHint />
      </motion.div>
    </section>
  );
}
