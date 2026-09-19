import React from 'react';
import { Sparkles, Tag, ArrowRight, Clock, ShieldCheck, Star } from 'lucide-react';
import { Product, ActivePage } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { CountdownTimer } from '../components/CountdownTimer';

interface DealsViewProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  wishlist: string[];
  cart: { product: Product; quantity: number }[];
  onNavigate: (page: ActivePage) => void;
}

export const DealsView: React.FC<DealsViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlist,
  cart,
  onNavigate,
}) => {
  // Products with discounts
  const dealProducts = PRODUCTS.filter(p => p.discountPercent && p.discountPercent > 0);

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Banner */}
        <div className="rounded-3xl bg-[#0B452A] text-white p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3.5 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold uppercase tracking-wider">
              Exclusive Flash Offers
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Weekly Deals: Beauty Must-Haves Up to 50% Off
            </h1>
            <p className="text-sm sm:text-base text-[#F8F5ED]/80">
              Save big on luxury botanical serums, nourishing hair therapies, velvet foundations, and body oils. Fresh batches bottled for maximum potency.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <CountdownTimer initialHours={15} label="Special Pricing Expires in:" variant="gold" />
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-40 mix-blend-luminosity">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Promo Code Banner */}
        <div className="bg-[#FAF8F3] border-2 border-dashed border-[#C9A45C] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm sm:text-base text-[#1E1E1E]">
                Stackable Promo Code: Use <strong className="text-[#145C3A] font-mono">BEAUTY25</strong>
              </span>
              <p className="text-xs text-gray-500">
                Get an extra 25% off all discounted items at checkout today!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText('BEAUTY25');
              }
            }}
            className="px-6 py-2 rounded-full bg-[#145C3A] text-white text-xs font-bold hover:bg-[#0B452A] transition-colors shrink-0 cursor-pointer"
          >
            Copy Code: BEAUTY25
          </button>
        </div>

        {/* Deals Grid */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-6">
            Today's Top Discounted Products ({dealProducts.length})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {dealProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={(p, e) => onAddToCart(p, e)}
                onToggleWishlist={(id, e) => onToggleWishlist(id, e)}
                onQuickView={(p, e) => onQuickView(p, e)}
                isWishlisted={wishlist.includes(product.id)}
                isInCart={cart.some(item => item.product.id === product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
