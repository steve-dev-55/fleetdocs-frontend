import { z } from 'zod';

export const vehicleSchema = z.object({
  registration: z
    .string()
    .min(1, "L'immatriculation est requise")
    .regex(/^[A-Z0-9- ]+$/i, "Format d'immatriculation invalide"),
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  vehicle_type_id: z.string().min(1, "Le type de véhicule est requis"),
  status: z.enum(['AVAILABLE', 'IN_GARAGE', 'OUT_OF_SERVICE']).default('AVAILABLE'),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;