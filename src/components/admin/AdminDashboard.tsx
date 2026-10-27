import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, LowStockAlert, OrderStatus } from '../../types';
import { ProductFormModal } from './ProductFormModal';
import { RestockModal } from './RestockModal';
import { OptimizedImage } from '../common/OptimizedImage';
import { 
  Boxes, 
  AlertTriangle, 
  TrendingUp, 
  ShoppingBag, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  MinusCircle, 
  Download, 
  CheckCircle, 
  Clock, 
  Truck, 
  Send, 
  DollarSign,
  PackageCheck,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  PackagePlus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    alerts, 
    chatMessages, 
    adminTab, 
    setAdminTab,
    updateProductStock,
    restockProduct,
    deleteProduct,
    updateOrderStatus,
    sendAgentMessage
  } = useApp();

  // Inventory Table filters
  const [searchTerm, setSearchTerm] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState<'all' | 'normal' | 'low' | 'out'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals & Product Editing
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockSelectedProduct, setRestockSelectedProduct] = useState<Product | null>(null);

  // Chat reply state
  const [adminReplyText, setAdminReplyText] = useState('');

  // Math Calculations for KPIs
  const totalSKUs = products.length;
  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalInventoryValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const totalInventoryCost = products.reduce((acc, p) => acc + (p.costPrice * p.stock), 0);
  
  const pendingAlerts = alerts.filter(a => a.status === 'pending');
  const criticalCount = pendingAlerts.filter(a => a.severity === 'critical').length;
  const warningCount = pendingAlerts.filter(a => a.severity === 'warning').length;

  const totalSalesRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;

  // Filtered products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.locationWarehouse.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;

    let matchesStock = true;
    if (stockStatusFilter === 'out') {
      matchesStock = p.stock === 0;
    } else if (stockStatusFilter === 'low') {
      matchesStock = p.stock > 0 && p.stock <= p.minStockThreshold;
    } else if (stockStatusFilter === 'normal') {
      matchesStock = p.stock > p.minStockThreshold;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleExportCSV = () => {
    const headers = ['SKU,Nombre,Marca,Categoria,Ubicacion,Stock,Minimo,Precio,Costo\n'];
    const rows = products.map(p => 
      `"${p.sku}","${p.name}","${p.brand}","${p.category}","${p.locationWarehouse}",${p.stock},${p.minStockThreshold},${p.price},${p.costPrice}`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventario-autorepuestos-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim()) return;
    sendAgentMessage(adminReplyText);
    setAdminReplyText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top Banner & KPI Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-500 font-mono font-semibold uppercase tracking-wider mb-1">
                <span>ERP VORTEKSA</span>
                <span>·</span>
                <span>Control de Bodega en Tiempo Real</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Panel Administrativo & Inventario
              </h1>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>

              <button
                onClick={() => {
                  setRestockSelectedProduct(null);
                  setIsRestockModalOpen(true);
                }}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
                title="Agregar más stock a cualquier repuesto"
              >
                <PackagePlus className="w-4 h-4" />
                <span>Entrada de Stock</span>
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsFormModalOpen(true);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Repuesto</span>
              </button>
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Inventory Valuation */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-medium">Valoración de Inventario</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                ${totalInventoryValuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-slate-500 font-mono block mt-1">
                Costo base: ${totalInventoryCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* KPI 2: Total SKUs & Units */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-medium">Existencias en Bodega</span>
                <Boxes className="w-4 h-4 text-blue-400" />
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                {totalUnits} <span className="text-sm font-normal text-slate-400">unidades</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono block mt-1">
                {totalSKUs} códigos SKU activos
              </span>
            </div>

            {/* KPI 3: Low Stock Alerts */}
            <div 
              onClick={() => setAdminTab('alerts')}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow-sm cursor-pointer hover:border-amber-500/50 transition-colors"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-medium">Alertas de Stock Bajo</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                {pendingAlerts.length} <span className="text-sm font-normal text-slate-400">alertas</span>
              </div>
              <span className="text-[11px] text-red-400 font-mono block mt-1">
                {criticalCount} agotados · {warningCount} por debajo del mínimo
              </span>
            </div>

            {/* KPI 4: Sales Revenue */}
            <div 
              onClick={() => setAdminTab('orders')}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow-sm cursor-pointer hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-medium">Ventas Registradas</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
                ${totalSalesRevenue.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500 font-mono block mt-1">
                {totalOrdersCount} órdenes completadas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area & Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setAdminTab('inventory')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              adminTab === 'inventory'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Inventario en Tiempo Real ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('alerts')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              adminTab === 'alerts'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Notificaciones de Stock Bajo ({pendingAlerts.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('analytics')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              adminTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Estadísticas & Reportes</span>
          </button>

          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              adminTab === 'orders'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pedidos de Clientes ({orders.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('chat')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              adminTab === 'chat'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat con Clientes</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY TABLE */}
        {adminTab === 'inventory' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Filter Toolbar */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por SKU, nombre, marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Status and Category dropdowns */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="Frenos">Frenos</option>
                  <option value="Suspensión">Suspensión</option>
                  <option value="Motor & Turbo">Motor & Turbo</option>
                  <option value="Iluminación">Iluminación</option>
                  <option value="Filtros & Aceites">Filtros & Aceites</option>
                  <option value="Accesorios">Accesorios</option>
                </select>

                <select
                  value={stockStatusFilter}
                  onChange={(e) => setStockStatusFilter(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Todo el Stock</option>
                  <option value="normal">Stock Normal (&gt; mín)</option>
                  <option value="low">Stock Bajo (&le; mín)</option>
                  <option value="out">Agotados (0 unidades)</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Repuesto / SKU</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4">Ubicación Bodega</th>
                    <th className="py-3 px-4 text-right">Precio Venta</th>
                    <th className="py-3 px-4 text-right">Costo</th>
                    <th className="py-3 px-4 text-center">Stock Actual</th>
                    <th className="py-3 px-4 text-center">Estado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        No se encontraron repuestos con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => {
                      const isOut = product.stock <= 0;
                      const isLow = product.stock > 0 && product.stock <= product.minStockThreshold;

                      return (
                        <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <OptimizedImage
                                src={product.image}
                                alt={product.name}
                                fallbackTitle={product.brand}
                                fallbackSubtitle={product.sku}
                                containerClassName="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                                className="w-full h-full object-cover"
                              />
                              <div>
                                <span className="font-semibold text-white block hover:text-amber-400">
                                  {product.name}
                                </span>
                                <span className="font-mono text-amber-500 text-[11px]">
                                  {product.brand} · {product.sku}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-300">
                            {product.category}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {product.locationWarehouse}
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono font-semibold text-white tabular-nums">
                            ${product.price.toFixed(2)}
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono text-slate-400 tabular-nums">
                            ${product.costPrice.toFixed(2)}
                          </td>

                          {/* Inline Stock Adjustment Controls */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="inline-flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                              <button
                                onClick={() => updateProductStock(product.id, product.stock - 1)}
                                className="text-slate-400 hover:text-red-400 transition-colors"
                                title="Restar 1 unidad"
                              >
                                <MinusCircle className="w-4 h-4" />
                              </button>
                              <span className="font-mono font-bold text-white text-sm w-8 text-center tabular-nums">
                                {product.stock}
                              </span>
                              <button
                                onClick={() => updateProductStock(product.id, product.stock + 1)}
                                className="text-slate-400 hover:text-emerald-400 transition-colors"
                                title="Sumar 1 unidad"
                              >
                                <PlusCircle className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => {
                                setRestockSelectedProduct(product);
                                setIsRestockModalOpen(true);
                              }}
                              className="px-2 py-0.5 mt-1 bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-[10px] font-semibold rounded flex items-center justify-center gap-1 transition-colors w-full"
                              title="Agregar más stock a este repuesto"
                            >
                              <PackagePlus className="w-3 h-3 text-amber-400" />
                              <span>+ Stock</span>
                            </button>
                            <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
                              Mín: {product.minStockThreshold} uds
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 text-center">
                            {isOut ? (
                              <span className="inline-flex items-center gap-1 text-red-400 font-semibold font-mono text-[11px]">
                                <AlertTriangle className="w-3 h-3" />
                                AGOTADO
                              </span>
                            ) : isLow ? (
                              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold font-mono text-[11px]">
                                <AlertTriangle className="w-3 h-3" />
                                BAJO STOCK
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold font-mono text-[11px]">
                                <CheckCircle className="w-3 h-3" />
                                ÓPTIMO
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setRestockSelectedProduct(product);
                                  setIsRestockModalOpen(true);
                                }}
                                className="p-1.5 text-emerald-400 hover:text-white bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors"
                                title="Agregar Stock a este repuesto"
                              >
                                <PackagePlus className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsFormModalOpen(true);
                                }}
                                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                title="Editar repuesto"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`¿Eliminar repuesto "${product.name}" del catálogo?`)) {
                                    deleteProduct(product.id);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                title="Eliminar del inventario"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: AUTOMATED LOW STOCK ALERTS */}
        {adminTab === 'alerts' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  El sistema detecta automáticamente cuando las unidades de un repuesto alcanzan o caen por debajo de su umbral de seguridad mínimo. Puedes generar órdenes de compra directas al proveedor para reabastecer inventario con un clic.
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <h3 className="font-display font-semibold text-sm text-white">
                  Centro de Notificaciones & Reabastecimiento
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {pendingAlerts.length} alertas pendientes de resolución
                </span>
              </div>

              {pendingAlerts.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-base font-semibold text-white mb-1">Inventario en Niveles Óptimos</h4>
                  <p className="text-xs text-slate-500">
                    No existen repuestos con niveles críticos o por debajo del umbral mínimo configurado.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {pendingAlerts.map(alert => {
                    const prod = products.find(p => p.id === alert.productId);
                    return (
                      <div key={alert.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/20 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            alert.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            <AlertTriangle className="w-4 h-4" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                                alert.severity === 'critical' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}>
                                {alert.severity === 'critical' ? 'AGOTADO (0 UDS)' : 'STOCK CRÍTICO'}
                              </span>
                              <span className="text-xs font-mono text-slate-400">{alert.sku}</span>
                              <span className="text-xs text-slate-500">· {alert.category}</span>
                            </div>

                            <h4 className="text-sm font-semibold text-white">
                              {alert.productName}
                            </h4>

                            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                              <span>Existencia: <strong className="text-white">{alert.currentStock}</strong> uds</span>
                              <span>·</span>
                              <span>Umbral Mínimo: {alert.minStockThreshold} uds</span>
                              {prod && (
                                <>
                                  <span>·</span>
                                  <span>{prod.locationWarehouse}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Re-stock Quick Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <span className="text-[11px] text-slate-400 font-mono">Reabastecer:</span>
                          <button
                            onClick={() => restockProduct(alert.productId, 10)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                          >
                            +10 uds
                          </button>
                          <button
                            onClick={() => restockProduct(alert.productId, 25)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                          >
                            +25 uds
                          </button>
                          <button
                            onClick={() => restockProduct(alert.productId, 50)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow"
                          >
                            +50 uds
                          </button>
                          <button
                            onClick={() => {
                              if (prod) {
                                setRestockSelectedProduct(prod);
                                setIsRestockModalOpen(true);
                              }
                            }}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
                            title="Ingresar cantidad personalizada de stock"
                          >
                            <PackagePlus className="w-3.5 h-3.5" />
                            <span>Personalizado</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS & DETAILED SALES */}
        {adminTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Ingresos Totales por Ventas</span>
                <span className="font-display font-bold text-2xl text-emerald-400 font-mono tabular-nums">
                  ${totalSalesRevenue.toFixed(2)}
                </span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Acumulado de transacciones aprobadas mediante pasarela de pagos
                </p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Ticket Promedio por Pedido</span>
                <span className="font-display font-bold text-2xl text-amber-400 font-mono tabular-nums">
                  ${totalOrdersCount > 0 ? (totalSalesRevenue / totalOrdersCount).toFixed(2) : '0.00'}
                </span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Promedio en base a {totalOrdersCount} órdenes emitidas
                </p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Margen de Ganancia Estimado</span>
                <span className="font-display font-bold text-2xl text-blue-400 font-mono tabular-nums">
                  38.4%
                </span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Diferencial entre precio de venta comercial y costo de importación
                </p>
              </div>
            </div>

            {/* Sales Performance Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Simulated Sales by Category */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="font-display font-semibold text-sm text-white mb-4">
                  Distribución de Ventas por Categoría de Repuestos
                </h3>
                <div className="space-y-3">
                  {[
                    { cat: 'Frenos & Discos', percentage: 42, color: 'bg-red-500', amount: '$699.98' },
                    { cat: 'Suspensión Regulable', percentage: 28, color: 'bg-amber-500', amount: '$589.50' },
                    { cat: 'Iluminación Bi-LED', percentage: 18, color: 'bg-blue-500', amount: '$396.00' },
                    { cat: 'Filtros & Aceites Sintéticos', percentage: 12, color: 'bg-emerald-500', amount: '$184.00' }
                  ].map(item => (
                    <div key={item.cat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{item.cat}</span>
                        <span className="font-mono text-slate-400">{item.amount} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Top Selling Products */}
              <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="font-display font-semibold text-sm text-white mb-4">
                  Repuestos con Mayor Demanda
                </h3>
                <div className="space-y-3">
                  {products.slice(0, 4).map((p, idx) => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800/80">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-mono text-amber-400 font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-white block truncate">{p.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">{p.sku}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400 shrink-0 ml-2">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {adminTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-white">
                Historial de Órdenes & Despacho
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {orders.length} pedidos registrados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Orden</th>
                    <th className="py-3 px-4">Fecha</th>
                    <th className="py-3 px-4">Cliente & Destino</th>
                    <th className="py-3 px-4">Repuestos Comprados</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-center">Estado Despacho</th>
                    <th className="py-3 px-4 text-right">Gestionar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                        {order.orderNumber}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white block">{order.customer.name}</span>
                        <span className="text-slate-500 text-[11px] block">{order.customer.city} · {order.customer.phone}</span>
                        {order.customer.vehicleModel && (
                          <span className="text-amber-500/80 font-mono text-[10px]">
                            Auto: {order.customer.vehicleMake} {order.customer.vehicleModel} ({order.customer.vehicleYear})
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="space-y-0.5">
                          {order.items.map((item, i) => (
                            <div key={i} className="text-[11px]">
                              {item.quantity}x {item.name.slice(0, 30)}...
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white tabular-nums">
                        ${order.total.toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                          order.status === 'entregado'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : order.status === 'en_camino'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Update status action */}
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-[11px] text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="procesando">Procesando</option>
                          <option value="en_camino">En Camino</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ADMIN LIVE CHAT CONSOLE */}
        {adminTab === 'chat' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-sm text-white">
                  Consola de Atención al Cliente en Vivo
                </h3>
                <span className="text-xs text-slate-400">
                  Responde directamente las consultas de clientes realizadas desde la tienda web
                </span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-mono">
                Canal Activo
              </span>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/50">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.sender === 'customer'
                        ? 'bg-slate-800 text-slate-100 border border-slate-700'
                        : msg.sender === 'agent'
                        ? 'bg-amber-500 text-slate-950 font-medium'
                        : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="font-bold text-[10px] uppercase tracking-wider">
                        {msg.sender === 'customer' ? 'Cliente' : msg.sender === 'agent' ? 'Agente Técnico' : 'Asistente Auto'}
                      </span>
                      <span className="text-[10px] opacity-75 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick canned responses */}
            <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[11px] text-slate-500 font-mono shrink-0">Plantillas:</span>
              <button
                onClick={() => setAdminReplyText('Hola, confirmamos que el repuesto está en stock en Bodega Central listo para entrega inmediata.')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] whitespace-nowrap"
              >
                Stock confirmado
              </button>
              <button
                onClick={() => setAdminReplyText('Por favor proporciónanos el número de chasis (VIN) de tu vehículo para corroborar compatibilidad en el catálogo OEM.')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] whitespace-nowrap"
              >
                Solicitar VIN
              </button>
              <button
                onClick={() => setAdminReplyText('Tu pedido ya fue empaquetado y se encuentra en ruta con guía de seguimiento express.')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] whitespace-nowrap"
              >
                Guía de despacho
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendAdminReply} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
              <input
                type="text"
                placeholder="Escribe la respuesta del soporte técnico para el cliente..."
                value={adminReplyText}
                onChange={(e) => setAdminReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!adminReplyText.trim()}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Responder</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        productToEdit={editingProduct}
      />

      {/* Restock Inventory Modal (Add Stock) */}
      <RestockModal
        isOpen={isRestockModalOpen}
        onClose={() => {
          setIsRestockModalOpen(false);
          setRestockSelectedProduct(null);
        }}
        selectedProduct={restockSelectedProduct}
      />
    </div>
  );
};
