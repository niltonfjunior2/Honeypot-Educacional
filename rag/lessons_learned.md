# PROJECT MEMORY & LESSONS LEARNED

> **Para a IA:** Este arquivo é a sua Memória de Longo Prazo. Ele contém soluções para problemas já enfrentados, decisões de arquitetura e "cicatrizes" do projeto.
> **Instrução:** Antes de sugerir correções complexas ou configurações de infraestrutura, CONSULTE este arquivo para ver se o problema já foi resolvido anteriormente. Evite repetir erros documentados aqui.

## 📋 METADADOS DO PROJETO

* **Contexto:** [Ex: Sistema SaaS B2B, App Mobile Offline-First]
* **Stack Principal:** [Ex: Next.js, Supabase, Python]
* **Gerente de Conhecimento:** [Seu Nome/Cargo]

---

## 🏷️ TAXONOMIA DE TAGS

Use estas tags para categorizar novas entradas, facilitando a busca semântica:

* `[ARCH]` - Decisões de Arquitetura (Mudanças estruturais)
* `[ENV]` - Variáveis de Ambiente e Configuração (.env, CI/CD)
* `[LIB]` - Bibliotecas e Dependências (Conflitos de versão, deprecations)
* `[DB]` - Banco de Dados (Migrations, Seeds, SQL)
* `[GIT]` - Controle de Versão (Erros de push, merge conflicts)
* `[BUG]` - Erros Críticos Resolvidos (Non-trivial bugs)

---

## 📚 REGISTRO DE CONHECIMENTO (LOG)

### [2026-04-04] - [BUG] 403 Forbidden em Submissões Legítimas

**Sintoma/Contexto:** O formulário da Landing Page retornava 403 ao tentar submeter, mesmo com dados válidos.
**Causa Raiz:** O payload estava sendo preenchido com um `campanha_id: 1` (default) mas a única campanha ativa no DB era a nova (ID 2). A API `submeter` bloqueia submissões para campanhas inativas.
**Solução Aplicada:** Refatorado `FormularioIsca.tsx` para buscar o `active_campanha_id` via API no momento do mount e incluí-lo dinamicamente no payload.

### [2026-04-04] - [ENV] Caching de API no Next.js App Router

**Sintoma/Contexto:** O Dashboard Administrativo não refletia novos dados ou alterações de campanhas em tempo real (stale data).
**Causa Raiz:** Next.js cacheia rotas GET por padrão em produção e desenvolvimento se não houver headers explícitos.
**Solução Aplicada:** Uso de `export const dynamic = 'force-dynamic'` em todas as rotas administrativas e adição de headers `no-cache` na API de métricas.

### [2026-04-04] - [ARCH] Purificação de PII (Personally Identifiable Information) no Cliente

**Sintoma/Contexto:** Risco de vazamento de nomes reais de alunos para o banco de dados.
**Solução Aplicada:** Enforced "Strip-at-Source": o componente `FormularioIsca.tsx` captura o nome apenas para a UI, mas o payload do `fetch` reconstrói o objeto contendo estritamente apenas o `curso_id` e o `campanha_id`, ignorando qualquer outro campo do formulário.

### [2026-04-05] - [DB] RLS (Row Level Security) para Role 'anon' em Admin Prototipado

**Sintoma/Contexto:** Falha silenciosa ou 403 ao tentar deletar cursos ou criar campanhas no Dashboard, mesmo logado.
**Causa Raiz:** O projeto utiliza um sistema de Cookie simples e a chave `anon_key` do Supabase. Por padrão, o RLS bloqueia qualquer ação que não seja `SELECT`.
**Solução Aplicada:** Criado script `sql/schema.sql` atualizado com políticas de `ALL` (CRUD total) para a role `anon` nas tabelas `campanhas`, `cursos` e `submissoes`. Em produção real, este acesso deve ser restrito a `authenticated`.

### [2026-04-05] - [ENV] Cache "Teimoso" do Next.js 14 e o Truque dos Headers

**Sintoma/Contexto:** Mesmo com `force-dynamic`, as APIs de Métricas e Cursos retornavam dados antigos (stale data), causando desencontro de IDs e métricas zeradas após o reset do banco.
**Causa Raiz:** O Data Cache do Next.js 14 pode persistir resultados de Route Handlers se eles não consumirem explicitamente funções dinâmicas.
**Solução Aplicada:** Injetado `headers()` de `next/headers` dentro dos Route Handlers de GET. Isso força o Next.js a ignorar qualquer cache e reexecutar a query no Supabase a cada requisição. Além disso, adicionado `Cache-Control: no-store` nos headers de resposta.

### [2026-04-05] - [BUG] Gatilho de Formulário em Next.js (Submit Missing)

**Sintoma/Contexto:** Botão de "Criar Campanha" não disparava a API, resultando em "nada acontece".
**Causa Raiz:** O botão dentro do formulário não tinha `type="submit"` explícito e a validação do Zod no handler estava abortando a submissão silenciosamente por campos vazios.
**Solução Aplicada:** Adicionado `type="submit"` e logs de alerta (`console.warn`) no frontend para detectar falhas de validação visualmente no console (F12).
