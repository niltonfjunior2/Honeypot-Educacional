import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import * as z from "zod";

const campanhaSchema = z.object({
  nome_campanha: z.string().min(3, "O nome da campanha deve ter pelo menos 3 caracteres.").max(100),
  descricao: z.string().optional(),
  ativa: z.boolean().default(false),
});

export const dynamic = "force-dynamic";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validatedData = campanhaSchema.parse(body);

    // Se estiver ativando esta campanha, desativa todas as outras
    if (validatedData.ativa) {
        await supabase
          .from("campanhas")
          .update({ ativa: false })
          .neq("id", params.id);
    }

    const { data, error } = await supabase
      .from("campanhas")
      .update({
        nome_campanha: validatedData.nome_campanha,
        descricao: validatedData.descricao,
        ativa: validatedData.ativa
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    console.error("Campanhas Update Error:", err);
    return NextResponse.json({ error: "Falha ao atualizar campanha." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from("campanhas")
      .delete()
      .eq("id", params.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Campanhas Delete Error:", err);
    return NextResponse.json({ error: "Falha ao excluir campanha." }, { status: 500 });
  }
}
