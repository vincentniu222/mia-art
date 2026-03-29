'use client';

import { useState } from 'react';
import { Landing } from '@/components/Landing';
import { SeasonSection } from '@/components/SeasonSection';
import { SeasonDivider } from '@/components/SeasonDivider';
import { ArtworkModal } from '@/components/ArtworkModal';
import { About } from '@/components/About';
import { LanguageToggle } from '@/components/LanguageToggle';
import { InkCurtain } from '@/components/InkCurtain';
import { InkParticles } from '@/components/InkParticles';
import { InkMountains } from '@/components/InkMountains';
import { artworks, seasons, type Artwork } from '@/data/artworks';

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <>
      {/* Full-screen ink curtain on page load */}
      <InkCurtain />

      {/* Floating ink particles throughout */}
      <InkParticles />

      <main className="relative z-10">
        <LanguageToggle />
        <Landing />

        {seasons.map((season, i) => (
          <div key={season.key}>
            {/* Ink mountain landscape between sections */}
            <InkMountains season={season.key} />
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
    </>
  );
}
