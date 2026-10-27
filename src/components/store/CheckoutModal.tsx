import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerInfo, PaymentMethod, Order } from '../../types';
import { 
  X, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Building2, 
  Printer, 
  ArrowLeft,
  Calendar,
  AlertCircle,
  QrCode,
  Smartphone,
  PhoneCall,
  MessageCircle
} from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_PHONE_INTL, OFFICIAL_WHATSAPP_URL, formatPrice } from '../../data/promotionsData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, checkout, discountApplied, discountPercent, discountCode, registeredUser, currentUser } = useApp();
  
  // Checkout Steps: 'form' -> 'processing' -> 'success'
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Customer Form State pre-populated with Peruvian address defaults
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: currentUser?.name || registeredUser?.name || 'Cliente VORTEKSA',
    email: currentUser?.email || registeredUser?.email || 'contacto@vorteksa.pe',
    phone: currentUser?.phone || registeredUser?.phone || OFFICIAL_PHONE,
    address: 'Av. Javier Prado Este 2465, San Borja',
    city: 'Lima',
    postalCode: '15036',
    vehicleMake: (currentUser?.vehicle || registeredUser?.vehicle)?.split(' ')[0] || 'Toyota',
    vehicleModel: (currentUser?.vehicle || registeredUser?.vehicle)?.split(' ')[1] || 'Corolla GR',
    vehicleYear: (currentUser?.vehicle || registeredUser?.vehicle)?.split(' ')[2] || '2023'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | 'yape_plin'>('yape_plin');

  // Card details state
  const [cardNumber, setCardNumber] = useState('4532 8910 2488 9201');
  const [cardHolder, setCardHolder] = useState(currentUser?.name.toUpperCase() || 'CLIENTE VORTEKSA');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('482');
  const [cardErrors, setCardErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountRate = discountApplied ? (discountPercent / 100) : 0;
  const discount = +(rawSubtotal * discountRate).toFixed(2);
  const discountedSubtotal = Math.max(0, rawSubtotal - discount);
  const tax = +(discountedSubtotal * 0.18).toFixed(2); // 18% IGV Perú
  const shipping = discountedSubtotal > 150 ? 0 : 25; // S/. 25 o gratis sobre S/. 150
  const total = +(discountedSubtotal + tax + shipping).toFixed(2);

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const errors: { [key: string]: string } = {};
    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
      if (cardNumber.replace(/\s/g, '').length < 15) {
        errors.card = 'Número de tarjeta inválido (16 dígitos requeridos).';
      }
      if (cardExpiry.length < 5) {
        errors.expiry = 'Fecha de expiración inválida (MM/AA).';
      }
      if (cardCvv.length < 3) {
        errors.cvv = 'CVV inválido (3 o 4 dígitos).';
      }
    }

    if (Object.keys(errors).length > 0) {
      setCardErrors(errors);
      return;
    }

    setCardErrors({});
    setStep('processing');

    // Simulate instant secure processing
    setTimeout(() => {
      const order = checkout(customer, paymentMethod === 'yape_plin' ? 'bank_transfer' : paymentMethod);
      if (order) {
        setCompletedOrder(order);
        setStep('success');
      } else {
        setStep('form');
      }
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-white">Pasarela de Pagos Segura (Perú)</h2>
              <span className="text-[10px] font-mono text-emerald-400">Transacción cifrada 256-bit SSL · Moneda: Soles (S/.)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Cerrar pasarela de pagos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step: Processing */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <h3 className="font-display font-bold text-lg text-white">
              Validando Pago y Descontando Stock...
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Comunicando con la pasarela bancaria y sincronizando unidades físicas en bodega central VORTEKSA.
            </p>
          </div>
        )}

        {/* Step: Success Receipt */}
        {step === 'success' && completedOrder && (
          <div className="p-6 overflow-y-auto space-y-5">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-white">
                ¡Compra Confirmada con Éxito!
              </h3>
              <p className="text-xs text-slate-400">
                Orden Oficial: <strong className="text-amber-400 font-mono text-sm">{completedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Receipt Details Card in Soles */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs space-y-4 font-mono">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-sans">
                <div>
                  <span className="text-slate-400 block text-[11px]">Cliente:</span>
                  <span className="font-semibold text-white">{completedOrder.customer.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Fecha y Hora:</span>
                  <span className="text-slate-300">
                    {new Date(completedOrder.createdAt).toLocaleDateString()} {new Date(completedOrder.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-1.5 font-sans">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block font-mono">
                  Repuestos Facturados & Descontados de Bodega:
                </span>
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-900 text-xs">
                    <span className="text-slate-200">
                      {item.quantity}x {item.name} ({item.sku})
                    </span>
                    <span className="font-mono tabular-nums text-white font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Totals in Soles */}
              <div className="pt-2 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono">{formatPrice(completedOrder.subtotal)}</span>
                </div>
                {completedOrder.discount && completedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Descuento de Bienvenida (-{discountPercent}%):</span>
                    <span className="font-mono">-{formatPrice(completedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>IGV (18% Perú):</span>
                  <span className="font-mono">{formatPrice(completedOrder.tax)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Envío Express a Domicilio:</span>
                  <span className="font-mono">
                    {completedOrder.shipping === 0 ? 'GRATIS' : formatPrice(completedOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Pagado:</span>
                  <span className="font-mono text-amber-400 text-base">
                    {formatPrice(completedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="p-3 bg-slate-900 rounded-xl flex items-center gap-3 text-slate-300 font-sans">
                <Truck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block text-xs">Destino de Entrega:</span>
                  <span className="text-slate-400 text-[11px]">
                    {completedOrder.customer.address}, {completedOrder.customer.city} · Tel: {completedOrder.customer.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Comprobante</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Cerrar y Volver a la Tienda
              </button>
            </div>
          </div>
        )}

        {/* Step: Form */}
        {step === 'form' && (
          <form onSubmit={handleProcessPayment} className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Customer and Delivery in Peru */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>1. Datos de Entrega (Perú)</span>
                </h3>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Celular / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Dirección de Entrega</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Ciudad / Distrito</label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Código Postal</label>
                    <input
                      type="text"
                      required
                      value={customer.postalCode}
                      onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Peruvian Payment Methods */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  <span>2. Método de Pago (Perú)</span>
                </h3>

                {/* Peruvian Payment Method Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape_plin')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'yape_plin'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>Yape / Plin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>BCP / BBVA</span>
                  </button>
                </div>

                {/* View: Yape / Plin (Popular Peru) */}
                {paymentMethod === 'yape_plin' && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/30 text-xs text-slate-300 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-purple-400" />
                        Paga al instante con Yape o Plin
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                        SIN COMISIÓN
                      </span>
                    </div>

                    <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl space-y-1 font-mono text-center sm:text-left">
                      <span className="text-[10px] text-slate-400 block font-sans">Número Oficial Yape/Plin:</span>
                      <span className="text-base font-black text-amber-400 block">{OFFICIAL_PHONE}</span>
                      <span className="text-[11px] text-slate-300 font-sans block">Titular: VORTEKSA Autorepuestos Perú</span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Escanea o transfiere el monto exacto de <strong className="text-amber-400 font-mono">{formatPrice(total)}</strong> y tu pedido se procesa inmediatamente con despacho el mismo día.
                    </p>
                  </div>
                )}

                {/* View: Credit Card */}
                {paymentMethod === 'credit_card' && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Número de Tarjeta (Visa, Mastercard, Diners)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="4532 0000 0000 0000"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                      {cardErrors.card && <p className="text-[11px] text-red-400 mt-1">{cardErrors.card}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Vencimiento</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                        {cardErrors.expiry && <p className="text-[11px] text-red-400 mt-1">{cardErrors.expiry}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="123"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                        {cardErrors.cvv && <p className="text-[11px] text-red-400 mt-1">{cardErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* View: Bank transfer Peru */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
                    <p className="font-semibold text-white font-sans text-xs">Cuentas Corrientes en Soles:</p>
                    <p>• BCP Soles: 193-48291048-0-12</p>
                    <p>• CCI BCP: 00219300482910480123</p>
                    <p>• BBVA Soles: 0011-0284-0100482910</p>
                    <p>Beneficiario: VORTEKSA REPUESTOS S.A.C.</p>
                    <p className="text-amber-400 font-sans text-[11px] pt-1">
                      El inventario se reserva automáticamente al completar el pedido.
                    </p>
                  </div>
                )}

                {/* Security trust badge */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Pasarela Cifrada SSL 256-Bit</span>
                  </div>
                  <span className="font-mono text-slate-300">Moneda: Soles (S/.)</span>
                </div>
              </div>
            </div>

            {/* Total and Submit CTA in Soles */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-slate-400">Total Oficial a Pagar (Incluye 18% IGV):</span>
                  {discountApplied && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded font-bold">
                      -{discountPercent}% OFF (-{formatPrice(discount)})
                    </span>
                  )}
                </div>
                <span className="font-display font-extrabold text-2xl text-amber-400 font-mono tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Confirmar y Pagar {formatPrice(total)}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
