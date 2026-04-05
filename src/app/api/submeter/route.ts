import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import * as z from "zod";

const submissionSchema = z.object({
  curso_id: z.string().min(1),
  campanha_id: z.string().optional().default("1"),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    console.log("[API Submeter] Payload recebido:", rawBody);
    
    // LÓGICA DE PURIFICAÇÃO (DNA Seção 2): 
    // O Zod filtrará qualquer campo extra (como 'nome') que possa estar no payload
    const validatedData = submissionSchema.parse(rawBody);

    // 1. Verificar se a campanha está ativa
    const campanhaIdNum = parseInt(validatedData.campanha_id);

    const { data: campanhasFound, error: campanhaError } = await supabase
      .from("campanhas")
      .select("id, ativa")
      .eq("id", campanhaIdNum);

    // Log para depuração profunda
    if (campanhaError) {
      console.error(`[API Submeter] Erro de rede/permissão Supabase:`, campanhaError.message);
    }
    
    const campanha = campanhasFound && campanhasFound.length > 0 ? campanhasFound[0] : null;

    if (!campanha) {
      console.error(`[API Submeter] Campanha ${campanhaIdNum} NÃO ENCONTRADA no banco. Total encontrado: ${campanhasFound?.length || 0}`);
    } else if (!campanha.ativa) {
      console.error(`[API Submeter] Campanha ${campanhaIdNum} encontrada, mas está INATIVA.`);
    }

    // Se houver erro ou campanha não encontrada/inativa, retornamos um erro genérico
    if (campanhaError || !campanha || !campanha.ativa) {
      return NextResponse.json(
        { error: "Campanha expirada ou indisponível." },
        { status: 403 }
      );
    }

    // 2. Registrar a métrica de forma anônima
    const { data, error } = await supabase
      .from("submissoes")
      .insert({
        campanha_id: parseInt(validatedData.campanha_id),
        curso_id: parseInt(validatedData.curso_id),
      })
      .select()
      .single();

    if (error) {
      console.error("[API Submeter] Erro ao inserir submissão no Supabase:", error);
      throw error;
    }

    console.log("[API Submeter] Submissão registrada com sucesso ID:", data.id);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.warn("[API Submeter] Erro de validação Zod:", err.issues);
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    console.error("[API Submeter] Erro fatal:", err);
    return NextResponse.json({ error: "Falha ao processar submissão." }, { status: 500 });
  }
}
