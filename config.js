// Supabase project settings. Find both values in the Supabase dashboard under
// Project Settings > API. The anon key is meant to be public — what members can
// see and do is enforced by the row-level security in supabase/schema.sql.
window.CANOPI_CONFIG = {
  supabaseUrl: 'https://fyhlwxmmgndpnennqjby.supabase.co',
  // Set to true once Supabase can send email (Authentication > Emails > SMTP Settings).
  // While false, the sign-in screen hides "Email me a sign-in link" and "Forgot password?"
  // and tells members to ask an admin instead.
  emailEnabled: false,
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5aGx3eG1tZ25kcG5lbm5xamJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMDc4OTIsImV4cCI6MjEwODU4Mzg5Mn0.gfY41wqkhAOpFO8_N2_xBpIQwFzIgIKSWmdqg8RTAmI',
};
