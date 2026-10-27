import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Gauge, 
  Wrench,
  CheckCircle2,
  Info
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  category: 'Primario' | 'Fondo' | 'Técnico' | 'Estado';
  whyUsed: string;
  functionInApp: string;
}

const BRAND_PALETTE: ColorSwatch[] = [
  {
    name: 'Ámbar Racing / Performance Gold',
    role: 'Color Primario de Marca y Conversión',
    hex: '#F59E0B',
    rgb: 'rgb(245, 158, 11)',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-500',
    borderClass: 'border-amber-500/40',
    category: 'Primario',
    whyUsed: 'Evoca el resplandor térmico de los discos de freno en competición, los rines anodizados dorados y la energía mecánica.',
    functionInApp: 'Guía la atención hacia las acciones primarias: botón de compra, precios destacados, descuentos activos y estados seleccionados.'
  },
  {
    name: 'Negro Asfalto / Deep Obsidian',
    role: 'Color de Fondo Estructural (Dark Mode)',
    hex: '#020617',
    rgb: 'rgb(2, 6, 23)',
    bgClass: 'bg-slate-950',
    textClass: 'text-slate-100',
    borderClass: 'border-slate-800',
    category: 'Fondo',
    whyUsed: 'Representa el asfalto de circuito de carreras, la fibra de carbono y la estética nocturna automotriz de alta gama.',
    functionInApp: 'Genera un lienzo inmersivo de máximo contraste que hace resaltar la fotografía de los repuestos metálicos y reduce la fatiga visual.'
  },
  {
    name: 'Azul Titanio / Precisión Mecánica',
    role: 'Color Secundario Técnico y Garantía',
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    bgClass: 'bg-blue-500',
    textClass: 'text-blue-400',
    borderClass: 'border-blue-500/40',
    category: 'Técnico',
    whyUsed: 'Inspirado en el titanio de escapes deportivos y la precisión computarizada del diagnóstico electrónico (OBD-II / ECU).',
    functionInApp: 'Identifica compatibilidad por marca/año, certificaciones de ingeniería OEM, cotizaciones y atención al cliente.'
  },
  {
    name: 'Verde Paddock / Stock Confirmado',
    role: 'Color Funcional de Validación y Éxito',
    hex: '#10B981',
    rgb: 'rgb(16, 185, 129)',
    bgClass: 'bg-emerald-500',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/40',
    category: 'Estado',
    whyUsed: 'Código universal de luz verde en el paddock de automovilismo: pista libre, vehículo listo y máxima seguridad.',
    functionInApp: 'Confirma disponibilidad de stock en tiempo real en bodega, cálculo de envío gratis y pedidos exitosamente procesados.'
  },
  {
    name: 'Rojo Cáliper / Alerta Crítica',
    role: 'Color Funcional de Alerta e Inventario',
    hex: '#EF4444',
    rgb: 'rgb(239, 68, 68)',
    bgClass: 'bg-red-500',
    textClass: 'text-red-400',
    borderClass: 'border-red-500/40',
    category: 'Estado',
    whyUsed: 'Homenaje a los cálipers deportivos rojos de alto calibre y las luces testigo críticas del tablero de instrumentos.',
    functionInApp: 'Señala repuestos agotados temporalmente y genera notificaciones operativas al personal cuando el stock cae bajo el mínimo.'
  },
  {
    name: 'Gris Acero Forjado / Slate Mecánico',
    role: 'Color de Superficie, Contenedores y Bordes',
    hex: '#1E293B',
    rgb: 'rgb(30, 41, 59)',
    bgClass: 'bg-slate-800',
    textClass: 'text-slate-300',
    borderClass: 'border-slate-700',
    category: 'Fondo',
    whyUsed: 'Simboliza los bloques de motor de fundición, acero laminado y herramental de taller mecánico profesional.',
    functionInApp: 'Delimita tarjetas de repuestos, tablas de especificaciones técnicas y jerarquías sin saturar la vista.'
  }
];

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({ isOpen, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'palette' | 'logo' | 'slogan'>('palette');

  if (!isOpen) return null;

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Manual de Identidad & Arquitectura Visual
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                  Oficial 2026
                </span>
              </div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
                Paleta de Colores, Logo & Eslogan
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('palette')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'palette'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Paleta Cromática ({BRAND_PALETTE.length} Colores)</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'logo'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Anatomía del Logotipo</span>
          </button>

          <button
            onClick={() => setActiveTab('slogan')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'slogan'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Eslogan & Promesa de Marca</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PALETTE */}
          {activeTab === 'palette' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  Esta paleta ha sido construida con base en la <strong>psicología del color automotriz de alto rendimiento</strong> y la <strong>ergonomía visual en entornos de taller y comercio electrónico</strong>. Cada tono cumple una función técnica precisa, garantizando accesibilidad visual (WCAG AA) y guiando la decisión de compra de repuestos.
                </p>
              </div>

              {/* Swatches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BRAND_PALETTE.map((color) => (
                  <div
                    key={color.hex}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Swatch Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-10 h-10 rounded-lg shadow-md border ${color.borderClass} shrink-0`}
                            style={{ backgroundColor: color.hex }}
                          />
                          <div>
                            <h4 className="font-display font-bold text-sm text-white">
                              {color.name}
                            </h4>
                            <span className="text-[11px] font-mono text-slate-400 block">
                              {color.role}
                            </span>
                          </div>
                        </div>

                        {/* Copy button */}
                        <button
                          onClick={() => handleCopy(color.hex)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
                          title="Copiar código HEX"
                        >
                          {copiedHex === color.hex ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>{color.hex}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Rationale & Function Sections */}
                      <div className="space-y-2 text-xs pt-2 border-t border-slate-800/80">
                        <div>
                          <span className="font-semibold text-amber-400 block text-[11px] uppercase tracking-wider mb-0.5">
                            ¿Por qué se utilizó?
                          </span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {color.whyUsed}
                          </p>
                        </div>

                        <div>
                          <span className="font-semibold text-blue-400 block text-[11px] uppercase tracking-wider mb-0.5">
                            ¿Qué función cumple en la página?
                          </span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {color.functionInApp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LOGO ANATOMY */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
                    Isotipo + Logotipo Oficial
                  </span>
                  <BrandLogo size="lg" showSlogan={true} />
                </div>

                <div className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
                  <div><strong>Construcción:</strong> Vector SVG Nativo</div>
                  <div><strong>Escalabilidad:</strong> 100% Vectorial sin pérdida</div>
                  <div><strong>Tipografía Primaria:</strong> Outfit Display 800</div>
                  <div><strong>Modo:</strong> Responsive Dark Performance</div>
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">1. El Isotipo (Turbina / Disco)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>¿Por qué?:</strong> El círculo exterior perforado representa los rotores ranurados y ventilados, y los rayos internos evocan los alabes de una turbina de alta compresión.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Función:</strong> Funciona como icono de aplicación, favicon de alta resolución y sello de autenticidad para piezas con estándar de competencia.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">2. Vector Diagonal Azul</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>¿Por qué?:</strong> La línea en corte diagonal representa aceleración cinética, aerodinámica y tecnología moderna de gestión electrónica automotriz.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Función:</strong> Rompe la simetría estática del engranaje y comunica despacho en tiempo real e innovación constante.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">3. Insignia "PRO"</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>¿Por qué?:</strong> La palabra "PRO" enmarcada en dorado titanio posiciona la tienda por encima de repuestos genéricos o usados.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Función:</strong> Certifica tolerancia de equipo original (OEM), calidad testeada y garantía extendida para profesionales mecánicos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SLOGAN */}
          {activeTab === 'slogan' && (
            <div className="space-y-6">
              {/* Highlight Hero Banner */}
              <div className="p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-2">
                  Eslogan Institucional Oficial
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  “Potencia, precisión y confianza para cada kilómetro”
                </h3>
                <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Lema corporativo que sintetiza los tres pilares de valor de VORTEKSA frente al cliente particular y los talleres mecánicos.
                </p>
              </div>

              {/* Three Pillars Explanation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold font-display text-base">
                    <Zap className="w-4 h-4" />
                    <span>1. POTENCIA</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    <strong>¿Por qué se usa?:</strong> Porque los conductores no solo reparan un auto: buscan restaurar o superar su rendimiento motriz de fábrica con turbos, bujías de iridio y lubricantes de competición.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Función:</strong> Conecta con el entusiasmo mecánico y la pasión por el desempeño del motor.
                  </p>
                </div>

                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold font-display text-base">
                    <Gauge className="w-4 h-4" />
                    <span>2. PRECISIÓN</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    <strong>¿Por qué se usa?:</strong> En el rubro automotriz, comprar la pieza equivocada detiene el taller. La precisión milimétrica y la compatibilidad por año/modelo son críticas.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Función:</strong> Garantiza que cada pieza encaje a la perfección (Plug & Play) gracias a nuestro selector inteligente de vehículos.
                  </p>
                </div>

                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold font-display text-base">
                    <ShieldCheck className="w-4 h-4" />
                    <span>3. CONFIANZA</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    <strong>¿Por qué se usa?:</strong> Resuelve la desconfianza habitual sobre repuestos falsificados o inventarios fantasmas.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Función:</strong> Respaldada por inventario físico conectado en tiempo real, factura formal, garantía oficial y despacho el mismo día.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Identidad aplicada en tiempo real en la tienda y módulo ERP</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
