import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Car, 
  Gift, 
  Flame, 
  ArrowRight, 
  Tag, 
  Clock,
  ShieldCheck
} from 'lucide-react';
import { VEHICLE_MAKES } from '../../data/initialData';

interface WelcomeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeOfferModal: React.FC<WelcomeOfferModalProps> = ({ isOpen, onClose }) => {
  const { registerUser, isRegistered, discountCode } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    registerUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '931978990',
      vehicle: `${vehicleMake} ${vehicleModel}`.trim() || 'Vehículo Deportivo'
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg bg-slate-900/95 border border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 flex flex-col">
        {/* Animated Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 animate-pulse" />

        {/* Top Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Oferta Exclusiva de Bienvenida</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Cerrar modal de oferta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display font-black text-2xl text-white">
              ¡20% DE DESCUENTO DESBLOQUEADO!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Felicidades, tu cupón exclusivo ha sido activado en toda la tienda. Verás los precios con 20% OFF aplicados en tu carrito en Soles (S/.).
            </p>
            <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-2xl font-mono text-base text-amber-400 font-extrabold tracking-wider">
              CUPÓN: VORTEKSA20
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Ir a Comprar con 20% OFF
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Hook Hero Banner */}
            <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-950 to-slate-900 border border-amber-500/40 p-5 overflow-hidden text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex flex-col items-center justify-center font-black shrink-0 shadow-lg shadow-amber-500/30">
                  <span className="text-xl leading-none">20%</span>
                  <span className="text-[10px] uppercase font-mono tracking-tighter">OFF</span>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white leading-snug">
                    ¡Gana 20% de Descuento en tu Primer Pedido!
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Suscríbete ahora para validar este beneficio en frenos, suspensión, turbos y consumibles en Soles (S/.).
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Form (Hook Capture) */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Tu Nombre y Apellido <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Rodrigo Quispe Mendoza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Correo Electrónico <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    WhatsApp o Celular
                  </label>
                  <input
                    type="tel"
                    placeholder="931978990"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Marca de tu Vehículo
                  </label>
                  <select
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 text-white focus:outline-none font-medium"
                  >
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Modelo y Año
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Corolla GR / 2022"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-500 text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-slate-950" />
                  <span>Desbloquear 20% de Descuento Ahora</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[11px] text-slate-500 hover:text-slate-400 underline cursor-pointer"
                >
                  Continuar explorando sin descuento
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
