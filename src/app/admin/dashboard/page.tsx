"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "insights" | "campanhas" | "cursos";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("insights");
  const [data, setData] = useState<any>(null);
  const [campanhas, setCampanhas] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States para novos itens
  const [novoCurso, setNovoCurso] = useState("");
  const [novaCampanha, setNovaCampanha] = useState({ nome: "", descricao: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resMetrics, resCampanhas, resCursos] = await Promise.all([
        fetch("/api/admin/metricas"),
        fetch("/api/admin/campanhas"),
        fetch("/api/cursos") // Reutilizando a API pública que já traz nome_curso
      ]);

      const [metrics, camps, cur] = await Promise.all([
        resMetrics.json(),
        resCampanhas.json(),
        resCursos.json()
      ]);

      setData(metrics);
      setCampanhas(camps.data || []);
      setCursos(cur.data || []);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = document.cookie.split('; ').find(row => row.startsWith('admin_auth='));
    if (!auth || auth.split('=')[1] !== 'true') {
      router.push("/admin/login");
      return;
    }
    fetchAll();
  }, [router]);

  // --- Handlers para Cursos ---
  const handleAddCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCurso.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/cursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_curso: novoCurso }),
      });
      if (res.ok) {
        setNovoCurso("");
        await fetchAll();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCurso = async (id: number) => {
    if (!confirm("Deseja realmente excluir este curso? Métricas vinculadas serão perdidas.")) return;
    await fetch(`/api/admin/cursos/${id}`, { method: "DELETE" });
    await fetchAll();
  };

  // --- Handlers para Campanhas ---
  const handleAddCampanha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaCampanha.nome.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/admin/campanhas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          nome_campanha: novaCampanha.nome, 
          descricao: novaCampanha.descricao,
          ativa: campanhas.length === 0 // Ativa se for a primeira
        }),
      });
      setNovaCampanha({ nome: "", descricao: "" });
      await fetchAll();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleCampanha = async (id: number, currentAtiva: boolean) => {
    if (currentAtiva) return; // Não pode desativar a única ativa sem ativar outra
    await fetch(`/api/admin/campanhas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nome_campanha: campanhas.find(c => c.id === id).nome_campanha,
        ativa: true 
      }),
    });
    await fetchAll();
  };

  const handleDeleteCampanha = async (id: number) => {
    if (!confirm("Excluir campanha? Isso removerá permanentemente as submissões desta campanha.")) return;
    await fetch(`/api/admin/campanhas/${id}`, { method: "DELETE" });
    await fetchAll();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Admin Hub</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Painel de Controle Institucional</p>
          </div>
          
          <nav className="flex bg-white p-1.5 rounded-3xl shadow-sm border border-slate-100">
            {(["insights", "campanhas", "cursos"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "insights" ? "Métricas" : tab}
              </button>
            ))}
          </nav>

          <button 
             onClick={() => { document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; router.push("/admin/login"); }}
             className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[9px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 hover:border-red-200 transition-all"
           >
             Sair
           </button>
        </div>

        {/* Tab Content: Insights */}
        {activeTab === "insights" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8">
            <header className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[48px] shadow-2xl shadow-slate-200/50 border border-white">
              <div className="flex flex-col justify-center gap-2">
                <span className="text-[9px] font-black text-primary-500 uppercase tracking-[0.3em]">Campanha em Vigor</span>
                <h2 className="text-4xl font-black text-slate-900 leading-none">{data?.campanha}</h2>
              </div>
              <div className="bg-slate-900 p-8 rounded-[40px] text-white flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Total de Capturas</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tabular-nums tracking-tighter">{data?.totalGeral}</span>
                  <span className="text-[10px] font-bold text-primary-400 uppercase">Engajamentos</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.metricas.map((m: any, idx: number) => (
                <div key={m.id} className="bg-white p-8 rounded-[40px] border border-white shadow-xl shadow-slate-100 flex flex-col gap-6 group hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black text-primary-500 uppercase tracking-widest">Rank #{idx + 1}</span>
                      <h3 className="text-xl font-black text-slate-800 tracking-tight">{m.nome}</h3>
                    </div>
                    <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                      <span className="text-xl font-black text-slate-900 tabular-nums">{m.cliques}</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden p-1">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(m.cliques / (data.totalGeral || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Campanhas */}
        {activeTab === "campanhas" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8">
            <section className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-6">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Nova Campanha</h3>
               <form onSubmit={handleAddCampanha} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <input 
                   placeholder="Título (Ex: Wi-Fi 5G Campus)" 
                   className="bg-slate-50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium"
                   value={novaCampanha.nome}
                   onChange={e => setNovaCampanha({...novaCampanha, nome: e.target.value})}
                 />
                 <input 
                   placeholder="Descrição curta" 
                   className="bg-slate-50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium col-span-1"
                   value={novaCampanha.descricao}
                   onChange={e => setNovaCampanha({...novaCampanha, descricao: e.target.value})}
                 />
                 <button className="bg-primary-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-primary-700 transition-all">Criar Campanha</button>
               </form>
            </section>

            <div className="grid grid-cols-1 gap-4">
              {campanhas.map((c) => (
                <div key={c.id} className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between group transition-all hover:bg-slate-50">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-black text-slate-900 uppercase tracking-tight">{c.nome_campanha}</h4>
                      {c.ativa ? (
                        <span className="bg-green-100 text-green-700 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Ativa</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-400 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Inativa</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">{c.descricao || "Sem descrição"}</p>
                  </div>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!c.ativa && (
                      <button 
                        onClick={() => handleToggleCampanha(c.id, c.ativa)}
                        className="text-[9px] font-black text-primary-600 uppercase tracking-widest hover:underline"
                      >
                        Ativar
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteCampanha(c.id)}
                      className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Cursos */}
        {activeTab === "cursos" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8">
            <section className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-6">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Adicionar Curso</h3>
               <form onSubmit={handleAddCurso} className="flex gap-4">
                 <input 
                   placeholder="Nome do Novo Curso" 
                   className="flex-1 bg-slate-50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium"
                   value={novoCurso}
                   onChange={e => setNovoCurso(e.target.value)}
                 />
                 <button className="bg-slate-900 text-white px-8 py-4 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black transition-all">Cadastrar</button>
               </form>
            </section>

            <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden">
               <div className="grid grid-cols-1 divide-y divide-slate-50">
                 {cursos.map((curso) => (
                   <div key={curso.id} className="p-6 flex items-center justify-between group hover:bg-slate-50 transition-all">
                     <span className="font-bold text-slate-800 text-sm">{curso.nome}</span>
                     <button 
                        onClick={() => handleDeleteCurso(Number(curso.id))}
                        className="opacity-0 group-hover:opacity-100 text-[9px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                     >
                       Remover
                     </button>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
