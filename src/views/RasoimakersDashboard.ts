const sidebarItems = [
  { icon: '📊', label: 'Dashboard', id: 'dashboard' },
  { icon: '🍽️', label: 'My Dishes', id: 'my-dishes' },
  { icon: '➕', label: 'Add New Dish', id: 'add-dish' },
  { icon: '📦', label: 'Orders', id: 'orders' },
  { icon: '💰', label: 'Earnings', id: 'earnings' },
  { icon: '⭐', label: 'Reviews', id: 'reviews' },
  { icon: '👤', label: 'Profile', id: 'profile' },
  { icon: '❓', label: 'Help', id: 'help' },
];

export function RasoimakersDashboard() {
  const container = document.createElement('div');
  let activeTab = 'dashboard';
  let spiceLevel = 'Mild';
  let foodType = 'Veg';
  let mealType = 'Lunch';

  function render() {
    container.innerHTML = `
      <style>
        .rm-layout { display: flex; min-height: 100vh; background: #fdfaf5; font-family: var(--font-main); }
        
        /* Sidebar */
        .rm-side {
          width: 260px; background: #fff; border-right: 1px solid #f0ece4;
          display: flex; flex-direction: column; padding: 32px 0;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
        }
        .rm-side-logo { padding: 0 32px 40px; font-size: 1.8rem; font-weight: 800; color: var(--color-secondary); letter-spacing: -1px; }
        
        .rm-nav-item {
          display: flex; align-items: center; gap: 16px; padding: 14px 32px;
          cursor: pointer; transition: 0.3s; color: var(--color-text-muted);
          font-weight: 600; border: none; background: none; width: 100%; text-align: left;
          font-family: var(--font-main); font-size: 0.95rem;
        }
        .rm-nav-item:hover { color: var(--color-primary); background: #fffaf8; }
        .rm-nav-item.active {
          color: var(--color-primary); background: #fffaf8;
          border-right: 4px solid var(--color-primary);
        }
        .rm-nav-item .icon { font-size: 1.2rem; }

        .rm-main { flex: 1; margin-left: 260px; padding: 40px 60px; }
        .rm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .rm-header h2 { font-size: 2rem; color: var(--color-secondary); }
        
        .rm-user-pill {
          display: flex; align-items: center; gap: 12px; background: #fff;
          padding: 8px 20px; border-radius: 40px; border: 1px solid #f0ece4;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .rm-user-pill .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; }

        /* Dashboard Overview */
        .rm-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 40px; }
        .rm-stat-card { background: #fff; padding: 24px; border-radius: 24px; border: 1px solid #f0ece4; box-shadow: 0 8px 24px rgba(0,0,0,0.02); }
        .rm-stat-card .label { font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 8px; font-weight: 600; }
        .rm-stat-card .value { font-size: 1.8rem; font-weight: 800; color: var(--color-secondary); }
        .rm-stat-card .trend { font-size: 0.75rem; color: #2D5A27; font-weight: 700; margin-top: 4px; }

        /* Add Dish Form */
        .rm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .rm-card { background: #fff; padding: 32px; border-radius: 32px; border: 1px solid #f0ece4; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        .rm-card h3 { font-size: 1.2rem; color: var(--color-secondary); margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
        
        .rm-upload {
          width: 100%; height: 240px; border-radius: 24px; border: 2px dashed #f0ece4;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; transition: 0.3s; background: #fffaf8; overflow: hidden; position: relative;
        }
        .rm-upload:hover { border-color: var(--color-primary); background: #fff5f0; }
        .rm-upload img { width: 100%; height: 100%; object-fit: cover; }
        
        .field { margin-bottom: 20px; }
        .field label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 8px; }
        .field input, .field select, .field textarea {
          width: 100%; padding: 14px 18px; border: 1.5px solid #f0ece4; border-radius: 16px;
          font-family: var(--font-main); font-size: 0.95rem; outline: none; transition: 0.3s;
          background: #fdfaf5;
        }
        .field input:focus { border-color: var(--color-primary); background: #fff; }

        .rm-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
        .rm-tag {
          padding: 8px 16px; border-radius: 12px; border: 1.5px solid #f0ece4;
          font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: 0.3s;
          background: #fff; color: var(--color-text-muted);
        }
        .rm-tag.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(217,108,74,0.2); }
        
        .rm-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 40px; padding: 24px 0; border-top: 1px solid #f0ece4; }
        .btn-ghost { padding: 14px 28px; border-radius: 16px; border: 1.5px solid #f0ece4; font-weight: 700; cursor: pointer; background: none; font-family: var(--font-main); }
        .btn-fill { padding: 14px 32px; border-radius: 16px; border: none; background: var(--color-primary); color: #fff; font-weight: 700; cursor: pointer; font-family: var(--font-main); box-shadow: 0 8px 24px rgba(217,108,74,0.2); }
      </style>

      <div class="rm-layout">
        <aside class="rm-side">
          <div class="rm-side-logo">RASOI.</div>
          ${sidebarItems.map(item => `
            <button class="rm-nav-item ${activeTab === item.id ? 'active' : ''}" data-id="${item.id}">
              <span class="icon">${item.icon}</span> ${item.label}
            </button>
          `).join('')}
          <div style="margin-top:auto; padding: 0 20px;">
            <button class="rm-nav-item" style="color:#c0392b;" onclick="window.location.hash='#/signin'">🚪 Logout</button>
          </div>
        </aside>

        <main class="rm-main">
          <header class="rm-header">
            <h2>${activeTab.replace('-', ' ').toUpperCase()}</h2>
            <div class="rm-user-pill">
              <span>English</span>
              <div class="avatar">AD</div>
              <div style="text-align:right;">
                <div style="font-size:0.85rem; font-weight:700;">Ananya D.</div>
                <div style="font-size:0.7rem; color:var(--color-text-muted);">Rasoi Maker</div>
              </div>
            </div>
          </header>

          ${activeTab === 'dashboard' ? `
            <div class="rm-stats">
              <div class="rm-stat-card"><div class="label">Total Orders</div><div class="value">128</div><div class="trend">+12% this week</div></div>
              <div class="rm-stat-card"><div class="label">Total Earnings</div><div class="value">₹14,520</div><div class="trend">+8% this week</div></div>
              <div class="rm-stat-card"><div class="label">Average Rating</div><div class="value">4.9 ⭐</div><div class="trend">12 new reviews</div></div>
              <div class="rm-stat-card"><div class="label">Active Dishes</div><div class="value">12</div><div class="trend">Top rated kitchen</div></div>
            </div>
            
            <div class="rm-card">
              <h3>Recent Orders</h3>
              <p style="color:var(--color-text-muted);">You have 3 orders pending for pickup today.</p>
              <button class="btn-fill" style="margin-top:20px;" onclick="document.querySelector('[data-id=orders]').click()">View All Orders</button>
            </div>
          ` : activeTab === 'add-dish' ? `
            <div class="rm-form-grid">
              <div class="rm-card">
                <h3>📸 Dish Photo</h3>
                <div class="rm-upload" id="upload-box">
                  <div style="text-align:center;">
                    <div style="font-size:2rem; margin-bottom:10px;">📸</div>
                    <div style="font-weight:700; color:var(--color-primary);">Click to Upload Photo</div>
                    <div style="font-size:0.8rem; color:var(--color-text-muted);">Recommended size: 1080x1080px</div>
                  </div>
                </div>
                
                <div class="field" style="margin-top:24px;">
                  <label>Dish Name</label>
                  <input type="text" placeholder="e.g. Traditional Fish Curry" />
                </div>
                <div class="field">
                  <label>Price (₹)</label>
                  <input type="number" placeholder="150" />
                </div>
              </div>

              <div class="rm-card">
                <h3>📋 Specifications</h3>
                <div class="field">
                  <label>Spice Level</label>
                  <div class="rm-tags">
                    ${['Mild', 'Medium', 'Spicy', 'Extra Spicy'].map(s => `<div class="rm-tag ${spiceLevel === s ? 'active' : ''}" data-type="spice" data-val="${s}">${s}</div>`).join('')}
                  </div>
                </div>
                <div class="field">
                  <label>Food Type</label>
                  <div class="rm-tags">
                    ${['Veg', 'Non-Veg', 'Eggetarian'].map(s => `<div class="rm-tag ${foodType === s ? 'active' : ''}" data-type="food" data-val="${s}">${s}</div>`).join('')}
                  </div>
                </div>
                <div class="field">
                  <label>Meal Type</label>
                  <div class="rm-tags">
                    ${['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(s => `<div class="rm-tag ${mealType === s ? 'active' : ''}" data-type="meal" data-val="${s}">${s}</div>`).join('')}
                  </div>
                </div>
              </div>
            </div>

            <div class="rm-actions">
              <button class="btn-ghost">Save Draft</button>
              <button class="btn-fill" onclick="alert('Dish Published Successfully!')">🚀 Publish Dish</button>
            </div>
          ` : `
            <div class="rm-card" style="text-align:center; padding:100px;">
              <div style="font-size:4rem; margin-bottom:20px;">🚧</div>
              <h3>${activeTab.replace('-', ' ').toUpperCase()} Section</h3>
              <p>This part of the dashboard is coming soon.</p>
            </div>
          `}
        </main>
      </div>
    `;

    container.querySelectorAll('.rm-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id;
        if (id) { activeTab = id; render(); }
      });
    });

    container.querySelectorAll('.rm-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const type = (tag as HTMLElement).dataset.type;
        const val = (tag as HTMLElement).dataset.val || '';
        if (type === 'spice') spiceLevel = val;
        if (type === 'food') foodType = val;
        if (type === 'meal') mealType = val;
        render();
      });
    });
  }

  render();
  return container;
}
