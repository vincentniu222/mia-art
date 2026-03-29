'use client';

import { motion } from 'framer-motion';
import type { Season } from '@/data/artworks';

const mountainPaths: Record<Season, { path: string; path2: string }> = {
  spring: {
    path: 'M0,80 C30,60 60,20 100,35 C140,50 160,15 200,25 C240,35 270,10 310,30 C350,50 380,25 400,40 L400,100 L0,100Z',
    path2: 'M0,85 C50,70 80,40 130,55 C180,70 210,30 260,45 C310,60 350,35 400,50 L400,100 L0,100Z',
  },
  summer: {
    path: 'M0,70 C40,50 70,25 120,40 C170,55 190,20 240,30 C290,40 320,15 360,25 C380,30 390,35 400,30 L400,100 L0,100Z',
    path2: 'M0,80 C60,65 90,45 140,55 C190,65 220,35 270,50 C320,65 360,40 400,55 L400,100 L0,100Z',
  },
  autumn: {
    path: 'M0,75 C50,55 80,30 130,45 C180,60 200,25 250,35 C300,45 330,20 370,30 L400,35 L400,100 L0,100Z',
    path2: 'M0,82 C40,70 80,50 120,60 C160,70 200,40 250,55 C300,70 350,45 400,60 L400,100 L0,100Z',
  },
  winter: {
    path: 'M0,65 C35,45 70,20 110,35 C150,50 180,15 230,28 C280,40 310,12 350,22 C370,28 390,20 400,25 L400,100 L0,100Z',
    path2: 'M0,78 C45,65 85,42 135,55 C185,68 215,38 265,48 C315,58 355,38 400,48 L400,100 L0,100Z',
  },
};

export function InkMountains({ season }: { season: Season }) {
  const paths = mountainPaths[season];

  return (
    <div className="relative w-full h-24 md:h-32 overflow-hidden pointer-events-none -mb-1">
      <motion.svg
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        {/* Far mountains - lighter */}
        <motion.path
          d={paths.path}
          fill="#2C2C2C"
          opacity="0.03"
          initial={{ translateY: 20 }}
          whileInView={{ translateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        {/* Near mountains - slightly darker */}
        <motion.path
          d={paths.path2}
          fill="#2C2C2C"
          opacity="0.05"
          initial={{ translateY: 30 }}
          whileInView={{ translateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        {/* Mist layer */}
        <rect x="0" y="60" width="400" height="40" fill="url(#mist)" opacity="0.3" />
        <defs>
          <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0" />
            <stop offset="100%" stopColor="#F5F0E8" stopOpacity="1" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
