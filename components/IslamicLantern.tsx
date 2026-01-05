/**
 * Islamic lantern SVG component with authentic design
 */

interface IslamicLanternProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  delay?: number;
}

export function IslamicLantern({ size = 'md', animate = true, delay = 0 }: IslamicLanternProps) {
  const sizeMap = {
    sm: 'w-12 h-16',
    md: 'w-16 h-20',
    lg: 'w-20 h-24',
  };

  const animationClass = animate ? 'animate-bounce' : '';
  const style = animate ? { animationDuration: `${3 + delay * 0.2}s`, animationDelay: `${delay * 0.1}s` } : {};

  return (
    <div className={`${sizeMap[size]} ${animationClass} relative`} style={style}>
      {/* Long hanging rope from top of page */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700 z-10" style={{ top: '-1000px', height: '1000px' }}></div>
      
      <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-20">
        {/* Top anchor points for rope */}
        <circle cx="40" cy="2" r="2" fill="#A0826D" opacity="0.7" />
        <circle cx="60" cy="2" r="2" fill="#A0826D" opacity="0.7" />
        
        {/* Hanging rope/chain - left side - curved */}
        <path d="M 40 2 Q 35 8 35 18" fill="none" stroke="#A0826D" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Hanging rope/chain - right side - curved */}
        <path d="M 60 2 Q 65 8 65 18" fill="none" stroke="#A0826D" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Rope detail - texture on left rope */}
        <circle cx="38" cy="6" r="0.8" fill="#8B7355" opacity="0.6" />
        <circle cx="36" cy="12" r="0.8" fill="#8B7355" opacity="0.6" />
        
        {/* Rope detail - texture on right rope */}
        <circle cx="62" cy="6" r="0.8" fill="#8B7355" opacity="0.6" />
        <circle cx="64" cy="12" r="0.8" fill="#8B7355" opacity="0.6" />
        
        {/* Lantern top ring */}
        <circle cx="50" cy="18" r="8" fill="none" stroke="#D4AF37" strokeWidth="2" />
        
        {/* Lantern top decorative cap */}
        <path d="M 40 18 Q 35 13 50 10 Q 65 13 60 18" fill="#D4AF37" opacity="0.8" />
        
        {/* Main lantern body - hexagonal shape */}
        <path 
          d="M 35 26 L 30 43 L 30 93 Q 30 108 50 113 Q 70 108 70 93 L 70 43 L 65 26 Z" 
          fill="#1a1a2e" 
          stroke="#D4AF37" 
          strokeWidth="1.5"
        />
        
        {/* Lantern panels - left side */}
        <path d="M 35 26 L 30 43 L 30 93" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
        
        {/* Lantern panels - right side */}
        <path d="M 65 26 L 70 43 L 70 93" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
        
        {/* Islamic geometric pattern on lantern body */}
        <circle cx="50" cy="53" r="8" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
        <line x1="42" y1="53" x2="58" y2="53" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
        <line x1="50" y1="45" x2="50" y2="61" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
        
        {/* Decorative stars */}
        <g opacity="0.7">
          <circle cx="40" cy="38" r="1.5" fill="#D4AF37" />
          <circle cx="60" cy="38" r="1.5" fill="#D4AF37" />
          <circle cx="40" cy="78" r="1.5" fill="#D4AF37" />
          <circle cx="60" cy="78" r="1.5" fill="#D4AF37" />
        </g>
        
        {/* Light glow inside */}
        <ellipse cx="50" cy="68" rx="12" ry="20" fill="#FDB813" opacity="0.4" />
        <ellipse cx="50" cy="63" rx="8" ry="12" fill="#FFD700" opacity="0.3" />
        
        {/* Lantern bottom decorative base */}
        <path d="M 35 93 Q 30 103 50 113 Q 70 103 65 93" fill="#D4AF37" opacity="0.6" />
        <circle cx="50" cy="113" r="6" fill="#D4AF37" opacity="0.7" />
      </svg>
    </div>
  );
}

/**
 * Decorative Islamic geometric elements
 */
export function IslamicStar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeMap[size]} animate-pulse`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Eight-pointed star - Islamic geometric */}
        <g fill="#D4AF37" opacity="0.8">
          <polygon points="50,5 61,39 98,50 61,61 50,95 39,61 2,50 39,39" />
        </g>
        {/* Inner decorative circle */}
        <circle cx="50" cy="50" r="15" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </div>
  );
}

/**
 * Decorative crescent with Islamic pattern
 */
export function IslamicCrescent({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`${sizeMap[size]} animate-pulse`} style={{ animationDuration: '2.5s' }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Crescent moon */}
        <circle cx="35" cy="50" r="35" fill="#D4AF37" opacity="0.8" />
        <circle cx="55" cy="50" r="35" fill="currentColor" />
        
        {/* Decorative stars on crescent */}
        <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.9" />
        <circle cx="50" cy="25" r="2.5" fill="currentColor" opacity="0.8" />
        <circle cx="25" cy="50" r="2" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
  );
}
