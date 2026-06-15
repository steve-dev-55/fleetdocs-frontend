import { apiClient } from '@/lib/api-client';
import { Alert } from '@/types/documents';

export interface DashboardKPIs {
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
    const { data } = await apiClient.get('/dashboard');
    return data;
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