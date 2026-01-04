/**
 * Initiator/Organizer logos carousel component
 */

'use client';

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

  // Duplicate logos for infinite scroll effect
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-serif font-bold text-center mb-12 text-white">Diprakarsai Oleh</h2>

      <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-gold-400/20">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-navy-950 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-navy-950 to-transparent z-10"></div>

        {/* Scrolling carousel */}
        <div className="overflow-hidden">
          <div className="flex animate-infinite-scroll gap-8">
            {doubledLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 h-24 flex items-center justify-center rounded-lg p-4 hover:shadow-lg transition-shadow"
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

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
