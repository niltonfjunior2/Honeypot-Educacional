import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("Iniciando setup de dados base...");

    // 1. Criar cursos (Se a tabela existir)
    const { error: cuError } = await supabase
      .from("cursos")
      .upsert([
        { id: 1, nome_curso: "Administração" },
        { id: 2, nome_curso: "Design de Produto" },
        { id: 3, nome_curso: "Direito" },
        { id: 4, nome_curso: "Engenharia de Computação" },
        { id: 5, nome_curso: "Medicina" },
        { id: 6, nome_curso: "Pedagogia" },
        { id: 7, nome_curso: "Psicologia" },
        { id: 8, nome_curso: "Sistemas de Informação" },
      ], { onConflict: "id" });

    // 2. Criar campanha inicial ativa
    const { error: cError } = await supabase
      .from("campanhas")
      .upsert([
        { id: 1, nome_campanha: "Wi-Fi Campus 5G", ativa: true }
      ], { onConflict: "id" });

    if (cError || cuError) {
      console.error("Setup Error:", cError?.message || cuError?.message);
      return NextResponse.json({ 
        error: "Falha ao popular tabelas. Certifique-se de que o schema SQL foi executado no Supabase.",
        details: cError?.message || cuError?.message
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Dados base (Cursos e Campanha 1) configurados com sucesso." });
  } catch (err) {
    return NextResponse.json({ error: "Erro interno no setup." }, { status: 500 });
  }
}
