export function Builder() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 64px;">
      <h1 style="font-size: 3rem; color: var(--color-secondary); margin-bottom: 16px;">Hearth Thali Builder</h1>
      <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem;">
        Customize your perfect meal. Choose your base, mains, sides, and the cook who will prepare it.
      </p>
    </div>
    
    <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 48px; align-items: start;">
      
      <!-- Selection Column -->
      <div style="display: flex; flex-direction: column; gap: 40px;">
        
        <!-- Step 1: Base -->
        <div>
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid var(--color-secondary-light); padding-bottom: 8px;">1. Select Your Base</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="glass-card food-option selected" style="padding: 16px; cursor: pointer;" data-category="base" data-name="Steamed Basmati Rice">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Steamed Basmati Rice</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Classic, fragrant, light.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="base" data-name="Whole Wheat Roti">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Whole Wheat Roti (3 pcs)</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Soft, hot, brushed with ghee.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="base" data-name="Jeera Rice">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Jeera Rice</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Basmati rice tossed with cumin.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="base" data-name="Luchi">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Luchi (4 pcs)</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Deep-fried puffy flatbread.</p>
            </div>
          </div>
        </div>
        
        <!-- Step 2: Mains -->
        <div>
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid var(--color-secondary-light); padding-bottom: 8px;">2. Choose Your Mains (Pick up to 2)</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Yellow Dal Tadka">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Yellow Dal Tadka</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Comforting lentil soup.</p>
            </div>
            <div class="glass-card food-option selected" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Aloo Gobi">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Aloo Gobi</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Dry spiced potato & cauliflower.</p>
            </div>
            <div class="glass-card food-option selected" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Palak Paneer">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Palak Paneer</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Spinach gravy with cottage cheese.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Rajma Masala">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Rajma Masala</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Red kidney beans in rich gravy.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Chholar Dal">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Chholar Dal</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Bengal gram with coconut bits.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Kosha Mangsho">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Kosha Mangsho</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Slow-cooked spicy mutton curry.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Shorshe Ilish">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Shorshe Ilish</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Hilsa fish in mustard sauce.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="main" data-name="Chicken Dakbungalow">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Chicken Dakbungalow</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Colonial-era chicken & egg curry.</p>
            </div>
          </div>
        </div>
        
        <!-- Step 3: Sides -->
        <div>
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid var(--color-secondary-light); padding-bottom: 8px;">3. Pick Your Sides (Pick up to 2)</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
             <div class="glass-card food-option selected" style="padding: 16px; cursor: pointer;" data-category="side" data-name="Cucumber Raita">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Cucumber Raita</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Cooling yogurt dip.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="side" data-name="Kachumber Salad">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Kachumber Salad</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Fresh chopped veggie mix.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="side" data-name="Beguni">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Beguni</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Crispy eggplant fritters.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="side" data-name="Aloo Posto">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Aloo Posto</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Potatoes with poppy seeds.</p>
            </div>
            <div class="glass-card food-option" style="padding: 16px; cursor: pointer;" data-category="side" data-name="Papad & Chutney">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Papad & Chutney</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Crispy papad with tomato chutney.</p>
            </div>
          </div>
        </div>

        <!-- Step 4: Choose Cook -->
        <div>
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 24px; border-bottom: 2px solid var(--color-secondary-light); padding-bottom: 8px;">4. Choose Your Rasoimaker (Cook)</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="glass-card cook-option selected" style="padding: 16px; cursor: pointer;" data-cook="Sharmistha">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Sharmistha</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">★ 4.8 (124 reviews)</p>
            </div>
            <div class="glass-card cook-option" style="padding: 16px; cursor: pointer;" data-cook="Nandini">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Nandini</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">★ 4.9 (89 reviews)</p>
            </div>
            <div class="glass-card cook-option" style="padding: 16px; cursor: pointer;" data-cook="Bipasha">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Bipasha</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">★ 4.6 (156 reviews)</p>
            </div>
            <div class="glass-card cook-option" style="padding: 16px; cursor: pointer;" data-cook="Ruma">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Ruma</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">★ 4.7 (201 reviews)</p>
            </div>
            <div class="glass-card cook-option" style="padding: 16px; cursor: pointer;" data-cook="Moumita">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Moumita</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">★ 4.8 (110 reviews)</p>
            </div>
            <div class="glass-card cook-option" style="padding: 16px; cursor: pointer;" data-cook="Susmita">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Susmita</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">★ 4.5 (95 reviews)</p>
            </div>
            <div class="glass-card cook-option" style="padding: 16px; cursor: pointer;" data-cook="Kakoli">
              <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Kakoli</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">★ 4.9 (310 reviews)</p>
            </div>
          </div>
        </div>
        
      </div>
      
      <!-- Summary & Chatbox Column -->
      <div class="glass-card" style="padding: 0; position: sticky; top: 100px; display: flex; flex-direction: column; height: 600px; overflow: hidden; background: #fff;">
        <div style="padding: 24px; background-color: var(--color-background); border-bottom: 1px solid rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 8px;">Order Chat</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0;">Selected Cook: <strong id="selected-cook-name">Sharmistha</strong></p>
        </div>
        
        <div id="chat-messages" style="flex-grow: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; background: rgba(0,0,0,0.01);">
          <!-- System Message: Draft Order -->
          <div style="align-self: center; background-color: white; border: 1px dashed #ccc; padding: 16px 24px; border-radius: 12px; font-size: 0.9rem; color: var(--color-text-muted); text-align: left; width: 90%;">
            <strong style="color: var(--color-text-main); font-size: 1.1rem; display: block; margin-bottom: 8px;">Draft Order</strong>
            <ul id="draft-order-list" style="padding-left: 20px; margin-bottom: 0;">
              <li>Steamed Basmati Rice</li>
              <li>Aloo Gobi</li>
              <li>Palak Paneer</li>
              <li>Cucumber Raita</li>
            </ul>
          </div>
          <div style="align-self: center; font-size: 0.8rem; color: var(--color-text-muted);">
            Send a message to order. You can DM cooks up to 3 times a day.
          </div>
        </div>
        
        <div style="padding: 16px; background-color: white; border-top: 1px solid rgba(0,0,0,0.05); display: flex; gap: 12px; align-items: center;">
          <input type="text" id="chat-input" placeholder="Type your message to order..." style="flex-grow: 1; padding: 14px 16px; border: 1px solid #ddd; border-radius: 24px; outline: none; font-size: 0.95rem; background: #f9f9f9;">
          <button id="send-btn" class="btn-primary" style="padding: 12px; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
      
    </div>
  `;

  setTimeout(() => {
    const chatInput = container.querySelector('#chat-input') as HTMLInputElement;
    const sendBtn = container.querySelector('#send-btn') as HTMLButtonElement;
    const chatMessages = container.querySelector('#chat-messages') as HTMLDivElement;
    
    const cookOptions = container.querySelectorAll('.cook-option');
    const selectedCookName = container.querySelector('#selected-cook-name') as HTMLElement;
    
    const foodOptions = container.querySelectorAll('.food-option');
    const orderList = container.querySelector('#draft-order-list') as HTMLUListElement;

    const selections = {
      base: [] as string[],
      main: [] as string[],
      side: [] as string[]
    };

    // Food Selection Logic
    foodOptions.forEach(opt => {
      // Init selected state
      if (opt.classList.contains('selected')) {
        const cat = opt.getAttribute('data-category') as keyof typeof selections;
        const name = opt.getAttribute('data-name');
        if (cat && name) selections[cat].push(name);
      }

      opt.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const cat = target.getAttribute('data-category') as keyof typeof selections;
        const name = target.getAttribute('data-name');
        if (!cat || !name) return;

        if (target.classList.contains('selected')) {
          if (cat === 'base') return; // Must have 1 base
          target.classList.remove('selected');
          selections[cat] = selections[cat].filter(n => n !== name);
        } else {
          if (cat === 'base') {
            container.querySelectorAll('.food-option[data-category="base"]').forEach(el => el.classList.remove('selected'));
            selections.base = [name];
            target.classList.add('selected');
          } else if (cat === 'main' || cat === 'side') {
            if (selections[cat].length >= 2) {
              const removedName = selections[cat].shift();
              const oldEl = container.querySelector(`.food-option[data-category="${cat}"][data-name="${removedName}"]`);
              if (oldEl) oldEl.classList.remove('selected');
            }
            selections[cat].push(name);
            target.classList.add('selected');
          }
        }
        updateDraftOrder();
      });
    });

    const updateDraftOrder = () => {
      orderList.innerHTML = '';
      const allSelected = [...selections.base, ...selections.main, ...selections.side];
      if (allSelected.length === 0) {
        orderList.innerHTML = '<li><i>No items selected</i></li>';
      } else {
        allSelected.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          orderList.appendChild(li);
        });
      }
    };
    
    // Cook Selection Logic
    cookOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        cookOptions.forEach(o => o.classList.remove('selected'));
        const target = e.currentTarget as HTMLElement;
        target.classList.add('selected');
        selectedCookName.textContent = target.getAttribute('data-cook') || 'Sharmistha';
      });
    });

    const getTodayKey = () => new Date().toISOString().split('T')[0];
    
    sendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (!text) return;
      
      const today = getTodayKey();
      const usageStr = localStorage.getItem('dm_usage_' + today) || '0';
      let usage = parseInt(usageStr, 10);
      
      if (usage >= 3) {
        alert('You have reached the daily limit of 3 direct messages to cooks. Please try again tomorrow.');
        return;
      }
      
      usage += 1;
      localStorage.setItem('dm_usage_' + today, usage.toString());
      
      // Add user message
      const userMsg = document.createElement('div');
      userMsg.style.alignSelf = 'flex-end';
      userMsg.style.backgroundColor = 'var(--color-primary)';
      userMsg.style.color = 'white';
      userMsg.style.padding = '12px 16px';
      userMsg.style.borderRadius = '16px 16px 0 16px';
      userMsg.style.maxWidth = '80%';
      userMsg.style.boxShadow = '0 4px 12px rgba(217, 108, 74, 0.2)';
      userMsg.textContent = text;
      chatMessages.appendChild(userMsg);
      
      // Save order to localStorage for Rasoimakers Dashboard
      const allSelectedItems = [...selections.base, ...selections.main, ...selections.side];
      const existingOrdersStr = localStorage.getItem('rasoi_orders') || '[]';
      try {
        const existingOrders = JSON.parse(existingOrdersStr);
        existingOrders.push({
          id: Date.now().toString(),
          cook: selectedCookName.textContent,
          items: allSelectedItems,
          message: text,
          timestamp: new Date().toISOString(),
          status: 'pending',
          price: 310
        });
        localStorage.setItem('rasoi_orders', JSON.stringify(existingOrders));
      } catch (e) {
        console.error("Error saving order", e);
      }
      
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Mock cook auto-response
      sendBtn.disabled = true;
      chatInput.disabled = true;
      chatInput.placeholder = "Cook is typing...";
      
      setTimeout(() => {
        const cookName = selectedCookName.textContent;
        const cookMsg = document.createElement('div');
        cookMsg.style.alignSelf = 'flex-start';
        cookMsg.style.backgroundColor = 'white';
        cookMsg.style.border = '1px solid #eee';
        cookMsg.style.color = 'var(--color-text-main)';
        cookMsg.style.padding = '12px 16px';
        cookMsg.style.borderRadius = '16px 16px 16px 0';
        cookMsg.style.maxWidth = '80%';
        cookMsg.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        cookMsg.innerHTML = `<strong style="color: var(--color-secondary); display: block; margin-bottom: 4px;">${cookName}</strong> Thank you! I accept your order. I will start preparing your meal shortly! <br><br><span style="font-size: 0.8rem; color: var(--color-text-muted);">(${3 - usage} messages left today)</span>`;
        chatMessages.appendChild(cookMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        sendBtn.disabled = false;
        chatInput.disabled = false;
        chatInput.placeholder = "Type your message to order...";
        chatInput.focus();
      }, 1500);
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendBtn.click();
      }
    });

  }, 0);
  
  return container;
}
