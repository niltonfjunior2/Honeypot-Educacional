import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import * as z from "zod";

const submissionSchema = z.object({
  curso_id: z.string().min(1),
  campanha_id: z.string().optional().default("1"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // LÓGICA DE PURIFICAÇÃO (DNA Seção 2): 
    // O Zod filtrará qualquer campo extra (como 'nome') que possa estar no payload
    const validatedData = submissionSchema.parse(body);

    // 1. Verificar se a campanha está ativa
    const { data: campanha, error: campanhaError } = await supabase
      .from("campanhas")
      .select("ativa")
      .eq("id", validatedData.campanha_id)
      .single();

    // Se houver erro ou campanha inativa, retornamos um erro genérico
    if (campanhaError || !campanha?.ativa) {
      return NextResponse.json(
        { error: "Campanha expirada ou indisponível." },
        { status: 403 }
      );
    }

    // 2. Registrar a métrica de forma anônima
    const { error: insertError } = await supabase
      .from("submissoes")
      .insert({
        campanha_id: parseInt(validatedData.campanha_id),
        curso_id: parseInt(validatedData.curso_id),
      });

    if (insertError) {
      console.error("Supabase Error:", insertError.message);
      return NextResponse.json(
        { error: "Erro interno de comunicação com o banco." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Métrica registrada." });
  } catch (err) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }
}
