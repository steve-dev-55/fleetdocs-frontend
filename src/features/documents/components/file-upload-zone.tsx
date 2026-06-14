'use client';

import { useState, useCallback } from 'react';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { documentsApi } from '../services/documents.api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FileUploadZoneProps {
  vehicleId: string;
  documentTypeId: string;
  onSuccess?: () => void;
}

export function FileUploadZone({ vehicleId, documentTypeId, onSuccess }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => documentsApi.uploadDocument(file, vehicleId, documentTypeId),
    onSuccess: () => {
      toast.success('Document envoyé avec succès pour analyse OCR');
      setSelectedFile(null);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi du document");
    }
  });

  return (
    <div className="w-full space-y-4">
      {!selectedFile ? (
        <div
          className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
            accept=".pdf,.png,.jpg,.jpeg"
          />
          <UploadCloud className="w-10 h-10 mb-3 text-slate-400" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Glissez-déposez votre document ici
          </p>
          <p className="text-xs text-slate-500 mt-1">
            PDF, PNG, JPG jusqu'à 10MB
          </p>
        </div>
      ) : (
        <div className="p-4 border rounded-lg flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded">
              <FileIcon className="w-5 h-5" />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSelectedFile(null)}
              disabled={uploadMutation.isPending}
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
            <Button 
              onClick={() => uploadMutation.mutate(selectedFile)}
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Envoyer'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}