-- SCHEMA PARA POSTGRESQL (SUPABASE)
-- Idioma: Português (Conforme Padrão DNA Seção 5.2)

-- 1. Tabela de Campanhas (Controla a janela operacional da simulação)
CREATE TABLE campanhas (
    id SERIAL PRIMARY KEY,
    nome_campanha VARCHAR(100) NOT NULL, -- Ex: 'Wi-Fi Campus 5G'
    descricao TEXT,
    data_inicio TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ativa BOOLEAN DEFAULT TRUE
);

-- 2. Tabela de Cursos (Para padronizar a entrada e geração de métricas)
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Tabela de Submissões (Onde as métricas anônimas são armazenadas)
-- Note que NÃO existe a coluna "nome_aluno" - Anonimato Absoluto (DNA Seção 2)
CREATE TABLE submissoes (
    id SERIAL PRIMARY KEY,
    campanha_id INT REFERENCES campanhas(id) ON DELETE CASCADE,
    curso_id INT REFERENCES cursos(id) ON DELETE CASCADE,
    data_hora TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
