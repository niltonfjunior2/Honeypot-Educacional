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

    // Busca em tempo real (Revalidação via headers)
    const { data: campanha, error: campError } = await supabase
      .from("campanhas")
      .select("id, nome_campanha, ativa")
      .eq("ativa", true)
      .maybeSingle(); 

    if (campError) {
      console.error("Cursos API Error:", campError.message);
    }

    return NextResponse.json({ 
      success: true, 
      data: cursos.map(c => ({ id: c.id.toString(), nome: c.nome_curso })),
      active_campanha_id: campanha?.id?.toString() || "0"
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (err) {
    console.error("Public API Cursos Error:", err);
    return NextResponse.json({ error: "Erro ao listar cursos." }, { status: 500 });
  }
}
