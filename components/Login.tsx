
import React, { useState } from 'react';
import { User, Product } from '../types';
import { fetchProductsFromSupabase } from '../services/dataService';

interface LoginProps {
  onLogin: (user: User, products: Product[]) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      alert('Por favor ingrese el nombre de la empresa.');
      return;
    }

    setLoading(true);
    try {
      const products = await fetchProductsFromSupabase(companyName);
      
      // FILTRO CRÍTICO: Solo productos con stock > 0
      const availableProducts = products.filter(p => !p.isOutOfStock);

      if (availableProducts.length === 0) {
        throw new Error('No se encontraron productos con inventario disponible.');
      }

      // Generar avatar con iniciales usando UI Avatars (Estilo minimalista blanco y negro)
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=000000&color=ffffff&bold=true&length=2&size=128`;

      onLogin({
        id: `CUST-${Date.now().toString().slice(-4)}`,
        companyName: companyName,
        email: 'contacto@cliente.com', // Default placeholder
        taxId: '', // Optional now
        authorized: true,
        contractUpdateDate: new Date().toLocaleDateString('es-PA'),
        avatar: avatarUrl
      }, availableProducts);
    } catch (err: any) {
      console.error(err);
      alert(`Error al cargar catálogo: ${err.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl w-full max-w-[450px] border border-black/5 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-10 text-center">
          <div className="bg-black text-white w-14 h-14 rounded-[18px] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="material-icons text-2xl">layers</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-black">Cubitt B2B</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Portal Corporativo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-2">Nombre de la Empresa</label>
            <input 
              className="w-full bg-[#F5F5F7] border-none rounded-xl py-4 px-5 text-sm font-medium text-black focus:ring-2 focus:ring-black/5 placeholder-gray-400 transition-all" 
              placeholder="Ej. Fit Solution S.A." 
              required 
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
            />
          </div>

          <div className="pt-4">
             <button 
                type="submit"
                disabled={!companyName || loading}
                className="w-full bg-black text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
             >
                {loading && <span className="material-icons animate-spin text-sm">refresh</span>}
                {loading ? 'Cargando Catálogo...' : 'Ingresar'}
             </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-[8px] text-gray-300 font-medium uppercase tracking-widest">Acceso exclusivo para distribuidores autorizados</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
