import React, { useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  ShoppingCart, 
  Eye, 
  PhoneCall, 
  Film
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OFFICIAL_PHONE, OFFICIAL_WHATSAPP_URL } from '../../data/promotionsData';
import { Product } from '../../types';

interface CatalogVideoShowcaseProps {
  onOpenDetails: (product: Product) => void;
}

export const CatalogVideoShowcase: React.FC<CatalogVideoShowcaseProps> = ({ onOpenDetails }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const { products, addToCart } = useApp();

  const chapters = [
    { time: 0, title: 'Presentación', desc: 'Ingeniería y Catálogo VORTEKSA' },
    { time: 4, title: 'Frenos de Competición', desc: 'Rotores Perforados & Ranurados' },
    { time: 8, title: 'Suspensión Regulable', desc: 'Coilovers Track-Spec Monotubo' },
    { time: 12, title: 'Turbos & Admisión', desc: 'Turbocompresor Garrett Twin-Scroll' }
  ];

  // Pick showcase products matching the video
  const featuredProducts = products.filter(p => 
    ['prod-1', 'prod-2', 'prod-4', 'prod-5'].includes(p.id)
  );

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

  const jumpToTime = (seconds: number, index: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play();
    setIsPlaying(true);
    setActiveChapter(index);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section 
      id="video-catalogo" 
      aria-label="Video Demostrativo del Catálogo"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Film className="w-3.5 h-3.5" />
          <span>Demostración Audiovisual</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
          Video del Catálogo en Acción
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl mx-auto">
          Observa en alta definición la calidad, acabados mecánicos y tolerancia de fabricación de nuestros componentes antes de instalarlos en tu vehículo.
        </p>
      </div>

      {/* Video Player Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src="/assets/aistudio/eeste_3561141c.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Top Info Bar inside video */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-amber-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>VORTEKSA LIVE DEMO · 1080p HD</span>
            </div>

            <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300">
              Pedidos: <span className="text-amber-400 font-bold">{OFFICIAL_PHONE}</span>
            </div>
          </div>

          {/* Bottom Player Overlay Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold transition-transform active:scale-95 shadow-md"
                title={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                title={isMuted ? 'Activar audio' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <div className="hidden sm:block text-xs font-mono text-slate-300">
                <span className="text-amber-400 font-bold">Capítulo actual:</span>{' '}
                <span>{chapters[activeChapter]?.title || 'Pruebas de Catálogo'}</span>
              </div>
            </div>

            {/* Chapter Jump Shortcuts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {chapters.map((chap, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToTime(chap.time, idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                    activeChapter === idx
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  {chap.title}
                </button>
              ))}

              <button
                onClick={handleFullscreen}
                className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors ml-1"
                title="Pantalla Completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action Bar underneath player */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-mono">¿Viste un repuesto en el video?</span>
              <span className="text-sm font-bold text-white">
                Consúltalo al instante al{' '}
                <a 
                  href={`tel:${OFFICIAL_PHONE}`} 
                  className="text-amber-400 hover:text-amber-300 underline font-mono font-bold"
                >
                  {OFFICIAL_PHONE}
                </a>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={OFFICIAL_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Featured Parts Shown in Video Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Repuestos destacados en el video</span>
          </h4>
          <span className="text-xs font-mono text-slate-500">Stock sincronizado en tiempo real</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span className="text-amber-500 font-semibold">{prod.brand}</span>
                  <span>{prod.sku}</span>
                </div>
                <h5 className="font-semibold text-xs text-white line-clamp-1 mb-2">
                  {prod.name}
                </h5>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-base font-bold font-mono text-amber-400">
                    ${prod.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {prod.stock > 0 ? `${prod.stock} en stock` : 'Bajo pedido'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onOpenDetails(prod)}
                  className="py-1.5 px-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  <span>Ficha</span>
                </button>
                <button
                  onClick={() => addToCart(prod, 1)}
                  disabled={prod.stock <= 0}
                  className="py-1.5 px-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
