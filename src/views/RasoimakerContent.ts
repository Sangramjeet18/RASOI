// Content renderers for Rasoimaker Dashboard tabs
export function getOrders() {
  try { return JSON.parse(localStorage.getItem('rasoi_orders') || '[]'); } catch { return []; }
}

export function getDishes() {
  try { return JSON.parse(localStorage.getItem('rasoi_dishes') || '[]'); } catch { return []; }
}

export function getProfile() {
  try {
    return JSON.parse(localStorage.getItem('rasoi_maker_profile') || 'null') || {
      name: 'Ananya Das', phone: '+91 98765 43210', email: 'ananya@rasoi.com',
      location: 'Salt Lake Sector 1, Kolkata', bio: 'Passionate home cook specializing in authentic Bengali comfort food passed down from my grandmother.',
      avatar: '', specialties: ['Bengali', 'Comfort Food'], available: true
    };
  } catch {
    return { name: 'Ananya Das', phone: '', email: '', location: '', bio: '', avatar: '', specialties: [], available: true };
  }
}

export function saveProfile(p: any) { localStorage.setItem('rasoi_maker_profile', JSON.stringify(p)); }

export function getPortfolio(): string[] {
  try { return JSON.parse(localStorage.getItem('rasoi_portfolio') || '[]'); } catch { return []; }
}

export function renderDashboardTab() {
  const orders = getOrders();
  const dishes = getDishes();
  const pending = orders.filter((o:any)=>o.status==='pending').length;
  const completed = orders.filter((o:any)=>o.status==='delivered').length;
  const earnings = orders.filter((o:any)=>o.status==='delivered').reduce((s:number,o:any)=>s+(o.price||0),0);
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [320,450,280,520,390,610,480];
  const max = Math.max(...vals);
  return `
    <div class="db-header"><h1>Dashboard Overview</h1><p>Welcome back! Here's what's happening today.</p></div>
    <div class="db-grid-3">
      <div class="db-card db-stat"><div class="val" style="color:var(--db-primary)">${pending}</div><div class="lab">Active Orders</div></div>
      <div class="db-card db-stat"><div class="val">₹${(12450+earnings).toLocaleString()}</div><div class="lab">Total Earnings</div></div>
      <div class="db-card db-stat"><div class="val" style="color:#F59E0B">★ 4.8</div><div class="lab">Profile Rating</div></div>
    </div>
    <div class="db-grid-2" style="margin-top:4px">
      <div class="db-card">
        <div class="db-card-title">📊 Weekly Earnings</div>
        <div class="db-chart-bar">${vals.map((v,i)=>`<div style="flex:1;text-align:center"><div class="bar" style="height:${(v/max)*100}%"></div><div class="bar-label">${days[i]}</div></div>`).join('')}</div>
      </div>
      <div class="db-card">
        <div class="db-card-title">📋 Quick Stats</div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--db-border)"><span>Orders Completed</span><strong>${completed}</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--db-border)"><span>Dishes Listed</span><strong>${dishes.length || 3}</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--db-border)"><span>Avg Rating</span><strong>4.8 ★</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px 0"><span>Repeat Customers</span><strong>67%</strong></div>
        </div>
      </div>
    </div>`;
}

