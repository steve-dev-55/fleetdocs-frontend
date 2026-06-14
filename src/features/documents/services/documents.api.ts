import { apiClient } from '@/lib/api-client';
import { Document, PaginatedResponse } from '@/types/documents';

export const documentsApi = {
  getDocuments: async (params?: { page?: number; status?: string }): Promise<PaginatedResponse<Document>> => {
    const { data } = await apiClient.get('/documents', { params });
    return data;
  },

  uploadDocument: async (file: File, vehicleId: string, documentTypeId: string): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('vehicle_id', vehicleId);
    formData.append('document_type_id', documentTypeId);

    // Axios gère automatiquement le Content-Type 'multipart/form-data' avec FormData
    const { data } = await apiClient.post('/documents/upload', formData);
    return data;
  },
};