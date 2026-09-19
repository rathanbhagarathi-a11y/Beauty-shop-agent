import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem, ActivePage } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: ActivePage) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 60;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    onNavigate('checkout');
  };

  const handleViewCart = () => {
    onClose();
    onNavigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-[#F8F5ED] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-l border-[#E9DDC8]"
        >
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E9DDC8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#145C3A]" />
              <h2 className="font-serif text-xl font-bold text-[#145C3A]">
                Your Cart
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F0E7] text-[#145C3A] font-semibold">
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-[#1E1E1E] rounded-full hover:bg-[#FAF8F3] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#FAF8F3] px-5 py-3 border-b border-[#E9DDC8]">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs text-[#1E1E1E] mb-2 font-medium">
                You're <strong className="text-[#145C3A] font-bold">${amountToFreeShipping.toFixed(2)}</strong> away from <span className="text-[#C9A45C] font-bold">FREE SHIPPING</span>.
              </p>
            ) : (
              <p className="text-xs text-[#145C3A] font-semibold flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-[#C9A45C]" /> You've unlocked FREE standard shipping!
              </p>
            )}
            <div className="w-full bg-[#E9DDC8]/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#145C3A] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 px-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E9DDC8] flex items-center justify-center text-[#145C3A] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#1E1E1E]/60 max-w-xs mb-6">
                  Discover our clean skincare formulations, hydrating serums, and velvet cosmetics.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                  className="px-6 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-semibold hover:bg-[#0B452A] transition-colors"
                >
                  Explore Best Sellers
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity, selectedVariant }) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl p-3.5 border border-[#E9DDC8]/70 flex gap-3.5 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-18 h-22 object-cover rounded-lg bg-[#FAF8F3] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] font-semibold text-[#145C3A] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-0.5"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-serif text-sm font-semibold text-[#1E1E1E] line-clamp-1">
                        {product.name}
                      </h4>

                      {product.volume && (
                        <p className="text-[11px] text-gray-500">
                          {product.volume}
                        </p>
                      )}
                    </div>

                    {/* Stepper and Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#E9DDC8] rounded-full bg-[#FAF8F3]">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#145C3A]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#1E1E1E]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#145C3A]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#145C3A]">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E9DDC8] space-y-3">
              <div className="space-y-1.5 text-xs text-[#1E1E1E]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-sm text-[#1E1E1E]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-[#145C3A]">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : '$4.99'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                <span className="font-serif font-bold text-base text-[#1E1E1E]">Estimated Total</span>
                <span className="font-bold text-lg text-[#145C3A]">
                  ${(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#145C3A] text-white rounded-full text-xs font-bold tracking-wide hover:bg-[#0B452A] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleViewCart}
                    className="flex-1 py-2.5 bg-white border border-[#145C3A] text-[#145C3A] rounded-full text-xs font-semibold hover:bg-[#FAF8F3] transition-colors"
                  >
                    View Cart Page
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-[#FAF8F3] text-[#1E1E1E]/80 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#145C3A]" /> 256-bit Bank Grade Secure Checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
