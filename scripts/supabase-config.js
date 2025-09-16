// Supabase configuration - shared across all pages
const SUPABASE_URL = 'https://fbgvvaksqmkgksqqumwy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ3Z2YWtzcW1rZ2tzcXF1bXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MzA2MTEsImV4cCI6MjA3MzIwNjYxMX0.ZdNUG4mPgLxOXhQ8hv-Dt74OnAjq1XyiCWo5vyrpGqk'
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Shared authentication functions

async function checkAuthStatus() {
    const { data: { session } } = await supabase.auth.getSession()
    return session;
}

async function checkMembershipStatus(userEmail) {
    const normalized = (userEmail || '').trim();
    if (!normalized) {
        return { ok: true, data: null };
    }

    try {
        const { data, error } = await supabase
            .from('approved_members')
            .select('*')
            .ilike('email', normalized)
            .maybeSingle();

        if (error) {
            return { ok: false, error };
        }
        return { ok: true, data };
    } catch (err) {
        return { ok: false, error: err };
    }
}