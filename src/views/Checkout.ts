import { getCart, removeFromCart, addToCart, isLoggedIn, clearCart } from '../store/cartStore';

export function Checkout() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  function render() {
    // 1. Mandatory Sign-in Guard
    if (!isLoggedIn()) {
      container.innerHTML = `
        <div style="text-align: center; margin: 100px auto; max-width: 500px; padding: 48px; background: var(--color-white); border-radius: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
          <div style="font-size: 3rem; margin-bottom: 24px;">🔒</div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--color-secondary); margin-bottom: 16px;">Sign Up Required</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 32px; font-size: 1.1rem; line-height: 1.6;">
            To ensure the highest quality of service and delivery, we require all our guests to create an account before placing an order.
          </p>
          <button class="btn-primary" style="width: 100%; padding: 16px; font-size: 1.1rem; border-radius: 12px;" onclick="window.location.hash='#/signin'">Sign In / Join the Family</button>
        </div>
      `;
      return;
    }

    const cart = getCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; margin: 100px auto; max-width: 500px; padding: 48px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--color-secondary); margin-bottom: 16px;">Your Cart is Empty</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 32px; font-size: 1.1rem;">Looks like you haven't added any authentic meals yet.</p>
          <button class="btn-primary" style="padding: 16px 32px; font-size: 1.1rem;" onclick="window.location.hash='#/menu'">Browse Menu</button>
        </div>
      `;
      return;
    }

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let deliveryCharge = subtotal < 100 ? 25 : 15;
    let tax = Math.round(subtotal * 0.05); // 5% GST
    let total = subtotal + deliveryCharge + tax;

    const cartItemsHtml = cart.map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <div style="flex-grow: 1;">
          <h4 style="margin-bottom: 4px; font-size: 1.1rem; color: var(--color-text-main);">${item.name}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-muted);">Qty: ${item.quantity}</p>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
          <span style="font-weight: 700; color: var(--color-secondary);">₹${item.price * item.quantity}</span>
          <button class="remove-btn" data-id="${item.id}" style="background: none; border: none; color: #e74c3c; font-size: 0.85rem; cursor: pointer; text-decoration: underline;">Remove</button>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 48px;">
        <h1 style="font-size: 3rem; color: var(--color-secondary); margin-bottom: 16px; font-family: 'Playfair Display', serif;">Finalizing Your Nourishment</h1>
        <p style="color: var(--color-text-muted); font-size: 1.1rem;">Secure checkout to bring the taste of home to your door.</p>
      </div>
      
      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 48px; align-items: start;">
        
        <!-- Left Column: Forms -->
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <div class="glass-card" style="padding: 32px;">
            <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px;">1. Delivery Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <label style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 8px;">First Name</label>
                <input type="text" placeholder="Rahul" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
              </div>
              <div>
                <label style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 8px;">Last Name</label>
                <input type="text" placeholder="Sharma" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
              </div>
            </div>
            <div style="margin-bottom: 16px;">
               <label style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 8px;">Address</label>
               <input type="text" placeholder="123 Harmony Apartments, Main Road" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 8px;">City</label>
                <input type="text" placeholder="Bangalore" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
              </div>
              <div>
                <label style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 8px;">PIN Code</label>
                <input type="text" placeholder="560001" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
              </div>
            </div>
          </div>
          
          <div class="glass-card" style="padding: 32px;">
            <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px;">2. Payment Method</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
               <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid var(--color-primary); border-radius: 8px; cursor: pointer; background-color: rgba(217, 108, 74, 0.05);">
                 <input type="radio" name="payment" checked>
                 <span style="font-weight: 500;">Credit / Debit Card</span>
               </label>
               <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;">
                 <input type="radio" name="payment">
                 <span style="font-weight: 500;">UPI (Google Pay, PhonePe, Paytm)</span>
               </label>
               <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;">
                 <input type="radio" name="payment">
                 <span style="font-weight: 500;">Cash on Delivery</span>
               </label>
            </div>
          </div>
          
        </div>
        
        <!-- Right Column: Order Summary & Add-ons -->
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <div class="glass-card" style="padding: 32px; position: sticky; top: 100px;">
            <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px;">Order Summary</h3>
            
            <div style="margin-bottom: 24px;">
              ${cartItemsHtml}
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 24px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--color-text-muted);">
                <span>Subtotal</span>
                <span>₹${subtotal}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--color-text-muted);">
                <span>Delivery Charge <span style="font-size: 0.75rem; background: #eee; padding: 2px 6px; border-radius: 10px;">${subtotal < 100 ? '< ₹100' : '> ₹100'}</span></span>
                <span>₹${deliveryCharge}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--color-text-muted);">
                <span>Taxes (5%)</span>
                <span>₹${tax}</span>
              </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: bold; margin-bottom: 32px; color: var(--color-secondary);">
              <span>Total</span>
              <span>₹${total}</span>
            </div>
            
            <button id="place-order-btn" class="btn-primary" style="width: 100%; font-size: 1.1rem; padding: 16px;">Place Order</button>
          </div>
          
          <!-- Add-ons -->
          <div class="glass-card" style="padding: 32px;">
            <h3 style="font-size: 1.2rem; color: var(--color-secondary); margin-bottom: 16px;">Add Small Things</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
                <div>
                  <span style="font-weight: 600;">Extra Rice</span>
                  <span style="display: block; font-size: 0.85rem; color: var(--color-text-muted);">+ ₹30</span>
                </div>
                <button class="addon-btn" data-id="addon_rice" data-name="Extra Rice" data-price="30" style="background: var(--color-secondary); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer;">+</button>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
                <div>
                  <span style="font-weight: 600;">Extra Dal</span>
                  <span style="display: block; font-size: 0.85rem; color: var(--color-text-muted);">+ ₹40</span>
                </div>
                <button class="addon-btn" data-id="addon_dal" data-name="Extra Dal" data-price="40" style="background: var(--color-secondary); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer;">+</button>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
                <div>
                  <span style="font-weight: 600;">Papad</span>
                  <span style="display: block; font-size: 0.85rem; color: var(--color-text-muted);">+ ₹10</span>
                </div>
                <button class="addon-btn" data-id="addon_papad" data-name="Papad" data-price="10" style="background: var(--color-secondary); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer;">+</button>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    `;

    setTimeout(() => {
      container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.id;
          if (id) {
            removeFromCart(id);
          }
        });
      });

      container.querySelectorAll('.addon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          addToCart({
            id: target.dataset.id!,
            name: target.dataset.name!,
            price: parseInt(target.dataset.price!, 10),
            quantity: 1,
            type: 'addon'
          });
        });
      });

      const placeOrderBtn = container.querySelector('#place-order-btn');
      if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
          alert('Order Placed Successfully! Returning Home.');
          clearCart();
          window.location.hash = '#/';
        });
      }
    }, 0);
  }

  // Subscribe to cart updates
  const updateListener = () => render();
  window.addEventListener('cartUpdated', updateListener);

  // Initial render
  render();

  // Cleanup listener when component is potentially destroyed (for simplicity, we leave it since it's a SPA, but ideally we'd remove it)
  // Since we rebuild the container innerHTML, it's fine.

  return container;
}
