import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  PackagePlus, 
  Boxes, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  FileText,
  Plus,
  Minus
} from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  isOpen,
  onClose,
  selectedProduct: initialProduct
}) => {
  const { products, restockProduct } = useApp();

  const [productId, setProductId] = useState<string>('');
  const [unitsToAdd, setUnitsToAdd] = useState<number>(10);
  const [costPrice, setCostPrice] = useState<number>(0);
  const [locationWarehouse, setLocationWarehouse] = useState<string>('');
  const [invoiceLot, setInvoiceLot] = useState<string>('');
  const [supplierNotes, setSupplierNotes] = useState<string>('');

  useEffect(() => {
    if (initialProduct) {
      setProductId(initialProduct.id);
      setCostPrice(initialProduct.costPrice);
      setLocationWarehouse(initialProduct.locationWarehouse);
    } else if (products.length > 0) {
      const first = products[0];
      setProductId(first.id);
      setCostPrice(first.costPrice);
      setLocationWarehouse(first.locationWarehouse);
    }
    setUnitsToAdd(10);
    setInvoiceLot(`ENT-${Math.floor(1000 + Math.random() * 9000)}`);
  }, [initialProduct, products, isOpen]);

  if (!isOpen) return null;

  const currentProduct = products.find(p => p.id === productId) || initialProduct || products[0];

  const handleProductChange = (newId: string) => {
    setProductId(newId);
    const prod = products.find(p => p.id === newId);
    if (prod) {
      setCostPrice(prod.costPrice);
      setLocationWarehouse(prod.locationWarehouse);
    }
  };

  const handleQuickAdd = (amount: number) => {
    setUnitsToAdd(prev => Math.max(1, prev + amount));
  };

  const currentStock = currentProduct ? currentProduct.stock : 0;
  const newStock = currentStock + unitsToAdd;
  const minThreshold = currentProduct ? currentProduct.minStockThreshold : 5;
  const totalCost = unitsToAdd * (costPrice || (currentProduct?.costPrice || 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct || unitsToAdd <= 0) return;

    restockProduct(currentProduct.id, unitsToAdd, {
      costPrice: costPrice > 0 ? costPrice : undefined,
      locationWarehouse: locationWarehouse.trim() ? locationWarehouse.trim() : undefined,
      notes: invoiceLot ? `Entrada ${invoiceLot}: +${unitsToAdd} uds` : undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Gestión de Inventario
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Entrada de Mercancía
                </span>
              </div>
              <h2 className="font-display font-bold text-lg text-white">
                Agregar Stock al Inventario
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Select Product */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Seleccionar Repuesto para Reabastecer:
            </label>
            <select
              value={productId}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.brand} ({p.sku}) | Stock actual: {p.stock} uds
                </option>
              ))}
            </select>
          </div>

          {/* Current Product Preview Card */}
          {currentProduct && (
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                <OptimizedImage
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-white truncate block">
                    {currentProduct.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-amber-500 font-semibold">{currentProduct.brand}</span>
                  <span>·</span>
                  <span>{currentProduct.sku}</span>
                  <span>·</span>
                  <span className="text-slate-500">{currentProduct.category}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-mono text-slate-400">
                    Existencia actual: <strong className="text-white">{currentStock}</strong> uds
                  </span>
                  {currentStock <= 0 ? (
                    <span className="text-[10px] px-1.5 py-0.2 bg-red-500/20 text-red-300 rounded font-mono font-bold">
                      Agotado
                    </span>
                  ) : currentStock <= minThreshold ? (
                    <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-mono font-bold">
                      Bajo Stock
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-mono font-bold">
                      Normal
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stock Increment Section */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-amber-500" />
                <span>¿Cuántas unidades deseas agregar?</span>
              </label>
              <span className="text-xs font-mono text-slate-400">
                Unidades físicas
              </span>
            </div>

            {/* Stepper Input */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setUnitsToAdd(prev => Math.max(1, prev - 1))}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Restar 1"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  required
                  value={unitsToAdd}
                  onChange={(e) => setUnitsToAdd(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center bg-transparent text-lg font-mono font-bold text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setUnitsToAdd(prev => prev + 1)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Sumar 1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick increment buttons */}
              <div className="flex items-center gap-1.5 flex-wrap flex-1">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(5)}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 rounded-lg transition-colors"
                >
                  +5
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(10)}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 rounded-lg transition-colors"
                >
                  +10
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(25)}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 rounded-lg transition-colors"
                >
                  +25
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(50)}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 rounded-lg transition-colors"
                >
                  +50
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(100)}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 rounded-lg transition-colors"
                >
                  +100
                </button>
              </div>
            </div>

            {/* Projection Calculation Box */}
            <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Existencia Actual:</span>
                <span className="font-mono text-white font-bold">{currentStock} uds</span>
              </div>

              <div className="text-amber-400 font-bold text-sm">
                + {unitsToAdd} uds
              </div>

              <div className="text-right">
                <span className="text-emerald-400 block text-[11px] font-semibold">Nuevo Stock Resultante:</span>
                <span className="font-mono text-emerald-400 font-extrabold text-base">{newStock} uds</span>
              </div>
            </div>
          </div>

          {/* Logistics & Cost Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>Costo Unitario Proveedor ($)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={costPrice}
                onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                Inversión total: ${totalCost.toFixed(2)}
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Ubicación en Bodega / Pasillo</span>
              </label>
              <input
                type="text"
                value={locationWarehouse}
                onChange={(e) => setLocationWarehouse(e.target.value)}
                placeholder="ej. Bodega Central - Pasillo A-04"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Número de Lote o Factura de Entrada (Opcional)</span>
            </label>
            <input
              type="text"
              value={invoiceLot}
              onChange={(e) => setInvoiceLot(e.target.value)}
              placeholder="ej. FAC-2026-091 / Lote #14"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Resuelve alertas automáticamente
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow flex items-center gap-1.5"
              >
                <PackagePlus className="w-4 h-4" />
                <span>Confirmar Entrada (+{unitsToAdd} uds)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
