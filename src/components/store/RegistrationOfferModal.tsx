import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Tag, Sparkles, ShieldCheck, Car, CheckCircle2 } from 'lucide-react';
import { VEHICLE_MAKES } from '../../data/initialData';

interface RegistrationOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationOfferModal: React.FC<RegistrationOfferModalProps> = ({ isOpen, onClose }) => {
  const { registerUser, isRegistered, discountCode } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('2022');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    registerUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      vehicle: `${vehicleMake} ${vehicleModel} ${vehicleYear}`.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Glow accent */}
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <span>Beneficio de Bienvenida</span>
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full font-mono uppercase">
                  10% OFF
                </span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-xl text-white">
              ¡Bienvenido a VORTEKSA!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Tu 10% de descuento ha sido activado de manera inmediata en todos los repuestos y en tu carrito de compras.
            </p>
            <div className="inline-block p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-sm text-amber-400 font-bold">
              Cupón: {discountCode || 'BIENVENIDO10'}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 p-4 rounded-xl border border-amber-500/20 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-400 block font-semibold mb-0.5">
                    ¡10% de descuento en tu primera compra!
                  </strong>
                  Regístrate como cliente preferente y recibe automáticamente el 10% de descuento aplicado en el total de tu carrito, además de soporte prioritario y validación de compatibilidad OEM.
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nombre y Apellido
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Juan Pérez González"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="juan@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Garage vehicle registration */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-500" />
                <span>¿Para qué vehículo buscas repuestos? (Opcional)</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className="px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                >
                  {VEHICLE_MAKES.filter(m => m !== 'Todas las Marcas').map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Modelo (ej. Corolla)"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500"
                />
                <input
                  type="text"
                  placeholder="Año (ej. 2022)"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  className="px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Sin spam. Privacidad 100% garantizada.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg active:scale-95"
              >
                Registrarme & Obtener 10% OFF
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
