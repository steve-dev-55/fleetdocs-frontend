'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { AxiosError } from 'axios';

import { loginSchema, LoginFormData } from '../schemas/login.schema';
import { authApi } from '../services/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiError } from '@/types';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExpired = searchParams.get('expired') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      router.push('/dashboard');
      router.refresh();
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const errorResponse = loginMutation.error as AxiosError<ApiError>;
  const serverErrorMessage = errorResponse?.response?.data?.message || 'Une erreur est survenue lors de la connexion.';

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Connexion FleetDocs
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Saisissez vos identifiants pour accéder à votre espace de gestion
        </p>
      </div>

      {isExpired && !loginMutation.isError && (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Votre session a expiré. Veuillez vous reconnecter.</span>
        </div>
      )}

      {loginMutation.isError && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{serverErrorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
            Adresse email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="nom@entreprise.com"
            disabled={loginMutation.isPending}
            className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs font-medium text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
              Mot de passe
            </label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={loginMutation.isPending}
            className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs font-medium text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Authentification en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>
    </div>
  );
}