export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type?: 'menu' | 'addon' | 'custom-thali';
}

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem('rasoi_cart') || '[]');
  } catch {
    return [];
  }
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem('rasoi_cart', JSON.stringify(cart));
  
  window.dispatchEvent(new Event('cartUpdated'));
}

export function removeFromCart(id: string) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('rasoi_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function clearCart() {
  localStorage.removeItem('rasoi_cart');
  window.dispatchEvent(new Event('cartUpdated'));
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('rasoi_user_logged_in') === 'true';
}

export function loginUser() {
  localStorage.setItem('rasoi_user_logged_in', 'true');
}

export function logoutUser() {
  localStorage.removeItem('rasoi_user_logged_in');
}
