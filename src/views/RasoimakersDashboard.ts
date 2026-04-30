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
  let activeTab = 'orders';
  
  // Add Dish State
  let spiceLevel = 'Mild';
  let foodType = 'Veg';
  let mealType = 'Lunch';
  const preferences: string[] = ['Satvik'];

  function getOrders() {
    try {
      const orders = JSON.parse(localStorage.getItem('rasoi_orders') || '[]');
      // Filter for the current mock cook "Sharmistha" (or just show all for demo purposes)
      return orders;
    } catch {
      return [];
    }
  }

  function updateOrderStatus(id: string, status: string) {
    try {
      const orders = getOrders();
      const order = orders.find((o: any) => o.id === id);
      if (order) {
        order.status = status;
        localStorage.setItem('rasoi_orders', JSON.stringify(orders));
        render();
      }
    } catch (e) {
      console.error(e);
    }
  }

  function renderContent() {
    switch(activeTab) {
      case 'dashboard':
        return `
          <div class="rm-header">
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
            <div class="rm-section" style="margin-bottom: 0;">
              <h3 style="color: var(--rm-text-light); font-size: 0.9rem; margin-bottom: 8px;">Active Orders</h3>
              <p style="font-size: 2rem; font-weight: 700; color: var(--rm-primary);">${getOrders().filter((o:any)=>o.status === 'pending').length}</p>
            </div>
            <div class="rm-section" style="margin-bottom: 0;">
              <h3 style="color: var(--rm-text-light); font-size: 0.9rem; margin-bottom: 8px;">Total Earnings</h3>
              <p style="font-size: 2rem; font-weight: 700; color: var(--rm-text);">₹12,450</p>
            </div>
            <div class="rm-section" style="margin-bottom: 0;">
              <h3 style="color: var(--rm-text-light); font-size: 0.9rem; margin-bottom: 8px;">Profile Rating</h3>
              <p style="font-size: 2rem; font-weight: 700; color: #F59E0B;">★ 4.8</p>
            </div>
          </div>
        `;
      case 'orders':
        const orders = getOrders();
        return `
          <div class="rm-header">
            <h1>Incoming Orders</h1>
            <p>Manage and fulfill your customer orders.</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${orders.length === 0 ? '<p>No orders yet.</p>' : ''}
            ${orders.map((o: any) => `
              <div class="rm-section" style="display: flex; justify-content: space-between; align-items: center; padding: 24px; margin-bottom: 0;">
                <div>
                  <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                    <span style="background: ${o.status === 'pending' ? '#FEF3C7' : '#D1FAE5'}; color: ${o.status === 'pending' ? '#D97706' : '#059669'}; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">${o.status}</span>
                    <span style="color: var(--rm-text-light); font-size: 0.85rem;">Order #${o.id.slice(-6)}</span>
                  </div>
                  <h3 style="font-size: 1.2rem; margin-bottom: 4px;">Items:</h3>
                  <p style="color: var(--rm-text-light); font-size: 0.95rem; margin-bottom: 8px;">${o.items.join(', ')}</p>
                  <p style="font-weight: 600; color: var(--rm-text);">Price: ₹${o.price}</p>
                  ${o.message ? '<p style="background: var(--rm-bg); padding: 8px 12px; border-radius: 8px; font-size: 0.9rem; margin-top: 12px; border-left: 3px solid var(--rm-primary);"><strong>Customer Message:</strong> "' + o.message + '"</p>' : ''}
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px; min-width: 140px;">
                  ${o.status === 'pending' ? `
                    <button class="btn-primary-brown accept-order-btn" data-id="${o.id}">Accept Order</button>
                    <button class="btn-secondary">Message</button>
                  ` : `
                    <button class="btn-secondary" disabled style="opacity: 0.7;">Accepted</button>
                    <button class="btn-primary-brown">Mark Ready</button>
                  `}
                </div>
              </div>
            `).reverse().join('')}
          </div>
        `;
      case 'earnings':
        return `
          <div class="rm-header">
            <h1>Earnings & Payouts</h1>
            <p>Track your revenue and upcoming bank transfers.</p>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
            <div class="rm-section">
              <h3 class="rm-section-title">Recent Transactions</h3>
              <table style="width: 100%; text-align: left; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--rm-border);">
                    <th style="padding: 12px 0;">Date</th>
                    <th style="padding: 12px 0;">Order ID</th>
                    <th style="padding: 12px 0;">Amount</th>
                    <th style="padding: 12px 0;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--rm-border);">
                    <td style="padding: 16px 0; color: var(--rm-text-light);">Today, 2:30 PM</td>
                    <td style="padding: 16px 0; font-weight: 500;">#890123</td>
                    <td style="padding: 16px 0; font-weight: 600;">₹450</td>
                    <td style="padding: 16px 0;"><span style="color: #059669; background: #D1FAE5; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Completed</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--rm-border);">
                    <td style="padding: 16px 0; color: var(--rm-text-light);">Yesterday</td>
                    <td style="padding: 16px 0; font-weight: 500;">#890118</td>
                    <td style="padding: 16px 0; font-weight: 600;">₹310</td>
                    <td style="padding: 16px 0;"><span style="color: #059669; background: #D1FAE5; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <div class="rm-section" style="background: var(--rm-primary); color: white; margin-bottom: 0;">
                <h3 style="font-size: 1rem; margin-bottom: 8px; font-weight: 500; opacity: 0.9;">Available for Withdrawal</h3>
                <p style="font-size: 2.5rem; font-weight: 700; margin-bottom: 16px;">₹3,450</p>
                <button style="width: 100%; padding: 12px; background: white; color: var(--rm-primary); font-weight: 600; border-radius: 8px; border: none; cursor: pointer;">Withdraw to Bank</button>
              </div>
              <div class="rm-section" style="margin-bottom: 0;">
                <h3 class="rm-section-title" style="margin-bottom: 12px; font-size: 1rem;">Bank Details</h3>
                <p style="color: var(--rm-text-light); font-size: 0.9rem; margin-bottom: 4px;">HDFC Bank</p>
                <p style="font-weight: 500; font-size: 0.9rem;">XXXX XXXX 4589</p>
              </div>
            </div>
          </div>
        `;
      case 'profile':
        return `
          <div class="rm-header">
            <h1>Profile Management</h1>
            <p>Update your public profile, bio, and food portfolio.</p>
          </div>
          <div class="rm-section">
            <h2 class="rm-section-title">Public Avatar & Info</h2>
            <div style="display: flex; gap: 32px; align-items: flex-start; margin-bottom: 32px;">
              <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid var(--rm-secondary); flex-shrink: 0;">
                <img src="https://i.pravatar.cc/150?u=ananya" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 16px;">
                <button class="btn-upload">Change Avatar</button>
                <div class="rm-form-grid" style="grid-template-columns: 1fr 1fr;">
                  <div class="field-group" style="margin-bottom: 0;">
                    <label>Full Name</label>
                    <input type="text" class="rm-input" value="Ananya Das" />
                  </div>
                  <div class="field-group" style="margin-bottom: 0;">
                    <label>Location</label>
                    <input type="text" class="rm-input" value="Salt Lake Sector 1" />
                  </div>
                </div>
              </div>
            </div>
            <div class="field-group">
              <label>Bio / About Me</label>
              <textarea class="rm-textarea">I'm a passionate home cook specializing in authentic Bengali comfort food passed down from my grandmother.</textarea>
            </div>
          </div>
          <div class="rm-section">
            <h2 class="rm-section-title">Food Portfolio Images</h2>
            <p style="color: var(--rm-text-light); font-size: 0.9rem; margin-bottom: 16px;">These images will appear on your public Rasoimaker profile.</p>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
              <div style="aspect-ratio: 1; border-radius: 8px; overflow: hidden;"><img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;"/></div>
              <div style="aspect-ratio: 1; border-radius: 8px; overflow: hidden;"><img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80" style="width: 100%; height: 100%; object-fit: cover;"/></div>
              <div style="aspect-ratio: 1; border-radius: 8px; background: var(--rm-bg); border: 2px dashed var(--rm-border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--rm-primary);">
                <span class="material-icons-round">add</span>
              </div>
            </div>
            <div class="rm-footer-actions">
              <button class="btn-primary-brown">Save Profile Changes</button>
            </div>
          </div>
        `;
      case 'add-dish':
      default:
        return `
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
        `;
    }
  }

  function render() {
    const orders = getOrders();
    const pendingCount = orders.filter((o:any)=>o.status === 'pending').length;

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
          position: relative;
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

        .badge {
          background: #e53e3e;
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: auto;
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
                ${item.id === 'orders' && pendingCount > 0 ? `<span class="badge">${pendingCount}</span>` : ''}
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
              <span class="material-icons-round" style="position:relative;">
                notifications
                ${pendingCount > 0 ? `<span style="position:absolute;top:-4px;right:-4px;width:8px;height:8px;background:red;border-radius:50%;"></span>` : ''}
              </span>
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
            ${renderContent()}
          </div>
        </main>
      </div>
    `;

    // Re-attach event listeners
    setTimeout(() => {
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

      container.querySelectorAll('.accept-order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = (btn as HTMLElement).dataset.id;
          if (id) {
            updateOrderStatus(id, 'accepted');
          }
        });
      });
    }, 0);
  }

  // Initial setup: listen for storage events to update badge across tabs if needed
  window.addEventListener('storage', (e) => {
    if (e.key === 'rasoi_orders') {
      render();
    }
  });

  render();
  return container;
}
