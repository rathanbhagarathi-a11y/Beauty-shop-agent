import React from 'react';
import { Heart, Eye, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  isWishlisted: boolean;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isWishlisted,
  isInCart = false,
}) => {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl border border-[#E9DDC8]/60 p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#145C3A]/30"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#FAF8F3] mb-3.5">
        {/* Discount Badge */}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#C9A45C] text-[#0B452A] shadow-xs tracking-tight">
            {product.discountPercent}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id, e);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#0B452A] text-white shadow-xs'
              : 'bg-white/90 text-[#1E1E1E] hover:bg-[#145C3A] hover:text-white shadow-xs'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#C9A45C]' : ''}`} />
        </button>

        {/* Product Image with subtle hover zoom */}
        <div 
          onClick={() => onSelectProduct(product)}
          className="w-full h-full cursor-pointer flex items-center justify-center p-3"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Quick View Button overlay on hover desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, e);
            }}
            className="w-full py-2 bg-white/95 text-[#145C3A] text-xs font-semibold rounded-xl backdrop-blur-xs shadow-xs hover:bg-[#145C3A] hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[11px] font-semibold text-[#145C3A] uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif text-base sm:text-lg font-semibold text-[#1E1E1E] hover:text-[#145C3A] cursor-pointer line-clamp-1 transition-colors mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center text-[#C9A45C]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current text-[#C9A45C]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#1E1E1E]">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-[#1E1E1E]/60">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-[#E9DDC8]/50 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#145C3A]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#1E1E1E]/50 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
              isInCart
                ? 'bg-[#E8F0E7] text-[#145C3A] border border-[#145C3A]'
                : 'bg-[#145C3A] text-white hover:bg-[#0B452A]'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
