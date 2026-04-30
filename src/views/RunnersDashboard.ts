const navItems = [
  { icon: '🗺️', label: 'Live Map', id: 'map' },
  { icon: '📦', label: 'Orders', id: 'orders' },
  { icon: '💰', label: 'Earnings', id: 'earnings' },
  { icon: '💬', label: 'Chat', id: 'chat' },
  { icon: '👤', label: 'Profile', id: 'profile' },
];

export function RunnersDashboard() {
  const container = document.createElement('div');
  let activeTab = 'map';
  let isOnline = true;

  function render() {
    container.innerHTML = `
      <style>
        .rr-layout { display: flex; min-height: 100vh; background: #fdfaf5; font-family: var(--font-main); }
        
        /* Sidebar */
        .rr-side {
          width: 240px; background: #fff; border-right: 1px solid #f0ece4;
          display: flex; flex-direction: column; padding: 32px 0;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
        }
        .rr-side-logo { padding: 0 32px 40px; font-size: 1.5rem; font-weight: 800; color: var(--color-secondary); display: flex; align-items: center; gap: 10px; }
        
        .rr-nav-item {
          display: flex; align-items: center; gap: 14px; padding: 14px 28px;
          cursor: pointer; transition: 0.3s; color: var(--color-text-muted);
          font-weight: 700; border: none; background: none; width: 100%; text-align: left;
          font-family: var(--font-main); font-size: 0.95rem;
        }
        .rr-nav-item:hover { color: var(--color-primary); background: #fffaf8; }
        .rr-nav-item.active {
          color: var(--color-primary); background: #fffaf8;
          border-left: 5px solid var(--color-primary);
        }

        .rr-status-card {
          margin: 20px; padding: 16px; border-radius: 20px;
          background: ${isOnline ? '#E8F5E9' : '#FFF3E0'};
          border: 1px solid ${isOnline ? '#A5D6A7' : '#FFCC80'};
          text-align: center;
        }
        .rr-status-toggle {
          width: 100%; padding: 10px; border-radius: 12px; border: none;
          background: #fff; font-weight: 700; color: ${isOnline ? '#2D5A27' : '#D96C4A'};
          cursor: pointer; margin-top: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .rr-main { flex: 1; margin-left: 240px; padding: 32px; }
        
        /* Dashboard Content */
        .rr-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
        
        .rr-map-container {
          background: #fff; border-radius: 32px; border: 1px solid #f0ece4; overflow: hidden;
          box-shadow: 0 15px 50px rgba(0,0,0,0.04);
        }
        .rr-map-placeholder {
          height: 500px; background: #e0dcd4 url('https://www.transparenttextures.com/patterns/clean-gray-paper.png');
          position: relative; display: flex; align-items: center; justify-content: center;
        }
        .rr-marker {
          position: absolute; width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          border: 3px solid #fff; transition: 0.3s; cursor: pointer;
        }
        .rr-marker:hover { transform: scale(1.2); z-index: 10; }
        
        .rr-order-card {
          background: #fff; border-radius: 28px; padding: 24px;
          border: 1px solid #f0ece4; box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .rr-order-card h3 { font-size: 1.1rem; color: var(--color-secondary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        
        .rr-step { display: flex; gap: 16px; margin-bottom: 20px; position: relative; }
        .rr-step::after { content: ''; position: absolute; left: 16px; top: 32px; bottom: -20px; width: 2px; border-left: 2px dashed #f0ece4; }
        .rr-step:last-child::after { display: none; }
        .rr-step-icon { width: 32px; height: 32px; border-radius: 50%; background: #f0ece4; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; z-index: 1; }
        .rr-step.active .rr-step-icon { background: var(--color-primary); color: #fff; }
        
        .rr-btn {
          width: 100%; padding: 14px; border-radius: 16px; border: none;
          font-weight: 700; cursor: pointer; transition: 0.3s; font-family: var(--font-main);
          margin-top: 10px;
        }
        .rr-btn-primary { background: var(--color-primary); color: #fff; box-shadow: 0 8px 20px rgba(217,108,74,0.2); }
        .rr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(217,108,74,0.3); }

        .rr-stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .rr-mini-stat { background: #fff; padding: 16px; border-radius: 20px; border: 1px solid #f0ece4; }
        .rr-mini-stat .val { font-size: 1.2rem; font-weight: 800; color: var(--color-secondary); }
        .rr-mini-stat .lab { font-size: 0.75rem; color: var(--color-text-muted); font-weight: 700; }
      </style>

      <div class="rr-layout">
        <aside class="rr-side">
          <div class="rr-side-logo">🛵 RASOI.</div>
          
          <div class="rr-status-card">
            <div style="font-size:0.8rem; font-weight:700; color:${isOnline ? '#2E7D32' : '#E65100'};">
              ${isOnline ? '● ONLINE' : '○ OFFLINE'}
            </div>
            <button class="rr-status-toggle" id="toggle-status">
              ${isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>

          <div style="flex:1;">
            ${navItems.map(item => `
              <button class="rr-nav-item ${activeTab === item.id ? 'active' : ''}" data-id="${item.id}">
                <span style="font-size:1.2rem;">${item.icon}</span> ${item.label}
              </button>
            `).join('')}
          </div>

          <div style="padding: 0 20px;">
            <button class="rr-nav-item" style="color:#c0392b;" onclick="window.location.hash='#/signin'">🚪 Logout</button>
          </div>
        </aside>

        <main class="rr-main">
          <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;">
            <div>
              <h2 style="font-size:1.8rem; color:var(--color-secondary);">Hello, Arjun! 👋</h2>
              <p style="color:var(--color-text-muted);">Ready to deliver happiness today?</p>
            </div>
            <div style="display:flex; align-items:center; gap:16px;">
              <div style="text-align:right;">
                <div style="font-size:0.9rem; font-weight:700;">Arjun Das</div>
                <div style="font-size:0.7rem; color:var(--color-text-muted);">Runner ID: #R4521</div>
              </div>
              <div style="width:40px; height:40px; border-radius:50%; background:var(--color-secondary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">AD</div>
            </div>
          </header>

          <div class="rr-grid">
            <div class="rr-map-container">
              <div style="padding:20px; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="font-size:1rem; font-weight:700;">Live Delivery Map</h3>
                <span style="font-size:0.8rem; color:var(--color-text-muted);">3.2 km to destination</span>
              </div>
              <div class="rr-map-placeholder">
                <div class="rr-marker" style="top:20%; left:30%; background:#2D5A27;" title="Rasoi Maker">👩‍🍳</div>
                <div class="rr-marker" style="bottom:25%; right:35%; background:#D96C4A;" title="Customer">🏠</div>
                <div class="rr-marker" style="top:50%; left:50%; background:var(--color-secondary); animation: pulse 2s infinite;" title="You">🚴</div>
                
                <style>
                  @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(45,90,39,0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(45,90,39,0); }
                    100% { box-shadow: 0 0 0 0 rgba(45,90,39,0); }
                  }
                </style>
              </div>
            </div>

            <div class="rr-panel">
              <div class="rr-stat-row">
                <div class="rr-mini-stat"><div class="val">14</div><div class="lab">Deliveries</div></div>
                <div class="rr-mini-stat"><div class="val">₹850</div><div class="lab">Today</div></div>
              </div>

              <div class="rr-order-card">
                <h3>📦 Active Order</h3>
                <div style="padding:4px 12px; background:#f0ece4; border-radius:8px; display:inline-block; font-size:0.75rem; font-weight:800; margin-bottom:20px;">#ORD-7821</div>
                
                <div class="rr-step active">
                  <div class="rr-step-icon">1</div>
                  <div>
                    <div style="font-size:0.85rem; font-weight:700;">Pick up from Maker</div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">Madhurima's Kitchen, Salt Lake</div>
                  </div>
                </div>

                <div class="rr-step">
                  <div class="rr-step-icon">2</div>
                  <div>
                    <div style="font-size:0.85rem; font-weight:700;">Deliver to Customer</div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">Sourav Mukherjee, New Town</div>
                  </div>
                </div>

                <button class="rr-btn rr-btn-primary" style="margin-top:20px;" onclick="alert('Navigation Started!')">📍 Start Navigation</button>
                <button class="rr-btn" style="background:#f0ece4; color:var(--color-secondary);" onclick="alert('Order Picked Up!')">✅ Marked as Picked Up</button>
              </div>

              <div class="rr-order-card" style="margin-top:20px;">
                <h3>💬 Quick Chat</h3>
                <div style="font-size:0.8rem; color:var(--color-text-muted); margin-bottom:12px;">Contact Customer</div>
                <button class="rr-btn" style="background:#fff; border:1.5px solid #f0ece4; color:var(--color-primary);" onclick="alert('Calling Customer...')">📞 Call Sourav</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;

    container.querySelector('#toggle-status')!.addEventListener('click', () => {
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
