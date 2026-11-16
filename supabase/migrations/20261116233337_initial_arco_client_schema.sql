create extension if not exists pgcrypto;
create schema if not exists private;

create table public.internal_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null,
  role text not null default 'member' check (role in ('admin', 'member')),
  status text not null default 'active' check (status in ('active', 'revoked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.access_invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null default 'member' check (role in ('admin', 'member')),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'expired', 'revoked')),
  token_hash text not null unique,
  invited_by uuid not null references public.internal_members(id),
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.systems (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null default '',
  logo_url text,
  category text,
  origin text not null default 'internal' check (origin in ('internal', 'external')),
  owner_id uuid references public.internal_members(id) on delete set null,
  status text not null default 'development' check (status in ('development', 'published', 'commercialized', 'archived')),
  public_url text,
  admin_url text,
  github_repository text,
  vercel_project text,
  documentation_url text,
  notes text,
  created_by uuid not null references public.internal_members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.system_plans (
  id uuid primary key default gen_random_uuid(),
  system_id uuid not null references public.systems(id) on delete cascade,
  name text not null,
  description text not null default '',
  price_minor bigint not null default 0 check (price_minor >= 0),
  currency char(3) not null default 'BRL',
  billing_period text not null check (billing_period in ('monthly', 'quarterly', 'yearly', 'one_time')),
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (system_id, name)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text,
  email text,
  phone text,
  status text not null default 'active' check (status in ('active', 'inactive', 'archived')),
  notes text,
  created_by uuid not null references public.internal_members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,
  system_id uuid not null references public.systems(id) on delete restrict,
  plan_id uuid references public.system_plans(id) on delete set null,
  contracted_price_minor bigint not null check (contracted_price_minor >= 0),
  currency char(3) not null default 'BRL',
  billing_period text not null check (billing_period in ('monthly', 'quarterly', 'yearly', 'one_time')),
  starts_on date not null,
  ends_on date,
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled', 'ended')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on is null or ends_on >= starts_on)
);

create table public.system_issues (
  id uuid primary key default gen_random_uuid(),
  system_id uuid not null references public.systems(id) on delete cascade,
  title text not null,
  description text not null default '',
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'critical')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved')),
  assignee_id uuid references public.internal_members(id) on delete set null,
  created_by uuid not null references public.internal_members(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.system_change_requests (
  id uuid primary key default gen_random_uuid(),
  system_id uuid not null references public.systems(id) on delete cascade,
  title text not null,
  description text not null,
  type text not null check (type in ('feature', 'fix', 'visual', 'optimization', 'integration', 'refactor')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'critical')),
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'forwarded', 'in_progress', 'completed', 'cancelled')),
  references_data jsonb not null default '[]'::jsonb check (jsonb_typeof(references_data) = 'array'),
  attachments jsonb not null default '[]'::jsonb check (jsonb_typeof(attachments) = 'array'),
  assignee_id uuid references public.internal_members(id) on delete set null,
  created_by uuid not null references public.internal_members(id),
  approved_by uuid references public.internal_members(id) on delete set null,
  approved_at timestamptz,
  external_issue_id text,
  external_issue_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.change_request_revisions (
  id uuid primary key default gen_random_uuid(),
  change_request_id uuid not null references public.system_change_requests(id) on delete cascade,
  revision_number integer not null check (revision_number > 0),
  specification_markdown text not null,
  source text not null default 'manual' check (source in ('manual', 'ai')),
  provider text,
  model text,
  status text not null default 'draft' check (status in ('draft', 'approved', 'superseded')),
  created_by uuid not null references public.internal_members(id),
  created_at timestamptz not null default now(),
  unique (change_request_id, revision_number)
);

create table public.system_integrations (
  id uuid primary key default gen_random_uuid(),
  system_id uuid not null references public.systems(id) on delete cascade,
  provider text not null check (provider in ('github', 'vercel', 'ai_agent')),
  status text not null default 'not_configured' check (status in ('not_configured', 'connecting', 'connected', 'error', 'revoked')),
  external_id text,
  external_url text,
  configuration jsonb not null default '{}'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (system_id, provider)
);

create table public.system_versions (
  id uuid primary key default gen_random_uuid(),
  system_id uuid not null references public.systems(id) on delete cascade,
  version text not null,
  title text,
  notes text not null default '',
  status text not null default 'draft' check (status in ('draft', 'preview', 'published', 'retired')),
  preview_url text,
  published_url text,
  published_at timestamptz,
  created_by uuid not null references public.internal_members(id),
  created_at timestamptz not null default now(),
  unique (system_id, version)
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.internal_members(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index internal_members_user_status_idx on public.internal_members(user_id, status);
create index systems_status_idx on public.systems(status);
create index systems_owner_idx on public.systems(owner_id);
create index system_plans_system_idx on public.system_plans(system_id);
create index clients_status_idx on public.clients(status);
create index subscriptions_client_idx on public.client_subscriptions(client_id);
create index subscriptions_system_idx on public.client_subscriptions(system_id);
create index subscriptions_status_idx on public.client_subscriptions(status);
create index issues_system_status_idx on public.system_issues(system_id, status);
create index change_requests_system_status_idx on public.system_change_requests(system_id, status);
create index revisions_request_idx on public.change_request_revisions(change_request_id);
create index integrations_system_idx on public.system_integrations(system_id);
create index versions_system_idx on public.system_versions(system_id);
create index audit_events_created_idx on public.audit_events(created_at desc);

create function private.is_active_member()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.internal_members m where m.user_id = (select auth.uid()) and m.status = 'active') $$;

create function private.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.internal_members m where m.user_id = (select auth.uid()) and m.status = 'active' and m.role = 'admin') $$;

revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;
revoke execute on function private.is_active_member() from public, anon;
revoke execute on function private.is_admin() from public, anon;
grant execute on function private.is_active_member() to authenticated;
grant execute on function private.is_admin() to authenticated;

create function private.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array['internal_members','access_invitations','systems','system_plans','clients','client_subscriptions','system_issues','system_change_requests','system_integrations']
  loop execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function private.set_updated_at()', table_name, table_name); end loop;
end $$;

create function private.protect_last_admin()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if old.role = 'admin' and old.status = 'active' and (new.role <> 'admin' or new.status <> 'active') and
    (select count(*) from public.internal_members where role = 'admin' and status = 'active') <= 1 then
    raise exception 'O último administrador ativo não pode ser revogado.';
  end if;
  return new;
end $$;
create trigger protect_last_admin before update on public.internal_members for each row execute function private.protect_last_admin();

do $$
declare table_name text;
begin
  foreach table_name in array array['internal_members','access_invitations','systems','system_plans','clients','client_subscriptions','system_issues','system_change_requests','change_request_revisions','system_integrations','system_versions','audit_events']
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from anon, authenticated', table_name);
    execute format('grant select, insert, update, delete on table public.%I to authenticated', table_name);
    execute format('create policy %I on public.%I for select to authenticated using ((select private.is_active_member()))', table_name || '_select_active', table_name);
  end loop;
end $$;

create policy internal_members_admin_insert on public.internal_members for insert to authenticated with check ((select private.is_admin()));
create policy internal_members_admin_update on public.internal_members for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy internal_members_admin_delete on public.internal_members for delete to authenticated using ((select private.is_admin()));

create policy invitations_admin_insert on public.access_invitations for insert to authenticated with check ((select private.is_admin()));
create policy invitations_admin_update on public.access_invitations for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy invitations_admin_delete on public.access_invitations for delete to authenticated using ((select private.is_admin()));

do $$
declare table_name text;
begin
  foreach table_name in array array['systems','system_plans','clients','client_subscriptions','system_issues','system_change_requests','change_request_revisions','system_integrations','system_versions']
  loop
    execute format('create policy %I on public.%I for insert to authenticated with check ((select private.is_active_member()))', table_name || '_insert_active', table_name);
    execute format('create policy %I on public.%I for update to authenticated using ((select private.is_active_member())) with check ((select private.is_active_member()))', table_name || '_update_active', table_name);
    execute format('create policy %I on public.%I for delete to authenticated using ((select private.is_active_member()))', table_name || '_delete_active', table_name);
  end loop;
end $$;

create policy audit_insert_active on public.audit_events for insert to authenticated with check ((select private.is_active_member()));
revoke update, delete on public.audit_events from authenticated;
