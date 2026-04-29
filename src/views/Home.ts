export function Home() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';
  
  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'section container';
  hero.style.display = 'grid';
  hero.style.gridTemplateColumns = '1fr 1fr';
  hero.style.gap = '48px';
  hero.style.alignItems = 'center';
  hero.style.minHeight = '80vh';
  
  const heroLeft = document.createElement('div');
  heroLeft.innerHTML = "<h1 style='font-size: 4rem; font-weight: 700; color: var(--color-secondary); line-height: 1.1; margin-bottom: 24px;'>Ghar Jaisa Khana,<br><span style='color: var(--color-primary);'>Har Din.</span></h1><p style='font-size: 1.25rem; color: var(--color-text-muted); margin-bottom: 32px; max-width: 480px;'>Experience the comforting taste of home-cooked meals, crafted with love and delivered to your doorstep every day.</p><div style='display: flex; gap: 16px;'><button class='btn-primary' onclick='window.location.hash=\"#/menu\"'>Explore Menu</button><button class='btn-secondary' onclick='window.location.hash=\"#/subscriptions\"'>View Plans</button></div><div style='margin-top: 48px; display: flex; align-items: center; gap: 16px;'><div style='display: flex; align-items: center;'><div style='width: 40px; height: 40px; border-radius: 50%; background-color: #ddd; border: 2px solid white; z-index: 3;'></div><div style='width: 40px; height: 40px; border-radius: 50%; background-color: #ccc; border: 2px solid white; transform: translateX(-15px); z-index: 2;'></div><div style='width: 40px; height: 40px; border-radius: 50%; background-color: #bbb; border: 2px solid white; transform: translateX(-30px); z-index: 1;'></div></div><p style='font-size: 0.9rem; color: var(--color-text-muted); margin-left: -20px;'><strong>10,000+</strong> happy customers missing home less.</p></div>";

  const heroRight = document.createElement('div');
  heroRight.style.position = 'relative';
  heroRight.innerHTML = "<div style='position: absolute; width: 100%; height: 100%; background-color: var(--color-secondary-light); border-radius: 50% 40% 60% 40% / 40% 60% 40% 50%; top: 5%; left: 5%; z-index: -1;'></div><img src='/assets/hero.png' alt='A delicious thali' style='width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); object-fit: cover; aspect-ratio: 4/5;'>";

  hero.appendChild(heroLeft);
  hero.appendChild(heroRight);
  container.appendChild(hero);

  // Features Section
  const features = document.createElement('section');
  features.className = 'section container text-center';
  features.style.backgroundColor = 'var(--color-secondary-light)';
  features.style.borderRadius = '40px';
  features.style.padding = '80px 40px';
  features.style.margin = '40px auto';
  
  features.innerHTML = "<h2 style='font-size: 2.5rem; color: var(--color-secondary); margin-bottom: 48px;'>Why The Hearth?</h2><div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px;'><div class='glass-card' style='padding: 32px; text-align: left;'><div style='width: 48px; height: 48px; border-radius: 12px; background-color: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-bottom: 24px;'>1</div><h3 style='font-size: 1.25rem; margin-bottom: 12px; color: var(--color-secondary);'>Authentic Recipes</h3><p style='color: var(--color-text-muted);'>Passed down through generations, cooked with authentic spices and no preservatives.</p></div><div class='glass-card' style='padding: 32px; text-align: left;'><div style='width: 48px; height: 48px; border-radius: 12px; background-color: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-bottom: 24px;'>2</div><h3 style='font-size: 1.25rem; margin-bottom: 12px; color: var(--color-secondary);'>Daily Variety</h3><p style='color: var(--color-text-muted);'>A new menu every day ensuring you get balanced nutrition without getting bored.</p></div><div class='glass-card' style='padding: 32px; text-align: left;'><div style='width: 48px; height: 48px; border-radius: 12px; background-color: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-bottom: 24px;'>3</div><h3 style='font-size: 1.25rem; margin-bottom: 12px; color: var(--color-secondary);'>Flexible Subscriptions</h3><p style='color: var(--color-text-muted);'>Pause, skip, or cancel anytime. We work around your schedule.</p></div></div>";

  container.appendChild(features);

  return container;
}
