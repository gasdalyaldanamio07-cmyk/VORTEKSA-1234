import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, MessageSquare, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_WHATSAPP_URL, formatPrice } from '../../data/promotionsData';

interface FloatingActionHubProps {
  onOpenCart: () => void;
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export const FloatingActionHub: React.FC<FloatingActionHubProps> = ({ 
  onOpenCart, 
  onOpenChat,
  isChatOpen 
}) => {
  const { cart, discountApplied, discountPercent } = useApp();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const subtotal = discountApplied ? rawSubtotal * (1 - discountPercent / 100) : rawSubtotal;

  return (
    <>
      {/* 1. Persistent Floating Shopping Cart Indicator (Bottom-Left / Bottom-Center on mobile) */}
      {totalItems > 0 && (
        <aside 
          aria-label="Carrito de compras flotante"
          className="fixed bottom-6 left-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <button
            onClick={onOpenCart}
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-900 backdrop-blur-xl border border-amber-500/50 shadow-2xl shadow-black/80 hover:shadow-amber-500/20 text-white transition-all duration-200 active:scale-95 cursor-pointer"
            title="Abrir carrito de compras"
            aria-label={`Ver carrito: ${totalItems} repuestos, total ${formatPrice(subtotal)}`}
          >
            <div className="relative w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow">
              <ShoppingBag className="w-5 h-5 fill-current" />
              <span className="absolute -top-1.5 -right-1.5 bg-slate-950 text-amber-400 font-mono text-[11px] font-extrabold w-5 h-5 rounded-full border border-amber-500 flex items-center justify-center">
                {totalItems}
              </span>
            </div>

            <div className="text-left font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Tu Carrito</span>
                {discountApplied && (
                  <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-300 rounded font-bold">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-amber-400 block tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="hidden sm:flex items-center text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform pl-1">
              <span>Ver Pedido</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        </aside>
      )}

      {/* 2. Dual Floating Action Hub: Large WhatsApp + Chatbot (Bottom-Right) */}
      <aside 
        aria-label="Canales de contacto directo"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      >
        {/* Large Prominent WhatsApp Direct Button */}
        <a
          href={OFFICIAL_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950/80 transition-all duration-200 hover:scale-105 active:scale-95 border border-emerald-400/40 cursor-pointer"
          title="Escribir por WhatsApp al 931978990"
          aria-label="Chatear por WhatsApp al 931978990"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>

          <span className="text-base font-bold">💬</span>

          <div className="text-left">
            <span className="text-[10px] uppercase font-mono text-emerald-100 block leading-tight">
              Atención Inmediata
            </span>
            <span className="font-extrabold text-xs block leading-tight">
              WhatsApp {OFFICIAL_PHONE}
            </span>
          </div>
        </a>

        {/* Customer Support Chatbot Button */}
        {!isChatOpen && (
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 backdrop-blur-xl border border-slate-700/80 hover:border-amber-500/50 text-slate-200 font-semibold text-xs shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title="Chatbot de Asesoría Técnica VORTEKSA"
            aria-label="Abrir asistente técnico virtual"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span>Asistente Técnico</span>
          </button>
        )}
      </aside>
    </>
  );
};
