export function SignIn() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.minHeight = 'calc(100vh - 200px)';
  
  container.innerHTML = `
    <div class="glass-card" style="padding: 48px; max-width: 480px; width: 100%;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 2.5rem; color: var(--color-secondary); letter-spacing: 1px; margin-bottom: 8px;">RASOI.</h1>
        <p style="color: var(--color-text-muted);">Welcome back! Please sign in to your account.</p>
      </div>
      
      <form onsubmit="event.preventDefault(); alert('Sign In functionality coming soon! Returning to Home.'); window.location.hash='#/';">
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 8px;">Email Address</label>
          <input type="email" required placeholder="hello@example.com" style="width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 24px;">
          <label style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 8px;">
            <span>Password</span>
            <a href="#" style="color: var(--color-primary); text-decoration: underline;">Forgot Password?</a>
          </label>
          <input type="password" required placeholder="••••••••" style="width: 100%; padding: 14px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1rem;">
        </div>
        
        <div style="margin-bottom: 32px; display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" id="remember" style="width: 16px; height: 16px; accent-color: var(--color-primary);">
          <label for="remember" style="font-size: 0.9rem; color: var(--color-text-muted);">Remember me</label>
        </div>
        
        <button type="submit" class="btn-primary" style="width: 100%; font-size: 1.1rem; padding: 16px;">Sign In</button>
      </form>
      
      <div style="margin-top: 32px; text-align: center; font-size: 0.9rem; color: var(--color-text-muted);">
        Don't have an account? <a href="#" style="color: var(--color-primary); font-weight: 600; text-decoration: underline;">Sign up here</a>
      </div>
    </div>
  `;
  
  return container;
}
