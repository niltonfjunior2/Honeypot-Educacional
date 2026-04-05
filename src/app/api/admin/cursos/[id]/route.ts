import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import * as z from "zod";
import { revalidatePath } from "next/cache";

const cursoSchema = z.object({
  nome_curso: z.string().min(3, "O nome do curso deve ter pelo menos 3 caracteres.").max(100),
});

export const dynamic = "force-dynamic";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validatedData = cursoSchema.parse(body);

    const { data, error } = await supabase
      .from("cursos")
      .update({ nome_curso: validatedData.nome_curso })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === "23505") { // Unique violation
        return NextResponse.json({ error: "Já existe um curso com este nome." }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    console.error("Cursos Update Error:", err);
    return NextResponse.json({ error: "Falha ao atualizar curso." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from("cursos")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    revalidatePath("/admin/dashboard");
    revalidatePath("/api/cursos");
    revalidatePath("/api/admin/metricas");

    return NextResponse.json({ success: true }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (err) {
    console.error("Cursos Delete Error:", err);
    return NextResponse.json({ error: "Falha ao excluir curso." }, { status: 500 });
  }
}
