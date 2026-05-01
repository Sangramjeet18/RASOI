import { applyTranslations } from '../i18n/translations';

export function Navbar() {
  const nav = document.createElement('nav');
  nav.style.position = 'fixed';
  nav.style.top = '0';
  nav.style.left = '0';
  nav.style.right = '0';
  nav.style.zIndex = '100';
  nav.style.padding = '16px 80px';
  nav.style.background = 'rgba(245, 233, 218, 0.7)';
  nav.style.backdropFilter = 'blur(20px) saturate(1.4)';
  nav.style.borderBottom = '1px solid rgba(255,255,255,0.3)';
  nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)';

  // Inject CSS for Navbar hover effects and custom dropdown
  const styleId = 'navbar-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .nav-link {
        color: var(--color-text-main);
        font-weight: 500;
        font-size: 0.92rem;
        letter-spacing: 0.2px;
        position: relative;
        padding-bottom: 4px;
        transition: color 0.25s ease;
        white-space: nowrap;
      }
      .nav-link:hover {
        color: var(--color-primary);
      }
      .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(90deg, var(--color-primary), #E07A4C);
        border-radius: 1px;
        transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
      }
      .nav-link:hover::after {
        width: 100%;
      }

      .lang-dropdown-wrapper {
        position: relative;
        display: inline-block;
      }
      .lang-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        font-weight: 600;
        font-size: 0.95rem;
        color: var(--color-text-main);
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        transition: all 0.2s ease;
      }
      .lang-btn:hover {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 6px 16px rgba(0,0,0,0.06);
      }
      .lang-menu {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.12);
        width: 140px;
        overflow: hidden;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 200;
        border: 1px solid rgba(0,0,0,0.04);
      }
      .lang-menu.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .lang-option {
        padding: 12px 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 0.95rem;
        color: var(--color-text-muted);
        transition: background 0.2s ease, color 0.2s ease;
      }
      .lang-option:hover {
        background: var(--color-background);
        color: var(--color-primary);
      }
      .lang-option.selected {
        color: var(--color-secondary);
        font-weight: 700;
        background: rgba(31, 77, 43, 0.04);
      }
    `;
    document.head.appendChild(style);
  }
  
  const savedLang = localStorage.getItem('lang') || 'English';

  nav.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 1400px; margin: 0 auto;">
      <a href="#/" style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: var(--color-secondary); letter-spacing: 3px; display: flex; align-items: center; gap: 2px; text-transform: uppercase;">
        <span style="background: linear-gradient(135deg, var(--color-secondary) 0%, #2A6338 50%, var(--color-primary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">RASOI</span><span style="color: var(--color-primary); font-size: 2.4rem; line-height: 1;">.</span>
      </a>
      
      <div style="display: flex; gap: 36px; align-items: center;">
        <a href="#/" class="nav-link" data-translate="home">Home</a>
        <a href="#/menu" class="nav-link" data-translate="menu">Menu</a>
        <a href="#/subscriptions" class="nav-link" data-translate="subscriptions">Subscriptions</a>
        <a href="#/builder" class="nav-link" data-translate="thaliBuilder">Thali Builder</a>
        <a href="#/cooks" class="nav-link" data-translate="cooks">Cooks</a>
      </div>
      
      <div style="display: flex; gap: 24px; align-items: center;">
        
        <div class="lang-dropdown-wrapper">
          <button class="lang-btn" id="langToggleBtn">
            <span id="currentLang">${savedLang}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s ease;" id="langArrow">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="lang-menu" id="langMenu">
            <div class="lang-option ${savedLang === 'English' ? 'selected' : ''}" data-lang="English">English</div>
            <div class="lang-option ${savedLang === 'Hindi' ? 'selected' : ''}" data-lang="Hindi">Hindi</div>
            <div class="lang-option ${savedLang === 'Bengali' ? 'selected' : ''}" data-lang="Bengali">Bengali</div>
            <div class="lang-option ${savedLang === 'Odia' ? 'selected' : ''}" data-lang="Odia">Odia</div>
            <div class="lang-option ${savedLang === 'Urdu' ? 'selected' : ''}" data-lang="Urdu">Urdu</div>
            <div class="lang-option ${savedLang === 'Tamil' ? 'selected' : ''}" data-lang="Tamil">Tamil</div>
            <div class="lang-option ${savedLang === 'Kannada' ? 'selected' : ''}" data-lang="Kannada">Kannada</div>
            <div class="lang-option ${savedLang === 'Telugu' ? 'selected' : ''}" data-lang="Telugu">Telugu</div>
            <div class="lang-option ${savedLang === 'Malayalam' ? 'selected' : ''}" data-lang="Malayalam">Malayalam</div>
            <div class="lang-option ${savedLang === 'Marathi' ? 'selected' : ''}" data-lang="Marathi">Marathi</div>
            <div class="lang-option ${savedLang === 'Gujarati' ? 'selected' : ''}" data-lang="Gujarati">Gujarati</div>
          </div>
        </div>

        <button class="btn-secondary" style="padding: 10px 24px; min-width: 90px;" onclick="window.location.hash='#/checkout'" data-translate="cart">Cart</button>
        <button class="btn-primary" style="padding: 10px 28px; min-width: 110px;" onclick="window.location.hash='#/signin'" data-translate="signIn">Sign In</button>
      </div>
    </div>
  `;

  // Interactivity for custom language dropdown
  setTimeout(() => {
    const langToggleBtn = nav.querySelector('#langToggleBtn') as HTMLButtonElement;
    const langMenu = nav.querySelector('#langMenu') as HTMLDivElement;
    const currentLangText = nav.querySelector('#currentLang') as HTMLSpanElement;
    const langArrow = nav.querySelector('#langArrow') as SVGSVGElement;
    const langOptions = nav.querySelectorAll('.lang-option');

    let isOpen = false;

    // Apply translations on load
    applyTranslations(savedLang);

    // Toggle menu
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      if (isOpen) {
        langMenu.classList.add('open');
        langArrow.style.transform = 'rotate(180deg)';
      } else {
        langMenu.classList.remove('open');
        langArrow.style.transform = 'rotate(0deg)';
      }
    });

    // Handle selection
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = option.getAttribute('data-lang');
        if(!selectedLang) return;
        
        // Update localStorage
        localStorage.setItem('lang', selectedLang);

        // Apply translations
        applyTranslations(selectedLang);

        // Update UI
        currentLangText.textContent = selectedLang;
        
        // Update selected class
        langOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // Close menu
        isOpen = false;
        langMenu.classList.remove('open');
        langArrow.style.transform = 'rotate(0deg)';

        console.log("Language successfully changed to " + selectedLang);
      });
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
      if (isOpen) {
        isOpen = false;
        langMenu.classList.remove('open');
        langArrow.style.transform = 'rotate(0deg)';
      }
    });
  }, 0);
  
  return nav;
}
