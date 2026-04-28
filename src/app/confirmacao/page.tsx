import Link from "next/link";
import ShareCard from "@/components/ShareCard";

export default function Confirmacao() {
  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-blue-950 border-b-4 border-green-700 shadow-[0px_4px_0px_0px_rgba(0,103,56,1)]">
        <div className="flex items-center gap-3">
          <h1 className="font-['Lexend'] font-black italic uppercase tracking-tighter text-xl text-blue-900 dark:text-blue-950">UEMG RUMO AO HEXA</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* O ícone foi removido conforme ajuste anterior */}
        </div>
      </header>

      <main className="pt-24 pb-12 min-h-screen flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full max-w-container-max mx-auto px-gutter mb-lg">
          <div className="relative overflow-visible bg-secondary p-base rounded-xl shadow-[8px_8px_0px_0px_rgba(0,33,7,1)]">
            <div className="absolute inset-0 mesh-texture"></div>
            <div className="relative flex flex-col md:flex-row items-center gap-lg py-lg px-md z-10">
              <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
                <div className="inline-block bg-primary-container text-on-primary-container font-label-bold text-label-bold px-sm py-xs mb-md border-b-4 border-green-900">
                  CONFIRMADO!
                </div>
                <h2 className="font-display-xl text-headline-lg md:text-display-xl text-white italic uppercase mb-sm leading-none drop-shadow-md">
                  VOCÊ ESTÁ NA DISPUTA!
                </h2>
                <p className="font-headline-md text-primary-fixed text-headline-md italic mb-md">
                  Agora é só torcer! O manto sagrado pode ser seu.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative order-1 md:order-2 flex justify-center">
                {/* Floating Jersey Graphic */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 bg-primary-fixed rounded-full blur-[100px] opacity-40 animate-pulse scale-110"></div>
                  <img className="relative z-10 w-full h-full object-contain drop-shadow-[0px_20px_30px_rgba(0,0,0,0.3)]" alt="Camisa Oficial do Brasil" src="/images/jersey-yellow-P0-fBirW.webp" />

                  {/* Enhanced Festive Elements */}
                  <span className="material-symbols-outlined absolute -top-4 -left-4 text-yellow-400 text-5xl animate-bounce">celebration</span>
                  <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white text-4xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  <span className="material-symbols-outlined absolute top-1/4 -right-8 text-yellow-200 text-3xl animate-spin" style={{ animationDuration: '3s' }}>auto_awesome</span>
                  <span className="material-symbols-outlined absolute -top-8 right-1/4 text-white text-2xl animate-ping">flare</span>
                  <span className="material-symbols-outlined absolute bottom-1/4 -left-8 text-yellow-400 text-3xl animate-pulse">workspace_premium</span>
                  <span className="material-symbols-outlined absolute top-0 right-0 text-yellow-300 text-4xl opacity-50">Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Message Body */}
        <section className="w-full max-w-4xl mx-auto px-gutter text-center space-y-md">
          <div className="bg-white border-4 border-blue-900 p-lg shadow-[12px_12px_0px_0px_rgba(255,226,67,1)]">
            <p className="font-body-lg text-body-lg text-on-surface mb-md">
              Parabéns por se cadastrar. Sua participação foi confirmada com sucesso. Aguarde a divulgação do resultado nos murais da UEMG!
            </p>
            {/* Match Timeline Stepper Mock */}
            <div className="flex items-center justify-center gap-base py-sm mb-lg">
              <div className="h-3 w-3 rounded-full bg-secondary"></div>
              <div className="h-1 w-12 bg-secondary"></div>
              <div className="h-3 w-3 rounded-full bg-secondary"></div>
              <div className="h-1 w-12 bg-secondary"></div>
              <div className="h-6 w-6 rounded-full bg-yellow-400 border-2 border-blue-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-xs text-blue-900 font-bold">check</span>
              </div>
            </div>
            {/* Lucky Number */}
            <div className="bg-primary-fixed w-full p-6 rounded-lg border-2 border-primary mb-8 transform -skew-x-2 shadow-sm">
              <p className="font-label-bold text-on-primary-fixed uppercase mb-2">Seu Número da Sorte</p>
              <p className="font-headline-lg text-5xl text-blue-900 tracking-widest font-black">{Math.floor(Math.random() * 900) + 100}-UEMG</p>
            </div>
          </div>
        </section>

        {/* Secondary Info Cards (Bento Style) */}
        <section className="w-full max-w-container-max mx-auto px-gutter mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          <ShareCard />
          <div className="bg-primary-container border-2 border-blue-900 p-md flex flex-col gap-sm">
            <span className="material-symbols-outlined text-blue-900 text-4xl">calendar_month</span>
            <h4 className="font-headline-md text-headline-md uppercase italic text-blue-900">Grande Sorteio</h4>
            <p className="font-body-md text-body-md">O anúncio do vencedor será realizado ao vivo em nossas redes sociais em breve.</p>
          </div>
        </section>
      </main>

      {/* Footer Decoration */}
      <footer className="w-full mt-xl py-lg bg-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
        <div className="relative z-10">
          <p className="font-label-bold text-label-bold opacity-70 mb-xs">UEMG - UNIVERSIDADE DO ESTADO DE MINAS GERAIS</p>
          <p className="font-label-bold text-label-bold tracking-widest">© 2024 TODOS OS DIREITOS RESERVADOS</p>
        </div>
      </footer>
      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-white dark:bg-zinc-900 rounded-t-lg border-t-2 border-blue-900 shadow-[0px_-4px_0px_0px_rgba(255,223,0,1)]">
        <a className="flex flex-col items-center justify-center bg-yellow-400 text-blue-900 rounded-md p-1 border-b-4 border-green-700 active:scale-95 duration-100 transition-all" href="/">
          <span className="material-symbols-outlined">workspace_premium</span>
          <span className="font-headline-md font-extrabold uppercase text-[10px]">PARTICIPE</span>
        </a>
        <a className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 duration-100 transition-all" href="https://www.fifa.com/pt/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">public</span>
          <span className="font-headline-md font-extrabold uppercase text-[10px]">COPA 2026</span>
        </a>
      </nav>
    </div>
  );
}
