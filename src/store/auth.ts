import { defineStore } from 'pinia';
import { api, authHeader } from '../utils/';
import Cookies from "js-cookie";
import { IUser } from '../interfaces/user';

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

interface AuthState {
  user: IUser | null,
  token: string | null,
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
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
      const { data: response } = await api.get('/me', { headers: authHeader() });

      this.user = response?.data;

      if (!response?.success) {
        this.user = null;
        this.token = null;
        Cookies.remove('token')
      }
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
      const { data: response } = await api.post('/logout', {}, { headers: authHeader() });

      if (response?.success) {
        this.user = null;
        this.token = null;
        Cookies.remove('token')
      }
    },
  },
});
