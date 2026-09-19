import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, ShoppingBag, ShieldCheck } from 'lucide-react';
import { OrderInfo, ActivePage } from '../types';

interface OrderConfirmationViewProps {
  order: OrderInfo | null;
  onNavigate: (page: ActivePage) => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({
  order,
  onNavigate,
}) => {
  // Fallback demo order if visited directly
  const displayOrder: OrderInfo = order || {
    orderNumber: 'BS-849201',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: [],
    subtotal: 75.00,
    discount: 18.75,
    shipping: 0,
    total: 56.25,
    shippingAddress: {
      fullName: 'Sophie Turner',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
    },
    status: 'Processing',
    estimatedDelivery: '3 - 5 Business Days',
  };

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DDC8] shadow-md text-center">
          <div className="w-20 h-20 rounded-full bg-[#E8F0E7] text-[#145C3A] flex items-center justify-center mx-auto mb-6 shadow-xs animate-bounce duration-1000">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-2">
            Payment Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-3">
            Thank You for Your Order!
          </h1>

          <p className="text-sm text-[#1E1E1E]/80 max-w-md mx-auto mb-6">
            We've received your order and our skincare specialists are hand-packaging your natural formulas with care. A confirmation email has been dispatched to your inbox.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#E9DDC8] text-xs font-mono font-bold text-[#145C3A] mb-8">
            <span>Order Reference:</span>
            <span className="text-sm text-[#0B452A]">{displayOrder.orderNumber}</span>
          </div>

          {/* Delivery estimate badge */}
          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#E8F0E7]/60 border border-[#145C3A]/20 text-xs font-medium text-[#145C3A] mb-8">
            <Truck className="w-5 h-5 text-[#145C3A]" />
            <span>Estimated Delivery: <strong>{displayOrder.estimatedDelivery}</strong> (Trackable via USPS/FedEx)</span>
          </div>

          {/* Shipping Details Box */}
          <div className="text-left p-6 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] space-y-4 mb-8 text-xs">
            <div className="flex justify-between border-b border-[#E9DDC8] pb-3">
              <div>
                <span className="font-bold text-[#145C3A] uppercase tracking-wider block mb-1">
                  Shipping Address
                </span>
                <p className="text-gray-700">
                  {displayOrder.shippingAddress.fullName}<br />
                  {displayOrder.shippingAddress.address}<br />
                  {displayOrder.shippingAddress.city}, {displayOrder.shippingAddress.state} {displayOrder.shippingAddress.zipCode}
                </p>
              </div>

              <div className="text-right">
                <span className="font-bold text-[#145C3A] uppercase tracking-wider block mb-1">
                  Order Date
                </span>
                <p className="text-gray-700">{displayOrder.date}</p>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="font-bold text-sm text-[#1E1E1E]">Total Amount Paid:</span>
              <span className="font-serif font-bold text-xl text-[#145C3A]">
                ${displayOrder.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('track-order')}
              className="px-8 py-3.5 rounded-full bg-[#145C3A] text-white text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Package className="w-4 h-4" /> Track Order Status
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 rounded-full bg-white border border-[#145C3A] text-[#145C3A] text-xs sm:text-sm font-semibold hover:bg-[#FAF8F3] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
