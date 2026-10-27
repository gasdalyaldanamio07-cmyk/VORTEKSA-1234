import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSlogan = false,
  className = '',
  onClick
}) => {
  const iconSize = 
    size === 'sm' ? 'w-8 h-8' :
    size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  const titleSize = 
    size === 'sm' ? 'text-lg' :
    size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl';

  const sloganSize = 
    size === 'sm' ? 'text-[9px]' :
    size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div 
      onClick={onClick}
      className={`group flex items-center gap-3 cursor-pointer select-none text-left ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Precision Vector Emblem (Automotive Turbine Rotor & Speed Wing) */}
      <div className={`relative ${iconSize} shrink-0 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/40 p-1.5 shadow-md group-hover:border-amber-400 group-hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform group-hover:rotate-45 transition-transform duration-500 ease-out"
        >
          <defs>
            <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>

          {/* Outer Rotor Vent Ring */}
          <circle cx="24" cy="24" r="21" stroke="#334155" strokeWidth="2.5" strokeDasharray="3 3" />

          {/* Inner Rotor Hub */}
          <circle cx="24" cy="24" r="14" fill="#090D16" stroke="url(#amberGrad)" strokeWidth="2" />

          {/* Turbine Fins / Mechanical Caliper Teeth */}
          <path d="M24 4V10" stroke="url(#amberGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 38V44" stroke="url(#amberGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M4 24H10" stroke="url(#amberGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M38 24H44" stroke="url(#amberGrad)" strokeWidth="3" strokeLinecap="round" />
          
          <path d="M10 10L14 14" stroke="url(#amberGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 34L38 38" stroke="url(#amberGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 10L30 14" stroke="url(#amberGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 34L10 38" stroke="url(#amberGrad)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Center Dynamic Apex / Piston Crown */}
          <circle cx="24" cy="24" r="6" fill="url(#amberGrad)" />
          <circle cx="24" cy="24" r="2.5" fill="#020617" />

          {/* Speed Vector Slash */}
          <path d="M16 32L32 16" stroke="url(#blueGrad)" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Ambient subtle glow dot */}
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
      </div>

      {/* Typography: Wordmark and Slogan */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 leading-none">
          <span className={`font-display font-black tracking-tight text-white whitespace-nowrap ${titleSize}`}>
            VORTEKSA
          </span>
          <span className="font-display font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] tracking-wider shadow-sm uppercase font-mono">
            Repuestos
          </span>
        </div>

        {showSlogan && (
          <span className={`font-medium tracking-wide text-slate-400 mt-1 whitespace-nowrap italic font-sans flex items-center gap-1 ${sloganSize}`}>
            <span className="text-amber-500 font-bold not-italic">“</span>
            Potencia, precisión y confianza para cada kilómetro
            <span className="text-amber-500 font-bold not-italic">”</span>
          </span>
        )}
      </div>
    </div>
  );
};
