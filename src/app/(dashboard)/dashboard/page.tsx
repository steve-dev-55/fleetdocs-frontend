import { KpiCards } from '@/features/dashboard/components/kpi-cards';
import { ComplianceChart } from '@/features/dashboard/components/compliance-chart';
import { AlertsFeed } from '@/features/dashboard/components/alerts-feed';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tableau de bord</h1>
        <p className="text-slate-500 text-sm">Vue d'ensemble de votre flotte et des actions requises.</p>
      </div>

      {/* Ligne 1 : Les KPIs */}
      <KpiCards />

      {/* Ligne 2 : Graphiques et Alertes */}
      <div className="grid gap-4 grid-cols-4 lg:grid-cols-5">
        <ComplianceChart />
        <AlertsFeed />
      </div>
    </div>
  );
}