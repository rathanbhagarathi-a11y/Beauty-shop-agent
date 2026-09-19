import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Check
} from 'lucide-react';
import { CartItem, ActivePage, OrderInfo } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  onPlaceOrder: (orderInfo: OrderInfo) => void;
  onNavigate: (page: ActivePage) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  onPlaceOrder,
  onNavigate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    email: 'sophie.turner@example.com',
    phone: '+1 (555) 234-5678',
    firstName: 'Sophie',
    lastName: 'Turner',
    address: '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'United States',
    shippingMethod: 'standard', // 'standard' | 'express'
    paymentMethod: 'card', // 'card' | 'paypal' | 'apple'
    cardNumber: '4532 •••• •••• 8892',
    cardExpiry: '08/28',
    cardCvc: '•••',
    cardName: 'Sophie Turner',
    saveAddress: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Pricing math
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * 0.25; // 25% welcome coupon
  const shippingCost = formData.shippingMethod === 'express' ? 12.00 : (subtotal >= 60 ? 0 : 4.99);
  const tax = (subtotal - discount) * 0.07;
  const total = subtotal - discount + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderNumber = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderInfo = {
        orderNumber,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal,
        discount,
        shipping: shippingCost,
        total,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        status: 'Processing',
        estimatedDelivery: '3-5 Business Days',
      };
      onPlaceOrder(order);
      setIsProcessing(false);
      onNavigate('order-confirmation');
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('cart')}
            className="text-xs font-semibold text-[#145C3A] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>

          {/* Secure Badge */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white px-3 py-1 rounded-full border border-[#E9DDC8]">
            <Lock className="w-3.5 h-3.5 text-[#145C3A]" /> 256-Bit Encrypted Secure Checkout
          </div>
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[#E9DDC8] -z-0" />
            
            <button
              onClick={() => setStep(1)}
              className={`relative z-10 flex flex-col items-center gap-1.5 cursor-pointer`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-[#145C3A] text-white' : 'bg-white text-gray-400 border border-[#E9DDC8]'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-xs font-semibold text-[#1E1E1E]">Shipping</span>
            </button>

            <button
              onClick={() => setStep(2)}
              className={`relative z-10 flex flex-col items-center gap-1.5 cursor-pointer`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-[#145C3A] text-white' : 'bg-white text-gray-400 border border-[#E9DDC8]'
              }`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-xs font-semibold text-[#1E1E1E]">Payment</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className={`relative z-10 flex flex-col items-center gap-1.5 cursor-pointer`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 3 ? 'bg-[#145C3A] text-white' : 'bg-white text-gray-400 border border-[#E9DDC8]'
              }`}>
                3
              </div>
              <span className="text-xs font-semibold text-[#1E1E1E]">Review & Place</span>
            </button>
          </div>
        </div>

        {/* Checkout Form & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form Steps (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-xs">
            {/* STEP 1: Shipping Address & Contact */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Contact & Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="pt-4 border-t border-[#E9DDC8]">
                  <h3 className="font-serif text-lg font-bold text-[#1E1E1E] mb-3">
                    Shipping Method
                  </h3>
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.shippingMethod === 'standard'
                        ? 'border-[#145C3A] bg-[#E8F0E7]/60 ring-1 ring-[#145C3A]'
                        : 'border-[#E9DDC8] bg-[#FAF8F3]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleInputChange}
                          className="text-[#145C3A] focus:ring-[#145C3A]"
                        />
                        <div>
                          <span className="font-serif font-bold text-sm block">Standard Ground Delivery</span>
                          <span className="text-xs text-gray-500">3 - 5 business days with live tracking</span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-[#145C3A]">
                        {subtotal >= 60 ? 'FREE' : '$4.99'}
                      </span>
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.shippingMethod === 'express'
                        ? 'border-[#145C3A] bg-[#E8F0E7]/60 ring-1 ring-[#145C3A]'
                        : 'border-[#E9DDC8] bg-[#FAF8F3]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleInputChange}
                          className="text-[#145C3A] focus:ring-[#145C3A]"
                        />
                        <div>
                          <span className="font-serif font-bold text-sm block">Express Priority Courier</span>
                          <span className="text-xs text-gray-500">1 - 2 business days expedited</span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-[#1E1E1E]">$12.00</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 bg-[#145C3A] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Select Payment Method
                </h2>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#145C3A] bg-[#E8F0E7] text-[#145C3A] font-bold'
                        : 'border-[#E9DDC8] bg-[#FAF8F3] text-gray-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1.5" />
                    <span className="text-xs">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      formData.paymentMethod === 'paypal'
                        ? 'border-[#145C3A] bg-[#E8F0E7] text-[#145C3A] font-bold'
                        : 'border-[#E9DDC8] bg-[#FAF8F3] text-gray-700'
                    }`}
                  >
                    <span className="text-sm font-bold block mb-1">PayPal</span>
                    <span className="text-[11px] text-gray-500">Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'apple' }))}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      formData.paymentMethod === 'apple'
                        ? 'border-[#145C3A] bg-[#E8F0E7] text-[#145C3A] font-bold'
                        : 'border-[#E9DDC8] bg-[#FAF8F3] text-gray-700'
                    }`}
                  >
                    <span className="text-sm font-bold block mb-1">Apple Pay</span>
                    <span className="text-[11px] text-gray-500">1-Touch</span>
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t border-[#E9DDC8]">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm focus:ring-1 focus:ring-[#145C3A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm font-mono focus:ring-1 focus:ring-[#145C3A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-[#145C3A] mb-1.5">
                          Security CVV
                        </label>
                        <input
                          type="password"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#E9DDC8] bg-[#FAF8F3] text-sm font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-gray-500 hover:text-black"
                  >
                    ← Back to Shipping
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 bg-[#145C3A] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    Review Order <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Place */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Review Your Order
                </h2>

                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#E9DDC8]">
                    <span className="font-bold text-[#145C3A]">Shipping To:</span>
                    <span className="text-right text-gray-700">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-[#145C3A]">Payment:</span>
                    <span className="text-gray-700">
                      {formData.paymentMethod === 'card' ? `Card ending in 8892` : 'PayPal Express'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-full bg-[#145C3A] text-white text-sm font-bold tracking-wide hover:bg-[#0B452A] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Securing and Processing Order...</span>
                  ) : (
                    <span>Authorize & Place Order — ${total.toFixed(2)}</span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary (col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DDC8] shadow-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDC8]">
              <h3 className="font-serif text-xl font-bold text-[#1E1E1E]">
                Order Items ({cart.length})
              </h3>
              <button 
                onClick={() => onNavigate('cart')}
                className="text-xs text-[#145C3A] hover:underline font-semibold"
              >
                Edit Cart
              </button>
            </div>

            {/* Items List */}
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1 space-y-2">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-2 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-lg bg-[#FAF8F3] border border-[#E9DDC8] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-[#1E1E1E] truncate">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-gray-500">Qty: {quantity}</span>
                  </div>
                  <span className="font-serif font-bold text-xs text-[#145C3A]">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-[#E9DDC8] text-xs text-[#1E1E1E]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1E1E1E]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#145C3A] font-semibold">
                <span>Welcome Discount (25%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-[#E9DDC8] flex items-baseline justify-between">
              <span className="font-serif text-base font-bold text-[#1E1E1E]">Total Due</span>
              <span className="font-serif text-2xl font-bold text-[#145C3A]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
