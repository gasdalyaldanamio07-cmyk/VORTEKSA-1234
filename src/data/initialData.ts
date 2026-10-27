import { Product, Order, ChatMessage, LowStockAlert } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'ARP-BRK-084',
    name: 'Kit Discos de Freno Perforados & Ranurados con Cáliper Cerámico',
    category: 'Frenos',
    brand: 'PowerStop Motorsport',
    price: 349.99,
    costPrice: 210.00,
    stock: 8,
    minStockThreshold: 4,
    rating: 4.9,
    reviewsCount: 38,
    image: '/assets/images/product_disc_brakes_1792689416762.webp',
    description: 'Sistema de frenado de alto rendimiento con rotores ventilados perforados y ranurados para máxima disipación térmica y pinzas cerámicas rojas de 4 pistones.',
    specifications: {
      'Diámetro del Disco': '330 mm',
      'Material': 'Hierro G3000 + Revestimiento Geomet',
      'Compatibilidad Eje': 'Delantero (Par izquierdo/derecho)',
      'Garantía': '24 Meses o 50,000 km'
    },
    compatibleVehicles: [
      { make: 'Toyota', model: 'Corolla GR / Sedan', yearRange: '2019-2025' },
      { make: 'Honda', model: 'Civic Type-R / Si', yearRange: '2016-2024' },
      { make: 'Volkswagen', model: 'Golf GTI Mk7 / Mk8', yearRange: '2015-2024' },
      { make: 'Ford', model: 'Focus ST / RS', yearRange: '2014-2022' }
    ],
    locationWarehouse: 'Bodega Central - Pasillo A-04',
    isFeatured: true
  },
  {
    id: 'prod-2',
    sku: 'ARP-SUS-512',
    name: 'Kit Suspensión Coilover Regulable en Altura y Dureza Track-Spec',
    category: 'Suspensión',
    brand: 'RS Performance',
    price: 589.50,
    costPrice: 360.00,
    stock: 4,
    minStockThreshold: 5, // Triggers alert!
    rating: 4.8,
    reviewsCount: 29,
    image: '/assets/images/product_coilover_suspension_1792689417663.webp',
    description: 'Amortiguadores roscados monotubo de gas nitrógeno con 32 posiciones de ajuste de rebote y copelas superiores de aluminio mecanizado CNC.',
    specifications: {
      'Rango de Rebaje': '30 mm a 70 mm',
      'Dureza de Resortes': '8k Front / 6k Rear',
      'Tipo de Cuerpo': 'Acero roscado con tratamiento anticorrosión',
      'Garantía': '18 Meses'
    },
    compatibleVehicles: [
      { make: 'Subaru', model: 'WRX / STI / BRZ', yearRange: '2015-2025' },
      { make: 'Toyota', model: 'GT86 / GR86', yearRange: '2012-2025' },
      { make: 'BMW', model: 'Serie 3 E90 / F30', yearRange: '2008-2019' },
      { make: 'Mazda', model: 'MX-5 Miata / Mazda 3', yearRange: '2014-2024' }
    ],
    locationWarehouse: 'Bodega Central - Pasillo C-11',
    isFeatured: true
  },
  {
    id: 'prod-3',
    sku: 'ARP-LGT-209',
    name: 'Módulo Óptico Faro Proyector Bi-LED Laser ALR-X1 High Beam',
    category: 'Iluminación',
    brand: 'LaserTech Optics',
    price: 198.00,
    costPrice: 115.00,
    stock: 14,
    minStockThreshold: 5,
    rating: 4.9,
    reviewsCount: 42,
    image: '/assets/images/product_led_headlights_1792689417378.webp',
    description: 'Proyector óptico automotriz de 3 pulgadas con chip LED dual y diodo láser auxiliar. Produce 12,000 lúmenes con línea de corte nítida anti-deslumbramiento.',
    specifications: {
      'Potencia Lumínica': '12,000 Lúmenes (Par)',
      'Temperatura de Color': '6000K Blanco Frío Puro',
      'Voltaje': '9V - 16V DC',
      'Vida Útil': '> 50,000 Horas'
    },
    compatibleVehicles: [
      { make: 'Universal', model: 'Faros H4 / H7 / 9005 con Retrofit', yearRange: '2000-2026' },
      { make: 'Ford', model: 'F-150 / Ranger', yearRange: '2015-2023' },
      { make: 'Chevrolet', model: 'Silverado / Colorado', yearRange: '2014-2023' },
      { make: 'Toyota', model: 'Hilux / Tacoma', yearRange: '2016-2025' }
    ],
    locationWarehouse: 'Bodega Central - Pasillo B-02',
    isFeatured: true
  },
  {
    id: 'prod-4',
    sku: 'ARP-MOT-940',
    name: 'Turbocompresor Garrett G-Series G25-660 Twin-Scroll Billet',
    category: 'Motor & Turbo',
    brand: 'Garrett Motion',
    price: 1420.00,
    costPrice: 980.00,
    stock: 2,
    minStockThreshold: 3, // Low stock alert!
    rating: 5.0,
    reviewsCount: 17,
    image: '/assets/images/product_turbocharger_1792692268575.webp',
    description: 'Turbocompresor de competición con rodamiento de bolas cerámico, rueda compresora forjada Billet y carcasa de escape en acero inoxidable resistente a 1050°C.',
    specifications: {
      'Rango de Potencia': '350 - 660 HP',
      'Desplazamiento': '1.4L - 3.0L',
      'Entrada / Brida': 'T25 V-Band Twin Scroll',
      'Refrigeración': 'Agua y Aceite integrada'
    },
    compatibleVehicles: [
      { make: 'Nissan', model: 'Silvia / 350Z / 370Z', yearRange: '2003-2022' },
      { make: 'Toyota', model: 'Supra A90 / 2JZ Swap', yearRange: '1993-2024' },
      { make: 'BMW', model: 'M3 / M4 / 335i', yearRange: '2007-2023' },
      { make: 'Audi', model: 'S3 / S4 / TT RS', yearRange: '2012-2023' }
    ],
    locationWarehouse: 'Bodega Seguridad - Jaula M-01',
    isFeatured: true
  },
  {
    id: 'prod-5',
    sku: 'ARP-FLT-115',
    name: 'Filtro de Aire Cónico de Alto Flujo Lavable con Malla de Acero',
    category: 'Filtros & Aceites',
    brand: 'K&N Engineering',
    price: 74.50,
    costPrice: 42.00,
    stock: 22,
    minStockThreshold: 6,
    rating: 4.7,
    reviewsCount: 65,
    image: '/assets/images/product_cone_air_filter_1792692268226.webp',
    description: 'Filtro de algodón engrasado de 4 capas diseñado para incrementar el flujo de admisión hasta un 50% garantizando protección contra partículas microscópicas.',
    specifications: {
      'Diámetro de Entrada': '3.0 pulgadas (76 mm)',
      'Lavable & Reutilizable': 'Sí (Ciclo hasta 150,000 km)',
      'Material': 'Gasa de algodón con malla epoxi',
      'Garantía': 'Millón de Millas del fabricante'
    },
    compatibleVehicles: [
      { make: 'Toyota', model: 'Todos los modelos con admisión 3"', yearRange: '2005-2025' },
      { make: 'Honda', model: 'Civic / Accord', yearRange: '2006-2024' },
      { make: 'Mazda', model: 'Mazda 3 / 6 / CX-5', yearRange: '2010-2024' },
      { make: 'Nissan', model: 'Sentra / 350Z', yearRange: '2008-2023' }
    ],
    locationWarehouse: 'Bodega Central - Pasillo F-08'
  },
  {
    id: 'prod-6',
    sku: 'ARP-LUB-880',
    name: 'Aceite Sintético de Competición 300V Trophy 0W-40 (Garrafa 5L)',
    category: 'Filtros & Aceites',
    brand: 'Motul Motorsport',
    price: 92.00,
    costPrice: 58.00,
    stock: 0, // CRITICAL: AGOTADO!
    minStockThreshold: 6,
    rating: 4.9,
    reviewsCount: 88,
    image: '/assets/images/product_motul_oil_jug_1792692269399.webp',
    description: 'Lubricante 100% sintético con tecnología ESTER Core® para motores de gasolina o diésel que operan bajo condiciones extremas y altas temperaturas.',
    specifications: {
      'Viscosidad': 'SAE 0W-40',
      'Volumen': '5 Litros',
      'Tecnología': 'ESTER Core® Esteres orgánicos',
      'Norma': 'Supera especificaciones Motorsport OEM'
    },
    compatibleVehicles: [
      { make: 'Porsche', model: '911 / Cayman / Macan', yearRange: '2010-2025' },
      { make: 'BMW', model: 'M2 / M3 / M5 / X5M', yearRange: '2008-2025' },
      { make: 'Mercedes-Benz', model: 'AMG C63 / A45 / G63', yearRange: '2012-2024' },
      { make: 'Volkswagen', model: 'Golf R / Audi RS3', yearRange: '2015-2024' }
    ],
    locationWarehouse: 'Bodega Central - Pasillo F-01'
  },
  {
    id: 'prod-7',
    sku: 'ARP-ACC-402',
    name: 'Volante Deportivo Forrado en Alcántara Costura Roja 350mm',
    category: 'Accesorios',
    brand: 'Sparco Racing',
    price: 245.00,
    costPrice: 155.00,
    stock: 3, // Low stock
    minStockThreshold: 4,
    rating: 4.8,
    reviewsCount: 19,
    image: '/assets/images/product_alcantara_steering_wheel_1792692270141.webp',
    description: 'Volante de competición con base plana ergonómica, recubrimiento en microfibra tipo Alcántara antideslizante y centro en aluminio anodizado mate.',
    specifications: {
      'Diámetro': '350 mm (13.8")',
      'Profundidad': 'Plano con 39mm de desplazamiento',
      'Padrón de Pernos': '6x70mm standard hub',
      'Pulsador de Claxon': 'Incluido con logo'
    },
    compatibleVehicles: [
      { make: 'Universal', model: 'Requiere masa adaptadora para cada modelo', yearRange: '1990-2026' }
    ],
    locationWarehouse: 'Bodega Accesorios - Pasillo D-05'
  },
  {
    id: 'prod-8',
    sku: 'ARP-BRK-102',
    name: 'Líquido de Frenos Sintético DOT 5.1 Alto Punto de Ebullición (1L)',
    category: 'Frenos',
    brand: 'Bosch Automotive',
    price: 24.90,
    costPrice: 13.50,
    stock: 35,
    minStockThreshold: 10,
    rating: 4.6,
    reviewsCount: 51,
    image: '/assets/images/product_brake_pads_fluid_1792692269965.webp',
    description: 'Fluido hidráulico de frenos para sistemas ABS, ESP y frenado severo con punto de ebullición seco superior a 270°C.',
    specifications: {
      'Clasificación': 'DOT 5.1',
      'Punto de Ebullición Seco': '270°C (518°F)',
      'Volumen': '1 Litro',
      'Compatibilidad': 'Sistemas ABS / ESP / TSC'
    },
    compatibleVehicles: [
      { make: 'Universal', model: 'Apto para cualquier vehículo con sistema DOT 3 / 4 / 5.1', yearRange: '2000-2026' }
    ],
    locationWarehouse: 'Bodega Central - Pasillo A-01'
  }
];

