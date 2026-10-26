// Canopi Repository — sign-in. Keeps the whole site behind a Supabase login
// and hands app.js the signed-in client through window.CanopiAuth.
// Accounts are invite-only: members are added from the Supabase dashboard.
(() => {
  'use strict';

  const cfg = window.CANOPI_CONFIG || {};
  const screenEl = document.getElementById('auth-screen');
  const bodyEl = document.getElementById('auth-body');
  const shellEl = document.querySelector('.shell');
  const readyCallbacks = [];
  let started = false;

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function redirectUrl() { return location.origin + location.pathname; }

  if (!window.supabase || !cfg.supabaseUrl || cfg.supabaseUrl.indexOf('YOUR-PROJECT') !== -1) {
    bodyEl.innerHTML = '<p class="auth-error">Sign-in isn&rsquo;t set up yet. Add the Supabase project URL and anon key to <code>config.js</code>.</p>';
    return;
  }

  // Invite, password-reset and magic-link emails come back as
  // "#access_token=...&type=invite|recovery|magiclink" (or "#error=..." when the
  // link has expired). Read it before supabase-js consumes the hash.
  const hashParams = new URLSearchParams(location.hash.slice(1));
  const linkType = hashParams.get('access_token') ? hashParams.get('type') : null;
  const linkError = hashParams.get('error_description');

  const client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);

  function startApp(session) {
    screenEl.hidden = true;
    shellEl.hidden = false;
    if (started) return;
    started = true;
    if (linkType || linkError) history.replaceState(null, '', redirectUrl() + '#home');
    readyCallbacks.forEach((cb) => cb(session));
  }

  function showScreen(html) {
    shellEl.hidden = true;
    screenEl.hidden = false;
    bodyEl.innerHTML = html;
  }

  function setMessage(text, isError) {
    const el = document.getElementById('auth-message');
    el.className = isError ? 'auth-error' : 'auth-note';
    el.textContent = text;
  }

  function setBusy(form, busy) {
    form.querySelectorAll('button, input').forEach((el) => { el.disabled = busy; });
  }

  function showSignIn(message, isError) {
    showScreen(
      '<form id="auth-form" class="auth-form">' +
        '<p class="auth-note">Sign in with your Canopi account.</p>' +
        '<label class="field"><span>Email</span><input type="email" name="email" autocomplete="email" required></label>' +
        '<label class="field"><span>Password</span><input type="password" name="password" autocomplete="current-password"></label>' +
        '<p id="auth-message" class="auth-note"></p>' +
        '<button type="submit" class="btn btn-primary btn-block">Sign in</button>' +
        '<div class="auth-links">' +
          '<button type="button" class="link-button" data-auth-action="magic">Email me a sign-in link</button>' +
          '<button type="button" class="link-button" data-auth-action="reset">Forgot password?</button>' +
        '</div>' +
      '</form>'
    );
    const form = document.getElementById('auth-form');
    if (message) setMessage(message, isError);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const password = form.password.value;
      if (!password) { setMessage('Enter your password, or use “Email me a sign-in link”.', true); return; }
      setBusy(form, true);
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      setBusy(form, false);
      if (error) { setMessage(error.message === 'Invalid login credentials' ? 'That email and password don’t match.' : error.message, true); return; }
      startApp(data.session);
    });

    form.addEventListener('click', async (e) => {
      const action = e.target.getAttribute('data-auth-action');
      if (!action) return;
      const email = form.email.value.trim();
      if (!email || !form.email.checkValidity()) { setMessage('Enter your email address first.', true); form.email.focus(); return; }
      setBusy(form, true);
      const { error } = action === 'magic'
        ? await client.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: redirectUrl() } })
        : await client.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl() });
      setBusy(form, false);
      // Unknown emails get the same answer as known ones, so the form doesn't reveal who has an account.
      if (error && error.status === 429) { setMessage('Too many emails requested. Wait a few minutes and try again.', true); return; }
      setMessage(action === 'magic'
        ? 'If ' + email + ' has an account, a sign-in link is on its way.'
        : 'If ' + email + ' has an account, a password reset link is on its way.', false);
    });
  }

  function showSetPassword(session, isInvite) {
    showScreen(
      '<form id="auth-form" class="auth-form">' +
        '<p class="auth-note">' + (isInvite ? 'Welcome! Choose a password for ' : 'Choose a new password for ') + escapeHtml(session.user.email) + '.</p>' +
        '<label class="field"><span>New password</span><input type="password" name="password" autocomplete="new-password" minlength="8" required></label>' +
        '<label class="field"><span>Confirm password</span><input type="password" name="confirm" autocomplete="new-password" minlength="8" required></label>' +
        '<p id="auth-message" class="auth-note">At least 8 characters.</p>' +
        '<button type="submit" class="btn btn-primary btn-block">Save password</button>' +
      '</form>'
    );
    const form = document.getElementById('auth-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.password.value !== form.confirm.value) { setMessage('The two passwords don’t match.', true); return; }
      setBusy(form, true);
      const { error } = await client.auth.updateUser({ password: form.password.value });
      setBusy(form, false);
      if (error) { setMessage(error.message, true); return; }
      startApp(session);
    });
  }

  client.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') showSignIn('You’ve been signed out.', false);
    else if (event === 'PASSWORD_RECOVERY' && session) showSetPassword(session, false);
  });

  client.auth.getSession().then(({ data }) => {
    const session = data.session;
    if (linkError && !session) showSignIn('That link has expired or was already used. Request a new one below.', true);
    else if (!session) showSignIn();
    else if (linkType === 'invite' || linkType === 'recovery') showSetPassword(session, linkType === 'invite');
    else startApp(session);
  });

  window.CanopiAuth = {
    client,
    onReady(cb) { readyCallbacks.push(cb); },
    signOut() { return client.auth.signOut(); },
  };
})();
