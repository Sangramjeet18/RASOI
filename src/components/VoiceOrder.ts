export function VoiceOrder() {
  const container = document.createElement('div');
  
  // Floating Chef Sticker Button
  const fab = document.createElement('button');
  fab.style.cssText = `
    position:fixed;bottom:28px;right:28px;width:72px;height:72px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;padding:0;
    background:linear-gradient(145deg,#FFF8F0 0%,#FFE8D6 100%);
    box-shadow:0 6px 24px rgba(139,94,60,0.25),0 0 0 3px rgba(255,255,255,0.6),inset 0 2px 4px rgba(255,255,255,0.8);
    border:2px solid rgba(217,107,59,0.15);cursor:pointer;
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1);z-index:1000;overflow:hidden;
  `;
  
  if (!document.getElementById('chef-fab-style')) {
    const s = document.createElement('style');
    s.id = 'chef-fab-style';
    s.innerHTML = `
      @keyframes chefBounce { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-3px) rotate(-2deg)} 75%{transform:translateY(-3px) rotate(2deg)} }
      @keyframes chefGlow { 0%,100%{box-shadow:0 6px 24px rgba(139,94,60,0.25),0 0 0 3px rgba(255,255,255,0.6)} 50%{box-shadow:0 8px 28px rgba(139,94,60,0.3),0 0 0 6px rgba(217,107,59,0.08)} }
    `;
    document.head.appendChild(s);
  }
  fab.style.animation = 'chefBounce 3s ease-in-out infinite, chefGlow 2.5s ease-in-out infinite';
  
  fab.onmouseover = () => {
    fab.style.transform = 'translateY(-6px) scale(1.12)';
    fab.style.animation = 'none';
    fab.style.boxShadow = '0 12px 36px rgba(139,94,60,0.35),0 0 0 4px rgba(217,107,59,0.12)';
  };
  fab.onmouseout = () => {
    fab.style.transform = 'none';
    fab.style.animation = 'chefBounce 3s ease-in-out infinite, chefGlow 2.5s ease-in-out infinite';
  };
  
  // Chef sticker image
  fab.innerHTML = `<img src="/assets/chef_sticker.png" alt="Chef" style="width:58px;height:58px;object-fit:contain;border-radius:50%;pointer-events:none;">`;

  // Tooltip on hover
  const tooltip = document.createElement('div');
  tooltip.style.cssText = `
    position:fixed;bottom:108px;right:28px;background:#2D2A26;color:#fff;
    padding:8px 14px;border-radius:10px;font-size:0.78rem;font-weight:600;
    white-space:nowrap;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:1001;
    box-shadow:0 4px 12px rgba(0,0,0,0.15);
  `;
  tooltip.textContent = '🎙️ Voice Order';
  fab.onmouseover = () => { tooltip.style.opacity = '1'; fab.style.transform = 'translateY(-6px) scale(1.12)'; fab.style.animation = 'none'; };
  fab.onmouseout = () => { tooltip.style.opacity = '0'; fab.style.transform = 'none'; fab.style.animation = 'chefBounce 3s ease-in-out infinite, chefGlow 2.5s ease-in-out infinite'; };

  // Overlay Modal
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100vw;height:100vh;
    background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);z-index:2000;
    display:none;flex-direction:column;align-items:center;justify-content:center;color:white;
  `;
  
  if (!document.getElementById('voice-pulse-style')) {
    const style = document.createElement('style');
    style.id = 'voice-pulse-style';
    style.innerHTML = `@keyframes pulse{0%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(217,108,74,0.7)}70%{transform:scale(1.1);box-shadow:0 0 0 30px rgba(217,108,74,0)}100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(217,108,74,0)}}`;
    document.head.appendChild(style);
  }

  overlay.innerHTML = `
    <img src="/assets/chef_sticker.png" style="width:120px;height:120px;border-radius:50%;margin-bottom:24px;animation:pulse 1.5s infinite;box-shadow:0 0 0 0 rgba(217,108,74,0.7)">
    <h2 style="font-size:2.5rem;margin-bottom:16px;font-family:'Playfair Display',serif" id="voice-text">Listening...</h2>
    <p style="color:#aaa;font-size:1.1rem;max-width:400px;text-align:center">Try saying "Add 2 Kosha Mangsho Thalis to my cart"</p>
    <button class="btn-secondary" style="margin-top:48px;background:transparent;border:1px solid white" id="close-voice">Cancel</button>
  `;

  fab.addEventListener('click', () => {
    overlay.style.display = 'flex';
    const t = overlay.querySelector('#voice-text')!;
    t.textContent = 'Listening...';
    setTimeout(() => {
      t.textContent = '"I understood: Add 1 Kosha Mangsho Thali..."';
      setTimeout(() => { alert('Kosha Mangsho Thali added to cart via Voice Order!'); overlay.style.display = 'none'; }, 2000);
    }, 2500);
  });

  overlay.querySelector('#close-voice')!.addEventListener('click', () => { overlay.style.display = 'none'; });

  container.appendChild(fab);
  container.appendChild(tooltip);
  container.appendChild(overlay);
  return container;
}
