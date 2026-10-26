-- Canopi Repository — Supabase setup.
-- Run once in the Supabase dashboard: SQL Editor > New query > paste this file > Run.
-- Safe to re-run; it only creates what is missing and resets the policies.

-- ---------- admins ----------
-- Admins can delete any uploaded document; everyone else can only delete their own.
-- Add someone with:  insert into public.admins (user_id) select id from auth.users where email = 'name@canopi.work';
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;
-- No policies on purpose: the table is only read through is_admin() below
-- and only edited from the dashboard.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- documents ----------
-- One row per uploaded file or shared link. `section` is the site route it
-- belongs to (e.g. 'meetings-team-weekly'), so each page can list its own items.
-- Files have file_path/file_name; links (Loom, YouTube, Notion, ...) have url.
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null check (char_length(title) between 1 and 200),
  file_path text unique,
  file_name text,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid default auth.uid() references auth.users (id) on delete set null,
  uploader_email text default (auth.jwt() ->> 'email'),
  created_at timestamptz not null default now()
);
-- Links were added after the first version; these bring older projects up to date.
alter table public.documents add column if not exists url text;
alter table public.documents alter column file_path drop not null;
alter table public.documents alter column file_name drop not null;
alter table public.documents drop constraint if exists documents_file_or_link;
alter table public.documents add constraint documents_file_or_link check (
  (file_path is not null and file_name is not null and url is null)
  or (file_path is null and url ~* '^https?://' and char_length(url) <= 2000)
);
create index if not exists documents_section_created_idx on public.documents (section, created_at desc);
alter table public.documents enable row level security;

drop policy if exists "Members can read documents" on public.documents;
create policy "Members can read documents" on public.documents
  for select to authenticated
  using (true);

drop policy if exists "Members can add their own documents" on public.documents;
create policy "Members can add their own documents" on public.documents
  for insert to authenticated
  with check (
    uploaded_by = auth.uid()
    and uploader_email is not distinct from (auth.jwt() ->> 'email')
    and (file_path is null or split_part(file_path, '/', 1) = auth.uid()::text)
  );

drop policy if exists "Owners and admins can delete documents" on public.documents;
create policy "Owners and admins can delete documents" on public.documents
  for delete to authenticated
  using (uploaded_by = auth.uid() or public.is_admin());

-- ---------- file storage ----------
-- Private bucket: files are only reachable through short-lived signed links
-- handed to signed-in members. 50 MB per file (the Supabase free-plan maximum).
insert into storage.buckets (id, name, public, file_size_limit)
values ('documents', 'documents', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

drop policy if exists "Members can read files" on storage.objects;
create policy "Members can read files" on storage.objects
  for select to authenticated
  using (bucket_id = 'documents');

-- Each member uploads into a folder named after their user id.
drop policy if exists "Members can upload to their own folder" on storage.objects;
create policy "Members can upload to their own folder" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Owners and admins can delete files" on storage.objects;
create policy "Owners and admins can delete files" on storage.objects
  for delete to authenticated
  using (bucket_id = 'documents' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
