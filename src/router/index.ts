import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Products from '../products/pages/Products.vue';
import Login from '../auth/pages/Login.vue';
import Register from '../auth/pages/Register.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    try {
      if (!authStore.user) {
        await authStore.checkAuth();

        if (!authStore.user) {
          next({ name: 'Login' });
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});


export default router;
