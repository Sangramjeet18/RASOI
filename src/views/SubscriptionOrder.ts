const mealOptions = [
  { name: 'Ilish Macher Jhol Thali', category: 'Non-Veg', price: 499 },
  { name: 'Kosha Mangsho Thali', category: 'Non-Veg', price: 449 },
  { name: 'Chingri Malai Curry Thali', category: 'Non-Veg', price: 429 },
  { name: 'Chicken Dakbungalow Thali', category: 'Non-Veg', price: 349 },
  { name: 'Shukto & Rice Thali', category: 'Veg', price: 219 },
  { name: 'Dhokar Dalna Thali', category: 'Veg', price: 239 },
  { name: 'Chholar Dal & Luchi', category: 'Veg', price: 189 },
  { name: 'Echorer Dalna Thali', category: 'Veg', price: 249 },
  { name: 'Basanti Pulao & Alur Dom', category: 'Veg', price: 229 },
  { name: 'Niramish Khichuri Thali', category: 'Veg', price: 209 },
];

const timeSlots = [
  '8:00 AM – Breakfast',
  '12:00 PM – Lunch',
  '4:00 PM – Snacks',
  '7:30 PM – Dinner',
  '9:00 PM – Late Dinner',
];

const deliveryPlaces = [
  'Home',
  'Office / Workplace',
  'PG / Hostel',
  'Hotel / Guest House',
  'Other (specify in chat)',
];

const dietaryOptions = [
  'No Preference',
  'Less Spicy',
  'Extra Spicy',
  'No Onion / Garlic',
  'Low Oil',
  'Jain',
  'Gluten Free',
];

function generateDates(count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }));
  }
  return dates;
}

