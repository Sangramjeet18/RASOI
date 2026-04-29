export function Subscriptions() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 64px;">
      <h1 style="font-size: 3rem; color: var(--color-secondary); margin-bottom: 16px;">A Seat at Our Table</h1>
      <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem;">
        Choose a subscription plan that fits your lifestyle. Enjoy the warmth of home-cooked meals every day without the hassle.
      </p>
    </div>
    
    <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
      
      <!-- Plan 1 -->
      <div class="glass-card" style="padding: 40px; max-width: 380px; width: 100%; border-top: 6px solid var(--color-secondary);">
        <h2 style="font-size: 1.8rem; color: var(--color-secondary); margin-bottom: 8px;">Weekly Ritual</h2>
        <div style="display: flex; align-items: baseline; margin-bottom: 24px;">
          <span style="font-size: 2.5rem; font-weight: 700;">₹1,299</span>
          <span style="color: var(--color-text-muted); margin-left: 8px;">/ week</span>
        </div>
        <p style="color: var(--color-text-muted); margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.1);">
          Perfect for trying out our meals or a busy week ahead.
        </p>
        
        <ul style="list-style: none; padding: 0; margin-bottom: 40px;">
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold;">✓</span> 7 daily meals
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold;">✓</span> Free delivery
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold;">✓</span> Skip a day anytime
          </li>
        </ul>
        
        <button class="btn-primary" style="width: 100%;">Select Weekly</button>
      </div>
      
      <!-- Plan 2 -->
      <div class="glass-card" style="padding: 40px; max-width: 380px; width: 100%; border-top: 6px solid var(--color-primary); transform: scale(1.05); box-shadow: 0 16px 40px rgba(217, 108, 74, 0.15);">
        <div style="background-color: var(--color-primary); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; display: inline-block; margin-bottom: 16px;">MOST POPULAR</div>
        <h2 style="font-size: 1.8rem; color: var(--color-secondary); margin-bottom: 8px;">Monthly Comfort</h2>
        <div style="display: flex; align-items: baseline; margin-bottom: 24px;">
          <span style="font-size: 2.5rem; font-weight: 700;">₹4,999</span>
          <span style="color: var(--color-text-muted); margin-left: 8px;">/ month</span>
        </div>
        <p style="color: var(--color-text-muted); margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.1);">
          Become part of the family with our comprehensive monthly plan.
        </p>
        
        <ul style="list-style: none; padding: 0; margin-bottom: 40px;">
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold;">✓</span> 30 daily meals
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold;">✓</span> Priority delivery slots
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold;">✓</span> 2 complimentary special weekend thalis
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold;">✓</span> Pause subscription anytime
          </li>
        </ul>
        
        <button class="btn-primary" style="width: 100%; background-color: var(--color-secondary);">Select Monthly</button>
      </div>
      
    </div>
  `;
  
  return container;
}
