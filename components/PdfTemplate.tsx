import React from 'react';
import { CartItem, User } from '../types';

interface PdfTemplateProps {
  user?: User;
  cart: CartItem[];
  orderId: string;
  date: string;
  subtotal: number;
  tax: number;
  total: number;
  totalQuantity: number;
}

const PdfTemplate: React.FC<PdfTemplateProps> = ({
  user,
  cart,
  orderId,
  date,
  subtotal,
  tax,
  total,
  totalQuantity
}) => {
  return (
    <div className="fixed top-0 left-0 w-[816px] pointer-events-none opacity-0 z-[-1]">
      <div id="proforma-invoice-content" className="bg-white p-6 w-full text-black font-sans relative">
          
          <div className="flex justify-between items-start mb-4 border-b-2 border-black pb-3">
              <div>
                 <div className="flex items-center gap-2 mb-2">
                     <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-lg">
                         <span className="material-icons text-lg">layers</span>
                     </div>
                     <h1 className="text-xl font-black uppercase tracking-tighter">Cubitt Panama</h1>
                 </div>
                 <div className="text-[10px] text-gray-500 leading-tight">
                     Kenex Plaza, Avenida Samuel Lewis<br />
                     con Calle 59 de Obarrio<br />
                     +507 6154-1129
                 </div>
              </div>
              <div className="text-right">
                  <h2 className="text-3xl font-black uppercase tracking-widest text-gray-200 mb-1">Proforma</h2>
                  <div className="text-xs font-bold">#{orderId}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{date}</div>
              </div>
          </div>

          <div className="mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Facturar a</h3>
              <div className="text-lg font-black uppercase tracking-tight">{user?.companyName || 'Cliente Corporativo'}</div>
          </div>

          <table className="w-full mb-6">
              <thead>
                  <tr className="border-b-2 border-black text-[10px] font-black uppercase tracking-widest">
                      <th className="text-left py-1.5 w-[50%]">Descripción</th>
                      <th className="text-center py-1.5">SKU</th>
                      <th className="text-center py-1.5">Cant</th>
                      <th className="text-right py-1.5">Precio</th>
                      <th className="text-right py-1.5">Total</th>
                  </tr>
              </thead>
              <tbody className="text-xs">
                  {cart.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                          <td className="py-1.5 pr-2 flex items-center gap-3">
                              {item.variant.image && (
                                  <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded border border-gray-100 p-0.5">
                                      <img src={item.variant.image} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                                  </div>
                              )}
                              <div>
                                  <div className="font-bold truncate max-w-[200px]">{item.product.title}</div>
                                  <div className="text-[10px] text-gray-500">{item.variant.option1}</div>
                              </div>
                          </td>
                          <td className="py-1.5 text-center font-mono text-xs font-bold text-gray-700">{item.variant.sku}</td>
                          <td className="py-1.5 text-center font-bold">{item.quantity}</td>
                          <td className="py-1.5 text-right text-gray-600">${item.variant.price.toFixed(2)}</td>
                          <td className="py-1.5 text-right font-bold">${(item.variant.price * item.quantity).toFixed(2)}</td>
                      </tr>
                  ))}
              </tbody>
          </table>

          <div className="flex justify-end mb-6">
              <div className="w-48 space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                      <span>Cant. Total</span>
                      <span className="font-medium">{totalQuantity}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                      <span>ITBMS (7%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-black my-1"></div>
                  <div className="flex justify-between text-lg font-black">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                  </div>
              </div>
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Información Bancaria</h4>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-600">
                  <div>
                      <span className="block font-bold text-black mb-0.5">Banco General</span>
                      Cuenta Corriente<br />
                      03-72-01-120359-5<br />
                      Casiolandia
                  </div>
                  <div>
                      <span className="block font-bold text-black mb-0.5">Términos</span>
                      Validez: 15 días.<br />
                      Entrega: 24-48 horas.<br />
                      No devoluciones efectivo.
                  </div>
              </div>
          </div>

          <div className="text-center border-t border-gray-100 pt-3 mt-4">
               <p className="text-[8px] text-gray-400 font-medium uppercase tracking-widest">
                  Cubitt.com.pa
               </p>
          </div>

      </div>
    </div>
  );
};

export default PdfTemplate;
