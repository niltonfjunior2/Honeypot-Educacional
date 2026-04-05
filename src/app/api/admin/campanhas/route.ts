import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import * as z from "zod";
import { revalidatePath } from "next/cache";

const campanhaSchema = z.object({
  nome_campanha: z.string().min(3, "O nome da campanha deve ter pelo menos 3 caracteres.").max(100),
  descricao: z.string().optional(),
  ativa: z.boolean().default(false),
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("campanhas")
      .select("*")
      .order("data_inicio", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (err) {
    console.error("Campanhas List Error:", err);
    return NextResponse.json({ error: "Falha ao listar campanhas." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = campanhaSchema.parse(body);

    // Regra de Negócio: Se a nova for ativa, desativa todas as outras
    if (validatedData.ativa) {
        await supabase
          .from("campanhas")
          .update({ ativa: false })
          .neq("id", 0); // Seleciona todas
    }

    const { data, error } = await supabase
      .from("campanhas")
      .insert({
        nome_campanha: validatedData.nome_campanha,
        descricao: validatedData.descricao,
        ativa: validatedData.ativa
      })
      .select()
      .single();

    if (error) {
      console.error("[API Campanhas] Erro ao inserir:", error);
      throw error;
    }
    
    // Forçar limpeza de cache
    revalidatePath("/admin/dashboard");
    revalidatePath("/api/admin/campanhas");
    revalidatePath("/api/admin/metricas");

    console.log("[API Campanhas] Criada com sucesso:", data.id);
    return NextResponse.json({ success: true, data }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    console.error("[API Campanhas] Erro FATAL:", err);
    return NextResponse.json({ error: "Falha ao criar campanha." }, { status: 500 });
  }
}
