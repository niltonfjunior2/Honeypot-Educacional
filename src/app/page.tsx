import FormularioIsca from "@/components/FormularioIsca";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start py-12 px-6 bg-[#f8fafc] overflow-x-hidden animate-in fade-in duration-700">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="z-10 w-full max-w-sm flex flex-col items-center gap-10">
        {/* Header Institucional Simulado */}
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-1 bg-primary-600 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              UEMG <span className="text-primary-600">Digital</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Sistemas de Conectividade</p>
          </div>
        </header>

        {/* O Formulário Isca */}
        <FormularioIsca />

        {/* Footer com Aviso Legal Simulado */}
        <footer className="text-center space-y-4 px-4 pb-8">
          <p className="text-[11px] text-gray-400 leading-relaxed max-w-[280px]">
            Ao clicar em autenticar, você concorda com os termos de uso da rede acadêmica institucional. 
            O acesso é monitorado pela Gerência de TI.
          </p>
          <div className="flex items-center justify-center gap-4 border-t border-gray-200 pt-4">
            <div className="w-6 h-6 grayscale opacity-30 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 grayscale opacity-30 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 grayscale opacity-30 bg-gray-300 rounded"></div>
          </div>
        </footer>
      </div>
    </main>
  );
}
