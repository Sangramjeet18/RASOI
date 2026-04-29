import { dashboardCSS } from './dashboardStyles';

const runnerNav = [
  { icon: 'local_shipping', label: 'Available Orders', id: 'available' },
  { icon: 'delivery_dining', label: 'Active Delivery', id: 'active' },
  { icon: 'history', label: 'My Deliveries', id: 'history' },
  { icon: 'payments', label: 'Earnings', id: 'earnings' },
  { icon: 'person', label: 'Profile', id: 'profile' },
  { icon: 'support_agent', label: 'Support', id: 'support' },
];

function getOrders() { try { return JSON.parse(localStorage.getItem('rasoi_orders') || '[]'); } catch { return []; } }
function getRunnerProfile() {
  try {
    return JSON.parse(localStorage.getItem('rasoi_runner_profile') || 'null') || {
      name: 'Arjun Das', phone: '+91 87654 32109', email: 'arjun@rasoi.com',
      vehicle: 'Bike', license: 'WB-1234', avatar: '', area: 'New Town, Kolkata'
    };
  } catch { return { name: 'Arjun Das', phone: '', email: '', vehicle: 'Bike', license: '', avatar: '', area: '' }; }
}
function saveRunnerProfile(p: any) { localStorage.setItem('rasoi_runner_profile', JSON.stringify(p)); }
function getDeliveryHistory() { try { return JSON.parse(localStorage.getItem('rasoi_delivery_history') || '[]'); } catch { return []; } }

