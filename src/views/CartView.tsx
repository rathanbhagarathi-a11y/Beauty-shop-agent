import React, { useState } from 'react';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Tag, 
  Sparkles, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { CartItem, ActivePage } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>({
    code: 'BEAUTY25',
    discountPercent: 25,
  });
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('Default 25% welcome coupon applied!');

  const FREE_SHIPPING_THRESHOLD = 60;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const estimatedTax = (subtotal - discountAmount) * 0.07; // 7% tax
  const total = Math.max(0, subtotal - discountAmount + shipping + (subtotal > 0 ? estimatedTax : 0));

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const clean = couponCode.trim().toUpperCase();
    if (clean === 'WELCOME20' || clean === 'BEAUTY20') {
      setAppliedCoupon({ code: clean, discountPercent: 20 });
      setCouponSuccess('20% welcome discount coupon applied successfully!');
    } else if (clean === 'BEAUTY25') {
      setAppliedCoupon({ code: 'BEAUTY25', discountPercent: 25 });
      setCouponSuccess('25% discount coupon applied successfully!');
    } else if (clean === 'GLOW10') {
      setAppliedCoupon({ code: 'GLOW10', discountPercent: 10 });
      setCouponSuccess('10% discount coupon applied successfully!');
    } else {
      setCouponError('Invalid promo code. Try "WELCOME20", "BEAUTY25", or "GLOW10".');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponCode('');
  };

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-[#145C3A]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigate('shop')} className="hover:text-[#145C3A]">
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#145C3A] font-semibold">Shopping Bag</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-2">
          Your Shopping Cart
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-8">
          Review your selected organic botanical treatments before proceeding to our secure checkout.
        </p>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DDC8] shadow-xs max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FAF8F3] border border-[#E9DDC8] flex items-center justify-center text-[#145C3A] mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 opacity-40" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              Looks like you haven't added anything to your cart yet. Explore our best-selling serums, moisturizers, and fragrances!
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 bg-[#145C3A] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors shadow-sm cursor-pointer"
            >
              Start Shopping Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Cart Items Table (col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping progress card */}
              <div className="bg-white p-4.5 rounded-2xl border border-[#E9DDC8] shadow-2xs">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  {amountToFreeShipping > 0 ? (
                    <span className="text-gray-700">
                      Add <strong className="text-[#145C3A]">${amountToFreeShipping.toFixed(2)}</strong> more to get <strong className="text-[#C9A45C]">FREE Shipping</strong>
                    </span>
                  ) : (
                    <span className="text-[#145C3A] flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-4 h-4 text-[#C9A45C]" /> You've qualified for FREE Standard Shipping!
                    </span>
                  )}
                  <span className="text-[11px] text-gray-400 font-mono">
                    ${subtotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#145C3A] h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-[#E9DDC8] shadow-xs divide-y divide-[#E9DDC8]/60 overflow-hidden">
                {cart.map(({ product, quantity, selectedVariant }) => (
                  <div 
                    key={product.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF8F3]/50 transition-colors"
                  >
                    {/* Thumbnail & Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-24 object-cover rounded-xl bg-[#FAF8F3] border border-[#E9DDC8] shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#145C3A] uppercase tracking-wider block">
                          {product.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E1E1E]">
                          {product.name}
                        </h3>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span>Unit Price: ${product.price.toFixed(2)}</span>
                          {product.volume && <span>• {product.volume}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Stepper, Total, and Remove */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E9DDC8] rounded-full bg-[#FAF8F3] px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#145C3A] font-bold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#1E1E1E]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#145C3A] font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <span className="font-serif font-bold text-base sm:text-lg text-[#145C3A] min-w-20 text-right">
                        ${(product.price * quantity).toFixed(2)}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons Below Cart */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-2.5 rounded-full bg-white border border-[#145C3A] text-[#145C3A] text-xs font-bold hover:bg-[#FAF8F3] transition-colors"
                >
                  ← Continue Shopping
                </button>
                <button
                  onClick={onClearCart}
                  className="px-4 py-2 text-xs text-red-600 hover:underline font-semibold"
                >
                  Clear Shopping Bag
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary Card (col-span-4) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DDC8] shadow-md space-y-6 sticky top-28">
              <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] pb-3 border-b border-[#E9DDC8]">
                Order Summary
              </h2>

              {/* Calculation Rows */}
              <div className="space-y-3 text-sm text-[#1E1E1E]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1E1E1E]">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#145C3A] font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Discount ({appliedCoupon.code} - {appliedCoupon.discountPercent}%)
                    </span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#1E1E1E]">
                    {shipping === 0 ? (
                      <span className="text-[#145C3A] font-bold">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (7%)</span>
                  <span className="font-semibold text-[#1E1E1E]">${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-[#E9DDC8] flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-lg font-bold text-[#1E1E1E] block">
                    Estimated Total
                  </span>
                  <span className="text-[11px] text-gray-500">Including all taxes & discounts</span>
                </div>
                <span className="font-serif text-3xl font-bold text-[#145C3A]">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Coupon Form */}
              <div className="pt-2 border-t border-gray-100">
                <label htmlFor="coupon-input" className="block text-xs font-bold uppercase tracking-wider text-[#145C3A] mb-2">
                  Promo Code / Voucher
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#E8F0E7] border border-[#145C3A] text-xs font-semibold text-[#145C3A]">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Coupon <strong>{appliedCoupon.code}</strong> Applied!
                    </span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:underline text-[11px] font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        id="coupon-input"
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. BEAUTY25"
                        className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E9DDC8] text-[#1E1E1E] uppercase tracking-wider focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#145C3A] text-white text-xs font-bold rounded-xl hover:bg-[#0B452A] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-600">{couponError}</p>}
                    {couponSuccess && <p className="text-xs text-[#145C3A] font-semibold">{couponSuccess}</p>}
                  </form>
                )}
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 rounded-full bg-[#145C3A] text-white text-xs sm:text-sm font-bold tracking-wide hover:bg-[#0B452A] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Badges */}
              <div className="space-y-2 pt-2 text-xs text-gray-500 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#145C3A]" />
                  <span>256-bit SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <RotateCcw className="w-4 h-4 text-[#145C3A]" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
