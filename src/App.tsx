import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AccountView } from './views/AccountView';
import { DealsView } from './views/DealsView';
import { NewArrivalsView } from './views/NewArrivalsView';
import { AboutView } from './views/AboutView';
import { BlogsView } from './views/BlogsView';
import { ContactView } from './views/ContactView';
import { IngredientStandardsView } from './views/IngredientStandardsView';
import { FAQAndPoliciesView } from './views/FAQAndPoliciesView';
import { StoreLocatorView } from './views/StoreLocatorView';
import { CareersView } from './views/CareersView';
import { ShadeFinderView } from './views/ShadeFinderView';
import { SignUpPromoModal } from './components/SignUpPromoModal';
import { ActivePage, CartItem, Product, OrderInfo } from './types';
import { PRODUCTS } from './data/mockData';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Cart state initialized with 2 initial popular items for immediate rich state demonstration
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1, selectedVariant: '50ml' },
    { product: PRODUCTS[1], quantity: 1, selectedVariant: '30ml' },
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(['hydralux-serum', 'velvet-rose-cream']);

  // Modals & Drawers state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Latest placed order
  const [latestOrder, setLatestOrder] = useState<OrderInfo | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top on page navigation
  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add to Cart handler
  const handleAddToCart = (product: Product, quantity = 1, variant?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant || product.volume }];
    });

    showToast(`Added "${product.name}" to your cart.`);
    setIsCartDrawerOpen(true);
  };

  // Stepper quantity update
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from wishlist' : 'Saved to your wishlist ♥');
      return updated;
    });
  };

  // Quick view trigger
  const handleQuickView = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Open product detail page
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place order
  const handlePlaceOrder = (orderInfo: OrderInfo) => {
    setLatestOrder(orderInfo);
    setCart([]); // Clear cart upon order completion
  };

  const handleSelectCategoryAndSub = (cat: string, sub?: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5ED] text-[#1E1E1E] font-sans antialiased selection:bg-[#145C3A] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-[#0B452A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#C9A45C]/40 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#C9A45C] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/70 hover:text-white ml-2 p-1"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Sticky Header */}
      <Header
        activePage={activePage}
        setActivePage={handleNavigate}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory(undefined);
          handleNavigate('shop');
        }}
        onSelectCategoryAndSub={handleSelectCategoryAndSub}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        cart={cart}
        wishlist={wishlist}
        openCartDrawer={() => setIsCartDrawerOpen(true)}
        openSearchModal={() => setIsSearchModalOpen(true)}
        onOpenPromoModal={() => setIsPromoModalOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedSubcategory(undefined);
              handleNavigate('shop');
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, e)}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            wishlist={wishlist}
            cart={cart}
          />
        )}

        {activePage === 'shop' && (
          <ShopView
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedSubcategory(undefined);
            }}
            onSelectSubcategory={setSelectedSubcategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, e)}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            wishlist={wishlist}
            cart={cart}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={(prod, qty, variant) => handleAddToCart(prod, qty, variant)}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutView
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'order-confirmation' && (
          <OrderConfirmationView
            order={latestOrder}
            onNavigate={handleNavigate}
          />
        )}

        {(activePage === 'track-order' || activePage === 'order-tracking') && (
          <OrderTrackingView
            order={latestOrder}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'account' && (
          <AccountView
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'deals' && (
          <DealsView
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, e)}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            wishlist={wishlist}
            cart={cart}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'new-arrivals' && (
          <NewArrivalsView
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, e)}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            wishlist={wishlist}
            cart={cart}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {activePage === 'blogs' && (
          <BlogsView onNavigate={handleNavigate} />
        )}

        {activePage === 'contact' && (
          <ContactView onNavigate={handleNavigate} />
        )}

        {activePage === 'ingredients' && (
          <IngredientStandardsView onNavigate={handleNavigate} />
        )}

        {(activePage === 'faq' || activePage === 'returns' || activePage === 'privacy' || activePage === 'terms' || activePage === 'sustainability') && (
          <FAQAndPoliciesView
            initialTab={
              activePage === 'returns' ? 'returns' :
              activePage === 'privacy' ? 'privacy' :
              activePage === 'terms' ? 'terms' :
              activePage === 'sustainability' ? 'sustainability' : 'faq'
            }
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'stores' && (
          <StoreLocatorView onNavigate={handleNavigate} />
        )}

        {activePage === 'careers' && (
          <CareersView onNavigate={handleNavigate} />
        )}

        {activePage === 'shade-finder' && (
          <ShadeFinderView
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        setActivePage={handleNavigate}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavigate('shop');
        }}
      />

      {/* Interactive Right-side Slide-Out Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onNavigate={handleNavigate}
      />

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
        onSearchQuerySubmit={(query) => {
          setSelectedCategory('All');
          handleNavigate('shop');
        }}
      />

      {/* Quick View Dialog */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, qty) => {
          handleAddToCart(prod, qty);
          setQuickViewProduct(null);
        }}
        onToggleWishlist={handleToggleWishlist}
        onViewProductPage={handleSelectProduct}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      {/* Sign Up & Get 20% OFF Modal */}
      <SignUpPromoModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        onApplyCoupon={(code) => {
          showToast(`Coupon ${code} (20% OFF) activated for your order!`);
        }}
      />
    </div>
  );
}
