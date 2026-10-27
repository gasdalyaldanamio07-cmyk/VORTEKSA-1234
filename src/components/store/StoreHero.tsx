import React, { useRef, useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Check, 
  Sparkles, 
  Tag, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  FileText, 
  Flame, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OFFICIAL_PHONE, OFFICIAL_WHATSAPP_URL } from '../../data/promotionsData';

interface StoreHeroProps {
  onOpenRegister?: () => void;
  onOpenBrandModal?: () => void;
  onOpenDownloadCatalog?: () => void;
}

export const StoreHero: React.FC<StoreHeroProps> = ({ 
  onOpenRegister, 
  onOpenBrandModal,
  onOpenDownloadCatalog 
}) => {
  const { searchQuery, setSearchQuery, vehicleFilter, discountApplied, discountPercent } = useApp();
  
  // Hero Video Player State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalogo-repuestos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 550, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90 border-b border-slate-800/80 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Search, and Download Catalog */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top offer kicker (20% OFF Hook) */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-full transition-colors group cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>🎁 ¡20% DE DESCUENTO DE BIENVENIDA! Cupón VORTEKSA20</span>
                <span className="text-amber-400 font-mono text-[10px] group-hover:underline">
                  (Clic para reclamar ✓)
                </span>
              </button>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">· Precios en Soles (S/.)</span>
            </div>

            {/* Official Brand Slogan */}
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">Lema Oficial:</span>
                <span className="text-slate-200 italic font-medium text-xs sm:text-[13px]">
                  “Potencia, precisión y confianza para cada kilómetro”
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 font-display" style={{ textWrap: 'balance' }}>
              Repuestos y accesorios de ingeniería para tu auto
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-xl leading-relaxed">
              Encuentra kits de frenos cerámicos, suspensión regulable, sistemas de turboalimentación y consumibles de alto rendimiento con validación de compatibilidad exacta en Perú.
            </p>

            {/* Quick Search Input */}
            <div className="relative max-w-xl mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Busca por repuesto, código SKU, marca o categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Quick Navigation and Download Catalog Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 max-w-xl text-xs font-mono">
              {/* Direct Download Catalog Button as requested */}
              <button
                onClick={onOpenDownloadCatalog}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
                title="Descargar catálogo oficial en PDF"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>📄 Descargar Catálogo (PDF)</span>
              </button>

              <button
                onClick={handleScrollToCatalog}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <span>🔍 Explorar Catálogo</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('promociones');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Promociones (S/.)</span>
              </button>

              <a
                href={`tel:${OFFICIAL_PHONE}`}
                className="px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1 font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pedidos: {OFFICIAL_PHONE}</span>
              </a>
            </div>

            {/* Value Proof Badges (Guarantees & Peru shipping) */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-xl">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Envío express en Perú</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantía oficial OEM</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Stock 100% en Soles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Video in the Hero (Liquid Glass effect replacing static image) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-slate-900/80 backdrop-blur-xl group">
              {/* Dynamic Catalog Video */}
              <video
                ref={videoRef}
                src="/assets/aistudio/eeste_3561141c.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover select-none"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Liquid Glass Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />

              {/* Top Video Status Pill */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-amber-400 flex items-center gap-2 shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold">DEMOSTRACIÓN EN VIVO</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-slate-200 border border-white/10 transition-colors shadow cursor-pointer"
                    title={isMuted ? 'Activar audio' : 'Silenciar'}
                    aria-label="Silenciar o activar audio"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-slate-200 border border-white/10 transition-colors shadow cursor-pointer"
                    title={isPlaying ? 'Pausar video' : 'Reproducir video'}
                    aria-label="Pausar o reproducir video"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400 fill-current" />}
                  </button>
                </div>
              </div>

              {/* Bottom Liquid Glass Card: Parts Shown & Warehouse Connection */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 text-xs text-slate-200 flex flex-col gap-2 z-10 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white text-xs">Catálogo Dinámico VORTEKSA</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-semibold">1080p Full HD</span>
                </div>

                {/* Chapter Tags */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-300">
                    Frenos Cerámicos
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-300">
                    Coilovers Track-Spec
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-300">
                    Turbos Garrett
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle filter indicator if active */}
        {vehicleFilter.make !== 'Todas las Marcas' && (
          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400" />
              <span>
                Mostrando repuestos compatibles con: <strong>{vehicleFilter.make} {vehicleFilter.model} {vehicleFilter.year}</strong>
              </span>
            </div>
            <button
              onClick={() => useApp().setVehicleFilter({ make: 'Todas las Marcas', model: '', year: '' })}
              className="underline text-amber-200 hover:text-white cursor-pointer"
            >
              Restablecer filtro
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
