export function SignIn() {
  const container = document.createElement('div');
  let selectedRole = '';

  function renderRoleSelector() {
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');

        :root {
          --si-bg: #F8F5F0;
          --si-primary: #8B5E3C;
          --si-secondary: #E8DCCB;
          --si-text: #2D2A26;
          --si-text-light: #6D6A66;
          --si-border: #E8E4DF;
          --si-white: #FFFFFF;
          --si-radius: 16px;
        }

        .si-app {
          min-height: calc(100vh - 160px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--si-bg);
          font-family: 'Inter', sans-serif;
          padding: 60px 24px;
        }

        .si-card {
          width: 100%;
          max-width: 480px;
          background: var(--si-white);
          border-radius: 24px;
          border: 1px solid var(--si-border);
          padding: 48px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.03);
          text-align: center;
        }

        .si-logo {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: var(--si-primary);
          margin-bottom: 12px;
        }

        .si-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--si-text);
        }

        .si-subtitle {
          color: var(--si-text-light);
          font-size: 0.95rem;
          margin-bottom: 40px;
        }

        .si-roles {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .si-role-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-radius: var(--si-radius);
          border: 1px solid var(--si-border);
          cursor: pointer;
          transition: all 0.2s ease;
          background: var(--si-bg);
          text-align: left;
        }

        .si-role-item:hover {
          border-color: var(--si-primary);
          background: var(--si-white);
        }

        .si-role-item.selected {
          border-color: var(--si-primary);
          background: var(--si-secondary);
        }

        .si-role-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--si-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          border: 1px solid var(--si-border);
        }

        .si-role-info .name { font-weight: 700; font-size: 0.95rem; color: var(--si-text); }
        .si-role-info .desc { font-size: 0.8rem; color: var(--si-text-light); }

        .btn-continue {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: var(--si-primary);
          color: var(--si-white);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-continue:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-continue:not(:disabled):hover { opacity: 0.95; transform: translateY(-1px); }

        /* Form view */
        .si-back {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--si-text-light);
          cursor: pointer;
          margin-bottom: 24px;
          justify-content: center;
        }

        .si-tabs {
          display: flex;
          background: var(--si-bg);
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 32px;
        }

        .si-tab {
          flex: 1;
          padding: 10px;
          border: none;
          background: none;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          color: var(--si-text-light);
        }

        .si-tab.active {
          background: var(--si-white);
          color: var(--si-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .si-field { text-align: left; margin-bottom: 20px; }
        .si-field label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; }
        .si-input {
          width: 100%; padding: 14px; border-radius: 10px; border: 1px solid var(--si-border);
          background: var(--si-bg); font-family: inherit; font-size: 0.95rem; outline: none;
        }
        .si-input:focus { border-color: var(--si-primary); background: var(--si-white); }
      </style>

      <div class="si-app">
        <div class="si-card">
          <div class="si-logo">RASOI</div>
          <h2 class="si-title">Welcome Back</h2>
          <p class="si-subtitle">Select your account type to continue</p>

          <div class="si-roles">
            <div class="si-role-item" data-role="user">
              <div class="si-role-icon">👤</div>
              <div class="si-role-info">
                <div class="name">USER</div>
                <div class="desc">Order homemade meals</div>
              </div>
            </div>
            <div class="si-role-item" data-role="rasoimakers">
              <div class="si-role-icon">👩‍🍳</div>
              <div class="si-role-info">
                <div class="name">RASOI MAKER</div>
                <div class="desc">Cook and share your dishes</div>
              </div>
            </div>
            <div class="si-role-item" data-role="rasoi-runners">
              <div class="si-role-icon">🚴</div>
              <div class="si-role-info">
                <div class="name">RASOI RUNNER</div>
                <div class="desc">Deliver food in your area</div>
              </div>
            </div>
          </div>

          <button class="btn-continue" id="si-btn-continue" disabled>Continue</button>
          
          <p style="margin-top: 24px; font-size: 0.85rem; color: var(--si-text-light);">
            New to RASOI? <a href="#" style="color: var(--si-primary); font-weight: 700; text-decoration: none;">Join the family</a>
          </p>
        </div>
      </div>
    `;

    const items = container.querySelectorAll('.si-role-item');
    const btn = container.querySelector('#si-btn-continue') as HTMLButtonElement;

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        selectedRole = (item as HTMLElement).dataset.role || '';
        btn.disabled = false;
      });
    });

    btn.addEventListener('click', renderLoginForm);
  }

  function renderLoginForm() {
    let activeTab = 'email';
    const roleLabel = selectedRole.replace('-', ' ').toUpperCase();

    function build() {
      container.querySelector('.si-card')!.innerHTML = `
        <div class="si-back" id="si-btn-back">
          <span class="material-icons-round" style="font-size: 18px;">arrow_back</span>
          Back to roles
        </div>
        <div class="si-logo">RASOI</div>
        <h2 class="si-title">Sign In</h2>
        <p class="si-subtitle">Access your ${roleLabel} account</p>

        <div class="si-tabs">
          <button class="si-tab ${activeTab === 'email' ? 'active' : ''}" data-tab="email">Email</button>
          <button class="si-tab ${activeTab === 'phone' ? 'active' : ''}" data-tab="phone">Phone</button>
        </div>

        <form id="si-main-form">
          ${activeTab === 'email' ? `
            <div class="si-field">
              <label>Email Address</label>
              <input type="email" class="si-input" placeholder="name@example.com" required />
            </div>
          ` : `
            <div class="si-field">
              <label>Phone Number</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" class="si-input" value="+91" style="width: 60px; text-align: center;" readonly />
                <input type="tel" class="si-input" placeholder="9876543210" required pattern="[0-9]{10}" />
              </div>
            </div>
          `}
          
          <div class="si-field">
            <div style="display: flex; justify-content: space-between;">
              <label>Password</label>
              <a href="#" style="font-size: 0.75rem; color: var(--si-primary); font-weight: 600; text-decoration: none;">Forgot?</a>
            </div>
            <input type="password" class="si-input" placeholder="••••••••" required />
          </div>

          <button type="submit" class="btn-continue" style="margin-top: 12px;">Sign In</button>
        </form>
      `;

      container.querySelector('#si-btn-back')!.addEventListener('click', renderRoleSelector);
      
      container.querySelectorAll('.si-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          activeTab = (tab as HTMLElement).dataset.tab || 'email';
          build();
        });
      });

      container.querySelector('#si-main-form')!.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selectedRole === 'rasoimakers') window.location.hash = '#/dashboard/rasoimakers';
        else if (selectedRole === 'rasoi-runners') window.location.hash = '#/dashboard/runners';
        else window.location.hash = '#/';
      });
    }

    build();
  }

  renderRoleSelector();
  return container;
}
