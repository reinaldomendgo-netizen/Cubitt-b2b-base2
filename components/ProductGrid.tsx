
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onSelect: (p: Product) => void;
  selectedCategory: string;
  isEmpty?: boolean;
  onOpenMenu?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelect, selectedCategory, isEmpty, onOpenMenu }) => {
  if (isEmpty) {
    return (
      <main className="flex-1 min-w-0 pb-12 flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-[32px] border border-black/5 shadow-sm">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
           <span className="material-icons text-5xl text-gray-300">cloud_upload</span>
        </div>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3">Base de Datos Vacía</h2>
        <p className="text-xs md:text-base text-gray-500 max-w-md mb-8">
          Para comenzar a realizar pedidos, por favor sincroniza una hoja de Google Sheets o carga un archivo CSV/Excel desde el panel lateral (Menú en móvil).
        </p>
        <button 
          onClick={onOpenMenu}
          className="lg:hidden mt-4 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm uppercase tracking-wider"
        >
          Abrir Menú
        </button>
      </main>
    );
  }

  return (
    <main className="flex-1 min-w-0 pb-20 md:pb-12 pr-0 md:pr-2">
      <div className="mb-4 md:mb-8">
        <nav className="flex items-center text-[9px] md:text-[10px] text-gray-400 mb-1 md:mb-2 uppercase tracking-[0.2em] font-bold">
          <button 
            onClick={onOpenMenu}
            className="lg:hidden mr-3 p-1 -ml-1 text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="material-icons text-lg">menu</span>
          </button>
          <span className="hover:text-black cursor-pointer">Catálogo</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-black">{selectedCategory === 'All' ? 'Todos' : selectedCategory}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-black leading-none mb-1 md:mb-2">
              {selectedCategory === 'All' ? 'Catálogo' : selectedCategory}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium">{products.length} productos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
        {products.map(product => (
          <div 
            key={product.id}
            onClick={() => onSelect(product)}
            className="group bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-black/5 flex flex-col justify-between cursor-pointer h-[220px] md:h-[280px]"
          >
            <div className="flex items-center justify-center h-[100px] md:h-[140px] mb-3 md:mb-4 bg-gray-50 rounded-lg md:rounded-xl overflow-hidden relative">
                 {product.mainImage ? (
                    <img src={product.mainImage} alt={product.title} className="h-full w-full object-contain mix-blend-multiply p-2 transition-transform duration-500 group-hover:scale-110" />
                 ) : (
                    <span className="material-icons text-2xl md:text-4xl text-gray-200">image_not_supported</span>
                 )}
                 {product.isOutOfStock && (
                     <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                         <span className="bg-red-500 text-white text-[8px] md:text-[9px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest">Agotado</span>
                     </div>
                 )}
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex gap-2 mb-0.5 md:mb-1">
                 <span className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">{product.type}</span>
              </div>
              <h3 className="font-bold text-xs md:text-sm text-black leading-tight mb-1 group-hover:text-link-blue transition-colors line-clamp-2">
                {product.title}
              </h3>
            </div>
            
            <div className="mt-auto pt-2 md:pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-bold uppercase tracking-wide">
                 <span className="text-gray-400 hidden sm:inline">{product.variants.length} Opts</span>
                 <span className="text-gray-400 sm:hidden">{product.variants.length}</span>
              </div>
              <div className="text-right">
                <span className={`block font-black text-sm md:text-lg text-black ${product.isOutOfStock ? 'text-gray-300' : ''}`}>
                  ${product.variants[0].price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductGrid;
