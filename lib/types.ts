export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  dyeOrigin?: string;
  priceDeltaMga?: number;
}

export interface ProductSize {
  id: string;
  label: string;
  dimensions: string;
  priceDeltaMga: number;
  details?: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  collection: string;
  category: string;
  price_mga: number;
  subtitle: string;
  description: string;
  material_details: string;
  care_instructions: string[];
  dimensions: string;
  weaving_hours: number;
  origin_region: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  featured: boolean;
  in_stock: boolean;
  handles?: string;
  interior?: string;
  production_delay?: string;
}

export interface ShippingZone {
  id: number;
  code: string;
  name: string;
  fee_mga: number;
  delivery_estimate: string;
  description: string;
}

export interface CustomerReview {
  id: number;
  author_name: string;
  location: string;
  product_name: string;
  rating: number;
  comment: string;
  verified_purchase: boolean;
  review_date: string;
}

export interface OrderItemInput {
  productId: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  selectedColor: string;
  selectedSize: string;
  unitPriceMga: number;
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryZoneCode: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryNotes?: string;
  paymentMethod: "especes_livraison" | "mvola" | "orange_money";
  paymentPhone?: string;
  paymentReference?: string;
  items: OrderItemInput[];
}

export interface OrderRecord {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  delivery_zone_code: string;
  delivery_address: string;
  delivery_city: string;
  delivery_notes: string | null;
  payment_method: string;
  payment_phone: string | null;
  payment_reference: string | null;
  subtotal_mga: number;
  shipping_fee_mga: number;
  total_mga: number;
  items: OrderItemInput[];
  status: string;
  created_at: string;
}
