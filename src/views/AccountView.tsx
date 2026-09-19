import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Heart, 
  Sparkles, 
  LogOut, 
  ChevronRight, 
  Eye, 
  ShoppingBag,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Product, ActivePage, OrderInfo } from '../types';
import { PRODUCTS } from '../data/mockData';

interface AccountViewProps {
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: ActivePage) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'skinProfile'>('profile');

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const sampleOrders = [
    {
      id: 'BS-849201',
      date: 'Sep 19, 2026',
      total: 56.25,
      status: 'In Transit',
      statusColor: 'bg-amber-100 text-amber-800',
      itemsCount: 2,
      firstItemName: 'Smooth Foundation (Light/Medium)',
    },
    {
      id: 'BS-712490',
      date: 'Aug 14, 2026',
      total: 82.00,
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-[#145C3A]',
      itemsCount: 3,
      firstItemName: 'Velvet Rose Moisturizer',
    },
    {
      id: 'BS-601934',
      date: 'Jun 28, 2026',
      total: 45.00,
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-[#145C3A]',
      itemsCount: 1,
      firstItemName: 'AquaAura Botanical Hydrosol',
    },
  ];

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#E9DDC8] gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#145C3A] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              ST
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block">
                Beauty Member Club
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                Welcome back, Sophie Turner
              </h1>
              <p className="text-xs text-gray-500">sophie.turner@example.com • Tier: Emerald VIP</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#E8F0E7] text-[#145C3A] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#145C3A]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" /> 450 Glow Reward Points
            </span>
          </div>
        </div>

        {/* Dashboard Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation (col-span-3) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 sm:p-6 border border-[#E9DDC8] shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                activeTab === 'profile'
                  ? 'bg-[#145C3A] text-white'
                  : 'text-gray-700 hover:bg-[#FAF8F3]'
              }`}
            >
              <User className="w-4 h-4" /> Profile Overview
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                activeTab === 'orders'
                  ? 'bg-[#145C3A] text-white'
                  : 'text-gray-700 hover:bg-[#FAF8F3]'
              }`}
            >
              <Package className="w-4 h-4" /> Order History ({sampleOrders.length})
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                activeTab === 'wishlist'
                  ? 'bg-[#145C3A] text-white'
                  : 'text-gray-700 hover:bg-[#FAF8F3]'
              }`}
            >
              <Heart className="w-4 h-4" /> My Wishlist ({wishlistedProducts.length})
            </button>

            <button
              onClick={() => setActiveTab('skinProfile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                activeTab === 'skinProfile'
                  ? 'bg-[#145C3A] text-white'
                  : 'text-gray-700 hover:bg-[#FAF8F3]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C9A45C]" /> Skin Profile & Quiz
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                activeTab === 'addresses'
                  ? 'bg-[#145C3A] text-white'
                  : 'text-gray-700 hover:bg-[#FAF8F3]'
              }`}
            >
              <MapPin className="w-4 h-4" /> Saved Addresses
            </button>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => onNavigate('home')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Tab Content Panel (col-span-9) */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-xs">
            {/* 1. Profile Overview */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Account Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                    <span className="text-xs text-gray-500 block mb-1">Full Name</span>
                    <span className="font-serif font-bold text-sm text-[#1E1E1E]">Sophie Turner</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                    <span className="text-xs text-gray-500 block mb-1">Email Address</span>
                    <span className="font-serif font-bold text-sm text-[#1E1E1E]">sophie.turner@example.com</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                    <span className="text-xs text-gray-500 block mb-1">Phone Number</span>
                    <span className="font-serif font-bold text-sm text-[#1E1E1E]">+1 (555) 234-5678</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                    <span className="text-xs text-gray-500 block mb-1">Default Shipping</span>
                    <span className="font-serif font-bold text-sm text-[#1E1E1E]">San Francisco, CA 94102</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#E8F0E7] border border-[#145C3A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#145C3A]">
                      You're 50 points away from a $10 Reward!
                    </h3>
                    <p className="text-xs text-[#145C3A]/80 mt-1">
                      Every $1 spent earns 1 Glow Point. Redeem points at checkout for free deluxe samples and discounts.
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('shop')}
                    className="px-6 py-2.5 rounded-full bg-[#145C3A] text-white text-xs font-bold shrink-0 hover:bg-[#0B452A] transition-colors"
                  >
                    Earn Points Now
                  </button>
                </div>
              </div>
            )}

            {/* 2. Orders History */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Recent Orders
                </h2>

                <div className="space-y-4">
                  {sampleOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl border border-[#E9DDC8] bg-[#FAF8F3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#145C3A] transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono font-bold text-sm text-[#145C3A]">
                            {ord.id}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${ord.statusColor}`}>
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#1E1E1E] font-medium">
                          {ord.firstItemName} {ord.itemsCount > 1 ? `+ ${ord.itemsCount - 1} more` : ''}
                        </p>
                        <span className="text-[11px] text-gray-500">{ord.date}</span>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="font-serif font-bold text-base text-[#145C3A]">
                          ${ord.total.toFixed(2)}
                        </span>
                        <button
                          onClick={() => onNavigate('track-order')}
                          className="px-4 py-2 bg-white border border-[#145C3A] text-[#145C3A] rounded-full text-xs font-bold hover:bg-[#E8F0E7] transition-colors"
                        >
                          Track Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  My Saved Wishlist ({wishlistedProducts.length})
                </h2>

                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-10">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">You have not saved any products to your wishlist yet.</p>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="mt-4 px-6 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold"
                    >
                      Discover Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistedProducts.map((p) => (
                      <div key={p.id} className="p-3 bg-[#FAF8F3] rounded-2xl border border-[#E9DDC8] flex flex-col justify-between">
                        <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-xl bg-white mb-2" />
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#145C3A]">{p.category}</span>
                          <h4 className="font-serif text-xs font-bold text-[#1E1E1E] line-clamp-1">{p.name}</h4>
                          <span className="text-xs font-bold text-[#145C3A] mt-1 block">${p.price.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2 mt-3 pt-2 border-t border-[#E9DDC8]/60">
                          <button
                            onClick={() => onAddToCart(p)}
                            className="flex-1 py-1.5 bg-[#145C3A] text-white rounded-lg text-xs font-semibold hover:bg-[#0B452A]"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => onToggleWishlist(p.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                            aria-label="Remove from wishlist"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. Skin Profile */}
            {activeTab === 'skinProfile' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                  Your Personalized Skin Profile
                </h2>
                <p className="text-xs text-gray-600">
                  Formulation analysis based on your skin questionnaire results.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                    <span className="text-[11px] text-gray-500 uppercase font-bold block">Skin Type</span>
                    <span className="font-serif font-bold text-base text-[#145C3A]">Combination / Dehydrated</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                    <span className="text-[11px] text-gray-500 uppercase font-bold block">Primary Concern</span>
                    <span className="font-serif font-bold text-base text-[#145C3A]">Hyperpigmentation & Glow</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                    <span className="text-[11px] text-gray-500 uppercase font-bold block">Best Actives</span>
                    <span className="font-serif font-bold text-base text-[#145C3A]">Niacinamide, Vitamin C</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('shop')}
                    className="px-6 py-3 rounded-full bg-[#145C3A] text-white text-xs font-bold hover:bg-[#0B452A] transition-colors"
                  >
                    View Recommended Routine For You →
                  </button>
                </div>
              </div>
            )}

            {/* 5. Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                    Saved Shipping Addresses
                  </h2>
                  <button className="text-xs font-bold text-[#145C3A] hover:underline">
                    + Add New Address
                  </button>
                </div>

                <div className="p-5 rounded-2xl border-2 border-[#145C3A] bg-[#FAF8F3] relative">
                  <span className="absolute top-4 right-4 text-[10px] bg-[#145C3A] text-white px-2 py-0.5 rounded-full font-bold">
                    DEFAULT
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#1E1E1E]">Sophie Turner</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    742 Evergreen Terrace, Apt 4B<br />
                    San Francisco, CA 94102<br />
                    United States<br />
                    Phone: +1 (555) 234-5678
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
