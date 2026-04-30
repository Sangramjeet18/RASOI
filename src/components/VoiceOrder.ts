export function VoiceOrder() {
  const container = document.createElement('div');
  
  // Floating Action Button
  const fab = document.createElement('button');
  fab.style.position = 'fixed';
  fab.style.bottom = '32px';
  fab.style.right = '32px';
  fab.style.width = '64px';
  fab.style.height = '64px';
  fab.style.borderRadius = '50%';
  fab.style.display = 'flex';
  fab.style.alignItems = 'center';
  fab.style.justifyContent = 'center';
  // Orange gradient and soft glow
  fab.style.background = 'linear-gradient(135deg, #FF8A50 0%, var(--color-primary) 100%)';
  fab.style.boxShadow = '0 8px 24px rgba(217, 107, 59, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)';
  fab.style.color = 'white';
  fab.style.border = 'none';
  fab.style.cursor = 'pointer';
  fab.style.transition = 'all 0.3s ease';
  fab.style.zIndex = '1000';
  
  fab.onmouseover = () => {
    fab.style.transform = 'translateY(-3px) scale(1.05)';
    fab.style.boxShadow = '0 12px 30px rgba(217, 107, 59, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)';
  };
  fab.onmouseout = () => {
    fab.style.transform = 'none';
    fab.style.boxShadow = '0 8px 24px rgba(217, 107, 59, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)';
  };
  
  // Microphone SVG
  fab.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `;

  // Overlay Modal
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.backdropFilter = 'blur(8px)';
  overlay.style.zIndex = '2000';
  overlay.style.display = 'none';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = 'white';
  
  // Listening UI
  overlay.innerHTML = `
    <div style="width: 100px; height: 100px; border-radius: 50%; background-color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin-bottom: 32px; animation: pulse 1.5s infinite;">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      </svg>
    </div>
    <h2 style="font-size: 2.5rem; margin-bottom: 16px;" id="voice-text">Listening...</h2>
    <p style="color: #aaa; font-size: 1.2rem; max-width: 400px; text-align: center;">Try saying "Add 2 Kosha Mangsho Thalis to my cart"</p>
    <button class="btn-secondary" style="margin-top: 48px; background-color: transparent; border: 1px solid white;" id="close-voice">Cancel</button>
  `;

  // Add keyframe animation for pulse to document head if not exists
  if (!document.getElementById('voice-pulse-style')) {
    const style = document.createElement('style');
    style.id = 'voice-pulse-style';
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(217, 108, 74, 0.7); }
        70% { transform: scale(1.1); box-shadow: 0 0 0 30px rgba(217, 108, 74, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(217, 108, 74, 0); }
      }
    `;
    document.head.appendChild(style);
  }

  // Interactivity
  fab.addEventListener('click', () => {
    overlay.style.display = 'flex';
    const textNode = overlay.querySelector('#voice-text')!;
    textNode.textContent = 'Listening...';
    
    // Simulate speech recognition
    setTimeout(() => {
      textNode.textContent = '"I understood: Add 1 Kosha Mangsho Thali..."';
      
      setTimeout(() => {
        alert('Kosha Mangsho Thali added to cart via Voice Order!');
        overlay.style.display = 'none';
      }, 2000);
      
    }, 2500);
  });

  const closeBtn = overlay.querySelector('#close-voice')!;
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  container.appendChild(fab);
  container.appendChild(overlay);
  
  return container;
}
