import React, { useState, useEffect } from 'react';
import { 
  Tag, 
  Flame, 
  Clock, 
  Check, 
  Copy, 
  ShoppingCart, 
  PhoneCall, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Gift,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  PROMO_COMBOS, 
  PROMO_COUPONS, 
  OFFICIAL_PHONE, 
  OFFICIAL_WHATSAPP_URL, 
  formatPrice,
  PromoCombo 
} from '../../data/promotionsData';
import { Product } from '../../types';

interface PromotionsSectionProps {
  onOpenDetails?: (product: Product) => void;
  onOpenRegister?: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onOpenDetails, onOpenRegister }) => {
  const { products, addToCart, applyDiscountCode, isRegistered, discountPercent } = useApp();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [activeComboTab, setActiveComboTab] = useState<string>('all');

  // Countdown timer for promotional urgency
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 36,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const handleApplyCoupon = (code: string) => {
    applyDiscountCode(code);
  };

  const handleAddComboToCart = (combo: PromoCombo) => {
    combo.productIds.forEach((pid) => {
      const prod = products.find(p => p.id === pid);
      if (prod) {
        addToCart(prod, 1);
      }
    });
  };

  const filteredCombos = activeComboTab === 'all' 
    ? PROMO_COMBOS 
    : PROMO_COMBOS.filter(c => c.tag.toLowerCase().includes(activeComboTab.toLowerCase()));

  return (
    <section 
      id="promociones" 
      aria-label="Promociones y Ofertas Especiales en Soles"
      className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
    >
      {/* Liquid Glass Background Card Container */}
      <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Top Header Bar: Urgency & Soles Notice */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Promociones Especiales VORTEKSA Perú</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Packs & Combos con Descuento Directo
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Piezas complementarias empaquetadas con ahorro de hasta S/. 180.00. Precios finales en Soles (S/.).
            </p>
          </div>

          {/* Countdown timer (Liquid glass pill) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex items-center gap-2.5 shadow-lg">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="font-mono font-bold text-xs">
                <span className="text-slate-400 text-[10px] block font-sans">Expira en:</span>
                <span>{String(timeLeft.days).padStart(2, '0')}d</span> :{' '}
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span> :{' '}
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span> :{' '}
                <span className="text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>

            <a
              href={`tel:${OFFICIAL_PHONE}`}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{OFFICIAL_PHONE}</span>
            </a>
          </div>
        </div>

        {/* 20% Hook Registration Card (Clean, attractive highlight) */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-950/90 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow">
              20%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Gancho de Bienvenida: Cupón VORTEKSA20
                </span>
                {isRegistered && (
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    Activado en tu cuenta ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                {isRegistered
                  ? 'Tu descuento del 20% está listo y se aplica automáticamente en tu carrito de compras.'
                  : 'Válido exclusivamente al suscribirte en la plataforma. Obtén 20% OFF en tu primera compra.'}
              </p>
            </div>
          </div>

          {!isRegistered && onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
            >
              Suscribirme y Reclamar 20%
            </button>
          )}
        </div>

        {/* Promo Combos Grid (Liquid Glass cards with Soles formatting) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCombos.map((combo) => {
            const savings = combo.regularPrice - combo.promoPrice;
            return (
              <div
                key={combo.id}
                className="relative rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/10 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl shadow-black/50 group"
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    {combo.badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    -{combo.discountPercent}% OFF COMBO
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5 mb-4">
                  <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                    {combo.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 block font-semibold">
                    {combo.subtitle}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {combo.description}
                  </p>
                </div>

                {/* Products included list */}
                <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 mb-5 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">
                    Piezas incluidas en este kit:
                  </span>
                  {combo.productNames.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{name}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing in Soles & Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="line-through font-mono">{formatPrice(combo.regularPrice)}</span>
                      <span className="text-emerald-400 font-mono font-bold">Ahorras {formatPrice(savings)}</span>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-extrabold text-amber-400 tabular-nums">
                      {formatPrice(combo.promoPrice)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`${OFFICIAL_WHATSAPP_URL}&text=Deseo%20el%20combo%20${encodeURIComponent(combo.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors cursor-pointer"
                      title="Pedir por WhatsApp al 931978990"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => handleAddComboToCart(combo)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Añadir Combo</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coupons Strip (Clean and uncluttered) */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Cupones de Descuento Vigentes:</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Aplica en tu carrito de compras
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PROMO_COUPONS.slice(0, 3).map((cpn) => {
              const isCopied = copiedCoupon === cpn.code;
              return (
                <div 
                  key={cpn.code}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-mono font-bold text-amber-400">{cpn.code}</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded">
                        {cpn.discount}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">{cpn.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopyCoupon(cpn.code)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Copiar código"
                    >
                      {isCopied ? '¡Listo!' : 'Copiar'}
                    </button>
                    <button
                      onClick={() => handleApplyCoupon(cpn.code)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
