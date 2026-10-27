import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Car, Filter, RefreshCw } from 'lucide-react';
import { VEHICLE_MAKES } from '../../data/initialData';

export const VehicleSelector: React.FC = () => {
  const { vehicleFilter, setVehicleFilter } = useApp();
  const [selectedMake, setSelectedMake] = useState(vehicleFilter.make);
  const [selectedModel, setSelectedModel] = useState(vehicleFilter.model);
  const [selectedYear, setSelectedYear] = useState(vehicleFilter.year);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setVehicleFilter({
      make: selectedMake,
      model: selectedModel.trim(),
      year: selectedYear.trim()
    });
  };

  const handleReset = () => {
    setSelectedMake('Todas las Marcas');
    setSelectedModel('');
    setSelectedYear('');
    setVehicleFilter({
      make: 'Todas las Marcas',
      model: '',
      year: ''
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Car className="w-4 h-4 text-amber-500" />
        <span>Buscador por Vehículo / Garaje Virtual</span>
      </div>

      <form onSubmit={handleApply} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
        {/* Make Dropdown */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Marca del Vehículo
          </label>
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
          >
            {VEHICLE_MAKES.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Model Input */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Modelo (ej. Corolla, Civic, Golf)
          </label>
          <input
            type="text"
            placeholder="Escribe el modelo..."
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Year Input */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Año (ej. 2021)
          </label>
          <input
            type="text"
            placeholder="Año de fabricación..."
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar</span>
          </button>
          
          {(selectedMake !== 'Todas las Marcas' || selectedModel || selectedYear) && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
              title="Restablecer filtro"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