export function renderOrdersTab() {
  const orders = getOrders();
  return `
    <div class="db-header"><h1>Incoming Orders</h1><p>Manage and fulfill customer orders.</p></div>
    ${orders.length===0?'<div class="db-card" style="text-align:center;padding:48px"><p style="color:var(--db-muted);font-size:1.1rem">No orders yet. Orders placed by customers will appear here.</p></div>':''}
    <div style="display:flex;flex-direction:column;gap:14px">
    ${orders.map((o:any)=>`
      <div class="db-card" style="display:flex;justify-content:space-between;align-items:center;padding:22px">
        <div>
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
            <span class="db-status ${o.status}">${o.status}</span>
            <span style="color:var(--db-muted);font-size:.83rem">Order #${(o.id||'').slice(-6)}</span>
          </div>
          <h3 style="font-size:1.05rem;margin-bottom:4px">Items: ${(o.items||[]).join(', ')}</h3>
          <p style="font-weight:600">₹${o.price||0}</p>
          ${o.otp?`<p style="margin-top:8px;background:var(--db-bg);padding:8px 14px;border-radius:8px;font-size:.85rem;border-left:3px solid var(--db-green)"><strong>Pickup OTP:</strong> <span style="font-size:1.2rem;font-weight:700;color:var(--db-primary);letter-spacing:4px">${o.otp}</span></p>`:''}
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;min-width:140px">
          ${o.status==='pending'?`<button class="db-btn db-btn-primary accept-order-btn" data-id="${o.id}">Accept Order</button>`:''}
          ${o.status==='accepted'||o.status==='cooking'?`<button class="db-btn db-btn-success ready-btn" data-id="${o.id}">Mark Ready</button><span class="db-status cooking" style="text-align:center">Cooking...</span>`:''}
          ${o.status==='ready'?`<span class="db-status ready" style="text-align:center;padding:10px">Waiting for Runner</span>`:''}
          ${o.status==='picked_up'?`<span class="db-status picked" style="text-align:center;padding:10px">Out for Delivery</span>`:''}
          ${o.status==='delivered'?`<span class="db-status delivered" style="text-align:center;padding:10px">✓ Delivered</span>`:''}
        </div>
      </div>`).reverse().join('')}
    </div>`;
}

export function renderEarningsTab() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [320,450,280,520,390,610,480];
  const max = Math.max(...vals);
  const weekTotal = vals.reduce((a,b)=>a+b,0);
  const txns = [
    {date:'Today, 2:30 PM',id:'#890123',items:'Kosha Mangsho Thali',amount:450,commission:45,status:'completed'},
    {date:'Today, 12:15 PM',id:'#890119',items:'Ilish Macher Jhol',amount:310,commission:31,status:'completed'},
    {date:'Yesterday',id:'#890115',items:'Custom Thali',amount:280,commission:28,status:'completed'},
    {date:'Yesterday',id:'#890112',items:'Shukto + Dal',amount:198,commission:20,status:'completed'},
    {date:'2 days ago',id:'#890108',items:'Weekly Subscription',amount:1299,commission:130,status:'completed'},
  ];
  return `
    <div class="db-header"><h1>Earnings & Payouts</h1><p>Track your revenue and upcoming transfers.</p></div>
    <div class="db-grid-3" style="margin-bottom:4px">
      <div class="db-card db-stat" style="border-left:4px solid var(--db-primary)"><div class="val">₹12,450</div><div class="lab">Total Earnings</div></div>
      <div class="db-card db-stat" style="border-left:4px solid var(--db-green)"><div class="val">₹${weekTotal.toLocaleString()}</div><div class="lab">This Week</div></div>
      <div class="db-card db-stat" style="border-left:4px solid #F59E0B"><div class="val">₹450</div><div class="lab">Today</div></div>
    </div>
    <div class="db-grid-2">
      <div class="db-card">
        <div class="db-card-title">📊 Weekly Breakdown</div>
        <div class="db-chart-bar">${vals.map((v,i)=>`<div style="flex:1;text-align:center"><div class="bar" style="height:${(v/max)*100}%"></div><div class="bar-label">${days[i]}</div></div>`).join('')}</div>
      </div>
      <div>
        <div class="db-card" style="background:var(--db-primary);color:#fff">
          <h3 style="font-size:.95rem;margin-bottom:6px;opacity:.9">Available for Withdrawal</h3>
          <p style="font-size:2.2rem;font-weight:700;margin-bottom:14px">₹3,450</p>
          <button class="db-btn" style="width:100%;background:#fff;color:var(--db-primary)">Withdraw to Bank</button>
        </div>
        <div class="db-card">
          <div class="db-card-title">🏦 Bank Details</div>
          <p style="color:var(--db-muted);font-size:.88rem">HDFC Bank</p>
          <p style="font-weight:500;font-size:.88rem">XXXX XXXX 4589</p>
        </div>
      </div>
    </div>
    <div class="db-card" style="margin-top:4px">
      <div class="db-card-title">💰 Recent Transactions</div>
      <table class="db-table"><thead><tr><th>Date</th><th>Order</th><th>Items</th><th>Amount</th><th>Commission</th><th>Net</th><th>Status</th></tr></thead>
      <tbody>${txns.map(t=>`<tr><td style="color:var(--db-muted)">${t.date}</td><td style="font-weight:500">${t.id}</td><td>${t.items}</td><td style="font-weight:600">₹${t.amount}</td><td style="color:var(--db-red)">-₹${t.commission}</td><td style="font-weight:700;color:var(--db-green)">₹${t.amount-t.commission}</td><td><span class="db-status completed">${t.status}</span></td></tr>`).join('')}</tbody></table>
    </div>`;
}

