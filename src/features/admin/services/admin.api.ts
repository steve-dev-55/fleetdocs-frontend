import { apiClient } from '@/lib/api-client';
import { User, Role } from '@/types/auth';
import { DocumentType } from '@/types/documents';

export const adminApi = {
  // Gestion des Utilisateurs
  getUsers: async (): Promise<User[]> => {
    const { data } = await apiClient.get('/users');
    return data;
  },

  inviteUser: async (payload: { email: string; first_name: string; last_name: string; role: Role }): Promise<void> => {
    await apiClient.post('/users/invite', payload);
  },

  archiveUser: async (userId: string): Promise<void> => {
    await apiClient.post(`/users/${userId}/archive`);
  },

  // Gestion des Types de Documents
  getDocumentTypes: async (): Promise<DocumentType[]> => {
    const { data } = await apiClient.get('/document-types');
    return data;
  },

  createDocumentType: async (payload: Omit<DocumentType, 'id'>): Promise<DocumentType> => {
    const { data } = await apiClient.post('/document-types', payload);
    return data;
  }
};