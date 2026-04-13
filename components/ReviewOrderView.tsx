
import React, { useState, useMemo } from 'react';
import { CartItem, Order, User } from '../types';
import PdfTemplate from './PdfTemplate';

interface ReviewOrderViewProps {
  user?: User;
  cart: CartItem[];
  onUpdateQuantity: (sku: string, qty: number) => void;
  onRemove: (sku: string) => void;
  onBack: () => void;
  onConfirm: () => void;
  onSaveOrder: (order: Order) => void;
}

const ReviewOrderView: React.FC<ReviewOrderViewProps> = ({ 
  user,
  cart, 
  onUpdateQuantity, 
  onRemove, 
  onBack, 
  onConfirm,
  onSaveOrder
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Generar ID de orden único y estable para esta sesión de vista
  const orderId = useMemo(() => Date.now().toString().slice(-7), []);

  // Cálculos financieros
  const subtotal = cart.reduce((acc, curr) => acc + (curr.variant.price * curr.quantity), 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;
  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  
  const buildOrderText = () => {
    const br = "\n";
    let text = `📦 *ORDEN B2B CUBITT PANAMA*${br}`;
    if (user) text += `Empresa: ${user.companyName}${br}`;
    text += `${br}`;
    
    cart.forEach((item, i) => {
      text += `${i+1}. *${item.product.title}*${br}   SKU: \`${item.variant.sku}\` | Cant: ${item.quantity}${br}${br}`;
    });
    text += `*TOTAL FINAL: $${total.toFixed(2)}*${br}${br}ID: ${orderId}`;
    return text;
  };

  const saveToHistory = (status: 'Paid' | 'Pending') => {
    const newOrder: Order = {
      id: `ORD-${orderId}`,
      date: new Date().toLocaleDateString('es-PA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal,
      tax,
      total,
      status: status
    };
    onSaveOrder(newOrder);
  };

  const handleWhatsApp = () => {
    saveToHistory('Pending');
    window.open(`https://wa.me/50761541129?text=${encodeURIComponent(buildOrderText())}`, '_blank');
    onConfirm();
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const element = document.getElementById('proforma-invoice-content');
      if (!element) throw new Error('No se encontró el contenido para generar el PDF');

      // @ts-ignore
      const html2pdf = window.html2pdf;
      if (typeof html2pdf !== 'function') throw new Error('Librería PDF no cargada');
      
      const clientName = user?.companyName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Cliente';
      
      const opt = {
        margin:       0.3, 
        filename:     `${clientName}_PF_${orderId}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
      
      saveToHistory('Paid');
      // Esperar un momento antes de limpiar para que el usuario perciba la acción
      setTimeout(() => onConfirm(), 2000);
      
    } catch (error) {
      console.error(error);
      alert('Error generando PDF. Intente nuevamente.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (cart.length === 0) {
     return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-4xl text-gray-400">shopping_cart_off</span>
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
           <p className="text-gray-500 mb-8">Agrega productos del catálogo para generar una proforma.</p>
           <button onClick={onBack} className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform">
              Ir al Catálogo
           </button>
        </div>
     );
  }

  return (
    <div className="h-full flex flex-col max-w-[1280px] mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Interactivo */}
      <div className="flex items-center gap-4 mb-8">
        <button 
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
            <span className="material-icons text-gray-600">arrow_back</span>
        </button>
        <div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Resumen de Orden</h2>
           <p className="text-sm text-gray-500 font-medium">Revisa los items antes de exportar</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-0 md:p-8">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 bg-gray-50/50">
                        <th className="py-4 pl-6 md:pl-4 font-black">Producto / SKU</th>
                        <th className="py-4 font-black text-center">Cantidad</th>
                        <th className="py-4 font-black text-right hidden md:table-cell">Precio Unit.</th>
                        <th className="py-4 pr-6 md:pr-4 font-black text-right">Total</th>
                        <th className="py-4 w-10"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {cart.map(item => (
                        <tr key={item.variant.sku} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 pl-6 md:pl-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 p-1 flex-shrink-0">
                                      <img src={item.variant.image} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                                   </div>
                                   <div>
                                      <div className="font-bold text-gray-900 text-sm md:text-base">{item.product.title}</div>
                                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-1">
                                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 font-mono font-bold tracking-wide">
                                              {item.variant.sku}
                                          </span>
                                          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{item.variant.option1}</span>
                                      </div>
                                   </div>
                                </div>
                            </td>
                            <td className="py-4 text-center">
                                <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg h-8 shadow-sm">
                                   <button onClick={() => onUpdateQuantity(item.variant.sku, item.quantity - 1)} className="px-2.5 h-full hover:bg-gray-50 text-gray-500 font-bold">-</button>
                                   <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                                   <button onClick={() => onUpdateQuantity(item.variant.sku, item.quantity + 1)} className="px-2.5 h-full hover:bg-gray-50 text-gray-500 font-bold">+</button>
                                </div>
                            </td>
                            <td className="py-4 text-right text-gray-600 font-medium hidden md:table-cell">
                                ${item.variant.price.toFixed(2)}
                            </td>
                            <td className="py-4 pr-6 md:pr-4 text-right font-black text-gray-900 text-sm md:text-base">
                                ${(item.variant.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="py-4 text-right pr-4">
                                <button 
                                    onClick={() => onRemove(item.variant.sku)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <span className="material-icons text-lg">delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="bg-gray-50 p-4 md:p-10 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-8">
                <div className="text-[10px] text-gray-400 max-w-xs leading-relaxed hidden md:block">
                    * Los precios y disponibilidad están sujetos a cambios. Esta proforma tiene una validez de 30 días a partir de la fecha de emisión.
                </div>
                <div className="w-full md:w-auto space-y-3">
                    <div className="flex justify-between md:justify-end gap-12 text-sm md:text-xs font-bold text-gray-500 uppercase tracking-wider">
                       <span>Subtotal</span>
                       <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between md:justify-end gap-12 text-sm md:text-xs font-bold text-gray-500 uppercase tracking-wider">
                       <span>ITBMS (7%)</span>
                       <span className="text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between md:justify-end gap-12 items-baseline">
                        <div className="text-gray-900 text-sm font-black uppercase tracking-widest">Total Final</div>
                        <div className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter">${total.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <button 
                    onClick={handleWhatsApp}
                    className="py-4 bg-white border border-gray-200 rounded-[20px] font-bold text-xs uppercase tracking-widest text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                    <span className="material-icons text-green-500">chat</span>
                    Confirmar WhatsApp
                </button>
                <button 
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPdf}
                    className="py-4 bg-black text-white rounded-[20px] font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                    {isGeneratingPdf ? <span className="material-icons animate-spin text-lg">refresh</span> : <span className="material-icons text-lg">picture_as_pdf</span>}
                    {isGeneratingPdf ? 'Generando...' : 'Exportar PDF Cubitt'}
                </button>
            </div>
        </div>
      </div>

      <PdfTemplate 
        user={user}
        cart={cart}
        orderId={orderId}
        date={new Date().toLocaleDateString('es-PA', { year: 'numeric', month: 'long', day: 'numeric' })}
        subtotal={subtotal}
        tax={tax}
        total={total}
        totalQuantity={totalQuantity}
      />

    </div>
  );
};

export default ReviewOrderView;
