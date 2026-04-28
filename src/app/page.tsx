import FormularioIsca from "@/components/FormularioIsca";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  return (
    <div className="bg-primary-container min-h-screen font-body-md text-on-background selection:bg-secondary selection:text-white pb-20">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-yellow-400 dark:bg-yellow-500 border-b-4 border-green-700 shadow-[0px_4px_0px_0px_rgba(0,103,56,1)]">
        <div className="flex items-center gap-3">
          <h1 className="font-headline-md font-black italic uppercase tracking-tighter text-xl text-blue-900 dark:text-blue-950">UEMG RUMO AO HEXA</h1>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </header>

      <main className="pt-16 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary diagonal-bg py-lg md:py-xl px-4">
          <div className="absolute inset-0 mesh-texture"></div>
          <div className="max-w-container-max mx-auto grid md:grid-cols-2 items-center gap-lg relative z-10">
            <div className="text-center md:text-left order-2 md:order-1">
              <div className="inline-block bg-primary-fixed text-on-primary-fixed px-sm py-xs mb-sm font-label-bold text-label-bold uppercase transform -skew-x-12">
                SORTEIO OFICIAL
              </div>
              <h2 className="font-headline-lg text-headline-lg text-white mb-md uppercase leading-none italic">
                GANHE A CAMISA <span className="text-primary-fixed">DO HEXA!</span>
              </h2>
              <p className="font-body-lg text-body-lg text-secondary-container mb-lg max-w-md">
                Exclusivo para estudantes da UEMG. Participe agora e vista as cores da nossa seleção!
              </p>
              <div className="flex items-center gap-md justify-center md:justify-start">
                <CountdownTimer />
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center relative">
              <div className="absolute -inset-4 bg-primary-fixed/20 blur-3xl rounded-full"></div>
              <img alt="Camisa do Brasil" className="w-full max-w-md drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500" src="/images/jersey-yellow-P0-fBirW.webp" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-2xl mx-auto px-gutter -mt-8 relative z-20">
          <div className="bg-white rounded-xl shadow-[8px_8px_0px_0px_rgba(0,110,39,1)] border-2 border-blue-900 p-lg">
            <div className="mb-lg text-center">
              <span className="material-symbols-outlined text-4xl text-secondary mb-xs">stadium</span>
              <h3 className="font-headline-md text-headline-md text-blue-900 uppercase">Participe do Sorteio</h3>
              <p className="font-body-md text-outline">Preencha os dados abaixo para garantir sua sorte.</p>
            </div>
            <FormularioIsca />
          </div>
        </section>

        {/* Bento Features */}
        <section className="max-w-container-max mx-auto px-gutter py-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="bg-tertiary-container p-lg border-2 border-tertiary rounded-xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-9xl">verified</span>
              </div>
              <h4 className="font-headline-md text-2xl text-on-tertiary-container mb-xs uppercase">Original</h4>
              <p className="font-body-md text-on-tertiary-container/80">Produto oficial licenciado com selo de autenticidade.</p>
            </div>
            <div className="bg-secondary-container p-lg border-2 border-secondary rounded-xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-9xl">local_shipping</span>
              </div>
              <h4 className="font-headline-md text-2xl text-on-secondary-container mb-xs uppercase">Entrega Grátis</h4>
              <p className="font-body-md text-on-secondary-container/80">Entregamos diretamente no seu campus da UEMG.</p>
            </div>
            <div className="bg-primary-fixed p-lg border-2 border-primary rounded-xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-9xl">diversity_3</span>
              </div>
              <h4 className="font-headline-md text-2xl text-on-primary-fixed mb-xs uppercase">Comunidade</h4>
              <p className="font-body-md text-on-primary-fixed/80">Fortaleça a união entre os estudantes da nossa universidade.</p>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-white dark:bg-zinc-900 rounded-t-lg border-t-2 border-blue-900 shadow-[0px_-4px_0px_0px_rgba(255,223,0,1)]">
        <a className="flex flex-col items-center justify-center bg-yellow-400 text-blue-900 rounded-md p-1 border-b-4 border-green-700 active:scale-95 duration-100 transition-all" href="#">
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
