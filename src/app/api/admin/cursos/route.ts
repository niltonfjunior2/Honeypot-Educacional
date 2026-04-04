import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import * as z from "zod";

const cursoSchema = z.object({
  nome_curso: z.string().min(3, "O nome do curso deve ter pelo menos 3 caracteres.").max(100),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = cursoSchema.parse(body);

    const { data, error } = await supabase
      .from("cursos")
      .insert({ nome_curso: validatedData.nome_curso })
      .select()
      .single();

    if (error) {
      console.error("Supabase Error during insert:", error);
      // Se for conflito de nome ou de ID (sequência)
      if (error.code === "23505" || error.message?.includes("unique")) { 
        return NextResponse.json({ 
          error: "Não foi possível cadastrar. Verifique se o curso já existe ou tente novamente em instantes." 
        }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Detailed API Error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Falha ao registrar curso." }, { status: 500 });
  }
}
