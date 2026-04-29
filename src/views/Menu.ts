import { applyTranslations } from '../i18n/translations';
import { addToCart } from '../store/cartStore';

interface MenuItem {
  id: number;
  name: string;
  category: 'Vegetarian' | 'Non-Veg' | 'Healthy Snacks';
  price: number;
  description: string;
  quantity: string;
  madeBy: string;
  image: string;
}

const menuData: MenuItem[] = [
  // Non-Veg Items (Bengali Authentic)
  { id: 1, name: 'Ilish Macher Jhol Thali', category: 'Non-Veg', price: 149, description: 'Premium Hilsa fish cooked in a light mustard and eggplant curry.', quantity: '1 Thali (1 pc Fish)', madeBy: 'Sharmistha', image: '/assets/ilish.png' },
  { id: 2, name: 'Kosha Mangsho Thali', category: 'Non-Veg', price: 279, description: 'Iconic Bengali slow-cooked spicy mutton curry. Served with Basanti Pulao.', quantity: '1 Thali (4 pcs Mutton)', madeBy: 'Nandini', image: '/assets/kosha.png' },
  { id: 3, name: 'Bhetki Paturi Thali', category: 'Non-Veg', price: 199, description: 'Barramundi fish coated in mustard paste and steamed in a banana leaf.', quantity: '1 Thali (1 pc Fish)', madeBy: 'Bipasha', image: '/assets/bhetki.png' },
  { id: 4, name: 'Chingri Malai Curry Thali', category: 'Non-Veg', price: 179, description: 'Jumbo prawns cooked in a subtle, creamy coconut milk gravy.', quantity: '1 Thali (3 pcs Prawns)', madeBy: 'Anusree', image: '/assets/chingri.png' },
  { id: 5, name: 'Pabda Macher Jhal Thali', category: 'Non-Veg', price: 99, description: 'Spicy Pabda fish curry cooked with mustard and coriander leaves.', quantity: '1 Thali (1 pc Fish)', madeBy: 'Ruma', image: '/assets/pabda.png' },
  { id: 6, name: 'Katla Kalia Thali', category: 'Non-Veg', price: 89, description: 'Rich, spicy, and slightly sweet Katla fish curry served with steamed rice.', quantity: '1 Thali (1 pc Fish)', madeBy: 'Moumita', image: '/assets/katla_new.jpg' },
  { id: 7, name: 'Chicken Dakbungalow Thali', category: 'Non-Veg', price: 169, description: 'Historical colonial-era chicken curry cooked with egg and potato.', quantity: '1 Thali (3 pcs Chicken)', madeBy: 'Susmita', image: '/assets/dakbungalow_new.jpg' },
  { id: 8, name: 'Mutton Golbari Thali', category: 'Non-Veg', price: 240, description: 'Deep dark and extremely spicy mutton curry, a Kolkata classic.', quantity: '1 Thali (4 pcs Mutton)', madeBy: 'Kakoli', image: '/assets/golbari_new.png' },
  { id: 9, name: 'Parshe Macher Jhol Thali', category: 'Non-Veg', price: 119, description: 'Light Parshe fish stew perfect for everyday eating.', quantity: '1 Thali (1 pc Fish)', madeBy: 'Tanushree', image: '/assets/parshe_new.png' },
  { id: 10, name: 'Rui Macher Kalia Thali', category: 'Non-Veg', price: 80, description: 'Festive Rohu fish curry in an onion-tomato-yogurt gravy.', quantity: '1 Thali (1 pc Fish)', madeBy: 'Madhumita', image: '/assets/rui_new.jpg' },
  
  // Vegetarian Items (Bengali Authentic)
  { id: 11, name: 'Shukto & Rice Thali', category: 'Vegetarian', price: 49, description: 'Traditional Bengali mixed vegetable stew with a hint of bitterness to start the meal.', quantity: '1 Thali', madeBy: 'Sharmistha', image: '/assets/shukto_new.png' },
  { id: 12, name: 'Dhokar Dalna Thali', category: 'Vegetarian', price: 69, description: 'Lentil cakes simmered in a spicy, flavorful potato gravy.', quantity: '1 Thali', madeBy: 'Nandini', image: '/assets/dhokar_new.jpg' },
  { id: 13, name: 'Chholar Dal & Luchi', category: 'Vegetarian', price: 49, description: 'Bengal gram lentils cooked with coconut bits, served with puffy fried bread.', quantity: '250g + 4 Luchis', madeBy: 'Bipasha', image: '/assets/chholar_new.png' },
  { id: 14, name: 'Echorer Chingri Thali', category: 'Vegetarian', price: 79, description: 'Raw jackfruit curry cooked with rich Bengali spices (often called Veg Mutton).', quantity: '1 Thali', madeBy: 'Ruma', image: '/assets/echorer_new.jpg' },
  { id: 15, name: 'Mochar Ghonto Thali', category: 'Vegetarian', price: 89, description: 'A labor-intensive dry curry made with finely chopped banana blossom.', quantity: '1 Thali', madeBy: 'Anusree', image: '/assets/mochar_new.jpg' },
  { id: 16, name: 'Basanti Pulao & Alur Dom', category: 'Vegetarian', price: 129, description: 'Sweet, yellow fragrant rice paired with spicy, slow-cooked baby potatoes.', quantity: '1 Plate', madeBy: 'Moumita', image: '/assets/basanti_new.jpg' },
  { id: 17, name: 'Chanar Dalna Thali', category: 'Vegetarian', price: 79, description: 'Fresh homemade cottage cheese balls in a light cumin-ginger gravy.', quantity: '1 Thali', madeBy: 'Susmita', image: '/assets/chanar_new.png' },
  { id: 18, name: 'Niramish Khichuri Thali', category: 'Vegetarian', price: 59, description: 'Roasted moong dal khichuri served with beguni (eggplant fritters) and papad.', quantity: '1 Thali', madeBy: 'Kakoli', image: '/assets/khichuri_new.jpg' },
  { id: 19, name: 'Potoler Dorma Thali', category: 'Vegetarian', price: 69, description: 'Pointed gourd stuffed with paneer and dry fruits, cooked in a rich gravy.', quantity: '1 Thali', madeBy: 'Tanushree', image: '/assets/potoler_new.png' },
  { id: 20, name: 'Posto Bora & Bhaat Thali', category: 'Vegetarian', price: 99, description: 'Crispy poppy seed fritters served with hot rice and mushur dal.', quantity: '1 Thali', madeBy: 'Madhumita', image: '/assets/posto_new.jpg' },
  
  // Healthy Snacks
  { id: 21, name: 'Baked Makhana', category: 'Healthy Snacks', price: 49, description: 'Fox nuts baked with a light dusting of sea salt and black pepper.', quantity: '100g', madeBy: 'Anusree', image: '/assets/makhana_new.png' },
  { id: 22, name: 'Roasted Chana Mix', category: 'Healthy Snacks', price: 29, description: 'Roasted chickpeas mixed with peanuts and mild spices.', quantity: '150g', madeBy: 'Moumita', image: '/assets/chana_new.jpg' },
  { id: 23, name: 'Sprouted Moong Salad', category: 'Healthy Snacks', price: 39, description: 'Fresh green gram sprouts with chopped onions, tomatoes, and lemon juice.', quantity: '200g', madeBy: 'Susmita', image: '/assets/moong_new.png' },
  { id: 24, name: 'Masala Oats', category: 'Healthy Snacks', price: 69, description: 'Savory oats cooked with fresh mixed vegetables and light spices.', quantity: '200g', madeBy: 'Kakoli', image: '/assets/oats_new.png' },
  { id: 25, name: 'Mixed Fruit & Nut Bowl', category: 'Healthy Snacks', price: 79, description: 'A seasonal mix of fresh fruits topped with almonds and walnuts.', quantity: '250g', madeBy: 'Tanushree', image: '/assets/fruitnut_new.png' },
];

