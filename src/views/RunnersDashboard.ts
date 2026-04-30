const runnerNav = [
  { icon: '📍', label: 'Live Map', id: 'live-map', active: true },
  { icon: '📦', label: 'My Deliveries', id: 'deliveries' },
  { icon: '💰', label: 'Earnings', id: 'earnings' },
  { icon: '💬', label: 'Messages', id: 'messages', badge: 2 },
  { icon: '👤', label: 'Profile', id: 'profile' },
  { icon: '❓', label: 'Help & Support', id: 'help' },
  { icon: '⚙️', label: 'Settings', id: 'settings' },
];

export function RunnersDashboard() {
  const container = document.createElement('div');
  let activeTab = 'live-map';
  let isOnline = true;
  let quickMsg = '';

  function render() {
    container.innerHTML = `
      <style>
        .rr-layout{display:flex;min-height:100vh;background:#F7F4EB;font-family:var(--font-main)}
        .rr-sidebar{width:210px;background:#fff;border-right:1px solid #ece8e0;display:flex;flex-direction:column;padding:24px 0;position:fixed;top:0;left:0;bottom:0;z-index:100;overflow-y:auto}
        .rr-sidebar-brand{display:flex;align-items:center;gap:10px;padding:0 20px 24px;border-bottom:1px solid #ece8e0;margin-bottom:12px}
        .rr-sidebar-brand .brand-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#5E35B1,#7E57C2);display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff}
        .rr-sidebar-brand h2{font-size:1.1rem;color:var(--color-secondary);letter-spacing:1px;line-height:1.2}
        .rr-sidebar-brand h2 span{display:block;font-size:0.75rem;color:var(--color-primary);font-weight:600}
        .rr-nav-item{display:flex;align-items:center;gap:12px;padding:11px 20px;margin:2px 10px;border-radius:12px;cursor:pointer;font-size:0.9rem;font-weight:500;color:var(--color-text-muted);transition:all .2s;border:none;background:none;width:calc(100% - 20px);text-align:left;font-family:var(--font-main);position:relative}
        .rr-nav-item:hover{background:#f5f2ea;color:var(--color-text-main)}
        .rr-nav-item.active{background:linear-gradient(135deg,var(--color-primary),#e8956e);color:#fff;font-weight:600;box-shadow:0 4px 12px rgba(217,108,74,.25)}
        .rr-nav-item .nav-icon{font-size:1.1rem;width:22px;text-align:center}
        .rr-nav-badge{position:absolute;right:12px;background:#e74c3c;color:#fff;font-size:.65rem;font-weight:700;padding:2px 7px;border-radius:10px}
        .rr-status-box{margin:auto 14px 8px;padding:14px;border-radius:14px;text-align:center;font-size:.82rem;font-weight:600;transition:all .3s;cursor:pointer}
        .rr-status-online{background:#E8F5E9;color:#2E7D32;border:1.5px solid #A5D6A7}
        .rr-status-offline{background:#FFF3E0;color:#E65100;border:1.5px solid #FFCC80}
        .rr-status-box:hover{transform:scale(1.03)}
        .rr-status-box .dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}
        .rr-logout-btn{margin:8px 14px 16px;padding:12px;border-radius:12px;cursor:pointer;font-size:.88rem;font-weight:500;color:#c0392b;border:none;background:#fdf2f2;display:flex;align-items:center;gap:10px;transition:all .2s;font-family:var(--font-main)}
        .rr-logout-btn:hover{background:#f8d7da}

        .rr-main{flex:1;margin-left:210px}
        .rr-topbar{display:flex;justify-content:space-between;align-items:center;padding:14px 28px;background:#fff;border-bottom:1px solid #ece8e0;position:sticky;top:0;z-index:50}
        .rr-topbar-left h2{font-size:1.3rem;color:var(--color-secondary)}
        .rr-topbar-left p{font-size:.82rem;color:var(--color-text-muted)}
        .rr-topbar-right{display:flex;align-items:center;gap:16px}
        .rr-online-badge{padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;border:1.5px solid #A5D6A7;background:#E8F5E9;color:#2E7D32}
        .rr-online-badge.offline{border-color:#FFCC80;background:#FFF3E0;color:#E65100}
        .rr-notif{font-size:1.2rem;cursor:pointer;position:relative}
        .rr-notif-dot{position:absolute;top:-2px;right:-2px;width:8px;height:8px;border-radius:50%;background:#e74c3c}
        .rr-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#5E35B1,#7E57C2);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.8rem}
        .rr-user-info{text-align:right}
        .rr-user-info .name{font-size:.88rem;font-weight:600}
        .rr-user-info .role{font-size:.72rem;color:var(--color-text-muted)}

        .rr-body{display:grid;grid-template-columns:1fr 340px;gap:24px;padding:24px 28px}
        @media(max-width:1000px){.rr-body{grid-template-columns:1fr}}

        .rr-map-card{background:#fff;border-radius:16px;border:1px solid #ece8e0;overflow:hidden}
        .rr-map-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #ece8e0}
        .rr-map-header h3{font-size:1.05rem;color:var(--color-secondary)}
        .rr-map-header p{font-size:.78rem;color:var(--color-text-muted)}
        .rr-recenter{padding:8px 16px;border-radius:20px;border:1px solid #ddd;background:#fff;font-size:.8rem;cursor:pointer;font-family:var(--font-main);display:flex;align-items:center;gap:6px;transition:all .2s}
        .rr-recenter:hover{border-color:var(--color-primary);color:var(--color-primary)}
        .rr-map-placeholder{height:420px;background:linear-gradient(135deg,#e8f0ea 0%,#d4e6d8 30%,#c8dcc0 60%,#E8F0EA 100%);position:relative;display:flex;align-items:center;justify-content:center}
        .rr-map-overlay{position:relative;width:100%;height:100%;overflow:hidden}
        .rr-map-pin{position:absolute;display:flex;flex-direction:column;align-items:center;animation:pinBounce 2s ease infinite}
        @keyframes pinBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .rr-pin-card{background:#fff;border-radius:10px;padding:8px 12px;box-shadow:0 4px 12px rgba(0,0,0,.12);display:flex;align-items:center;gap:8px;white-space:nowrap;font-size:.78rem}
        .rr-pin-card img,.rr-pin-avatar{width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0}
        .rr-pin-card .pin-name{font-weight:600;font-size:.8rem}
        .rr-pin-card .pin-loc{font-size:.7rem;color:var(--color-text-muted);display:flex;align-items:center;gap:3px}
        .rr-pin-dot{width:6px;height:6px;border-radius:50%;display:inline-block}
        .rr-route-line{position:absolute;border-left:3px dashed var(--color-primary);height:160px;left:50%;top:30%}
        .rr-you-marker{position:absolute;top:48%;left:48%;width:40px;height:40px;border-radius:50%;background:var(--color-primary);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 0 8px rgba(217,108,74,.2);animation:pulse 2s ease infinite}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 8px rgba(217,108,74,.2)}50%{box-shadow:0 0 0 16px rgba(217,108,74,.08)}}
        .rr-map-legend{display:flex;align-items:center;gap:20px;padding:12px 20px;border-top:1px solid #ece8e0;font-size:.8rem;color:var(--color-text-muted)}
        .rr-legend-item{display:flex;align-items:center;gap:6px}

        /* Right Panel */
        .rr-panel{display:flex;flex-direction:column;gap:16px}
        .rr-panel-card{background:#fff;border-radius:16px;border:1px solid #ece8e0;padding:20px;transition:box-shadow .3s}
        .rr-panel-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.06)}
        .rr-panel-card h4{font-size:1rem;color:var(--color-secondary);margin-bottom:14px;display:flex;align-items:center;gap:8px}
        .rr-order-id{display:inline-block;padding:4px 12px;border-radius:8px;background:#FFF3E0;color:#E65100;font-size:.75rem;font-weight:700}
        .rr-pickup-badge{font-size:.78rem;color:var(--color-primary);font-weight:600;margin-left:auto}
        .rr-person-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f0ece4}
        .rr-person-row:last-child{border-bottom:none}
        .rr-person-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:#fff;flex-shrink:0}
        .rr-person-info .p-role{font-size:.72rem;color:var(--color-text-muted)}
        .rr-person-info .p-name{font-size:.9rem;font-weight:600}
        .rr-person-info .p-loc{font-size:.75rem;color:var(--color-text-muted);display:flex;align-items:center;gap:4px}

        .rr-summary-item{display:flex;align-items:center;gap:8px;font-size:.88rem;padding:6px 0}
        .rr-view-details{font-size:.78rem;color:var(--color-primary);font-weight:600;margin-left:auto;cursor:pointer}
        .rr-view-details:hover{text-decoration:underline}

        .rr-action-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0}
        .rr-action-row .act-label{font-size:.88rem;font-weight:500}
        .rr-action-row .act-dist{font-size:.75rem;color:var(--color-text-muted)}
        .rr-nav-btn{padding:8px 18px;border-radius:10px;border:none;background:var(--color-secondary);color:#fff;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:var(--font-main)}
        .rr-nav-btn:hover{background:#1e3f1a;transform:translateY(-1px)}
        .rr-big-btn{width:100%;padding:14px;border-radius:12px;font-size:.92rem;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:var(--font-main)}
        .rr-btn-pickup{border:2px solid var(--color-primary);background:linear-gradient(135deg,var(--color-primary),#e8956e);color:#fff;box-shadow:0 4px 16px rgba(217,108,74,.3);margin-bottom:8px}
        .rr-btn-pickup:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(217,108,74,.4)}
        .rr-btn-delivered{border:1.5px solid #e0dcd4;background:#fff;color:var(--color-text-main)}
        .rr-btn-delivered:hover{border-color:var(--color-secondary);background:var(--color-secondary-light)}

        .rr-quick-msgs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
        .rr-qm{padding:8px 14px;border-radius:20px;border:1.5px solid #e0dcd4;font-size:.8rem;cursor:pointer;background:#fff;transition:all .2s;font-family:var(--font-main)}
        .rr-qm:hover{border-color:var(--color-primary);background:#FFF7F2;color:var(--color-primary)}
        .rr-msg-input-row{display:flex;gap:8px}
        .rr-msg-input{flex:1;padding:10px 14px;border:1.5px solid #e0dcd4;border-radius:12px;font-family:var(--font-main);font-size:.88rem;outline:none;background:#FFFCF8}
        .rr-msg-input:focus{border-color:var(--color-primary)}
        .rr-send-btn{width:40px;height:40px;border-radius:12px;border:none;background:var(--color-primary);color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
        .rr-send-btn:hover{background:#c45b3a;transform:scale(1.05)}

        .rr-motto{display:flex;align-items:center;gap:14px;padding:16px 28px;background:#fff;border-top:1px solid #ece8e0}
        .rr-motto-icon{font-size:2rem}
        .rr-motto p{font-size:.9rem;color:var(--color-secondary);font-weight:500;font-style:italic}
        .rr-motto .small{font-size:.8rem;color:var(--color-text-muted);font-style:normal}
      </style>

      <div class="rr-layout">
        <aside class="rr-sidebar">
          <div class="rr-sidebar-brand">
            <div class="brand-icon">🚴</div>
            <h2>RASOI<span>RUNNERS</span></h2>
          </div>
          ${runnerNav.map(n => `
            <button class="rr-nav-item ${activeTab === n.id ? 'active' : ''}" data-tab="${n.id}">
              <span class="nav-icon">${n.icon}</span> ${n.label}
              ${n.badge ? `<span class="rr-nav-badge">${n.badge}</span>` : ''}
            </button>
          `).join('')}
          <div class="rr-status-box ${isOnline ? 'rr-status-online' : 'rr-status-offline'}" id="rr-status">
            <span class="dot" style="background:${isOnline ? '#2E7D32' : '#E65100'}"></span>
            ${isOnline ? 'You are in work' : 'You are off duty'}
            <br><span style="font-weight:400;font-size:.75rem">${isOnline ? 'Started at 09:15 AM' : 'Tap to go online'}</span>
          </div>
          <div class="rr-status-box ${!isOnline ? 'rr-status-online' : 'rr-status-offline'}" id="rr-toggle" style="margin-top:0">
            ${!isOnline ? '● Go Online' : '○ I am out of work'}
          </div>
          <button class="rr-logout-btn" id="rr-logout">🚪 Log Out</button>
        </aside>

        <div class="rr-main">
          <div class="rr-topbar">
            <div class="rr-topbar-left">
              <h2>Hello, Arjun! 👋</h2>
              <p>Ready to deliver happiness today?</p>
            </div>
            <div class="rr-topbar-right">
              <div class="rr-online-badge ${isOnline ? '' : 'offline'}" id="rr-top-status">
                <span class="dot" style="width:8px;height:8px;border-radius:50%;background:${isOnline ? '#2E7D32' : '#E65100'};display:inline-block"></span>
                ${isOnline ? 'I am in work' : 'Off duty'}
              </div>
              <span class="rr-notif">🔔<span class="rr-notif-dot"></span></span>
              <div class="rr-user-info"><div class="name">Arjun Das</div><div class="role">Rasoi Runner</div></div>
              <div class="rr-avatar">AD</div>
            </div>
          </div>

          <div class="rr-body">
            <!-- Map -->
            <div class="rr-map-card">
              <div class="rr-map-header">
                <div><h3>Live Delivery Map</h3><p>Track locations and reach on time</p></div>
                <button class="rr-recenter">🔄 Re-center</button>
              </div>
              <div class="rr-map-placeholder">
                <div class="rr-map-overlay">
                  <!-- Rasoi Maker Pin -->
                  <div class="rr-map-pin" style="top:12%;left:25%">
                    <div class="rr-pin-card">
                      <div class="rr-pin-avatar" style="background:linear-gradient(135deg,#D96C4A,#e8956e);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.7rem;font-weight:700">MS</div>
                      <div><div class="pin-name">Madhurima Sen</div><div class="pin-loc"><span class="rr-pin-dot" style="background:#2E7D32"></span> Salt Lake, Kolkata</div></div>
                    </div>
                  </div>
                  <!-- You marker -->
                  <div class="rr-you-marker">🚴</div>
                  <!-- Customer Pin -->
                  <div class="rr-map-pin" style="bottom:12%;right:20%">
                    <div class="rr-pin-card">
                      <div class="rr-pin-avatar" style="background:linear-gradient(135deg,#e8956e,#D96C4A);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.7rem;font-weight:700">SM</div>
                      <div><div class="pin-name">Sourav Mukherjee</div><div class="pin-loc"><span class="rr-pin-dot" style="background:#e74c3c"></span> New Town, Kolkata</div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rr-map-legend">
                <div class="rr-legend-item"><span style="width:12px;height:12px;border-radius:50%;background:var(--color-secondary);display:inline-block"></span> Rasoi Maker</div>
                <div class="rr-legend-item"><span style="width:12px;height:12px;border-radius:50%;background:var(--color-primary);display:inline-block"></span> You</div>
                <div class="rr-legend-item"><span style="width:12px;height:12px;border-radius:50%;background:#e74c3c;display:inline-block"></span> Customer</div>
              </div>
            </div>

            <!-- Right Panel -->
            <div class="rr-panel">
              <!-- Current Delivery -->
              <div class="rr-panel-card">
                <h4>📦 Current Delivery <span class="rr-order-id">#R452189</span><span class="rr-pickup-badge">Pickup</span></h4>
                <div class="rr-person-row">
                  <div class="rr-person-avatar" style="background:linear-gradient(135deg,var(--color-secondary),#3a7a32)">MS</div>
                  <div class="rr-person-info">
                    <div class="p-role">Rasoi Maker</div>
                    <div class="p-name">Madhurima Sen</div>
                    <div class="p-loc"><span class="rr-pin-dot" style="background:#2E7D32"></span> Salt Lake, Kolkata</div>
                  </div>
                </div>
                <div class="rr-person-row">
                  <div class="rr-person-avatar" style="background:linear-gradient(135deg,#D96C4A,#e8956e)">SM</div>
                  <div class="rr-person-info">
                    <div class="p-role">Customer</div>
                    <div class="p-name">Sourav Mukherjee</div>
                    <div class="p-loc"><span class="rr-pin-dot" style="background:#e74c3c"></span> New Town, Kolkata</div>
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="rr-panel-card">
                <h4>🍽️ Order Summary</h4>
                <div class="rr-summary-item">🥘 1 x Bengali Thali <span class="rr-view-details">View Details</span></div>
              </div>

              <!-- Delivery Actions -->
              <div class="rr-panel-card">
                <h4>Delivery Actions</h4>
                <div class="rr-action-row">
                  <div><div class="act-label">Go to Pickup</div><div class="act-dist">1.2 km away</div></div>
                  <button class="rr-nav-btn">Navigate</button>
                </div>
                <div class="rr-action-row" style="margin-top:8px">
                  <div><div class="act-label">Go to Customer</div><div class="act-dist">3.8 km away</div></div>
                  <button class="rr-nav-btn">Navigate</button>
                </div>
                <div style="margin-top:16px">
                  <button class="rr-big-btn rr-btn-pickup">✅ Picked Up Order</button>
                  <button class="rr-big-btn rr-btn-delivered">✅ Order Delivered</button>
                </div>
              </div>

              <!-- Quick Message -->
              <div class="rr-panel-card">
                <h4>Quick Message</h4>
                <div class="rr-quick-msgs">
                  <button class="rr-qm" data-msg="I have reached">I have reached</button>
                  <button class="rr-qm" data-msg="Order picked up">Order picked up</button>
                  <button class="rr-qm" data-msg="On my way">On my way</button>
                  <button class="rr-qm" data-msg="Need help">Need help</button>
                </div>
                <div class="rr-msg-input-row">
                  <input class="rr-msg-input" id="rr-msg-input" placeholder="Type a message..." />
                  <button class="rr-send-btn" id="rr-send">➤</button>
                </div>
              </div>
            </div>
          </div>

          <div class="rr-motto">
            <span class="rr-motto-icon">🛵</span>
            <div>
              <p>Delivering smiles, one meal at a time.</p>
              <span class="small">Thank you for being a part of RASOI family! ❤️</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Sidebar nav
    container.querySelectorAll('.rr-nav-item').forEach(btn => {
      btn.addEventListener('click', () => { activeTab = (btn as HTMLElement).dataset.tab || 'live-map'; render(); });
    });

    // Status toggle
    container.querySelector('#rr-status')?.addEventListener('click', () => { if (!isOnline) { isOnline = true; render(); } });
    container.querySelector('#rr-toggle')?.addEventListener('click', () => { isOnline = !isOnline; render(); });

    // Quick messages
    container.querySelectorAll('.rr-qm').forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = (btn as HTMLElement).dataset.msg || '';
        alert('Message sent: "' + msg + '"');
      });
    });

    // Send message
    container.querySelector('#rr-send')?.addEventListener('click', () => {
      const input = container.querySelector('#rr-msg-input') as HTMLInputElement;
      if (input.value.trim()) { alert('Message sent: "' + input.value.trim() + '"'); input.value = ''; }
    });

    // Action buttons
    container.querySelector('.rr-btn-pickup')?.addEventListener('click', () => { alert('Order marked as Picked Up!'); });
    container.querySelector('.rr-btn-delivered')?.addEventListener('click', () => { alert('Order marked as Delivered! Great job!'); });

    // Logout
    container.querySelector('#rr-logout')?.addEventListener('click', () => { window.location.hash = '#/signin'; });
  }

  render();
  return container;
}
