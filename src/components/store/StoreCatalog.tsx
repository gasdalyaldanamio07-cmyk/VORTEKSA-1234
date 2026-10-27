import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { ProductCard } from './ProductCard';
import { VehicleSelector } from './VehicleSelector';
import { Filter, SlidersHorizontal, ShieldCheck, Award, Wrench, RefreshCw } from 'lucide-react';

interface StoreCatalogProps {
  onOpenDetails: (product: Product) => void;
}

const CATEGORIES = [
  'Todos',
  'Frenos',
  'Suspensión',
  'Motor & Turbo',
  'Iluminación',
  'Filtros & Aceites',
  'Accesorios'
];

export const StoreCatalog: React.FC<StoreCatalogProps> = ({ onOpenDetails }) => {
  const { 
    products, 
    searchQuery, 
    vehicleFilter, 
    selectedCategory, 
    setSelectedCategory 
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'stock'>('featured');

  // Filter products by search query, category, and vehicle compatibility
  const filteredProducts = products.filter(product => {
    // Search
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    // Category
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;

    // Vehicle Filter
    let matchesVehicle = true;
    if (vehicleFilter.make !== 'Todas las Marcas') {
      const targetMake = vehicleFilter.make.toLowerCase();
      const targetModel = vehicleFilter.model.toLowerCase();
      
      matchesVehicle = product.compatibleVehicles.some(v => {
        const makeMatches = v.make.toLowerCase() === 'universal' || v.make.toLowerCase().includes(targetMake);
        const modelMatches = !targetModel || v.model.toLowerCase().includes(targetModel) || v.model.toLowerCase().includes('todos');
        return makeMatches && modelMatches;
      });
    }

    return matchesSearch && matchesCategory && matchesVehicle;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock') return b.stock - a.stock;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div id="catalogo-repuestos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
      {/* Vehicle Garage Filter Tool */}
      <div className="mb-10">
        <VehicleSelector />
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        {/* Category Tabs (Segmented interactive buttons per guidelines) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === category
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs text-slate-400 font-mono">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'repuesto disponible' : 'repuestos disponibles'}
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Destacados & Novedades</option>
              <option value="price-asc">Menor Precio</option>
              <option value="price-desc">Mayor Precio</option>
              <option value="stock">Mayor Stock Disponible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
            <Wrench className="w-8 h-8 text-amber-500/60" />
          </div>
          <h3 className="font-display font-semibold text-lg text-white mb-2">
            No se encontraron repuestos con los filtros actuales
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Intenta seleccionar otra categoría o restablecer el filtro de vehículo para explorar todo nuestro inventario.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todos');
              useApp().setVehicleFilter({ make: 'Todas las Marcas', model: '', year: '' });
              useApp().setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer Filtros</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}

      {/* Story & Quality Guarantee Section (E-Commerce Reference: Section 2.A) */}
      <section className="mt-20 pt-12 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
            <Award className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-display font-bold text-base text-white mb-1.5">
              Tolerancia & Certificación OEM
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cada kit de frenos, suspensión o turboalimentación es sometido a rigurosas pruebas de esfuerzo dinámico y balanceo dinámico antes de ingresar a inventario.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="font-display font-bold text-base text-white mb-1.5">
              Garantía de Calce 100% Exacto
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Si compras un repuesto validado por nuestro garaje virtual y no calza a la perfección en tu vehículo, te lo cambiamos o reembolsamos de inmediato sin costo.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
            <Wrench className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-display font-bold text-base text-white mb-1.5">
              Asesoría Técnica Especializada
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nuestro equipo de mecánicos e ingenieros automotrices responde en tiempo real tus dudas sobre especificaciones de torque, fluidos y dimensiones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
