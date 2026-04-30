import { applyTranslations } from '../i18n/translations';

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
  { id: 1, name: 'Ilish Macher Jhol Thali', category: 'Non-Veg', price: 499, description: 'Premium Hilsa fish cooked in a light mustard and eggplant curry.', quantity: '1 Thali', madeBy: 'Sharmistha', image: '' },
  { id: 2, name: 'Kosha Mangsho Thali', category: 'Non-Veg', price: 449, description: 'Iconic Bengali slow-cooked spicy mutton curry. Served with Basanti Pulao.', quantity: '1 Thali', madeBy: 'Nandini', image: '' },
  { id: 3, name: 'Bhetki Paturi Thali', category: 'Non-Veg', price: 389, description: 'Barramundi fish coated in mustard paste and steamed in a banana leaf.', quantity: '1 Thali', madeBy: 'Bipasha', image: '' },
  { id: 4, name: 'Chingri Malai Curry Thali', category: 'Non-Veg', price: 429, description: 'Jumbo prawns cooked in a subtle, creamy coconut milk gravy.', quantity: '1 Thali', madeBy: 'Anusree', image: '' },
  { id: 5, name: 'Pabda Macher Jhal Thali', category: 'Non-Veg', price: 319, description: 'Spicy Pabda fish curry cooked with mustard and coriander leaves.', quantity: '1 Thali', madeBy: 'Ruma', image: '' },
  { id: 6, name: 'Katla Kalia Thali', category: 'Non-Veg', price: 299, description: 'Rich, spicy, and slightly sweet Katla fish curry served with steamed rice.', quantity: '1 Thali', madeBy: 'Moumita', image: '' },
  { id: 7, name: 'Chicken Dakbungalow Thali', category: 'Non-Veg', price: 349, description: 'Historical colonial-era chicken curry cooked with egg and potato.', quantity: '1 Thali', madeBy: 'Susmita', image: '' },
  { id: 8, name: 'Mutton Golbari Thali', category: 'Non-Veg', price: 469, description: 'Deep dark and extremely spicy mutton curry, a Kolkata classic.', quantity: '1 Thali', madeBy: 'Kakoli', image: '' },
  { id: 9, name: 'Parshe Macher Jhol Thali', category: 'Non-Veg', price: 289, description: 'Light Parshe fish stew perfect for everyday eating.', quantity: '1 Thali', madeBy: 'Tanushree', image: '' },
  { id: 10, name: 'Rui Macher Kalia Thali', category: 'Non-Veg', price: 279, description: 'Festive Rohu fish curry in an onion-tomato-yogurt gravy.', quantity: '1 Thali', madeBy: 'Madhumita', image: '' },
  
  // Vegetarian Items (Bengali Authentic)
  { id: 11, name: 'Shukto & Rice Thali', category: 'Vegetarian', price: 219, description: 'Traditional Bengali mixed vegetable stew with a hint of bitterness to start the meal.', quantity: '1 Thali', madeBy: 'Sharmistha', image: '' },
  { id: 12, name: 'Dhokar Dalna Thali', category: 'Vegetarian', price: 239, description: 'Lentil cakes simmered in a spicy, flavorful potato gravy.', quantity: '1 Thali', madeBy: 'Nandini', image: '' },
  { id: 13, name: 'Chholar Dal & Luchi', category: 'Vegetarian', price: 189, description: 'Bengal gram lentils cooked with coconut bits, served with puffy fried bread.', quantity: '250g + 4 Luchis', madeBy: 'Bipasha', image: '' },
  { id: 14, name: 'Echorer Dalna Thali', category: 'Vegetarian', price: 249, description: 'Raw jackfruit curry cooked with rich Bengali spices (often called Veg Mutton).', quantity: '1 Thali', madeBy: 'Ruma', image: '' },
  { id: 15, name: 'Mochar Ghonto Thali', category: 'Vegetarian', price: 259, description: 'A labor-intensive dry curry made with finely chopped banana blossom.', quantity: '1 Thali', madeBy: 'Anusree', image: '' },
  { id: 16, name: 'Basanti Pulao & Alur Dom', category: 'Vegetarian', price: 229, description: 'Sweet, yellow fragrant rice paired with spicy, slow-cooked baby potatoes.', quantity: '1 Plate', madeBy: 'Moumita', image: '' },
  { id: 17, name: 'Chanar Dalna Thali', category: 'Vegetarian', price: 269, description: 'Fresh homemade cottage cheese balls in a light cumin-ginger gravy.', quantity: '1 Thali', madeBy: 'Susmita', image: '' },
  { id: 18, name: 'Niramish Khichuri Thali', category: 'Vegetarian', price: 209, description: 'Roasted moong dal khichuri served with beguni (eggplant fritters) and papad.', quantity: '1 Thali', madeBy: 'Kakoli', image: '' },
  { id: 19, name: 'Potoler Dorma Thali', category: 'Vegetarian', price: 279, description: 'Pointed gourd stuffed with paneer and dry fruits, cooked in a rich gravy.', quantity: '1 Thali', madeBy: 'Tanushree', image: '' },
  { id: 20, name: 'Posto Bora & Bhaat Thali', category: 'Vegetarian', price: 199, description: 'Crispy poppy seed fritters served with hot rice and mushur dal.', quantity: '1 Thali', madeBy: 'Madhumita', image: '' },
  
  // Healthy Snacks
  { id: 21, name: 'Baked Makhana', category: 'Healthy Snacks', price: 99, description: 'Fox nuts baked with a light dusting of sea salt and black pepper.', quantity: '100g', madeBy: 'Anusree', image: '' },
  { id: 22, name: 'Roasted Chana Mix', category: 'Healthy Snacks', price: 89, description: 'Roasted chickpeas mixed with peanuts and mild spices.', quantity: '150g', madeBy: 'Moumita', image: '' },
  { id: 23, name: 'Sprouted Moong Salad', category: 'Healthy Snacks', price: 129, description: 'Fresh green gram sprouts with chopped onions, tomatoes, and lemon juice.', quantity: '200g', madeBy: 'Susmita', image: '' },
  { id: 24, name: 'Masala Oats', category: 'Healthy Snacks', price: 119, description: 'Savory oats cooked with fresh mixed vegetables and light spices.', quantity: '200g', madeBy: 'Kakoli', image: '' },
  { id: 25, name: 'Mixed Fruit & Nut Bowl', category: 'Healthy Snacks', price: 159, description: 'A seasonal mix of fresh fruits topped with almonds and walnuts.', quantity: '250g', madeBy: 'Tanushree', image: '' },
];

