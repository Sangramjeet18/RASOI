const sidebarItems = [
  { icon: '📊', label: 'Dashboard', id: 'dashboard', active: false },
  { icon: '🍽️', label: 'My Dishes', id: 'my-dishes', active: false },
  { icon: '➕', label: 'Add New Dish', id: 'add-dish', active: true },
  { icon: '📦', label: 'Orders', id: 'orders', active: false },
  { icon: '💰', label: 'Earnings', id: 'earnings', active: false },
  { icon: '⭐', label: 'Reviews', id: 'reviews', active: false },
  { icon: '👤', label: 'Profile', id: 'profile', active: false },
  { icon: '❓', label: 'Help & Support', id: 'help', active: false },
];

export function RasoimakersDashboard() {
  const container = document.createElement('div');

  let activeTab = 'add-dish';
  let spiceLevel = 'Mild';
  let foodType = 'Veg';
  let mealType = 'Lunch';
  const foodPrefs: string[] = ['Satvik'];

  function render() {
    container.innerHTML = `
      <style>
        .rm-layout { display: flex; min-height: 100vh; background: #F7F4EB; font-family: var(--font-main); }

        /* Sidebar */
        .rm-sidebar {
          width: 220px;
          background: #fff;
          border-right: 1px solid #ece8e0;
          display: flex;
          flex-direction: column;
          padding: 24px 0;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
          overflow-y: auto;
        }
        .rm-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 24px 28px;
          border-bottom: 1px solid #ece8e0;
          margin-bottom: 16px;
        }
        .rm-sidebar-brand .brand-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, #D96C4A, #e8956e);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: #fff;
        }
        .rm-sidebar-brand h2 { font-size: 1.3rem; color: var(--color-secondary); letter-spacing: 1px; }
        .rm-sidebar-brand p { font-size: 0.7rem; color: var(--color-text-muted); margin-top: 2px; }

        .rm-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 24px; margin: 2px 12px;
          border-radius: 12px; cursor: pointer;
          font-size: 0.92rem; font-weight: 500;
          color: var(--color-text-muted);
          transition: all 0.2s ease;
          border: none; background: none; width: calc(100% - 24px);
          text-align: left; font-family: var(--font-main);
        }
        .rm-nav-item:hover { background: #f5f2ea; color: var(--color-text-main); }
        .rm-nav-item.active {
          background: linear-gradient(135deg, var(--color-primary), #e8956e);
          color: #fff; font-weight: 600;
          box-shadow: 0 4px 12px rgba(217,108,74,0.25);
        }
        .rm-nav-item .nav-icon { font-size: 1.1rem; width: 24px; text-align: center; }
        .rm-nav-logout {
          margin-top: auto; padding: 12px 24px; margin-left: 12px; margin-right: 12px;
          border-radius: 12px; cursor: pointer;
          font-size: 0.92rem; font-weight: 500;
          color: #c0392b; border: none; background: #fdf2f2;
          display: flex; align-items: center; gap: 12px;
          transition: all 0.2s; text-align: left; font-family: var(--font-main); width: calc(100% - 24px);
        }
        .rm-nav-logout:hover { background: #f8d7da; }

        /* Main Content */
        .rm-main { flex: 1; margin-left: 220px; padding: 0; }

        /* Top Bar */
        .rm-topbar {
          display: flex; justify-content: flex-end; align-items: center; gap: 20px;
          padding: 16px 32px; background: #fff; border-bottom: 1px solid #ece8e0;
          position: sticky; top: 0; z-index: 50;
        }
        .rm-topbar select {
          padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px;
          font-family: var(--font-main); font-size: 0.85rem; background: #fff; cursor: pointer;
        }
        .rm-topbar .rm-notif { font-size: 1.3rem; cursor: pointer; position: relative; }
        .rm-topbar .rm-user {
          display: flex; align-items: center; gap: 10px; cursor: pointer;
        }
        .rm-topbar .rm-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #D96C4A, #e8956e);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 0.85rem;
        }
        .rm-topbar .rm-user-info { text-align: right; }
        .rm-topbar .rm-user-info .name { font-size: 0.9rem; font-weight: 600; color: var(--color-text-main); }
        .rm-topbar .rm-user-info .role { font-size: 0.75rem; color: var(--color-text-muted); }

        /* Content Area */
        .rm-content { padding: 32px; max-width: 1100px; }
        .rm-content h1 { font-size: 1.8rem; color: var(--color-secondary); margin-bottom: 4px; }
        .rm-content .subtitle { color: var(--color-text-muted); margin-bottom: 8px; font-size: 0.95rem; }
        .rm-content .title-line { width: 40px; height: 3px; background: var(--color-primary); border-radius: 2px; margin-bottom: 28px; }

        /* Form Cards */
        .rm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
        @media (max-width: 900px) { .rm-grid { grid-template-columns: 1fr; } }
        .rm-card {
          background: #fff; border-radius: 16px; padding: 28px;
          border: 1px solid #ece8e0;
          transition: box-shadow 0.3s;
        }
        .rm-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .rm-card h3 { font-size: 1.1rem; color: var(--color-secondary); margin-bottom: 20px; }
        .rm-card label { display: block; font-size: 0.85rem; font-weight: 600; color: #555; margin-bottom: 6px; }
        .rm-card input, .rm-card select, .rm-card textarea {
          width: 100%; padding: 12px 14px; border: 1.5px solid #e0dcd4; border-radius: 10px;
          font-family: var(--font-main); font-size: 0.92rem; background: #FFFCF8;
          outline: none; transition: border-color 0.3s, box-shadow 0.3s;
          margin-bottom: 16px; resize: vertical;
        }
        .rm-card input:focus, .rm-card select:focus, .rm-card textarea:focus {
          border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(217,108,74,0.1);
        }
        .rm-card .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* Photo Upload */
        .rm-photo-area {
          width: 100%; aspect-ratio: 4/3; border-radius: 12px;
          background: linear-gradient(135deg, #f5f2ea, #ece8e0);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; border: 2px dashed #d4cfbf;
          transition: all 0.3s; margin-bottom: 12px; overflow: hidden; position: relative;
        }
        .rm-photo-area:hover { border-color: var(--color-primary); background: #FFF7F2; }
        .rm-photo-area .upload-icon { font-size: 2.5rem; margin-bottom: 8px; }
        .rm-photo-area .upload-text { font-size: 0.85rem; color: var(--color-primary); font-weight: 600; }
        .rm-photo-area .upload-hint { font-size: 0.75rem; color: var(--color-text-muted); }
        .rm-photo-area img {
          width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;
        }
        .rm-photo-close {
          position: absolute; top: 8px; right: 8px; width: 28px; height: 28px;
          border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; border: none;
          cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center;
          z-index: 2;
        }

        /* Tag Buttons */
        .rm-tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .rm-tag-row label { width: 100%; }
        .rm-tag {
          padding: 8px 18px; border-radius: 20px; border: 1.5px solid #e0dcd4;
          font-size: 0.85rem; font-weight: 500; cursor: pointer;
          transition: all 0.2s; background: #fff; color: var(--color-text-main);
          font-family: var(--font-main);
        }
        .rm-tag:hover { border-color: var(--color-primary); }
        .rm-tag.active {
          background: var(--color-primary); color: #fff; border-color: var(--color-primary);
          box-shadow: 0 2px 8px rgba(217,108,74,0.2);
        }
        .rm-tag.green.active { background: var(--color-secondary); border-color: var(--color-secondary); box-shadow: 0 2px 8px rgba(45,90,39,0.2); }

        /* Checkbox row */
        .rm-check-row { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 8px; }
        .rm-check-row label { width: 100%; font-size: 0.85rem; font-weight: 600; color: #555; }
        .rm-check-item {
          display: flex; align-items: center; gap: 6px; font-size: 0.88rem;
          cursor: pointer; color: var(--color-text-main);
        }
        .rm-check-item input { width: 18px; height: 18px; accent-color: var(--color-primary); }

        /* Info row */
        .rm-info-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .rm-info-row .info-icon { font-size: 1.1rem; }

        /* Bottom Actions */
        .rm-actions {
          display: flex; justify-content: flex-end; gap: 16px;
          padding: 20px 32px; background: #fff; border-top: 1px solid #ece8e0;
          position: sticky; bottom: 0;
        }
        .rm-btn-draft {
          padding: 14px 28px; border-radius: 12px; border: 1.5px solid #e0dcd4;
          background: #fff; font-weight: 600; font-size: 0.95rem;
          cursor: pointer; transition: all 0.2s; font-family: var(--font-main);
          display: flex; align-items: center; gap: 8px; color: var(--color-text-main);
        }
        .rm-btn-draft:hover { border-color: var(--color-secondary); background: var(--color-secondary-light); }
        .rm-btn-publish {
          padding: 14px 28px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, var(--color-primary), #e8956e); color: #fff;
          font-weight: 600; font-size: 0.95rem; cursor: pointer;
          transition: all 0.3s; font-family: var(--font-main);
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 16px rgba(217,108,74,0.3);
        }
        .rm-btn-publish:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(217,108,74,0.4); }
      </style>

      <div class="rm-layout">
        <!-- Sidebar -->
        <aside class="rm-sidebar">
          <div class="rm-sidebar-brand">
            <div class="brand-icon">🍳</div>
            <div>
              <h2>RASOI</h2>
              <p>Food that feels like home</p>
            </div>
          </div>

          ${sidebarItems.map(item => `
            <button class="rm-nav-item ${activeTab === item.id ? 'active' : ''}" data-tab="${item.id}">
              <span class="nav-icon">${item.icon}</span> ${item.label}
            </button>
          `).join('')}

          <button class="rm-nav-logout" id="rm-logout">
            <span class="nav-icon">🚪</span> Logout
          </button>
        </aside>

        <!-- Main -->
        <div class="rm-main">
          <div class="rm-topbar">
            <select><option>🌐 English</option><option>বাংলা</option><option>हिंदी</option></select>
            <span class="rm-notif">🔔</span>
            <div class="rm-user">
              <div class="rm-user-info">
                <div class="name">Ananya D.</div>
                <div class="role">Rasoi Maker</div>
              </div>
              <div class="rm-avatar">AD</div>
            </div>
          </div>

          <div class="rm-content">
            <h1>Add New Dish</h1>
            <p class="subtitle">Share your delicious homemade food with people.</p>
            <div class="title-line"></div>

            <div class="rm-grid">
              <!-- 1. Dish Photo -->
              <div class="rm-card">
                <h3>1. Dish Photo</h3>
                <p style="font-size:0.85rem; color: var(--color-text-muted); margin-bottom: 16px;">Upload a clear and appealing photo of your dish</p>
                <div class="rm-photo-area" id="rm-photo-area">
                  <span class="upload-icon">📷</span>
                  <span class="upload-text">Click to Upload</span>
                  <span class="upload-hint">JPG, PNG up to 5MB</span>
                </div>
                <input type="file" id="rm-photo-input" accept="image/*" style="display:none;" />
              </div>

              <!-- 2. Basic Details -->
              <div class="rm-card">
                <h3>2. Basic Details</h3>
                <label>Dish Name</label>
                <input type="text" placeholder="e.g. Bengali Moong Dal" />
                <label>Category</label>
                <select>
                  <option>Lunch</option><option>Breakfast</option><option>Dinner</option><option>Snack</option><option>Dessert</option>
                </select>
                <div class="field-row">
                  <div>
                    <label>Price (per plate)</label>
                    <input type="number" placeholder="120" min="1" />
                  </div>
                  <div>
                    <label>Serves</label>
                    <select><option>1</option><option>2</option><option>3</option><option>4</option></select>
                  </div>
                </div>
              </div>
            </div>

            <div class="rm-grid">
              <!-- 3. Describe Your Dish -->
              <div class="rm-card">
                <h3>3. Describe Your Dish</h3>
                <label>Ingredients</label>
                <textarea rows="3" placeholder="e.g. Moong dal, turmeric, green chili, ginger, cumin, ghee, salt, sugar." maxlength="300"></textarea>
                <label>Taste & Flavour</label>
                <textarea rows="3" placeholder="e.g. Light, comforting and mildly spiced with a hint of sweetness." maxlength="300"></textarea>
              </div>

              <!-- 4. Additional Information -->
              <div class="rm-card">
                <h3>4. Additional Information</h3>

                <div class="rm-tag-row">
                  <label><span class="info-icon">🌶️</span> Spice Level</label>
                  ${['Mild', 'Medium', 'Spicy'].map(s => `<button class="rm-tag ${spiceLevel === s ? 'active' : ''}" data-group="spice" data-val="${s}">${s}</button>`).join('')}
                </div>

                <div class="rm-tag-row">
                  <label><span class="info-icon">🥗</span> Food Type</label>
                  ${['Veg', 'Non-Veg', 'Eggetarian'].map(s => `<button class="rm-tag green ${foodType === s ? 'active' : ''}" data-group="food" data-val="${s}">${s}</button>`).join('')}
                </div>

                <div class="rm-tag-row">
                  <label><span class="info-icon">🍽️</span> Meal Type</label>
                  ${['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(s => `<button class="rm-tag ${mealType === s ? 'active' : ''}" data-group="meal" data-val="${s}">${s}</button>`).join('')}
                </div>

                <div class="rm-check-row">
                  <label><span class="info-icon">❤️</span> Food Preference</label>
                  ${['Jain', 'Satvik', 'No Onion', 'No Garlic'].map(s => `
                    <label class="rm-check-item">
                      <input type="checkbox" data-pref="${s}" ${foodPrefs.includes(s) ? 'checked' : ''} /> ${s}
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="rm-actions">
            <button class="rm-btn-draft">📋 Save as Draft</button>
            <button class="rm-btn-publish" id="rm-publish">🚀 Publish Dish</button>
          </div>
        </div>
      </div>
    `;

    // --- Event Listeners ---

    // Sidebar navigation
    container.querySelectorAll('.rm-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = (btn as HTMLElement).dataset.tab || 'add-dish';
        render();
      });
    });

    // Photo upload
    const photoArea = container.querySelector('#rm-photo-area') as HTMLElement;
    const photoInput = container.querySelector('#rm-photo-input') as HTMLInputElement;
    photoArea.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', () => {
      const file = photoInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          photoArea.innerHTML = `<img src="${e.target?.result}" alt="Dish"/><button class="rm-photo-close" id="rm-remove-photo">✕</button>`;
          container.querySelector('#rm-remove-photo')?.addEventListener('click', (ev) => {
            ev.stopPropagation();
            photoArea.innerHTML = '<span class="upload-icon">📷</span><span class="upload-text">Click to Upload</span><span class="upload-hint">JPG, PNG up to 5MB</span>';
            photoInput.value = '';
          });
        };
        reader.readAsDataURL(file);
      }
    });

    // Tag buttons (radio style)
    container.querySelectorAll('.rm-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const group = (tag as HTMLElement).dataset.group;
        const val = (tag as HTMLElement).dataset.val || '';
        if (group === 'spice') spiceLevel = val;
        else if (group === 'food') foodType = val;
        else if (group === 'meal') mealType = val;
        render();
      });
    });

    // Checkbox prefs
    container.querySelectorAll('.rm-check-item input').forEach(cb => {
      cb.addEventListener('change', () => {
        const pref = (cb as HTMLInputElement).dataset.pref || '';
        if ((cb as HTMLInputElement).checked) {
          if (!foodPrefs.includes(pref)) foodPrefs.push(pref);
        } else {
          const idx = foodPrefs.indexOf(pref);
          if (idx > -1) foodPrefs.splice(idx, 1);
        }
      });
    });

    // Publish
    container.querySelector('#rm-publish')?.addEventListener('click', () => {
      alert('Dish published successfully! It will be visible to customers shortly.');
    });

    // Logout
    container.querySelector('#rm-logout')?.addEventListener('click', () => {
      window.location.hash = '#/signin';
    });
  }

  render();
  return container;
}
