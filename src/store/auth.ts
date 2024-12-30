import { defineStore } from 'pinia';
import api from '../utils/api';
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

      const { data: response } = await api.post('/login', data,);

      this.user = response?.data.user;
      const newToken = response?.data.token;

      Cookies.set('token', newToken, { expires: 30 });
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

    },

    async checkAuth() {
      const token = Cookies.get('token')

      const { data: response } = await api.get('/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      this.user = response?.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    async register({ email, name, password, confirmPassword }: RegisterData) {
      const data = new URLSearchParams();
      data.append('email', email);
      data.append('name', name);
      data.append('password', password);
      data.append('c_password', confirmPassword);

      const response = await api.post('/register', data);
      console.log('Registration successful', response.data);

    },

    logout() {
      this.user = null;
      this.token = null;
      delete api.defaults.headers.common['Authorization'];
    },
  },
});
