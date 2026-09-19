import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Search, 
  ChevronRight, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { ActivePage, OrderInfo } from '../types';

interface OrderTrackingViewProps {
  order: OrderInfo | null;
  onNavigate: (page: ActivePage) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  order,
  onNavigate,
}) => {
  const [trackingNumberInput, setTrackingNumberInput] = useState(order?.orderNumber || 'BS-849201');
  const [isSearched, setIsSearched] = useState(true);

  const steps = [
    { title: 'Order Placed', time: 'Sep 19, 09:30 AM', completed: true, desc: 'Payment verified and sent to laboratory fulfillment.' },
    { title: 'Formulation Packed', time: 'Sep 19, 02:15 PM', completed: true, desc: 'Items safely padded in biodegradable insulation.' },
    { title: 'In Transit', time: 'Sep 20, 08:45 AM', completed: true, current: true, desc: 'Departed regional carrier distribution center.' },
    { title: 'Out for Delivery', time: 'Estimated Sep 21', completed: false, desc: 'Local courier dispatch to your doorstep.' },
    { title: 'Delivered', time: 'Estimated Sep 21', completed: false, desc: 'Package handed directly or left in secure porch.' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
  };

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-semibold text-[#145C3A] hover:underline flex items-center gap-1.5 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
            Real-Time Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-2">
            Track Your Shipment
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Enter your order reference code or email address to inspect live transit checkpoints.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={trackingNumberInput}
              onChange={(e) => setTrackingNumberInput(e.target.value)}
              placeholder="e.g. BS-849201"
              className="flex-1 px-4 py-3 rounded-full bg-white border border-[#E9DDC8] text-sm text-[#1E1E1E] focus:outline-hidden focus:ring-1 focus:ring-[#145C3A]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>

        {/* Tracking Card */}
        {isSearched && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-md space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E9DDC8] gap-4">
              <div>
                <span className="text-xs text-gray-500 block">Tracking ID:</span>
                <span className="font-mono font-bold text-lg text-[#145C3A]">
                  USPS-9400111899223190
                </span>
                <div className="text-xs text-gray-600 mt-0.5">
                  Order Ref: <strong className="text-[#1E1E1E]">{trackingNumberInput}</strong>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-500 block">Expected Arrival:</span>
                <span className="font-serif font-bold text-lg text-[#145C3A]">
                  Tomorrow by 4:00 PM
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs font-bold mt-1">
                  On Schedule
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E9DDC8]">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Circle marker */}
                  <div
                    className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      step.completed
                        ? 'bg-[#145C3A] text-white shadow-xs ring-4 ring-[#E8F0E7]'
                        : 'bg-white border-2 border-[#E9DDC8] text-gray-400'
                    }`}
                  >
                    {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-serif text-sm font-bold ${
                        step.current ? 'text-[#145C3A] text-base' : 'text-[#1E1E1E]'
                      }`}>
                        {step.title} {step.current && <span className="text-xs text-[#C9A45C] font-normal font-sans ml-2">(Current Location)</span>}
                      </h4>
                      <span className="text-xs text-gray-400 font-mono">{step.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carrier information & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#E9DDC8] text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#145C3A]" />
                <div>
                  <span className="font-bold text-[#1E1E1E] block">Carrier: USPS Ground Advantage</span>
                  <span className="text-gray-500">Service: Signature on Delivery</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#145C3A]" />
                <div>
                  <span className="font-bold text-[#1E1E1E] block">Destination</span>
                  <span className="text-gray-500">San Francisco, CA 94102</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
