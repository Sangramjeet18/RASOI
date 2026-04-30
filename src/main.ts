import './style.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceOrder } from './components/VoiceOrder';
import { Home } from './views/Home';
import { Menu } from './views/Menu';
import { Subscriptions } from './views/Subscriptions';
import { Builder } from './views/Builder';
import { Checkout } from './views/Checkout';
import { SignIn } from './views/SignIn';
import { SubscriptionOrder } from './views/SubscriptionOrder';

// A simple router class to manage views
class Router {
  appElement: HTMLElement;
  currentPath: string;

  constructor() {
    this.appElement = document.getElementById('app')!;
    this.currentPath = window.location.hash || '#/';
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash || '#/';
      this.render();
    });
  }

  render() {
    this.appElement.innerHTML = '';
    
    // Add Navbar
    this.appElement.appendChild(Navbar());

    // Main content container
    const main = document.createElement('main');
    main.style.minHeight = 'calc(100vh - 160px)'; // Account for navbar and footer

    // Route logic
    switch (this.currentPath) {
      case '#/':
        main.appendChild(Home());
        break;
      case '#/menu':
        main.appendChild(Menu());
        break;
      case '#/subscriptions':
        main.appendChild(Subscriptions());
        break;
      case '#/subscribe/weekly':
      case '#/subscribe/monthly':
        main.appendChild(SubscriptionOrder());
        break;
      case '#/builder':
        main.appendChild(Builder());
        break;
      case '#/checkout':
        main.appendChild(Checkout());
        break;
      case '#/signin':
        main.appendChild(SignIn());
        break;
      default:
        main.appendChild(Home());
    }

    this.appElement.appendChild(main);
    
    // Add Footer
    this.appElement.appendChild(Footer());
    
    // Add Voice Order Widget
    this.appElement.appendChild(VoiceOrder());
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }
}

// Initialize application
const router = new Router();
router.render();
