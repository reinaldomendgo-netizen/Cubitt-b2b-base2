
export interface ProductVariant {
  sku: string;
  option1: string; // Color / Nombre de la variante
  price: number;
  compareAtPrice?: number;
  inventory: number;
  image: string;
}

export interface Product {
  id: string;
  handle: string; 
  title: string;
  description: string;
  vendor: string;
  category: string; 
  type: string; 
  mainImage: string;
  variants: ProductVariant[];
  tags: string[];
  isBestSeller?: boolean;
  isSale?: boolean;
  isOutOfStock?: boolean;
  restockingSoon?: boolean;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export type Category = string; // Dinámico basado en 'type'

export interface User {
  id: string;
  companyName: string;
  email: string;
  authorized: boolean;
  contractUpdateDate: string;
  taxId?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Paid' | 'Pending';
}

export type AppView = 'LOGIN' | 'CATALOG' | 'PRODUCT_DETAIL' | 'REVIEW_ORDER' | 'ACCOUNT';