export function renderProfileTab() {
  const p = getProfile();
  const portfolio = getPortfolio();
  return `
    <div class="db-header"><h1>Profile Management</h1><p>Update your public profile and food portfolio.</p></div>
    <div class="db-card">
      <div class="db-card-title">👤 Public Profile</div>
      <div style="display:flex;gap:28px;align-items:flex-start;margin-bottom:28px">
        <div style="position:relative">
          <div style="width:110px;height:110px;border-radius:50%;overflow:hidden;border:3px solid var(--db-secondary);cursor:pointer" id="avatar-trigger">
            ${p.avatar?`<img src="${p.avatar}" style="width:100%;height:100%;object-fit:cover"/>`:`<div style="width:100%;height:100%;background:var(--db-secondary);display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:var(--db-primary)">${p.name.charAt(0)}</div>`}
          </div>
          <div style="position:absolute;bottom:2px;right:2px;width:28px;height:28px;border-radius:50%;background:var(--db-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer" id="avatar-edit">📷</div>
          <input type="file" id="avatar-input" accept="image/*" style="display:none">
        </div>
        <div style="flex:1">
          <div class="db-form-grid">
            <div class="db-field"><label>Full Name</label><input type="text" class="db-input" id="prof-name" value="${p.name}"></div>
            <div class="db-field"><label>Phone</label><input type="text" class="db-input" id="prof-phone" value="${p.phone}"></div>
            <div class="db-field"><label>Email</label><input type="text" class="db-input" id="prof-email" value="${p.email}"></div>
            <div class="db-field"><label>Kitchen Location</label><input type="text" class="db-input" id="prof-location" value="${p.location}"></div>
          </div>
        </div>
      </div>
      <div class="db-field"><label>Bio / About Me</label><textarea class="db-textarea" id="prof-bio">${p.bio}</textarea></div>
      <div class="db-field"><label>Specialties</label>
        <div class="db-toggle-group">${['Bengali','North Indian','South Indian','Chinese','Desserts','Snacks','Comfort Food','Healthy'].map(s=>`<button class="db-toggle prof-spec ${(p.specialties||[]).includes(s)?'active':''}" data-val="${s}">${s}</button>`).join('')}</div>
      </div>
      <div style="display:flex;justify-content:flex-end;padding-top:16px;border-top:1px solid var(--db-border)">
        <button class="db-btn db-btn-primary" id="save-profile-btn">Save Profile Changes</button>
      </div>
    </div>
    <div class="db-card">
      <div class="db-card-title">🍽️ Food Portfolio</div>
      <p style="color:var(--db-muted);font-size:.88rem;margin-bottom:16px">These images appear on your public profile.</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
        ${portfolio.map((img:string,i:number)=>`<div style="aspect-ratio:1;border-radius:8px;overflow:hidden;position:relative"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/><button class="remove-portfolio" data-idx="${i}" style="position:absolute;top:4px;right:4px;width:24px;height:24px;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;border:none;cursor:pointer;font-size:14px">×</button></div>`).join('')}
        <div class="db-photo-box" id="portfolio-trigger" style="aspect-ratio:1"><span class="material-icons-round" style="font-size:2rem;color:var(--db-muted)">add_photo_alternate</span><span style="font-size:.75rem;color:var(--db-muted);margin-top:4px">Add Photo</span></div>
        <input type="file" id="portfolio-input" accept="image/*" style="display:none">
      </div>
    </div>`;
}

