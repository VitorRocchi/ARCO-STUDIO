# ARCO Client 2026 — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar do zero um painel interno dark premium, navegável e preparado para operar com o Supabase ARCO-STUDIO sem simular dados ou integrações.

**Architecture:** Aplicação única em Next.js App Router, com páginas por domínio e componentes compartilhados enxutos. O acesso a dados fica atrás de clientes Supabase SSR; sem configuração de ambiente, a interface permanece utilizável em estado vazio e informa claramente o que falta.

**Tech Stack:** Next.js 16+, React 19, TypeScript strict, Tailwind CSS, Supabase SSR, Zod, Lucide.

**Spec:** `C:/Users/vitor/.codex/attachments/49ddbf43-d061-4a54-8d87-7924491097d9/Pasted text.txt`

## Global Constraints

- Exatamente cinco áreas principais: Visão Geral, Estúdio de Sistemas, Sistemas, Clientes e Configurações.
- Interface padrão escura, responsiva, acessível e integralmente em português brasileiro.
- Nenhum dado fictício, integração simulada, segredo no cliente ou `service_role` no frontend.
- RLS habilitado em todas as tabelas públicas e autorização baseada em membro interno ativo.
- Sem migration remota, deploy, commit ou push automático nesta execução.
- Testes proporcionais: regras de domínio, typecheck/lint e build final.

## Review Focus

- Ambiente Supabase ausente deve produzir estado de configuração, nunca quebra ou dados inventados.
- Usuário autenticado sem `internal_members.active = true` não pode acessar dados internos.
- Último administrador ativo não pode perder o papel administrativo.
- Valores históricos de contratação não devem mudar quando o plano for editado.
- Layout deve continuar utilizável em 390 px sem esconder as ações principais.

---

### Task 1: Fundação visual e navegação

**Files:** `package.json`, `src/app/*`, `src/components/*`, `src/lib/*`

**Interfaces:** produz layout responsivo, tokens ARCO, cinco rotas principais e estados vazios reutilizáveis.

- [ ] Criar teste das definições de navegação e estados dos sistemas.
- [ ] Confirmar falha antes da implementação.
- [ ] Implementar shell, sidebar móvel/desktop, cabeçalhos e páginas principais.
- [ ] Executar teste e typecheck.

### Task 2: Contrato Supabase e autenticação SSR

**Files:** `src/lib/supabase/*`, `src/app/login/*`, `src/app/auth/*`, `src/proxy.ts`, `.env.example`

**Interfaces:** produz clientes browser/server, renovação de sessão, login, logout e proteção server-side.

- [ ] Criar validação de ambiente testável.
- [ ] Confirmar falha antes da implementação.
- [ ] Implementar autenticação real quando configurada e modo de preparação explícito quando ausente.
- [ ] Executar testes e typecheck.

### Task 3: Modelo de dados seguro

**Files:** `supabase/migrations/*`, `supabase/tests/*`

**Interfaces:** produz as 12 tabelas do escopo, constraints, índices, triggers de timestamps, grants e políticas RLS.

- [ ] Criar migration local versionada e teste pgTAP de autorização.
- [ ] Revisar allow/deny de anon, membro ativo, membro revogado e administrador.
- [ ] Validar sintaxe localmente quando a CLI/Docker estiver disponível.

### Task 4: MVP dos módulos

**Files:** `src/app/(app)/*`, `src/components/dashboard/*`, `src/components/systems/*`, `src/components/clients/*`

**Interfaces:** produz visão geral com métricas reais/vazias, portfólio, clientes, central de evolução e página reservada do Estúdio.

- [ ] Implementar consultas server-side sem N+1 e seus estados de falha/vazio.
- [ ] Implementar superfícies e formulários essenciais sem dados falsos.
- [ ] Verificar navegação e responsividade básica.

### Task 5: Verificação e handoff

**Files:** `README.md`

- [ ] Executar testes unitários curtos.
- [ ] Executar lint e build.
- [ ] Corrigir apenas falhas encontradas e documentar variáveis/comandos.
