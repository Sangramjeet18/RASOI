export function Subscriptions() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  container.innerHTML = `
    <div style="text-align:center;margin-bottom:64px;position:relative;">
      <div style="position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:120px;height:4px;background:linear-gradient(90deg,transparent,var(--color-secondary),transparent);border-radius:2px;"></div>
      <span style="display:inline-block;font-size:0.8rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--color-secondary);margin-bottom:12px;background:rgba(31,77,43,0.06);padding:6px 16px;border-radius:20px;">🏡 MEAL PLANS</span>
      <h1 style="font-family:'Playfair Display',serif;font-size:3.2rem;color:var(--color-secondary);margin-bottom:16px;font-weight:700;letter-spacing:-0.5px;" data-translate="subTitle">A Seat at Our Table</h1>
      <p style="color:var(--color-text-muted);max-width:600px;margin:0 auto;font-size:1.1rem;line-height:1.7;" data-translate="subDesc">
        Choose a subscription plan that fits your lifestyle. Enjoy the warmth of home-cooked meals every day without the hassle.
      </p>
      <div style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);width:80px;height:4px;background:linear-gradient(90deg,transparent,var(--color-primary),transparent);border-radius:2px;"></div>
    </div>
    
    <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; align-items: stretch;">
      
      <!-- Plan 1: Weekly -->
      <div class="glass-card" style="padding: 40px; max-width: 380px; width: 100%; border-top: 6px solid var(--color-secondary); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1);" onmouseenter="this.style.transform='translateY(-8px)';this.style.boxShadow='0 20px 56px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='translateY(0)';this.style.boxShadow=''">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--color-secondary); margin-bottom: 8px;" data-translate="weeklyRitual">Weekly Ritual</h2>
        <div style="display: flex; align-items: baseline; margin-bottom: 24px;">
          <span style="font-size: 2.5rem; font-weight: 700; color: var(--color-text-main);">₹799</span>
          <span style="color: var(--color-text-muted); margin-left: 8px;" data-translate="perWeek">/ week</span>
        </div>
        <p style="color: var(--color-text-muted); margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.06); line-height: 1.6;" data-translate="weeklyDesc">
          Perfect for trying out our meals or a busy week ahead.
        </p>
        
        <ul style="list-style: none; padding: 0; margin-bottom: 40px;">
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold; font-size: 1.1rem;">✓</span> <span data-translate="sevenMeals">7 daily meals</span>
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold; font-size: 1.1rem;">✓</span> <span data-translate="freeDelivery">Free delivery</span>
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold; font-size: 1.1rem;">✓</span> <span data-translate="skipDay">Skip a day anytime</span>
          </li>
        </ul>
        
        <button class="btn-primary" style="width: 100%;" onclick="window.location.hash='#/subscribe/weekly'" data-translate="selectWeekly">Select Weekly</button>
      </div>
      
      <!-- Plan 2: Monthly (MOST POPULAR) -->
      <div class="glass-card" style="padding: 40px; max-width: 400px; width: 100%; border-top: 6px solid var(--color-primary); transform: scale(1.04); box-shadow: 0 20px 60px rgba(217, 108, 74, 0.15), 0 0 0 1px rgba(217, 108, 74, 0.08); position: relative; overflow: visible; transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1);" onmouseenter="this.style.transform='scale(1.06) translateY(-8px)';this.style.boxShadow='0 28px 72px rgba(217, 108, 74, 0.22), 0 0 0 1px rgba(217, 108, 74, 0.12)'" onmouseleave="this.style.transform='scale(1.04)';this.style.boxShadow='0 20px 60px rgba(217, 108, 74, 0.15), 0 0 0 1px rgba(217, 108, 74, 0.08)'">
        <div style="background: linear-gradient(135deg, var(--color-primary) 0%, #E07A4C 100%); color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; display: inline-block; margin-bottom: 16px; letter-spacing: 0.8px; box-shadow: 0 4px 12px rgba(217, 107, 59, 0.3);" data-translate="mostPopular">MOST POPULAR</div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--color-secondary); margin-bottom: 8px;" data-translate="monthlyComfort">Monthly Comfort</h2>
        <div style="display: flex; align-items: baseline; margin-bottom: 24px;">
          <span style="font-size: 2.5rem; font-weight: 700; color: var(--color-text-main);">₹2,999</span>
          <span style="color: var(--color-text-muted); margin-left: 8px;" data-translate="perMonth">/ month</span>
        </div>
        <p style="color: var(--color-text-muted); margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.06); line-height: 1.6;" data-translate="monthlyDesc">
          Become part of the family with our comprehensive monthly plan.
        </p>
        
        <ul style="list-style: none; padding: 0; margin-bottom: 40px;">
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold; font-size: 1.1rem;">✓</span> <span data-translate="thirtyMeals">30 daily meals</span>
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold; font-size: 1.1rem;">✓</span> <span data-translate="priorityDelivery">Priority delivery slots</span>
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold; font-size: 1.1rem;">✓</span> <span data-translate="twoSpecialThalis">2 complimentary special weekend thalis</span>
          </li>
          <li style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
            <span style="color: var(--color-primary); font-weight: bold; font-size: 1.1rem;">✓</span> <span data-translate="pauseAnytime">Pause subscription anytime</span>
          </li>
        </ul>
        
        <button class="btn-secondary" style="width: 100%;" onclick="window.location.hash='#/subscribe/monthly'" data-translate="selectMonthly">Select Monthly</button>
      </div>
      
    </div>
  `;
  
  return container;
}
