
import React from 'react';
import { User, AppView } from '../types';

interface NavbarProps {
  user: User;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: AppView) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleMobileMenu?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onOpenCart, onNavigate, searchQuery, setSearchQuery, onToggleMobileMenu }) => {
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
      'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
      'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
      'bg-pink-500', 'bg-rose-500'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = user.companyName.substring(0, 2).toUpperCase();
  const avatarColor = getAvatarColor(user.companyName);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-4">
        
        {/* Left Section: Logo & Mobile Menu */}
        <div className="flex items-center gap-3 md:gap-12">
          {/* Mobile Menu Button */}
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 -ml-2 text-black"
          >
            <span className="material-icons">menu</span>
          </button>

          <button 
            onClick={() => onNavigate('CATALOG')}
            className="flex items-center gap-2 md:gap-3 text-black font-black text-lg md:text-xl tracking-tighter uppercase"
          >
            <div className="bg-black text-white p-1 md:p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-icons text-base md:text-xl">layers</span>
            </div>
            <span className="hidden xs:inline">Cubitt B2B</span>
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => onNavigate('CATALOG')} className="text-[11px] font-black uppercase text-black transition-colors tracking-widest border-b-2 border-black pb-0.5">Catalog</button>
            <button onClick={() => onNavigate('REVIEW_ORDER')} className="text-[11px] font-black uppercase text-gray-400 hover:text-black transition-colors tracking-widest">Orders</button>
            <button onClick={() => onNavigate('ACCOUNT')} className="text-[11px] font-black uppercase text-gray-400 hover:text-black transition-colors tracking-widest">Account</button>
          </nav>
        </div>
        
        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-2 md:gap-6 flex-1 justify-end">
          <div className="relative flex-1 max-w-[200px] md:max-w-[320px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <span className="material-icons text-[16px] md:text-[18px]">search</span>
            </span>
            <input 
              className="w-full pl-9 pr-4 py-2 bg-[#F5F5F7] border-none rounded-lg md:rounded-xl text-[12px] md:text-[13px] font-medium focus:ring-1 focus:ring-black/10 placeholder-gray-400 text-black transition-all" 
              placeholder="Buscar..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-1 md:gap-3">
            <button 
              onClick={onOpenCart}
              className="p-2 text-gray-400 hover:text-black transition-colors relative"
            >
               <span className="material-icons text-xl md:text-2xl">shopping_cart</span>
               {cartCount > 0 && (
                 <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 md:h-4 md:w-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                   {cartCount}
                 </span>
               )}
            </button>

            <button onClick={() => onNavigate('ACCOUNT')} className="hidden md:flex items-center gap-4 pl-6 border-l border-black/5 group">
              <div className="text-right hidden xl:block">
                <p className="text-[11px] font-black uppercase text-black leading-none mb-1">{user.companyName}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Ver Perfil</p>
              </div>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-xs ${avatarColor}`}>
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.companyName} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
