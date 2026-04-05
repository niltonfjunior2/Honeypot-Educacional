import { supabase } from './src/lib/supabase';

async function test() {
  console.log("--- TESTANDO CONEXAO SUPABASE ---");
  
  const { data: campanhas, error: cErr } = await supabase.from('campanhas').select('*');
  if (cErr) {
    console.error("Erro ao listar campanhas:", cErr.message);
  } else {
    console.log("Campanhas encontradas:", campanhas.length);
    campanhas.forEach(c => console.log(`ID: ${c.id}, Nome: ${c.nome_campanha}, Ativa: ${c.ativa}`));
  }

  const { data: cursos, error: crErr } = await supabase.from('cursos').select('*').limit(1);
  if (crErr) {
    console.error("Erro ao listar cursos:", crErr.message);
  } else {
    console.log("Conexão de leitura de cursos [OK]");
  }

  const testId = 2;
  const { data: single, error: sErr } = await supabase.from('campanhas').select('ativa').eq('id', testId).maybeSingle();
  console.log(`Teste de Campanha ID ${testId}:`, { data: single, error: sErr?.message || "Nenhum erro" });
}

test();
