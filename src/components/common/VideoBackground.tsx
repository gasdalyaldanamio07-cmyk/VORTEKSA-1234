import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Video, VideoOff, Eye, EyeOff, Sparkles } from 'lucide-react';

export const VideoBackground: React.FC = () => {
  const { videoBgActive, setVideoBgActive } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prominence, setProminence] = useState<'vivid' | 'medium'>('vivid');

  useEffect(() => {
    if (videoRef.current) {
      if (videoBgActive) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoBgActive]);

  return (
    <>
      {/* Background Video Layer - Made Noticeable & Vivid */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {videoBgActive && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              videoLoaded 
                ? prominence === 'vivid' 
                  ? 'opacity-80 scale-100' 
                  : 'opacity-55 scale-100' 
                : 'opacity-0'
            } filter brightness-95 contrast-110 saturate-110`}
            src="/assets/aistudio/eeste_3561141c.mp4"
          />
        )}

        {/* Dynamic Translucent Scrim - Preserves Video Visibility while keeping text 100% legible */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          prominence === 'vivid'
            ? 'bg-gradient-to-b from-slate-950/65 via-slate-950/45 to-slate-950/80 backdrop-blur-[0.5px]'
            : 'bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90 backdrop-blur-[1px]'
        }`} />
      </div>

      {/* Discrete Ambient Video Control (Floating Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-full shadow-2xl p-1 flex items-center gap-1">
          <button
            onClick={() => setVideoBgActive(!videoBgActive)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              videoBgActive
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title={videoBgActive ? 'Pausar video de fondo' : 'Activar video de fondo'}
            aria-label="Control de video ambiental de fondo"
          >
            {videoBgActive ? (
              <>
                <Video className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">Video Activo</span>
              </>
            ) : (
              <>
                <VideoOff className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">Video Pausado</span>
              </>
            )}
          </button>

          {videoBgActive && (
            <button
              onClick={() => setProminence(prominence === 'vivid' ? 'medium' : 'vivid')}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-mono transition-colors flex items-center gap-1 ${
                prominence === 'vivid'
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Cambiar brillo / visibilidad del video de fondo"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{prominence === 'vivid' ? 'Modo Vívido' : 'Modo Sutil'}</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
