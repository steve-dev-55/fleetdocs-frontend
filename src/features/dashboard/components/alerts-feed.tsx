'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '../services/dashboard.api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export function AlertsFeed() {
  const queryClient = useQueryClient();
  
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['dashboard-alerts'],
    queryFn: () => dashboardApi.getRecentAlerts(),
  });

  const resolveMutation = useMutation({
    mutationFn: (id: string) => dashboardApi.resolveAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-alerts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-kpis'] });
      toast.success('Alerte marquée comme résolue');
    }
  });

  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-500" />
              Alertes Récentes
            </CardTitle>
            <CardDescription>Actions requises sur votre flotte</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-lg" />)}
          </div>
        ) : alerts?.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
            <p className="text-sm">Aucune alerte pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {alerts?.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
                <div className="mt-0.5">
                  <AlertTriangle className={`w-5 h-5 ${alert.type === 'DOCUMENT_EXPIRED' ? 'text-red-500' : 'text-amber-500'}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{alert.message}</p>
                  <p className="text-xs text-slate-500">{formatDate(alert.created_at)}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => resolveMutation.mutate(alert.id)}
                  disabled={resolveMutation.isPending}
                >
                  Résoudre
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}