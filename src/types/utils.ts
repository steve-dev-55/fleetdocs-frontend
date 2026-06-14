import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utilitaire indispensable pour fusionner les classes Tailwind (généré par Shadcn)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatage standardisé des dates pour toute l'application
export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return 'N/A';
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString));
}

// Formatage des dates avec l'heure pour les logs (ex: jobs OCR)
export function formatDateTime(dateString: string | undefined | null): string {
  if (!dateString) return 'N/A';
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
}