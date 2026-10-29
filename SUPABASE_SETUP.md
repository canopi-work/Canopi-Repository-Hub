# Supabase setup: member logins and document uploads

The site stays a static site (GitHub Pages, or any static host). Supabase adds:

- **Logins.** The whole site sits behind a sign-in screen. Accounts are invite-only.
- **Uploads and links.** Every document page has an **Add a file or link** button, and the sidebar has one that lets you pick the section. Members can upload a file or paste a link. Items show under "Added by the team" on that page, in Home > Recent updates, and in search.
- **Viewer.** Clicking an item opens it inside the site:
  - Loom, YouTube and Vimeo videos play inline.
  - Google Docs, Slides, Sheets and Drive files, Figma files, and PDF links show a preview.
  - Notion pages show inline only if they're published to the web (Share > Publish); otherwise there's an Open in Notion button.
  - Uploaded PDFs, images, video and audio display inline.
  - Uploaded Word, Excel and PowerPoint files preview through Microsoft's free Office web viewer, which is given a link to the file that expires after an hour.
  - Anything else gets Open or Download buttons.
- **Private files.** Uploads go to a private storage bucket. Only signed-in members can download them, through links that expire after 60 seconds. Members can delete their own uploads; admins can delete any.

Supabase itself can't host the site's pages (its storage serves `.html` as plain text), so the pages stay on GitHub Pages.

## One-time setup (about 15 minutes)

1. **Create a project** at [supabase.com](https://supabase.com) (the free plan is fine).
2. **Create the database tables and storage bucket.** Go to SQL Editor > New query, paste in all of [`supabase/schema.sql`](supabase/schema.sql), and click Run.
3. **Make it invite-only.** Go to Authentication > Sign In / Providers. Keep **Email** enabled and turn **off** "Allow new users to sign up".
4. **Tell Supabase where the site lives.** Go to Authentication > URL Configuration.
   - Site URL: the site's address, e.g. `https://canopi-work.github.io/Canopi-Repository-Hub/`
   - Redirect URLs: add the same address.
5. **(Optional) Set up email sending.** Skip this to run in no-email mode (see "Adding members"). Supabase's built-in email only sends to members of your Supabase team, and only a few emails per hour, so invites to regular staff won't arrive. Go to Authentication > Emails > SMTP Settings and enter your mail provider's SMTP details (for example Microsoft 365, Google Workspace, Resend, or SendGrid).
6. **Connect the site.** Go to Project Settings > API. Copy the **Project URL** and the **anon public** key into [`config.js`](config.js), then commit. The anon key is meant to be public; the database rules in `schema.sql` decide what people can do.

## Updating the database after a site update

If a site update changes `supabase/schema.sql`, open SQL Editor > New query, paste in the whole file again, and click Run. It's safe to re-run; existing documents are kept.

## Adding members

The site starts in **no-email mode** (`emailEnabled: false` in `config.js`): an admin creates each account and hands out a temporary password.

1. Go to Authentication > Users > **Add user** > **Create new user**.
2. Enter the member's email and a temporary password, tick **Auto Confirm User**, and click **Create user**.
3. Send them the site link, their email and the temporary password privately, for example in a Teams direct message.
4. They sign in and click **Change password** in the sidebar to choose their own.

To make the site *require* a new password at first sign-in (useful when several people share one temporary password), give the account the user metadata `{"must_change_password": true}`. Accounts created by SQL can set this in `raw_user_meta_data`.

**Resetting a forgotten password:** run this in the SQL Editor with their email and a new temporary password, then send it to them:

```sql
update auth.users
set encrypted_password = extensions.crypt('New-Temp-Password-123', extensions.gen_salt('bf')),
    updated_at = now()
where email = 'name@canopi.work';
```

To remove someone, delete them under Authentication > Users. Their uploads stay on the site.

**Turning on email later:** once SMTP is set up (step 5), set `emailEnabled: true` in `config.js`. Then "Email me a sign-in link", "Forgot password?" and email invites (Add user > Send invitation) all work.

## Admins

Admins can delete anyone's uploads. To make someone an admin, run this in the SQL Editor:

```sql
insert into public.admins (user_id)
select id from auth.users where email = 'name@canopi.work';
```

## Good to know

- **Uploads are private; the built-in pages are not fully private.** The sign-in screen hides the site, but the page text inside `app.js` and the template files in `files/` are still plain files on GitHub Pages. Anyone who knows their exact address can download them, and the GitHub repo itself is public. Uploaded documents don't have this problem. Don't add sensitive text to `app.js` or `files/`; upload it instead.
- **1:1 notes pages keep the Microsoft Forms "Contribute" button.** Uploads are visible to every member, and those notes must stay private to the two people involved.
- **File size:** up to 50 MB per file (the Supabase free-plan limit). Free plan storage is 1 GB in total.
