import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Leaf, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Calendar,
  UserCheck,
  Check
} from 'lucide-react';
import { Product, ActivePage } from '../types';
import { CATEGORIES, PRODUCTS, TESTIMONIALS, BLOG_POSTS, INSTAGRAM_IMAGES, FAQ_ITEMS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { CountdownTimer } from '../components/CountdownTimer';

interface HomeViewProps {
  onNavigate: (page: ActivePage) => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  wishlist: string[];
  cart: { product: Product; quantity: number }[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlist,
  cart,
}) => {
  // Testimonial Carousel state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // FAQ Accordion state (default open item is question 2: "Do you offer any discounts or promotions?")
  const [openFaqId, setOpenFaqId] = useState<string>('faq-2');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Instagram lightbox state
  const [activeInstagramPost, setActiveInstagramPost] = useState<typeof INSTAGRAM_IMAGES[0] | null>(null);

  // Filter products for Best Sellers & New Arrivals
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 6);
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival).slice(0, 6);

  // Deals products
  const foundationDeal = PRODUCTS.find(p => p.id === 'smooth-foundation') || PRODUCTS[1];
  const bodyCreamDeal = PRODUCTS.find(p => p.id === 'smooth-body-cream') || PRODUCTS[2];

  const handleCategoryClick = (catName: string) => {
    onSelectCategory(catName);
    onNavigate('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[activeTestimonialIdx];

  return (
    <div className="w-full bg-[#F8F5ED] text-[#1E1E1E] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section 
        id="hero-section"
        className="relative pt-6 pb-12 sm:pb-20 lg:pb-24 border-b border-[#E9DDC8]/60 bg-gradient-to-b from-white via-[#F8F5ED] to-[#FAF8F3]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Glow with Confidence, Shop with Trust</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1E1E] leading-[1.12]">
                Your Ultimate{' '}
                <span className="text-[#145C3A] relative inline-block underline decoration-[#C9A45C]/60 decoration-wavy underline-offset-8">
                  Beauty & Cosmetics
                </span>{' '}
                Hub
              </h1>

              {/* Supporting description */}
              <p className="text-base sm:text-lg text-[#1E1E1E]/80 leading-relaxed max-w-xl">
                Discover premium beauty products for glowing skin, healthy hair & timeless confidence. Formulated with organic botanicals, dermatologist tested, and 100% cruelty-free.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <button
                  id="hero-shop-now-btn"
                  onClick={() => {
                    onNavigate('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#145C3A] text-white text-sm sm:text-base font-bold hover:bg-[#0B452A] transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-view-all-btn"
                  onClick={() => {
                    onNavigate('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white border border-[#145C3A] text-[#145C3A] text-sm sm:text-base font-semibold hover:bg-[#E8F0E7] transition-all shadow-2xs cursor-pointer"
                >
                  View All Products
                </button>
              </div>

              {/* Trust Indicators Pill */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#1E1E1E]/75 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#145C3A]" />
                  <span>Dermatologist Approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#145C3A]" />
                  <span>Cruelty-Free Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#145C3A]" />
                  <span>Over 2,500+ Reviews</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual with Floating Trust Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF8F3]">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85"
                  alt="High-end beauty product arrangement with skincare bottles, serum bottles, and botanical leaves"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge 1: Natural Ingredients */}
                <div className="absolute top-6 left-4 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#E9DDC8] flex items-center gap-2.5 animate-bounce duration-1000">
                  <div className="w-8 h-8 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A]">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#145C3A]">100% Natural</span>
                    <span className="block text-[10px] text-gray-500">Pure Botanical Extracts</span>
                  </div>
                </div>

                {/* Floating Badge 2: Fast Delivery */}
                <div className="absolute bottom-16 left-4 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#E9DDC8] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F3] flex items-center justify-center text-[#145C3A]">
                    <Truck className="w-4 h-4 text-[#145C3A]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1E1E1E]">Fast Delivery</span>
                    <span className="block text-[10px] text-gray-500">2-3 Business Days</span>
                  </div>
                </div>

                {/* Floating Badge 3: Secure Payment */}
                <div className="absolute bottom-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#E9DDC8] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F3] flex items-center justify-center text-[#C9A45C]">
                    <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1E1E1E]">Secure Payment</span>
                    <span className="block text-[10px] text-gray-500">Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BENEFITS STRIP */}
      <section className="bg-white py-6 border-b border-[#E9DDC8]/60 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E9DDC8]/50">
            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1E1E]">100% Genuine Quality</h4>
                <p className="text-[11px] text-gray-500">Certified authentic formulations</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2 pt-4 md:pt-2 md:pl-6">
              <div className="w-10 h-10 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1E1E]">Secure Payment</h4>
                <p className="text-[11px] text-gray-500">100% Protected Transactions</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2 pt-4 md:pt-2 md:pl-6">
              <div className="w-10 h-10 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1E1E]">Fast Delivery</h4>
                <p className="text-[11px] text-gray-500">Free shipping on orders $60+</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2 pt-4 md:pt-2 md:pl-6">
              <div className="w-10 h-10 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1E1E]">Easy Returns</h4>
                <p className="text-[11px] text-gray-500">30-day hassle-free policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (8 CIRCULAR CARDS) */}
      <section id="shop-by-category" className="py-14 sm:py-18 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-2">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
            Shop By Department
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A45C] mx-auto mt-3 rounded-full" />
        </div>

        {/* 8 Circular Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Circular image container */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1.5 border-2 border-transparent group-hover:border-[#145C3A] transition-all duration-300 shadow-sm group-hover:shadow-md bg-white mb-2.5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Category Name */}
              <h3 className="font-serif text-xs sm:text-sm font-bold text-[#1E1E1E] group-hover:text-[#145C3A] transition-colors leading-snug">
                {cat.name}
              </h3>

              {/* Product Count */}
              <span className="text-[11px] text-gray-500 mt-0.5">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROMOTIONAL SECTION (TWO LARGE CARDS) */}
      <section className="py-6 sm:py-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Promo Card 1: Special Hair Care Deals */}
          <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F3] border border-[#E9DDC8] p-8 sm:p-10 flex flex-col justify-between shadow-sm group">
            {/* Background image & gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80"
                alt="Hair care deals"
                className="w-full h-full object-cover object-right opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-block px-3 py-1 bg-[#145C3A] text-white rounded-full text-xs font-bold tracking-wide">
                Flat 25% Discount
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                Special Hair Care Deals
              </h3>
              <p className="text-xs sm:text-sm text-[#1E1E1E]/80">
                Revitalize, strengthen, and nourish your locks with cold-pressed Moroccan argan and rosemary extracts.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => handleCategoryClick('Hair Care')}
                className="px-6 py-3 rounded-full bg-[#145C3A] text-white text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Promo Card 2: Save Big on Skincare */}
          <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F3] border border-[#E9DDC8] p-8 sm:p-10 flex flex-col justify-between shadow-sm group">
            {/* Background image & gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80"
                alt="Skincare deals"
                className="w-full h-full object-cover object-right opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-block px-3 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold tracking-wide">
                Flat 20% Discount
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                Save Big on Skincare
              </h3>
              <p className="text-xs sm:text-sm text-[#1E1E1E]/80">
                Target hyperpigmentation and quench dry winter skin with clinical Vitamin C & hydrating ceramides.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => handleCategoryClick('Skin Care')}
                className="px-6 py-3 rounded-full bg-[#145C3A] text-white text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRAND BENEFITS FOUR-COLUMN STRIP */}
      <section className="py-12 bg-[#FAF8F3] border-y border-[#E9DDC8]/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E9DDC8]/60 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1E1E1E]">Natural Ingredients</h4>
                <p className="text-xs text-gray-500">Pure botanicals & minerals</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E9DDC8]/60 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1E1E1E]">Dermatologist Tested</h4>
                <p className="text-xs text-gray-500">Clinically tested & safe</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E9DDC8]/60 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1E1E1E]">Cruelty Free</h4>
                <p className="text-xs text-gray-500">Never tested on animals</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E9DDC8]/60 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-[#E8F0E7] flex items-center justify-center text-[#145C3A] shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1E1E1E]">Customer Support</h4>
                <p className="text-xs text-gray-500">24/7 dedicated beauty advisors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT SECTION (Your Journey to Effortless Elegance) */}
      <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Lifestyle Beauty Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
                alt="Woman enjoying natural skincare routine"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#145C3A]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#E9DDC8]">
                <p className="font-serif text-sm italic text-[#145C3A]">
                  "Elegance is when the inside is as beautiful as the outside."
                </p>
                <span className="text-[10px] uppercase font-bold text-[#C9A45C] block mt-1">
                  Beauty Shop Founding Manifesto
                </span>
              </div>
            </div>
          </div>

          {/* Right: Story & Statistics */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block">
              About Beauty Shop
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight">
              Your Journey to Effortless Elegance
            </h2>

            <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed">
              Founded on the belief that everyday beauty rituals should be calming, restorative, and transparent, Beauty Shop unites pure botanical plant actives with clinical dermatology. We rigorously avoid harsh synthetic sulfates, silicones, and parabens, choosing instead cold-pressed oils, fruit antioxidants, and bio-ferments.
            </p>

            <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed">
              Every glass jar and recyclable flacon is crafted with love in climate-conscious facilities, ensuring what touches your face is clean, safe, and truly transformative.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E9DDC8]">
              <div>
                <span className="font-serif text-2xl sm:text-4xl font-bold text-[#145C3A] block">
                  24+
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Categories
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-4xl font-bold text-[#145C3A] block">
                  2500+
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Products
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-4xl font-bold text-[#145C3A] block">
                  99%
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Satisfied Customers
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3 rounded-full bg-[#145C3A] text-white text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BEST SELLERS THIS SEASON (PRODUCT CAROUSEL / GRID) */}
      <section className="py-16 bg-[#FAF8F3] border-t border-[#E9DDC8]/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
                Curated Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
                Best Sellers This Season
              </h2>
            </div>
            <button
              onClick={() => {
                onNavigate('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-4 sm:mt-0 text-xs sm:text-sm font-bold text-[#145C3A] hover:underline flex items-center gap-1.5"
            >
              View All Best Sellers <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Product Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
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
      </section>

      {/* 9. DEALS OF THE DAY (SCREEN 04) */}
      <section className="py-16 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A45C] block mb-1">
              Today's Offers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
              Deals of the Day
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <CountdownTimer initialHours={14} label="Limited Time Deals End In:" variant="gold" />
          </div>
        </div>

        {/* 2 Large Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Offer 1: Smooth Foundation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DDC8] shadow-md flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative w-full sm:w-1/2 aspect-square rounded-2xl overflow-hidden bg-[#FAF8F3]">
              <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold shadow-xs">
                50% OFF
              </span>
              <img
                src={foundationDeal.image}
                alt={foundationDeal.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full sm:w-1/2 space-y-3 text-left">
              <span className="text-[11px] font-bold text-[#145C3A] uppercase tracking-wider">
                {foundationDeal.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1E1E]">
                {foundationDeal.name}
              </h3>
              <div className="flex items-center gap-1.5 text-[#C9A45C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-gray-700 ml-1">5.0</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#145C3A]">
                  ${foundationDeal.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${foundationDeal.originalPrice?.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(foundationDeal)}
                className="w-full py-3 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Offer 2: Smooth Body Cream */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DDC8] shadow-md flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative w-full sm:w-1/2 aspect-square rounded-2xl overflow-hidden bg-[#FAF8F3]">
              <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold shadow-xs">
                50% OFF
              </span>
              <img
                src={bodyCreamDeal.image}
                alt={bodyCreamDeal.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full sm:w-1/2 space-y-3 text-left">
              <span className="text-[11px] font-bold text-[#145C3A] uppercase tracking-wider">
                {bodyCreamDeal.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1E1E]">
                {bodyCreamDeal.name}
              </h3>
              <div className="flex items-center gap-1.5 text-[#C9A45C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-gray-700 ml-1">5.0</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#145C3A]">
                  ${bodyCreamDeal.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${bodyCreamDeal.originalPrice?.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(bodyCreamDeal)}
                className="w-full py-3 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Dark Green Promotional Banner (Weekly Deals) */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0B452A] text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold uppercase tracking-wider">
                Weekly Deals
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Amazing Savings: Weekly Beauty Must-Haves
              </h3>
              <p className="text-sm sm:text-base text-[#F8F5ED]/80 max-w-lg">
                Indulge in botanical skincare serums, whipped body creams, and nutrient hair elixirs up to 50% off this week only.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-full bg-[#C9A45C] text-[#0B452A] text-sm font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border-2 border-[#C9A45C]/40 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
                  alt="Weekly beauty must-haves arrangement"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. NEW ARRIVALS (SCREEN 05 - SPLIT LAYOUT) */}
      <section className="py-16 bg-[#FAF8F3] border-t border-[#E9DDC8]/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
              Fresh Formulations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
              New Arrival Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Discover our latest beauty essentials crafted for seasonal radiance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Tall promotional image of a woman applying skincare */}
            <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-xl aspect-3/4 lg:aspect-auto lg:h-[680px] bg-[#145C3A] group">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85"
                alt="Woman applying skincare serum"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Overlay elements */}
              <div className="absolute inset-x-6 bottom-8 text-white space-y-3">
                <span className="inline-block px-3 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold">
                  50% Off
                </span>
                <span className="block text-xs uppercase tracking-widest text-[#F8F5ED]/80 font-mono">
                  10 JAN - 26 JAN
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  Summer Glow Launch Special
                </h3>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full bg-white text-[#145C3A] text-xs font-bold uppercase tracking-wider hover:bg-[#C9A45C] hover:text-[#0B452A] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  SHOP NOW <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT: 6 Product Cards in a 3-column grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
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
      </section>

      {/* 11. TESTIMONIALS (SCREEN 06) */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-2">
          Customer Stories
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8">
          Testimonials from Our Loyal Customers
        </h2>

        {/* 5 Customer Avatars */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-8">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveTestimonialIdx(idx)}
              className={`relative rounded-full p-1 transition-all ${
                activeTestimonialIdx === idx
                  ? 'ring-3 ring-[#145C3A] scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`View testimonial by ${t.name}`}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-xs"
              />
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DDC8] shadow-md relative">
          <div className="flex items-center justify-center gap-1.5 text-[#C9A45C] mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="text-sm font-bold text-gray-800 ml-1">5.0</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#145C3A] mb-4">
            "{currentTestimonial.quote}"
          </h3>

          <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed max-w-2xl mx-auto mb-6">
            "{currentTestimonial.fullReview}"
          </p>

          <div>
            <h4 className="font-serif text-lg font-bold text-[#1E1E1E]">
              {currentTestimonial.name}
            </h4>
            <span className="text-xs text-[#C9A45C] font-semibold tracking-wider uppercase block mt-0.5">
              {currentTestimonial.role} {currentTestimonial.location ? `• ${currentTestimonial.location}` : ''}
            </span>
          </div>

          {/* Prev/Next arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-[#E9DDC8] bg-[#FAF8F3] hover:bg-[#145C3A] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-[#E9DDC8] bg-[#FAF8F3] hover:bg-[#145C3A] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. BLOG / NEWS (SCREEN 07) */}
      <section className="py-16 bg-[#FAF8F3] border-t border-[#E9DDC8]/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
                Beauty Insights
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
                Our Latest News & Blogs
              </h2>
            </div>
            <button
              onClick={() => {
                onNavigate('blogs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-4 sm:mt-0 px-5 py-2.5 rounded-full border border-[#145C3A] text-[#145C3A] text-xs font-bold hover:bg-[#145C3A] hover:text-white transition-colors"
            >
              View All Blogs
            </button>
          </div>

          {/* 3 Editorial Horizontal/Grid Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onNavigate('blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E9DDC8] shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#FAF8F3]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#145C3A] text-white text-[11px] font-bold shadow-2xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span>{post.author.split(',')[0]}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E1E1E] group-hover:text-[#145C3A] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#145C3A]">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. INSTAGRAM GALLERY (SCREEN 08 - ASYMMETRIC LAYOUT) */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
          Social Community
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
          Follow Us On Instagram
        </h2>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noreferrer"
          className="text-xs sm:text-sm font-semibold text-[#C9A45C] hover:underline block mt-1 mb-10"
        >
          @beautyshop
        </a>

        {/* Asymmetric Gallery: Center large image + 8 smaller surround */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
          {/* Col 1: 2 small images */}
          <div className="space-y-3 sm:space-y-4">
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[1])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[1].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[1].likes} ♥
              </div>
            </div>
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[2])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[2].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[2].likes} ♥
              </div>
            </div>
          </div>

          {/* Col 2: 2 small images */}
          <div className="space-y-3 sm:space-y-4">
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[3])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[3].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[3].likes} ♥
              </div>
            </div>
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[4])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[4].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[4].likes} ♥
              </div>
            </div>
          </div>

          {/* Col 3: Center Large Image */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[0])}
              className="aspect-square rounded-3xl overflow-hidden cursor-pointer group relative shadow-xl border-2 border-white"
            >
              <img src={INSTAGRAM_IMAGES[0].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left">
                <span className="text-xs font-bold text-[#C9A45C]">Featured Moment</span>
                <span className="font-serif text-sm font-semibold">{INSTAGRAM_IMAGES[0].title}</span>
              </div>
            </div>
          </div>

          {/* Col 4: 2 small images */}
          <div className="space-y-3 sm:space-y-4">
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[5])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[5].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[5].likes} ♥
              </div>
            </div>
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[6])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[6].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[6].likes} ♥
              </div>
            </div>
          </div>

          {/* Col 5: 2 small images */}
          <div className="space-y-3 sm:space-y-4">
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[7])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[7].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[7].likes} ♥
              </div>
            </div>
            <div 
              onClick={() => setActiveInstagramPost(INSTAGRAM_IMAGES[8])}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xs"
            >
              <img src={INSTAGRAM_IMAGES[8].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#145C3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                {INSTAGRAM_IMAGES[8].likes} ♥
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ (SCREEN 09) */}
      <section className="py-20 bg-[#FAF8F3] border-t border-[#E9DDC8]/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
              Help & Answers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
              Question? Look here.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: FAQ accordion */}
            <div className="lg:col-span-8 space-y-3">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-[#0B452A] text-white border-[#0B452A] shadow-md'
                        : 'bg-white text-[#1E1E1E] border-[#E9DDC8] hover:border-[#145C3A]/40'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base sm:text-lg font-semibold">
                        {item.question}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform ${
                          isOpen
                            ? 'bg-[#C9A45C] text-[#0B452A]'
                            : 'bg-[#FAF8F3] text-gray-700'
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#F8F5ED]/90 leading-relaxed border-t border-white/10">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right side: Green Contact Us Card */}
            <div className="lg:col-span-4 bg-[#145C3A] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A45C] text-[#0B452A] flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  You have different questions?
                </h3>
                <p className="text-xs sm:text-sm text-[#F8F5ED]/80 leading-relaxed">
                  Our team will answer all your questions. We ensure a quick response and personalized skincare guidance.
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 bg-white text-[#145C3A] rounded-full text-xs sm:text-sm font-bold hover:bg-[#C9A45C] hover:text-[#0B452A] transition-colors shadow-sm cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Below FAQ Service Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 pt-8 border-t border-[#E9DDC8]/60 text-center">
            <div className="p-4">
              <h4 className="font-serif text-lg font-bold text-[#145C3A]">Free Shipping</h4>
              <p className="text-xs text-gray-600 mt-1">On all domestic orders over $60 with secure tracking.</p>
            </div>
            <div className="p-4">
              <h4 className="font-serif text-lg font-bold text-[#145C3A]">Flexible Payment</h4>
              <p className="text-xs text-gray-600 mt-1">Credit cards, PayPal, Apple Pay & 4 interest-free installments.</p>
            </div>
            <div className="p-4">
              <h4 className="font-serif text-lg font-bold text-[#145C3A]">24×7 Support</h4>
              <p className="text-xs text-gray-600 mt-1">Live beauty specialists ready to assist your skincare journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 15. NEWSLETTER SUBSCRIPTION (SCREEN 10) */}
      <section className="py-20 bg-[#F8F5ED] border-t border-[#E9DDC8]/60 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-2">
            Our Newsletter
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] mb-3">
            Subscribe to Our Newsletter to Get Updates on Our Latest Offers
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-8">
            Get <strong className="text-[#145C3A] font-bold">20% off</strong> on your first order just by subscribing to our newsletter or claiming code <strong>WELCOME20</strong>.
          </p>

          {newsletterSuccess ? (
            <div className="bg-[#E8F0E7] border border-[#145C3A] rounded-2xl p-6 text-[#145C3A] max-w-md mx-auto animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#145C3A]" />
              <h4 className="font-serif text-lg font-bold">You're subscribed!</h4>
              <p className="text-xs mt-1">
                Check your inbox for your welcome privilege code: <strong>WELCOME20</strong> (20% OFF).
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white border border-[#E9DDC8] text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#145C3A] shadow-xs"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#145C3A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0B452A] transition-colors shadow-xs cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-red-600 font-medium text-left pl-4">
                  {newsletterError}
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Instagram Post Lightbox Modal */}
      {activeInstagramPost && (
        <div 
          onClick={() => setActiveInstagramPost(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-[#E9DDC8]"
          >
            <img src={activeInstagramPost.image} alt="" className="w-full aspect-square object-cover" />
            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#145C3A]">{activeInstagramPost.tag}</span>
                <h4 className="font-serif text-base font-semibold">{activeInstagramPost.title}</h4>
              </div>
              <button
                onClick={() => setActiveInstagramPost(null)}
                className="px-4 py-1.5 rounded-full bg-[#FAF8F3] text-xs font-semibold text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
