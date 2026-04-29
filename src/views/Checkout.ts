export function Checkout() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 48px;">
      <h1 style="font-size: 3rem; color: var(--color-secondary); margin-bottom: 16px;">Finalizing Your Nourishment</h1>
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
      
      <!-- Right Column: Order Summary -->
      <div class="glass-card" style="padding: 32px; position: sticky; top: 100px;">
        <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px;">Order Summary</h3>
        
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
           <div style="width: 60px; height: 60px; background-color: #ddd; border-radius: 8px; overflow: hidden;">
             <!-- Placeholder for item image, could reuse menu images -->
             <div style="width: 100%; height: 100%; background-color: var(--color-secondary-light);"></div>
           </div>
           <div style="flex-grow: 1;">
             <h4 style="margin-bottom: 4px;">Custom Hearth Thali</h4>
             <p style="font-size: 0.8rem; color: var(--color-text-muted);">Basmati, Aloo Gobi, Palak Paneer...</p>
           </div>
           <span style="font-weight: bold;">₹310</span>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 24px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--color-text-muted);">
            <span>Subtotal</span>
            <span>₹310</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--color-text-muted);">
            <span>Delivery Fee</span>
            <span>₹40</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--color-text-muted);">
            <span>Taxes</span>
            <span>₹18</span>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: bold; margin-bottom: 32px; color: var(--color-secondary);">
          <span>Total</span>
          <span>₹368</span>
        </div>
        
        <button class="btn-primary" style="width: 100%; font-size: 1.1rem; padding: 16px;" onclick="alert('Order Placed Successfully! Returning Home.'); window.location.hash='#/'">Place Order</button>
      </div>
      
    </div>
  `;
  
  return container;
}
