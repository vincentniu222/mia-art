# Mia's Art Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Chinese scroll-inspired portfolio website for 7-year-old artist Mia, showcasing 13 ink/watercolor paintings organized by four seasons, with bilingual support (Chinese/English).

**Architecture:** Single-page Next.js app with static export. Vertical scroll through seasonal sections with Framer Motion animations. Images extracted from PDFs and served as optimized PNGs. Simple React Context for language switching.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, next/image, Vercel deployment

---

## File Structure

```
mia-art/
├── public/
│   ├── artworks/
│   │   ├── spring/
│   │   │   ├── narcissus.png
│   │   │   ├── poppies.png
│   │   │   └── fortune-horse.png
│   │   ├── summer/
│   │   │   ├── sunflowers.png
│   │   │   ├── lobster.png
│   │   │   ├── zongzi.png
│   │   │   └── skewers.png
│   │   ├── autumn/
│   │   │   ├── rabbit-mooncake.png
│   │   │   ├── rooster.png
│   │   │   └── lion.png
│   │   └── winter/
│   │       ├── santa.png
│   │       ├── polar-bears.png
│   │       └── puppy.png
│   ├── textures/
│   │   └── rice-paper.png
│   └── fonts/
│       └── (calligraphy font files)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with font loading, metadata
│   │   ├── page.tsx            # Main page composing all sections
│   │   └── globals.css         # Global styles, font-face, rice paper bg
│   ├── components/
│   │   ├── Landing.tsx         # Opening scroll with title + seal animation
│   │   ├── SeasonSection.tsx   # Reusable season section with header + artwork grid
│   │   ├── ArtworkCard.tsx     # Single artwork with hover/tap + fade-in animation
│   │   ├── ArtworkModal.tsx    # Fullscreen lightbox for artwork detail
│   │   ├── About.tsx           # Closing section about Mia
│   │   ├── LanguageToggle.tsx  # Seal-styled CN/EN toggle button
│   │   ├── SeasonDivider.tsx   # Ink wash transition between seasons
│   │   └── ScrollHint.tsx      # Scroll down indicator on landing
│   ├── context/
│   │   └── LanguageContext.tsx  # Language state provider
│   ├── data/
│   │   └── artworks.ts        # Artwork metadata array with bilingual info
│   └── i18n/
│       ├── zh.ts              # Chinese UI strings
│       └── en.ts              # English UI strings
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

### Task 1: Extract Images from PDFs

**Files:**
- Input: `pdf/Mia-画作1.pdf` (4 pages), `pdf/Mia-画作2.pdf` (2 pages), `pdf/Mia-画作3.pdf` (5 pages), `pdf/Mia-画作4.pdf` (4 pages)
- Create: `public/artworks/spring/*.png`, `public/artworks/summer/*.png`, `public/artworks/autumn/*.png`, `public/artworks/winter/*.png`

- [ ] **Step 1: Extract all PDF pages as high-res PNGs**

```bash
cd /root/claude-project/mia-art
mkdir -p extracted

# Extract each PDF page as individual PNG at 300dpi
pdftocairo -png -r 300 "pdf/Mia-画作1.pdf" extracted/pdf1
pdftocairo -png -r 300 "pdf/Mia-画作2.pdf" extracted/pdf2
pdftocairo -png -r 300 "pdf/Mia-画作3.pdf" extracted/pdf3
pdftocairo -png -r 300 "pdf/Mia-画作4.pdf" extracted/pdf4
```

- [ ] **Step 2: Review extracted images and identify each painting**

Visually inspect each extracted PNG. Map each image to its artwork name and season. Some pages may contain multiple paintings that need cropping.

- [ ] **Step 3: Organize into season folders**

```bash
mkdir -p public/artworks/{spring,summer,autumn,winter}
```

Copy/rename each extracted image to its season folder with descriptive filename:
- `spring/narcissus.png` — 水仙花
- `spring/poppies.png` — 虞美人
- `spring/fortune-horse.png` — 马上有福
- `summer/sunflowers.png` — 向日葵
- `summer/lobster.png` — 小龙虾
- `summer/zongzi.png` — 粽子与咸鸭蛋
- `summer/skewers.png` — 烤串
- `autumn/rabbit-mooncake.png` — 兔子与月饼
- `autumn/rooster.png` — 公鸡
- `autumn/lion.png` — 狮子
- `winter/santa.png` — 圣诞老人
- `winter/polar-bears.png` — 北极熊
- `winter/puppy.png` — 小狗

- [ ] **Step 4: Commit**

```bash
git add public/artworks/
git commit -m "feat: extract and organize artwork images from PDFs by season"
```

---

### Task 2: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1: Create Next.js project with dependencies**

```bash
cd /root/claude-project/mia-art
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

If the directory is not empty, move existing files aside first, create the project, then move them back.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion
```

- [ ] **Step 3: Configure next.config.mjs for static export**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Verify the dev server starts**

```bash
npm run dev &
# Wait a few seconds, then check
curl -s http://localhost:3000 | head -20
```

Expected: HTML output from the default Next.js page.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js 14 project with Tailwind and Framer Motion"
```

---

### Task 3: Set Up Global Styles, Fonts, and Rice Paper Texture

**Files:**
- Create: `public/textures/rice-paper.png` (generate or use CSS pattern)
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Configure Tailwind with custom theme colors**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rice: '#F5F0E8',
        ink: '#2C2C2C',
        seal: '#C23B22',
        spring: { light: '#E8F5E9', accent: '#81C784' },
        summer: { light: '#FFFDE7', accent: '#FFD54F' },
        autumn: { light: '#FFF3E0', accent: '#FFB74D' },
        winter: { light: '#ECEFF1', accent: '#90A4AE' },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Noto Serif SC', 'serif'],
        brush: ['Ma Shan Zheng', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Set up globals.css with rice paper background and font imports**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

body {
  background-color: #F5F0E8;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  color: #2C2C2C;
}

::selection {
  background-color: rgba(194, 59, 34, 0.2);
}
```

- [ ] **Step 3: Update layout.tsx with metadata and fonts**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mia's Little Gallery | Mia的小画廊",
  description: "A 7-year-old artist's ink and watercolor world / 七岁小画家的水墨世界",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify styles load correctly**

```bash
# Dev server should already be running
curl -s http://localhost:3000 | grep "Mia"
```

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx tailwind.config.ts
git commit -m "feat: set up global styles with rice paper texture, Chinese fonts, and season colors"
```

---

### Task 4: Create Artwork Data and i18n System

**Files:**
- Create: `src/data/artworks.ts`
- Create: `src/i18n/zh.ts`
- Create: `src/i18n/en.ts`
- Create: `src/context/LanguageContext.tsx`

- [ ] **Step 1: Define artwork metadata**

```typescript
// src/data/artworks.ts
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Artwork {
  id: string;
  src: string;
  title: { zh: string; en: string };
  season: Season;
  description?: { zh: string; en: string };
}

export const artworks: Artwork[] = [
  // Spring 春
  {
    id: 'narcissus',
    src: '/artworks/spring/narcissus.png',
    title: { zh: '水仙花', en: 'Narcissus' },
    season: 'spring',
  },
  {
    id: 'poppies',
    src: '/artworks/spring/poppies.png',
    title: { zh: '虞美人', en: 'Poppies' },
    season: 'spring',
  },
  {
    id: 'fortune-horse',
    src: '/artworks/spring/fortune-horse.png',
    title: { zh: '马上有福', en: 'Fortune Horse' },
    season: 'spring',
    description: { zh: '新年贺卡', en: 'Chinese New Year greeting' },
  },
  // Summer 夏
  {
    id: 'sunflowers',
    src: '/artworks/summer/sunflowers.png',
    title: { zh: '向日葵', en: 'Sunflowers' },
    season: 'summer',
  },
  {
    id: 'lobster',
    src: '/artworks/summer/lobster.png',
    title: { zh: '小龙虾', en: 'Lobster' },
    season: 'summer',
  },
  {
    id: 'zongzi',
    src: '/artworks/summer/zongzi.png',
    title: { zh: '粽子与咸鸭蛋', en: 'Zongzi & Salted Eggs' },
    season: 'summer',
    description: { zh: '端午节', en: 'Dragon Boat Festival' },
  },
  {
    id: 'skewers',
    src: '/artworks/summer/skewers.png',
    title: { zh: '烤串', en: 'Grilled Skewers' },
    season: 'summer',
  },
  // Autumn 秋
  {
    id: 'rabbit-mooncake',
    src: '/artworks/autumn/rabbit-mooncake.png',
    title: { zh: '玉兔与月饼', en: 'Rabbit & Mooncake' },
    season: 'autumn',
    description: { zh: '中秋节', en: 'Mid-Autumn Festival' },
  },
  {
    id: 'rooster',
    src: '/artworks/autumn/rooster.png',
    title: { zh: '公鸡', en: 'Rooster' },
    season: 'autumn',
  },
  {
    id: 'lion',
    src: '/artworks/autumn/lion.png',
    title: { zh: '狮子', en: 'Lion' },
    season: 'autumn',
  },
  // Winter 冬
  {
    id: 'santa',
    src: '/artworks/winter/santa.png',
    title: { zh: '圣诞老人', en: 'Sleeping Santa' },
    season: 'winter',
  },
  {
    id: 'polar-bears',
    src: '/artworks/winter/polar-bears.png',
    title: { zh: '北极熊', en: 'Polar Bears' },
    season: 'winter',
  },
  {
    id: 'puppy',
    src: '/artworks/winter/puppy.png',
    title: { zh: '小狗', en: 'Puppy' },
    season: 'winter',
  },
];

export const seasons: { key: Season; title: { zh: string; en: string }; subtitle: { zh: string; en: string } }[] = [
  { key: 'spring', title: { zh: '春', en: 'Spring' }, subtitle: { zh: '万物生长', en: 'Everything Grows' } },
  { key: 'summer', title: { zh: '夏', en: 'Summer' }, subtitle: { zh: '热烈绽放', en: 'In Full Bloom' } },
  { key: 'autumn', title: { zh: '秋', en: 'Autumn' }, subtitle: { zh: '丰收时节', en: 'Harvest Time' } },
  { key: 'winter', title: { zh: '冬', en: 'Winter' }, subtitle: { zh: '温暖如初', en: 'Warm As Ever' } },
];
```

- [ ] **Step 2: Create i18n string files**

```typescript
// src/i18n/zh.ts
export const zh = {
  siteTitle: 'Mia的小画廊',
  siteSubtitle: '七岁的水墨世界',
  scrollHint: '向下滚动，展开画卷',
  aboutTitle: '关于小画家',
  aboutText: 'Mia，七岁，喜欢用水墨和彩笔画下眼中的世界。每一幅画都是她送给生活的小礼物。',
  aboutFooter: '画还在画，故事还在继续...',
  langToggle: '中',
  close: '关闭',
};
```

```typescript
// src/i18n/en.ts
export const en = {
  siteTitle: "Mia's Little Gallery",
  siteSubtitle: "A 7-Year-Old's Ink World",
  scrollHint: 'Scroll down to unroll the scroll',
  aboutTitle: 'About the Artist',
  aboutText: 'Mia is seven years old. She loves painting the world around her with ink and watercolors. Each painting is a little gift she gives to life.',
  aboutFooter: 'More art is on the way...',
  langToggle: 'EN',
  close: 'Close',
};
```

- [ ] **Step 3: Create language context**

```tsx
// src/context/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { zh } from '@/i18n/zh';
import { en } from '@/i18n/en';

type Lang = 'zh' | 'en';
type Strings = typeof zh;

interface LanguageContextType {
  lang: Lang;
  t: Strings;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');
  const t = lang === 'zh' ? zh : en;
  const toggleLang = () => setLang(prev => prev === 'zh' ? 'en' : 'zh');

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/data/ src/i18n/ src/context/
git commit -m "feat: add artwork metadata, i18n strings, and language context"
```

---

### Task 5: Build Landing Component

**Files:**
- Create: `src/components/Landing.tsx`
- Create: `src/components/ScrollHint.tsx`

- [ ] **Step 1: Build Landing with seal stamp animation**

```tsx
// src/components/Landing.tsx
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
        style={{ aspectRatio: '1/1' }}
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
```

- [ ] **Step 2: Build ScrollHint component**

```tsx
// src/components/ScrollHint.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Landing.tsx src/components/ScrollHint.tsx
git commit -m "feat: add Landing page with seal stamp animation and scroll hint"
```

---

### Task 6: Build SeasonSection and SeasonDivider Components

**Files:**
- Create: `src/components/SeasonSection.tsx`
- Create: `src/components/SeasonDivider.tsx`

- [ ] **Step 1: Build SeasonSection**

```tsx
// src/components/SeasonSection.tsx
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
      {/* Season title */}
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

      {/* Artwork grid */}
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
```

- [ ] **Step 2: Build SeasonDivider**

```tsx
// src/components/SeasonDivider.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SeasonSection.tsx src/components/SeasonDivider.tsx
git commit -m "feat: add SeasonSection with gradient backgrounds and SeasonDivider"
```

---

### Task 7: Build ArtworkCard Component

**Files:**
- Create: `src/components/ArtworkCard.tsx`

- [ ] **Step 1: Build ArtworkCard with scroll animation**

```tsx
// src/components/ArtworkCard.tsx
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
      {/* Frame */}
      <div className="bg-white/70 p-3 md:p-4 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-sm">
        <div className="relative overflow-hidden">
          <Image
            src={artwork.src}
            alt={artwork.title[lang]}
            width={600}
            height={600}
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Title below frame */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ArtworkCard.tsx
git commit -m "feat: add ArtworkCard with framed display and scroll animation"
```

---

### Task 8: Build ArtworkModal Component

**Files:**
- Create: `src/components/ArtworkModal.tsx`

- [ ] **Step 1: Build fullscreen modal with backdrop blur**

```tsx
// src/components/ArtworkModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import type { Artwork } from '@/data/artworks';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const { lang, t } = useLanguage();

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[90vh] bg-rice p-4 md:p-6 shadow-2xl rounded-sm"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-ink/40 hover:text-ink transition-colors text-xl"
              aria-label={t.close}
            >
              ✕
            </button>

            {/* Image */}
            <div className="flex items-center justify-center">
              <Image
                src={artwork.src}
                alt={artwork.title[lang]}
                width={1200}
                height={1200}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Caption */}
            <div className="text-center mt-4">
              <h3 className="font-brush text-2xl text-ink">{artwork.title.zh}</h3>
              <p className="font-serif text-base text-ink/50 italic">{artwork.title.en}</p>
              {artwork.description && (
                <p className="font-serif text-sm text-ink/40 mt-1">{artwork.description[lang]}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ArtworkModal.tsx
git commit -m "feat: add fullscreen artwork modal with backdrop blur"
```

---

### Task 9: Build About and LanguageToggle Components

**Files:**
- Create: `src/components/About.tsx`
- Create: `src/components/LanguageToggle.tsx`

- [ ] **Step 1: Build About (closing section)**

```tsx
// src/components/About.tsx
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

        {/* Decorative seal */}
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
```

- [ ] **Step 2: Build LanguageToggle**

```tsx
// src/components/LanguageToggle.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx src/components/LanguageToggle.tsx
git commit -m "feat: add About section and language toggle button"
```

---

### Task 10: Assemble Main Page

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Wrap layout with LanguageProvider**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Mia's Little Gallery | Mia的小画廊",
  description: "A 7-year-old artist's ink and watercolor world / 七岁小画家的水墨世界",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Build main page composing all sections**

```tsx
// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Landing } from '@/components/Landing';
import { SeasonSection } from '@/components/SeasonSection';
import { SeasonDivider } from '@/components/SeasonDivider';
import { ArtworkModal } from '@/components/ArtworkModal';
import { About } from '@/components/About';
import { LanguageToggle } from '@/components/LanguageToggle';
import { artworks, seasons, type Artwork } from '@/data/artworks';

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <main>
      <LanguageToggle />
      <Landing />

      {seasons.map((season, i) => (
        <div key={season.key}>
          <SeasonDivider />
          <SeasonSection
            season={season.key}
            title={season.title}
            subtitle={season.subtitle}
            artworks={artworks.filter(a => a.season === season.key)}
            onArtworkClick={setSelectedArtwork}
          />
        </div>
      ))}

      <SeasonDivider />
      <About />

      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </main>
  );
}
```

- [ ] **Step 3: Verify the full page renders**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "feat: assemble main page with all sections and modal"
```

