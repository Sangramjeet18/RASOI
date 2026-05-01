import { dashboardCSS } from './dashboardStyles';
import { getOrders, getProfile, saveProfile, getPortfolio, getDishes, renderDashboardTab, renderOrdersTab, renderEarningsTab, renderProfileTab, renderAddDishTab, renderMyDishesTab, renderReviewsTab, renderHelpTab } from './RasoimakerContent';

const sidebarItems = [
  { icon: 'grid_view', label: 'Dashboard', id: 'dashboard' },
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
  let activeTab = 'dashboard';
  let spiceLevel = 'Mild';
  let foodType = 'Veg';
  let mealType = 'Lunch';

  function updateOrderStatus(id: string, status: string) {
    try {
      const orders = getOrders();
      const order = orders.find((o: any) => o.id === id);
      if (order) {
        order.status = status;
        if (status === 'ready') {
          order.otp = String(Math.floor(1000 + Math.random() * 9000));
          order.deliveryOtp = String(Math.floor(1000 + Math.random() * 9000));
        }
        localStorage.setItem('rasoi_orders', JSON.stringify(orders));
        render();
      }
    } catch (e) { console.error(e); }
  }

  function renderContent() {
    switch (activeTab) {
      case 'dashboard': return renderDashboardTab();
      case 'orders': return renderOrdersTab();
      case 'earnings': return renderEarningsTab();
      case 'profile': return renderProfileTab();
      case 'add-dish': return renderAddDishTab(spiceLevel, foodType, mealType);
      case 'my-dishes': return renderMyDishesTab();
      case 'reviews': return renderReviewsTab();
      case 'help': return renderHelpTab();
      default: return renderDashboardTab();
    }
  }

  function render() {
    const orders = getOrders();
    const pendingCount = orders.filter((o: any) => o.status === 'pending').length;
    const profile = getProfile();

    container.innerHTML = `
      <style>${dashboardCSS}</style>
      <div class="db-app">
        <aside class="db-sidebar">
          <div class="db-sidebar-logo">RASOI.</div>
          <nav class="db-nav">
            ${sidebarItems.map(item => `
              <button class="db-nav-item ${activeTab === item.id ? 'active' : ''}" data-id="${item.id}">
                <span class="material-icons-round">${item.icon}</span>
                ${item.label}
                ${item.id === 'orders' && pendingCount > 0 ? `<span class="db-badge">${pendingCount}</span>` : ''}
              </button>
            `).join('')}
          </nav>
          <div style="padding:20px 12px;border-top:1px solid var(--db-border)">
            <button class="db-nav-item" id="rm-logout"><span class="material-icons-round">logout</span>Logout</button>
          </div>
        </aside>
        <main class="db-main">
          <header class="db-navbar">
            <div style="display:flex;align-items:center;gap:8px;color:var(--db-muted);font-size:.85rem;cursor:pointer"><span>English</span><span class="material-icons-round" style="font-size:18px">expand_more</span></div>
            <div style="position:relative;cursor:pointer"><span class="material-icons-round" style="color:var(--db-muted)">notifications</span>${pendingCount > 0 ? '<span style="position:absolute;top:-2px;right:-2px;width:8px;height:8px;background:var(--db-red);border-radius:50%"></span>' : ''}</div>
            <div style="display:flex;align-items:center;gap:10px;padding-left:20px;border-left:1px solid var(--db-border)">
              <div style="text-align:right"><div style="font-size:.83rem;font-weight:600">${profile.name}</div><div style="font-size:.72rem;color:var(--db-muted)">Rasoi Maker</div></div>
              ${profile.avatar ? `<img src="${profile.avatar}" class="db-avatar">` : `<div class="db-avatar" style="background:var(--db-secondary);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--db-primary)">${profile.name.charAt(0)}</div>`}
            </div>
          </header>
          <div class="db-content">${renderContent()}</div>
        </main>
      </div>
    `;
    bindEvents();
  }

  function bindEvents() {
    setTimeout(() => {
      // Nav
      container.querySelectorAll('.db-nav-item[data-id]').forEach(btn => {
        btn.addEventListener('click', () => { activeTab = (btn as HTMLElement).dataset.id || 'dashboard'; render(); });
      });
      container.querySelector('#rm-logout')?.addEventListener('click', () => { window.location.hash = '#/signin'; });

      // Orders: Accept
      container.querySelectorAll('.accept-order-btn').forEach(btn => {
        btn.addEventListener('click', () => { const id = (btn as HTMLElement).dataset.id; if (id) updateOrderStatus(id, 'accepted'); });
      });
      // Orders: Mark Ready (generates OTP)
      container.querySelectorAll('.ready-btn').forEach(btn => {
        btn.addEventListener('click', () => { const id = (btn as HTMLElement).dataset.id; if (id) updateOrderStatus(id, 'ready'); });
      });

      // Toggle buttons (spice, food, meal)
      container.querySelectorAll('.db-toggle[data-type]').forEach(btn => {
        btn.addEventListener('click', () => {
          const t = (btn as HTMLElement).dataset.type;
          const v = (btn as HTMLElement).dataset.val || '';
          if (t === 'spice') spiceLevel = v;
          if (t === 'food') foodType = v;
          if (t === 'meal') mealType = v;
          render();
        });
      });

      // Profile: Avatar upload
      const avatarInput = container.querySelector('#avatar-input') as HTMLInputElement;
      const avatarTrigger = container.querySelector('#avatar-trigger');
      const avatarEdit = container.querySelector('#avatar-edit');
      if (avatarInput) {
        [avatarTrigger, avatarEdit].forEach(el => el?.addEventListener('click', () => avatarInput.click()));
        avatarInput.addEventListener('change', () => {
          const file = avatarInput.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const p = getProfile();
              p.avatar = e.target?.result as string;
              saveProfile(p);
              render();
            };
            reader.readAsDataURL(file);
          }
        });
      }

      // Profile: Save
      container.querySelector('#save-profile-btn')?.addEventListener('click', () => {
        const p = getProfile();
        p.name = (container.querySelector('#prof-name') as HTMLInputElement)?.value || p.name;
        p.phone = (container.querySelector('#prof-phone') as HTMLInputElement)?.value || p.phone;
        p.email = (container.querySelector('#prof-email') as HTMLInputElement)?.value || p.email;
        p.location = (container.querySelector('#prof-location') as HTMLInputElement)?.value || p.location;
        p.bio = (container.querySelector('#prof-bio') as HTMLTextAreaElement)?.value || p.bio;
        const specs: string[] = [];
        container.querySelectorAll('.prof-spec.active').forEach(b => { const v = (b as HTMLElement).dataset.val; if (v) specs.push(v); });
        p.specialties = specs;
        saveProfile(p);
        alert('Profile saved successfully!');
        render();
      });

      // Profile: Specialty toggles
      container.querySelectorAll('.prof-spec').forEach(btn => {
        btn.addEventListener('click', () => btn.classList.toggle('active'));
      });

      // Portfolio: Upload
      const portfolioInput = container.querySelector('#portfolio-input') as HTMLInputElement;
      container.querySelector('#portfolio-trigger')?.addEventListener('click', () => portfolioInput?.click());
      portfolioInput?.addEventListener('change', () => {
        const file = portfolioInput.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imgs = getPortfolio();
            imgs.push(e.target?.result as string);
            localStorage.setItem('rasoi_portfolio', JSON.stringify(imgs));
            render();
          };
          reader.readAsDataURL(file);
        }
      });

      // Portfolio: Remove
      container.querySelectorAll('.remove-portfolio').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt((btn as HTMLElement).dataset.idx || '0');
          const imgs = getPortfolio();
          imgs.splice(idx, 1);
          localStorage.setItem('rasoi_portfolio', JSON.stringify(imgs));
          render();
        });
      });

      // Add Dish: Photo upload
      const dishInput = container.querySelector('#dish-photo-input') as HTMLInputElement;
      [container.querySelector('#dish-photo-trigger'), container.querySelector('#dish-upload-btn')].forEach(el => el?.addEventListener('click', () => dishInput?.click()));
      dishInput?.addEventListener('change', () => {
        const file = dishInput.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = container.querySelector('#dish-preview') as HTMLImageElement;
            const ph = container.querySelector('#dish-photo-placeholder') as HTMLElement;
            if (img) { img.src = e.target?.result as string; img.style.display = 'block'; }
            if (ph) ph.style.display = 'none';
          };
          reader.readAsDataURL(file);
        }
      });

      // Publish Dish
      container.querySelector('#publish-dish-btn')?.addEventListener('click', () => {
        const name = (container.querySelector('#dish-name') as HTMLInputElement)?.value;
        const price = (container.querySelector('#dish-price') as HTMLInputElement)?.value;
        const img = (container.querySelector('#dish-preview') as HTMLImageElement)?.src;
        const cat = (container.querySelector('#dish-cat') as HTMLSelectElement)?.value;
        if (!name || !price) { alert('Please fill dish name and price'); return; }
        const dishes = getDishes();
        dishes.push({ name, price: Number(price), image: img || '', category: cat, foodType, spice: spiceLevel, mealType, active: true });
        localStorage.setItem('rasoi_dishes', JSON.stringify(dishes));
        alert(`"${name}" published successfully!`);
        activeTab = 'my-dishes';
        render();
      });

      // My Dishes: Toggle/Delete
      container.querySelectorAll('[data-dish-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt((btn as HTMLElement).dataset.dishToggle || '0');
          const dishes = getDishes();
          dishes[idx].active = dishes[idx].active === false;
          localStorage.setItem('rasoi_dishes', JSON.stringify(dishes));
          render();
        });
      });
      container.querySelectorAll('[data-dish-delete]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt((btn as HTMLElement).dataset.dishDelete || '0');
          const dishes = getDishes();
          dishes.splice(idx, 1);
          localStorage.setItem('rasoi_dishes', JSON.stringify(dishes));
          render();
        });
      });
    }, 0);
  }

  window.addEventListener('storage', (e) => { if (e.key === 'rasoi_orders') render(); });
  render();
  return container;
}
