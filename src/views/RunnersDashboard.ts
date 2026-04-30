const runnerNav = [
  { icon: 'explore', label: 'Live Map', id: 'map' },
  { icon: 'local_shipping', label: 'My Deliveries', id: 'deliveries' },
  { icon: 'account_balance_wallet', label: 'Earnings', id: 'earnings' },
  { icon: 'forum', label: 'Messages', id: 'messages' },
  { icon: 'person', label: 'Profile', id: 'profile' },
  { icon: 'support_agent', label: 'Support', id: 'support' },
];

export function RunnersDashboard() {
  const container = document.createElement('div');
  let activeTab = 'map';
  let isOnline = true;

  function render() {
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');

        :root {
          --rr-bg: #F8F5F0;
          --rr-primary: #8B5E3C;
          --rr-secondary: #E8DCCB;
          --rr-accent: #2D5A27; /* Keeping a subtle green for 'Online' status */
          --rr-text: #2D2A26;
          --rr-text-light: #6D6A66;
          --rr-border: #E8E4DF;
          --rr-white: #FFFFFF;
          --rr-radius: 14px;
        }

        .rr-app {
          display: flex;
          min-height: 100vh;
          background-color: var(--rr-bg);
          color: var(--rr-text);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* Sidebar */
        .rr-sidebar {
          width: 260px;
          background: var(--rr-white);
          border-right: 1px solid var(--rr-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
        }

        .rr-sidebar-logo {
          padding: 32px 24px;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--rr-primary);
        }

        .rr-status-widget {
          margin: 0 20px 32px;
          padding: 20px;
          background: var(--rr-bg);
          border-radius: var(--rr-radius);
          text-align: center;
          border: 1px solid var(--rr-border);
        }

        .rr-status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: ${isOnline ? 'var(--rr-accent)' : '#C0392B'};
        }

        .rr-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 0 4px ${isOnline ? 'rgba(45,90,39,0.1)' : 'rgba(192,57,43,0.1)'};
        }

        .btn-status-toggle {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid var(--rr-border);
          background: var(--rr-white);
          color: var(--rr-text);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-status-toggle:hover {
          border-color: var(--rr-primary);
          color: var(--rr-primary);
        }

        .rr-nav { flex: 1; padding: 0 12px; }

        .rr-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          margin-bottom: 4px;
          border-radius: 10px;
          cursor: pointer;
          color: var(--rr-text-light);
          font-size: 0.9rem;
          font-weight: 500;
          transition: 0.2s;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .rr-nav-item:hover { background-color: var(--rr-bg); color: var(--rr-text); }

        .rr-nav-item.active {
          background-color: var(--rr-secondary);
          color: var(--rr-primary);
          font-weight: 600;
        }

        /* Main area */
        .rr-main { flex: 1; margin-left: 260px; display: flex; flex-direction: column; }

        .rr-navbar {
          height: 72px;
          background: var(--rr-white);
          border-bottom: 1px solid var(--rr-border);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 40px;
          gap: 24px;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .rr-content { padding: 40px; }

        .rr-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }

        /* Map Card */
        .rr-card {
          background: var(--rr-white);
          border-radius: var(--rr-radius);
          border: 1px solid var(--rr-border);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .rr-map-view {
          height: 520px;
          background: #E5E1DA; /* Map neutral */
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rr-marker {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--rr-white);
          border: 2px solid var(--rr-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          z-index: 2;
        }

        .rr-marker.me {
          border-color: var(--rr-accent);
          color: var(--rr-accent);
          animation: pulseMarker 2s infinite;
        }

        @keyframes pulseMarker {
          0% { box-shadow: 0 0 0 0 rgba(45,90,39,0.4); }
          70% { box-shadow: 0 0 0 15px rgba(45,90,39,0); }
          100% { box-shadow: 0 0 0 0 rgba(45,90,39,0); }
        }

        /* Sidebar Panel */
        .rr-panel-card {
          background: var(--rr-white);
          border-radius: var(--rr-radius);
          border: 1px solid var(--rr-border);
          padding: 24px;
          margin-bottom: 24px;
        }

        .rr-panel-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 20px; color: var(--rr-primary); }

        .rr-order-info { margin-bottom: 24px; }
        .rr-order-badge {
          display: inline-block;
          padding: 4px 10px;
          background: var(--rr-secondary);
          color: var(--rr-primary);
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .rr-route-step {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          position: relative;
        }

        .rr-route-step::after {
          content: ''; position: absolute; left: 15px; top: 32px; bottom: -20px;
          width: 1px; border-left: 2px dashed var(--rr-border);
        }
        .rr-route-step:last-child::after { display: none; }

        .rr-step-bullet {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--rr-bg);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; z-index: 1; border: 1px solid var(--rr-border);
        }

        .rr-route-step.active .rr-step-bullet {
          background: var(--rr-primary);
          color: var(--rr-white);
          border-color: var(--rr-primary);
        }

        .rr-step-content .label { font-size: 0.75rem; color: var(--rr-text-light); margin-bottom: 2px; }
        .rr-step-content .name { font-size: 0.9rem; font-weight: 600; }

        .btn-action-primary {
          width: 100%; padding: 14px; border-radius: 12px;
          background: var(--rr-primary); color: var(--rr-white);
          border: none; font-weight: 600; cursor: pointer;
          font-size: 0.95rem; margin-top: 16px;
          box-shadow: 0 4px 12px rgba(139, 94, 60, 0.15);
        }

        .btn-action-secondary {
          width: 100%; padding: 12px; border-radius: 12px;
          background: var(--rr-white); color: var(--rr-primary);
          border: 1px solid var(--rr-primary); font-weight: 600; cursor: pointer;
          font-size: 0.9rem; margin-top: 12px;
        }

        .rr-stats-mini {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .rr-mini-stat {
          background: var(--rr-white);
          border: 1px solid var(--rr-border);
          padding: 16px;
          border-radius: var(--rr-radius);
          text-align: center;
        }

        .rr-mini-stat .val { font-size: 1.2rem; font-weight: 700; color: var(--rr-primary); }
        .rr-mini-stat .lab { font-size: 0.7rem; color: var(--rr-text-light); font-weight: 600; }

        @media (max-width: 1000px) {
          .rr-grid { grid-template-columns: 1fr; }
          .rr-sidebar { width: 0; display: none; }
          .rr-main { margin-left: 0; }
        }
      </style>

      <div class="rr-app">
        <!-- Sidebar -->
        <aside class="rr-sidebar">
          <div class="rr-sidebar-logo">RASOI</div>
          
          <div class="rr-status-widget">
            <div class="rr-status-indicator">
              <span class="rr-status-dot"></span>
              ${isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
            <button class="btn-status-toggle" id="toggle-duty">
              ${isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>

          <nav class="rr-nav">
            ${runnerNav.map(item => `
              <button class="rr-nav-item ${activeTab === item.id ? 'active' : ''}" data-id="${item.id}">
                <span class="material-icons-round">${item.icon}</span>
                ${item.label}
              </button>
            `).join('')}
          </nav>

          <div style="padding: 24px 12px; border-top: 1px solid var(--rr-border);">
            <button class="rr-nav-item" onclick="window.location.hash='#/signin'">
              <span class="material-icons-round">logout</span>
              Logout
            </button>
          </div>
        </aside>

        <!-- Main -->
        <main class="rr-main">
          <header class="rr-navbar">
            <div class="rr-profile-section" style="border:none;">
              <div class="rr-user-info" style="text-align: right;">
                <div class="name">Arjun Das</div>
                <div class="role">Rasoi Runner</div>
              </div>
              <img src="https://i.pravatar.cc/150?u=arjun" class="rr-avatar" alt="Avatar" />
            </div>
          </header>

          <div class="rr-content">
            <div class="rr-grid">
              <!-- Map Card -->
              <div class="rr-card">
                <div style="padding: 24px; border-bottom: 1px solid var(--rr-border); display: flex; justify-content: space-between;">
                  <div>
                    <h3 style="font-weight: 700;">Live Map</h3>
                    <p style="font-size: 0.8rem; color: var(--rr-text-light);">Deliver to New Town, Kolkata</p>
                  </div>
                  <button class="btn-upload" style="margin: 0;">Recenter</button>
                </div>
                <div class="rr-map-view">
                  <!-- Simulated markers -->
                  <div class="rr-marker" style="top: 20%; left: 30%;">👨‍🍳</div>
                  <div class="rr-marker me" style="top: 50%; left: 55%;">🛵</div>
                  <div class="rr-marker" style="bottom: 25%; right: 20%;">🏠</div>
                </div>
              </div>

              <!-- Right Panel -->
              <div>
                <div class="rr-stats-mini">
                  <div class="rr-mini-stat"><div class="val">12</div><div class="lab">Deliveries</div></div>
                  <div class="rr-mini-stat"><div class="val">₹740</div><div class="lab">Earnings</div></div>
                </div>

                <div class="rr-panel-card">
                  <h3>Active Delivery</h3>
                  <div class="rr-order-badge">#ORD-55291</div>
                  
                  <div class="rr-route-step active">
                    <div class="rr-step-bullet"><span class="material-icons-round" style="font-size:18px;">restaurant</span></div>
                    <div class="rr-step-content">
                      <div class="label">Pickup Location</div>
                      <div class="name">Madhurima's Kitchen</div>
                      <div style="font-size: 0.75rem; color: var(--rr-text-light);">Salt Lake, Sector V</div>
                    </div>
                  </div>

                  <div class="rr-route-step">
                    <div class="rr-step-bullet"><span class="material-icons-round" style="font-size:18px;">home</span></div>
                    <div class="rr-step-content">
                      <div class="label">Delivery Location</div>
                      <div class="name">Sourav Mukherjee</div>
                      <div style="font-size: 0.75rem; color: var(--rr-text-light);">New Town, Action Area 1</div>
                    </div>
                  </div>

                  <button class="btn-action-primary" onclick="alert('Navigation started!')">Start Navigation</button>
                  <button class="btn-action-secondary" onclick="alert('Marked as Picked Up')">Confirm Pickup</button>
                </div>

                <div class="rr-panel-card">
                  <h3>Quick Support</h3>
                  <p style="font-size: 0.85rem; color: var(--rr-text-light); margin-bottom: 16px;">Need help with the current order?</p>
                  <button class="btn-action-secondary" style="border-color: #E8E4DF; color: var(--rr-text);">Contact Support</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;

    container.querySelector('#toggle-duty')!.addEventListener('click', () => {
      isOnline = !isOnline;
      render();
    });

    container.querySelectorAll('.rr-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = (btn as HTMLElement).dataset.id || 'map';
        render();
      });
    });
  }

  render();
  return container;
}
