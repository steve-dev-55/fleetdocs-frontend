'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Possibilité d'envoyer l'erreur à un service comme Sentry ici
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Oups, un problème est survenu
      </h2>
      <p className="text-slate-500 max-w-md text-center text-sm">
        Une erreur inattendue s'est produite lors du chargement de cette page. Notre équipe a été notifiée.
      </p>
      <Button onClick={() => reset()} variant="outline" className="mt-4">
        Réessayer
      </Button>
    </div>
  );
}