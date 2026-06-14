import { apiClient } from '@/lib/api-client';
import { Vehicle, VehicleStatus, VehicleType } from '@/types/vehicles';
import { PaginatedResponse } from '@/types';

export const vehiclesApi = {
  // Liste des véhicules avec filtres optionnels
  getVehicles: async (params?: { 
    page?: number; 
    search?: string; 
    status?: string; 
    type?: string 
  }): Promise<PaginatedResponse<Vehicle>> => {
    const { data } = await apiClient.get('/vehicles', { params });
    return data;
  },

  // Récupération des types de véhicules pour les formulaires
  getVehicleTypes: async (): Promise<VehicleType[]> => {
    const { data } = await apiClient.get('/vehicle-types');
    return data;
  },

  // Détail d'un véhicule
  getVehicle: async (id: string): Promise<Vehicle> => {
    const { data } = await apiClient.get(`/vehicles/${id}`);
    return data;
  },

  // Changement de statut (AVAILABLE, etc.)
  updateStatus: async (id: string, status: VehicleStatus): Promise<Vehicle> => {
    const { data } = await apiClient.patch(`/vehicles/${id}/status`, { status });
    return data;
  },

  // Création d'un véhicule
  createVehicle: async (payload: Omit<Vehicle, 'id' | 'company_id' | 'created_at' | 'updated_at' | 'is_archived'>): Promise<Vehicle> => {
    const { data } = await apiClient.post('/vehicles', payload);
    return data;
  },
};