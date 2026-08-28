from pathlib import Path

sql = next(Path('supabase/migrations').glob('*.sql')).read_text().lower()
required = [
    'create table public.households', 'create table public.household_members',
    'create table public.categories', 'create table public.transactions',
    'create table public.goals', 'create table public.recurring_items',
    'create or replace function public.is_household_member',
    'create or replace function public.can_manage_household',
    'create or replace function public.create_household',
    'create or replace function public.join_household',
]
for table in ('profiles', 'households', 'household_members', 'categories', 'transactions', 'goals', 'recurring_items'):
    required.append(f'alter table public.{table} enable row level security')

missing = [item for item in required if item not in sql]
if missing:
    raise SystemExit('Missing migration contracts:\n- ' + '\n- '.join(missing))
print(f'PASS family migration contract ({len(required)} required elements)')
