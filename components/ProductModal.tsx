
import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, variantSku: string, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAdd }) => {
  const availableVariants = product.variants.filter(v => v.inventory > 0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(availableVariants[0] || product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [selectedVariant]);

  const handleAdd = () => {
    onAdd(product, selectedVariant.sku, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="bg-white w-full max-w-5xl h-full max-h-[85vh] rounded-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-[#f5f5f7] rounded-full text-[#424245] hover:text-black z-20 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex-1 bg-[#f5f5f7] p-8 flex items-center justify-center overflow-hidden">
          <img 
            src={selectedVariant.image} 
            alt={product.title} 
            className={`max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-500 ${animating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
          />
        </div>

        <div className="w-full md:w-[450px] p-8 md:p-12 overflow-y-auto flex flex-col">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full mb-4">IN STOCK</span>
            <div className="text-[#86868b] font-medium text-sm mb-1">{product.category}</div>
            <h2 className="text-4xl font-semibold tracking-tight mb-2">{product.title}</h2>
            <div className="text-2xl font-normal text-[#1d1d1f] mb-6">${selectedVariant.price.toFixed(2)} / unit</div>
            <p className="text-[#424245] leading-relaxed text-[15px] font-light">
              {product.description}
            </p>
          </div>

          <div className="space-y-8 mb-10">
            <div>
              <h3 className="text-sm font-semibold mb-4 text-[#1d1d1f]">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {availableVariants.map((v) => (
                  <button 
                    key={v.sku}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all flex items-center gap-2 ${
                      selectedVariant.sku === v.sku 
                        ? 'border-[#0071e3] bg-[#0071e3]/5 text-[#0071e3]' 
                        : 'border-[#d2d2d7] hover:border-[#86868b] text-[#424245]'
                    }`}
                  >
                    <div 
                      className="w-3 h-3 rounded-full shadow-inner border border-black/5" 
                      style={{ backgroundColor: v.option1.toLowerCase().replace(' ', '') }}
                    />
                    {v.option1}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4 text-[#1d1d1f]">Corporate Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#d2d2d7] rounded-full overflow-hidden h-12">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 hover:bg-[#f5f5f7] h-full transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">remove</span>
                  </button>
                  <input 
                    type="number" 
                    className="w-20 text-center border-none focus:ring-0 font-medium"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 hover:bg-[#f5f5f7] h-full transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">add</span>
                  </button>
                </div>
                <div className="text-xs text-[#86868b]">SKU: {selectedVariant.sku}</div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-[#d2d2d7]">
            <button 
              onClick={handleAdd}
              className="w-full h-14 bg-[#0071e3] text-white rounded-full font-semibold text-lg hover:bg-[#0077ed] transition-colors shadow-lg active:scale-[0.98]"
            >
              Add to Bulk Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
