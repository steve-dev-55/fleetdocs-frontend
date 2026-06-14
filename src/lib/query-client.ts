import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes avant qu'une donnée soit considérée comme obsolète
      retry: 1, // On ne retente qu'une seule fois en cas d'échec
      refetchOnWindowFocus: false, // Évite de marteler le backend à chaque retour sur l'onglet
    },
  },
});