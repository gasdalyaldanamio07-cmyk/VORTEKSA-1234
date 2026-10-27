import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Phone, 
  Building2, 
  ShieldCheck,
  Share2
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { OFFICIAL_PHONE, OFFICIAL_PHONE_INTL, formatPrice } from '../../data/promotionsData';

interface DownloadCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCatalogModal: React.FC<DownloadCatalogModalProps> = ({ isOpen, onClose }) => {
  const { products } = useApp();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['SKU,Nombre,Marca,Categoria,Ubicacion,Stock,Precio_Soles\n'];
    const rows = products.map(p => 
      `"${p.sku}","${p.name}","${p.brand}","${p.category}","${p.locationWarehouse}",${p.stock},${p.price.toFixed(2)}`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `catalogo-vorteksa-peru-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Edición Oficial 2026
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Precios en Soles (S/.)
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Catálogo Digital de Repuestos VORTEKSA
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Imprimir o guardar como PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Guardar PDF</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Descargar tabla en CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Descargar CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Catalog Content */}
        <div id="printable-catalog" className="overflow-y-auto p-6 space-y-6 text-slate-200 text-xs">
          {/* Brand & Contact Banner */}
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <BrandLogo size="md" showSlogan={true} />
              <p className="text-slate-400 text-xs pt-1">
                Línea oficial de repuestos, frenos, coilovers, turbos y consumibles de alto rendimiento.
              </p>
            </div>

            <div className="text-right font-mono text-xs space-y-1">
              <div className="flex items-center gap-2 justify-end text-amber-400 font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>Central Pedidos: {OFFICIAL_PHONE}</span>
              </div>
              <div className="text-slate-400">
                WhatsApp: {OFFICIAL_PHONE_INTL}
              </div>
              <div className="text-[11px] text-emerald-400">
                Garantía oficial de 12 a 24 meses
              </div>
            </div>
          </div>

          {/* Product Items Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">SKU / Marca</th>
                  <th className="py-3 px-4">Descripción del Repuesto</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-right">Precio Oficial (S/.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs font-mono">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-amber-400">
                      {prod.sku}
                      <span className="block text-[10px] text-slate-400 font-normal">{prod.brand}</span>
                    </td>
                    <td className="py-3 px-4 font-sans text-white">
                      <strong className="block text-xs font-semibold">{prod.name}</strong>
                      <span className="text-[11px] text-slate-400 line-clamp-1">{prod.description}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {prod.category}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {prod.stock > 0 ? (
                        <span className="text-emerald-400 font-bold">{prod.stock} uds</span>
                      ) : (
                        <span className="text-red-400 font-bold">Bajo Pedido</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-amber-400 text-sm tabular-nums">
                      {formatPrice(prod.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Catalog Footer Notice */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Precios con 18% IGV incluido para Perú · Despacho a todo el país</span>
            </div>
            <div className="text-amber-400 font-bold">
              Pedidos y cotizaciones: 931978990
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Total {products.length} productos indexados
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-transform active:scale-95 shadow cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Descargar / Imprimir en PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
