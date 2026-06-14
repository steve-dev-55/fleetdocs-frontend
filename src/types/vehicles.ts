export type VehicleStatus = 'AVAILABLE' | 'IN_GARAGE' | 'OUT_OF_SERVICE';

export interface VehicleType {
  id: string;
  name: string;
  description?: string;
}

export interface Vehicle {
  id: string;
  company_id: string;
  registration: string;
  brand: string;
  model: string;
  vehicle_type_id: string;
  status: VehicleStatus;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}