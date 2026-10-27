export interface CompatibleVehicle {
  make: string;
  model: string;
  yearRange: string;
}

export type ProductCategory = 
  | 'Frenos' 
  | 'Suspensión' 
  | 'Motor & Turbo' 
  | 'Iluminación' 
  | 'Filtros & Aceites' 
  | 'Accesorios';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  costPrice: number;
  stock: number;
  minStockThreshold: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
  compatibleVehicles: CompatibleVehicle[];
  locationWarehouse: string;
  isFeatured?: boolean;
}

export interface AuthUser {
  email: string;
  name: string;
  role: 'admin' | 'customer';
  phone?: string;
  vehicle?: string;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
}

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
export type OrderStatus = 'procesando' | 'en_camino' | 'entregado' | 'cancelado';

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  notes?: string;
}

export interface LowStockAlert {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: ProductCategory;
  currentStock: number;
  minStockThreshold: number;
  severity: 'critical' | 'warning';
  createdAt: string;
  status: 'pending' | 'reordered';
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent' | 'bot';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface VehicleFilterState {
  make: string;
  model: string;
  year: string;
}
