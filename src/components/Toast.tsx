import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`p-4 rounded-xl border shadow-2xl flex items-start gap-3 backdrop-blur-md ${
        toastMessage.type === 'success' 
          ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-300' 
          : toastMessage.type === 'warning'
          ? 'bg-slate-900/95 border-amber-500/40 text-amber-300'
          : 'bg-slate-900/95 border-blue-500/40 text-blue-300'
      }`}>
        <div className="shrink-0 mt-0.5">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toastMessage.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
          {toastMessage.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <div className="flex-1 text-sm text-slate-200 leading-snug">
          {toastMessage.text}
        </div>
        <button 
          onClick={clearToast}
          className="text-slate-400 hover:text-white transition-colors shrink-0"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