export const INITIAL_ALERTS: LowStockAlert[] = [
  {
    id: 'alt-1',
    productId: 'prod-6',
    productName: 'Aceite Sintético de Competición 300V Trophy 0W-40 (Garrafa 5L)',
    sku: 'ARP-LUB-880',
    category: 'Filtros & Aceites',
    currentStock: 0,
    minStockThreshold: 6,
    severity: 'critical',
    createdAt: '2026-10-22T08:30:00Z',
    status: 'pending'
  },
  {
    id: 'alt-2',
    productId: 'prod-4',
    productName: 'Turbocompresor Garrett G-Series G25-660 Twin-Scroll Billet',
    sku: 'ARP-MOT-940',
    category: 'Motor & Turbo',
    currentStock: 2,
    minStockThreshold: 3,
    severity: 'warning',
    createdAt: '2026-10-22T09:15:00Z',
    status: 'pending'
  },
  {
    id: 'alt-3',
    productId: 'prod-2',
    productName: 'Kit Suspensión Coilover Regulable en Altura y Dureza Track-Spec',
    sku: 'ARP-SUS-512',
    category: 'Suspensión',
    currentStock: 4,
    minStockThreshold: 5,
    severity: 'warning',
    createdAt: '2026-10-21T18:40:00Z',
    status: 'pending'
  },
  {
    id: 'alt-4',
    productId: 'prod-7',
    productName: 'Volante Deportivo Forrado en Alcántara Costura Roja 350mm',
    sku: 'ARP-ACC-402',
    category: 'Accesorios',
    currentStock: 3,
    minStockThreshold: 4,
    severity: 'warning',
    createdAt: '2026-10-22T07:10:00Z',
    status: 'pending'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1048',
    orderNumber: '#ARP-1048',
    createdAt: '2026-10-22T09:42:00Z',
    customer: {
      name: 'Carlos Mendoza Ramos',
      email: 'carlos.mendoza@email.com',
      phone: '+52 55 4192 8831',
      address: 'Av. Insurgentes Sur 1420, Depto 4B',
      city: 'Ciudad de México',
      postalCode: '03920',
      vehicleMake: 'Honda',
      vehicleModel: 'Civic Type-R',
      vehicleYear: '2022'
    },
    items: [
      {
        productId: 'prod-1',
        sku: 'ARP-BRK-084',
        name: 'Kit Discos de Freno Perforados & Ranurados con Cáliper Cerámico',
        brand: 'PowerStop Motorsport',
        price: 349.99,
        quantity: 1,
        image: '/assets/images/product_disc_brakes_1792689416762.webp'
      },
      {
        productId: 'prod-8',
        sku: 'ARP-BRK-102',
        name: 'Líquido de Frenos Sintético DOT 5.1 Alto Punto de Ebullición (1L)',
        brand: 'Bosch Automotive',
        price: 24.90,
        quantity: 2,
        image: '/assets/images/product_brake_pads_fluid_1792692269965.webp'
      }
    ],
    subtotal: 399.79,
    tax: 63.97,
    shipping: 0.00,
    total: 463.76,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    status: 'procesando',
    notes: 'Solicita envío prioritario y verificación de compatibilidad con rines 18".'
  },
  {
    id: 'ord-1047',
    orderNumber: '#ARP-1047',
    createdAt: '2026-10-21T16:15:00Z',
    customer: {
      name: 'Valeria Gómez Silva',
      email: 'valeria.gomez@tallerpro.mx',
      phone: '+52 81 1204 7762',
      address: 'Calle Monterrey 340, Zona Industrial',
      city: 'Monterrey',
      postalCode: '64000',
      vehicleMake: 'Toyota',
      vehicleModel: 'Hilux',
      vehicleYear: '2021'
    },
    items: [
      {
        productId: 'prod-3',
        sku: 'ARP-LGT-209',
        name: 'Módulo Óptico Faro Proyector Bi-LED Laser ALR-X1 High Beam',
        brand: 'LaserTech Optics',
        price: 198.00,
        quantity: 2,
        image: '/assets/images/product_led_headlights_1792689417378.webp'
      }
    ],
    subtotal: 396.00,
    tax: 63.36,
    shipping: 15.00,
    total: 474.36,
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    status: 'en_camino'
  },
  {
    id: 'ord-1046',
    orderNumber: '#ARP-1046',
    createdAt: '2026-10-20T11:20:00Z',
    customer: {
      name: 'Esteban Morales P.',
      email: 'esteban.morales@correo.com',
      phone: '+52 33 2891 4455',
      address: 'Calzada Vallarta 890',
      city: 'Guadalajara',
      postalCode: '44100',
      vehicleMake: 'BMW',
      vehicleModel: 'Serie 3 F30',
      vehicleYear: '2017'
    },
    items: [
      {
        productId: 'prod-2',
        sku: 'ARP-SUS-512',
        name: 'Kit Suspensión Coilover Regulable en Altura y Dureza Track-Spec',
        brand: 'RS Performance',
        price: 589.50,
        quantity: 1,
        image: '/assets/images/product_coilover_suspension_1792689417663.webp'
      }
    ],
    subtotal: 589.50,
    tax: 94.32,
    shipping: 0.00,
    total: 683.82,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    status: 'entregado'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'agent',
    text: '¡Hola! Bienvenido a VORTEKSA. Soy Roberto del equipo técnico. ¿Qué pieza o repuesto buscas para tu auto hoy?',
    timestamp: '2026-10-22T10:00:00Z',
    read: true
  },
  {
    id: 'msg-2',
    sender: 'customer',
    text: 'Buenas tardes, quisiera confirmar si el Kit de Discos PowerStop (ARP-BRK-084) le queda directo a un Golf GTI 2020 sin modificar portacálipers.',
    timestamp: '2026-10-22T10:02:15Z',
    read: false
  },
  {
    id: 'msg-3',
    sender: 'agent',
    text: 'Hola. Sí, es 100% compatible plug-and-play para el Golf GTI Mk7.5 de 330mm de diámetro. No necesitas adaptadores ni modificaciones.',
    timestamp: '2026-10-22T10:03:40Z',
    read: true
  }
];

export const VEHICLE_MAKES = [
  'Todas las Marcas',
  'Toyota',
  'Honda',
  'Volkswagen',
  'Ford',
  'BMW',
  'Nissan',
  'Chevrolet',
  'Mazda',
  'Subaru',
  'Audi',
  'Porsche'
];
