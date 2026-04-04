import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Buscar todas as submissões e cursos
    const { data: submissoes, error: subError } = await supabase
      .from("submissoes")
      .select("curso_id");

    if (subError) throw subError;

    const { data: cursos, error: curError } = await supabase
      .from("cursos")
      .select("id, nome_curso");

    if (curError) throw curError;

    // 2. Buscar a campanha ativa
    const { data: campanhaAtiva } = await supabase
      .from("campanhas")
      .select("nome_campanha")
      .eq("ativa", true)
      .single();

    // 3. Agregação manual das métricas por curso
    const stats = cursos.map(curso => ({
      id: curso.id,
      nome: curso.nome_curso,
      cliques: submissoes?.filter(s => s.curso_id === curso.id).length || 0
    })).sort((a, b) => b.cliques - a.cliques);

    return NextResponse.json({
      success: true,
      campanha: campanhaAtiva?.nome_campanha || "Nenhuma campanha ativa",
      totalGeral: submissoes?.length || 0,
      metricas: stats
    });
  } catch (err) {
    console.error("Admin API Error:", err);
    return NextResponse.json({ error: "Falha ao processar métricas agregadas." }, { status: 500 });
  }
}
