export function SignIn() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';

  let selectedRole = '';

  function renderRoleSelector() {
    container.innerHTML = `
      <style>
        .si-page {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          background: #fdfaf5;
          position: relative;
          overflow: hidden;
        }
        
        /* Premium Background Elements */
        .si-bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.15;
          animation: float 20s infinite alternate;
        }
        .blob-1 { width: 600px; height: 600px; background: #D96C4A; top: -200px; right: -100px; }
        .blob-2 { width: 500px; height: 500px; background: #2D5A27; bottom: -150px; left: -100px; }
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 60px) scale(1.1); }
        }

        .si-container {
          max-width: 1000px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 30px 100px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,255,255,0.6);
          position: relative;
          z-index: 1;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .si-visual {
          background: linear-gradient(135deg, var(--color-secondary), #1e3f1a);
          padding: 60px;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .si-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://www.transparenttextures.com/patterns/cubes.png');
          opacity: 0.1;
        }
        .si-visual h2 { font-size: 3rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
        .si-visual p { font-size: 1.1rem; opacity: 0.9; line-height: 1.6; max-width: 320px; }
        
        .si-content { padding: 60px 80px; display: flex; flex-direction: column; justify-content: center; }
        .si-content .brand-tag { font-size: 2.5rem; font-weight: 800; color: var(--color-secondary); margin-bottom: 8px; letter-spacing: -1px; }
        .si-content .subtitle { color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: 40px; }

        .si-role-stack { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        
        .si-role-card {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px 28px;
          border-radius: 24px;
          border: 2px solid #f0ece4;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: #fff;
          position: relative;
        }
        .si-role-card:hover {
          border-color: var(--color-primary);
          transform: scale(1.02) translateX(10px);
          box-shadow: 0 10px 30px rgba(217,108,74,0.12);
        }
        .si-role-card.selected {
          border-color: var(--color-primary);
          background: #fffaf8;
          box-shadow: 0 15px 40px rgba(217,108,74,0.15);
        }
        .si-role-card.selected::after {
          content: '✓';
          position: absolute;
          right: 24px;
          width: 24px;
          height: 24px;
          background: var(--color-primary);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }

        .si-role-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
          transition: transform 0.3s;
        }
        .si-role-card:hover .si-role-icon-box { transform: rotate(-10deg) scale(1.1); }

        .si-role-text h4 { font-size: 1.2rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 4px; }
        .si-role-text p { font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.4; }

        .si-btn-main {
          width: 100%;
          padding: 20px;
          border-radius: 24px;
          border: none;
          background: var(--color-primary);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 12px 30px rgba(217,108,74,0.3);
          font-family: var(--font-main);
        }
        .si-btn-main:hover {
          background: #c45b3a;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(217,108,74,0.4);
        }
        .si-btn-main:disabled { opacity: 0.3; cursor: not-allowed; transform: none; box-shadow: none; }

        /* Form Styles */
        .si-tab-nav { display: flex; gap: 8px; background: #f0ece4; padding: 6px; border-radius: 18px; margin-bottom: 32px; }
        .si-tab-btn { flex: 1; padding: 12px; border: none; background: none; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; color: var(--color-text-muted); font-family: var(--font-main); }
        .si-tab-btn.active { background: #fff; color: var(--color-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .si-field { margin-bottom: 24px; }
        .si-field label { display: block; font-size: 0.9rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 10px; }
        .si-input-wrapper { position: relative; }
        .si-input-wrapper input {
          width: 100%; padding: 16px 20px; border: 2px solid #f0ece4; border-radius: 18px;
          font-size: 1rem; font-family: var(--font-main); outline: none; transition: 0.3s;
          background: #fdfaf5;
        }
        .si-input-wrapper input:focus { border-color: var(--color-primary); background: #fff; box-shadow: 0 0 0 5px rgba(217,108,74,0.08); }
        
        .si-back-btn {
          display: inline-flex; align-items: center; gap: 8px; color: var(--color-text-muted);
          font-weight: 600; cursor: pointer; margin-bottom: 32px; transition: 0.2s;
        }
        .si-back-btn:hover { color: var(--color-primary); transform: translateX(-4px); }

        .si-badge {
          display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px;
          border-radius: 30px; font-weight: 700; font-size: 0.85rem; margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .si-container { grid-template-columns: 1fr; }
          .si-visual { display: none; }
          .si-content { padding: 40px; }
        }
      </style>

      <div class="si-page">
        <div class="si-bg-blob blob-1"></div>
        <div class="si-bg-blob blob-2"></div>

        <div class="si-container">
          <div class="si-visual">
            <h2>Join the<br>Family of<br>Home Tastes.</h2>
            <p>From cooking with love to delivering smiles, there's a place for everyone at RASOI.</p>
          </div>

          <div class="si-content">
            <div class="brand-tag">RASOI.</div>
            <p class="subtitle">Choose your journey with us</p>

            <div class="si-role-stack">
              <div class="si-role-card" data-role="user">
                <div class="si-role-icon-box" style="background: #FFF1EB; color: #D96C4A;">👤</div>
                <div class="si-role-text">
                  <h4>USER</h4>
                  <p>Order fresh, homemade meals daily</p>
                </div>
              </div>

              <div class="si-role-card" data-role="rasoimakers">
                <div class="si-role-icon-box" style="background: #E8F0EA; color: #2D5A27;">👩‍🍳</div>
                <div class="si-role-text">
                  <h4>RASOIMAKERS</h4>
                  <p>Cook from home and grow your brand</p>
                </div>
              </div>

              <div class="si-role-card" data-role="rasoi-runners">
                <div class="si-role-icon-box" style="background: #EDE7F6; color: #5E35B1;">🚴</div>
                <div class="si-role-text">
                  <h4>RASOI RUNNERS</h4>
                  <p>Deliver happiness to hungry neighbors</p>
                </div>
              </div>
            </div>

            <button class="si-btn-main" id="btn-continue" disabled>Select your role</button>
            <p style="text-align:center; margin-top:24px; font-size:0.9rem; color:var(--color-text-muted);">
              New member? <a href="#" style="color:var(--color-primary); font-weight:700;">Join now</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const cards = container.querySelectorAll('.si-role-card');
    const continueBtn = container.querySelector('#btn-continue') as HTMLButtonElement;

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRole = (card as HTMLElement).dataset.role || '';
        continueBtn.disabled = false;
        continueBtn.textContent = `Proceed as ${selectedRole.replace('-', ' ').toUpperCase()}`;
      });
    });

    continueBtn.addEventListener('click', () => {
      if (selectedRole) renderLoginForm();
    });
  }

  function getRoleMeta() {
    switch (selectedRole) {
      case 'rasoimakers': return { label: 'RASOIMAKERS', icon: '👩‍🍳', color: '#2D5A27', bg: '#E8F0EA' };
      case 'rasoi-runners': return { label: 'RASOI RUNNERS', icon: '🚴', color: '#5E35B1', bg: '#EDE7F6' };
      default: return { label: 'USER', icon: '👤', color: '#D96C4A', bg: '#FFF1EB' };
    }
  }

  function renderLoginForm() {
    const meta = getRoleMeta();
    let loginTab = 'email';

    function build() {
      container.innerHTML = `
        <style>
          /* Re-injecting common styles to ensure they apply */
          .si-page { min-height: calc(100vh - 160px); display: flex; align-items: center; justify-content: center; padding: 60px 24px; background: #fdfaf5; position: relative; overflow: hidden; }
          .si-bg-blob { position: absolute; border-radius: 50%; filter: blur(80px); z-index: 0; opacity: 0.15; animation: float 20s infinite alternate; }
          .blob-1 { width: 600px; height: 600px; background: #D96C4A; top: -200px; right: -100px; }
          .blob-2 { width: 500px; height: 500px; background: #2D5A27; bottom: -150px; left: -100px; }
          @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(40px, 60px) scale(1.1); } }
          .si-container { max-width: 1000px; width: 100%; display: grid; grid-template-columns: 1fr 1.2fr; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); border-radius: 40px; overflow: hidden; box-shadow: 0 30px 100px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.6); position: relative; z-index: 1; }
          .si-visual { background: linear-gradient(135deg, var(--color-secondary), #1e3f1a); padding: 60px; color: #fff; display: flex; flex-direction: column; justify-content: center; position: relative; }
          .si-visual h2 { font-size: 3rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
          .si-visual p { font-size: 1.1rem; opacity: 0.9; line-height: 1.6; max-width: 320px; }
          .si-content { padding: 60px 80px; display: flex; flex-direction: column; justify-content: center; }
          .si-tab-nav { display: flex; gap: 8px; background: #f0ece4; padding: 6px; border-radius: 18px; margin-bottom: 32px; }
          .si-tab-btn { flex: 1; padding: 12px; border: none; background: none; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; color: var(--color-text-muted); font-family: var(--font-main); }
          .si-tab-btn.active { background: #fff; color: var(--color-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .si-field { margin-bottom: 20px; }
          .si-field label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 8px; }
          .si-input-wrapper input { width: 100%; padding: 16px 20px; border: 2px solid #f0ece4; border-radius: 18px; font-size: 1rem; font-family: var(--font-main); outline: none; transition: 0.3s; background: #fdfaf5; }
          .si-input-wrapper input:focus { border-color: var(--color-primary); background: #fff; box-shadow: 0 0 0 5px rgba(217,108,74,0.08); }
          .si-btn-main { width: 100%; padding: 20px; border-radius: 24px; border: none; background: var(--color-primary); color: #fff; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 12px 30px rgba(217,108,74,0.3); font-family: var(--font-main); }
          .si-back-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--color-text-muted); font-weight: 600; cursor: pointer; margin-bottom: 32px; transition: 0.2s; }
          .si-back-btn:hover { color: var(--color-primary); transform: translateX(-4px); }
          .si-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 30px; font-weight: 700; font-size: 0.85rem; margin-bottom: 20px; }
        </style>

        <div class="si-page">
          <div class="si-bg-blob blob-1"></div>
          <div class="si-bg-blob blob-2"></div>

          <div class="si-container">
            <div class="si-visual">
              <h2>Welcome<br>Back to<br>RASOI.</h2>
              <p>Sign in to access your ${meta.label.toLowerCase()} account and continue your culinary journey.</p>
            </div>

            <div class="si-content">
              <div class="si-back-btn" id="btn-back">← Back to roles</div>
              
              <div class="si-badge" style="background: ${meta.bg}; color: ${meta.color};">
                <span>${meta.icon}</span> ${meta.label}
              </div>

              <div class="si-tab-nav">
                <button class="si-tab-btn ${loginTab === 'email' ? 'active' : ''}" data-tab="email">📧 Email</button>
                <button class="si-tab-btn ${loginTab === 'phone' ? 'active' : ''}" data-tab="phone">📱 Phone</button>
              </div>

              <form id="si-form">
                ${loginTab === 'email' ? `
                  <div class="si-field">
                    <label>Email Address</label>
                    <div class="si-input-wrapper"><input type="email" required placeholder="name@example.com" id="in-email" /></div>
                  </div>
                ` : `
                  <div class="si-field">
                    <label>Phone Number</label>
                    <div class="si-input-wrapper" style="display:flex; gap:10px;">
                      <input type="text" value="+91" style="width:70px; text-align:center;" readonly />
                      <input type="tel" required placeholder="9876543210" id="in-phone" pattern="[0-9]{10}" />
                    </div>
                  </div>
                `}

                <div class="si-field">
                  <div style="display:flex; justify-content:space-between;">
                    <label>Password</label>
                    <a href="#" style="font-size:0.8rem; color:var(--color-primary); font-weight:600;">Forgot?</a>
                  </div>
                  <div class="si-input-wrapper"><input type="password" required placeholder="••••••••" id="in-pass" /></div>
                </div>

                <div style="display:flex; align-items:center; gap:10px; margin-bottom:32px;">
                  <input type="checkbox" id="rem" style="width:18px; height:18px; accent-color:var(--color-primary);" />
                  <label for="rem" style="font-size:0.9rem; color:var(--color-text-muted); cursor:pointer;">Keep me signed in</label>
                </div>

                <button type="submit" class="si-btn-main">Sign In to Dashboard</button>
              </form>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-back')!.addEventListener('click', renderRoleSelector);
      
      container.querySelectorAll('.si-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          loginTab = (btn as HTMLElement).dataset.tab || 'email';
          build();
        });
      });

      container.querySelector('#si-form')!.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = selectedRole;
        if (role === 'rasoimakers') window.location.hash = '#/dashboard/rasoimakers';
        else if (role === 'rasoi-runners') window.location.hash = '#/dashboard/runners';
        else window.location.hash = '#/';
      });
    }

    build();
  }

  renderRoleSelector();
  return container;
}
