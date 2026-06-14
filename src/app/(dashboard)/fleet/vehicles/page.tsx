'use client';

import { useQuery } from '@tanstack/react-query';
import { vehiclesApi } from '@/features/vehicles/services/vehicles.api';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { StatusBadge } from '@/features/vehicles/components/status-badge';
import { StatusSelect } from '@/features/vehicles/components/status-select';
import { Button } from '@/components/ui/button';
import { Plus, Search, FileDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function VehiclesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehiclesApi.getVehicles(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ma Flotte</h1>
          <p className="text-slate-500 text-sm">Gérez les véhicules et suivez leur état opérationnel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Ajouter un véhicule
          </Button>
        </div>
      </div>

      {/* Barre de Filtres */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Rechercher par immatriculation, marque..." className="pl-9" />
        </div>
        <Button variant="secondary">Filtrer</Button>
      </div>

      {/* Tableau des Véhicules */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Véhicule</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Immatriculation</TableHead>
              <TableHead>Statut Actuel</TableHead>
              <TableHead>Action Statut</TableHead>
              <TableHead className="text-right">Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-[150px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : data?.data.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">
                  {vehicle.brand} {vehicle.model}
                </TableCell>
                <TableCell>Poids Lourd</TableCell> {/* À dynamiser avec vehicle_type_id */}
                <TableCell>
                  <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">
                    {vehicle.registration}
                  </code>
                </TableCell>
                <TableCell>
                  <StatusBadge status={vehicle.status} />
                </TableCell>
                <TableCell>
                  <StatusSelect vehicleId={vehicle.id} currentStatus={vehicle.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Consulter</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}