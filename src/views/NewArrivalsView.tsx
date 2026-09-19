import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { Product, ActivePage } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

interface NewArrivalsViewProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  wishlist: string[];
  cart: { product: Product; quantity: number }[];
  onNavigate: (page: ActivePage) => void;
}

export const NewArrivalsView: React.FC<NewArrivalsViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlist,
  cart,
  onNavigate,
}) => {
  const newProducts = PRODUCTS.filter(p => p.isNewArrival);

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" /> Season 2026 Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1E1E] mb-3">
            New Arrival Products
          </h1>
          <p className="text-sm text-gray-600">
            Meet the latest organic skincare elixirs, peptide firming complexes, and clean pigments formulated for radiance.
          </p>
        </div>

        {/* Featured Split Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8]">
          <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80"
              alt="Woman with glowing skin"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 px-3.5 py-1 bg-[#145C3A] text-white rounded-full text-xs font-bold">
              Featured Release
            </span>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A]">
              HydraLux Peptide Elixir
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1E1E]">
              Next-Generation Cellular Plumping Serum
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Infused with 5 bio-active vegan peptides, fermented snow mushroom, and cold-pressed marula oil. Clinically shown to boost moisture levels by 88% after 24 hours.
            </p>
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-serif text-3xl font-bold text-[#145C3A]">$38.00</span>
              <span className="text-sm text-gray-400 line-through">$45.00</span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  const item = PRODUCTS.find(p => p.id === 'hydralux-serum') || PRODUCTS[0];
                  onSelectProduct(item);
                }}
                className="px-8 py-3.5 bg-[#145C3A] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                Discover Product Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* New Products Grid */}
        <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-6">
          All New Releases ({newProducts.length})
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.map((product) => (
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
  );
};