export function renderAddDishTab(spiceLevel:string, foodType:string, mealType:string) {
  return `
    <div class="db-header"><h1>Add New Dish</h1><p>Share your homemade food with care</p></div>
    <div class="db-card">
      <div class="db-card-title">📸 Dish Photo</div>
      <div style="display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:start">
        <div class="db-photo-box" id="dish-photo-trigger"><img id="dish-preview" src="" style="display:none"/><span class="material-icons-round" id="dish-photo-placeholder" style="font-size:2.5rem;color:var(--db-muted)">add_a_photo</span></div>
        <div><p style="font-size:.88rem;color:var(--db-muted);margin-bottom:12px">Upload a clear photo of your dish</p><button class="db-btn db-btn-outline" id="dish-upload-btn">Upload Photo</button><br><span style="font-size:.75rem;color:var(--db-muted)">JPG, PNG up to 5MB</span><input type="file" id="dish-photo-input" accept="image/*" style="display:none"></div>
      </div>
    </div>
    <div class="db-card">
      <div class="db-card-title">📝 Basic Details</div>
      <div class="db-form-grid">
        <div class="db-field"><label>Dish Name</label><input type="text" class="db-input" id="dish-name" placeholder="e.g. Bengali Moong Dal"></div>
        <div class="db-field"><label>Category</label><select class="db-input" id="dish-cat"><option>Lunch</option><option>Breakfast</option><option>Dinner</option><option>Snack</option></select></div>
        <div class="db-field"><label>Price (₹)</label><input type="number" class="db-input" id="dish-price" placeholder="120"></div>
        <div class="db-field"><label>Serves</label><select class="db-input" id="dish-serves"><option>1 Person</option><option>2 Persons</option></select></div>
      </div>
    </div>
    <div class="db-card">
      <div class="db-card-title">📄 Description</div>
      <div class="db-field"><label>Ingredients</label><textarea class="db-textarea" id="dish-ingredients" placeholder="List the key ingredients..."></textarea></div>
      <div class="db-field"><label>Taste & Flavour</label><textarea class="db-textarea" id="dish-taste" placeholder="Describe the taste profile..."></textarea></div>
    </div>
    <div class="db-card">
      <div class="db-card-title">⚙️ Additional Info</div>
      <div class="db-field"><label>Spice Level</label><div class="db-toggle-group">${['Mild','Medium','Spicy'].map(s=>`<button class="db-toggle ${spiceLevel===s?'active':''}" data-type="spice" data-val="${s}">${s}</button>`).join('')}</div></div>
      <div class="db-field"><label>Food Type</label><div class="db-toggle-group">${['Veg','Non-Veg','Eggetarian'].map(s=>`<button class="db-toggle ${foodType===s?'active':''}" data-type="food" data-val="${s}">${s}</button>`).join('')}</div></div>
      <div class="db-field"><label>Meal Type</label><div class="db-toggle-group">${['Breakfast','Lunch','Dinner','Snack'].map(s=>`<button class="db-toggle ${mealType===s?'active':''}" data-type="meal" data-val="${s}">${s}</button>`).join('')}</div></div>
    </div>
    <div style="display:flex;justify-content:flex-end;gap:14px;padding-top:16px">
      <button class="db-btn db-btn-outline">Save as Draft</button>
      <button class="db-btn db-btn-primary" id="publish-dish-btn">Publish Dish</button>
    </div>`;
}

