import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, ShoppingCart, CheckCircle, AlertCircle, MapPin, Shield, Truck, Plus, Minus, PackagePlus } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product: initialProduct, onClose, onOpenCart }) => {
  const { products, addToCart, discountApplied, discountPercent, currentUser, restockProduct, setActiveMode, setAdminTab } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!initialProduct) return null;

  // Sync with live state in context for real-time stock updates
  const product = products.find(p => p.id === initialProduct.id) || initialProduct;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.minStockThreshold;
  const rate = discountApplied ? (1 - discountPercent / 100) : 1;
  const discountedPrice = product.price * rate;

  const handleAdd = () => {
    const success = addToCart(product, quantity);
    if (success) {
      onClose();
    }
  };

  const handleBuyNow = () => {
    const success = addToCart(product, quantity);
    if (success) {
      onClose();
      onOpenCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-amber-500 font-bold">{product.brand}</span>
            <span>·</span>
            <span>SKU: {product.sku}</span>
            <span>·</span>
            <span>{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Media & Warehouse Info */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <OptimizedImage
                src={product.image}
                alt={product.name}
                aspectRatio="4/3"
                priority={true}
                fallbackTitle={product.brand}
                fallbackSubtitle={product.sku}
              />
            </div>

            {/* Warehouse Location Info */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="font-semibold text-white block">Ubicación de Almacén:</span>
                <span className="text-slate-400 font-mono">{product.locationWarehouse}</span>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Garantía oficial certificada</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Despacho el mismo día</span>
              </div>
            </div>
          </div>

          {/* Right: Specs, Compatibility & Purchasing module */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 leading-snug">
                {product.name}
              </h2>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price and Stock status */}
              <div className="mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-slate-400 block font-mono">
                      {discountApplied ? `Precio con -${discountPercent}% OFF` : 'Precio Oficial Unitario'}
                    </span>
                    {discountApplied && (
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded">
                        -{discountPercent}% DESCUENTO ACTIVO
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tabular-nums">
                      S/. {discountedPrice.toFixed(2)}
                    </span>
                    {discountApplied && (
                      <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                        S/. {product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block mb-0.5">Inventario</span>
                  {isOutOfStock ? (
                    <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Sin existencias
                    </span>
                  ) : isLowStock ? (
                    <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Stock Crítico ({product.stock} restantes)
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {product.stock} en stock inmediato
                    </span>
                  )}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Especificaciones Técnicas
                </h4>
                <div className="bg-slate-950 rounded-lg border border-slate-800/80 divide-y divide-slate-800/80 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="px-3.5 py-2 flex items-center justify-between">
                      <span className="text-slate-400">{key}</span>
                      <span className="font-mono text-slate-200 font-medium text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatibility Guide */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Compatibilidad de Vehículos
                </h4>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {product.compatibleVehicles.map((v, i) => (
                    <div key={i} className="text-xs text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800/50 flex items-center justify-between">
                      <span className="font-semibold text-amber-400">{v.make} {v.model}</span>
                      <span className="text-slate-400 font-mono text-[11px]">Años: {v.yearRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {!isOutOfStock && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">Cantidad:</span>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 font-mono text-sm font-semibold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    (Máximo disponible: {product.stock})
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                    isOutOfStock
                      ? 'bg-slate-800 text-slate-500 border-slate-800 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Añadir al Carrito</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  <span>Comprar Ahora</span>
                </button>
              </div>

              {/* Admin Quick Restock Action Bar */}
              {currentUser?.role === 'admin' && (
                <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                      <PackagePlus className="w-3.5 h-3.5" />
                      Gestión Admin: Agregar Stock Rápido
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setAdminTab('inventory');
                        setActiveMode('admin');
                      }}
                      className="text-[10px] text-slate-400 hover:text-amber-400 underline font-mono"
                    >
                      Ir a ERP Completo
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Sumar uds:</span>
                    <div className="flex items-center gap-1.5 flex-1">
                      {[5, 10, 25, 50].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => restockProduct(product.id, qty)}
                          className="flex-1 py-1 px-2 bg-slate-900 hover:bg-emerald-600/20 text-slate-200 hover:text-emerald-400 text-xs font-mono font-bold rounded border border-slate-700 hover:border-emerald-500/50 transition-colors"
                          title={`Agregar +${qty} unidades`}
                        >
                          +{qty}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
