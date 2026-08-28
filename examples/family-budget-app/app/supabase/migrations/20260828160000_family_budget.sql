create extension if not exists pgcrypto;

create type public.household_role as enum ('owner', 'adult', 'viewer');
create type public.transaction_kind as enum ('expense', 'income');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  created_at timestamptz not null default now()
);

create table public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  invite_code text not null unique default upper(substr(encode(gen_random_bytes(8), 'hex'), 1, 8)),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.household_members (
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.household_role not null default 'adult',
  joined_at timestamptz not null default now(),
  primary key (household_id, user_id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 50),
  color text not null default '#d97706' check (color ~ '^#[0-9a-fA-F]{6}$'),
  monthly_limit numeric(12,2) not null default 0 check (monthly_limit >= 0),
  created_at timestamptz not null default now(),
  unique (household_id, name)
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  created_by uuid not null references auth.users(id),
  kind public.transaction_kind not null default 'expense',
  description text not null check (char_length(description) between 1 and 160),
  amount numeric(12,2) not null check (amount > 0),
  occurred_on date not null default current_date,
  note text check (char_length(note) <= 500),
  created_at timestamptz not null default now()
);

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  target_amount numeric(12,2) not null check (target_amount > 0),
  saved_amount numeric(12,2) not null default 0 check (saved_amount >= 0),
  target_date date,
  created_at timestamptz not null default now()
);

create table public.recurring_items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null check (char_length(name) between 1 and 100),
  amount numeric(12,2) not null check (amount > 0),
  kind public.transaction_kind not null,
  day_of_month int not null check (day_of_month between 1 and 28),
  active boolean not null default true
);

create index transactions_household_date_idx on public.transactions (household_id, occurred_on desc);
create index categories_household_idx on public.categories (household_id);
create index goals_household_idx on public.goals (household_id);

create or replace function public.is_household_member(target_household uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from household_members where household_id = target_household and user_id = auth.uid()) $$;

create or replace function public.can_manage_household(target_household uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from household_members where household_id = target_household and user_id = auth.uid() and role in ('owner', 'adult')) $$;

create or replace function public.is_household_owner(target_household uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from household_members where household_id = target_household and user_id = auth.uid() and role = 'owner') $$;

create or replace function public.shares_household_with(target_user uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(
  select 1 from household_members mine
  join household_members theirs on theirs.household_id = mine.household_id
  where mine.user_id = auth.uid() and theirs.user_id = target_user
) $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into profiles(id, display_name) values (new.id, coalesce(nullif(new.raw_user_meta_data->>'display_name', ''), split_part(new.email, '@', 1)));
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.create_household(household_name text)
returns uuid language plpgsql security definer set search_path = public
as $$
declare new_id uuid;
begin
  insert into households(name, created_by) values (household_name, auth.uid()) returning id into new_id;
  insert into household_members(household_id, user_id, role) values (new_id, auth.uid(), 'owner');
  insert into categories(household_id, name, color, monthly_limit) values
    (new_id, 'Home', '#c56b3f', 1800), (new_id, 'Food', '#668c67', 700),
    (new_id, 'Transport', '#477b91', 400), (new_id, 'Fun', '#c7943e', 350);
  return new_id;
end $$;

create or replace function public.join_household(code text)
returns uuid language plpgsql security definer set search_path = public
as $$
declare target_id uuid;
begin
  select id into target_id from households where invite_code = upper(trim(code));
  if target_id is null then raise exception 'Invalid household invite code'; end if;
  insert into household_members(household_id, user_id, role) values (target_id, auth.uid(), 'adult') on conflict do nothing;
  return target_id;
end $$;

alter table public.profiles enable row level security;
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.goals enable row level security;
alter table public.recurring_items enable row level security;

create policy "profiles visible within household" on public.profiles for select to authenticated using (id = auth.uid() or shares_household_with(id));
create policy "users manage own profile" on public.profiles for all to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "members view household" on public.households for select to authenticated using (is_household_member(id));
create policy "members view memberships" on public.household_members for select to authenticated using (is_household_member(household_id));
create policy "owners manage memberships" on public.household_members for delete to authenticated using (is_household_owner(household_id));
create policy "members view categories" on public.categories for select to authenticated using (is_household_member(household_id));
create policy "adults manage categories" on public.categories for all to authenticated using (can_manage_household(household_id)) with check (can_manage_household(household_id));
create policy "members view transactions" on public.transactions for select to authenticated using (is_household_member(household_id));
create policy "adults manage transactions" on public.transactions for all to authenticated using (can_manage_household(household_id)) with check (can_manage_household(household_id) and created_by = auth.uid());
create policy "members view goals" on public.goals for select to authenticated using (is_household_member(household_id));
create policy "adults manage goals" on public.goals for all to authenticated using (can_manage_household(household_id)) with check (can_manage_household(household_id));
create policy "members view recurring items" on public.recurring_items for select to authenticated using (is_household_member(household_id));
create policy "adults manage recurring items" on public.recurring_items for all to authenticated using (can_manage_household(household_id)) with check (can_manage_household(household_id));

grant execute on function public.create_household(text) to authenticated;
grant execute on function public.join_household(text) to authenticated;
