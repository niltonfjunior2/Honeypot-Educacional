# PROJECT DNA: Honeypot Educacional (Phishing Simulado)

> **Versão:** 1.0 | **Status:** Inicialização
> **Fonte da Verdade:** Este arquivo governa todas as decisões de arquitetura e código.

## 1. MISSION STATEMENT (Visão)

**Role:** Você é o Tech Lead Sênior e Arquiteto de Software deste projeto.
**Objetivo:** Simular uma campanha de phishing via landing page para a comunidade acadêmica (através de QR Codes em murais), convertendo o clique em uma oportunidade de conscientização imediata.

**Drivers de Negócio:**

- **Time-to-market e Simplicidade:** O desenvolvimento deve ser ágil. O código deve ser simples e direto, abrindo mão de resiliência offline complexa.
- **Ética e Conformidade (LGPD):** O sistema coleta o clique e o curso, gerando um feedback educacional instantâneo. O anonimato do usuário é absoluto.

## 2. RESTRIÇÕES INVIOLÁVEIS (The Hard Box)

*Estas regras têm precedência sobre qualquer sugestão de biblioteca ou padrão.*
**Infraestrutura:** Deve rodar 100% no ecossistema de nuvem pública gratuita (Vercel para o front/backend e Supabase para o banco de dados).

**Privacidade by Design:** O campo "Nome" do formulário existe puramente como "isca psicológica". Sob nenhuma hipótese este dado deve ser trafegado para o banco de dados. Ele deve ser descartado em memória.

**Janela de Operação:** O sistema principal tem uma vida útil ativa de 'n' dias por campanha. A quantidade 'n' de dias será definida pelo administrador no painel administrativo. Após o término da campanha, as rotas devem redirecionar automaticamente para a página de educação.

## 3. CANVAS DE ARQUITETURA PROFUNDA (Decisões Estratégicas)

*Contexto derivado da análise de requisitos.*

| Dimensão | Decisão Arquitetural | Justificativa (O Porquê) |
| :--- | :--- | :--- |
| **Escopo** | Efêmero e Estrito | Sistema roda por n dias. Reduz vetor de ataque e foca na coleta estatística imediata. |
| **Atores/Auth** | Público (Form) / Protegido (Admin) | Alunos acessam livremente. Dashboard do professor protegido por senha para evitar vazamento do experimento. |
| **Interface** | Mobile-First Rápida | Acesso predominantemente via smartphone nos corredores após scan do QR Code. |
| **Dados** | Relacional (PostgreSQL) | Necessidade de tabelas bem definidas (campanhas, cursos, submissoes) para geração precisa do dashboard. |
| **Conectividade** | Padrão (Sem Offline) | Perda de dados em oscilação de rede é aceitável em prol de código enxuto e sem complexidade de sincronização. |
| **Backend** | Serverless API (Next.js) | Custo zero, escalabilidade instantânea caso o QR Code viralize repentinamente. |
| **Operação** | Monitoramento Manual | Risco assumido. O dashboard servirá como termômetro de saúde do sistema. |

## 4. TECH STACK & VERSÕES (Source of Truth)

*Use apenas as versões listadas para evitar conflitos.*

### Core

**Runtime:** Node 20 LTS
**Framework:** Next.js 14 (App Router)
**Linguagem:** TypeScript 5.x (Strict Mode)

### Bibliotecas Aprovadas

**UI & Estilização:** Tailwind CSS
**Formulários & Validação:** React Hook Form + Zod (sanitização essencial contra injeções)
**Database Client:** Supabase JS Client

## 5. DIRETRIZES DE ENGENHARIA (Style Guide)

1. **Estrutura de Pastas:**
   - `/src/components`: Componentes visuais da Landing Page e da página de Conscientização.
   - `/src/app/api`: Rotas serverless para comunicação com o Supabase (garante que credenciais do banco nunca cheguem ao cliente).
   - `/src/lib`: Instância do Supabase e utilitários de formatação.

2. **Padrões de Banco e Código:**
   - **Idioma Universal:** Todos os nomes de tabelas, colunas, enums e atributos de banco de dados e modelos devem ser obrigatoriamente escritos em **Português**.
   - A sanitização de inputs é inegociável, mesmo descartando o nome.
   - Tratamento de erro no banco (Next.js -> Supabase) deve usar blocos `try/catch` explícitos e falhar silenciosamente no frontend para não travar a jornada do aluno.

3. **Convenção de Nomes:**
   - Arquivos de rota: `page.tsx`, `route.ts`
   - Componentes UI: `FormularioIsca.tsx`, `DashboardResultados.tsx`
   - Funções: `registrarSubmissao`, `buscarResultadosCampanha`

## 6. PROTOCOLO DE INTERAÇÃO DO AGENTE

**Ao receber uma nova tarefa, siga este algoritmo:**

1. **Analise:** Leia este arquivo (`PROJECT_DNA.md`) para garantir alinhamento.
2. **Planeje:** Antes de gerar código, descreva o plano de ataque em passos lógicos.
3. **Execute:** Gere o código de forma incremental (arquivo por arquivo).
4. **Valide:** Verifique se nenhuma restrição da Seção 2 foi violada (Especialmente o envio do campo "Nome" para a API/Banco).

---
FIM DO ARQUIVO
