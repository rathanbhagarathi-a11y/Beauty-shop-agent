import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  onViewProductPage: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onViewProductPage,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const allImages = [product.image, ...(product.secondaryImages || [])];

  const handleAdd = () => {
    onAddToCart(product, quantity);
  };

  const handleFullDetails = () => {
    onClose();
    onViewProductPage(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div 
          id="quick-view-dialog"
          className="relative inline-block w-full max-w-4xl p-6 sm:p-8 overflow-hidden text-left align-middle transition-all transform bg-[#F8F5ED] rounded-3xl shadow-2xl border border-[#E9DDC8]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2 rounded-full text-gray-500 hover:text-black hover:bg-white transition-colors"
            aria-label="Close quick view"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-white border border-[#E9DDC8] shadow-xs">
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold shadow-xs">
                    {product.discountPercent}% OFF
                  </span>
                )}
                <img
                  src={allImages[activeImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#145C3A] ring-2 ring-[#145C3A]/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Details */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-[#145C3A] uppercase tracking-wider">
                  {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E] mt-1 mb-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-[#C9A45C]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current text-[#C9A45C]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#1E1E1E]">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-[#145C3A]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.volume && (
                    <span className="text-xs text-gray-500 bg-white px-2.5 py-1 rounded-md border border-[#E9DDC8]">
                      {product.volume}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-[#1E1E1E]/80 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Key Benefits */}
                {product.keyBenefits && product.keyBenefits.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs font-bold text-[#145C3A] uppercase tracking-wide block mb-1.5">
                      Key Benefits
                    </span>
                    <ul className="text-xs space-y-1 text-[#1E1E1E]/80">
                      {product.keyBenefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="space-y-3 pt-3 border-t border-[#E9DDC8]">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E9DDC8] rounded-full bg-white px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#145C3A] font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#1E1E1E]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#145C3A] font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-5 bg-[#145C3A] text-white rounded-full text-xs font-bold tracking-wide hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </button>

                  {/* Wishlist Toggle */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-full border transition-all ${
                      isWishlisted
                        ? 'bg-[#0B452A] text-white border-[#0B452A]'
                        : 'bg-white text-gray-700 border-[#E9DDC8] hover:border-[#145C3A]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-[#C9A45C]' : ''}`} />
                  </button>
                </div>

                {/* View Full Page button */}
                <button
                  onClick={handleFullDetails}
                  className="w-full text-center text-xs font-semibold text-[#145C3A] hover:underline flex items-center justify-center gap-1.5 py-1"
                >
                  View Full Product Details & Customer Reviews <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E9DDC8]/60 text-[11px] text-[#1E1E1E]/70 text-center">
                <span className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#145C3A]" /> Genuine Quality
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#145C3A]" /> Fast Delivery
                </span>
                <span className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#145C3A]" /> 30-Day Return
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
