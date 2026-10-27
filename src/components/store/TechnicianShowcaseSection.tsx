import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  MessageCircle, 
  ChevronRight, 
  Eye, 
  ShoppingCart, 
  ShieldCheck, 
  Gauge, 
  Info,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OFFICIAL_PHONE, OFFICIAL_WHATSAPP_URL, formatPrice } from '../../data/promotionsData';
import { Product } from '../../types';

interface TechnicianShowcaseSectionProps {
  onOpenDetails: (product: Product) => void;
}

interface Hotspot {
  id: string;
  name: string;
  category: string;
  top: string; // percentage
  left: string; // percentage
  productId: string;
  technicianAdvice: string;
  powerGain: string;
  installTime: string;
}

export const TechnicianShowcaseSection: React.FC<TechnicianShowcaseSectionProps> = ({ onOpenDetails }) => {
  const { products, addToCart } = useApp();
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('turbo');

  const hotspots: Hotspot[] = [
    {
      id: 'turbo',
      name: 'Turbocompresor Twin-Scroll Billet',
      category: 'Motor & Turbo',
      top: '70%',
      left: '54%',
      productId: 'prod-4',
      technicianAdvice: 'La rueda compresora forjada Billet y los rodamientos cerámicos reducen el turbo-lag en un 35% respecto a turbos convencionales, resistiendo hasta 1050°C de temperatura en el múltiple de escape.',
      powerGain: '+45 a +180 HP según presión',
      installTime: '3 - 4 Horas'
    },
    {
      id: 'brakes',
      name: 'Discos Perforados & Ranurados con Cáliper Cerámico',
      category: 'Frenos de Competición',
      top: '80%',
      left: '23%',
      productId: 'prod-1',
      technicianAdvice: 'Las perforaciones evacúan los gases de fricción y el agua, mientras las ranuras limpian constantemente la superficie de la pastilla evitando la cristalización en frenadas intensas.',
      powerGain: '-22% distancia de frenado',
      installTime: '1.5 Horas'
    },
    {
      id: 'coilovers',
      name: 'Suspensión Coilover Track-Spec Monotubo',
      category: 'Suspensión Regulable',
      top: '82%',
      left: '43%',
      productId: 'prod-2',
      technicianAdvice: 'Permite regular tanto la altura del vehículo al milímetro como la dureza del rebote en 32 posiciones. Esencial para eliminar el balanceo en curva sin sacrificar confort de calle.',
      powerGain: 'Control de chasis total',
      installTime: '2.5 Horas'
    },
    {
      id: 'filter',
      name: 'Filtro de Aire Cónico de Alto Flujo',
      category: 'Admisión',
      top: '68%',
      left: '38%',
      productId: 'prod-5',
      technicianAdvice: 'El diseño cónico de 4 capas de algodón quirúrgico incrementa el flujo de aire en un 50% hacia el turbocompresor, logrando una respuesta al acelerador mucho más agresiva.',
      powerGain: '+8 a +12 HP inmediatos',
      installTime: '20 Minutos'
    },
    {
      id: 'engine',
      name: 'Vano Motor & Admisión de Alto Rendimiento',
      category: 'Diagnóstico de Motor',
      top: '48%',
      left: '38%',
      productId: 'prod-6',
      technicianAdvice: 'Utilizamos lubricante sintético Motul 300V Ester Core® con especificación 0W-40 para garantizar película protectora hidrodinámica incluso a 8,500 RPM en circuito.',
      powerGain: 'Protección antidesgaste 99.8%',
      installTime: 'Mantenimiento Preventivo'
    },
    {
      id: 'telemetry',
      name: 'Telemetría & Diagnóstico Digital OBD2',
      category: 'Telemetría',
      top: '74%',
      left: '84%',
      productId: 'prod-3',
      technicianAdvice: 'Monitoreamos en tiempo real la presión de soplado (1.4 Bar), temperatura de aceite, relación aire/combustible (AFR) y ángulo de encendido en nuestro banco de pruebas.',
      powerGain: 'Calibración milimétrica',
      installTime: 'En cada revisión'
    }
  ];

  const activeHotspot = hotspots.find(h => h.id === selectedHotspotId) || hotspots[0];
  const activeProduct = products.find(p => p.id === activeHotspot.productId);

  return (
    <section 
      id="taller-tecnico" 
      aria-label="Taller Técnico y Demostración de Piezas"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>Taller & Demostración Técnica VORTEKSA</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
          Inspección de Vehículo y Piezas en Vivo
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          Nuestro técnico especialista te muestra el vehículo en banco de prueba y cada una de las piezas del catálogo instaladas y listas para despacho. Toca los puntos interactivos para conocer su función.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Interactive Technician & Car Image with Hotspots (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl group">
            {/* High-res compressed image */}
            <picture>
              <source srcSet="/assets/images/technician_car_parts_1792875951041.webp" type="image/webp" />
              <img
                src="/assets/images/technician_car_parts_1792875951041_opt.jpg"
                alt="Técnico automotriz VORTEKSA mostrando deportivo y piezas del catálogo"
                className="w-full h-auto object-cover select-none"
                loading="lazy"
              />
            </picture>

            {/* Dark gradient overlay at bottom for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Hotspot Pins */}
            {hotspots.map((h) => {
              const isActive = h.id === selectedHotspotId;
              return (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspotId(h.id)}
                  style={{ top: h.top, left: h.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin transition-all duration-300 focus:outline-none ${
                    isActive ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  aria-label={`Ver información de ${h.name}`}
                >
                  <span className="relative flex h-7 w-7 items-center justify-center">
                    {/* Pulsing ring */}
                    <span 
                      className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                        isActive ? 'bg-amber-400' : 'bg-emerald-400'
                      }`} 
                    />
                    {/* Center marker */}
                    <span 
                      className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white items-center justify-center text-[10px] font-mono font-bold shadow-xl transition-colors ${
                        isActive 
                          ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30' 
                          : 'bg-slate-900 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950'
                      }`}
                    >
                      +
                    </span>
                  </span>

                  {/* Floating tooltip preview on hover */}
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-slate-950/95 border border-slate-700 text-[10px] font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity shadow-lg">
                    {h.name}
                  </span>
                </button>
              );
            })}

            {/* Bottom In-Image Badge: Technician info */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto flex items-center gap-3 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">Ing. Marco Valdivia</span>
                <span className="text-[11px] text-amber-400 font-mono">Jefe de Taller & Diagnóstico VORTEKSA</span>
              </div>
            </div>
          </div>

          {/* Quick Hotspot Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-400 shrink-0">Piezas:</span>
            {hotspots.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHotspotId(h.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedHotspotId === h.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{h.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Technical Explanation & Matching Catalog Card (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Technician Advice Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {activeHotspot.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Certificado OEM
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {activeHotspot.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 italic">
                "{activeHotspot.technicianAdvice}"
              </p>
            </div>

            {/* Performance specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">Rendimiento:</span>
                <span className="font-bold text-amber-400">{activeHotspot.powerGain}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">Tiempo Instalación:</span>
                <span className="font-bold text-white">{activeHotspot.installTime}</span>
              </div>
            </div>

            {/* Matching Product in Catalog */}
            {activeProduct && (
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">En nuestro catálogo:</span>
                  <span className="text-xs font-mono font-bold text-amber-400">SKU: {activeProduct.sku}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-white text-xs block line-clamp-1">
                      {activeProduct.name}
                    </span>
                    <span className="font-mono text-base font-bold text-amber-400">
                      {formatPrice(activeProduct.price)}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400">
                    {activeProduct.stock > 0 ? `${activeProduct.stock} disp.` : 'Bajo pedido'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenDetails(activeProduct)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Ficha</span>
                  </button>

                  <button
                    onClick={() => addToCart(activeProduct, 1)}
                    disabled={activeProduct.stock <= 0}
                    className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct Mechanic Assistance Contact Card with Phone Number */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>Línea Técnica Directa</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ¿No estás seguro de la compatibilidad con tu modelo de vehículo? Comunícate con nuestros mecánicos especialistas.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={`tel:${OFFICIAL_PHONE}`}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-850 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>{OFFICIAL_PHONE}</span>
              </a>
              <a
                href={OFFICIAL_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consultar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
