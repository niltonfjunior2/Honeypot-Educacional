"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  nome: z.string().min(3, { message: "O nome completo é obrigatório." }),
  curso_id: z.string().min(1, { message: "Selecione o seu curso." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormularioIsca() {
  const [cursos, setCursos] = useState<{ id: string; nome: string }[]>([]);
  const [activeCampanhaId, setActiveCampanhaId] = useState("1");
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("/api/cursos");
        const json = await response.json();
        if (json.success) {
          setCursos(json.data);
          if (json.active_campanha_id) {
            console.log("[Honeypot] Campanha Ativa:", json.active_campanha_id);
            setActiveCampanhaId(json.active_campanha_id);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
      } finally {
        setLoadingCursos(false);
      }
    };
    fetchCursos();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    // LÓGICA DE DESCARTE (DNA Seção 2): 
    // O campo 'nome' é descartado aqui. Enviamos apenas o curso_id e campanha_id ativa.
    const payload = {
      curso_id: data.curso_id,
      campanha_id: activeCampanhaId,
      timestamp: new Date().toISOString(),
    };

    console.log("Submetendo dados anônimos:", payload);

    try {
      const response = await fetch("/api/submeter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Falha silenciosa para o usuário (DNA Seção 5.2)
        const errorText = await response.text();
        console.error("API Error Log:", errorText);
      }
    } catch (err) {
      console.error("Network/API Error:", err);
    } finally {
      // O redirecionamento inegociável para a página de confirmação
      router.push("/confirmacao");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
      <div className="space-y-xs">
        <label htmlFor="nome" className="font-label-bold text-label-bold text-blue-900 uppercase">Nome Completo</label>
        <input
          {...register("nome")}
          type="text"
          id="nome"

          className="w-full px-md py-sm border-2 border-blue-900 focus:ring-0 focus:border-secondary focus:shadow-[0_0_10px_rgba(255,223,0,0.5)] bg-surface-container-lowest font-body-md outline-none transition-all"
        />
        {errors.nome && <p className="text-error text-xs font-label-bold mt-1">{errors.nome.message}</p>}
      </div>

      <div className="space-y-xs mt-4">
        <label htmlFor="curso_id" className="font-label-bold text-label-bold text-blue-900 uppercase">Seu Curso</label>
        <div className="relative">
          <select
            {...register("curso_id")}
            id="curso_id"
            disabled={loadingCursos}
            className="w-full px-md py-sm border-2 border-blue-900 focus:ring-0 focus:border-secondary bg-surface-container-lowest font-body-md outline-none appearance-none cursor-pointer disabled:opacity-50"
          >
            <option value="">{loadingCursos ? "Carregando..." : "Selecione seu curso"}</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>{curso.nome}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-900">expand_more</span>
        </div>
        {errors.curso_id && <p className="text-error text-xs font-label-bold mt-1">{errors.curso_id.message}</p>}
      </div>

      <div className="pt-md mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-container text-blue-900 font-cta-label text-cta-label py-lg px-md uppercase italic border-2 border-blue-900 shadow-[4px_4px_0px_0px_rgba(0,110,39,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all flex items-center justify-center gap-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "ENVIANDO..." : "QUERO GANHAR AGORA!"}
          {!loading && <span className="material-symbols-outlined font-black">bolt</span>}
        </button>
      </div>
      <p className="text-center text-[12px] font-label-bold text-outline uppercase mt-md pb-4">
        Ao clicar, você concorda com o regulamento do sorteio.
      </p>
    </form>
  );
}
