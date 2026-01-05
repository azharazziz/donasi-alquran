'use client';

import { IslamicLantern, IslamicStar, IslamicCrescent } from './IslamicLantern';

/**
 * Ramadan ornaments component with authentic Islamic SVG lanterns
 */
export function RamadanOrnaments() {
  return (
    <>
      {/* Top left lantern - main lantern */}
      <div className="absolute top-32 left-8 z-5 text-amber-500">
        <IslamicLantern size="lg" animate={true} delay={0} />
      </div>

      {/* Top center-left lantern */}
      <div className="absolute top-36 left-1/3 z-5 text-amber-500">
        <IslamicLantern size="md" animate={true} delay={1} />
      </div>

      {/* Top right star */}
      <div className="absolute top-40 right-12 z-5 text-amber-400">
        <IslamicStar size="lg" />
      </div>

      {/* Top right lantern */}
      <div className="absolute top-44 right-1/4 z-5 text-amber-500">
        <IslamicLantern size="md" animate={true} delay={2} />
      </div>

      {/* Top center lantern */}
      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-5 text-amber-500">
        <IslamicLantern size="md" animate={true} delay={1.5} />
      </div>

      {/* Bottom left crescent */}
      <div className="absolute bottom-32 left-6 z-5 text-slate-700">
        <IslamicCrescent size="lg" />
      </div>

      {/* Floating stars - top middle area */}
      <div className="absolute top-1/4 right-1/4 z-5 text-amber-400 opacity-60">
        <IslamicStar size="sm" />
      </div>

      {/* Floating stars - bottom middle area */}
      <div className="absolute bottom-1/3 left-1/4 z-5 text-amber-400 opacity-60">
        <IslamicStar size="sm" />
      </div>
    </>
  );
}
