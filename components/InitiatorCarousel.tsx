
/**
 * Initiator/Organizer logos carousel component
 */

'use client';
import { useRef, useEffect, useState } from 'react';

interface InitiatorLogo {
  name: string;
  url: string;
}

interface InitiatorCarouselProps {
  logos: InitiatorLogo[];
}

export function InitiatorCarousel({ logos }: InitiatorCarouselProps) {
  if (!logos || logos.length === 0) {
    return null;
  }

  // React infinite carousel with variable width
  const containerRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const speed = 60; // px per second

  // Duplicate logos for seamless loop (3x jika logo < 6)
  const duplicatedLogos = logos.length < 6 ? [...logos, ...logos, ...logos] : [...logos, ...logos];

  useEffect(() => {
    if (!containerRef.current) return;
    // Only measure the first set
    const children = Array.from(containerRef.current.children).slice(0, logos.length);
    let width = 0;
    for (const child of children) {
      width += (child as HTMLElement).offsetWidth;
    }
    setSetWidth(width);
  }, [logos]);

  useEffect(() => {
    if (!setWidth) return;
    let start: number | null = null;
    let raf: number;
    let lastPx = 0;
    function step(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      let px = (elapsed / 1000) * speed;
      if (px >= setWidth) {
        // Delay a few ms to avoid snap effect
        setTimeout(() => {
          start = ts;
          setOffset(0);
        }, 10);
        px = setWidth; // freeze at end for a moment
      } else {
        setOffset(-px);
      }
      lastPx = px;
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [setWidth, speed]);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-serif font-bold text-center mb-12 text-white">Diprakarsai Oleh</h2>

      {/* Desktop carousel view */}
      <div className="hidden md:block relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-lg p-8 border-2 border-gold-400">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0))'
        }}></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{
          background: 'linear-gradient(to left, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0))'
        }}></div>

        {/* Scrolling carousel */}
        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        >
          <div
            className="flex gap-8"
            ref={containerRef}
            style={{
              width: 'fit-content',
              transform: `translateX(${offset}px)`,
              transition: 'none',
            }}
          >
            {duplicatedLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 h-24 flex items-center justify-center rounded-lg p-4 transition-all"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                  style={{ width: 'auto', height: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile grid view */}
      <div className="md:hidden bg-white/5 backdrop-blur-sm rounded-lg p-6 border-2 border-gold-400">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="h-20 flex items-center justify-center rounded-lg p-3"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
                style={{ width: 'auto', height: '100%' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* No CSS keyframes needed for desktop, handled by JS */}
    </section>
  );
}
