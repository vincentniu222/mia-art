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

      {seasons.map((season) => (
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
