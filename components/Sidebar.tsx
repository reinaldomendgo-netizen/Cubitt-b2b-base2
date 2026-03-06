
import React from 'react';
import { Category, Product } from '../types';

interface SidebarProps {
  products: Product[];
  selectedCategory: Category;
  setSelectedCategory: (c: Category) => void;
  onDataUpdate?: (products: Product[]) => void;
  onResetData?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  showDesktop?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  products, 
  selectedCategory, 
  setSelectedCategory, 
  isOpen = false,
  onClose,
  showDesktop = true
}) => {
  const types: string[] = Array.from<string>(new Set(products.map(p => p.type))).sort();
  
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'smartwatches': return 'watch';
      case 'bocinas': return 'speaker';
      case 'básculas': return 'monitor_weight';
      case 'audífonos': return 'headphones';
      case 'teens': return 'face';
      case 'accesorios': return 'widgets';
      case 'hidratación': return 'water_drop';
      case 'termos': return 'water_drop';
      default: return 'label';
    }
  };

  const handleCategorySelect = (type: Category) => {
    setSelectedCategory(type);
    if (onClose) onClose(); // Cerrar menú en móvil al seleccionar
  };

  const sidebarContent = (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar h-full pb-20 md:pb-0">
      <div className="mb-8">
        <h3 className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Categorías</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => handleCategorySelect('All')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                selectedCategory === 'All' 
                  ? 'bg-black text-white shadow-md scale-[1.02]' 
                  : 'text-gray-600 hover:bg-white hover:text-black font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span className="text-sm">Todo el Catálogo</span>
            </button>
          </li>
          {types.map(type => (
            <li key={type}>
              <button
                onClick={() => handleCategorySelect(type)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  selectedCategory === type 
                    ? 'bg-black text-white shadow-md scale-[1.02]' 
                    : 'text-gray-600 hover:bg-white hover:text-black font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{getIcon(type)}</span>
                <span className="text-sm">{type}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {showDesktop && (
        <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col sticky top-20 h-[calc(100vh-6rem)]">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <div className="relative w-80 bg-[#F5F5F7] h-full shadow-2xl p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-lg font-black uppercase tracking-tight">Menú</h2>
               <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-500 hover:text-black">
                 <span className="material-icons">close</span>
               </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
