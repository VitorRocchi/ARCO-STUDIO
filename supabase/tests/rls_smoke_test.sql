begin;
select plan(14);

select has_table('public', 'internal_members');
select has_table('public', 'systems');
select has_table('public', 'system_plans');
select has_table('public', 'clients');
select has_table('public', 'client_subscriptions');
select has_table('public', 'system_issues');
select has_table('public', 'system_change_requests');
select has_table('public', 'change_request_revisions');
select has_table('public', 'system_integrations');
select has_table('public', 'system_versions');
select has_table('public', 'access_invitations');
select has_table('public', 'audit_events');
select ok((select relrowsecurity from pg_class where oid = 'public.systems'::regclass), 'RLS enabled on systems');
select ok((select relrowsecurity from pg_class where oid = 'public.clients'::regclass), 'RLS enabled on clients');

select * from finish();
rollback;
