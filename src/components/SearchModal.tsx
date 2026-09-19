import React, { useState, useMemo } from 'react';
import { Search, X, TrendingUp, Sparkles, Clock, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, BLOG_POSTS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchQuerySubmit: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchQuerySubmit,
}) => {
  const [query, setQuery] = useState('');

  const popularSearches = ['Foundation', 'Serum', 'Lipstick', 'Hair Oil', 'Sunscreen', 'Mehendi', 'Perfume', 'Nail Polish'];
  const trendingCategories = ['Makeup', 'Skincare', 'Hair care', 'Fragrance', 'Personal care', 'Beauty tools'];
  const recentSearches = ['Hydrating Serum', 'Velvet Lipstick', 'Rose Perfume'];

  // Filter products by title, category, subcategory, ingredients, tags
  const matchedProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q) ||
      p.keyIngredients?.some(ing => ing.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(q)))
    ).slice(0, 6);
  }, [query]);

  const matchedArticles = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return BLOG_POSTS.filter(b => 
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    ).slice(0, 2);
  }, [query]);

  if (!isOpen) return null;

  const handleQueryClick = (searchKeyword: string) => {
    setQuery(searchKeyword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchQuerySubmit(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-16 sm:pt-24 pb-12">
        <div 
          id="search-experience-modal"
          className="relative inline-block w-full max-w-3xl p-6 sm:p-8 overflow-hidden text-left align-middle transition-all transform bg-[#F8F5ED] rounded-3xl shadow-2xl border border-[#E9DDC8]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-gray-500 hover:text-black hover:bg-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search Input Bar */}
          <form onSubmit={handleSubmit} className="relative mb-6">
            <label htmlFor="search-input" className="block text-xs font-semibold text-[#145C3A] uppercase tracking-wider mb-2">
              Instant Beauty Search
            </label>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-6 h-6 text-[#145C3A]" />
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for? (e.g. serum, foundation, vitamin c)"
                autoFocus
                className="w-full pl-13 pr-24 py-4 rounded-2xl bg-white border border-[#E9DDC8] text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-hidden focus:ring-2 focus:ring-[#145C3A] text-base sm:text-lg transition-all shadow-xs"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-14 text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-[#145C3A] text-white rounded-xl text-xs font-semibold hover:bg-[#0B452A] transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* If query entered: Show matched results */}
          {query.trim().length > 0 ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-sm font-semibold text-[#145C3A] uppercase tracking-wide">
                    Products ({matchedProducts.length})
                  </h4>
                  {matchedProducts.length > 0 && (
                    <button
                      onClick={() => {
                        onSearchQuerySubmit(query);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#145C3A] hover:underline flex items-center gap-1"
                    >
                      View All Results <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {matchedProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 text-center border border-[#E9DDC8]">
                    <p className="text-sm text-gray-500">
                      No products found matching "<strong className="text-[#145C3A]">{query}</strong>". Try searching for "serum", "rose", or "argan".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedProducts.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="bg-white p-3 rounded-xl border border-[#E9DDC8] flex items-center gap-3 cursor-pointer hover:border-[#145C3A] hover:shadow-xs transition-all"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-14 h-14 object-cover rounded-lg bg-[#FAF8F3]"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#145C3A] font-bold uppercase tracking-wider block">
                            {product.category}
                          </span>
                          <h5 className="font-serif text-sm font-semibold text-[#1E1E1E] truncate">
                            {product.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#145C3A]">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-gray-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {matchedArticles.length > 0 && (
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#145C3A] uppercase tracking-wide mb-3">
                    Articles & Guides
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {matchedArticles.map(article => (
                      <div 
                        key={article.id}
                        className="bg-white p-3 rounded-xl border border-[#E9DDC8] flex items-center justify-between"
                      >
                        <span className="text-xs font-medium text-[#1E1E1E]">
                          {article.title}
                        </span>
                        <span className="text-[11px] text-[#145C3A] font-semibold bg-[#E8F0E7] px-2.5 py-0.5 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Default initial view: Popular searches, Trending categories, Recent searches */
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-2.5 text-[#145C3A]">
                  <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Popular Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleQueryClick(item)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#E9DDC8] text-xs font-medium text-[#1E1E1E] hover:border-[#145C3A] hover:bg-[#E8F0E7] hover:text-[#145C3A] transition-all cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Categories */}
              <div>
                <div className="flex items-center gap-2 mb-2.5 text-[#145C3A]">
                  <TrendingUp className="w-4 h-4 text-[#145C3A]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Trending Categories
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleQueryClick(cat)}
                      className="px-3.5 py-1.5 rounded-full bg-[#E8F0E7] text-[#145C3A] border border-[#145C3A]/20 text-xs font-semibold hover:bg-[#145C3A] hover:text-white transition-all cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div className="pt-2 border-t border-[#E9DDC8]/60">
                <div className="flex items-center gap-2 mb-2 text-[#1E1E1E]/60">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Recent Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQueryClick(term)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs text-[#1E1E1E]/80 bg-white/60 hover:bg-white hover:text-[#145C3A] transition-colors"
                    >
                      <Tag className="w-3 h-3 text-[#C9A45C]" /> {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
