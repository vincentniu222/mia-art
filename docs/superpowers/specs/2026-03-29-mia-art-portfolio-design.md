# Mia's Art Portfolio Website Design Spec

## Overview
A portfolio website for 7-year-old artist Mia, showcasing her Chinese ink/watercolor paintings (绘手纸). The site is designed as a scrollable "Chinese painting scroll" experience, organized by four seasons.

## Core Concept
- Single-page application simulating unrolling a Chinese scroll painting
- Organized by seasons: Spring → Summer → Autumn → Winter
- Bilingual: Chinese / English
- Target audience: public portfolio with professional feel

## Page Structure
```
[Landing 开卷] → [Spring 春] → [Summer 夏] → [Autumn 秋] → [Winter 冬] → [About 收卷]
```

## Artwork Inventory (13 paintings)

| Season | Artwork (CN) | Artwork (EN) |
|--------|-------------|--------------|
| Spring | 水仙花 | Narcissus |
| Spring | 虞美人 | Poppies |
| Spring | 马上有福 | Fortune Horse (Chinese New Year) |
| Summer | 向日葵 | Sunflowers |
| Summer | 小龙虾 | Lobster |
| Summer | 粽子与咸鸭蛋 | Zongzi & Salted Eggs (Dragon Boat Festival) |
| Summer | 烤串 | Grilled Skewers |
| Autumn | 兔子与月饼 | Rabbit & Mooncake (Mid-Autumn Festival) |
| Autumn | 公鸡 | Rooster |
| Autumn | 狮子 | Lion |
| Winter | 圣诞老人 | Sleeping Santa |
| Winter | 北极熊 | Polar Bears |
| Winter | 小狗 | Puppy |

## Visual Design
- **Background**: Off-white rice paper texture with subtle fiber patterns
- **Season transitions**: Watercolor gradient washes — Spring (pink-green) → Summer (yellow-green) → Autumn (warm orange-brown) → Winter (cool gray-blue)
- **Typography**: Chinese calligraphy font (霞鹜文楷 or similar), English serif (Playfair Display)
- **Artwork display**: Mounted/framed effect with subtle shadow, click/tap for fullscreen view
- **Seal stamp**: Red seal animation on landing page (drop + slight wobble)

## Scroll Animations (Framer Motion)
- Artworks fade in + float up on scroll into viewport
- Ink wash transition bars between seasons
- Landing seal stamp drop animation
- Fullscreen modal: fade in with background blur

## Responsive Design
- **Desktop**: 2-3 column masonry layout within scroll, vertical scrolling
- **Mobile**: Single column vertical scroll (立轴 style), larger artwork display
- Both use vertical scrolling for consistency

## Language Toggle
- Seal-styled button in top-right corner: 中/EN
- Auto-detect browser language as default
- Simple React Context for state management

## Tech Stack
- Next.js 14 (App Router, static export)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Deploy: Vercel

## Project Structure
```
mia-art/
├── public/artworks/{spring,summer,autumn,winter}/
├── src/
│   ├── app/layout.tsx, page.tsx
│   ├── components/Landing, SeasonSection, ArtworkCard, ArtworkModal, About, LanguageToggle
│   ├── data/artworks.ts
│   └── i18n/zh.json, en.json
```

## Image Processing
1. Extract each PDF page as high-res PNG via pdftocairo
2. Crop individual paintings from multi-painting pages
3. Generate two sizes: full (lightbox) + thumbnail (gallery)
4. Organize by season folders

## Performance
- Next.js Image component for optimization
- Lazy loading on scroll
- Static export to Vercel CDN
