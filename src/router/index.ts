import Cookies from "js-cookie";
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../auth/pages/Login.vue';
import Register from '../auth/pages/Register.vue';
import Products from '../products/pages/Products.vue';
import { useAuthStore } from '../store/auth';

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
  const authenticated = await isAuthenticated();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    if (to.meta.guestOnly && authenticated) {
      next({ name: 'Home' });
    } else {
      next();
    }
  }
});


async function isAuthenticated() {

  if (Cookies.get('token') != null) {
    try {
      const authStore = useAuthStore();
      await authStore.checkAuth();

      return true
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}


export default router;
