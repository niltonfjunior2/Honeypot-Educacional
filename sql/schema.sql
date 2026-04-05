-- SCHEMA PARA POSTGRESQL (SUPABASE)
-- Idioma: Português (Conforme Padrão DNA Seção 5.2)

-- 1. LIMPEZA TOTAL (RESET)
DROP TABLE IF EXISTS submissoes CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS campanhas CASCADE;

-- 2. TABELA DE CAMPANHAS (Controla a janela operacional da simulação)
CREATE TABLE campanhas (
    id SERIAL PRIMARY KEY,
    nome_campanha VARCHAR(100) NOT NULL, -- Ex: 'Wi-Fi Campus 5G'
    descricao TEXT,
    data_inicio TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ativa BOOLEAN DEFAULT TRUE
);

-- 3. TABELA DE CURSOS (Para padronizar a entrada e geração de métricas)
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL UNIQUE
);

-- 4. TABELA DE SUBMISSÕES (Onde as métricas anônimas são armazenadas)
CREATE TABLE submissoes (
    id SERIAL PRIMARY KEY,
    campanha_id INT REFERENCES campanhas(id) ON DELETE CASCADE,
    curso_id INT REFERENCES cursos(id) ON DELETE CASCADE,
    data_hora TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. INSERIR CURSOS PADRÃO DA UEMG
INSERT INTO cursos (nome_curso) VALUES 
('Administração'), ('Design de Produto'), ('Direito'), 
('Engenharia de Computação'), ('Medicina'), ('Pedagogia'), 
('Psicologia'), ('Sistemas de Informação');

-- 6. CONFIGURAR SEGURANÇA (RLS)
-- Garante que o sistema funcione com chaves anônimas (anon_key) com segurança.
-- Nota: Em ambiente real, usaríamos Supabase Auth com a role 'authenticated'.
ALTER TABLE campanhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso Total para a Role 'anon' (Simplificado para o Projeto)
DROP POLICY IF EXISTS "Public CRUD Campanhas" ON campanhas;
CREATE POLICY "Public CRUD Campanhas" ON campanhas FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public CRUD Cursos" ON cursos;
CREATE POLICY "Public CRUD Cursos" ON cursos FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public CRUD Submissoes" ON submissoes;
CREATE POLICY "Public CRUD Submissoes" ON submissoes FOR ALL USING (true) WITH CHECK (true);
