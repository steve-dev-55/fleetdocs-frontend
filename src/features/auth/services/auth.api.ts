import { apiClient } from '@/lib/api-client';
import { LoginFormData } from '../schemas/login.schema';
import { User } from '@/types/auth';

export const authApi = {
  login: async (credentials: LoginFormData): Promise<{ user: User }> => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};