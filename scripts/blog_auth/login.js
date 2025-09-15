import '../supabase-config.js'


//check if logged in, if so go to admin page
document.addEventListener('DOMContentLoaded', async function() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        window.location.href = 'blog-admin.html';
    }
});


//login form submission
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');

    // Update button state
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            throw error;
        }

        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to blog admin page after successful login
        setTimeout(() => {
            window.location.href = 'blog-admin.html';
        }, 1500);

    } catch (error) {
        showMessage('Login failed: ' + error.message, 'error');
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
    }
});

// Show message to user
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class="message ${type}">${message}</div>`;
    
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 3000);
    }
}