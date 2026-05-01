import { addToCart } from '../store/cartStore';

export function Builder() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  interface FoodItem {
    name: string;
    price: number;
    unit: string; // "per plate", "per piece", etc.
    desc: string;
    image: string;
  }

  const bases: FoodItem[] = [
    { name: "Jeera Rice", price: 60, unit: "per plate", desc: "Basmati rice tossed with cumin seeds.", image: "/assets/jeera_rice.jpg" },
    { name: "Luchi", price: 40, unit: "per plate (4 pcs)", desc: "Deep-fried puffy flatbread.", image: "/assets/luchi.jpg" },
    { name: "Roti", price: 5, unit: "per piece", desc: "Soft, hot, brushed with ghee.", image: "/assets/roti.jpg" },
    { name: "Steamed Basmati Rice", price: 29, unit: "per plate", desc: "Classic, fragrant, light.", image: "/assets/basmati_rice.jpg" },
  ];

  const mains: FoodItem[] = [
    { name: "Dhokar Dalna", price: 69, unit: "per plate", desc: "Lentil cakes simmered in spicy gravy.", image: "/assets/dhokar_new.jpg" },
    { name: "Shukto and Dal", price: 49, unit: "per plate", desc: "Mixed veggie stew with lentil soup.", image: "/assets/shukto_new.png" },
    { name: "Palak Paneer", price: 100, unit: "per plate", desc: "Spinach gravy with cottage cheese.", image: "/assets/echorer_new.jpg" },
    { name: "Kosha Mangsho", price: 180, unit: "per plate", desc: "Slow-cooked spicy mutton curry.", image: "/assets/kosha.png" },
    { name: "Shorshe Ilish", price: 150, unit: "per plate", desc: "Hilsa fish in mustard sauce.", image: "/assets/ilish.png" },
    { name: "Chicken Dakbungalow", price: 140, unit: "per plate", desc: "Colonial-era chicken & egg curry.", image: "/assets/dakbungalow_new.jpg" },
  ];

  const sides: FoodItem[] = [
    { name: "Sprouted Moong Salad", price: 39, unit: "per plate", desc: "Fresh sprouts with onion & lemon.", image: "/assets/moong_new.png" },
    { name: "Posto Bora", price: 20, unit: "per piece", desc: "Crispy poppy seed fritters.", image: "/assets/posto_new.jpg" },
    { name: "Potoler Dorma", price: 69, unit: "per plate", desc: "Stuffed pointed gourd in rich gravy.", image: "/assets/potoler_new.png" },
    { name: "Baked Makhana", price: 49, unit: "per bowl", desc: "Fox nuts with sea salt & pepper.", image: "/assets/makhana_new.png" },
  ];

  interface CookProfile {
    name: string;
    rating: string;
    reviews: number;
    emoji: string;
    color: string;
    specialty: string;
  }

  const cooks: CookProfile[] = [
    { name: "Sharmistha", rating: "4.8", reviews: 124, emoji: "👩‍🍳", color: "#D96C4A", specialty: "Bengali Non-Veg" },
    { name: "Nandini", rating: "4.9", reviews: 89, emoji: "👩‍🍳", color: "#2D5A27", specialty: "Vegetarian Thalis" },
    { name: "Kakoli", rating: "4.9", reviews: 310, emoji: "👩‍🍳", color: "#5E35B1", specialty: "Traditional Bengali" },
  ];

  // Track quantities for each item
  const quantities: Record<string, number> = {};
  const allItems = [...bases, ...mains, ...sides];
  allItems.forEach(item => { quantities[item.name] = 0; });
  // Default selections
  quantities["Jeera Rice"] = 1;
  quantities["Palak Paneer"] = 1;
  quantities["Kosha Mangsho"] = 1;
  quantities["Sprouted Moong Salad"] = 1;

  const renderFoodCard = (item: FoodItem, category: string) => {
    const qty = quantities[item.name] || 0;
    const isSelected = qty > 0;
    return `
    <div class="glass-card food-option${isSelected ? ' selected' : ''}" style="padding: 0; cursor: pointer; overflow: hidden; transition: all 0.3s ease;" data-category="${category}" data-name="${item.name}">
      <div style="width: 100%; height: 110px; overflow: hidden; position: relative;">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: linear-gradient(transparent, rgba(0,0,0,0.45));"></div>
        ${isSelected ? '<div style="position: absolute; top: 8px; left: 8px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-primary); display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 700; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">✓</div>' : ''}
      </div>
      <div style="padding: 10px 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <h4 style="font-size: 0.92rem; margin: 0; line-height: 1.3;">${item.name}</h4>
          <span style="font-weight: 700; color: var(--color-primary); font-size: 0.85rem; white-space: nowrap; margin-left: 6px;">₹${item.price}</span>
        </div>
        <p style="font-size: 0.75rem; color: var(--color-text-muted); margin: 0 0 8px 0;">${item.desc}</p>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.7rem; color: var(--color-text-muted); background: rgba(31,77,43,0.06); padding: 2px 8px; border-radius: 10px;">${item.unit}</span>
          <div class="qty-controls" style="display: flex; align-items: center; gap: 0; background: rgba(31,77,43,0.05); border-radius: 20px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08);" data-item="${item.name}" data-category="${category}">
            <button class="qty-btn qty-minus" style="width: 28px; height: 28px; border: none; background: ${qty > 0 ? 'var(--color-primary)' : '#ddd'}; color: ${qty > 0 ? '#fff' : '#999'}; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;" data-action="minus" data-item="${item.name}">−</button>
            <span class="qty-value" style="min-width: 28px; text-align: center; font-weight: 700; font-size: 0.9rem; color: var(--color-secondary);">${qty}</span>
            <button class="qty-btn qty-plus" style="width: 28px; height: 28px; border: none; background: var(--color-primary); color: #fff; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;" data-action="plus" data-item="${item.name}">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
  };

  const renderCookCard = (cook: CookProfile, isSelected: boolean) => `
    <div class="glass-card cook-option${isSelected ? ' selected' : ''}" style="padding: 0; cursor: pointer; overflow: hidden;" data-cook="${cook.name}">
      <div style="width: 100%; height: 80px; background: linear-gradient(135deg, ${cook.color}22, ${cook.color}11); display: flex; align-items: center; justify-content: center;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, ${cook.color}, ${cook.color}cc); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 4px 16px ${cook.color}33; border: 3px solid white;">${cook.emoji}</div>
      </div>
      <div style="padding: 12px 14px; text-align: center;">
        <h4 style="font-size: 1rem; margin-bottom: 2px;">${cook.name}</h4>
        <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 4px;">★ ${cook.rating} (${cook.reviews} reviews)</p>
        <span style="font-size: 0.72rem; background: ${cook.color}15; color: ${cook.color}; padding: 3px 10px; border-radius: 20px; font-weight: 600;">${cook.specialty}</span>
      </div>
    </div>
  `;

  function render() {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 72px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 3.2rem; color: var(--color-secondary); margin-bottom: 16px; font-weight: 700; letter-spacing: -0.5px;">Hearth Thali Builder</h1>
        <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem; line-height: 1.7;">
          Customize your perfect meal from our authentic menu items. Use <strong>+</strong> and <strong>−</strong> to adjust quantities.
        </p>
      </div>
      
      <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 48px; align-items: start;">
        
        <!-- Selection Column -->
        <div style="display: flex; flex-direction: column; gap: 40px;">
          
          <!-- Step 1: Base -->
          <div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid rgba(31,77,43,0.1); padding-bottom: 10px; font-weight: 600;">1. Select Your Base</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              ${bases.map(b => renderFoodCard(b, 'base')).join('')}
            </div>
          </div>
          
          <!-- Step 2: Mains -->
          <div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid rgba(31,77,43,0.1); padding-bottom: 10px; font-weight: 600;">2. Choose Your Mains</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              ${mains.map(m => renderFoodCard(m, 'main')).join('')}
            </div>
          </div>
          
          <!-- Step 3: Sides -->
          <div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid rgba(31,77,43,0.1); padding-bottom: 10px; font-weight: 600;">3. Pick Your Sides</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              ${sides.map(s => renderFoodCard(s, 'side')).join('')}
            </div>
          </div>

          <!-- Step 4: Choose Cook -->
          <div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid rgba(31,77,43,0.1); padding-bottom: 10px; font-weight: 600;">4. Choose Your Rasoimaker (Cook)</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
              ${cooks.map((c, i) => renderCookCard(c, i === 0)).join('')}
            </div>
          </div>
          
        </div>
        
        <!-- Summary Column -->
        <div class="glass-card" style="padding: 0; position: sticky; top: 80px; display: flex; flex-direction: column; overflow: hidden; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); box-shadow: 0 12px 48px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7);">
          <div style="padding: 24px; background: linear-gradient(135deg, rgba(31,77,43,0.04) 0%, rgba(245,233,218,0.6) 100%); border-bottom: 1px solid rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 8px;">Your Custom Thali</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0;">Prepared by: <strong id="selected-cook-name">Sharmistha</strong></p>
          </div>
          
          <div style="padding: 24px;">
            <ul id="draft-order-list" style="list-style: none; padding: 0; margin: 0; margin-bottom: 24px; color: var(--color-text-main);">
              <!-- Items rendered via JS -->
            </ul>
            
            <div style="border-top: 2px dashed #e0dcd4; margin-bottom: 20px;"></div>
            
            <div id="items-count" style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 16px;">
              <span>Items</span>
              <span id="total-items-count">0 items</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: bold; margin-bottom: 32px; color: var(--color-secondary);">
              <span>Total</span>
              <span id="custom-thali-total">₹0</span>
            </div>
            
            <button id="add-thali-btn" class="btn-primary" style="width: 100%; padding: 16px; font-size: 1.1rem;">
              Add Custom Thali to Cart
            </button>
          </div>
        </div>
        
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const addThaliBtn = container.querySelector('#add-thali-btn') as HTMLButtonElement;
    const cookOptions = container.querySelectorAll('.cook-option');
    const selectedCookName = container.querySelector('#selected-cook-name') as HTMLElement;

    // Quantity Button Clicks
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data-action');
        const itemName = target.getAttribute('data-item');
        if (!action || !itemName) return;

        if (action === 'plus') {
          quantities[itemName] = (quantities[itemName] || 0) + 1;
        } else if (action === 'minus') {
          if (quantities[itemName] > 0) {
            quantities[itemName]--;
          }
        }

        render();
      });
    });

    // Cook Selection Logic
    cookOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        cookOptions.forEach(o => o.classList.remove('selected'));
        const target = e.currentTarget as HTMLElement;
        target.classList.add('selected');
        selectedCookName.textContent = target.getAttribute('data-cook') || 'Sharmistha';
      });
    });
    
    // Update Summary
    updateSummary();

    // Add to Cart
    addThaliBtn.addEventListener('click', () => {
      const selectedItems = allItems.filter(item => quantities[item.name] > 0);
      if (selectedItems.length === 0) return;

      let totalPrice = 0;
      selectedItems.forEach(item => {
        totalPrice += item.price * quantities[item.name];
      });

      const cookName = selectedCookName.textContent;

      addToCart({
        id: 'custom_thali_' + Date.now(),
        name: `Custom Thali (by ${cookName})`,
        price: totalPrice,
        quantity: 1,
        type: 'custom-thali'
      });
      
      window.location.hash = '#/checkout';
    });
  }

  function updateSummary() {
    const orderList = container.querySelector('#draft-order-list') as HTMLUListElement;
    const totalEl = container.querySelector('#custom-thali-total') as HTMLElement;
    const itemsCountEl = container.querySelector('#total-items-count') as HTMLElement;
    if (!orderList || !totalEl) return;

    orderList.innerHTML = '';
    let total = 0;
    let totalItemsCount = 0;

    const selectedItems = allItems.filter(item => quantities[item.name] > 0);

    if (selectedItems.length === 0) {
      orderList.innerHTML = '<li style="color: var(--color-text-muted); padding: 8px 0;"><i>No items selected — use + to add</i></li>';
    } else {
      selectedItems.forEach(item => {
        const qty = quantities[item.name];
        const lineTotal = item.price * qty;
        total += lineTotal;
        totalItemsCount += qty;
        const li = document.createElement('li');
        li.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 8px 12px; background: rgba(31,77,43,0.03); border-radius: 10px;';
        li.innerHTML = `
          <div style="flex: 1;">
            <div style="font-size: 0.9rem; font-weight: 500;">${item.name}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">₹${item.price} × ${qty}</div>
          </div>
          <span style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">₹${lineTotal}</span>
        `;
        orderList.appendChild(li);
      });
    }
    
    totalEl.textContent = `₹${total}`;
    if (itemsCountEl) {
      itemsCountEl.textContent = `${totalItemsCount} item${totalItemsCount !== 1 ? 's' : ''}`;
    }
  }

  render();
  return container;
}
