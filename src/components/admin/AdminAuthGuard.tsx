import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './AdminDashboard';
import { ShieldAlert, Lock, Mail, ArrowLeft, KeyRound, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const AdminAuthGuard: React.FC = () => {
  const { currentUser, loginWithEmail, setActiveMode } = useApp();
  const [adminEmail, setAdminEmail] = useState('fernandezursula31@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated as administrator, display the dashboard
  if (currentUser?.role === 'admin') {
    return <AdminDashboard />;
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!adminEmail.trim()) {
      setErrorMessage('Ingresa el correo del administrador.');
      return;
    }

    if (adminPassword.trim() !== 'admin2026' && adminPassword.trim() !== 'vorteksa2026') {
      setErrorMessage('Contraseña administrativa incorrecta. Clave demo asignada: admin2026');
      return;
    }

    const success = loginWithEmail(adminEmail, adminPassword, 'Ursula Fernandez');
    if (!success) {
      setErrorMessage('Credenciales inválidas.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/80 p-8 space-y-6">
        <div className="flex justify-center">
          <BrandLogo size="md" />
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-red-400" />
            <span>Módulo ERP Protegido</span>
          </div>
          <h2 className="font-display font-extrabold text-xl text-white">
            Autenticación de Administrador
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            El acceso al inventario en bodega, lista de clientes y finanzas está restringido para garantizar la privacidad y seguridad de la información.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-500/15 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleUnlock} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Correo del Administrador:
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="fernandezursula31@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Contraseña de Acceso ERP:
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Clave de acceso: <strong>admin2026</strong></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Cifrado SSL
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Desbloquear Panel Administrativo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('store')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Tienda Virtual</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
