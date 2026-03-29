'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      onClick={toggleLang}
      className="fixed top-4 right-4 z-40 w-10 h-10 bg-seal text-white rounded-sm shadow-md hover:shadow-lg transition-shadow flex items-center justify-center font-brush text-sm"
      aria-label="Toggle language"
    >
      {lang === 'zh' ? 'EN' : '中'}
    </motion.button>
  );
}
