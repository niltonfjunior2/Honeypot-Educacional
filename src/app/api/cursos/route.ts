import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: cursos, error } = await supabase
      .from("cursos")
      .select("id, nome_curso")
      .order("nome_curso", { ascending: true });

    if (error) throw error;

    // Buscar ID da campanha ativa para o formulário
    const { data: campanha } = await supabase
      .from("campanhas")
      .select("id")
      .eq("ativa", true)
      .single();

    return NextResponse.json({ 
      success: true, 
      data: cursos.map(c => ({ id: c.id.toString(), nome: c.nome_curso })),
      active_campanha_id: campanha?.id?.toString() || "0"
    });
  } catch (err) {
    console.error("Public API Cursos Error:", err);
    return NextResponse.json({ error: "Erro ao listar cursos." }, { status: 500 });
  }
}
