const routes = {
  '/': async () => (await import('../pages/home/home.js')).default,
  '/add': async () => (await import('../pages/add/add.js')).default,
  '/login': async () => (await import('../pages/login/login.js')).default,
  '/register': async () => (await import('../pages/register/register.js')).default,
  '/detail/:id': async () => (await import('../pages/detail/detail.js')).default,
  '/bookmark': async () => (await import('../pages/bookmark/bookmark.js')).default,
};

export default routes;