
import React, { useState, useEffect } from 'react';
import { User, Product } from '../types';
import { fetchClientPriceType, fetchRawProducts, processRawRows } from '../services/dataService';

interface LoginProps {
  onLogin: (user: User, products: Product[]) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawProducts, setRawProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRawProducts();
        setRawProducts(data);
      } catch (err: any) {
        console.error("Error loading products:", err);
        setError("Error al cargar el catálogo inicial. Por favor recargue la página.");
      } finally {
        setInitialLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      alert('Por favor ingrese el nombre de la empresa.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Obtener tipo de precio
      const priceType = await fetchClientPriceType(companyName);
      console.log(`Cliente: ${companyName}, Tipo de precio: ${priceType || 'Default'}`);

      // 2. Procesar productos con el tipo de precio
      const products = processRawRows(rawProducts, priceType || undefined);

      if (products.length === 0) {
        throw new Error('No se encontraron productos disponibles.');
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
      }, products);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al procesar los datos.');
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
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Portal de Ventas</p>
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
              disabled={loading || initialLoading}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div className="pt-4">
             <button 
                type="submit"
                disabled={!companyName || loading || initialLoading}
                className="w-full bg-black text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
             >
                {initialLoading ? (
                  <>
                    <span className="material-icons animate-spin text-sm">refresh</span>
                    <span>Iniciando Sistema...</span>
                  </>
                ) : loading ? (
                  <>
                    <span className="material-icons animate-spin text-sm">refresh</span>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <span>Ingresar</span>
                )}
             </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-[8px] text-gray-300 font-medium uppercase tracking-widest">Powered by Supabase</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
