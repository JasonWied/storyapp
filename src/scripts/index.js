import routes from '../scripts/routes/routes.js';
import '../styles/main.css';
import SubscribePresenter from './subscribe-presenter.js';

let currentPage = null; 

const updateNavbar = () => {
  const token = localStorage.getItem('token');
  const logoutBtn = document.querySelector('#logoutBtn');
  const loginLink = document.querySelector('a[href="#/login"]');
  const registerLink = document.querySelector('a[href="#/register"]');
  const addLink = document.querySelector('a[href="#/add"]');


  if (logoutBtn) {
    logoutBtn.style.display = token ? 'inline-block' : 'none';
    logoutBtn.onclick = () => {
      localStorage.removeItem('token');
      alert('Berhasil logout');
      location.hash = '/login';
      updateNavbar();
    };
  }

  if (loginLink) loginLink.style.display = token ? 'none' : 'inline-block';
  if (registerLink) registerLink.style.display = token ? 'none' : 'inline-block';
  if (addLink) addLink.style.display = 'inline-block';
};

const loadPage = async () => {
  const loadingSpinner = document.querySelector('#loading');
  if (loadingSpinner) loadingSpinner.classList.add('show');

  const path = location.hash.slice(1).toLowerCase() || '/';
  const pathMatch = Object.keys(routes).find(route => {
    const pattern = new RegExp(`^${route.replace(/:\w+/g, '[^/]+')}$`);
    return pattern.test(path);
  });

  const pageLoader = pathMatch ? routes[pathMatch] : routes['/'];
  const page = await pageLoader();
  const main = document.querySelector('#app');

  const renderPage = async () => {
    if (typeof currentPage?.destroy === 'function') {
      currentPage.destroy();
    }

    main.classList.remove('show');
    main.innerHTML = await page.render();

    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#main-content');

    if (skipLink && mainContent) {
      skipLink.addEventListener('click', function (event) {
        event.preventDefault();
        skipLink.blur();
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
      });
    }

    await page.afterRender();

    setTimeout(() => {
      main.classList.add('show');
      if (loadingSpinner) loadingSpinner.classList.remove('show');
    }, 300);

    currentPage = page;
  };

  if (document.startViewTransition) {
    document.startViewTransition(() => renderPage());
  } else {
    await renderPage();
  }

  updateNavbar();
};

document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  loadPage();

  const subscribeBtn = document.querySelector('#subscribeBtn');
  const unsubscribeBtn = document.querySelector('#unsubscribeBtn');

  if (subscribeBtn && unsubscribeBtn) {
    SubscribePresenter.init({ subscribeBtn, unsubscribeBtn });
  }
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.bundle.js').then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(err => {
      console.error('Service Worker registration failed:', err);
    });
  });
}

window.addEventListener('hashchange', loadPage);
