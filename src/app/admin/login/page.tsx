"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Autenticação mock baseada em cookie para ativação do Middleware
    if (password === "uemg2024") {
      document.cookie = "admin_auth=true; path=/; max-age=3600";
      router.push("/admin/dashboard");
    } else {
      setError("Senha administrativa incorreta.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 font-sans">
      <div className="w-full max-w-sm p-10 bg-white rounded-[40px] shadow-2xl shadow-gray-200 border border-gray-100 flex flex-col gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        
        <header className="text-center flex flex-col gap-2">
          <div className="w-16 h-16 bg-gray-900 rounded-3xl mx-auto flex items-center justify-center rotate-3 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter italic mt-4">Admin Portal</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">Painel de Resultados</p>
        </header>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha Mestre</label>
            <input 
              type="password"
              placeholder="Digite a senha..."
              className="w-full px-6 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none transition-all text-sm font-medium shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          {error && <p className="text-[11px] text-red-500 font-black ml-1 uppercase">{error}</p>}
          
          <button 
            type="submit"
            className="w-full py-5 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 active:scale-95 text-xs uppercase tracking-widest"
          >
            ACESSAR DASHBOARD
          </button>
        </form>

        <footer className="text-center">
          <button 
            onClick={() => router.push('/')}
            className="text-[10px] text-gray-300 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest"
          >
            ← Voltar para a Simulação
          </button>
        </footer>
      </div>
    </div>
  );
}
