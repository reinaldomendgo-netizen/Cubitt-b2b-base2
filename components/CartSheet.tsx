
import React from 'react';
import { CartItem } from '../types';

interface CartSheetProps {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (sku: string) => void;
  onUpdate: (sku: string, qty: number) => void;
  onCheckout: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ cart, onClose, onRemove, onUpdate, onCheckout }) => {
  const subtotal = cart.reduce((acc, curr) => acc + (curr.variant.price * curr.quantity), 0);

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">Your Order</h2>
          <button onClick={onClose} className="p-2 bg-[#f5f5f7] rounded-full">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <span className="material-symbols-outlined text-[64px] text-[#d2d2d7] mb-4">shopping_bag</span>
              <p className="text-[#86868b] text-lg font-light">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.variant.sku} className="flex gap-4">
                  <div className="w-20 h-20 bg-[#f5f5f7] rounded-xl overflow-hidden shrink-0 border border-black/5">
                    <img src={item.variant.image} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-[15px] leading-tight pr-4">{item.product.title}</h4>
                      <button onClick={() => onRemove(item.variant.sku)} className="text-[#86868b] hover:text-red-500">
                        <span className="material-symbols-outlined scale-75">delete</span>
                      </button>
                    </div>
                    <div className="text-xs text-[#86868b] mb-3">{item.variant.option1} • SKU: {item.variant.sku}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#d2d2d7] rounded-full px-2 h-7">
                        <button onClick={() => onUpdate(item.variant.sku, item.quantity - 1)} className="px-2 font-bold text-[#86868b]">-</button>
                        <span className="text-xs w-8 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => onUpdate(item.variant.sku, item.quantity + 1)} className="px-2 font-bold text-[#86868b]">+</button>
                      </div>
                      <span className="text-[15px] font-medium">${(item.variant.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pt-8 border-t border-[#d2d2d7]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[#86868b] font-medium uppercase tracking-widest text-xs">Total Estimate</span>
            <span className="text-3xl font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="w-full h-14 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl active:scale-[0.98]"
          >
            Review & Finalize Order
          </button>
          <p className="text-[10px] text-[#86868b] text-center mt-4 uppercase tracking-widest font-bold">
            Authorized Corporate Order Generation
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSheet;
