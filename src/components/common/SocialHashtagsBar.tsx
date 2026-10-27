import React, { useState } from 'react';
import { 
  Hash, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  Flame, 
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { OFFICIAL_HASHTAGS, OFFICIAL_PHONE, OFFICIAL_WHATSAPP_URL } from '../../data/promotionsData';

interface SocialHashtagsBarProps {
  compact?: boolean;
}

export const SocialHashtagsBar: React.FC<SocialHashtagsBarProps> = ({ compact = false }) => {
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = OFFICIAL_HASHTAGS.join(' ');
    navigator.clipboard.writeText(fullText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-mono flex items-center gap-1 text-[11px]">
          <Hash className="w-3.5 h-3.5 text-amber-500" />
          <span>Redes:</span>
        </span>
        {OFFICIAL_HASHTAGS.slice(0, 4).map((tag) => (
          <button
            key={tag}
            onClick={() => handleCopyTag(tag)}
            className="px-2 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-[11px] font-mono text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1"
            title="Clic para copiar hashtag"
          >
            <span>{tag}</span>
            {copiedTag === tag ? <Check className="w-3 h-3 text-emerald-400" /> : null}
          </button>
        ))}
      </div>
    );
  }

  return (
    <section 
      id="redes-hashtags" 
      aria-label="Comunidad y Redes Sociales VORTEKSA"
      className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Text */}
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Comunidad & Redes Oficiales</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Conéctate con la Comunidad VORTEKSA
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Etiqueta tus proyectos mecánicos, preparaciones de pista y unboxings de repuestos utilizando nuestros hashtags oficiales para aparecer en nuestras redes sociales y ganar descuentos exclusivos.
            </p>
          </div>

          {/* Social Channels & Contact Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={OFFICIAL_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-950/50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Oficial: {OFFICIAL_PHONE}</span>
            </a>

            <a
              href={`tel:${OFFICIAL_PHONE}`}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Llamar: {OFFICIAL_PHONE}</span>
            </a>

            <button
              onClick={handleCopyAll}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              {allCopied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>¡Hashtags Copiados!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" />
                  <span>Copiar Todos los Hashtags</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Hashtag Pills */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-amber-500" />
              <strong className="text-slate-300">Hashtags Oficiales (Toca para copiar individualmente):</strong>
            </span>
            <span className="text-[11px] text-slate-500">
              {OFFICIAL_HASHTAGS.length} hashtags activos
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {OFFICIAL_HASHTAGS.map((tag) => {
              const isCopied = copiedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => handleCopyTag(tag)}
                  className={`group px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                      : 'bg-slate-950/80 hover:bg-slate-850 text-slate-300 hover:text-amber-400 border border-slate-800 hover:border-amber-500/40'
                  }`}
                  title="Haz clic para copiar este hashtag"
                >
                  <span className="text-amber-500 group-hover:scale-110 transition-transform">#</span>
                  <span>{tag.replace('#', '')}</span>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 ml-0.5 animate-in zoom-in" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Social Network Platforms Strip */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-400 font-mono pt-4 border-t border-slate-800/40">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span className="text-white font-semibold">Instagram:</span>
            <span className="text-slate-400 truncate">@vorteksa.pe</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-white font-semibold">TikTok:</span>
            <span className="text-slate-400 truncate">@vorteksa_tuning</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-white font-semibold">Facebook:</span>
            <span className="text-slate-400 truncate">/VorteksaAutorepuestos</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-white font-semibold">YouTube:</span>
            <span className="text-slate-400 truncate">VORTEKSA Garage</span>
          </div>
        </div>
      </div>
    </section>
  );
};
