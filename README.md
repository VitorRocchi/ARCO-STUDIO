# ARCO Client 2026

Painel interno da ARCO construído com Next.js, TypeScript e Supabase. A interface funciona em estado vazio sem inventar dados; quando o ambiente Supabase é configurado, indicadores, sistemas e clientes são lidos do banco com RLS.

## Executar localmente

Requisitos: Node.js 20.9 ou superior.

```powershell
Copy-Item .env.example .env.local
npm.cmd install
npm.cmd run dev
```

Abra `http://localhost:3000`. Informe em `.env.local` a publishable key do projeto `ARCO-STUDIO`. A secret key nunca deve usar prefixo `NEXT_PUBLIC_`.

## Banco de dados

A migration está em `supabase/migrations/`. Ela cria as 12 tabelas do escopo, índices, constraints, proteção do último administrador e RLS baseada em membro interno ativo.

Para validar em uma instância local com Docker disponível:

```powershell
npx.cmd supabase start
npx.cmd supabase db reset
npx.cmd supabase test db
```

Nenhuma migration é aplicada remotamente por esses arquivos. Para criar o primeiro administrador depois da migration remota ser aplicada de forma consciente:

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL='https://hwlbzwoigzorguxpaosr.supabase.co'
$env:SUPABASE_SECRET_KEY='sua-chave-secreta-apenas-nesta-sessao'
node scripts/bootstrap-admin.mjs
Remove-Item Env:SUPABASE_SECRET_KEY
```

O script pede a senha sem eco, é idempotente e não a grava em arquivo ou log.

## Verificações rápidas

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

## Estado atual

- Design system dark premium e responsivo.
- Cinco áreas principais, sem módulos extras.
- Login/logout Supabase SSR e renovação de sessão via `proxy.ts`.
- Dashboard com contagens reais e estados vazios.
- Listagens reais de sistemas e clientes.
- Schema completo, RLS e bootstrap seguro do primeiro administrador.
- Estúdio de Sistemas reservado, sem automações simuladas.

Os formulários completos de CRUD, geração por IA e conexões GitHub/Vercel permanecem dependentes da configuração do ambiente e das próximas fatias de implementação; a interface não afirma que essas integrações estão conectadas.
