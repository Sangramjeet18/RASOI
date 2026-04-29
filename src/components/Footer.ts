export function Footer() {
  const footer = document.createElement('footer');
  footer.style.backgroundColor = 'var(--color-secondary)';
  footer.style.color = '#FFFFFF';
  footer.style.padding = '48px 0';
  footer.style.marginTop = 'auto';
  
  footer.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px;">
      <div>
        <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 16px;">RASOI.</h3>
        <p style="opacity: 0.8;">Ghar Jaisa Khana, Har Din.<br>Delivering the taste of home to your doorstep.</p>
      </div>
      <div>
        <h4 style="font-weight: 600; margin-bottom: 16px;">Quick Links</h4>
        <ul style="list-style: none; padding: 0; opacity: 0.8; line-height: 2;">
          <li><a href="#/">Home</a></li>
          <li><a href="#/menu">Weekly Menu</a></li>
          <li><a href="#/subscriptions">Meal Plans</a></li>
        </ul>
      </div>
      <div>
        <h4 style="font-weight: 600; margin-bottom: 16px;">Contact Us</h4>
        <ul style="list-style: none; padding: 0; opacity: 0.8; line-height: 2;">
          <li>support@rasoihome.com</li>
          <li>+91 98765 43210</li>
        </ul>
      </div>
    </div>
    <div class="container" style="margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; opacity: 0.6; font-size: 0.9rem;">
      &copy; ${new Date().getFullYear()} RASOI Home Meals. All rights reserved.
    </div>
  `;
  
  return footer;
}
