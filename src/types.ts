export type ProductCategory = 
  | 'Makeup'
  | 'Skincare'
  | 'Hair care'
  | 'Nail care'
  | 'Fragrance'
  | 'Personal care'
  | 'Beauty tools'
  | 'Other'
  | 'Skin Care'
  | 'Hair Care'
  | 'Nail Care'
  | 'Fragrances'
  | 'Body Care'
  | 'Personal Care'
  | 'Beauty Tools';

export interface CollectionDefinition {
  id: string;
  name: string;
  emoji: string;
  subcategories: string[];
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  tags?: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImages?: string[];
  description: string;
  skinType?: string[];
  skinConcerns?: string[];
  keyIngredients?: string[];
  keyBenefits?: string[];
  howToUse?: string;
  ingredients?: string;
  volume?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isDeal?: boolean;
  inStock?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  count: string;
  image: string;
  description: string;
  emoji?: string;
  subcategories?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface OrderItem {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Order Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  fullReview: string;
  rating: number;
  location?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Skincare' | 'Makeup' | 'Haircare' | 'Beauty Tips';
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FilterState {
  category: string;
  subcategory?: string;
  skinTypes: string[];
  skinConcerns: string[];
  ingredients: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  discountOnly: boolean;
  inStockOnly: boolean;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount';
}

export interface OrderInfo {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: string;
  estimatedDelivery: string;
}

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'order-tracking'
  | 'track-order'
  | 'wishlist'
  | 'account'
  | 'blogs'
  | 'about'
  | 'contact'
  | 'faq'
  | 'deals'
  | 'new-arrivals'
  | 'ingredients'
  | 'sustainability'
  | 'privacy'
  | 'terms'
  | 'returns'
  | 'careers'
  | 'stores'
  | 'shade-finder';
