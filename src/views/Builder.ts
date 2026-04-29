export function Builder() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 64px;">
      <h1 style="font-size: 3rem; color: var(--color-secondary); margin-bottom: 16px;">Hearth Thali Builder</h1>
      <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem;">
        Customize your perfect meal. Choose your base, mains, and sides to create a thali that feels just like home.
      </p>
    </div>
    
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: start;">
      
      <!-- Selection Column -->
      <div style="display: flex; flex-direction: column; gap: 40px;">
        
        <!-- Step 1: Base -->
        <div>
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid var(--color-secondary-light); padding-bottom: 8px;">1. Select Your Base</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="glass-card" style="padding: 16px; border: 2px solid var(--color-primary); cursor: pointer;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Steamed Basmati Rice</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Classic, fragrant, light.</p>
            </div>
            <div class="glass-card" style="padding: 16px; cursor: pointer; opacity: 0.7;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Whole Wheat Roti (3 pcs)</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Soft, hot, brushed with ghee.</p>
            </div>
          </div>
        </div>
        
        <!-- Step 2: Mains -->
        <div>
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid var(--color-secondary-light); padding-bottom: 8px;">2. Choose Your Mains (Pick 2)</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="glass-card" style="padding: 16px; cursor: pointer; opacity: 0.7;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Yellow Dal Tadka</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Comforting lentil soup.</p>
            </div>
            <div class="glass-card" style="padding: 16px; border: 2px solid var(--color-primary); cursor: pointer;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Aloo Gobi</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Dry spiced potato & cauliflower.</p>
            </div>
            <div class="glass-card" style="padding: 16px; border: 2px solid var(--color-primary); cursor: pointer;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Palak Paneer</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Spinach gravy with cottage cheese.</p>
            </div>
            <div class="glass-card" style="padding: 16px; cursor: pointer; opacity: 0.7;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Rajma Masala</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Red kidney beans in rich gravy.</p>
            </div>
          </div>
        </div>
        
        <!-- Step 3: Sides -->
        <div>
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid var(--color-secondary-light); padding-bottom: 8px;">3. Pick Your Sides</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
             <div class="glass-card" style="padding: 16px; border: 2px solid var(--color-primary); cursor: pointer;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Cucumber Raita</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Cooling yogurt dip.</p>
            </div>
            <div class="glass-card" style="padding: 16px; cursor: pointer; opacity: 0.7;">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Kachumber Salad</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Fresh chopped veggie mix.</p>
            </div>
          </div>
        </div>
        
      </div>
      
      <!-- Summary Column -->
      <div class="glass-card" style="padding: 32px; position: sticky; top: 100px;">
        <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px;">Your Thali</h3>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
          <span>Base: Steamed Basmati Rice</span>
          <span>₹60</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
          <span>Main 1: Aloo Gobi</span>
          <span>₹90</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
          <span>Main 2: Palak Paneer</span>
          <span>₹120</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
          <span>Side: Cucumber Raita</span>
          <span>₹40</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: bold; margin-bottom: 32px;">
          <span>Total</span>
          <span style="color: var(--color-primary);">₹310</span>
        </div>
        
        <button class="btn-primary" style="width: 100%;" onclick="window.location.hash='#/checkout'">Proceed to Checkout</button>
      </div>
      
    </div>
  `;
  
  return container;
}
