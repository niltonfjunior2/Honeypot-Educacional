import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  // Forçar o Next.js a ignorar qualquer cache de pré-renderização (Rebuild sob demanda)
  headers(); 
  
  try {
    // 1. Buscar a campanha ativa
    const { data: campanhaAtiva, error: campError } = await supabase
      .from("campanhas")
      .select("id, nome_campanha")
      .eq("ativa", true)
      .maybeSingle();

    if (campError) throw campError;

    if (!campanhaAtiva) {
      return NextResponse.json({
        success: true,
        campanha: "Nenhuma campanha ativa",
        totalGeral: 0,
        metricas: []
      });
    }

    // 2. Buscar submissões APENAS da campanha ativa
    const { data: submissoes, error: subError } = await supabase
      .from("submissoes")
      .select("curso_id")
      .eq("campanha_id", campanhaAtiva.id);

    if (subError) throw subError;

    // 3. Buscar nomes dos cursos
    const { data: cursos, error: curError } = await supabase
      .from("cursos")
      .select("id, nome_curso");

    if (curError) throw curError;

    // 4. Agregação manual das métricas por curso
    const stats = cursos.map(curso => ({
      id: curso.id,
      nome: curso.nome_curso,
      cliques: submissoes?.filter(s => Number(s.curso_id) === Number(curso.id)).length || 0
    })).sort((a, b) => b.cliques - a.cliques);

    return NextResponse.json({
      success: true,
      campanha: campanhaAtiva.nome_campanha,
      totalGeral: submissoes?.length || 0,
      metricas: stats
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (err) {
    console.error("Admin API Error:", err);
    return NextResponse.json({ error: "Falha ao processar métricas agregadas." }, { status: 500 });
  }
}
