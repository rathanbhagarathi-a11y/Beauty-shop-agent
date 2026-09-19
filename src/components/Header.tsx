import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { ActivePage, CartItem } from '../types';
import { AmazonCategoryBar } from './AmazonCategoryBar';
import { BEAUTY_COLLECTIONS } from '../data/categoriesData';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  setSelectedCategory: (cat: string) => void;
  onSelectCategoryAndSub?: (category: string, subcategory?: string) => void;
  selectedCategory?: string;
  selectedSubcategory?: string;
  cart: CartItem[];
  wishlist: string[];
  openCartDrawer: () => void;
  openSearchModal: () => void;
  onOpenPromoModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  setSelectedCategory,
  onSelectCategoryAndSub,
  selectedCategory = 'All',
  selectedSubcategory,
  cart,
  wishlist,
  openCartDrawer,
  openSearchModal,
  onOpenPromoModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (page: ActivePage, category?: string, subcategory?: string) => {
    setActivePage(page);
    if (category) {
      if (onSelectCategoryAndSub) {
        onSelectCategoryAndSub(category, subcategory);
      } else {
        setSelectedCategory(category);
      }
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (category: string, sub?: string) => {
    if (onSelectCategoryAndSub) {
      onSelectCategoryAndSub(category, sub);
    } else {
      setSelectedCategory(category);
    }
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs bg-white">
      {/* 1. ANNOUNCEMENT BAR */}
      {announcementVisible && (
        <div 
          id="announcement-bar"
          className="bg-[#145C3A] text-[#F8F5ED] text-xs sm:text-sm font-medium py-2 px-4 flex items-center justify-between transition-all"
        >
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center bg-[#C9A45C] text-[#0B452A] rounded-full p-0.5 text-[10px]">
              <Percent className="w-3 h-3" />
            </span>
            <button 
              onClick={() => onOpenPromoModal ? onOpenPromoModal() : handleNavClick('shop')}
              className="hover:underline flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span>
                Sign up and <strong className="text-[#C9A45C] font-semibold underline">GET 20% OFF</strong> for your first order.
              </span>
            </button>
            <button
              onClick={() => onOpenPromoModal ? onOpenPromoModal() : handleNavClick('shop')}
              className="inline-flex items-center gap-1 bg-[#C9A45C] text-[#0B452A] px-2.5 py-0.5 rounded-full font-bold text-[11px] hover:bg-white transition-colors cursor-pointer ml-1"
            >
              Claim 20% OFF <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <button 
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Close announcement"
            className="text-[#E8F0E7] hover:text-white p-1 rounded-sm ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. MAIN HEADER DESKTOP & MOBILE */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1E1E1E] hover:text-[#145C3A] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <button 
            id="header-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-[#145C3A] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0B452A] transition-colors">
              <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#145C3A] block leading-none">
                Beauty Shop
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#C9A45C] font-semibold block mt-0.5">
                Clean Luxury
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links (Home, Shop All, About Us, Our Blogs prioritized in front) */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            id="nav-link-home"
            onClick={() => handleNavClick('home')}
            className={`text-[15px] font-medium transition-colors hover:text-[#145C3A] relative py-1 ${
              activePage === 'home' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]/80'
            }`}
          >
            Home
            {activePage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#145C3A] rounded-full" />
            )}
          </button>

          <button
            id="nav-link-shop"
            onClick={() => handleNavClick('shop', 'All')}
            className={`text-[15px] font-medium transition-colors hover:text-[#145C3A] relative py-1 ${
              activePage === 'shop' && selectedCategory === 'All' && !selectedSubcategory ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]/80'
            }`}
          >
            Shop All
            {activePage === 'shop' && selectedCategory === 'All' && !selectedSubcategory && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#145C3A] rounded-full" />
            )}
          </button>

          <button
            id="nav-link-about"
            onClick={() => handleNavClick('about')}
            className={`text-[15px] font-medium transition-colors hover:text-[#145C3A] relative py-1 ${
              activePage === 'about' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]/80'
            }`}
          >
            About Us
            {activePage === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#145C3A] rounded-full" />
            )}
          </button>

          <button
            id="nav-link-blogs"
            onClick={() => handleNavClick('blogs')}
            className={`text-[15px] font-medium transition-colors hover:text-[#145C3A] relative py-1 ${
              activePage === 'blogs' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]/80'
            }`}
          >
            Our Blogs
            {activePage === 'blogs' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#145C3A] rounded-full" />
            )}
          </button>

          <button
            id="nav-link-ingredients"
            onClick={() => handleNavClick('ingredients')}
            className={`text-[15px] font-medium transition-colors hover:text-[#145C3A] relative py-1 ${
              activePage === 'ingredients' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]/80'
            }`}
          >
            Standards
            {activePage === 'ingredients' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#145C3A] rounded-full" />
            )}
          </button>
        </nav>

        {/* Center-Right: Amazon/Flipkart-style Quick Search Bar */}
        <div 
          onClick={openSearchModal}
          className="hidden xl:flex items-center gap-2.5 bg-[#FAF8F3] hover:bg-[#F4ECE1] border border-[#E9DDC8] rounded-full px-4 py-2 cursor-pointer transition-all text-xs text-gray-500 hover:border-[#145C3A]/60 shadow-2xs w-64 group"
          role="button"
          tabIndex={0}
          aria-label="Search beauty products"
        >
          <Search className="w-3.5 h-3.5 text-[#145C3A] group-hover:scale-110 transition-transform" />
          <span className="truncate">Search Foundation, Serum, Hair Oil...</span>
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger (Mobile / Tablet) */}
          <button
            id="header-search-btn"
            onClick={openSearchModal}
            className="p-2.5 text-[#1E1E1E] hover:text-[#145C3A] hover:bg-[#F8F5ED] rounded-full transition-colors relative xl:hidden"
            aria-label="Search beauty products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            id="header-wishlist-btn"
            onClick={() => handleNavClick('wishlist')}
            className="p-2.5 text-[#1E1E1E] hover:text-[#145C3A] hover:bg-[#F8F5ED] rounded-full transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A45C] text-[#0B452A] rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            id="header-cart-btn"
            onClick={openCartDrawer}
            className="p-2.5 text-[#1E1E1E] hover:text-[#145C3A] hover:bg-[#F8F5ED] rounded-full transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#145C3A] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Account Trigger */}
          <button
            id="header-account-btn"
            onClick={() => handleNavClick('account')}
            className="p-2.5 text-[#1E1E1E] hover:text-[#145C3A] hover:bg-[#F8F5ED] rounded-full transition-colors"
            aria-label="User Account"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. AMAZON / FLIPKART STYLE CATEGORY BAR (Visible prominently on top) */}
      <AmazonCategoryBar
        onSelectCategoryAndSub={handleCategorySelect}
        onNavigate={(page) => handleNavClick(page)}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onOpenPromoModal={onOpenPromoModal}
      />

      {/* MOBILE FULL DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-[#E9DDC8]/60 bg-[#F8F5ED] px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col space-y-2.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left text-lg font-medium py-1.5 ${
                activePage === 'home' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`text-left text-lg font-medium py-1.5 ${
                activePage === 'shop' && selectedCategory === 'All' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left text-lg font-medium py-1.5 ${
                activePage === 'about' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className={`text-left text-lg font-medium py-1.5 ${
                activePage === 'blogs' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              Our Blogs
            </button>

            {/* Amazon / Flipkart Style Category Accordion in Mobile */}
            <div className="border border-[#E9DDC8] rounded-2xl bg-white overflow-hidden my-2">
              <button
                onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
                className="w-full px-4 py-3 bg-[#0B452A] text-white flex items-center justify-between text-left font-semibold text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#C9A45C]">☰</span>
                  <span>Shop by Department</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCollectionsExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileCollectionsExpanded && (
                <div className="p-3 divide-y divide-[#E9DDC8]/60 space-y-2">
                  {BEAUTY_COLLECTIONS.map((col) => (
                    <div key={col.id} className="pt-2 first:pt-0">
                      <button
                        onClick={() => {
                          handleCategorySelect(col.name);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between text-left font-bold text-xs text-[#145C3A] py-1 hover:text-[#0B452A]"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{col.emoji}</span>
                          <span>{col.name}</span>
                        </span>
                        <span className="text-[10px] text-gray-400">View All →</span>
                      </button>
                      <div className="grid grid-cols-2 gap-1 mt-1 pl-5">
                        {col.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              handleCategorySelect(col.name, sub);
                              setMobileMenuOpen(false);
                            }}
                            className="text-left text-[11px] text-gray-600 hover:text-[#145C3A] py-0.5 truncate"
                          >
                            • {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              id="mobile-nav-ingredients"
              onClick={() => handleNavClick('ingredients')}
              className={`text-left text-base font-medium py-1 ${
                activePage === 'ingredients' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              Ingredient Standards
            </button>
            <button
              id="mobile-nav-shade-finder"
              onClick={() => handleNavClick('shade-finder')}
              className={`text-left text-base font-medium py-1 ${
                activePage === 'shade-finder' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              Shade Matching Advisor
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left text-base font-medium py-1 ${
                activePage === 'contact' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`text-left text-base font-medium py-1 ${
                activePage === 'faq' ? 'text-[#145C3A] font-bold' : 'text-[#1E1E1E]'
              }`}
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-4 border-t border-[#E9DDC8] flex items-center justify-between text-xs text-[#1E1E1E]/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#145C3A]" /> 100% Clean & Authentic
            </span>
            <span className="text-[#145C3A] font-semibold">Free Returns in 30 Days</span>
          </div>
        </div>
      )}
    </header>
  );
};
