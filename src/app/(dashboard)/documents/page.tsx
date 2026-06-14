'use client';

import { useQuery } from '@tanstack/react-query';
import { documentsApi } from '@/features/documents/services/documents.api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DOCUMENT_STATUS_COLORS } from '@/lib/constants';
import { DocumentStatus, Document as AppDocument } from '@/types/documents';
import { cn, formatDate } from '@/lib/utils';
import { FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const STATUS_LABELS: Record<DocumentStatus, string> = {
  PENDING: 'En analyse',
  PROCESSED: 'Validé',
  REJECTED: 'Rejeté',
  EXPIRED: 'Expiré',
};

export default function DocumentsHubPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => documentsApi.getDocuments(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hub Documentaire Kwatta</h1>
        <p className="text-slate-500 text-sm">Centralisation et suivi des documents de la flotte</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'expiration</TableHead>
              <TableHead>Ajouté le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[80px] rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-10 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : data?.data.map((doc: AppDocument) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  ID Document : {doc.id.split('-')[0]}
                </TableCell>
                <TableCell>
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", DOCUMENT_STATUS_COLORS[doc.status])}>
                    {STATUS_LABELS[doc.status]}
                  </span>
                </TableCell>
                <TableCell>{formatDate(doc.expiration_date ?? '')}</TableCell>
                <TableCell>{formatDate(doc.created_at)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}