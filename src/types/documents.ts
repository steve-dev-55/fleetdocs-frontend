import { Vehicle } from './vehicles';

export type DocumentStatus = 'PENDING' | 'PROCESSED' | 'REJECTED' | 'EXPIRED';

export interface DocumentType {
  id: string;
  name: string;
  requires_expiration_date: boolean;
}

export interface Document {
  id: string;
  vehicle_id: string;
  document_type_id: string;
  file_url: string;
  status: DocumentStatus;
  expiration_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OcrField {
  value: string;
  confidence: number;
}

export interface OcrJobResult {
  job_id: string;
  document_id: string;
  provider: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  file_url: string;
  detected_vehicle: Vehicle | null;
  extracted_fields: Record<string, OcrField>;
  created_at: string;
}

export interface Alert {
  id: string;
  vehicle_id: string;
  document_id?: string;
  type: 'DOCUMENT_EXPIRED' | 'DOCUMENT_MISSING' | 'MAINTENANCE_REQUIRED';
  message: string;
  is_resolved: boolean;
  created_at: string;
}