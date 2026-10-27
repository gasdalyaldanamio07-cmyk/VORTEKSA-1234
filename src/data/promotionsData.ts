export interface PromoCombo {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  regularPrice: number;
  promoPrice: number;
  discountPercent: number;
  productIds: string[];
  productNames: string[];
  tag: string;
  image: string;
  popular?: boolean;
}

export interface PromoCoupon {
  code: string;
  discount: string;
  label: string;
  description: string;
  category?: string;
  minSpend?: number;
}

export const CURRENCY = 'S/.';

export const formatPrice = (amount: number): string => {
  return `S/. ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const OFFICIAL_PHONE = '931978990';
export const OFFICIAL_PHONE_INTL = '+51 931 978 990';
export const OFFICIAL_WHATSAPP_URL = 'https://wa.me/51931978990?text=Hola%20VORTEKSA,%20deseo%20consultar%20sobre%20las%20promociones%20y%20repuestos%20en%20Soles';

export const OFFICIAL_HASHTAGS = [
  '#VORTEKSA',
  '#AutorepuestosPro',
  '#PotenciaYPrecision',
  '#TuningPeru',
  '#RepuestosOriginales',
  '#MecanicaAutomotriz',
  '#RendimientoTotal',
  '#PasionPorLosAutos'
];

export const PROMO_COUPONS: PromoCoupon[] = [
  {
    code: 'VORTEKSA20',
    discount: '20% OFF',
    label: 'Gancho de Bienvenida',
    description: 'Válido al registrarte para tu primera compra en todo el catálogo.'
  },
  {
    code: 'PISTA20',
    discount: '20% OFF',
    label: 'Kits de Rendimiento',
    description: 'En compras de frenos deportivos y suspensiones coilovers.'
  },
  {
    code: 'TURBO15',
    discount: '15% OFF',
    label: 'Potencia & Admisión',
    description: 'En turbos Garrett, filtros cónicos y admisión de aire.'
  },
  {
    code: 'PROMO931',
    discount: 'Envío Gratis',
    label: 'Finalización de Compra',
    description: 'Envío gratis a todo el Perú en compras mayores a S/. 150 o por WhatsApp.'
  }
];

export const PROMO_COMBOS: PromoCombo[] = [
  {
    id: 'combo-frenos-pro',
    badge: 'MÁS VENDIDO · AHORRA S/. 85.00',
    title: 'Combo Frenado Extremo Track-Spec',
    subtitle: 'Rotores Ventilados + Pastillas Cerámicas',
    description: 'Máxima capacidad de frenado sin fatiga térmica para calle y circuito. Incluye par de discos perforados/ranurados de 330mm con cáliper cerámico y pastillas de compuesto de fricción GG.',
    regularPrice: 479.98,
    promoPrice: 394.99,
    discountPercent: 18,
    productIds: ['prod-1', 'prod-8'],
    productNames: [
      'Kit Discos de Freno Perforados & Ranurados PowerStop',
      'Pastillas de Freno Cerámicas Street & Track'
    ],
    tag: 'Frenos de Alto Rendimiento',
    image: '/assets/images/product_disc_brakes_1792689416762.webp',
    popular: true
  },
  {
    id: 'combo-mantenimiento-deportivo',
    badge: 'COMBO ESENCIAL · 20% OFF',
    title: 'Pack Mantenimiento Deportivo Pro',
    subtitle: 'Aceite Motul 300V Ester + Filtro Cónico K&N',
    description: 'Lubricación 100% sintética ESTER Core® de grado competición acompañada de un filtro de alto flujo lavable de 3" que aumenta hasta un 50% el caudal de aire fresco al motor.',
    regularPrice: 166.50,
    promoPrice: 132.99,
    discountPercent: 20,
    productIds: ['prod-5', 'prod-6'],
    productNames: [
      'Aceite Sintético de Competición Motul 300V 0W-40 (5L)',
      'Filtro de Aire Cónico de Alto Flujo K&N 3.0"'
    ],
    tag: 'Filtros & Lubricación',
    image: '/assets/images/product_cone_air_filter_1792692268226.webp'
  },
  {
    id: 'combo-stage-turbo',
    badge: 'POTENCIA MÁXIMA · AHORRA S/. 180.00',
    title: 'Kit Stage 1 Turbo Power Boost',
    subtitle: 'Turbo Garrett G25-660 Twin-Scroll + Admisión',
    description: 'Incremento instantáneo de potencia para motores 1.4L - 3.0L hasta 660 HP con rodamiento de bolas cerámico, refrigeración integrada y respuesta de aceleración inmediata.',
    regularPrice: 1494.50,
    promoPrice: 1314.50,
    discountPercent: 12,
    productIds: ['prod-4', 'prod-5'],
    productNames: [
      'Turbocompresor Garrett G-Series G25-660 Twin-Scroll Billet',
      'Filtro de Aire Cónico de Alto Flujo Lavable K&N'
    ],
    tag: 'Motor & Turbocompresor',
    image: '/assets/images/product_turbocharger_1792692268575.webp',
    popular: true
  },
  {
    id: 'combo-control-cockpit',
    badge: 'MANEJO & CONFORT · 15% OFF',
    title: 'Pack Manejo & Control Deportivo',
    subtitle: 'Coilovers Regulables + Volante Alcántara',
    description: 'Control absoluto del chasis con rebaje milimétrico y amortiguación de 32 posiciones acoplado a un volante de competición en cuero alcántara con costura roja de 350mm.',
    regularPrice: 839.50,
    promoPrice: 713.50,
    discountPercent: 15,
    productIds: ['prod-2', 'prod-7'],
    productNames: [
      'Kit Suspensión Coilover Regulable RS Performance Track-Spec',
      'Volante Deportivo Forrado en Alcántara Costura Roja 350mm'
    ],
    tag: 'Suspensión & Accesorios',
    image: '/assets/images/product_coilover_suspension_1792689417663.webp'
  }
];
