import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Tag, Sparkles, Check } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';
import { formatPrice } from '../../data/promotionsData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
  onOpenRegister?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  onOpenCheckout,
  onOpenRegister 
}) => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    discountApplied, 
    discountPercent,
    discountCode, 
    applyDiscountCode, 
    removeDiscount 
  } = useApp();

  const [inputPromoCode, setInputPromoCode] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountRate = discountApplied ? (discountPercent / 100) : 0;
  const discount = +(rawSubtotal * discountRate).toFixed(2);
  const discountedSubtotal = Math.max(0, rawSubtotal - discount);
  const tax = +(discountedSubtotal * 0.18).toFixed(2); // 18% IGV Perú
  const freeShippingThreshold = 150;
  const shipping = discountedSubtotal >= freeShippingThreshold || discountedSubtotal === 0 ? 0 : 25;
  const total = +(discountedSubtotal + tax + shipping).toFixed(2);
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - discountedSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromoCode.trim()) return;
    const ok = applyDiscountCode(inputPromoCode);
    if (ok) {
      setInputPromoCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 h-full flex flex-col shadow-2xl shadow-black/90">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-white">Carrito de Repuestos</h2>
              <span className="text-[10px] font-mono text-emerald-400">Precios oficiales en Soles (S/.)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 20% Discount Callout Bar if not registered */}
        {!discountApplied && onOpenRegister && (
          <div className="px-4 py-2.5 bg-gradient-to-r from-amber-600/25 to-amber-500/15 border-b border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>¿Nuevo cliente? Obtén un <strong>20% OFF</strong></span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px] hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Reclamar 20%
            </button>
          </div>
        )}

        {/* Free Shipping Progress Indicator (Soles) */}
        <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800/80 text-xs text-slate-300">
          {missingForFreeShipping > 0 ? (
            <div>
              <p className="mb-1.5">
                Agrega <strong className="text-amber-400 font-mono">{formatPrice(missingForFreeShipping)}</strong> más para obtener <span className="text-emerald-400 font-semibold">Envío Gratis a todo el Perú</span>
              </p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300" 
                  style={{ width: `${Math.min(100, (discountedSubtotal / freeShippingThreshold) * 100)}%` }} 
                />
              </div>
            </div>
          ) : (
            <p className="text-emerald-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              ¡Felicidades! Calificas para <strong>Envío Gratis a todo el Perú</strong>
            </p>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-800/60">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Tu carrito está vacío</h3>
              <p className="text-xs text-slate-400 mb-6 max-w-xs">
                Explora nuestro catálogo de frenos, suspensión, turbos y repuestos de alto rendimiento.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Continuar Navegando
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="py-4 flex gap-4 items-center">
                <OptimizedImage
                  src={item.product.image}
                  alt={item.product.name}
                  fallbackTitle={item.product.brand}
                  containerClassName="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 shrink-0 overflow-hidden"
                  className="w-full h-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-amber-500 font-mono block">
                    {item.product.brand} · {item.product.sku}
                  </span>
                  <h4 className="text-xs font-semibold text-white truncate mb-1" title={item.product.name}>
                    {item.product.name}
                  </h4>
                  <span className="text-xs font-bold font-mono text-amber-400 tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors ml-auto cursor-pointer"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon Code Section */}
        {cart.length > 0 && (
          <div className="px-6 py-3 bg-slate-950/90 border-t border-slate-800">
            {discountApplied ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>
                    Cupón <strong>{discountCode || 'VORTEKSA20'}</strong> (-{discountPercent}% OFF aplicado)
                  </span>
                </div>
                <button
                  onClick={removeDiscount}
                  className="text-emerald-400/80 hover:text-red-400 text-[11px] underline ml-2 cursor-pointer"
                >
                  Quitar
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Código (ej. VORTEKSA20)"
                    value={inputPromoCode}
                    onChange={(e) => setInputPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-xs text-white placeholder-slate-500 uppercase font-mono focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputPromoCode.trim()}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                >
                  Aplicar
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Checkout Summary in Soles */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-800 bg-slate-950/90 flex flex-col gap-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({cart.length} repuestos)</span>
                <span className="font-mono tabular-nums text-slate-200">{formatPrice(rawSubtotal)}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Descuento de Bienvenida (-{discountPercent}%)</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>IGV (18% Perú)</span>
                <span className="font-mono tabular-nums text-slate-200">{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Costo de Envío</span>
                <span className="font-mono tabular-nums text-slate-200">
                  {shipping === 0 ? <span className="text-emerald-400 font-semibold">GRATIS</span> : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total a Pagar</span>
                <span className="font-mono text-amber-400 text-lg tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <span>Continuar al Pago Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
