const sidebarItems = [
  { icon: 'grid-view', label: 'Dashboard', id: 'dashboard' },
  { icon: 'restaurant', label: 'My Dishes', id: 'my-dishes' },
  { icon: 'add_circle', label: 'Add New Dish', id: 'add-dish' },
  { icon: 'shopping_bag', label: 'Orders', id: 'orders' },
  { icon: 'payments', label: 'Earnings', id: 'earnings' },
  { icon: 'star', label: 'Reviews', id: 'reviews' },
  { icon: 'person', label: 'Profile', id: 'profile' },
  { icon: 'help', label: 'Help & Support', id: 'help' },
];

export function RasoimakersDashboard() {
  const container = document.createElement('div');
  let activeTab = 'add-dish';
  
  // Form State
  let spiceLevel = 'Mild';
  let foodType = 'Veg';
  let mealType = 'Lunch';
  const preferences: string[] = ['Satvik'];

  function render() {
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');

        :root {
          --rm-bg: #F8F5F0;
          --rm-primary: #8B5E3C;
          --rm-secondary: #E8DCCB;
          --rm-text: #2D2A26;
          --rm-text-light: #6D6A66;
          --rm-border: #E8E4DF;
          --rm-white: #FFFFFF;
          --rm-radius: 12px;
        }

        .rm-app {
          display: flex;
          min-height: 100vh;
          background-color: var(--rm-bg);
          color: var(--rm-text);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* Sidebar */
        .rm-sidebar {
          width: 240px;
          background: var(--rm-white);
          border-right: 1px solid var(--rm-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
        }

        .rm-sidebar-logo {
          padding: 32px 24px;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--rm-primary);
          letter-spacing: 0.5px;
        }

        .rm-nav {
          flex: 1;
          padding: 0 12px;
        }

        .rm-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          margin-bottom: 4px;
          border-radius: var(--rm-radius);
          cursor: pointer;
          color: var(--rm-text-light);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .rm-nav-item:hover {
          background-color: var(--rm-bg);
          color: var(--rm-text);
        }

        .rm-nav-item.active {
          background-color: var(--rm-secondary);
          color: var(--rm-primary);
          font-weight: 600;
        }

        .rm-nav-item .material-icons-round {
          font-size: 20px;
        }

        .rm-logout {
          padding: 24px 12px;
          border-top: 1px solid var(--rm-border);
        }

        /* Main Content */
        .rm-main {
          flex: 1;
          margin-left: 240px;
          display: flex;
          flex-direction: column;
        }

        /* Navbar */
        .rm-navbar {
          height: 72px;
          background: var(--rm-white);
          border-bottom: 1px solid var(--rm-border);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 40px;
          gap: 24px;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .rm-nav-action {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--rm-text-light);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
        }

        .rm-nav-action .material-icons-round {
          font-size: 20px;
        }

        .rm-profile-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 24px;
          border-left: 1px solid var(--rm-border);
        }

        .rm-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--rm-secondary);
          object-fit: cover;
        }

        .rm-user-info .name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--rm-text);
        }

        .rm-user-info .role {
          font-size: 0.75rem;
          color: var(--rm-text-light);
        }

        /* Content Area */
        .rm-content {
          padding: 48px 80px;
          max-width: 1200px;
        }

        .rm-header {
          margin-bottom: 40px;
        }

        .rm-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin-bottom: 8px;
          color: var(--rm-text);
        }

        .rm-header p {
          color: var(--rm-text-light);
          font-size: 0.95rem;
        }

        /* Form Sections */
        .rm-section {
          background: var(--rm-white);
          border-radius: var(--rm-radius);
          border: 1px solid var(--rm-border);
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .rm-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Upload Box */
        .rm-upload-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: flex-start;
        }

        .rm-photo-box {
          width: 100%;
          aspect-ratio: 1;
          background: var(--rm-bg);
          border-radius: var(--rm-radius);
          border: 1px dashed var(--rm-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .rm-photo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rm-upload-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-upload {
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid var(--rm-primary);
          background: var(--rm-white);
          color: var(--rm-primary);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          width: fit-content;
        }

        .btn-upload:hover {
          background: var(--rm-secondary);
        }

        .file-note {
          font-size: 0.75rem;
          color: var(--rm-text-light);
        }

        /* Inputs */
        .rm-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .field-group {
          margin-bottom: 20px;
        }

        .field-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--rm-text);
        }

        .rm-input, .rm-select, .rm-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid var(--rm-border);
          background: var(--rm-bg);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .rm-input:focus, .rm-select:focus, .rm-textarea:focus {
          border-color: var(--rm-primary);
        }

        .rm-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .char-limit {
          display: block;
          text-align: right;
          font-size: 0.75rem;
          color: var(--rm-text-light);
          margin-top: 4px;
        }

        /* Toggle Buttons */
        .rm-toggle-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .rm-toggle-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid var(--rm-border);
          background: var(--rm-white);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rm-toggle-btn:hover {
          border-color: var(--rm-primary);
        }

        .rm-toggle-btn.active {
          background: var(--rm-primary);
          color: var(--rm-white);
          border-color: var(--rm-primary);
        }

        /* Checkboxes */
        .rm-check-group {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .rm-check-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .rm-check-item input {
          width: 18px;
          height: 18px;
          accent-color: var(--rm-primary);
        }

        /* Bottom Actions */
        .rm-footer-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid var(--rm-border);
        }

        .btn-secondary {
          padding: 12px 28px;
          border-radius: 8px;
          border: 1px solid var(--rm-border);
          background: var(--rm-white);
          color: var(--rm-text);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .btn-primary-brown {
          padding: 12px 36px;
          border-radius: 8px;
          border: none;
          background: var(--rm-primary);
          color: var(--rm-white);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
          box-shadow: 0 4px 12px rgba(139, 94, 60, 0.15);
        }

        .btn-primary-brown:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .rm-sidebar { width: 0; display: none; }
          .rm-main { margin-left: 0; }
          .rm-content { padding: 32px 20px; }
          .rm-form-grid { grid-template-columns: 1fr; }
          .rm-upload-container { grid-template-columns: 1fr; }
        }
      </style>

      <div class="rm-app">
        <!-- Sidebar -->
        <aside class="rm-sidebar">
          <div class="rm-sidebar-logo">RASOI</div>
          <nav class="rm-nav">
            ${sidebarItems.map(item => `
              <button class="rm-nav-item ${activeTab === item.id ? 'active' : ''}" data-id="${item.id}">
                <span class="material-icons-round">${item.icon}</span>
                ${item.label}
              </button>
            `).join('')}
          </nav>
          <div class="rm-logout">
            <button class="rm-nav-item" onclick="window.location.hash='#/signin'">
              <span class="material-icons-round">logout</span>
              Logout
            </button>
          </div>
        </aside>

        <!-- Main Area -->
        <main class="rm-main">
          <header class="rm-navbar">
            <div class="rm-nav-action">
              <span>English</span>
              <span class="material-icons-round">expand_more</span>
            </div>
            <div class="rm-nav-action">
              <span class="material-icons-round">notifications</span>
            </div>
            <div class="rm-profile-section">
              <div class="rm-user-info" style="text-align: right;">
                <div class="name">Ananya D.</div>
                <div class="role">Rasoi Maker</div>
              </div>
              <img src="https://i.pravatar.cc/150?u=ananya" class="rm-avatar" alt="Avatar" />
            </div>
          </header>

          <div class="rm-content">
            <div class="rm-header">
              <h1>Add New Dish</h1>
              <p>Share your homemade food with care</p>
            </div>

            <!-- Section 1: Photo -->
            <section class="rm-section">
              <h2 class="rm-section-title">1. Dish Photo</h2>
              <div class="rm-upload-container">
                <div class="rm-photo-box" id="upload-trigger">
                  <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" alt="Placeholder" id="preview-img" />
                </div>
                <div class="rm-upload-actions">
                  <p style="font-size: 0.9rem; color: var(--rm-text-light);">Upload a clear photo of your dish</p>
                  <button class="btn-upload">Upload / Change Photo</button>
                  <span class="file-note">JPG, PNG up to 5MB</span>
                </div>
              </div>
            </section>

            <!-- Section 2: Basic Details -->
            <section class="rm-section">
              <h2 class="rm-section-title">2. Basic Details</h2>
              <div class="rm-form-grid">
                <div class="field-group">
                  <label>Dish Name</label>
                  <input type="text" class="rm-input" placeholder="e.g. Bengali Moong Dal" />
                </div>
                <div class="field-group">
                  <label>Category</label>
                  <select class="rm-select">
                    <option>Lunch</option>
                    <option>Breakfast</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                </div>
                <div class="field-group">
                  <label>Price (₹)</label>
                  <input type="number" class="rm-input" placeholder="120" />
                </div>
                <div class="field-group">
                  <label>Serves</label>
                  <select class="rm-select">
                    <option>1 Person</option>
                    <option>2 Persons</option>
                    <option>3 Persons</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Section 3: Description -->
            <section class="rm-section">
              <h2 class="rm-section-title">3. Description</h2>
              <div class="field-group">
                <label>Ingredients</label>
                <textarea class="rm-textarea" placeholder="List the key ingredients used..."></textarea>
                <span class="char-limit">0 / 300</span>
              </div>
              <div class="field-group">
                <label>Taste & Flavour</label>
                <textarea class="rm-textarea" placeholder="Describe the taste profile..."></textarea>
                <span class="char-limit">0 / 300</span>
              </div>
            </section>

            <!-- Section 4: Additional Info -->
            <section class="rm-section">
              <h2 class="rm-section-title">4. Additional Information</h2>
              
              <div class="field-group">
                <label>Spice Level</label>
                <div class="rm-toggle-group">
                  ${['Mild', 'Medium', 'Spicy'].map(s => `
                    <button class="rm-toggle-btn ${spiceLevel === s ? 'active' : ''}" data-type="spice" data-val="${s}">${s}</button>
                  `).join('')}
                </div>
              </div>

              <div class="field-group">
                <label>Food Type</label>
                <div class="rm-toggle-group">
                  ${['Veg', 'Non-Veg', 'Eggetarian'].map(s => `
                    <button class="rm-toggle-btn ${foodType === s ? 'active' : ''}" data-type="food" data-val="${s}">${s}</button>
                  `).join('')}
                </div>
              </div>

              <div class="field-group">
                <label>Meal Type</label>
                <div class="rm-toggle-group">
                  ${['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(s => `
                    <button class="rm-toggle-btn ${mealType === s ? 'active' : ''}" data-type="meal" data-val="${s}">${s}</button>
                  `).join('')}
                </div>
              </div>

              <div class="field-group">
                <label>Food Preferences</label>
                <div class="rm-check-group">
                  ${['Jain', 'Satvik', 'No Onion', 'No Garlic'].map(s => `
                    <label class="rm-check-item">
                      <input type="checkbox" ${preferences.includes(s) ? 'checked' : ''} />
                      ${s}
                    </label>
                  `).join('')}
                </div>
              </div>
            </section>

            <!-- Actions -->
            <div class="rm-footer-actions">
              <button class="btn-secondary">Save as Draft</button>
              <button class="btn-primary-brown">Publish Dish</button>
            </div>
          </div>
        </main>
      </div>
    `;

    // Interactivity
    container.querySelectorAll('.rm-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id;
        if (id) {
          activeTab = id;
          render();
        }
      });
    });

    container.querySelectorAll('.rm-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = (btn as HTMLElement).dataset.type;
        const val = (btn as HTMLElement).dataset.val || '';
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
