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

const CURSOS_UEMG = [
  { id: "1", nome: "Administração" },
  { id: "2", nome: "Design de Produto" },
  { id: "3", nome: "Direito" },
  { id: "4", nome: "Engenharia de Computação" },
  { id: "5", nome: "Medicina" },
  { id: "6", nome: "Pedagogia" },
  { id: "7", nome: "Psicologia" },
  { id: "8", nome: "Sistemas de Informação" },
];

export default function FormularioIsca() {
  const [cursos, setCursos] = useState<{ id: string; nome: string }[]>([]);
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
    // O campo 'nome' é descartado aqui. Enviamos apenas o curso_id.
    const payload = {
      curso_id: data.curso_id,
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
      // O redirecionamento inegociável para a página de conscientização
      router.push("/conscientizacao");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.9 9.9 0 0114.142 0M1.05 10.95A15.91 15.91 0 0112 7c4.418 0 8.418 1.791 11.3 4.688"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Portal de Conexão</h2>
        <p className="text-gray-500 text-sm mt-1">Valide sua matrícula para acessar o Wi-Fi 5G-Campus</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="nome" className="block text-sm font-bold text-gray-700 ml-1">Nome Completo</label>
          <input
            {...register("nome")}
            type="text"
            id="nome"
            placeholder="Digite como no sistema acadêmico"
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-900 bg-gray-50 placeholder:text-gray-400"
          />
          {errors.nome && <p className="text-red-500 text-xs mt-1 font-semibold ml-1">{errors.nome.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="curso_id" className="block text-sm font-bold text-gray-700 ml-1">Seu Curso</label>
          <div className="relative">
            <select
              {...register("curso_id")}
              id="curso_id"
              disabled={loadingCursos}
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-900 bg-gray-50 appearance-none disabled:opacity-50"
            >
              <option value="">{loadingCursos ? "Carregando cursos..." : "Selecione sua graduação"}</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>{curso.nome}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          {errors.curso_id && <p className="text-red-500 text-xs mt-1 font-semibold ml-1">{errors.curso_id.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-extrabold rounded-xl shadow-lg shadow-primary-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
        >
          {loading ? (
            <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "LIBERAR ACESSO"
          )}
        </button>

        <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-gray-50">
          <div className="flex items-center gap-2 opacity-40">
            <div className="w-8 h-8 rounded-md bg-gray-200"></div>
            <div className="w-24 h-3 bg-gray-200 rounded"></div>
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Autenticação centralizada institucional</p>
        </div>
      </form>
    </div>
  );
}
