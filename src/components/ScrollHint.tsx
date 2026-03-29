'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function ScrollHint() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-2 text-ink/40">
      <span className="text-sm font-serif">{t.scrollHint}</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-xl"
      >
        ↓
      </motion.div>
    </div>
  );
}
