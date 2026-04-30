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
          padding: 40px 24px;
          background: linear-gradient(160deg, var(--color-background) 0%, var(--color-secondary-light) 50%, var(--color-background) 100%);
          position: relative;
          overflow: hidden;
        }
        .si-page::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217,108,74,0.08) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }
        .si-page::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(45,90,39,0.08) 0%, transparent 70%);
          bottom: -80px;
          left: -80px;
        }

        .si-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(16px);
          border-radius: 28px;
          box-shadow: 0 16px 64px rgba(0,0,0,0.08);
          border: 1px solid rgba(255,255,255,0.6);
          max-width: 560px;
          width: 100%;
          padding: 52px 44px;
          position: relative;
          z-index: 1;
          animation: cardPop 0.5s ease;
        }
        @keyframes cardPop {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .si-card .brand {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--color-secondary);
          letter-spacing: 1px;
          text-align: center;
          margin-bottom: 6px;
        }
        .si-card .tagline {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 1rem;
          margin-bottom: 40px;
        }

        .si-role-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }

        .si-role-option {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px 24px;
          border-radius: 18px;
          border: 2px solid #ece8e0;
          cursor: pointer;
          background: #fff;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .si-role-option::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 60%, rgba(217,108,74,0.04) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .si-role-option:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(217,108,74,0.1);
        }
        .si-role-option:hover::before { opacity: 1; }
        .si-role-option.selected {
          border-color: var(--color-primary);
          background: linear-gradient(135deg, #FFF7F2 0%, #FFF1EB 100%);
          box-shadow: 0 8px 28px rgba(217,108,74,0.15);
        }

        .si-role-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .si-role-option:hover .si-role-icon { transform: scale(1.1); }

        .si-role-info { flex: 1; }
        .si-role-info h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin-bottom: 3px;
          letter-spacing: 0.5px;
        }
        .si-role-info p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        .si-role-arrow {
          font-size: 1.2rem;
          color: #ccc;
          transition: all 0.3s;
          flex-shrink: 0;
        }
        .si-role-option:hover .si-role-arrow { color: var(--color-primary); transform: translateX(4px); }
        .si-role-option.selected .si-role-arrow { color: var(--color-primary); }

        .si-continue-btn {
          width: 100%;
          padding: 16px;
          border-radius: 30px;
          border: none;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          color: #fff;
          background: linear-gradient(135deg, var(--color-primary), #e07c5a);
          box-shadow: 0 8px 24px rgba(217,108,74,0.3);
          transition: all 0.3s ease;
          font-family: var(--font-main);
        }
        .si-continue-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(217,108,74,0.4); }
        .si-continue-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .si-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 28px 0;
          color: var(--color-text-muted);
          font-size: 0.82rem;
        }
        .si-divider::before, .si-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e0dcd4;
        }

        /* Form styles */
        .si-form-group {
          margin-bottom: 22px;
        }
        .si-form-group label {
          display: block;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-secondary);
          margin-bottom: 8px;
        }
        .si-form-group .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .si-form-group .label-row a {
          font-size: 0.82rem;
          color: var(--color-primary);
          font-weight: 500;
        }
        .si-form-group .label-row a:hover { text-decoration: underline; }
        .si-input {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e0dcd4;
          border-radius: 12px;
          font-family: var(--font-main);
          font-size: 0.95rem;
          background: #FFFCF8;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .si-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(217,108,74,0.1);
        }
        .si-input::placeholder { color: #b8b4ab; }

        .si-remember {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        .si-remember input { width: 18px; height: 18px; accent-color: var(--color-primary); cursor: pointer; }
        .si-remember label { font-size: 0.9rem; color: var(--color-text-muted); cursor: pointer; }

        .si-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          cursor: pointer;
          margin-bottom: 28px;
          transition: color 0.2s;
        }
        .si-back-link:hover { color: var(--color-primary); }

        .si-role-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .si-footer-text {
          text-align: center;
          margin-top: 28px;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .si-footer-text a {
          color: var(--color-primary);
          font-weight: 600;
        }
        .si-footer-text a:hover { text-decoration: underline; }
      </style>

      <div class="si-page">
        <div class="si-card">
          <div class="brand">RASOI.</div>
          <p class="tagline">Choose how you want to join our family</p>

          <div class="si-role-grid">
            <div class="si-role-option" data-role="user">
              <div class="si-role-icon" style="background: linear-gradient(135deg, #FFF1EB, #FFD6A5); color: #D96C4A;">👤</div>
              <div class="si-role-info">
                <h3>USER</h3>
                <p>Order meals, subscribe to plans & enjoy homemade food</p>
              </div>
              <span class="si-role-arrow">→</span>
            </div>

            <div class="si-role-option" data-role="rasoimakers">
              <div class="si-role-icon" style="background: linear-gradient(135deg, #E8F0EA, #c8e0cc); color: #2D5A27;">👩‍🍳</div>
              <div class="si-role-info">
                <h3>RASOIMAKERS</h3>
                <p>Home chefs — cook with love & earn from your kitchen</p>
              </div>
              <span class="si-role-arrow">→</span>
            </div>

            <div class="si-role-option" data-role="rasoi-runners">
              <div class="si-role-icon" style="background: linear-gradient(135deg, #EDE7F6, #D1C4E9); color: #5E35B1;">🚴</div>
              <div class="si-role-info">
                <h3>RASOI RUNNERS</h3>
                <p>Deliver happiness — join our delivery partner network</p>
              </div>
              <span class="si-role-arrow">→</span>
            </div>
          </div>

          <button class="si-continue-btn" id="si-continue" disabled>Select a role to continue</button>

          <div class="si-divider">or</div>
          <p style="text-align:center; font-size:0.88rem; color: var(--color-text-muted);">Already have an account? Your role is remembered.</p>
        </div>
      </div>
    `;

    // Role selection logic
    const roleOptions = container.querySelectorAll('.si-role-option');
    const continueBtn = container.querySelector('#si-continue') as HTMLButtonElement;

    roleOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        roleOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedRole = (opt as HTMLElement).dataset.role || '';
        continueBtn.disabled = false;
        const roleName = opt.querySelector('h3')!.textContent;
        continueBtn.textContent = `Continue as ${roleName}`;
      });
    });

    continueBtn.addEventListener('click', () => {
      if (!selectedRole) return;
      renderLoginForm();
    });
  }

  function getRoleMeta() {
    switch (selectedRole) {
      case 'rasoimakers':
        return { label: 'RASOIMAKERS', icon: '👩‍🍳', color: '#2D5A27', bg: 'linear-gradient(135deg, #E8F0EA, #c8e0cc)', desc: 'Home Chef Portal' };
      case 'rasoi-runners':
        return { label: 'RASOI RUNNERS', icon: '🚴', color: '#5E35B1', bg: 'linear-gradient(135deg, #EDE7F6, #D1C4E9)', desc: 'Delivery Partner Portal' };
      default:
        return { label: 'USER', icon: '👤', color: '#D96C4A', bg: 'linear-gradient(135deg, #FFF1EB, #FFD6A5)', desc: 'Customer Account' };
    }
  }

  function renderLoginForm() {
    const meta = getRoleMeta();

    container.innerHTML = `
      <div class="si-page">
        <div class="si-card" style="max-width: 480px;">
          <span class="si-back-link" id="si-back">← Back to role selection</span>

          <div style="text-align:center; margin-bottom: 32px;">
            <div class="si-role-badge" style="background: ${meta.bg}; color: ${meta.color};">
              <span style="font-size:1.2rem;">${meta.icon}</span> ${meta.label}
            </div>
            <div class="brand" style="margin-bottom: 4px;">RASOI.</div>
            <p class="tagline" style="margin-bottom: 0;">Sign in to ${meta.desc}</p>
          </div>

          <form id="si-form">
            <div class="si-form-group">
              <label>Email Address</label>
              <input type="email" class="si-input" required placeholder="hello@example.com" id="si-email" />
            </div>

            <div class="si-form-group">
              <div class="label-row">
                <label style="margin-bottom:0;">Password</label>
                <a href="#">Forgot Password?</a>
              </div>
              <input type="password" class="si-input" required placeholder="Enter your password" id="si-password" />
            </div>

            <div class="si-remember">
              <input type="checkbox" id="si-remember" />
              <label for="si-remember">Remember me</label>
            </div>

            <button type="submit" class="si-continue-btn">Sign In as ${meta.label}</button>
          </form>

          <p class="si-footer-text">
            New here? <a href="#" id="si-signup-link">Create an account</a>
          </p>
        </div>
      </div>
    `;

    // Back button
    container.querySelector('#si-back')!.addEventListener('click', () => {
      renderRoleSelector();
    });

    // Form submit
    container.querySelector('#si-form')!.addEventListener('submit', (e) => {
      e.preventDefault();
      const meta = getRoleMeta();
      alert('Welcome to RASOI as ' + meta.label + '! Redirecting to your dashboard.');
      window.location.hash = '#/';
    });

    // Sign up link
    container.querySelector('#si-signup-link')!.addEventListener('click', (e) => {
      e.preventDefault();
      const meta = getRoleMeta();
      alert('Sign up as ' + meta.label + ' coming soon!');
    });
  }

  renderRoleSelector();
  return container;
}
