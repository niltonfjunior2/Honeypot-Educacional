import FeedbackCard from "@/components/FeedbackCard";
import Link from "next/link";

export default function ConscientizacaoPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start py-8 px-6 bg-[#f8fafc] animate-in fade-in duration-1000">
      
      {/* Banner de Impacto */}
      <div className="w-full max-w-sm mb-10 overflow-hidden rounded-[40px] bg-primary-600 p-8 text-white shadow-2xl shadow-primary-200 relative border-b-8 border-primary-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-2">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter leading-tight italic">Isto foi uma simulação acadêmica.</h1>
          <p className="text-primary-100 text-sm font-medium leading-relaxed opacity-90">
            Você acaba de participar de um experimento de conscientização sobre ataques de Phishing na UEMG.
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        
        {/* Seção Explicativa */}
        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Fique tranquilo(a)! 🛡️</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            O objetivo não é capturar seus dados, mas ensinar você a protegê-los. 
            Nenhum dado sensível (**nome ou senha**) foi armazenado neste teste. Coletamos estatísticas anônimas para pesquisa.
          </p>
        </section>

        {/* Dicas de Segurança */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Como identificar o perigo?</h2>
          
          <FeedbackCard 
            titulo="Urgência Artificiais"
            descricao="Cuidado com mensagens que exigem ação rápida (ex: 'Libere seu Wi-Fi agora' ou 'Conta expira em 10min')."
            icone={<svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          />
          
          <FeedbackCard 
            titulo="Links Desconhecidos"
            descricao="Sempre verifique o domínio. Um portal oficial da UEMG nunca usará links encurtados ou domínios genéricos."
            icone={<svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101"></path></svg>}
          />
          
          <FeedbackCard 
            titulo="Solicitação de Dados"
            descricao="Serviços oficiais raramente pedem Nome Completo em formulários de login rápido se você já é aluno."
            icone={<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>}
          />
        </section>

        {/* Call to Action Final */}
        <Link 
          href="/"
          className="w-full py-4 text-center bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 active:scale-95 mt-4"
        >
          ENTENDI, VOU FICAR ATENTO(A)
        </Link>

        <footer className="text-center py-6 mt-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
            Projeto de Extensão Acadêmica • UEMG<br/>
            Segurança da Informação e Privacidade
          </p>
        </footer>
      </div>
    </main>
  );
}
