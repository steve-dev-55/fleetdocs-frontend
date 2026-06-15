import { apiClient } from '@/lib/api-client';

export interface OcrExtractedField {
  value: string;
  confidence: number;
}

export interface OcrDetectedVehicle {
  registration: string;
}

export interface OcrJobStatus {
  job_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  result?: {
    extracted_data: Record<string, unknown>;
    confidence: number;
  };
  extracted_fields?: Record<string, OcrExtractedField>;
  detected_vehicle?: OcrDetectedVehicle | null;
  file_url?: string;
  error?: string;
}

export const ocrApi = {
  // Soumettre un fichier pour OCR
  submitOcr: async (file: File): Promise<{ job_id: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const { data } = await apiClient.post('/ocr/process', formData);
    return data;
  },

  // Vérifier le statut d'un job OCR
  getJobStatus: async (jobId: string): Promise<OcrJobStatus> => {
    const { data } = await apiClient.get(`/ocr/jobs/${jobId}`);
    return data;
  },

  // Récupérer le résultat complet d'un job OCR
  getJobResult: async (jobId: string): Promise<OcrJobStatus> => {
    const { data } = await apiClient.get(`/ocr/jobs/${jobId}`);
    return data;
  },

  // Valider les données extraites (format complet)
  validateOcrResult: async (jobId: string, validatedData: Record<string, unknown>): Promise<void> => {
    await apiClient.post(`/ocr/jobs/${jobId}/validate`, validatedData);
  },

  // Valider les champs extraits par l'OCR
  validateFields: async (jobId: string, validatedData: Record<string, string>): Promise<void> => {
    await apiClient.post(`/ocr/jobs/${jobId}/validate`, validatedData);
  },

  // Rejeter les données extraites
  rejectOcrResult: async (jobId: string, reason: string): Promise<void> => {
    await apiClient.post(`/ocr/jobs/${jobId}/reject`, { reason });
  },
};