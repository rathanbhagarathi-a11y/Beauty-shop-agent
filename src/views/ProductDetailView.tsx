import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Leaf, 
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { Product, ActivePage } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: ActivePage) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
  onNavigate,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'howToUse' | 'reviews'>('description');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState(product.volume || '50ml');

  const allImages = [product.image, ...(product.secondaryImages || [])];

  // Related products
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVolume);
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity, selectedVolume);
    onNavigate('checkout');
  };

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-6 sm:py-10 pb-24 lg:pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto no-scrollbar">
          <button onClick={() => onNavigate('home')} className="hover:text-[#145C3A] whitespace-nowrap">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <button onClick={() => onNavigate('shop')} className="hover:text-[#145C3A] whitespace-nowrap">
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-gray-400 whitespace-nowrap">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[#145C3A] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Section (Grid 2 Columns Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-xs mb-14">
          {/* Left: Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square sm:aspect-4/5 rounded-2xl overflow-hidden bg-[#FAF8F3] border border-[#E9DDC8]">
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 z-10 px-3.5 py-1 bg-[#C9A45C] text-[#0B452A] rounded-full text-xs font-bold shadow-xs">
                  {product.discountPercent}% OFF
                </span>
              )}
              <img
                src={allImages[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Row */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#145C3A] ring-2 ring-[#145C3A]/20'
                        : 'border-[#E9DDC8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Buy Box */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Badges */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A]">
                  {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                </span>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#145C3A] transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
                {product.name}
              </h1>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-[#C9A45C]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current text-[#C9A45C]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1E1E1E]">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">
                  ({product.reviewsCount} verified reviews)
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-[#145C3A] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 pt-2 pb-1 border-b border-[#E9DDC8]">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#145C3A]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-bold text-[#0B452A] bg-[#C9A45C]/30 px-2.5 py-1 rounded-md">
                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#1E1E1E]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Volume Options */}
              {product.volume && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E] block mb-2">
                    Size / Volume
                  </span>
                  <div className="flex gap-2">
                    {['30ml', '50ml', '100ml'].map((vol) => (
                      <button
                        key={vol}
                        onClick={() => setSelectedVolume(vol)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedVolume === vol
                            ? 'bg-[#145C3A] text-white'
                            : 'bg-[#FAF8F3] text-gray-700 border border-[#E9DDC8] hover:border-[#145C3A]'
                        }`}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E9DDC8] rounded-full bg-[#FAF8F3] px-3 py-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#145C3A] font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#1E1E1E]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#145C3A] font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#145C3A] text-white text-xs sm:text-sm font-bold hover:bg-[#0B452A] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3.5 rounded-full border transition-all ${
                      isWishlisted
                        ? 'bg-[#0B452A] text-white border-[#0B452A]'
                        : 'bg-white text-gray-700 border-[#E9DDC8] hover:border-[#145C3A]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-[#C9A45C]' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 rounded-full bg-[#C9A45C] text-[#0B452A] text-xs sm:text-sm font-bold hover:bg-[#d8b56f] transition-colors shadow-2xs cursor-pointer"
                >
                  Buy Now with 1-Click Checkout
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] text-[11px] text-gray-700">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#145C3A] shrink-0" />
                  <span>Free shipping on orders $60+</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#145C3A] shrink-0" />
                  <span>100% Genuine Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#145C3A] shrink-0" />
                  <span>30-Day Hassle-Free Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description, Ingredients, How to Use, Reviews */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9DDC8] shadow-xs mb-16">
          <div className="flex border-b border-[#E9DDC8] gap-4 sm:gap-8 overflow-x-auto no-scrollbar mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-b-2 border-[#145C3A] text-[#145C3A]'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Description & Benefits
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'ingredients'
                  ? 'border-b-2 border-[#145C3A] text-[#145C3A]'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Ingredients (INCI)
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'howToUse'
                  ? 'border-b-2 border-[#145C3A] text-[#145C3A]'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              How to Use
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[#145C3A] text-[#145C3A]'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Customer Reviews ({product.reviewsCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-sm text-[#1E1E1E]/80 leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p>{product.description}</p>
                {product.keyBenefits && (
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#145C3A] mb-3">
                      Clinically Observed Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.keyBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#E9DDC8]">
                          <Leaf className="w-4 h-4 text-[#145C3A] shrink-0" />
                          <span className="text-xs font-semibold text-[#1E1E1E]">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <p>
                  We formulate without parabens, phthalates, synthetic sulfates, artificial fragrances, or microplastics.
                </p>
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8]">
                  <h4 className="font-serif text-sm font-bold text-[#145C3A] mb-2">Key Actives:</h4>
                  <p className="text-xs font-medium text-gray-700 mb-3">
                    {product.keyIngredients ? product.keyIngredients.join(', ') : 'Botanical extracts, Cold-pressed oils'}
                  </p>
                  <h4 className="font-serif text-sm font-bold text-[#145C3A] mb-1">Full Transparent INCI:</h4>
                  <p className="text-xs text-gray-500 leading-normal">
                    {product.ingredients || 'Aqua (Water), Rosa Damascena Flower Water, Simmondsia Chinensis (Jojoba) Seed Oil, Glycerin, Sodium Hyaluronate, Tocopherol (Vitamin E), Camellia Sinensis Leaf Extract, Phenoxyethanol, Ethylhexylglycerin.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-[#145C3A]">Daily Application Ritual:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-gray-700">
                  <li>Cleanse skin thoroughly with warm water and pat gently with a clean towel.</li>
                  <li>Dispense 2 to 3 drops onto your fingertips or clean palm.</li>
                  <li>Press and smooth evenly across face, neck, and décolletage in upward gentle motions.</li>
                  <li>Follow with your preferred moisturizer and broad-spectrum SPF 50 during daytime.</li>
                </ol>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-[#FAF8F3] border border-[#E9DDC8] gap-4">
                  <div className="text-center sm:text-left">
                    <span className="font-serif text-4xl font-bold text-[#145C3A]">
                      {product.rating.toFixed(1)}
                    </span>
                    <div className="flex items-center justify-center sm:justify-start text-[#C9A45C] my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      Based on {product.reviewsCount} customer reviews
                    </span>
                  </div>

                  <button className="px-6 py-2.5 rounded-full bg-[#145C3A] text-white text-xs font-bold hover:bg-[#0B452A] transition-colors">
                    Write a Review
                  </button>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-[#E9DDC8] bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm">Eleanor Vance</span>
                        <span className="text-[10px] bg-[#E8F0E7] text-[#145C3A] px-2 py-0.5 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <div className="flex text-[#C9A45C] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">
                      "Absolutely changed my morning routine. Within two weeks my skin tone was visibly more even and hydrated without feeling greasy. A holy grail product!"
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#E9DDC8] bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm">Sophie Laurent</span>
                        <span className="text-[10px] bg-[#E8F0E7] text-[#145C3A] px-2 py-0.5 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">1 week ago</span>
                    </div>
                    <div className="flex text-[#C9A45C] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">
                      "Smells subtly like fresh herbs and botanicals, absorbs effortlessly under sunscreen and makeup. 10/10 recommend to anyone with dry or sensitive skin."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customers Also Bought / Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-1">
                  Complete Your Routine
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                  Customers Also Loved
                </h3>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="text-xs font-bold text-[#145C3A] hover:underline"
              >
                View More
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={(p, e) => onAddToCart(p, 1)}
                  onToggleWishlist={(id, e) => onToggleWishlist(id)}
                  onQuickView={(p, e) => onSelectProduct(p)}
                  isWishlisted={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM ADD TO CART BAR (SCREEN 21) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E9DDC8] p-3.5 z-40 shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-wide block">Price</span>
          <span className="font-serif font-bold text-lg text-[#145C3A]">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-2.5 rounded-full border ${
              isWishlisted ? 'bg-[#0B452A] text-white' : 'bg-[#FAF8F3] text-gray-700 border-[#E9DDC8]'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#C9A45C]' : ''}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 rounded-full bg-[#145C3A] text-white text-xs font-bold shadow-md hover:bg-[#0B452A] flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
