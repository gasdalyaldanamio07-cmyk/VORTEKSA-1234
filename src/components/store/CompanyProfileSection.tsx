import React, { useState } from 'react';
import { 
  Target, 
  Eye, 
  Wrench, 
  Headphones, 
  FileText, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileCheck2,
  X,
  Maximize2,
  Palette,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OptimizedImage } from '../common/OptimizedImage';

interface CompanyProfileSectionProps {
  onOpenChat?: () => void;
  onScrollToCatalog?: () => void;
  onOpenBrandModal?: () => void;
}

export const CompanyProfileSection: React.FC<CompanyProfileSectionProps> = ({
  onOpenChat,
  onScrollToCatalog,
  onOpenBrandModal
}) => {
  const { setSelectedCategory } = useApp();
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    nombre: '',
    telefono: '',
    vehiculo: '',
    piezas: ''
  });

  const handleScrollToCatalog = () => {
    if (onScrollToCatalog) {
      onScrollToCatalog();
    } else {
      const el = document.getElementById('catalogo-repuestos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 450, behavior: 'smooth' });
      }
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSent(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteSent(false);
      setQuoteForm({ nombre: '', telefono: '', vehiculo: '', piezas: '' });
    }, 2200);
  };

  return (
    <section 
      id="nosotros-mision-vision" 
      aria-label="Misión, Visión y Servicios Corporativos"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full" />
      </div>

      {/* Section Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NOMBRE: VORTEKSA</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
          VORTEKSA — Nuestra Misión, Visión y Servicios
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          Lineamientos oficiales de VORTEKSA: Ofrecemos repuestos y accesorios automotrices de calidad para talleres mecánicos y propietarios de vehículos con atención confiable y presencia digital.
        </p>

        {/* Buttons to view original document and brand identity */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowDocumentModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-amber-500/50 text-xs font-medium text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver documento original digitalizado</span>
            <Maximize2 className="w-3 h-3 text-slate-500" />
          </button>

          {onOpenBrandModal && (
            <button
              onClick={onOpenBrandModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 text-xs font-semibold text-amber-400 transition-all shadow-sm"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Ver Paleta de Colores, Logo & Eslogan</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Nuestra Misión & Nuestra Visión */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
        {/* Card: Nuestra Misión */}
        <div className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-7 sm:p-8 transition-all duration-300 shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400 block">
                  Propósito Fundamental
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  Nuestra misión
                </h3>
              </div>
            </div>

            {/* Exact Text from Image */}
            <div className="relative pl-4 border-l-2 border-amber-500/60 my-4">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                &ldquo;Ofrecer repuestos y accesorios automotrices de calidad para satisfacer las necesidades de nuestros clientes, especialmente talleres mecánicos y propietarios de vehículos, mediante una atención confiable, asesoría para la selección de las piezas adecuadas y un proceso de compra práctico y accesible, tanto presencial como a través de nuestra tienda virtual.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-amber-300 font-medium">✓ Calidad garantizada</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300">✓ Talleres y particulares</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300">✓ Atención confiable</span>
          </div>
        </div>

        {/* Card: Nuestra Visión */}
        <div className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-7 sm:p-8 transition-all duration-300 shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400 block">
                  Proyección a Futuro
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  Nuestra visión:
                </h3>
              </div>
            </div>

            {/* Exact Text from Image */}
            <div className="relative pl-4 border-l-2 border-amber-500/60 my-4">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                &ldquo;Ser una empresa reconocida en el mercado de repuestos y accesorios automotrices por la calidad de nuestros productos, la confianza de nuestros clientes y la eficiencia de nuestro servicio, consolidando nuestra presencia digital mediante una tienda virtual que facilite la búsqueda, cotización y compra de repuestos para talleres mecánicos y usuarios en general.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-amber-300 font-medium">✓ Liderazgo y confianza</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300">✓ Eficiencia digital</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300">✓ Cotización rápida</span>
          </div>
        </div>
      </div>

      {/* Services Section (SERVICIOS) */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <span>Portafolio de Soluciones</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              SERVICIOS
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Atención directa y soluciones integrales de repuestos para mantener tu vehículo o taller operando al 100%.
            </p>
          </div>
        </div>

        {/* 5 Interactive Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Servicio 1: Asesoría para identificar repuestos adecuados */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 flex flex-col justify-between transition-all hover:bg-slate-900 duration-200 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                Asesoría para identificar repuestos adecuados.
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Validamos el número de parte OEM, código de chasis (VIN) y especificaciones técnicas exactas para garantizar compatibilidad total en tu modelo.
              </p>
            </div>
            <button
              onClick={onOpenChat}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all mt-2"
            >
              <span>Solicitar Asesoría</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Servicio 2: Atención de consultas de los clientes */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 flex flex-col justify-between transition-all hover:bg-slate-900 duration-200 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors">
                Atención de consultas de los clientes.
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Canal directo para atender cualquier duda sobre inventario disponible, envíos urgentes, marcas recomendadas y seguimiento de compras.
              </p>
            </div>
            <button
              onClick={onOpenChat}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all mt-2"
            >
              <span>Hacer una Consulta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Servicio 3: Cotización de productos */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 flex flex-col justify-between transition-all hover:bg-slate-900 duration-200 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                Cotización de productos.
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Elaboramos presupuestos formales para talleres mecánicos, flotas y particulares con precios competitivos y disponibilidad inmediata.
              </p>
            </div>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-blue-500 hover:text-white text-slate-200 text-xs font-semibold transition-all mt-2"
            >
              <span>Pedir Cotización</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Servicio 4: Compra de repuestos mediante la tienda virtual */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 flex flex-col justify-between transition-all hover:bg-slate-900 duration-200 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                Compra de repuestos mediante la tienda virtual.
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Explora nuestro catálogo en línea con filtros por vehículo, 10% de descuento automático en tu compra y despacho seguro hasta tu taller o domicilio.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                handleScrollToCatalog();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all mt-2 shadow-sm"
            >
              <span>Comprar en Línea</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Servicio 5: Orientación sobre disponibilidad y entrega de pedidos */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 flex flex-col justify-between transition-all hover:bg-slate-900 duration-200 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors">
                Orientación sobre disponibilidad y entrega de pedidos.
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Monitoreo en tiempo real de existencias en almacén central, envíos exprés en 24h y asesoría de despacho seguro a cualquier destino.
              </p>
            </div>
            <button
              onClick={onOpenChat}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all mt-2"
            >
              <span>Consultar Entrega</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Ver imagen del documento oficial */}
      {showDocumentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-white text-sm">Documento Oficial: VORTEKSA — Misión, Visión y Servicios</h4>
              </div>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-slate-950/50 flex flex-col items-center">
              <div className="border border-slate-800 rounded-xl overflow-hidden shadow-inner max-h-[75vh] overflow-y-auto w-full flex justify-center bg-white p-2">
                <OptimizedImage 
                  src="/assets/aistudio/image_6cb76264.webp" 
                  alt="Documento oficial VORTEKSA: Misión, Visión y Servicios" 
                  className="w-full h-auto object-contain rounded"
                  objectFit="contain"
                />
              </div>
              <p className="mt-3 text-xs text-slate-400 text-center">
                Registro fiel de los lineamientos corporativos institucionales de VORTEKSA.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-white text-base">Cotización de Productos</h4>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quoteSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-white text-lg">¡Cotización Solicitada!</h5>
                <p className="text-xs text-slate-300">
                  Hemos recibido tu solicitud. Nuestro equipo de asesores técnicos te enviará la cotización con el 10% de descuento incluido.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5 text-xs">
                <p className="text-slate-400 text-xs">
                  Ingresa los detalles de tu vehículo o las piezas que necesitas para cotizar al mejor precio:
                </p>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tu Nombre o Nombre de Taller</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.nombre}
                    onChange={(e) => setQuoteForm({...quoteForm, nombre: e.target.value})}
                    placeholder="Ej. Taller Mecánico Morales / Juan Pérez"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Teléfono o WhatsApp (Central: 931978990)</label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.telefono}
                    onChange={(e) => setQuoteForm({...quoteForm, telefono: e.target.value})}
                    placeholder="Ej. 931978990"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Vehículo (Marca, Modelo y Año)</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.vehiculo}
                    onChange={(e) => setQuoteForm({...quoteForm, vehiculo: e.target.value})}
                    placeholder="Ej. Toyota Hilux 2021 2.8 D-4D"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Repuestos o Accesorios Requeridos</label>
                  <textarea
                    rows={3}
                    required
                    value={quoteForm.piezas}
                    onChange={(e) => setQuoteForm({...quoteForm, piezas: e.target.value})}
                    placeholder="Ej. Pastillas de freno delanteras, discos ventilados y kit de amortiguadores"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
