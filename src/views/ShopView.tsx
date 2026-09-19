import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  ChevronRight, 
  ArrowUpDown, 
  Sparkles, 
  Check, 
  Star, 
  ArrowRight, 
  Clock, 
  RotateCcw,
  Tag
} from 'lucide-react';
import { Product, ActivePage, FilterState } from '../types';
import { PRODUCTS } from '../data/mockData';
import { BEAUTY_COLLECTIONS } from '../data/categoriesData';
import { ProductCard } from '../components/ProductCard';
import { CountdownTimer } from '../components/CountdownTimer';

interface ShopViewProps {
  selectedCategory: string;
  selectedSubcategory?: string;
  onSelectCategory: (category: string) => void;
  onSelectSubcategory?: (subcategory?: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  wishlist: string[];
  cart: { product: Product; quantity: number }[];
  onNavigate: (page: ActivePage) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  wishlist,
  cart,
  onNavigate,
}) => {
  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: selectedCategory || 'All',
    subcategory: selectedSubcategory,
    skinTypes: [],
    skinConcerns: [],
    ingredients: [],
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    discountOnly: false,
    inStockOnly: false,
    sortBy: 'popularity',
  });

  // Keep state synchronized with external prop changes (e.g. from Header / AmazonCategoryBar)
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: selectedCategory || 'All',
      subcategory: selectedSubcategory
    }));
  }, [selectedCategory, selectedSubcategory]);

  const categories = [
    'All',
    ...BEAUTY_COLLECTIONS.map(c => c.name)
  ];

  const currentCollection = useMemo(() => {
    return BEAUTY_COLLECTIONS.find(c => c.name.toLowerCase() === filters.category.toLowerCase());
  }, [filters.category]);

  const skinTypesList = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
  const skinConcernsList = ['Acne', 'Dryness', 'Pigmentation', 'Dullness', 'Aging', 'Sensitivity'];
  const ingredientsList = ['Vitamin C', 'Niacinamide', 'Hyaluronic Acid', 'Ceramides', 'Peptides', 'Pure Argan Oil'];

  // Handle category tab click
  const handleCategoryTab = (cat: string) => {
    onSelectCategory(cat);
    if (onSelectSubcategory) onSelectSubcategory(undefined);
    setFilters(prev => ({ ...prev, category: cat, subcategory: undefined }));
  };

  // Handle subcategory click
  const handleSubcategorySelect = (sub?: string) => {
    if (onSelectSubcategory) onSelectSubcategory(sub);
    setFilters(prev => ({ ...prev, subcategory: sub }));
  };

  // Toggle multi-select filter
  const toggleArrayFilter = (key: 'skinTypes' | 'skinConcerns' | 'ingredients', value: string) => {
    setFilters(prev => {
      const current = prev[key];
      const exists = current.includes(value);
      const updated = exists ? current.filter(item => item !== value) : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'All',
      subcategory: undefined,
      skinTypes: [],
      skinConcerns: [],
      ingredients: [],
      minPrice: 0,
      maxPrice: 100,
      minRating: 0,
      discountOnly: false,
      inStockOnly: false,
      sortBy: 'popularity',
    });
    onSelectCategory('All');
    if (onSelectSubcategory) onSelectSubcategory(undefined);
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (filters.category && filters.category !== 'All') {
        if (product.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      }

      // Subcategory filter (matches product subcategory or keyword in name/description)
      if (filters.subcategory) {
        const subLow = filters.subcategory.toLowerCase();
        const matchesSub = 
          (product.subcategory && product.subcategory.toLowerCase().includes(subLow)) ||
          product.name.toLowerCase().includes(subLow) ||
          product.description.toLowerCase().includes(subLow) ||
          (product.tags && product.tags.some((t: string) => t.toLowerCase().includes(subLow)));
        if (!matchesSub) return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Discount only
      if (filters.discountOnly && (!product.discountPercent || product.discountPercent <= 0)) {
        return false;
      }

      // Skin types
      if (filters.skinTypes.length > 0) {
        const matchesSkinType = product.skinType?.some(st => filters.skinTypes.includes(st));
        if (!matchesSkinType) return false;
      }

      // Skin concerns
      if (filters.skinConcerns.length > 0) {
        const matchesConcern = product.skinConcerns?.some(c => filters.skinConcerns.includes(c));
        if (!matchesConcern) return false;
      }

      // Ingredients
      if (filters.ingredients.length > 0) {
        const matchesIng = product.keyIngredients?.some(ing => filters.ingredients.includes(ing));
        if (!matchesIng) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'discount':
          return (b.discountPercent || 0) - (a.discountPercent || 0);
        case 'popularity':
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
    });
  }, [filters]);

  const activeFilterCount = 
    (filters.category !== 'All' ? 1 : 0) +
    filters.skinTypes.length +
    filters.skinConcerns.length +
    filters.ingredients.length +
    (filters.discountOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxPrice < 100 ? 1 : 0);

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-6 sm:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* 1. BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-[#145C3A] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#145C3A] font-semibold">
            {filters.category === 'All' ? 'Shop' : filters.category}
          </span>
        </nav>

        {/* 2. PAGE TITLE & BANNER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-[#E9DDC8]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
              Pure Natural Formulations
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
              Our Best Sellers Products
            </h1>
          </div>
          <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0 font-medium">
            Showing <strong className="text-[#145C3A]">{filteredProducts.length}</strong> clean beauty essentials
          </span>
        </div>

        {/* 3. PROMOTIONAL COUNTDOWN CARD (Summer Glow Deals) */}
        <div className="bg-[#145C3A] text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A45C] text-[#0B452A] text-xs font-bold uppercase tracking-wide">
                Summer Glow Deals
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Get 50% Off — Limited Time Offer
              </h2>
              <p className="text-xs sm:text-sm text-[#F8F5ED]/80 max-w-lg">
                Enjoy half-price offers on cult-favorite foundations, velvet roses perfumes, and whipped marine moisturizers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <CountdownTimer initialHours={12} label="Offer Expires In:" variant="gold" />
              <button
                onClick={() => setFilters(prev => ({ ...prev, discountOnly: true }))}
                className="px-6 py-2.5 rounded-full bg-white text-[#145C3A] text-xs font-bold hover:bg-[#C9A45C] hover:text-[#0B452A] transition-colors shadow-xs shrink-0 cursor-pointer"
              >
                Shop Sale Only
              </button>
            </div>
          </div>
        </div>

        {/* 4. CATEGORY TABS (HORIZONTAL SCROLLABLE) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
          {categories.map((cat) => {
            const isActive = filters.category.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategoryTab(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#145C3A] text-white shadow-xs'
                    : 'bg-white text-[#1E1E1E] border border-[#E9DDC8] hover:border-[#145C3A]/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Subcategory Pills when a collection is selected */}
        {currentCollection && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-6 bg-white/80 p-2.5 rounded-2xl border border-[#E9DDC8] shadow-2xs">
            <span className="text-xs font-bold text-[#145C3A] px-2 flex items-center gap-1 shrink-0">
              <Tag className="w-3.5 h-3.5 text-[#C9A45C]" />
              {currentCollection.emoji} {currentCollection.name}:
            </span>
            <button
              onClick={() => handleSubcategorySelect(undefined)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                !filters.subcategory
                  ? 'bg-[#0B452A] text-white shadow-xs font-semibold'
                  : 'bg-[#F8F5ED] text-gray-700 hover:bg-[#E9DDC8]'
              }`}
            >
              All {currentCollection.name}
            </button>
            {currentCollection.subcategories.map((sub) => {
              const isSubActive = filters.subcategory?.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => handleSubcategorySelect(sub)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isSubActive
                      ? 'bg-[#145C3A] text-white shadow-xs font-semibold ring-1 ring-[#C9A45C]'
                      : 'bg-[#F8F5ED] text-gray-700 hover:bg-[#E9DDC8]'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* 5. TOOLBAR: MOBILE FILTER TRIGGER, ACTIVE CHIPS, SORT DROPDOWN */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E9DDC8] shadow-2xs">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#E9DDC8] text-xs font-bold text-[#145C3A] hover:bg-[#E8F0E7] transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          {/* Active Filter Chips */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 flex-1 mx-2">
            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs font-semibold">
                Category: {filters.category}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-black" 
                  onClick={() => handleCategoryTab('All')}
                />
              </span>
            )}
            {filters.skinTypes.map(st => (
              <span key={st} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E9DDC8] text-[#1E1E1E] text-xs font-medium">
                {st}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-red-500" 
                  onClick={() => toggleArrayFilter('skinTypes', st)}
                />
              </span>
            ))}
            {filters.skinConcerns.map(sc => (
              <span key={sc} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E9DDC8] text-[#1E1E1E] text-xs font-medium">
                {sc}
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-red-500" 
                  onClick={() => toggleArrayFilter('skinConcerns', sc)}
                />
              </span>
            ))}
            {filters.discountOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A45C]/20 text-[#0B452A] text-xs font-bold">
                On Sale Only
                <X 
                  className="w-3.5 h-3.5 cursor-pointer hover:text-black" 
                  onClick={() => setFilters(prev => ({ ...prev, discountOnly: false }))}
                />
              </span>
            )}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-red-600 hover:underline font-semibold ml-2 cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Sort By:</span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="bg-[#FAF8F3] border border-[#E9DDC8] text-[#1E1E1E] text-xs font-semibold rounded-xl px-3 py-2 pr-7 focus:outline-hidden focus:ring-1 focus:ring-[#145C3A] cursor-pointer"
                aria-label="Sort products"
              >
                <option value="popularity">Popularity (Best Sellers)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated (5.0 ★)</option>
                <option value="discount">Biggest Discount (%)</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* 6. MAIN CONTENT AREA: DESKTOP FILTER SIDEBAR (Left) + PRODUCT GRID (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-[#E9DDC8] space-y-6 shadow-xs sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDC8]">
              <h3 className="font-serif text-lg font-bold text-[#145C3A] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filter Catalog
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                >
                  Reset ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2">
                Price Range (Max: ${filters.maxPrice})
              </span>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-[#145C3A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>$10</span>
                <span>$50</span>
                <span>$100</span>
              </div>
            </div>

            {/* Skin Type Filter */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2.5">
                Skin Type
              </span>
              <div className="space-y-1.5">
                {skinTypesList.map((st) => (
                  <label key={st} className="flex items-center gap-2 text-xs text-[#1E1E1E]/80 cursor-pointer hover:text-[#145C3A]">
                    <input
                      type="checkbox"
                      checked={filters.skinTypes.includes(st)}
                      onChange={() => toggleArrayFilter('skinTypes', st)}
                      className="rounded-sm text-[#145C3A] focus:ring-[#145C3A] accent-[#145C3A]"
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skin Concerns Filter */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2.5">
                Skin Concern
              </span>
              <div className="space-y-1.5">
                {skinConcernsList.map((sc) => (
                  <label key={sc} className="flex items-center gap-2 text-xs text-[#1E1E1E]/80 cursor-pointer hover:text-[#145C3A]">
                    <input
                      type="checkbox"
                      checked={filters.skinConcerns.includes(sc)}
                      onChange={() => toggleArrayFilter('skinConcerns', sc)}
                      className="rounded-sm text-[#145C3A] focus:ring-[#145C3A] accent-[#145C3A]"
                    />
                    <span>{sc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Key Ingredients */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2.5">
                Active Ingredients
              </span>
              <div className="space-y-1.5">
                {ingredientsList.map((ing) => (
                  <label key={ing} className="flex items-center gap-2 text-xs text-[#1E1E1E]/80 cursor-pointer hover:text-[#145C3A]">
                    <input
                      type="checkbox"
                      checked={filters.ingredients.includes(ing)}
                      onChange={() => toggleArrayFilter('ingredients', ing)}
                      className="rounded-sm text-[#145C3A] focus:ring-[#145C3A] accent-[#145C3A]"
                    />
                    <span>{ing}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-2 border-t border-[#E9DDC8]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2.5">
                Minimum Rating
              </span>
              <div className="space-y-1.5">
                {[4.5, 4.0].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === starVal ? 0 : starVal }))}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-colors ${
                      filters.minRating === starVal
                        ? 'bg-[#E8F0E7] text-[#145C3A] font-bold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-[#C9A45C]" /> {starVal} & above
                    </span>
                    {filters.minRating === starVal && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID (Right - 4 Columns on Desktop, 2 on Mobile) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DDC8] shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border border-[#E9DDC8] flex items-center justify-center text-[#145C3A] mx-auto mb-4">
                  <RotateCcw className="w-6 h-6 text-[#145C3A]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2">
                  No products match your active filters
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  Try broadening your search or resetting active skin concerns and price limitations.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#145C3A] text-white rounded-full text-xs font-bold hover:bg-[#0B452A] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
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
            )}
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM-SHEET FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#F8F5ED] rounded-t-3xl shadow-2xl p-6 overflow-y-auto border-t border-[#E9DDC8] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDC8]">
              <h3 className="font-serif text-xl font-bold text-[#145C3A]">
                Catalog Filters
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-black"
                aria-label="Close filters"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2">
                Category
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryTab(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      filters.category === cat
                        ? 'bg-[#145C3A] text-white'
                        : 'bg-white border border-[#E9DDC8] text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Skin Types */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2">
                Skin Type
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skinTypesList.map((st) => (
                  <button
                    key={st}
                    onClick={() => toggleArrayFilter('skinTypes', st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      filters.skinTypes.includes(st)
                        ? 'bg-[#145C3A] text-white'
                        : 'bg-white border border-[#E9DDC8] text-gray-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-1">
                Max Price: ${filters.maxPrice}
              </span>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-[#145C3A]"
              />
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-[#E9DDC8] flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-full bg-white border border-[#E9DDC8] text-xs font-bold text-gray-700"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-full bg-[#145C3A] text-white text-xs font-bold shadow-md"
              >
                Apply ({filteredProducts.length} items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
