/**
 * Islamic geometric pattern background using CSS gradients
 * Modern geometric tessellation with Arabic-inspired design
 */

export function IslamicPatternBg() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(22.5deg, transparent 33%, rgba(212, 175, 55, 0.4) 33%, rgba(212, 175, 55, 0.4) 36%, transparent 36%, transparent 64%, rgba(212, 175, 55, 0.4) 64%, rgba(212, 175, 55, 0.4) 67%, transparent 67%),
          linear-gradient(-22.5deg, transparent 33%, rgba(212, 175, 55, 0.4) 33%, rgba(212, 175, 55, 0.4) 36%, transparent 36%, transparent 64%, rgba(212, 175, 55, 0.4) 64%, rgba(212, 175, 55, 0.4) 67%, transparent 67%),
          linear-gradient(112.5deg, transparent 33%, rgba(212, 175, 55, 0.4) 33%, rgba(212, 175, 55, 0.4) 36%, transparent 36%, transparent 64%, rgba(212, 175, 55, 0.4) 64%, rgba(212, 175, 55, 0.4) 67%, transparent 67%),
          linear-gradient(-112.5deg, transparent 33%, rgba(212, 175, 55, 0.4) 33%, rgba(212, 175, 55, 0.4) 36%, transparent 36%, transparent 64%, rgba(212, 175, 55, 0.4) 64%, rgba(212, 175, 55, 0.4) 67%, transparent 67%)
        `,
        backgroundSize: '100px 100px',
        backgroundPosition: `
          0 0, 0 0, 0 0, 0 0
        `,
        backgroundRepeat: 'repeat',
        opacity: 0.1,
        zIndex: 1,
      }}
    />
  );
}
