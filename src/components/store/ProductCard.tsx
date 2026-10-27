import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';
import { formatPrice } from '../../data/promotionsData';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, discountApplied, discountPercent } = useApp();

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.minStockThreshold;
  const rate = discountApplied ? (1 - discountPercent / 100) : 1;
  const discountedPrice = product.price * rate;

  return (
    <div className="group relative bg-slate-900/70 backdrop-blur-md border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl shadow-black/50">
      {/* Product Image Container */}
      <div 
        onClick={() => onOpenDetails(product)}
        className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer"
      >
        <OptimizedImage
          src={product.image}
          alt={product.name}
          aspectRatio="4/3"
          fallbackTitle={product.brand}
          fallbackSubtitle={product.sku}
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="px-3.5 py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl backdrop-blur-md border border-slate-700 flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ficha Técnica</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Brand · SKU · Category */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-mono">
            <span className="font-semibold text-amber-500">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.sku}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="font-display font-semibold text-sm sm:text-base text-white hover:text-amber-400 cursor-pointer line-clamp-2 mb-2 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Stock Status text */}
          <div className="flex items-center gap-1.5 text-xs mb-3 font-mono">
            {isOutOfStock ? (
              <span className="text-red-400 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                Agotado temporalmente
              </span>
            ) : isLowStock ? (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                ¡Últimas {product.stock} unidades!
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {product.stock} en stock en bodega
              </span>
            )}
          </div>
        </div>

        {/* Footer: Price in Soles & Add to Cart Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">
                {discountApplied ? `Precio -${discountPercent}% OFF` : 'Precio Oficial'}
              </span>
              {discountApplied && (
                <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded">
                  -{discountPercent}% ACTIVO
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-amber-400 font-mono tabular-nums">
                {formatPrice(discountedPrice)}
              </span>
              {discountApplied && (
                <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold active:scale-95 shadow-md shadow-amber-500/10'
            }`}
            title={isOutOfStock ? 'Sin stock disponible' : 'Añadir al carrito de compras'}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Agotado' : 'Añadir'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
