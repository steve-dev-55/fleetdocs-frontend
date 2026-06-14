'use client';

import { useQuery } from '@tanstack/react-query';
import { Car, FileText, AlertOctagon, Activity } from 'lucide-react';
import { dashboardApi } from '../services/dashboard.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function KpiCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-kpis'],
    queryFn: () => dashboardApi.getKPIs(),
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}><CardHeader><Skeleton className="h-4 w-1/2" /></CardHeader><CardContent><Skeleton className="h-8 w-1/4" /></CardContent></Card>
        ))}
      </div>
    );
  }

  const kpis = [
    { title: 'Flotte Totale', value: data?.total_vehicles || 0, icon: Car, color: 'text-blue-600' },
    { title: 'Véhicules Actifs', value: data?.active_vehicles || 0, icon: Activity, color: 'text-emerald-600' },
    { title: 'Docs en attente', value: data?.pending_documents || 0, icon: FileText, color: 'text-amber-600' },
    { title: 'Alertes Critiques', value: data?.critical_alerts || 0, icon: AlertOctagon, color: 'text-red-600' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">{kpi.title}</CardTitle>
              <Icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}