export function Home() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';
  
  // Create a full-screen hero wrapper
  const heroWrapper = document.createElement('div');
  heroWrapper.style.position = 'relative';
  heroWrapper.style.width = '100%';
  heroWrapper.style.minHeight = '100vh';
  heroWrapper.style.display = 'flex';
  heroWrapper.style.overflow = 'hidden';
  heroWrapper.style.backgroundColor = 'var(--color-background)'; // Warm beige background
  
  // Add a soft texture/gradient over the left side to simulate the window shadows/sunlight
  const shadowOverlay = document.createElement('div');
  shadowOverlay.style.position = 'absolute';
  shadowOverlay.style.inset = '0';
  shadowOverlay.style.background = 'radial-gradient(ellipse at 10% 20%, rgba(255, 250, 240, 0.4) 0%, transparent 60%), linear-gradient(135deg, rgba(200,160,120,0.1) 0%, transparent 40%)';
  shadowOverlay.style.pointerEvents = 'none';
  heroWrapper.appendChild(shadowOverlay);

  // Left Content Area
  const leftSide = document.createElement('div');
  leftSide.style.flex = '1';
  leftSide.style.padding = '0 0 0 80px'; 
  leftSide.style.display = 'flex';
  leftSide.style.flexDirection = 'column';
  leftSide.style.justifyContent = 'center';
  leftSide.style.position = 'relative';
  leftSide.style.zIndex = '10';
  
  // Right Side Image with Diagonal Split
  const rightSide = document.createElement('div');
  rightSide.style.width = '60%';
  rightSide.style.position = 'absolute';
  rightSide.style.top = '0';
  rightSide.style.right = '0';
  rightSide.style.bottom = '0';
  rightSide.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)';
  // Use the newly generated premium image
  rightSide.style.backgroundImage = 'url("/assets/hero_premium.png")';
  rightSide.style.backgroundSize = 'cover';
  rightSide.style.backgroundPosition = 'center';
  
  // Subtle dark overlay + soft glow on the right side
  const rightOverlay = document.createElement('div');
  rightOverlay.style.position = 'absolute';
  rightOverlay.style.inset = '0';
  rightOverlay.style.background = 'linear-gradient(to right, rgba(245, 233, 218, 0.4) 0%, transparent 30%), radial-gradient(circle at 60% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)';
  rightOverlay.style.boxShadow = 'inset 20px 0 40px rgba(0,0,0,0.05)';
  rightSide.appendChild(rightOverlay);

  // Adding subtle CSS animation for "steam" effect over the image
  const steam = document.createElement('div');
  steam.style.position = 'absolute';
  steam.style.width = '300px';
  steam.style.height = '300px';
  steam.style.background = 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)';
  steam.style.top = '40%';
  steam.style.left = '50%';
  steam.style.filter = 'blur(20px)';
  steam.style.pointerEvents = 'none';
  // Add inline keyframe animation for steam
  steam.innerHTML = `<style>
    @keyframes rise {
      0% { transform: translateY(0) scale(1); opacity: 0.5; }
      50% { transform: translateY(-20px) scale(1.1); opacity: 0.8; }
      100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
    }
  </style>`;
  steam.style.animation = 'rise 4s infinite ease-in-out';
  rightSide.appendChild(steam);

  // --- Left Side Content ---
  leftSide.innerHTML = `
    <div style="max-width: 500px; transform: translateZ(0); filter: drop-shadow(0 10px 20px rgba(0,0,0,0.02));">
      <h1 style="font-size: 4.8rem; font-weight: 800; line-height: 1.05; margin-bottom: 24px; letter-spacing: -1.5px;">
        <span style="color: var(--color-secondary); display: block; filter: drop-shadow(0 2px 4px rgba(31,77,43,0.1));" data-translate="gharJaisa">Ghar Jaisa Khana,</span>
        <span style="color: var(--color-primary); display: block; filter: drop-shadow(0 2px 4px rgba(217,107,59,0.1));" data-translate="harDin">Har Din.</span>
      </h1>
      <p style="font-size: 1.15rem; color: var(--color-text-muted); margin-bottom: 48px; font-weight: 400; line-height: 1.6; letter-spacing: 0.2px;" data-translate="subtext">
        Experience the comforting taste of home-cooked<br>
        meals, crafted with love and delivered to your<br>
        doorstep every day.
      </p>
      <div style="display: flex; gap: 20px; margin-bottom: 72px;">
        <button class="btn-primary" onclick="window.location.hash='#/menu'" data-translate="exploreMenu">Explore Menu</button>
        <button class="btn-secondary" onclick="window.location.hash='#/subscriptions'" data-translate="viewPlans">View Plans</button>
      </div>
      
      <div style="display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.4); padding: 12px 20px; border-radius: 40px; width: fit-content; box-shadow: 0 4px 16px rgba(0,0,0,0.03); backdrop-filter: blur(8px);">
        <div style="display: flex; align-items: center;">
          <img src="https://i.pravatar.cc/100?img=47" alt="Customer" style="width: 36px; height: 36px; border-radius: 50%; border: 3px solid #FFF; z-index: 3; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <img src="https://i.pravatar.cc/100?img=11" alt="Customer" style="width: 36px; height: 36px; border-radius: 50%; border: 3px solid #FFF; transform: translateX(-12px); z-index: 2; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <img src="https://i.pravatar.cc/100?img=68" alt="Customer" style="width: 36px; height: 36px; border-radius: 50%; border: 3px solid #FFF; transform: translateX(-24px); z-index: 1; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        </div>
        <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-left: -16px; font-weight: 500;" data-translate="happyCustomers">
          <strong style="color: var(--color-text-main);">10,000+</strong> happy customers missing home less.
        </p>
      </div>
    </div>
  `;

  // Pattern at bottom left - Terracotta Alpona-style
  const pattern = document.createElement('div');
  pattern.style.position = 'absolute';
  pattern.style.bottom = '40px';
  pattern.style.left = '80px';
  pattern.style.width = '300px';
  pattern.style.height = '30px';
  pattern.style.opacity = '0.15';
  pattern.innerHTML = `
    <svg width="100%" height="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="alpona-pattern" x="0" y="0" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M20,0 Q30,15 20,30 Q10,15 20,0 Z" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
          <circle cx="20" cy="15" r="3" fill="var(--color-primary)" />
          <circle cx="20" cy="15" r="8" fill="none" stroke="var(--color-primary)" stroke-width="1" />
          <path d="M0,15 L40,15" stroke="var(--color-primary)" stroke-width="0.5" stroke-dasharray="2,2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#alpona-pattern)" />
    </svg>
  `;
  leftSide.appendChild(pattern);

  heroWrapper.appendChild(leftSide);
  heroWrapper.appendChild(rightSide);
  
  container.appendChild(heroWrapper);
  
  // Apply translations to the dynamically created content once mounted
  setTimeout(() => {
    const savedLang = localStorage.getItem('lang') || 'English';
    import('../i18n/translations').then(({ applyTranslations }) => {
      applyTranslations(savedLang);
    });
  }, 0);
  
  return container;
}