export function RunnersDashboard() {
  const container = document.createElement('div');
  let activeTab = 'available';
  let isOnline = true;
  let activeOrderId = localStorage.getItem('runner_active_order') || '';
  let deliveryStep = parseInt(localStorage.getItem('runner_delivery_step') || '0');
  let otpError = '';

  function getReadyOrders() { return getOrders().filter((o: any) => o.status === 'ready' && !o.runnerId); }
  function getActiveOrder() { return getOrders().find((o: any) => o.id === activeOrderId); }

  function acceptDelivery(orderId: string) {
    const orders = getOrders();
    const order = orders.find((o: any) => o.id === orderId);
    if (order) {
      order.runnerId = 'runner1';
      localStorage.setItem('rasoi_orders', JSON.stringify(orders));
      activeOrderId = orderId;
      deliveryStep = 1;
      localStorage.setItem('runner_active_order', orderId);
      localStorage.setItem('runner_delivery_step', '1');
      activeTab = 'active';
      render();
    }
  }

  function verifyPickupOtp() {
    const inputs = container.querySelectorAll('.otp-digit') as NodeListOf<HTMLInputElement>;
    const entered = Array.from(inputs).map(i => i.value).join('');
    const order = getActiveOrder();
    if (!order) return;
    if (entered === order.otp) {
      const orders = getOrders();
      const o = orders.find((x: any) => x.id === activeOrderId);
      if (o) { o.status = 'picked_up'; localStorage.setItem('rasoi_orders', JSON.stringify(orders)); }
      deliveryStep = 3;
      localStorage.setItem('runner_delivery_step', '3');
      otpError = '';
      render();
    } else {
      otpError = 'Invalid OTP. Please try again.';
      render();
    }
  }

  function verifyDeliveryOtp() {
    const inputs = container.querySelectorAll('.del-otp-digit') as NodeListOf<HTMLInputElement>;
    const entered = Array.from(inputs).map(i => i.value).join('');
    const order = getActiveOrder();
    if (!order) return;
    if (entered === order.deliveryOtp) {
      const orders = getOrders();
      const o = orders.find((x: any) => x.id === activeOrderId);
      if (o) { o.status = 'delivered'; localStorage.setItem('rasoi_orders', JSON.stringify(orders)); }
      const hist = getDeliveryHistory();
      hist.push({ id: activeOrderId, date: new Date().toLocaleDateString(), items: order.items, amount: order.price, tip: Math.floor(Math.random() * 30) + 10 });
      localStorage.setItem('rasoi_delivery_history', JSON.stringify(hist));
      activeOrderId = '';
      deliveryStep = 0;
      localStorage.removeItem('runner_active_order');
      localStorage.removeItem('runner_delivery_step');
      otpError = '';
      activeTab = 'history';
      render();
    } else {
      otpError = 'Invalid delivery OTP.';
      render();
    }
  }

  function renderAvailable() {
    const ready = getReadyOrders();
    return `
      <div class="db-header"><h1>Available Orders</h1><p>Orders ready for pickup from Rasoimakers.</p></div>
      ${ready.length === 0 ? '<div class="db-card" style="text-align:center;padding:48px"><span class="material-icons-round" style="font-size:3rem;color:var(--db-muted);margin-bottom:12px">inventory_2</span><p style="color:var(--db-muted);font-size:1.05rem">No orders ready for pickup right now.</p><p style="color:var(--db-muted);font-size:.85rem">When a Rasoimaker marks an order as ready, it will appear here.</p></div>' : ''}
      <div style="display:flex;flex-direction:column;gap:14px">
      ${ready.map((o: any) => `
        <div class="db-card" style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
              <span class="db-status ready">Ready for Pickup</span>
              <span style="color:var(--db-muted);font-size:.8rem">Order #${(o.id || '').slice(-6)}</span>
            </div>
            <h3 style="font-size:1.05rem;margin-bottom:6px">📦 ${(o.items || []).join(', ')}</h3>
            <p style="font-weight:600;margin-bottom:4px">₹${o.price || 0}</p>
            <p style="font-size:.82rem;color:var(--db-muted)">👨‍🍳 Pickup: Rasoimaker Kitchen · Salt Lake</p>
            <p style="font-size:.82rem;color:var(--db-muted)">🏠 Deliver to: Customer · New Town</p>
          </div>
          <div style="min-width:150px;text-align:center">
            <p style="font-size:.78rem;color:var(--db-muted);margin-bottom:8px">Est. 2.5 km · 12 min</p>
            <button class="db-btn db-btn-primary accept-delivery-btn" data-id="${o.id}" style="width:100%">Accept Delivery</button>
          </div>
        </div>`).join('')}
      </div>`;
  }

  function renderActive() {
    const order = getActiveOrder();
    if (!order) return `<div class="db-header"><h1>Active Delivery</h1></div><div class="db-card" style="text-align:center;padding:48px"><p style="color:var(--db-muted)">No active delivery. Accept an order from "Available Orders".</p></div>`;

    const steps = [
      { label: 'Order Accepted', desc: 'Head to Rasoimaker kitchen', icon: 'check_circle', done: deliveryStep >= 1 },
      { label: 'Verify Pickup OTP', desc: 'Enter 4-digit code from cook', icon: 'pin', done: deliveryStep >= 3 },
      { label: 'Navigate to Customer', desc: order.status === 'picked_up' ? '🏠 New Town, Action Area 1' : 'Location revealed after pickup', icon: 'navigation', done: deliveryStep >= 4 },
      { label: 'Confirm Delivery', desc: 'Enter customer delivery OTP', icon: 'verified', done: deliveryStep >= 5 },
    ];

    const mapPositions = [
      { runner: '30%', label: 'Heading to kitchen' },
      { runner: '30%', label: 'At kitchen — verify OTP' },
      { runner: '30%', label: 'OTP verified!' },
      { runner: '60%', label: 'Heading to customer' },
      { runner: '80%', label: 'At customer — confirm delivery' },
    ];
    const mp = mapPositions[Math.min(deliveryStep, 4)];

    return `
      <div class="db-header"><h1>Active Delivery</h1><p>Order #${(order.id || '').slice(-6)} · ₹${order.price}</p></div>
      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:28px;align-items:start">
        <div>
          <div class="db-card" style="padding:0;overflow:hidden">
            <div style="padding:18px 22px;border-bottom:1px solid var(--db-border);display:flex;justify-content:space-between;align-items:center">
              <div><h3 style="font-weight:700;font-size:1rem">Live Map</h3><p style="font-size:.78rem;color:var(--db-muted)">${mp.label}</p></div>
              <span class="db-status ${order.status}">${order.status.replace('_', ' ')}</span>
            </div>
            <div style="height:320px;background:#E5E1DA;position:relative;display:flex;align-items:center;justify-content:center">
              <div style="position:absolute;top:25%;left:20%;width:42px;height:42px;border-radius:50%;background:#fff;border:2px solid var(--db-primary);display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:0 4px 12px rgba(0,0,0,.1)">👨‍🍳</div>
              <div class="db-pulse" style="position:absolute;top:45%;left:${mp.runner};width:42px;height:42px;border-radius:50%;background:#fff;border:2px solid var(--db-green);display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:0 4px 12px rgba(0,0,0,.1);z-index:2;transition:left .8s ease">🛵</div>
              ${deliveryStep >= 3 ? '<div style="position:absolute;bottom:25%;right:18%;width:42px;height:42px;border-radius:50%;background:#fff;border:2px solid #F59E0B;display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:0 4px 12px rgba(0,0,0,.1)">🏠</div>' : ''}
              <div style="position:absolute;top:12px;left:12px;background:rgba(255,255,255,.9);padding:8px 14px;border-radius:8px;font-size:.75rem;display:flex;gap:16px">
                <span>👨‍🍳 Rasoimaker</span><span>🛵 You</span>${deliveryStep >= 3 ? '<span>🏠 Customer</span>' : ''}
              </div>
            </div>
          </div>

          ${deliveryStep === 1 || deliveryStep === 2 ? `
          <div class="db-card" style="margin-top:16px">
            <div class="db-card-title">🔐 Pickup OTP Verification</div>
            <p style="color:var(--db-muted);font-size:.88rem;margin-bottom:16px">Ask the Rasoimaker for the 4-digit pickup code:</p>
            <div class="db-otp-group">
              <input type="text" maxlength="1" class="db-otp-input otp-digit" data-idx="0">
              <input type="text" maxlength="1" class="db-otp-input otp-digit" data-idx="1">
              <input type="text" maxlength="1" class="db-otp-input otp-digit" data-idx="2">
              <input type="text" maxlength="1" class="db-otp-input otp-digit" data-idx="3">
            </div>
            ${otpError ? `<p style="color:var(--db-red);text-align:center;font-size:.85rem;margin-bottom:12px">${otpError}</p>` : ''}
            <button class="db-btn db-btn-primary" id="verify-pickup-btn" style="width:100%;margin-top:8px">Verify & Pick Up</button>
          </div>` : ''}

          ${deliveryStep >= 3 && deliveryStep < 5 ? `
          <div class="db-card" style="margin-top:16px">
            <div class="db-card-title">📍 Customer Location Revealed</div>
            <div style="background:var(--db-bg);padding:16px;border-radius:10px;margin-bottom:16px">
              <p style="font-weight:600;margin-bottom:4px">🏠 Sourav Mukherjee</p>
              <p style="color:var(--db-muted);font-size:.88rem">New Town, Action Area 1, Block AB, Flat 12B</p>
              <p style="color:var(--db-muted);font-size:.82rem;margin-top:4px">📞 +91 90123 45678</p>
            </div>
            <div class="db-card-title">🔐 Delivery OTP Verification</div>
            <p style="color:var(--db-muted);font-size:.88rem;margin-bottom:16px">Ask the customer for the delivery code:</p>
            <div class="db-otp-group">
              <input type="text" maxlength="1" class="db-otp-input del-otp-digit" data-idx="0">
              <input type="text" maxlength="1" class="db-otp-input del-otp-digit" data-idx="1">
              <input type="text" maxlength="1" class="db-otp-input del-otp-digit" data-idx="2">
              <input type="text" maxlength="1" class="db-otp-input del-otp-digit" data-idx="3">
            </div>
            ${otpError ? `<p style="color:var(--db-red);text-align:center;font-size:.85rem;margin-bottom:12px">${otpError}</p>` : ''}
            <button class="db-btn db-btn-success" id="verify-delivery-btn" style="width:100%;margin-top:8px">Confirm Delivery</button>
          </div>` : ''}
        </div>

        <div>
          <div class="db-card">
            <div class="db-card-title">📋 Delivery Progress</div>
            ${steps.map((s, i) => `
              <div class="db-step ${deliveryStep > i ? 'done' : ''} ${deliveryStep === i + 1 ? 'active' : ''}">
                <div class="db-step-dot"><span class="material-icons-round" style="font-size:16px">${s.done ? 'check' : s.icon}</span></div>
                <div><div style="font-size:.82rem;font-weight:600">${s.label}</div><div style="font-size:.75rem;color:var(--db-muted)">${s.desc}</div></div>
              </div>`).join('')}
          </div>
          <div class="db-card">
            <div class="db-card-title">📦 Order Details</div>
            <p style="font-size:.88rem;margin-bottom:6px"><strong>Items:</strong> ${(order.items || []).join(', ')}</p>
            <p style="font-size:.88rem;margin-bottom:6px"><strong>Amount:</strong> ₹${order.price}</p>
            <p style="font-size:.88rem"><strong>Payment:</strong> Online Paid</p>
          </div>
        </div>
      </div>`;
  }

  function renderHistory() {
    const hist = getDeliveryHistory();
    return `
      <div class="db-header"><h1>My Deliveries</h1><p>Your completed delivery history.</p></div>
      ${hist.length === 0 ? '<div class="db-card" style="text-align:center;padding:48px"><p style="color:var(--db-muted)">No deliveries yet. Complete your first delivery to see it here.</p></div>' : ''}
      <div class="db-card">
        <table class="db-table"><thead><tr><th>Date</th><th>Order</th><th>Items</th><th>Amount</th><th>Tip</th><th>Status</th></tr></thead>
        <tbody>${hist.map((h: any) => `<tr><td style="color:var(--db-muted)">${h.date}</td><td style="font-weight:500">#${(h.id || '').slice(-6)}</td><td>${(h.items || []).join(', ')}</td><td style="font-weight:600">₹${h.amount}</td><td style="color:var(--db-green);font-weight:600">+₹${h.tip}</td><td><span class="db-status delivered">Delivered</span></td></tr>`).join('')}</tbody></table>
      </div>`;
  }

  function renderEarnings() {
    const hist = getDeliveryHistory();
    const total = hist.reduce((s: number, h: any) => s + (h.tip || 0) + 25, 0);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const vals = [120, 180, 95, 210, 150, 280, 190];
    const max = Math.max(...vals);
    return `
      <div class="db-header"><h1>Earnings</h1><p>Track your delivery earnings and tips.</p></div>
      <div class="db-grid-3">
        <div class="db-card db-stat" style="border-left:4px solid var(--db-primary)"><div class="val">₹${total || 740}</div><div class="lab">Total Earnings</div></div>
        <div class="db-card db-stat" style="border-left:4px solid var(--db-green)"><div class="val">${hist.length || 12}</div><div class="lab">Deliveries</div></div>
        <div class="db-card db-stat" style="border-left:4px solid #F59E0B"><div class="val">₹${hist.reduce((s: number, h: any) => s + (h.tip || 0), 0) || 180}</div><div class="lab">Tips Earned</div></div>
      </div>
      <div class="db-card"><div class="db-card-title">📊 Weekly Earnings</div>
        <div class="db-chart-bar">${vals.map((v, i) => `<div style="flex:1;text-align:center"><div class="bar" style="height:${(v / max) * 100}%"></div><div class="bar-label">${days[i]}</div></div>`).join('')}</div>
      </div>`;
  }

  function renderProfile() {
    const p = getRunnerProfile();
    return `
      <div class="db-header"><h1>Runner Profile</h1><p>Manage your delivery profile.</p></div>
      <div class="db-card">
        <div style="display:flex;gap:28px;align-items:flex-start;margin-bottom:24px">
          <div style="position:relative">
            <div style="width:100px;height:100px;border-radius:50%;overflow:hidden;border:3px solid var(--db-secondary);cursor:pointer" id="runner-avatar-trigger">
              ${p.avatar ? `<img src="${p.avatar}" style="width:100%;height:100%;object-fit:cover">` : `<div style="width:100%;height:100%;background:var(--db-secondary);display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--db-primary)">${p.name.charAt(0)}</div>`}
            </div>
            <input type="file" id="runner-avatar-input" accept="image/*" style="display:none">
          </div>
          <div style="flex:1">
            <div class="db-form-grid">
              <div class="db-field"><label>Full Name</label><input type="text" class="db-input" id="rp-name" value="${p.name}"></div>
              <div class="db-field"><label>Phone</label><input type="text" class="db-input" id="rp-phone" value="${p.phone}"></div>
              <div class="db-field"><label>Email</label><input type="text" class="db-input" id="rp-email" value="${p.email}"></div>
              <div class="db-field"><label>Delivery Area</label><input type="text" class="db-input" id="rp-area" value="${p.area}"></div>
              <div class="db-field"><label>Vehicle Type</label><select class="db-input" id="rp-vehicle"><option ${p.vehicle === 'Bike' ? 'selected' : ''}>Bike</option><option ${p.vehicle === 'Bicycle' ? 'selected' : ''}>Bicycle</option><option ${p.vehicle === 'Scooter' ? 'selected' : ''}>Scooter</option></select></div>
              <div class="db-field"><label>License Plate</label><input type="text" class="db-input" id="rp-license" value="${p.license}"></div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;border-top:1px solid var(--db-border);padding-top:16px">
          <button class="db-btn db-btn-primary" id="save-runner-profile">Save Changes</button>
        </div>
      </div>`;
  }

  function renderSupport() {
    return `
      <div class="db-header"><h1>Support</h1><p>Get help with deliveries.</p></div>
      <div class="db-grid-2">
        <div class="db-card"><div class="db-card-title">📞 Emergency</div><p style="color:var(--db-muted);font-size:.88rem">Call +91 98765 43210</p></div>
        <div class="db-card"><div class="db-card-title">💬 Live Chat</div><p style="color:var(--db-muted);font-size:.88rem">Chat with support team</p></div>
      </div>`;
  }

  function renderContent() {
    switch (activeTab) {
      case 'available': return renderAvailable();
      case 'active': return renderActive();
      case 'history': return renderHistory();
      case 'earnings': return renderEarnings();
      case 'profile': return renderProfile();
      case 'support': return renderSupport();
      default: return renderAvailable();
    }
  }

  function render() {
    const profile = getRunnerProfile();
    container.innerHTML = `
      <style>${dashboardCSS}</style>
      <div class="db-app">
        <aside class="db-sidebar">
          <div class="db-sidebar-logo">RASOI.</div>
          <div style="margin:0 16px 24px;padding:18px;background:var(--db-bg);border-radius:var(--db-r);text-align:center;border:1px solid var(--db-border)">
            <div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:.75rem;font-weight:700;margin-bottom:10px;color:${isOnline ? 'var(--db-green)' : 'var(--db-red)'}">
              <span style="width:8px;height:8px;border-radius:50%;background:currentColor"></span> ${isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
            <button class="db-btn db-btn-outline" style="width:100%;padding:8px;font-size:.83rem" id="toggle-duty">${isOnline ? 'Go Offline' : 'Go Online'}</button>
          </div>
          <nav class="db-nav">
            ${runnerNav.map(item => `
              <button class="db-nav-item ${activeTab === item.id ? 'active' : ''}" data-id="${item.id}">
                <span class="material-icons-round">${item.icon}</span>${item.label}
                ${item.id === 'available' && getReadyOrders().length > 0 ? `<span class="db-badge">${getReadyOrders().length}</span>` : ''}
                ${item.id === 'active' && activeOrderId ? '<span class="db-badge">1</span>' : ''}
              </button>`).join('')}
          </nav>
          <div style="padding:20px 12px;border-top:1px solid var(--db-border)">
            <button class="db-nav-item" id="rr-logout"><span class="material-icons-round">logout</span>Logout</button>
          </div>
        </aside>
        <main class="db-main">
          <header class="db-navbar">
            <div style="display:flex;align-items:center;gap:10px;padding-left:20px;border-left:1px solid var(--db-border)">
              <div style="text-align:right"><div style="font-size:.83rem;font-weight:600">${profile.name}</div><div style="font-size:.72rem;color:var(--db-muted)">Rasoi Runner</div></div>
              ${profile.avatar ? `<img src="${profile.avatar}" class="db-avatar">` : `<div class="db-avatar" style="background:var(--db-secondary);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--db-primary)">${profile.name.charAt(0)}</div>`}
            </div>
          </header>
          <div class="db-content">${renderContent()}</div>
        </main>
      </div>`;
    bindEvents();
  }

  function bindEvents() {
    setTimeout(() => {
      container.querySelectorAll('.db-nav-item[data-id]').forEach(btn => {
        btn.addEventListener('click', () => { activeTab = (btn as HTMLElement).dataset.id || 'available'; render(); });
      });
      container.querySelector('#toggle-duty')?.addEventListener('click', () => { isOnline = !isOnline; render(); });
      container.querySelector('#rr-logout')?.addEventListener('click', () => { window.location.hash = '#/signin'; });

      // Accept delivery
      container.querySelectorAll('.accept-delivery-btn').forEach(btn => {
        btn.addEventListener('click', () => { const id = (btn as HTMLElement).dataset.id; if (id) acceptDelivery(id); });
      });

      // OTP auto-focus
      container.querySelectorAll('.otp-digit, .del-otp-digit').forEach((inp, i, list) => {
        (inp as HTMLInputElement).addEventListener('input', () => {
          if ((inp as HTMLInputElement).value && i < list.length - 1) (list[i + 1] as HTMLInputElement).focus();
        });
      });

      // Verify pickup OTP
      container.querySelector('#verify-pickup-btn')?.addEventListener('click', () => verifyPickupOtp());
      // Verify delivery OTP
      container.querySelector('#verify-delivery-btn')?.addEventListener('click', () => verifyDeliveryOtp());

      // Runner profile
      const avatarInput = container.querySelector('#runner-avatar-input') as HTMLInputElement;
      container.querySelector('#runner-avatar-trigger')?.addEventListener('click', () => avatarInput?.click());
      avatarInput?.addEventListener('change', () => {
        const file = avatarInput.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => { const p = getRunnerProfile(); p.avatar = e.target?.result as string; saveRunnerProfile(p); render(); };
          reader.readAsDataURL(file);
        }
      });
      container.querySelector('#save-runner-profile')?.addEventListener('click', () => {
        const p = getRunnerProfile();
        p.name = (container.querySelector('#rp-name') as HTMLInputElement)?.value || p.name;
        p.phone = (container.querySelector('#rp-phone') as HTMLInputElement)?.value || p.phone;
        p.email = (container.querySelector('#rp-email') as HTMLInputElement)?.value || p.email;
        p.area = (container.querySelector('#rp-area') as HTMLInputElement)?.value || p.area;
        p.vehicle = (container.querySelector('#rp-vehicle') as HTMLSelectElement)?.value || p.vehicle;
        p.license = (container.querySelector('#rp-license') as HTMLInputElement)?.value || p.license;
        saveRunnerProfile(p);
        alert('Profile saved!');
        render();
      });
    }, 0);
  }

  window.addEventListener('storage', (e) => { if (e.key === 'rasoi_orders') render(); });
  render();
  return container;
}