---

### Task 11: Visual Polish and Final Adjustments

**Files:**
- Modify: multiple components as needed for visual refinement

- [ ] **Step 1: Test in browser, adjust spacing/sizing**

Open http://localhost:3000 and verify:
- Landing page seal animation works
- Scroll reveals artworks with fade-in
- Season transitions have subtle gradient backgrounds
- Artwork click opens modal
- Language toggle switches all text
- Mobile view (resize to 375px width) shows single column

- [ ] **Step 2: Fix any visual issues found during testing**

Adjust padding, font sizes, image sizing as needed based on actual artwork dimensions.

- [ ] **Step 3: Build and verify static export**

```bash
npm run build
ls out/
```

Expected: `out/` directory contains `index.html` and all static assets.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: visual polish and verify static export"
```

---

### Task 12: Deploy to Vercel

**Files:**
- No new files

- [ ] **Step 1: Initialize git repo and push**

```bash
cd /root/claude-project/mia-art
git init
git add .
git commit -m "initial commit: Mia's Art Portfolio"
gh repo create mia-art --public --source=. --push
```

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect the GitHub repo to Vercel dashboard for auto-deploy.

- [ ] **Step 3: Verify live site**

Open the Vercel URL and test:
- All artwork images load
- Animations play smoothly
- Language toggle works
- Mobile responsive
- Fullscreen modal works

- [ ] **Step 4: Commit any deployment config changes**

```bash
git add .
git commit -m "chore: add Vercel deployment config"
```
