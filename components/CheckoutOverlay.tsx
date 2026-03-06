
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutOverlayProps {
  cart: CartItem[];
  onClose: () => void;
  onConfirm: () => void;
}

const CheckoutOverlay: React.FC<CheckoutOverlayProps> = ({ cart, onClose, onConfirm }) => {
  const [step, setStep] = useState<'review' | 'success'>('review');
  const subtotal = cart.reduce((acc, curr) => acc + (curr.variant.price * curr.quantity), 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const handleWhatsApp = () => {
    const text = `Cubitt B2B Order Request:\n\n${cart.map(i => `${i.product.title} (${i.variant.option1}) - Qty: ${i.quantity} - SKU: ${i.variant.sku}`).join('\n')}\n\nTotal: $${total.toFixed(2)}`;
    window.open(`https://wa.me/50700000000?text=${encodeURIComponent(text)}`);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
      
      <div className="relative w-full max-w-4xl z-10">
        <header className="text-center mb-12">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Order Confirmation</h2>
          <p className="text-xl text-[#86868b] font-light">Please review the details of your corporate purchase order.</p>
        </header>

        <div className="bg-white rounded-[40px] border border-[#d2d2d7]/50 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="flex-1 p-10 lg:p-12 overflow-y-auto max-h-[60vh]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#86868b] mb-8">Line Items</h3>
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.variant.sku} className="flex gap-6 items-center">
                  <div className="w-16 h-16 bg-[#f5f5f7] rounded-xl overflow-hidden border border-black/5 shrink-0">
                    <img src={item.variant.image} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">{item.product.title}</span>
                      <span className="font-semibold text-lg">${(item.variant.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-[#86868b] mt-1">
                      {item.variant.option1} • {item.quantity} Units • SKU: {item.variant.sku}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[350px] bg-[#f5f5f7] p-10 lg:p-12 flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#86868b] mb-8">Summary</h3>
            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-[#424245]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#424245]">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#424245]">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="h-px bg-[#d2d2d7] my-4" />
              <div className="flex justify-between text-2xl font-bold text-black">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              <button 
                onClick={handleWhatsApp}
                className="w-full h-14 bg-[#25D366] text-white rounded-2xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined">chat</span>
                Confirm via WhatsApp
              </button>
              <button 
                onClick={onConfirm}
                className="w-full h-14 bg-black text-white rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined">mail</span>
                Send via Email
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 text-[#86868b] font-medium hover:text-black transition-colors"
              >
                Modify Order
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[#86868b] text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
            PDF Generated
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">table_view</span>
            Excel Ready
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">encrypted</span>
            Corporate Protocol
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOverlay;
