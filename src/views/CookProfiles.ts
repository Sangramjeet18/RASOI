export function CookProfiles() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in section container';
  
  // Rasoimakers Data
  const cooks = [
    { id: 1, name: 'Sharmistha', rating: 4.8, specialty: 'Authentic Bengali Comfort', location: 'Salt Lake Sector 1', reviews: 124 },
    { id: 2, name: 'Nandini', rating: 4.9, specialty: 'Spicy Delicacies', location: 'Jadavpur', reviews: 89 },
    { id: 3, name: 'Bipasha', rating: 4.6, specialty: 'Healthy & Light', location: 'New Town', reviews: 156 },
    { id: 4, name: 'Ruma', rating: 4.7, specialty: 'Traditional Desserts', location: 'Ballygunge', reviews: 201 },
  ];

  container.innerHTML = `
    <div style="text-align:center;margin-bottom:64px;position:relative;">
      <div style="position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:120px;height:4px;background:linear-gradient(90deg,transparent,var(--color-primary),transparent);border-radius:2px;"></div>
      <span style="display:inline-block;font-size:0.8rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--color-primary);margin-bottom:12px;background:rgba(217,107,59,0.08);padding:6px 16px;border-radius:20px;">👩‍🍳 HOME CHEFS</span>
      <h1 style="font-family:'Playfair Display',serif;font-size:3.2rem;color:var(--color-secondary);margin-bottom:16px;font-weight:700;letter-spacing:-0.5px;" data-translate="ourRasoimakers">Our Rasoimakers</h1>
      <p style="color:var(--color-text-muted);max-width:600px;margin:0 auto;font-size:1.1rem;line-height:1.7;" data-translate="ourRasoimakersDesc">
        Meet the talented home chefs bringing the warmth of traditional kitchens straight to your table.
      </p>
      <div style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);width:80px;height:4px;background:linear-gradient(90deg,transparent,var(--color-secondary),transparent);border-radius:2px;"></div>
    </div>
    
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:32px;">
      ${cooks.map(cook => `
        <div class="glass-card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;align-items:center;text-align:center;border-top:4px solid ${cook.rating >= 4.8 ? 'var(--color-primary)' : 'var(--color-secondary)'};">
          <div style="width:100%;padding:28px 24px 0;display:flex;flex-direction:column;align-items:center;">
            <div style="width:96px;height:96px;border-radius:50%;padding:3px;background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));margin-bottom:16px;">
              <div style="width:100%;height:100%;border-radius:50%;background:var(--color-secondary-light);display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:bold;color:var(--color-secondary);">
                ${cook.name.charAt(0)}
              </div>
            </div>
            <h3 style="font-size:1.4rem;color:var(--color-secondary);margin-bottom:6px;font-family:'Playfair Display',serif;">${cook.name}</h3>
            <p style="color:var(--color-primary);font-weight:600;margin-bottom:6px;font-size:1.05rem;">★ ${cook.rating} <span style="color:var(--color-text-muted);font-weight:normal;font-size:0.85rem;">(${cook.reviews} reviews)</span></p>
            <div style="background:rgba(31,77,43,0.06);padding:6px 14px;border-radius:16px;margin-bottom:6px;font-size:0.88rem;font-weight:500;color:var(--color-secondary);">${cook.specialty}</div>
            <p style="color:var(--color-text-muted);font-size:0.85rem;margin-bottom:20px;">📍 ${cook.location}</p>
          </div>
          <div style="display:flex;gap:10px;width:100%;padding:0 24px 24px;">
            <button class="btn-primary rate-btn" data-id="${cook.id}" data-name="${cook.name}" style="flex:1;padding:10px;" data-translate="rate">Rate</button>
            <button class="btn-secondary complain-btn" data-id="${cook.id}" data-name="${cook.name}" style="flex:1;padding:10px;background:linear-gradient(135deg,#c62828,#e53e3e);box-shadow:0 4px 12px rgba(229,62,62,0.2);" data-translate="complain">Complain</button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Modal Container -->
    <div id="modal-container" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
      <div class="glass-card" style="width: 100%; max-width: 400px; padding: 32px; position: relative;">
        <button id="close-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
        <h3 id="modal-title" style="font-size: 1.5rem; color: var(--color-secondary); margin-bottom: 16px;"></h3>
        <p id="modal-desc" style="color: var(--color-text-muted); margin-bottom: 24px; font-size: 0.95rem;"></p>
        
        <form id="modal-form">
          <div id="rating-input" style="display: none; margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Your Rating (1-5)</label>
            <input type="number" min="1" max="5" value="5" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Comments</label>
            <textarea rows="4" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;" placeholder="Tell us more..."></textarea>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%;" id="modal-submit">Submit</button>
        </form>
      </div>
    </div>
  `;

  // Interactivity for modals
  setTimeout(() => {
    const modalContainer = container.querySelector('#modal-container') as HTMLDivElement;
    const closeModal = container.querySelector('#close-modal') as HTMLButtonElement;
    const modalTitle = container.querySelector('#modal-title') as HTMLHeadingElement;
    const modalDesc = container.querySelector('#modal-desc') as HTMLParagraphElement;
    const ratingInput = container.querySelector('#rating-input') as HTMLDivElement;
    const modalForm = container.querySelector('#modal-form') as HTMLFormElement;
    const modalSubmitBtn = container.querySelector('#modal-submit') as HTMLButtonElement;

    const rateBtns = container.querySelectorAll('.rate-btn');
    const complainBtns = container.querySelectorAll('.complain-btn');

    let currentAction = '';
    let currentCook = '';

    const openModal = (action: 'rate' | 'complain', cookName: string) => {
      currentAction = action;
      currentCook = cookName;
      
      modalTitle.textContent = action === 'rate' ? `Rate ${cookName}` : `File a Complaint about ${cookName}`;
      modalDesc.textContent = action === 'rate' ? `We'd love to hear your feedback on ${cookName}'s food.` : `We're sorry you had a bad experience. Please let us know what happened.`;
      
      if (action === 'rate') {
        ratingInput.style.display = 'block';
        modalSubmitBtn.style.backgroundColor = 'var(--color-primary)';
      } else {
        ratingInput.style.display = 'none';
        modalSubmitBtn.style.backgroundColor = '#e53e3e';
      }

      modalContainer.style.display = 'flex';
    };

    rateBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = (e.target as HTMLButtonElement).getAttribute('data-name') || '';
        openModal('rate', name);
      });
    });

    complainBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = (e.target as HTMLButtonElement).getAttribute('data-name') || '';
        openModal('complain', name);
      });
    });

    closeModal.addEventListener('click', () => {
      modalContainer.style.display = 'none';
    });

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(`Your ${currentAction} for ${currentCook} has been submitted successfully.`);
      modalContainer.style.display = 'none';
      modalForm.reset();
    });

    // Close on outside click
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
      }
    });

  }, 0);

  return container;
}
