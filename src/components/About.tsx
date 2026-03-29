'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto text-center"
      >
        <h2 className="font-brush text-3xl md:text-4xl text-ink/80 mb-6">{t.aboutTitle}</h2>
        <p className="font-serif text-base md:text-lg text-ink/60 leading-relaxed">{t.aboutText}</p>

        <div className="mt-12 inline-block">
          <div className="w-12 h-12 bg-seal/80 rounded-sm flex items-center justify-center mx-auto">
            <span className="text-white font-brush text-lg">牛</span>
          </div>
        </div>

        <p className="font-serif text-sm text-ink/30 mt-8 italic">{t.aboutFooter}</p>
      </motion.div>
    </section>
  );
}