export function SubscriptionOrder() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';

  const planType = window.location.hash.includes('weekly') ? 'weekly' : 'monthly';
  const planLabel = planType === 'weekly' ? 'Weekly Ritual' : 'Monthly Comfort';
  const planPrice = planType === 'weekly' ? '₹1,299' : '₹4,999';
  const planDays = planType === 'weekly' ? 7 : 30;
  const dates = generateDates(planDays > 14 ? 14 : planDays);

  // State
  const state = {
    selectedMeals: [] as string[],
    selectedTime: '',
    selectedDate: '',
    selectedPlace: '',
    selectedDiet: '',
    chatMessage: '',
    currentLocation: '',
    otherLocation: '',
    selectedPayment: '',
    showPayment: false,
  };

  function render() {
    container.innerHTML = `
      <style>
        .sub-order-hero {
          background: linear-gradient(135deg, #2D5A27 0%, #3a7a32 50%, #2D5A27 100%);
          padding: 48px 24px 56px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .sub-order-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 70%, rgba(217,108,74,0.15) 0%, transparent 50%);
          animation: heroGlow 8s ease-in-out infinite alternate;
        }
        @keyframes heroGlow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(5%, -5%); }
        }
        .sub-order-hero h1 {
          font-size: 2.8rem;
          color: #fff;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .sub-order-hero .plan-badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          padding: 8px 24px;
          border-radius: 30px;
          color: #fff;
          font-weight: 500;
          font-size: 1.05rem;
          margin-top: 12px;
          position: relative;
          z-index: 1;
        }
        .sub-order-hero .plan-badge strong {
          color: #FFD6A5;
        }

        .so-columns {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          max-width: 1260px;
          margin: -32px auto 0;
          padding: 0 24px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 1100px) {
          .so-columns { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .so-columns { grid-template-columns: 1fr; }
        }

        .so-col {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .so-col:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
        }
        .so-col-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 16px;
          flex-shrink: 0;
        }
        .so-col h3 {
          font-size: 1.15rem;
          color: var(--color-secondary);
          margin-bottom: 4px;
        }
        .so-col .so-col-sub {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }

        .so-option {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1.5px solid #e8e4dc;
          cursor: pointer;
          margin-bottom: 8px;
          font-size: 0.92rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          user-select: none;
        }
        .so-option:hover {
          border-color: var(--color-primary);
          background: #FFF7F2;
        }
        .so-option.selected {
          border-color: var(--color-primary);
          background: linear-gradient(135deg, #FFF1EB 0%, #FFF7F2 100%);
          box-shadow: 0 2px 8px rgba(217,108,74,0.12);
        }
        .so-option.selected .so-dot {
          background: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(217,108,74,0.2);
        }
        .so-option .so-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #ccc;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .so-option.selected .so-dot {
          border-color: var(--color-primary);
        }
        /* Multi-select checkbox style */
        .so-option .so-check {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 2px solid #ccc;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: transparent;
          transition: all 0.2s ease;
        }
        .so-option.selected .so-check {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
          box-shadow: 0 0 0 3px rgba(217,108,74,0.2);
        }
        .so-option .so-label { flex: 1; }
        .so-option .so-price {
          font-size: 0.8rem;
          color: var(--color-primary);
          font-weight: 600;
        }

        .so-chat-section {
          max-width: 1260px;
          margin: 40px auto 0;
          padding: 0 24px;
        }
        .so-chat-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
          padding: 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 700px) {
          .so-chat-card { grid-template-columns: 1fr; }
        }
        .so-chat-card h3 {
          font-size: 1.3rem;
          color: var(--color-secondary);
          margin-bottom: 6px;
        }
        .so-chat-card p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }
        .so-textarea {
          width: 100%;
          min-height: 130px;
          border: 1.5px solid #e0dcd4;
          border-radius: 14px;
          padding: 14px 16px;
          font-family: var(--font-main);
          font-size: 0.95rem;
          resize: vertical;
          background: #FFFCF8;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          outline: none;
        }
        .so-textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(217,108,74,0.1);
        }
        .so-textarea::placeholder { color: #b8b4ab; }

        .so-summary-mini {
          background: linear-gradient(135deg, var(--color-secondary-light) 0%, #f0f7f1 100%);
          border-radius: 16px;
          padding: 24px;
        }
        .so-summary-mini h4 {
          font-size: 1.1rem;
          color: var(--color-secondary);
          margin-bottom: 16px;
        }
        .so-summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px dashed rgba(45,90,39,0.15);
          font-size: 0.9rem;
          color: var(--color-text-main);
        }
        .so-summary-row:last-child { border-bottom: none; }
        .so-summary-row .label { color: var(--color-text-muted); }

        .so-bottom-bar {
          max-width: 1260px;
          margin: 32px auto 60px;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .so-back-link {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .so-back-link:hover { color: var(--color-primary); }
        .so-submit-btn {
          background: linear-gradient(135deg, var(--color-primary) 0%, #e07c5a 100%);
          color: #fff;
          padding: 16px 48px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 8px 24px rgba(217,108,74,0.3);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .so-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(217,108,74,0.4);
        }

        .so-details-section {
          max-width: 1260px;
          margin: 32px auto 0;
          padding: 0 24px;
        }
        .so-details-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
          padding: 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 700px) {
          .so-details-card { grid-template-columns: 1fr; }
        }
        .so-details-card h3 {
          grid-column: 1 / -1;
          font-size: 1.3rem;
          color: var(--color-secondary);
          margin-bottom: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .so-field-group label {
          display: block;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-secondary);
          margin-bottom: 8px;
        }
        .so-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e0dcd4;
          border-radius: 12px;
          font-family: var(--font-main);
          font-size: 0.95rem;
          background: #FFFCF8;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .so-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(217,108,74,0.1);
        }
        .so-input::placeholder { color: #b8b4ab; }
        .so-locate-btn {
          margin-top: 8px;
          background: var(--color-secondary-light);
          color: var(--color-secondary);
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .so-locate-btn:hover {
          background: var(--color-secondary);
          color: #fff;
        }

        /* Payment Overlay */
        .so-payment-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .so-payment-modal {
          background: #fff;
          border-radius: 24px;
          max-width: 520px;
          width: 92%;
          padding: 40px 36px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.2);
          position: relative;
          animation: modalSlideUp 0.4s ease;
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .so-payment-modal h2 {
          font-size: 1.6rem;
          color: var(--color-secondary);
          margin-bottom: 6px;
        }
        .so-payment-modal .modal-sub {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 28px;
        }
        .so-pay-option {
          padding: 16px 18px;
          border-radius: 14px;
          border: 1.5px solid #e8e4dc;
          cursor: pointer;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fff;
          transition: all 0.2s ease;
        }
        .so-pay-option:hover {
          border-color: var(--color-primary);
          background: #FFF7F2;
        }
        .so-pay-option.selected {
          border-color: var(--color-primary);
          background: linear-gradient(135deg, #FFF1EB 0%, #FFF7F2 100%);
          box-shadow: 0 2px 8px rgba(217,108,74,0.12);
        }
        .so-pay-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .so-pay-option .pay-label { font-weight: 600; font-size: 0.95rem; }
        .so-pay-option .pay-desc { font-size: 0.8rem; color: var(--color-text-muted); }
        .so-pay-option.selected .so-dot { background: var(--color-primary); border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(217,108,74,0.2); }
        .so-modal-price {
          text-align: center;
          margin: 24px 0 20px;
          padding: 16px;
          background: linear-gradient(135deg, var(--color-secondary-light), #f0f7f1);
          border-radius: 14px;
        }
        .so-modal-price .amount {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-secondary);
        }
        .so-modal-price .plan-name {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .so-pay-btn {
          width: 100%;
          padding: 16px;
          border-radius: 30px;
          border: none;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #fff;
          background: linear-gradient(135deg, var(--color-primary), #e07c5a);
          box-shadow: 0 8px 24px rgba(217,108,74,0.3);
        }
        .so-pay-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(217,108,74,0.4); }
        .so-pay-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .so-modal-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: color 0.2s;
          line-height: 1;
        }
        .so-modal-close:hover { color: var(--color-primary); }
      </style>

      <!-- Hero -->
      <div class="sub-order-hero">
        <h1>Customize Your ${planLabel}</h1>
        <div class="plan-badge">${planLabel} · <strong>${planPrice}</strong></div>
      </div>

      <!-- 5 Columns -->
      <div class="so-columns">

        <!-- 1 — Favourite Meals -->
        <div class="so-col">
          <div class="so-col-icon" style="background:linear-gradient(135deg,#FFF1EB,#FFD6A5);color:#D96C4A;">🍛</div>
          <h3>Favourite Meals</h3>
          <p class="so-col-sub">Pick meals you love (multiple)</p>
          <div id="so-meals"></div>
        </div>

        <!-- 2 — Delivery Time -->
        <div class="so-col">
          <div class="so-col-icon" style="background:linear-gradient(135deg,#E8F0EA,#c8e0cc);color:#2D5A27;">⏰</div>
          <h3>Delivery Time</h3>
          <p class="so-col-sub">When should we arrive?</p>
          <div id="so-times"></div>
        </div>

        <!-- 3 — Start Date -->
        <div class="so-col">
          <div class="so-col-icon" style="background:linear-gradient(135deg,#EDE7F6,#D1C4E9);color:#5E35B1;">📅</div>
          <h3>Start Date</h3>
          <p class="so-col-sub">Pick your first delivery day</p>
          <div id="so-dates"></div>
        </div>

        <!-- 4 — Delivery Place -->
        <div class="so-col">
          <div class="so-col-icon" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB);color:#1565C0;">📍</div>
          <h3>Delivery Place</h3>
          <p class="so-col-sub">Where do we deliver?</p>
          <div id="so-places"></div>
        </div>

        <!-- 5 — Dietary Preference -->
        <div class="so-col">
          <div class="so-col-icon" style="background:linear-gradient(135deg,#FFF8E1,#FFECB3);color:#F9A825;">🌿</div>
          <h3>Dietary Preference</h3>
          <p class="so-col-sub">Any dietary needs?</p>
          <div id="so-diets"></div>
        </div>
      </div>

      <!-- Details: Location -->
      <div class="so-details-section">
        <div class="so-details-card">
          <h3>📋 Delivery Details</h3>
          <div class="so-field-group">
            <label for="so-current-loc">Current Location</label>
            <input type="text" id="so-current-loc" class="so-input" placeholder="e.g. Salt Lake, Sector V, Kolkata" />
            <button class="so-locate-btn" id="so-geolocate">📍 Use My Location</button>
          </div>
          <div class="so-field-group">
            <label for="so-other-loc">Other Location (optional)</label>
            <input type="text" id="so-other-loc" class="so-input" placeholder="e.g. Office — Park Street, Kolkata" />
          </div>
        </div>
      </div>

      <!-- Chat + Summary -->
      <div class="so-chat-section">
        <div class="so-chat-card">
          <div>
            <h3>💬 Special Instructions</h3>
            <p>Allergies, spice level, extra requests — tell us everything.</p>
            <textarea id="so-chat-input" class="so-textarea" placeholder="e.g. I am allergic to peanuts, please make dal less spicy on weekdays, add extra rice on Sundays..."></textarea>
          </div>
          <div class="so-summary-mini">
            <h4>Order Summary</h4>
            <div class="so-summary-row"><span class="label">Plan</span><span>${planLabel}</span></div>
            <div class="so-summary-row"><span class="label">Price</span><span>${planPrice}</span></div>
            <div class="so-summary-row"><span class="label">Meals</span><span id="sum-meals">—</span></div>
            <div class="so-summary-row"><span class="label">Time</span><span id="sum-time">—</span></div>
            <div class="so-summary-row"><span class="label">Date</span><span id="sum-date">—</span></div>
            <div class="so-summary-row"><span class="label">Place</span><span id="sum-place">—</span></div>
            <div class="so-summary-row"><span class="label">Location</span><span id="sum-location">—</span></div>
            <div class="so-summary-row"><span class="label">Diet</span><span id="sum-diet">—</span></div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="so-bottom-bar">
        <span class="so-back-link" id="so-back">← Back to Plans</span>
        <button class="so-submit-btn" id="so-submit">Proceed to Payment</button>
      </div>

      <!-- Payment Modal (hidden by default) -->
      <div class="so-payment-overlay" id="so-payment-overlay" style="display:none;">
        <div class="so-payment-modal">
          <button class="so-modal-close" id="so-pay-close">✕</button>
          <h2>Choose Payment Method</h2>
          <p class="modal-sub">Select how you would like to pay for your ${planLabel} subscription.</p>

          <div class="so-modal-price">
            <div class="plan-name">${planLabel}</div>
            <div class="amount">${planPrice}</div>
          </div>

          <div id="so-pay-methods">
            <div class="so-pay-option" data-method="upi">
              <div class="so-pay-icon" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);color:#2E7D32;">₹</div>
              <div><div class="pay-label">UPI / Google Pay / PhonePe</div><div class="pay-desc">Pay instantly using any UPI app</div></div>
              <span class="so-dot" style="margin-left:auto;"></span>
            </div>
            <div class="so-pay-option" data-method="card">
              <div class="so-pay-icon" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB);color:#1565C0;">💳</div>
              <div><div class="pay-label">Credit / Debit Card</div><div class="pay-desc">Visa, Mastercard, RuPay</div></div>
              <span class="so-dot" style="margin-left:auto;"></span>
            </div>
            <div class="so-pay-option" data-method="netbanking">
              <div class="so-pay-icon" style="background:linear-gradient(135deg,#FFF3E0,#FFE0B2);color:#E65100;">🏦</div>
              <div><div class="pay-label">Net Banking</div><div class="pay-desc">All major Indian banks supported</div></div>
              <span class="so-dot" style="margin-left:auto;"></span>
            </div>
            <div class="so-pay-option" data-method="cod">
              <div class="so-pay-icon" style="background:linear-gradient(135deg,#F3E5F5,#E1BEE7);color:#7B1FA2;">🤝</div>
              <div><div class="pay-label">Cash on Delivery</div><div class="pay-desc">Pay when your meal arrives</div></div>
              <span class="so-dot" style="margin-left:auto;"></span>
            </div>
          </div>

          <button class="so-pay-btn" id="so-pay-confirm" disabled>Select a method to continue</button>
        </div>
      </div>
    `;

    // --- Populate options ---
    const mealsContainer = container.querySelector('#so-meals')!;
    mealOptions.forEach(m => {
      const el = document.createElement('div');
      el.className = 'so-option' + (state.selectedMeals.includes(m.name) ? ' selected' : '');
      el.innerHTML = `<span class="so-check">${state.selectedMeals.includes(m.name) ? '✓' : ''}</span><span class="so-label">${m.name}</span><span class="so-price">₹${m.price}</span>`;
      el.addEventListener('click', () => {
        const idx = state.selectedMeals.indexOf(m.name);
        if (idx > -1) state.selectedMeals.splice(idx, 1);
        else state.selectedMeals.push(m.name);
        updateSummary();
        el.classList.toggle('selected');
        el.querySelector('.so-check')!.textContent = el.classList.contains('selected') ? '✓' : '';
      });
      mealsContainer.appendChild(el);
    });

    populateRadio('#so-times', timeSlots, 'selectedTime');
    populateRadio('#so-dates', dates, 'selectedDate');
    populateRadio('#so-places', deliveryPlaces, 'selectedPlace');
    populateRadio('#so-diets', dietaryOptions, 'selectedDiet');

    // Chat
    const chatInput = container.querySelector('#so-chat-input') as HTMLTextAreaElement;
    chatInput.value = state.chatMessage;
    chatInput.addEventListener('input', () => { state.chatMessage = chatInput.value; });

    // Location inputs
    const curLocInput = container.querySelector('#so-current-loc') as HTMLInputElement;
    const otherLocInput = container.querySelector('#so-other-loc') as HTMLInputElement;
    curLocInput.value = state.currentLocation;
    otherLocInput.value = state.otherLocation;
    curLocInput.addEventListener('input', () => { state.currentLocation = curLocInput.value; updateSummary(); });
    otherLocInput.addEventListener('input', () => { state.otherLocation = otherLocInput.value; updateSummary(); });

    // Geolocation button
    container.querySelector('#so-geolocate')!.addEventListener('click', () => {
      const btn = container.querySelector('#so-geolocate') as HTMLButtonElement;
      btn.textContent = '⏳ Locating...';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            curLocInput.value = loc;
            state.currentLocation = loc;
            btn.textContent = '✅ Located!';
            updateSummary();
            setTimeout(() => { btn.textContent = '📍 Use My Location'; }, 2000);
          },
          () => {
            btn.textContent = '📍 Use My Location';
            alert('Unable to get location. Please enter manually.');
          }
        );
      } else {
        btn.textContent = '📍 Use My Location';
        alert('Geolocation not supported. Please enter manually.');
      }
    });

    // Back
    container.querySelector('#so-back')!.addEventListener('click', () => {
      window.location.hash = '#/subscriptions';
    });

    // Submit → Open payment modal
    const overlay = container.querySelector('#so-payment-overlay') as HTMLElement;

    container.querySelector('#so-submit')!.addEventListener('click', () => {
      if (!state.selectedMeals.length || !state.selectedTime || !state.selectedDate || !state.selectedPlace || !state.currentLocation) {
        alert('Please complete all selections including your current location before proceeding.');
        return;
      }
      overlay.style.display = 'flex';
    });

    // Close modal
    container.querySelector('#so-pay-close')!.addEventListener('click', () => { overlay.style.display = 'none'; });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });

    // Payment method selection
    const payOptions = container.querySelectorAll('.so-pay-option');
    const payBtn = container.querySelector('#so-pay-confirm') as HTMLButtonElement;

    payOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        payOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        state.selectedPayment = (opt as HTMLElement).dataset.method || '';
        payBtn.disabled = false;
        const label = opt.querySelector('.pay-label')!.textContent;
        payBtn.textContent = `Pay ${planPrice} via ${label}`;
      });
    });

    // Final pay confirmation
    payBtn.addEventListener('click', () => {
      if (!state.selectedPayment) return;
      overlay.style.display = 'none';
      alert('🎉 Payment successful! Your ' + planLabel + ' subscription is now active. Enjoy your meals!');
      window.location.hash = '#/';
    });

    updateSummary();
  }

  function populateRadio(selector: string, items: string[], stateKey: 'selectedTime' | 'selectedDate' | 'selectedPlace' | 'selectedDiet') {
    const parent = container.querySelector(selector)!;
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'so-option' + (state[stateKey] === item ? ' selected' : '');
      el.innerHTML = `<span class="so-dot"></span><span class="so-label">${item}</span>`;
      el.addEventListener('click', () => {
        state[stateKey] = item;
        parent.querySelectorAll('.so-option').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        updateSummary();
      });
      parent.appendChild(el);
    });
  }

  function updateSummary() {
    const sm = container.querySelector('#sum-meals');
    const st = container.querySelector('#sum-time');
    const sd = container.querySelector('#sum-date');
    const sp = container.querySelector('#sum-place');
    const sl = container.querySelector('#sum-location');
    const sdi = container.querySelector('#sum-diet');
    if (sm) sm.textContent = state.selectedMeals.length ? `${state.selectedMeals.length} selected` : '—';
    if (st) st.textContent = state.selectedTime ? state.selectedTime.split('–')[0].trim() : '—';
    if (sd) sd.textContent = state.selectedDate || '—';
    if (sp) sp.textContent = state.selectedPlace || '—';
    if (sl) sl.textContent = state.currentLocation || '—';
    if (sdi) sdi.textContent = state.selectedDiet || '—';
  }

  render();
  return container;
}
