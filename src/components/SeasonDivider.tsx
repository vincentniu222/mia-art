'use client';

import { motion } from 'framer-motion';

export function SeasonDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent my-4"
    />
  );
}
