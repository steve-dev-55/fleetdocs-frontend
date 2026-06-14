import { apiClient } from '@/lib/api-client';
import { OcrJobResult } from '@/types/documents';

export const ocrApi = {
  getPendingJobs: async (): Promise<OcrJobResult[]> => {
    const { data } = await apiClient.get('/ocr/jobs/pending');
    return data;
  },

  getJobResult: async (jobId: string): Promise<OcrJobResult> => {
    const { data } = await apiClient.get(`/ocr/result/${jobId}`);
    return data;
  },

  validateFields: async (jobId: string, validatedFields: Record<string, string>): Promise<void> => {
    await apiClient.post(`/ocr/validate/${jobId}`, {
      validated_fields: validatedFields,
    });
  },
};