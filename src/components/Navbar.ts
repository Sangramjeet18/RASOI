export function Navbar() {
  const nav = document.createElement('nav');
  nav.style.backgroundColor = '#FFFFFF';
  nav.style.padding = '16px 24px';
  nav.style.position = 'sticky';
  nav.style.top = '0';
  nav.style.zIndex = '100';
  nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
  
  nav.innerHTML = `
    <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
      <a href="#/" style="font-size: 1.5rem; font-weight: 700; color: var(--color-secondary); letter-spacing: 1px;">
        RASOI.
      </a>
      
      <div style="display: flex; gap: 32px; align-items: center; font-weight: 500;">
        <a href="#/" style="color: var(--color-text-main);">Home</a>
        <a href="#/menu" style="color: var(--color-text-main);">Menu</a>
        <a href="#/subscriptions" style="color: var(--color-text-main);">Subscriptions</a>
        <a href="#/builder" style="color: var(--color-text-main);">Thali Builder</a>
      </div>
      
      <div style="display: flex; gap: 16px; align-items: center;">
        <select style="padding: 8px; border-radius: 6px; border: 1px solid #ddd; background: transparent; font-family: inherit; font-weight: 500; cursor: pointer; outline: none;" onchange="alert('Language changed to ' + this.value)">
          <option value="English">English</option>
          <option value="Bengali">বাংলা (Bengali)</option>
          <option value="Hindi">हिंदी (Hindi)</option>
          <option value="Urdu">اردو (Urdu)</option>
          <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
          <option value="Odia">ଓଡ଼ିଆ (Odia)</option>
          <option value="Tamil">தமிழ் (Tamil)</option>
        </select>
        <button class="btn-secondary" onclick="window.location.hash='#/checkout'">Cart</button>
        <button class="btn-primary" onclick="window.location.hash='#/signin'">Sign In</button>
      </div>
    </div>
  `;
  
  return nav;
}
