
import React, { useState } from 'react';
import { User, Order } from '../types';
import PdfTemplate from './PdfTemplate';

interface AccountViewProps {
  user: User;
  onBack: () => void;
  orders: Order[];
  onDeleteOrder: (id: string) => void;
}

const AccountView: React.FC<AccountViewProps> = ({ user, onBack, orders, onDeleteOrder }) => {
  const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(null);

  const handleDownloadPDF = async (order: Order) => {
    setDownloadingOrderId(order.id);
    
    // Allow React to render the PdfTemplate with the selected order
    setTimeout(async () => {
      try {
        const element = document.getElementById('proforma-invoice-content');
        if (!element) throw new Error('No se encontró el contenido para generar el PDF');

        // @ts-ignore
        const html2pdf = window.html2pdf;
        if (typeof html2pdf !== 'function') throw new Error('Librería PDF no cargada');
        
        const clientName = user?.companyName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Cliente';
        
        const opt = {
          margin:       0.3, 
          filename:     `${clientName}_PF_${order.id}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error(error);
        alert('Error generando PDF. Intente nuevamente.');
      } finally {
        setDownloadingOrderId(null);
      }
    }, 100);
  };

  const downloadingOrder = orders.find(o => o.id === downloadingOrderId);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-8 animate-in fade-in zoom-in-95 duration-500 pb-24">
      <nav className="mb-4 md:mb-6">
        <button onClick={onBack} className="flex items-center text-[10px] font-black text-[#86868B] uppercase tracking-[0.4em] hover:text-black transition-all group">
          <span className="material-icons text-lg mr-3 group-hover:-translate-x-1 transition-transform">arrow_back</span> Back to Dashboard
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-black/5">
                <div className="bg-[#F5F5F7] p-10 border-b border-black/5 flex flex-col items-center text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-1 shadow-lg mb-6">
                        <img 
                        src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80"} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-xl md:text-2xl font-black text-black tracking-tight mb-2">{user.companyName}</h1>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest truncate max-w-[200px]">{user.email}</p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                        <span className="material-icons text-sm">verified</span>
                        Partner
                    </div>
                </div>
                <div className="p-8">
                    <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Detalles</h3>
                    <div className="space-y-4 text-xs md:text-sm">
                        <div className="flex justify-between border-b border-black/5 pb-2">
                            <span className="text-gray-500">ID Cliente</span>
                            <span className="font-bold text-black font-mono">{user.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-black/5 pb-2">
                             <span className="text-gray-500">Plan</span>
                             <span className="font-bold text-black">Wholesale T1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-8">
            <div className="bg-white rounded-[40px] shadow-xl border border-black/5 p-6 md:p-10 min-h-[500px]">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">Historial de Pedidos</h2>
                    <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">{orders.length}</span>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center opacity-50">
                        <span className="material-icons text-6xl mb-4 text-gray-300">history</span>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No hay pedidos registrados</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const totalItems = order.items.reduce((acc, curr) => acc + curr.quantity, 0);
                            const isPaid = order.status === 'Paid';
                            const isDownloading = downloadingOrderId === order.id;

                            return (
                                <div key={order.id} className="group bg-[#F5F5F7] rounded-[24px] p-5 md:p-6 transition-all hover:bg-[#EAEAEA] border border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${isPaid ? 'bg-black' : 'bg-gray-400'}`}>
                                            <span className="material-icons">{isPaid ? 'check_circle' : 'pending'}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-sm md:text-base font-black text-black tracking-tight">{order.id}</span>
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="text-[10px] md:text-xs text-gray-500 font-medium">
                                                {order.date} • {totalItems} Unidades
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6 border-t md:border-t-0 border-black/5 pt-4 md:pt-0">
                                        <div className="text-right">
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total</div>
                                            <div className="text-lg md:text-xl font-black text-black">${order.total.toFixed(2)}</div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleDownloadPDF(order)}
                                                disabled={isDownloading}
                                                className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-sm disabled:opacity-50"
                                                title="Descargar PDF"
                                            >
                                                {isDownloading ? (
                                                    <span className="material-icons text-lg animate-spin">refresh</span>
                                                ) : (
                                                    <span className="material-icons text-lg">picture_as_pdf</span>
                                                )}
                                            </button>
                                            
                                            {/* Solo permitir borrar si el estado es 'Paid' */}
                                            {isPaid ? (
                                                <button 
                                                    onClick={() => {
                                                        if(window.confirm('¿Eliminar este pedido pagado del historial?')) onDeleteOrder(order.id);
                                                    }}
                                                    className="w-10 h-10 rounded-xl bg-white border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                                                    title="Eliminar Pedido"
                                                >
                                                    <span className="material-icons text-lg">delete</span>
                                                </button>
                                            ) : (
                                                <div className="w-10 h-10 flex items-center justify-center opacity-20 cursor-not-allowed" title="Pedido pendiente no se puede eliminar">
                                                    <span className="material-icons text-lg text-gray-400">lock</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>

      </div>

      {downloadingOrder && (
        <PdfTemplate 
          user={user}
          cart={downloadingOrder.items}
          orderId={downloadingOrder.id.replace('ORD-', '')}
          date={downloadingOrder.date}
          subtotal={downloadingOrder.subtotal}
          tax={downloadingOrder.tax}
          total={downloadingOrder.total}
          totalQuantity={downloadingOrder.items.reduce((acc, curr) => acc + curr.quantity, 0)}
        />
      )}
    </div>
  );
};

export default AccountView;