export function renderMyDishesTab() {
  const dishes = getDishes();
  return `
    <div class="db-header"><h1>My Dishes</h1><p>Manage your listed dishes.</p></div>
    ${dishes.length===0?'<div class="db-card" style="text-align:center;padding:48px"><p style="color:var(--db-muted)">No dishes added yet. Go to "Add New Dish" to list your first dish.</p></div>':''}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px">
    ${dishes.map((d:any,i:number)=>`
      <div class="db-card" style="padding:0;overflow:hidden">
        <div style="height:160px;background:var(--db-bg);overflow:hidden">${d.image?`<img src="${d.image}" style="width:100%;height:100%;object-fit:cover">`:'<div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--db-muted)">No Photo</div>'}</div>
        <div style="padding:16px">
          <h3 style="font-size:1rem;margin-bottom:4px">${d.name}</h3>
          <p style="color:var(--db-primary);font-weight:700;margin-bottom:4px">₹${d.price}</p>
          <p style="font-size:.78rem;color:var(--db-muted)">${d.category} · ${d.foodType} · ${d.spice}</p>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="db-btn db-btn-outline" style="flex:1;padding:6px;font-size:.8rem" data-dish-toggle="${i}">${d.active!==false?'Pause':'Activate'}</button>
            <button class="db-btn db-btn-danger" style="padding:6px 12px;font-size:.8rem" data-dish-delete="${i}">×</button>
          </div>
        </div>
      </div>`).join('')}
    </div>`;
}

export function renderReviewsTab() {
  const reviews = [
    {name:'Sourav M.',rating:5,text:'Best home-cooked Ilish I\'ve ever had outside my mom\'s kitchen!',date:'Today'},
    {name:'Priya G.',rating:4,text:'The Kosha Mangsho was excellent. Slightly less oil next time.',date:'Yesterday'},
    {name:'Rahul B.',rating:5,text:'Authentic Bengali flavors. Will order again!',date:'2 days ago'},
    {name:'Anita S.',rating:5,text:'The dal was perfect. Reminded me of my grandmother\'s cooking.',date:'3 days ago'},
  ];
  return `
    <div class="db-header"><h1>Customer Reviews</h1><p>See what customers say about your food.</p></div>
    <div class="db-card db-stat" style="margin-bottom:20px"><div class="val" style="color:#F59E0B">★ 4.8</div><div class="lab">Average Rating (${reviews.length} reviews)</div></div>
    <div style="display:flex;flex-direction:column;gap:14px">
    ${reviews.map(r=>`
      <div class="db-card" style="padding:20px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <div><strong>${r.name}</strong> <span style="color:#F59E0B">${'★'.repeat(r.rating)}</span></div>
          <span style="color:var(--db-muted);font-size:.8rem">${r.date}</span>
        </div>
        <p style="color:var(--db-muted);font-size:.92rem">"${r.text}"</p>
      </div>`).join('')}
    </div>`;
}

export function renderHelpTab() {
  return `
    <div class="db-header"><h1>Help & Support</h1><p>Get assistance with your Rasoimaker account.</p></div>
    <div class="db-grid-2">
      <div class="db-card" style="cursor:pointer"><div class="db-card-title">📞 Contact Support</div><p style="color:var(--db-muted);font-size:.88rem">Call us at +91 98765 43210</p></div>
      <div class="db-card" style="cursor:pointer"><div class="db-card-title">📧 Email Us</div><p style="color:var(--db-muted);font-size:.88rem">support@rasoihome.com</p></div>
      <div class="db-card" style="cursor:pointer"><div class="db-card-title">📖 FAQ</div><p style="color:var(--db-muted);font-size:.88rem">Find answers to common questions</p></div>
      <div class="db-card" style="cursor:pointer"><div class="db-card-title">💬 Live Chat</div><p style="color:var(--db-muted);font-size:.88rem">Chat with our support team</p></div>
    </div>`;
}
