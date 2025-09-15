const SUPABASE_URL = 'https://fbgvvaksqmkgksqqumwy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ3Z2YWtzcW1rZ2tzcXF1bXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MzA2MTEsImV4cCI6MjA3MzIwNjYxMX0.ZdNUG4mPgLxOXhQ8hv-Dt74OnAjq1XyiCWo5vyrpGqk'
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

let currentUser = null;
let isApprovedMember = false;

// Shared authentication functions
async function checkAuthStatus() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
        currentUser = session.user;
        await checkMembershipStatus();
    }
}

async function checkMembershipStatus() {
    if (!currentUser) return;
    
    const { data, error } = await supabase
        .from('approved_members')
        .select('*')
        .eq('email', currentUser.email)
        .single();
    
    isApprovedMember = !error && data;
}