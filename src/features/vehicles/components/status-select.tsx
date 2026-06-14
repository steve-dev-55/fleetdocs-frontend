'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehiclesApi } from '../services/vehicles.api';
import { VehicleStatus } from '@/types/vehicles';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner'; // Assurez-vous d'avoir installé sonner via shadcn

export function StatusSelect({ vehicleId, currentStatus }: { vehicleId: string, currentStatus: VehicleStatus }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStatus: VehicleStatus) => vehiclesApi.updateStatus(vehicleId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success("Statut mis à jour");
    },
    onError: () => toast.error("Erreur lors de la mise à jour"),
  });

  return (
    <Select 
      value={currentStatus} 
      onChange={(e) => mutation.mutate(e.target.value as VehicleStatus)}
      disabled={mutation.isPending}
    >
      <SelectTrigger className="w-[150px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="AVAILABLE">En circulation</SelectItem>
        <SelectItem value="IN_GARAGE">En maintenance</SelectItem>
        <SelectItem value="OUT_OF_SERVICE">Immobilisé</SelectItem>
      </SelectContent>
    </Select>
  );
}