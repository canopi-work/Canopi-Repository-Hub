-- Canopi Repository — Slack alerts for the task board.
-- Run once, AFTER supabase/schema.sql, in SQL Editor > New query > Run. Safe to re-run.
--
-- Every 5 minutes this posts to Slack (#teamprogress):
--   * once when an unfinished task is due within the next 24 hours
--   * once when an unfinished task passes its due time
-- Moving a task's due date re-arms both messages. Times are shown in US Central Time.
--
-- The Slack webhook link is a secret, so it lives in Supabase Vault, not in the site:
--   do $$ declare sid uuid; begin
--     select id into sid from vault.secrets where name = 'slack_webhook_teamprogress';
--     if sid is null then perform vault.create_secret('PASTE-WEBHOOK-URL', 'slack_webhook_teamprogress', 'Slack #teamprogress');
--     else perform vault.update_secret(sid, 'PASTE-WEBHOOK-URL'); end if;
--   end $$;

create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;

-- ---------- who to @mention ----------
-- Slack member IDs (Slack: click someone's name > View full profile > ⋮ > Copy member ID).
-- Anyone without an ID is named instead of mentioned. Edited from SQL Editor only.
create table if not exists public.slack_members (
  email text primary key,
  slack_user_id text not null check (slack_user_id ~ '^[UW][A-Z0-9]+$')
);
alter table public.slack_members enable row level security;

-- ---------- the check ----------
create or replace function public.notify_task_deadlines()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  hook text;
  t record;
  who text;
  title text;
  due text;
  board constant text := '<https://canopi-work.github.io/Canopi-Repository-Hub/#tasks|Open the task board>';
begin
  select decrypted_secret into hook from vault.decrypted_secrets where name = 'slack_webhook_teamprogress' limit 1;
  if hook is null then
    return;
  end if;

  for t in
    select * from public.tasks
    where status <> 'done' and due_at is not null
      and ((due_at <= now() and overdue_sent_at is null)
        or (due_at > now() and due_at <= now() + interval '24 hours' and reminder_sent_at is null))
    order by due_at
  loop
    who := coalesce(
      (select '<@' || s.slack_user_id || '>' from public.slack_members s where lower(s.email) = lower(t.owner_email)),
      initcap(replace(split_part(t.owner_email, '@', 1), '.', ' ')));
    -- Slack treats &, < and > as markup.
    title := replace(replace(replace(t.title, '&', '&amp;'), '<', '&lt;'), '>', '&gt;');
    due := to_char(t.due_at at time zone 'America/Chicago', 'Dy Mon FMDD, FMHH12:MI AM') || ' CT';

    if t.due_at <= now() then
      perform net.http_post(
        url := hook,
        body := jsonb_build_object('text', ':rotating_light: *Overdue:* ' || title || ' (' || who || ') was due ' || due || '. ' || board));
      update public.tasks set overdue_sent_at = now(), reminder_sent_at = coalesce(reminder_sent_at, now()) where id = t.id;
    else
      perform net.http_post(
        url := hook,
        body := jsonb_build_object('text', ':alarm_clock: *Due soon:* ' || title || ' (' || who || ') is due ' || due || '. ' || board));
      update public.tasks set reminder_sent_at = now() where id = t.id;
    end if;
  end loop;
end;
$$;
revoke execute on function public.notify_task_deadlines() from public, anon, authenticated;

-- ---------- run it every 5 minutes ----------
select cron.schedule('task-deadline-alerts', '*/5 * * * *', 'select public.notify_task_deadlines()');
