import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const useAuth = create((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  signIn: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    set({ token: data.token });
  },
  signUp: async (email, password) => {
    await api.post('/auth/register', { email, password });
  },
  signOut: async () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));