export function Menu() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  let currentFilter: 'All' | 'Vegetarian' | 'Non-Veg' | 'Healthy Snacks' = 'All';

  const renderContent = () => {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 64px;">
        <h1 style="font-size: 3rem; color: var(--color-secondary); margin-bottom: 16px;" data-translate="menuTitle">Seasonal Nourishment</h1>
        <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem;" data-translate="menuDesc">
          Discover this week's comforting meals, prepared with fresh, seasonal ingredients and traditional spices.
        </p>
      </div>
      
      <div style="display: flex; gap: 16px; margin-bottom: 48px; justify-content: center; flex-wrap: wrap;" id="filter-buttons">
        <button class="btn-primary filter-btn" data-filter="All" style="${currentFilter === 'All' ? '' : 'background-color: transparent; color: var(--color-text-main); border: 1px solid #ddd;'}" data-translate="allMeals">All Meals</button>
        <button class="btn-primary filter-btn" data-filter="Vegetarian" style="${currentFilter === 'Vegetarian' ? '' : 'background-color: transparent; color: var(--color-text-main); border: 1px solid #ddd;'}" data-translate="vegetarian">Vegetarian</button>
        <button class="btn-primary filter-btn" data-filter="Non-Veg" style="${currentFilter === 'Non-Veg' ? '' : 'background-color: transparent; color: var(--color-text-main); border: 1px solid #ddd;'}" data-translate="nonVeg">Non-Veg</button>
        <button class="btn-primary filter-btn" data-filter="Healthy Snacks" style="${currentFilter === 'Healthy Snacks' ? '' : 'background-color: transparent; color: var(--color-text-main); border: 1px solid #ddd;'}" data-translate="healthySnacks">Healthy Snacks</button>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px;" id="menu-grid">
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
      
      const imageHtml = item.image 
        ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">`
        : `<div style="width: 100%; height: 200px; background-color: var(--color-secondary-light); display: flex; align-items: center; justify-content: center; color: var(--color-secondary); font-weight: bold; font-size: 3rem;">${item.name.charAt(0)}</div>`;

      card.innerHTML = `
        <div style="height: 200px; overflow: hidden; position: relative;">
          ${imageHtml}
          <div style="position: absolute; top: 16px; right: 16px; background-color: rgba(255,255,255,0.9); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; color: ${item.category === 'Vegetarian' ? 'green' : item.category === 'Non-Veg' ? 'red' : 'orange'}">
            ${item.category}
          </div>
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h3 style="font-size: 1.25rem; color: var(--color-secondary); line-height: 1.3;">${item.name}</h3>
            <span style="font-weight: 600; color: var(--color-primary); font-size: 1.2rem;">₹${item.price}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem; color: #555; background-color: rgba(0,0,0,0.03); padding: 8px; border-radius: 6px;">
             <span><strong style="color: var(--color-text-main)" data-translate="qty">Qty:</strong> ${item.quantity}</span>
             <span><strong style="color: var(--color-text-main)" data-translate="chef">Chef:</strong> ${item.madeBy}</span>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 24px; flex-grow: 1;">${item.description}</p>
          <button class="btn-primary add-to-cart-btn" style="width: 100%;" data-translate="addToCart">Add to Cart</button>
        </div>
      `;

      const btn = card.querySelector('.add-to-cart-btn')!;
      btn.addEventListener('click', () => {
        alert(`${item.name} added to cart!`);
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

