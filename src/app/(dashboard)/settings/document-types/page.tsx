'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/features/admin/services/admin.api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Check, Minus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DocumentTypesSettingsPage() {
  const { data: docTypes, isLoading } = useQuery({
    queryKey: ['admin-document-types'],
    queryFn: () => adminApi.getDocumentTypes(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Types de Documents</h1>
          <p className="text-slate-500 text-sm">Configurez les règles pour les documents de votre flotte.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un type
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border w-full max-w-3xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du document</TableHead>
              <TableHead className="text-center">Nécessite une date d'expiration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[50px] mx-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : docTypes?.map((type) => (
              <TableRow key={type.id}>
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell className="text-center">
                  {type.requires_expiration_date ? (
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  ) : (
                    <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Modifier</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}