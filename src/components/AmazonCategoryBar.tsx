import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  ChevronDown, 
  ChevronRight, 
  X, 
  Sparkles, 
  Percent, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { BEAUTY_COLLECTIONS } from '../data/categoriesData';
import { ActivePage } from '../types';

interface AmazonCategoryBarProps {
  onSelectCategoryAndSub: (category: string, subcategory?: string) => void;
  onNavigate: (page: ActivePage) => void;
  selectedCategory: string;
  selectedSubcategory?: string;
  onOpenPromoModal?: () => void;
}

export const AmazonCategoryBar: React.FC<AmazonCategoryBarProps> = ({
  onSelectCategoryAndSub,
  onNavigate,
  selectedCategory,
  selectedSubcategory,
  onOpenPromoModal,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [allDrawerOpen, setAllDrawerOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>('makeup');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (catId: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(catId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAllDrawerOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCategoryClick = (categoryName: string, sub?: string) => {
    setActiveDropdown(null);
    setAllDrawerOpen(false);
    onSelectCategoryAndSub(categoryName, sub);
  };

  return (
    <>
      {/* AMAZON / FLIPKART STYLE SUB-NAV CATEGORY BAR */}
      <nav 
        id="amazon-flipkart-category-bar"
        aria-label="Category Navigation"
        className="w-full bg-[#0E3D27] text-white text-xs border-t border-b border-[#0B3320] relative z-30 shadow-xs"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-11">
          {/* Left: Amazon-style "All Categories" Button */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              id="all-categories-drawer-btn"
              onClick={() => setAllDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 text-white font-semibold transition-colors cursor-pointer border border-white/15"
              aria-label="Open all beauty categories"
            >
              <Menu className="w-4 h-4 text-[#C9A45C]" />
              <span className="font-bold tracking-wide">All Categories</span>
            </button>
          </div>

          {/* Center: Horizontal Category List with Dropdowns (Flipkart/Amazon style) */}
          <div className="flex-1 flex items-center overflow-x-auto no-scrollbar py-1 px-3 space-x-1 sm:space-x-2">
            {BEAUTY_COLLECTIONS.map((col) => {
              const isSelected = selectedCategory === col.name;
              const isHovered = activeDropdown === col.id;

              return (
                <div
                  key={col.id}
                  className="relative shrink-0"
                  onMouseEnter={() => handleMouseEnter(col.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleCategoryClick(col.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#0B452A] font-bold shadow-xs'
                        : isHovered
                        ? 'bg-white/15 text-white'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                    aria-expanded={isHovered}
                  >
                    <span className="text-sm leading-none">{col.emoji}</span>
                    <span>{col.name}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isHovered ? 'rotate-180 text-[#C9A45C]' : 'opacity-70'}`} />
                  </button>

                  {/* Mega Dropdown Menu for Category */}
                  {isHovered && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-72 bg-white text-[#1E1E1E] rounded-2xl shadow-2xl border border-[#E9DDC8] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onMouseEnter={() => handleMouseEnter(col.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E9DDC8]">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{col.emoji}</span>
                          <div>
                            <span className="font-serif text-sm font-bold text-[#145C3A] block leading-tight">
                              {col.name}
                            </span>
                            <span className="text-[10px] text-gray-500 block line-clamp-1">
                              {col.tagline}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <button
                          onClick={() => handleCategoryClick(col.name)}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#145C3A] hover:bg-[#E8F0E7] flex items-center justify-between transition-colors"
                        >
                          <span>Explore All {col.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#C9A45C]" />
                        </button>

                        <div className="grid grid-cols-1 gap-0.5 pt-1">
                          {col.subcategories.map((sub) => {
                            const isSubActive = selectedCategory === col.name && selectedSubcategory === sub;
                            return (
                              <button
                                key={sub}
                                onClick={() => handleCategoryClick(col.name, sub)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between group ${
                                  isSubActive
                                    ? 'bg-[#145C3A] text-white font-semibold'
                                    : 'text-gray-700 hover:bg-[#FAF8F3] hover:text-[#145C3A]'
                                }`}
                              >
                                <span>{sub}</span>
                                <span className="text-[10px] text-gray-400 group-hover:text-[#145C3A] transition-colors">
                                  →
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Highlights: Deals / Promo banner quick link */}
          <div className="hidden xl:flex items-center space-x-3 shrink-0 pl-3">
            <button
              onClick={() => onNavigate('deals')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[#C9A45C] hover:text-white hover:bg-white/10 transition-colors font-semibold tracking-wide text-xs"
            >
              <Flame className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Today's Deals</span>
            </button>

            <button
              onClick={() => onNavigate('shade-finder')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors font-medium text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Shade Finder</span>
            </button>

            {onOpenPromoModal && (
              <button
                onClick={onOpenPromoModal}
                className="flex items-center gap-1 bg-[#C9A45C] text-[#0B452A] px-2.5 py-1 rounded-full font-bold text-[11px] hover:bg-white transition-colors cursor-pointer"
              >
                <Percent className="w-3 h-3" />
                <span>20% OFF</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* AMAZON-STYLE SLIDE-OUT ALL-CATEGORIES DRAWER */}
      {allDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setAllDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Sliding Panel */}
          <div className="fixed inset-y-0 left-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 bg-[#0B452A] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#145C3A] flex items-center justify-center text-[#C9A45C]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight">All Beauty Collections</h3>
                  <p className="text-[11px] text-[#F8F5ED]/70">Explore clean cosmetics & skincare rituals</p>
                </div>
              </div>
              <button 
                onClick={() => setAllDrawerOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label="Close categories drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Promo Banner */}
            <div className="bg-[#FAF8F3] px-4 py-2.5 border-b border-[#E9DDC8] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#145C3A] font-semibold">
                <Percent className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>First Order? Use code <strong>WELCOME20</strong> for 20% OFF</span>
              </div>
              <button
                onClick={() => {
                  setAllDrawerOpen(false);
                  if (onOpenPromoModal) onOpenPromoModal();
                }}
                className="text-[#C9A45C] hover:underline font-bold text-[11px]"
              >
                Claim
              </button>
            </div>

            {/* Category Accordion List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Departments ({BEAUTY_COLLECTIONS.length})
                </span>
                <button
                  onClick={() => {
                    handleCategoryClick('All');
                  }}
                  className="text-xs font-bold text-[#145C3A] hover:underline"
                >
                  View All Products
                </button>
              </div>

              {BEAUTY_COLLECTIONS.map((col) => {
                const isOpen = mobileExpandedCat === col.id;
                return (
                  <div 
                    key={col.id} 
                    className="border border-[#E9DDC8] rounded-2xl overflow-hidden bg-[#FAF8F3]/60 transition-colors"
                  >
                    <button
                      onClick={() => setMobileExpandedCat(isOpen ? null : col.id)}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#FAF8F3] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{col.emoji}</span>
                        <div>
                          <span className="font-serif text-sm font-bold text-[#1E1E1E] block">
                            {col.name}
                          </span>
                          <span className="text-[11px] text-gray-500 block">
                            {col.subcategories.length} subcategories
                          </span>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#145C3A]' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-white border-t border-[#E9DDC8] space-y-1">
                        <p className="text-[11px] text-gray-500 px-2 py-1 italic mb-1">
                          {col.tagline}
                        </p>
                        <button
                          onClick={() => handleCategoryClick(col.name)}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold bg-[#E8F0E7] text-[#145C3A] hover:bg-[#145C3A] hover:text-white transition-colors flex items-center justify-between mb-2"
                        >
                          <span>All {col.name} Products</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-2 gap-1.5">
                          {col.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => handleCategoryClick(col.name, sub)}
                              className="text-left px-2.5 py-2 rounded-lg text-xs text-gray-700 hover:bg-[#FAF8F3] hover:text-[#145C3A] transition-colors border border-gray-100 hover:border-[#145C3A]/30 flex items-center justify-between"
                            >
                              <span className="truncate">{sub}</span>
                              <span className="text-[10px] text-gray-300">›</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer Links */}
            <div className="p-4 border-t border-[#E9DDC8] bg-[#FAF8F3] grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setAllDrawerOpen(false);
                  onNavigate('shade-finder');
                }}
                className="py-2 px-3 bg-white rounded-xl border border-[#E9DDC8] font-semibold text-[#145C3A] hover:bg-[#145C3A] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Shade Finder</span>
              </button>
              <button
                onClick={() => {
                  setAllDrawerOpen(false);
                  onNavigate('deals');
                }}
                className="py-2 px-3 bg-white rounded-xl border border-[#E9DDC8] font-semibold text-[#0B452A] hover:bg-[#0B452A] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Deals & Offers</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
