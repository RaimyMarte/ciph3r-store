import { defineStore } from 'pinia';
import { api } from '../utils/';
import Cookies from "js-cookie";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login({ email, password }: LoginData) {
      const data = new URLSearchParams();
      data.append('email', email);
      data.append('password', password);

      const { data: response } = await api.post('/login', data);

      this.user = response?.data.user;
      const newToken = response?.data.token;

      Cookies.set('token', newToken, { expires: 30 });
    },

    async checkAuth() {
      const token = Cookies.get('token')

      const { data: response } = await api.get('/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      this.user = response?.data;
    },

    async register({ email, name, password, confirmPassword }: RegisterData) {
      const data = new URLSearchParams();
      data.append('email', email);
      data.append('name', name);
      data.append('password', password);
      data.append('c_password', confirmPassword);

      const { data: response } = await api.post('/register', data);
      this.user = response?.data.user;
      const newToken = response?.data.token;

      Cookies.set('token', newToken, { expires: 30 });
    },

    async logout() {
      await api.post('/logout');

      this.user = null;
      this.token = null;
      Cookies.remove('token')
    },
  },
});
