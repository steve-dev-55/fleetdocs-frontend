import { apiClient } from '@/lib/api-client';
import { Alert } from '@/types/documents';

export interface DashboardKPIs {
  total_vehicles: number;
  active_vehicles: number;
  pending_documents: number;
  critical_alerts: number;
}

export interface ComplianceData {
  month: string;
  compliant: number;
  non_compliant: number;
}

export const dashboardApi = {
  getKPIs: async (): Promise<DashboardKPIs> => {
    const { data } = await apiClient.get('/dashboard/kpis');
    return data;
  },

  getComplianceStats: async (): Promise<ComplianceData[]> => {
    const { data } = await apiClient.get('/dashboard/compliance-stats');
    return data;
  },

  getRecentAlerts: async (): Promise<Alert[]> => {
    const { data } = await apiClient.get('/alerts/recent');
    return data;
  },

  resolveAlert: async (alertId: string): Promise<void> => {
    await apiClient.post(`/alerts/${alertId}/resolve`);
  }
};