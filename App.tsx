
import React, { useState, useMemo, useEffect } from 'react';
import { User, Product, CartItem, Category, AppView, Order } from './types';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import ProductDetailView from './components/ProductDetailView';
import ReviewOrderView from './components/ReviewOrderView';
import AccountView from './components/AccountView';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]); 
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); // Historial de pedidos
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  // const [inStockOnly, setInStockOnly] = useState(true); // Removed as per request to always hide out of stock
  const [currentView, setCurrentView] = useState<AppView>('CATALOG');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  // Estado para controlar el menú lateral en móviles
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cargar pedidos guardados al iniciar
  useEffect(() => {
    const savedOrders = localStorage.getItem('cubitt_b2b_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Error loading orders', e);
      }
    }
  }, []);

  const saveOrder = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('cubitt_b2b_orders', JSON.stringify(updatedOrders));
  };

  const deleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter(o => o.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('cubitt_b2b_orders', JSON.stringify(updatedOrders));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.type === selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.variants.some(v => v.sku.toLowerCase().includes(searchQuery.toLowerCase()));
      // Always filter out out of stock products
      const matchesStock = !p.isOutOfStock;
      return matchesCategory && matchesSearch && matchesStock;
    });
  }, [products, selectedCategory, searchQuery]);

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.variant.price * curr.quantity), 0);
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleProductSelect = (p: Product) => {
    setActiveProduct(p);
    setCurrentView('PRODUCT_DETAIL');
  };

  const handleAddToCart = (product: Product, variantSku: string, quantity: number) => {
    const variant = product.variants.find(v => v.sku === variantSku)!;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.variant.sku === variantSku);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity
        };
        return newCart;
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const removeFromCart = (sku: string) => {
    setCart(prev => prev.filter(item => item.variant.sku !== sku));
  };

  const updateCartQuantity = (sku: string, qty: number) => {
    setCart(prev => prev.map(item => item.variant.sku === sku ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    if (view !== 'PRODUCT_DETAIL') setActiveProduct(null);
    window.scrollTo(0,0);
    setIsMobileMenuOpen(false);
  };

  // Si no hay usuario, mostrar Login
  if (!user) {
    return <Login onLogin={(u, loadedProducts) => {
      setUser(u);
      setProducts(loadedProducts); 
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col font-sans transition-colors duration-200">
      <Navbar 
        user={user} 
        cartCount={cartCount}
        onOpenCart={() => navigateTo('REVIEW_ORDER')}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
      />
      
      <Sidebar 
        products={products}
        selectedCategory={selectedCategory} 
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'CATALOG') navigateTo('CATALOG');
        }} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        showDesktop={false}
      />

      {currentView === 'CATALOG' && (
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-8 flex gap-8 w-full h-[calc(100vh-60px)] md:h-[calc(100vh-80px)]">
          <Sidebar 
            products={products}
            selectedCategory={selectedCategory} 
            setSelectedCategory={(cat) => {
              setSelectedCategory(cat);
              // No need to navigate as we are already in CATALOG
            }} 
            isOpen={false}
            onClose={() => {}}
            showDesktop={true}
          />
          
          <ProductGrid 
            products={filteredProducts} 
            onSelect={handleProductSelect} 
            selectedCategory={selectedCategory}
            isEmpty={products.length === 0} 
          />
        </div>
      )}

      {currentView === 'PRODUCT_DETAIL' && activeProduct && (
        <ProductDetailView 
          product={activeProduct} 
          onAddToCart={handleAddToCart}
          onBack={() => navigateTo('CATALOG')}
          onViewOrder={() => navigateTo('REVIEW_ORDER')}
        />
      )}

      {currentView === 'REVIEW_ORDER' && (
        <ReviewOrderView 
          user={user}
          cart={cart} 
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeFromCart}
          onBack={() => navigateTo('CATALOG')}
          onSaveOrder={saveOrder}
          onConfirm={() => {
            setCart([]);
            navigateTo('CATALOG');
          }}
        />
      )}

      {currentView === 'ACCOUNT' && (
        <AccountView 
          user={user} 
          onBack={() => navigateTo('CATALOG')} 
          orders={orders}
          onDeleteOrder={deleteOrder}
        />
      )}

      {currentView === 'CATALOG' && cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce-in">
          <div 
            onClick={() => navigateTo('REVIEW_ORDER')}
            className="bg-black text-white px-5 py-3 md:px-6 md:py-4 rounded-full shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="relative">
              <span className="material-icons text-white text-xl md:text-2xl">shopping_bag</span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-white text-black text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-gray-300 font-semibold hidden md:block">Current Order</span>
              <span className="text-base md:text-xl font-bold leading-none">${cartTotal.toFixed(2)}</span>
            </div>
            <span className="material-icons text-gray-400 text-lg md:text-xl">chevron_right</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
