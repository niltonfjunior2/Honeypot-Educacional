# 🗺️ ROADMAP DE DESENVOLVIMENTO: Honeypot Educacional

Este roadmap define as fases incrementais para a construção do projeto, respeitando as restrições e diretrizes estabelecidas no `rag/project_dna.md`.

---

## 🏗️ Fase 0: Alicerce e Infraestrutura (Setup)

**Objetivo:** Configurar o ambiente de desenvolvimento e estabelecer a comunicação com os serviços de nuvem.

- [ ] **Setup do Projeto:** Inicializar Next.js 14 com TypeScript, App Router e Tailwind CSS.
- [ ] **Integração Supabase:** Configurar as variáveis de ambiente e o cliente oficial (`src/lib/supabase.ts`).
- [ ] **Design System Inicial:** Configurar cores da instituição no `tailwind.config.ts` e fontes básicas.
- [ ] **Estrutura de Pastas:** Criar diretórios conforme o Padrão de Engenharia (Seção 5 do DNA).

**📍 Definição de Pronto (DoD):** Projeto rodando localmente sem erros de console e conectando com sucesso ao Supabase (teste de ping/leitura).

---

## 🎣 Fase 1: O Fluxo da Isca (Landing Page)

**Objetivo:** Criar a interface que o aluno verá ao escanear o QR Code, focada na conversão rápida.

- [ ] **Layout Mobile-First:** Desenvolver a estrutura base responsiva focada em dispositivos móveis.
- [ ] **Componente `FormularioIsca`:** Implementar o formulário com React Hook Form + Zod.
- [ ] **Validação Psicológica:** Incluir campo "Nome" (isca) e o seletor de "Curso".
- [ ] **Lógica de Descarte:** Garantir técnica e explicitamente que o campo "Nome" nunca saia da memória do componente/cliente.

**📍 Definição de Pronto (DoD):** Landing Page funcional, visualmente atraente e formulário validando campos obrigatórios localmente.

---

## 🎓 Fase 2: Conscientização e Educação (Pós-Clique)

**Objetivo:** Transformar o momento do "erro" em oportunidade de aprendizado.

- [ ] **Página de Educação:** Criar a rota post-clique explicando que se tratava de uma simulação.
- [ ] **Conteúdo Educativo:** Implementar os 3-4 pontos chave de identificação de phishing (remetente, urgência, link suspeito).
- [ ] **Call to Action (CTA):** Botão de compartilhamento/conscientização para outros colegas.

**📍 Definição de Pronto (DoD):** Navegação entre Landing Page e Página de Educação funcionando fluidamente após o "submit" do formulário.

---

## 📊 Fase 3: Backend e Persistência Anônima

**Objetivo:** Registrar as métricas no banco de dados de forma segura e anônima.

- [ ] **Schema SQL:** Criar tabelas `campanhas`, `cursos` e `submissoes` no Supabase (Idioma: Português).
- [ ] **API Route `registrarSubmissao`:** Endpoint serverless para receber apenas ID da Campanha e Curso.
- [ ] **Sanitização de Payload:** Uso de Zod no backend para evitar injections e garantir descarte de dados extras.
- [ ] **Lógica de Janela Operacional:** Implementar verificação se a campanha ainda está ativa antes de aceitar dados.

**📍 Definição de Pronto (DoD):** Submissão do formulário salvando dados reais no Supabase e redirecionando para a página de educação. O log do banco deve mostrar apenas dados anônimos.

---

## 🔐 Fase 4: Painel Administrativo (Dashboard)

**Objetivo:** Permitir que administradores gerenciem campanhas e visualizem resultados.

- [ ] **Autenticação Admin:** Configurar Supabase Auth para proteção da rota `/admin`.
- [ ] **Gestão de Campanhas:** CRUD para criar novas campanhas e definir a data de expiração ('n' dias).
- [ ] **Componente `VisualizacaoDados`:** Gráficos simples por curso e horário de maior incidência.
- [ ] **Geração de QR Code:** Link dinâmico para a campanha ativa.

**📍 Definição de Pronto (DoD):** Administrador logado consegue criar uma campanha e ver o gráfico de cliques atualizado em tempo real.

---

## 🛡️ Fase 5: Refinamento, Segurança e Operação

**Objetivo:** Polimento final e endurecimento do sistema.

- [ ] **Auditoria DNA:** Checklist final comparando o código com as "Restrições Invioláveis" do DNA.
- [ ] **Tratamento de Erros:** Revisar todos os `try/catch` para garantir falha silenciosa no frontend (UX).
- [ ] **Deploy Vercel:** Configuração final de domínio, SSL e logs.
- [ ] **Limpeza de Logs:** Garantir que nenhum log de servidor (Vercel) contenha dados sensíveis experimentais.

**📍 Definição de Pronto (DoD):** Sistema em produção, QR Code testado e roadmap 100% concluído.
