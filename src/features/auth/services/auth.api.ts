import { apiClient } from '@/lib/api-client';
import { LoginFormData } from '../schemas/login.schema';
import { User } from '@/types/auth';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export const authApi = {
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);

    // Stocker les tokens dans des cookies (accessibles côté client)
    if (typeof window !== 'undefined') {
      document.cookie = `access_token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      document.cookie = `refresh_token=${data.refresh_token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      
      // Configurer le header Authorization pour les requêtes suivantes
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    }

    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Supprimer les tokens
      if (typeof window !== 'undefined') {
        document.cookie = 'access_token=; path=/; max-age=0';
        document.cookie = 'refresh_token=; path=/; max-age=0';
        delete apiClient.defaults.headers.common['Authorization'];
      }
    }
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};
