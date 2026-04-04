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

### [202X-XX-XX] - [EXEMPLO] Erro de Hydration no Next.js com Datas

**Sintoma/Contexto:** Erro `Text content does not match server-rendered HTML` ao renderizar datas.
**Causa Raiz:** O servidor (Node) e o navegador estavam em timezones diferentes, gerando strings diferentes.
**Solução Aplicada:** Instalação da lib `date-fns` e uso de formatação consistente ou renderização apenas no `useEffect`.
**Regra de Prevenção:** Nunca renderizar `new Date()` diretamente no JSX sem tratamento de timezone.
