import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ShieldAlert, Store, Wrench, MessageSquareText, User, LogIn, LogOut, CheckCircle2, Palette } from 'lucide-react';
import { BrandLogo } from './common/BrandLogo';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onOpenBrandModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCart, 
  onOpenChat, 
  onOpenRegister,
  onOpenLogin,
  onOpenBrandModal
}) => {
  const { 
    activeMode, 
    setActiveMode, 
    cart, 
    alerts,
    chatMessages,
    setSelectedCategory,
    isRegistered,
    discountApplied,
    currentUser,
    logout
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingAlertsCount = alerts.filter(a => a.status === 'pending').length;
  const unreadMessagesCount = chatMessages.filter(m => !m.read && m.sender === 'customer').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner with 20% OFF & Official Phone 931978990 */}
      {activeMode === 'store' && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-semibold flex flex-wrap items-center justify-between gap-2 shadow-inner max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold">🎉 ¡20% DE DESCUENTO DE BIENVENIDA!</span>
            <span className="hidden sm:inline">Cupón oficial:</span>
            <span className="font-mono font-bold bg-slate-950/25 px-2 py-0.5 rounded text-[11px]">VORTEKSA20</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Official Phone Number 931978990 */}
            <a
              href="tel:931978990"
              className="flex items-center gap-1 font-mono font-bold text-slate-950 hover:text-white transition-colors text-xs"
              title="Llamar a la central de pedidos"
            >
              <span>📞 Pedidos:</span>
              <span className="underline">931978990</span>
            </a>

            <a
              href="https://wa.me/51931978990?text=Hola%20VORTEKSA,%20deseo%20consultar%20sobre%20un%20repuesto"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950 text-emerald-400 font-mono text-[10px] font-bold hover:bg-slate-900 transition-colors"
            >
              WhatsApp: 931978990
            </a>

            <button
              onClick={onOpenRegister}
              className="px-2.5 py-0.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-[11px] rounded-full uppercase tracking-wider transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              {isRegistered ? 'Cliente VIP (20% OFF Activo ✓)' : 'Reclamar 20% OFF ✓'}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Single text element wordmark + Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <BrandLogo 
              size="md" 
              showSlogan={true}
              onClick={() => {
                setActiveMode('store');
                setSelectedCategory('Todos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Zone 2: Navigation Links (Clean flow: Catálogo directly adjacent, no redundant video/palette) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button 
              onClick={() => {
                setActiveMode('store');
                setSelectedCategory('Todos');
                const el = document.getElementById('catalogo-repuestos');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-white font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Catálogo</span>
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                const el = document.getElementById('promociones');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-amber-400 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Promociones & Kits</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-mono font-bold">S/.</span>
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                const el = document.getElementById('taller-tecnico');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-slate-300 hover:text-amber-400 cursor-pointer"
            >
              <span>Taller Técnico</span>
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                const el = document.getElementById('nosotros-mision-vision');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-slate-300 cursor-pointer"
            >
              <span>Misión & Visión</span>
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                const el = document.getElementById('redes-hashtags');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-slate-300 hover:text-amber-400 font-mono text-xs cursor-pointer"
            >
              <span>#Redes</span>
            </button>
            <button 
              onClick={onOpenChat}
              className="relative hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-slate-300 cursor-pointer"
            >
              <MessageSquareText className="w-4 h-4 text-slate-400" />
              <span>Soporte</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action / Highly Visible Shopping Cart / User Profile / Mode Switcher */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Highly Prominent Shopping Cart (Solves reviewer issue: '¿Dónde está mi carrito?') */}
            {activeMode === 'store' && (
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-3 py-2 text-slate-100 bg-slate-900 hover:bg-slate-850 border border-amber-500/50 hover:border-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/5 group cursor-pointer"
                title="Ver carrito de compras"
                aria-label="Abrir carrito de compras"
              >
                <div className="relative text-amber-400 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5 fill-amber-500/20" />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-mono">
                      {totalCartItems}
                    </span>
                  )}
                </div>
                <div className="flex flex-col text-left font-mono">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold leading-none">
                    Carrito
                  </span>
                  <span className="text-xs font-bold text-amber-400 leading-tight">
                    {totalCartItems > 0 ? `${totalCartItems} ${totalCartItems === 1 ? 'pieza' : 'piezas'}` : 'S/. 0.00'}
                  </span>
                </div>
              </button>
            )}

            {/* User Session Profile / Login Trigger */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                  title={`Sesión iniciada: ${currentUser.email}`}
                >
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs truncate max-w-[110px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="pb-2 border-b border-slate-800">
                      <span className="text-[10px] text-amber-400 font-mono font-bold block uppercase tracking-wider">
                        {currentUser.role === 'admin' ? 'Propietaria & Admin' : 'Cliente VIP'}
                      </span>
                      <span className="font-bold text-white text-sm block">{currentUser.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono block truncate">{currentUser.email}</span>
                    </div>

                    <div className="py-2 space-y-1.5 text-slate-300 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span>Descuento de Tienda:</span>
                        <span className="text-emerald-400 font-semibold font-mono">20% ACTIVO</span>
                      </div>
                      {currentUser.vehicle && (
                        <div className="flex items-center justify-between">
                          <span>Garaje:</span>
                          <span className="text-amber-400 font-mono truncate max-w-[130px]">{currentUser.vehicle}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setActiveMode('admin');
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold text-[11px] cursor-pointer"
                      >
                        Abrir ERP Admin
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="text-red-400 hover:text-red-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Salir</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">Entrar</span>
              </button>
            )}

            {/* Switch between Storefront and Admin Panel */}
            <button
              onClick={() => setActiveMode(activeMode === 'store' ? 'admin' : 'store')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border whitespace-nowrap shrink-0 ${
                activeMode === 'admin'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600'
              }`}
            >
              {activeMode === 'admin' ? (
                <>
                  <Store className="w-4 h-4" />
                  <span>Ver Tienda</span>
                </>
              ) : (
                <>
                  <Wrench className="w-4 h-4 text-amber-500" />
                  <span>Panel Admin</span>
                  {pendingAlertsCount > 0 && (
                    <span className="ml-1 bg-red-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 inline" />
                      {pendingAlertsCount}
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