export function Menu() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  let currentFilter: 'All' | 'Vegetarian' | 'Non-Veg' | 'Healthy Snacks' = 'All';

  const renderContent = () => {
    container.innerHTML = `
      <div style="text-align:center;margin-bottom:64px;position:relative;">
        <div style="position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:120px;height:4px;background:linear-gradient(90deg,transparent,var(--color-primary),transparent);border-radius:2px;"></div>
        <span style="display:inline-block;font-size:0.8rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--color-primary);margin-bottom:12px;background:rgba(217,107,59,0.08);padding:6px 16px;border-radius:20px;">🍽️ CURATED FOR YOU</span>
        <h1 style="font-family:'Playfair Display',serif;font-size:3.2rem;color:var(--color-secondary);margin-bottom:16px;font-weight:700;letter-spacing:-0.5px;" data-translate="menuTitle">Seasonal Nourishment</h1>
        <p style="color:var(--color-text-muted);max-width:600px;margin:0 auto;font-size:1.1rem;line-height:1.7;" data-translate="menuDesc">
          Discover this week's comforting meals, prepared with fresh, seasonal ingredients and traditional spices.
        </p>
        <div style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);width:80px;height:4px;background:linear-gradient(90deg,transparent,var(--color-secondary),transparent);border-radius:2px;"></div>
      </div>
      
      <div style="display:flex;gap:12px;margin-bottom:56px;justify-content:center;flex-wrap:wrap;align-items:center;background:rgba(255,255,255,0.5);backdrop-filter:blur(12px);padding:14px 20px;border-radius:16px;border:1px solid rgba(255,255,255,0.4);max-width:600px;margin-left:auto;margin-right:auto;box-shadow:0 4px 20px rgba(0,0,0,0.03);" id="filter-buttons">
        <button class="btn-primary filter-btn" data-filter="All" style="padding:10px 24px;font-size:0.9rem;${currentFilter === 'All' ? '' : 'background:rgba(255,255,255,0.6);color:var(--color-text-main);border:1px solid rgba(0,0,0,0.08);box-shadow:var(--shadow-sm);backdrop-filter:blur(8px);'}" data-translate="allMeals">All Meals</button>
        <button class="btn-primary filter-btn" data-filter="Vegetarian" style="padding:10px 24px;font-size:0.9rem;${currentFilter === 'Vegetarian' ? '' : 'background:rgba(255,255,255,0.6);color:var(--color-text-main);border:1px solid rgba(0,0,0,0.08);box-shadow:var(--shadow-sm);backdrop-filter:blur(8px);'}" data-translate="vegetarian">Vegetarian</button>
        <button class="btn-primary filter-btn" data-filter="Non-Veg" style="padding:10px 24px;font-size:0.9rem;${currentFilter === 'Non-Veg' ? '' : 'background:rgba(255,255,255,0.6);color:var(--color-text-main);border:1px solid rgba(0,0,0,0.08);box-shadow:var(--shadow-sm);backdrop-filter:blur(8px);'}" data-translate="nonVeg">Non-Veg</button>
        <button class="btn-primary filter-btn" data-filter="Healthy Snacks" style="padding:10px 24px;font-size:0.9rem;${currentFilter === 'Healthy Snacks' ? '' : 'background:rgba(255,255,255,0.6);color:var(--color-text-main);border:1px solid rgba(0,0,0,0.08);box-shadow:var(--shadow-sm);backdrop-filter:blur(8px);'}" data-translate="healthySnacks">Healthy Snacks</button>
      </div>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:32px;" id="menu-grid">
      </div>
    `;

    const menuGrid = container.querySelector('#menu-grid')!;
    
    const filteredItems = currentFilter === 'All' 
      ? menuData 
      : menuData.filter(item => item.category === currentFilter);

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass-card';
      card.style.overflow = 'hidden';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)';
      card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-8px)'; });
      card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; });
      
      const badgeClass = item.category === 'Vegetarian' ? 'veg' : item.category === 'Non-Veg' ? 'non-veg' : 'snack';
      
      const imageHtml = item.image 
        ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">`
        : `<div style="width: 100%; height: 200px; background: linear-gradient(135deg, var(--color-secondary-light) 0%, #d4e8d8 100%); display: flex; align-items: center; justify-content: center; color: var(--color-secondary); font-weight: 700; font-size: 3.5rem; font-family: 'Playfair Display', serif; opacity: 0.7;">${item.name.charAt(0)}</div>`;

      card.innerHTML = `
        <div style="height: 200px; overflow: hidden; position: relative;">
          ${imageHtml}
          <div class="category-badge ${badgeClass}" style="position: absolute; top: 16px; right: 16px;">
            ${item.category}
          </div>
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
            <h3 style="font-size: 1.2rem; color: var(--color-secondary); line-height: 1.3; font-weight: 600;">${item.name}</h3>
            <span style="font-weight: 700; color: var(--color-primary); font-size: 1.2rem; white-space: nowrap; margin-left: 12px;">₹${item.price}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 0.82rem; color: var(--color-text-muted); background: rgba(31,77,43,0.04); padding: 8px 12px; border-radius: 8px;">
             <span><strong style="color: var(--color-text-main)" data-translate="qty">Qty:</strong> ${item.quantity}</span>
             <span><strong style="color: var(--color-text-main)" data-translate="chef">Chef:</strong> ${item.madeBy}</span>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 24px; flex-grow: 1; line-height: 1.6;">${item.description}</p>
          <button class="btn-primary add-to-cart-btn" style="width: 100%;" data-translate="addToCart">Add to Cart</button>
        </div>
      `;

      const btn = card.querySelector('.add-to-cart-btn')!;
      btn.addEventListener('click', () => {
        addToCart({
          id: `menu_${item.id}`,
          name: item.name,
          price: item.price,
          quantity: 1,
          type: 'menu'
        });
        window.location.hash = '#/checkout';
      });

      menuGrid.appendChild(card);
    });

    // Add event listeners to filter buttons
    const filterButtons = container.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        currentFilter = target.getAttribute('data-filter') as any;
        renderContent();
      });
    });

    const savedLang = localStorage.getItem('lang') || 'English';
    applyTranslations(savedLang);
  };

  renderContent();
  return container;
}

