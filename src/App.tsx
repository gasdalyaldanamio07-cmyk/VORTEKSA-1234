import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StoreHero } from './components/store/StoreHero';
import { StoreCatalog } from './components/store/StoreCatalog';
import { CompanyProfileSection } from './components/store/CompanyProfileSection';
import { ProductModal } from './components/store/ProductModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { WelcomeOfferModal } from './components/store/WelcomeOfferModal';
import { DownloadCatalogModal } from './components/store/DownloadCatalogModal';
import { LoginModal } from './components/auth/LoginModal';
import { CustomerChatWidget } from './components/chat/CustomerChatWidget';
import { AdminAuthGuard } from './components/admin/AdminAuthGuard';
import { VideoBackground } from './components/common/VideoBackground';
import { FloatingActionHub } from './components/common/FloatingActionHub';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { BrandIdentityModal } from './components/store/BrandIdentityModal';
import { PromotionsSection } from './components/store/PromotionsSection';
import { TechnicianShowcaseSection } from './components/store/TechnicianShowcaseSection';
import { SocialHashtagsBar } from './components/common/SocialHashtagsBar';
import { Product } from './types';

const MainLayout: React.FC = () => {
  const { activeMode, isRegistered } = useApp();
  
  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isDownloadCatalogOpen, setIsDownloadCatalogOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Auto-trigger Welcome Hook Offer (Temu-style) on first visit after 700ms
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('vorteksa_seen_welcome_hook');
    if (!hasSeenWelcome && !isRegistered) {
      const timer = setTimeout(() => {
        setIsWelcomeModalOpen(true);
        sessionStorage.setItem('vorteksa_seen_welcome_hook', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isRegistered]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Automotive Video */}
      <VideoBackground />

      {/* Top Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenRegister={() => setIsWelcomeModalOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="relative z-10 flex-1">
        {activeMode === 'store' ? (
          <>
            {/* 1. Hero with Search, Download PDF trigger, and dynamic showcase video */}
            <StoreHero 
              onOpenRegister={() => setIsWelcomeModalOpen(true)} 
              onOpenBrandModal={() => setIsBrandModalOpen(true)}
              onOpenDownloadCatalog={() => setIsDownloadCatalogOpen(true)}
            />

            {/* 2. Catálogo de Repuestos (directly adjacent below Hero as requested) */}
            <StoreCatalog onOpenDetails={(prod) => setSelectedProduct(prod)} />

            {/* 3. Promociones & Kits Combos (single cohesive Liquid Glass block with countdown) */}
            <PromotionsSection onOpenDetails={(prod) => setSelectedProduct(prod)} />

            {/* 4. Taller Técnico (Technician inspecting vehicle with interactive parts) */}
            <TechnicianShowcaseSection onOpenDetails={(prod) => setSelectedProduct(prod)} />

            {/* 5. Misión, Visión & Servicios Corporativos */}
            <CompanyProfileSection 
              onOpenChat={() => setIsChatOpen(true)} 
              onOpenBrandModal={() => setIsBrandModalOpen(true)}
            />

            {/* 6. Redes Sociales & Hashtags Oficiales */}
            <SocialHashtagsBar />
          </>
        ) : (
          /* Secured Admin Area with Password Protection Guard */
          <AdminAuthGuard />
        )}
      </main>

      {/* Global Footer with business hours, phone 931978990 and Brand Guidelines */}
      <div className="relative z-10">
        <Footer onOpenBrandModal={() => setIsBrandModalOpen(true)} />
      </div>

      {/* Persistent Floating Action Hub (Floating Cart with Soles total + Dual WhatsApp/Chat) */}
      <FloatingActionHub 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        isChatOpen={isChatOpen}
      />

      {/* Modals & Slide-overs */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenRegister={() => setIsWelcomeModalOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* 20% OFF Welcome Offer Hook Modal (Temu-Style) */}
      <WelcomeOfferModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      {/* Printable / Downloadable Catalog Modal (PDF & CSV) */}
      <DownloadCatalogModal
        isOpen={isDownloadCatalogOpen}
        onClose={() => setIsDownloadCatalogOpen(false)}
      />

      {/* Login Modal for fernandezursula31@gmail.com */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Customer Chat Widget */}
      <CustomerChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Brand Identity & Color Palette Modal */}
      <BrandIdentityModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
