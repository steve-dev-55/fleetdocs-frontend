import { apiClient } from '@/lib/api-client';
import { Alert } from '@/types/documents';

export interface DashboardKPIs {
  total_vehicles: number;
  active_vehicles: number;
  pending_documents: number;
  critical_alerts: number;
}

interface BackendDashboardData {
  vehicles_by_status: Record<string, number>;
  active_alerts: number;
}

export interface ComplianceData {
  month: string;
  compliant: number;
  non_compliant: number;
}

interface AlertsResponse {
  items: Alert[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const dashboardApi = {
  getKPIs: async (): Promise<DashboardKPIs> => {
    const { data } = await apiClient.get<BackendDashboardData>('/dashboard');
    
    // Calculer le total depuis vehicles_by_status
    const total_vehicles = Object.values(data.vehicles_by_status || {}).reduce((a, b) => a + b, 0);
    const active_vehicles = data.vehicles_by_status?.ACTIVE || data.vehicles_by_status?.AVAILABLE || 0;

    return {
      total_vehicles,
      active_vehicles,
      pending_documents: 0, // Pas encore disponible depuis le backend
      critical_alerts: data.active_alerts || 0,
    };
  },

  getComplianceStats: async (): Promise<ComplianceData[]> => {
    const { data } = await apiClient.get('/dashboard/compliance');
    return [data]; // Format du backend : { compliance_rate, total, validated }
  },

  getRecentAlerts: async (): Promise<Alert[]> => {
    const { data } = await apiClient.get<AlertsResponse>('/alerts', {
      params: { page: 1, size: 20 },
    });
    return data.items;
  },

  resolveAlert: async (alertId: string): Promise<void> => {
    await apiClient.patch(`/alerts/${alertId}/resolve`);
  }
};