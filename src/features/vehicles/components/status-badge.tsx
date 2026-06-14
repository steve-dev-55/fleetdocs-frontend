import { VehicleStatus } from '@/types/vehicles';
import { VEHICLE_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const STATUS_LABELS: Record<VehicleStatus, string> = {
  AVAILABLE: 'En circulation',
  IN_GARAGE: 'En maintenance',
  OUT_OF_SERVICE: 'Immobilisé',
};

export function StatusBadge({ status }: { status: VehicleStatus }) {
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
      VEHICLE_STATUS_COLORS[status]
    )}>
      {STATUS_LABELS[status]}
    </span>
  );
}