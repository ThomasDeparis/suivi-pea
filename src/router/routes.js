
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/StockMarkets.vue') },
      { path: 'stockmarkets', component: () => import('src/pages/StockMarkets.vue') },
      { path: 'signin', component: () => import('src/pages/SignIn.vue') },
      { path: 'mywallet', component: () => import('src/pages/MyWallet.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
