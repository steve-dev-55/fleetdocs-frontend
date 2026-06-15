'use client';

import { use, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ocrApi } from '@/features/documents/services/ocr.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OcrValidationPage({ params }: { params: Promise<{ job_id: string }> }) {
  const router = useRouter();
  // Unwrap params using React.use() for Next.js 15 compatibility
  const { job_id } = use(params);
  const { register, handleSubmit, reset } = useForm();

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ['ocr-job', job_id],
    queryFn: () => ocrApi.getJobResult(job_id),
  });

  useEffect(() => {
    if (job?.extracted_fields) {
      const defaultValues = Object.entries(job.extracted_fields).reduce((acc, [key, field]) => {
        acc[key] = field.value;
        return acc;
      }, {} as Record<string, string>);
      reset(defaultValues);
    }
  }, [job, reset]);

  const validateMutation = useMutation({
    mutationFn: (validatedData: Record<string, string>) => ocrApi.validateFields(job_id, validatedData),
    onSuccess: () => {
      router.push('/documents');
    }
  });

  if (isLoading) return <div className="flex h-[calc(100vh-4rem)] items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  if (isError || !job) return <div className="p-6 text-red-500 font-medium">Erreur lors du chargement des données de l'IA.</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -mx-6 -mt-6">
      {/* Header Contextuel */}
      <div className="bg-white dark:bg-slate-900 border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold">Vérification OCR</h1>
        </div>
        {job.detected_vehicle ? (
          <div className="flex items-center text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Véhicule : {job.detected_vehicle.registration}
          </div>
        ) : (
          <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 text-sm font-medium">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Aucun véhicule détecté
          </div>
        )}
      </div>

      {/* Split Screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Viewport PDF - Gauche */}
        <div className="w-1/2 border-r bg-slate-200 dark:bg-slate-800 p-4 flex flex-col">
          <iframe 
            src={job.file_url} 
            className="w-full h-full rounded-lg shadow-inner bg-white"
            title="Document source"
          />
        </div>

        {/* Formulaire de correction IA - Droite */}
        <div className="w-1/2 bg-white dark:bg-slate-900 overflow-y-auto">
          <form onSubmit={handleSubmit((data) => validateMutation.mutate(data))} className="flex flex-col h-full p-6">
            <div className="flex-1 space-y-5">
              <h3 className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">Données extraites</h3>
              
              {Object.entries(job.extracted_fields ?? {}).map(([key, field]) => (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold capitalize text-slate-700 dark:text-slate-300">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${
                      field.confidence >= 85 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      field.confidence >= 50 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {field.confidence}% précision
                    </span>
                  </div>
                  <Input 
                    {...register(key)} 
                    disabled={validateMutation.isPending}
                    className="w-full focus-visible:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t bg-white dark:bg-slate-900 sticky bottom-0">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={validateMutation.isPending}
              >
                {validateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Valider l'extraction
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}