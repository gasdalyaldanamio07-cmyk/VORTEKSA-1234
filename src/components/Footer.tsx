import React from 'react';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './common/BrandLogo';

interface FooterProps {
  onOpenBrandModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrandModal }) => {
  const { setActiveMode, setSelectedCategory } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <BrandLogo size="md" showSlogan={true} />
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Distribuidor líder de repuestos, frenos de alto rendimiento, suspensión deportiva y consumibles de automoción con inventario en tiempo real.
            </p>
            {onOpenBrandModal && (
              <button
                onClick={onOpenBrandModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-[11px] font-semibold text-amber-400 transition-colors"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Manual de Marca & Paleta de Colores</span>
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Categorías</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Frenos');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kits de Frenos Cerámicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Suspensión');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Suspensión Coilover & Barras
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Motor & Turbo');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Turbos & Sistemas de Admisión
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Iluminación');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Faros Bi-LED Laser
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setTimeout(() => {
                      const el = document.getElementById('nosotros-mision-vision');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Misión, Visión & Servicios</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Location with 931978990 */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Contacto & Pedidos</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  Teléfono / Pedidos:{' '}
                  <a href="tel:931978990" className="text-amber-400 hover:text-white font-mono font-bold">
                    931978990
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-3.5 h-3.5 text-emerald-400 font-bold shrink-0">WA</span>
                <span>
                  WhatsApp:{' '}
                  <a 
                    href="https://wa.me/51931978990?text=Hola%20VORTEKSA,%20deseo%20consultar%20sobre%20un%20repuesto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-white font-mono font-bold"
                  >
                    +51 931 978 990
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Atención: contacto@vorteksa.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Bodega Central: Parque Industrial Norte #42</span>
              </div>
            </div>
          </div>

          {/* Social Hashtags & Guarantee */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Hashtags Oficiales</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
              <span className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">#VORTEKSA</span>
              <span className="text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">#AutorepuestosPro</span>
              <span className="text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">#PotenciaYPrecision</span>
              <span className="text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">#TuningPeru</span>
              <span className="text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">#RepuestosOriginales</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              Pagos encriptados SSL de 256 bits y certificación PCI-DSS. Despacho nacional con seguro de tránsito incluido.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} VORTEKSA. Todos los derechos reservados. Central: 931978990</span>
          <div className="flex items-center gap-4">
            <a href="tel:931978990" className="hover:text-amber-400 font-mono">
              Tel: 931978990
            </a>
            <span>·</span>
            <span>Términos de Servicio</span>
            <span>·</span>
            <span>Política de Devoluciones</span>
            <span>·</span>
            <span>Garantías OEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
