import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Products from '../products/pages/Products.vue';
import Login from '../auth/pages/Login.vue';
import Register from '../auth/pages/Register.vue';
import { showToast } from '../store/toast';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Products,
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, guestOnly: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false, guestOnly: true },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  try {
    await authStore.checkAuth();

    if (to.meta.guestOnly) {
      if (authStore.user) {
        next({ name: 'Home' });
      } else {
        next();
      }
    } else if (to.meta.requiresAuth) {
      if (!authStore.user) {
        next({ name: 'Login' });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    showToast('Ha ocurrido un error', 'error');
    next({ name: 'Home' });
  }
});



export default router;
