"use client";

export default function ShareCard() {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "UEMG - Rumo ao Hexa",
          text: "Participe do sorteio da camisa oficial da seleção brasileira!",
          url: "https://honeypot-educacional.vercel.app/",
        });
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      try {
        await navigator.clipboard.writeText("https://honeypot-educacional.vercel.app/");
        alert("Link copiado para a área de transferência!");
      } catch (err) {
        console.error("Erro ao copiar para a área de transferência", err);
      }
    }
  };

  return (
    <div 
      onClick={handleShare}
      className="bg-secondary text-white p-md flex flex-col gap-sm relative overflow-hidden cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all group"
    >
      <div className="absolute inset-0 mesh-texture opacity-20"></div>
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-9xl">share</span>
      </div>
      <span className="material-symbols-outlined text-primary-fixed text-4xl relative z-10">share</span>
      <h4 className="font-headline-md text-headline-md uppercase italic relative z-10">Convide Amigos</h4>
      <p className="font-body-md text-body-md relative z-10">Compartilhe e ganhe chances extras para cada amigo que se inscrever!</p>
    </div>
  );
}
