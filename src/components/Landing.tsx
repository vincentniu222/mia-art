'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollHint } from './ScrollHint';
import { InkSplash } from './InkSplash';

export function Landing() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
      {/* Ink splash background effect */}
      <InkSplash />

      {/* Ink wash cloud at top */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.06, y: 0 }}
        transition={{ delay: 0.2, duration: 2 }}
        className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-ink to-transparent pointer-events-none"
      />

      {/* Seal stamp with ink splash effect */}
      <div className="relative">
        {/* Ink ring behind seal */}
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: [0, 2, 2.5], opacity: [0.6, 0.1, 0] }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="absolute inset-0 rounded-full border-2 border-seal/30"
        />
        <motion.div
          initial={{ y: -60, opacity: 0, rotate: -5 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.3 }}
          className="relative w-20 h-20 md:w-24 md:h-24 bg-seal rounded-md flex items-center justify-center mb-8 shadow-lg"
        >
          <span className="text-white font-brush text-3xl md:text-4xl">Mia</span>
        </motion.div>
      </div>

      {/* Title with ink reveal */}
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="font-brush text-4xl md:text-6xl lg:text-7xl text-ink text-center relative"
      >
        {t.siteTitle}
      </motion.h1>

      {/* Decorative brush stroke under title */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-2 mb-4"
      >
        <svg width="200" height="12" viewBox="0 0 200 12" className="w-32 md:w-48">
          <motion.path
            d="M5,6 C30,2 50,10 100,6 C150,2 170,10 195,6"
            fill="none"
            stroke="#2C2C2C"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
          />
        </svg>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 1.2, duration: 1 }}
        className="font-serif text-lg md:text-xl text-ink/60 text-center"
      >
        {t.siteSubtitle}
      </motion.p>

      {/* Ink wash cloud at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none"
      />

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
